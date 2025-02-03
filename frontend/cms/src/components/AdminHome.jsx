import React, { useState, useEffect } from "react";
import axios from "axios";

function AdminHome() {
    const [sections, setSections] = useState([]);
    const [type, setType] = useState("text");
    const [content, setContent] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    useEffect(() => {
        axios.get("http://localhost:5000/api/homepage").then((res) => {
            setSections(res.data.sections);
        });
    }, []);

    const handleAddSection = () => {
        const newSection = { type, content, imageUrl };
        setSections([...sections, newSection]);
        setContent("");
        setImageUrl("");
    };

    const handleSave = async () => {
        await axios.post("http://localhost:5000/api/homepage", {
            title: "Home",
            sections,
        });
        alert("Homepage updated successfully!");
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-bold text-blue-600">Homepage CMS Admin</h1>

            {/* Section Form */}
            <div className="bg-white p-6 rounded-xl shadow-md mt-4">
                <select
                    className="border p-3 rounded-lg w-full"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                >
                    <option value="text">Text</option>
                    <option value="image">Image</option>
                    <option value="banner">Banner</option>
                </select>

                {type === "text" && (
                    <textarea
                        className="border p-3 w-full rounded-lg mt-2"
                        placeholder="Enter text content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    ></textarea>
                )}

                {(type === "image" || type === "banner") && (
                    <input
                        className="border p-3 w-full rounded-lg mt-2"
                        placeholder="Enter Image URL"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                    />
                )}

                <button
                    className="bg-green-500 text-white font-bold py-2 px-4 mt-3 rounded-lg"
                    onClick={handleAddSection}
                >
                    Add Section
                </button>
            </div>

            {/* Preview Sections */}
            <h2 className="text-2xl font-bold mt-6">Homepage Preview</h2>
            <div className="bg-white p-6 rounded-xl shadow-md mt-4">
                {sections.map((sec, index) => (
                    <div key={index} className="border-b py-3">
                        {sec.type === "text" && <p className="text-lg">{sec.content}</p>}
                        {sec.type === "image" && <img src={sec.imageUrl} alt="Section" className="w-full h-40 object-cover" />}
                        {sec.type === "banner" && (
                            <div className="w-full h-40 bg-blue-300 flex items-center justify-center text-white text-xl">
                                Banner - {sec.imageUrl}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <button
                className="bg-blue-500 text-white font-bold py-2 px-4 mt-4 rounded-lg"
                onClick={handleSave}
            >
                Save Homepage
            </button>
        </div>
    );
}

export default AdminHome;
