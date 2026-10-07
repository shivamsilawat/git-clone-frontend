import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./CreateRepo.css";
const CreateRepo = () => {

    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [visibility, setVisibility] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleCreateRepository = async (e) => {
        e.preventDefault();

        const userId = localStorage.getItem("userId");

        console.log("User ID:", userId);

        try {
            setLoading(true);

            const res = await axios.post(
                "https://git-clone-backend-rnmu.onrender.com/createRepo",
                {
                    name: name,
                    description: description,
                    visibility: visibility,
                    owner: userId
                }
            );

            console.log("Repository created:", res.data);

            alert("Repository created successfully!");
            navigate("/auth");

            setName("");
            setDescription("");
            setVisibility(false);

        } catch (error) {

            console.error(
                "Error creating repository:",
                error.response?.data || error.message
            );

            alert(
                error.response?.data?.message ||
                "Failed to create repository"
            );

        } finally {
            setLoading(false);
        }
    };

    return (
        <div id = "create-repo"> 

            <h1 id="create-repo-title">Create Repository</h1>

            <form id="create-repo-form" onSubmit={handleCreateRepository}>

                <div>
                    <label>Repository name</label>

                    <input
id="repo-name-input"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Repository name"
                    />
                </div>

                <div>
                    <label id="repo-description-label">Description</label>

                    <input
                        id="repo-description-input"
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Description"
                    />
                </div>

                <div>
                    <label id="repo-visibility-label">
                        <input
                            id="repo-visibility-input"
                            type="checkbox"
                            checked={visibility}
                            onChange={(e) => setVisibility(e.target.checked)}
                        />

                        Public repository
                    </label>
                </div>

                <button
     id="create-repo-button"
                    type="submit"
                    disabled={loading}
                >
                    {loading ? "Creating..." : "Create Repository"}
                </button>

            </form>

        </div>
        
    );
};

export default CreateRepo;