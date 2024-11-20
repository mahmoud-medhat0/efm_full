import React, { useState } from 'react';
import styles from './CreateTicket.module.css'; // Import the CSS module
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
      <div className={styles.fullWidthDiv}>
        <h2 className={styles.title}>Create Ticket</h2>
        <div className={styles.container}>
          <center>
          <img src={logo} alt="Logo" className={styles.logo} />
          </center>
          <form className={styles.form}>
            <label className={styles.label}>Ticket Title</label>
            <input
              type="text"
              placeholder="Ticket Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={styles.input}
            />

            <label className={styles.label}>Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={styles.select}
            >
              <option>Select Category</option>
              {ticketCategories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name[locale]}
                </option>
              ))}
            </select>

            <label className={styles.label}>Uploading the file</label>
            <div className={styles.fileUploadContainer}>
              <input
                type="file"
                id="file"
                onChange={handleFileChange}
                className={styles.fileInput}
              />
              <label htmlFor="file" className={styles.fileLabel}>
                Attach The File
              </label>
            </div>

            {selectedFile && (
              <div className={styles.previewContainer}>
                <img src={selectedFile} alt="Preview" className={styles.previewImage} />
                <button onClick={handleRemoveFile} className={styles.removeButton}>
                  Remove
                </button>
              </div>
            )}

            <label className={styles.label}>Description</label>
            <textarea
              placeholder="Description of the problem or request"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={styles.textarea}
            />

            <div className={styles.buttonsContainer}>
              <button onClick={handleSubmit} className={styles.sendButton}>
                Send
              </button>
              <button type="button" className={styles.cancelButton}>
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
