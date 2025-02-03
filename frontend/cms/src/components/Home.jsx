import React, { useState, useEffect } from "react";
import axios from "axios";

function Home() {
    const [sections, setSections] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/api/homepage").then((res) => {
            setSections(res.data.sections);
        });
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-bold text-center text-blue-600">Welcome to Our Website</h1>

            <div className="mt-6">
                {sections.map((sec, index) => (
                    <div key={index} className="border-b py-6">
                        {sec.type === "text" && <p className="text-lg text-gray-700">{sec.content}</p>}
                        {sec.type === "image" && <img src={sec.imageUrl} alt="Section" className="w-full h-60 object-cover" />}
                        {sec.type === "banner" && (
                            <div className="w-full h-60 bg-blue-500 flex items-center justify-center text-white text-2xl font-bold">
                                {sec.imageUrl}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;
