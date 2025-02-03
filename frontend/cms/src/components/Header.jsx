import React, { useEffect , useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Header() {
    const [content, setContent] = useState([]);

    async function getHeaderContent() {
        const response = await axios.get("http://localhost:5000/api/headerContent")
        console.log(
            "response" , response?.data
        )  
        setContent(response.data);
    }
    useEffect(() => {
        getHeaderContent();
        
    }, []);

    return (
        <header className="bg-blue-600 text-white py-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center px-4">
                <h1 className="text-2xl font-bold">
                    <Link to="/">My CMS</Link>
                </h1>
                <nav>
                    <ul className="flex space-x-6">
                        {
                            content.map((nav , index) => {
                                return <div key = {index}>    
                                    <li>{nav?.content[0]}</li>    
                                </div>
                            })
                        }
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;
