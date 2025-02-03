import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link, useParams } from "react-router-dom";
import axios from "axios";

function Home() {
    const [pages, setPages] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/api/pages").then((res) => setPages(res.data));
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-4xl font-bold text-center text-blue-600 mb-6">CMS Home</h1>
            <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-md">
                <ul className="space-y-4">
                    {pages.map((page) => (
                        <li key={page._id} className="border-b pb-2">
                            <Link to={`/${page.slug}`} className="text-lg text-blue-500 hover:text-blue-700">
                                {page.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

function Page() {
    const { slug } = useParams();
    const [page, setPage] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:5000/api/pages/${slug}`).then((res) => setPage(res.data));
    }, [slug]);

    if (!page) return <h1 className="text-center text-gray-600 mt-10">Loading...</h1>;

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-md">
                <h1 className="text-3xl font-bold text-gray-800">{page.title}</h1>
                <p className="text-gray-700 mt-4">{page.content}</p>
                <Link to="/" className="mt-6 inline-block text-blue-500 hover:text-blue-700">← Back to Home</Link>
            </div>
        </div>
    );
}

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/:slug" element={<Page />} />
            </Routes>
        </Router>
    );
}

export default App;
