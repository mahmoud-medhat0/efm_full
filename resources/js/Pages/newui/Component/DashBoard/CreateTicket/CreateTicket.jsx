import React, { useState } from 'react';
import logo from "../../../photo/logo withedraw.svg";
import DashboardLayout from '../../../Layout/DashboardLayout';
import { usePage } from "@inertiajs/inertia-react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Inertia } from "@inertiajs/inertia";
import { route } from "ziggy-js";

const CreateTicket = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const { ticketCategories, lang: locale } = usePage().props;

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(URL.createObjectURL(file));
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await axios.post(route("client.dashboard.create-ticket.post"), {
        title: title,
        ticket_category_id: category,
        description: description,
        image: selectedFile,
    });
    if (response.data.success) {
        toast.success(response.data.message);
        Inertia.visit(route("client.dashboard.tickets"));
    } else {
        toast.error(response.data.message);
    }
  };

  return (
    <DashboardLayout>
      <div className="createticket-fullWidthDiv">
        <h2 className="createticket-title">Create Ticket</h2>
        <div className="createticket-container">
          <center>
          <img src={logo} alt="Logo" className="createticket-logo" />
          </center>
          <form className="createticket-form">
            <label className="createticket-label">Ticket Title</label>
            <input
              type="text"
              placeholder="Ticket Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="createticket-input"
            />

            <label className="createticket-label">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="createticket-select"
            >
              <option>Select Category</option>
              {ticketCategories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name[locale]}
                </option>
              ))}
            </select>

            <label className="createticket-label">Uploading the file</label>
            <div className="createticket-fileUploadContainer">
              <input
                type="file"
                id="file"
                onChange={handleFileChange}
                className="createticket-fileInput"
              />
              <label htmlFor="file" className="createticket-fileLabel">
                Attach The File
              </label>
            </div>

            {selectedFile && (
              <div className="createticket-previewContainer">
                <img src={selectedFile} alt="Preview" className="createticket-previewImage" />
                <button onClick={handleRemoveFile} className="createticket-removeButton">
                  Remove
                </button>
              </div>
            )}

            <label className="createticket-label">Description</label>
            <textarea
              placeholder="Description of the problem or request"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="createticket-textarea"
            />

            <div className="createticket-buttonsContainer">
              <button onClick={handleSubmit} className="createticket-sendButton">
                Send
              </button>
              <button type="button" className="createticket-cancelButton">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CreateTicket;
