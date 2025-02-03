import React, { useState, useEffect } from "react";
import axios from "axios";

function AdminHeader() {
    const [menuItems, setMenuItems] = useState([]);
    const [newMenuItem, setNewMenuItem] = useState("");

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

    // Handle input change
    const handleChange = (index, value) => {
        const updatedMenu = [...menuItems];
        updatedMenu[index] = value;
        setMenuItems(updatedMenu);
    };

    // Add new menu item
    const addMenuItem = () => {
        if (newMenuItem.trim() !== "") {
            setMenuItems([...menuItems, newMenuItem.trim()]);
            setNewMenuItem("");
        }
    };

    // Remove menu item
    const removeMenuItem = (index) => {
        const updatedMenu = content.filter((_, i) => i !== index);
        setContent(updatedMenu);
    };

    // Save updated menu to the database
    const saveMenu = async () => {
        try {
            await axios.put("http://localhost:5000/api/headerContent", { content: menuItems });
            alert("Header updated successfully!");
        } catch (error) {
            console.error("Error updating header content:", error);
        }
    };

    return (
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Edit Header Menu</h2>
            {content.map((item, index) => (
                <div key={index} className="flex items-center mb-2">
                    <input
                        type="text"
                        value={item?.content[0]}
                        onChange={(e) => handleChange(index, e.target.value)}
                        className="border p-2 w-full"
                    />
                    <button onClick={() => removeMenuItem(index)} className="ml-2 bg-red-500 text-white px-3 py-1 rounded">
                        ❌
                    </button>
                </div>
            ))}
            <div className="flex items-center mt-4">
                <input
                    type="text"
                    value={newMenuItem}
                    onChange={(e) => setNewMenuItem(e.target.value)}
                    placeholder="Add new menu item"
                    className="border p-2 w-full"
                />
                <button onClick={addMenuItem} className="ml-2 bg-green-500 text-white px-4 py-2 rounded">
                    ➕ Add
                </button>
            </div>
            <button onClick={saveMenu} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded w-full">
                💾 Save Changes
            </button>
        </div>
    );
}

export default AdminHeader;
