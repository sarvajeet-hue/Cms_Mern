import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill styles

function AdminHeader() {
  const ref = useRef(null);
  const [content, setContent] = useState([]); // Stores navigation items
  const [editingIndex, setEditingIndex] = useState(null); // Track active editor
  const [updatedContent, setUpdatedContent] = useState(""); // Stores text for editing

  // Fetch header content from DB
  async function getHeaderContent() {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/headerContent"
      );
      setContent(response.data || []); // Ensure it's an array
    } catch (error) {
      console.error("Error fetching header content:", error);
    }
  }

  useEffect(() => {
    getHeaderContent();
    document.addEventListener("mousedown", handleOutsideClick);
  }, []);

  function handleOutsideClick(event) {
    if (ref.current && !ref.current.contains(event.target)) {
      setEditingIndex(null);
    }
  }
  // Handle edit click
  const handleEdit = (index, text) => {
    setEditingIndex(index);
    setUpdatedContent(text);
  };

  const handledelete = async (index) => {
    try {
      
      const existed = await axios.post(
        `http://localhost:5000/api/headerDelete/${encodeURIComponent(content[index])}`
      );

      if (existed.data.length === 0) {
        alert("No data found");
        return;
      }
      
      if(existed){
        getHeaderContent();
      }
      alert("Header deleted successfully"); 

    } catch (error) {
      console.log(error);
    }
  };

  // Toolbar configuration for text formatting
  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ align: [] }],
      ["bold", "italic", "underline"],
      [{ color: [] }, { background: [] }], // Adds text color and background color options
      ["link"],
      ["image"],
      [{ delete: "delete" }], // Add a custom delete button
    ],
  };

  // Save updated navigation content
  const saveHeaderContent = async (index) => {
    try {
      let updatedArray = [...content]; // Make a copy of the current state

      updatedArray[editingIndex] = updatedContent; // Replace the edited item with the new content

      // Send PUT request to update the content in the backend
      const response = await axios.put(
        "http://localhost:5000/api/headerContent",
        { content: updatedArray }
      );

      // Update the state with the latest data from the backend
      setContent(response.data.content); // Make sure it reflects the updated content

      setEditingIndex(null); // Close the editor
      alert("Content updated successfully!");
    } catch (error) {
      console.error("Error updating header content:", error);
    }
  };

  return (
    <header className="bg-blue-600 text-white py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4">
        <h1 className="text-2xl font-bold">
          <Link to="/">My CMS</Link>
        </h1>
        <nav>
          <ul className="flex space-x-6">
            {content.map((nav, index) => (
              <li key={index} className="cursor-pointer relative">
                <button onClick={() => handledelete(index)}>Edit</button>
                {editingIndex === index ? (
                  <div
                    ref={ref}
                    className="absolute bg-white p-2 rounded shadow-lg z-50"
                  >
                    <ReactQuill
                      value={updatedContent}
                      onChange={setUpdatedContent}
                      theme="snow"
                      className="bg-white text-black p-2 rounded-md w-64"
                      modules={modules} // Pass toolbar configuration here
                    />
                    <button
                      onClick={() => saveHeaderContent(index)}
                      className="mt-2 bg-green-500 text-white px-4 py-2 rounded w-full"
                    >
                      ✅ Save
                    </button>
                  </div>
                ) : (
                  <span
                    onClick={() => handleEdit(index, nav)}
                    dangerouslySetInnerHTML={{ __html: nav }}
                  />
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default AdminHeader;
