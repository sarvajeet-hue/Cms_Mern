import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function UserHeader() {
    const [content, setContent] = useState([]);

    async function getHeaderContent() {
        try {
            const response = await axios.get("http://localhost:5000/api/headerContent");
            setContent(response.data || []);
        } catch (error) {
            console.error("Error fetching header content:", error);
        }
    }

    useEffect(() => {
        getHeaderContent();
    }, []);

    return (
        <header className="bg-blue-600 text-white py-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center px-4">
                <h1 className="text-2xl font-bold">
                    <Link to="/">My Website</Link>
                </h1>
                <nav>
                    <ul className="flex space-x-6">
                        {content.map((nav, index) => (
                            <li key={index} dangerouslySetInnerHTML={{ __html: nav }} />
                        ))}
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default UserHeader;
