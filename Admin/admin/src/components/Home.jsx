import React, { useState, useEffect } from "react";
import axios from "axios";

function Home() {
    const [pages, setPages] = useState([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    useEffect(() => {
        axios.get("http://localhost:5000/api/pages").then((res) => setPages(res.data));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:5000/api/pages", { title, content });
        setTitle("");
        setContent("");
        window.location.reload();
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
            <h1 className="text-4xl font-bold text-blue-600 mb-6">CMS Admin Panel</h1>

            {/* Form Section */}
            <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
                <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Page Title"
                        className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Page Content"
                        className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-32 resize-none"
                    ></textarea>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white font-bold py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                    >
                        Add Page
                    </button>
                </form>
            </div>

            {/* Pages List */}
            <h2 className="text-2xl font-bold mt-8">All Pages</h2>
            <ul className="bg-white p-6 rounded-xl shadow-md mt-4 w-full max-w-md">
                {pages.map((page) => (
                    <li key={page._id} className="border-b py-2 text-lg text-gray-700">
                        {page.title}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Home;
