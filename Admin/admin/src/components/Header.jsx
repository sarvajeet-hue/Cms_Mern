import React from 'react'
import axios from 'axios'
import { useEffect , useState } from 'react'
export const Header = () => {
    useEffect(() => {
        
    } ,[])

    const [content, setContent] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:5000/api/header", { content });
        
        setContent("");
        window.location.reload();
    };
  return (
    <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
                <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                    <input
                        type="text"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Add Headers Content"
                        className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {/* <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Page Content"
                        className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-32 resize-none"
                    ></textarea> */}
                    <button
                        type="submit"
                        className="bg-blue-500 text-white font-bold py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                    >
                        Add Headers
                    </button>
                </form>
            </div>
  )
}
