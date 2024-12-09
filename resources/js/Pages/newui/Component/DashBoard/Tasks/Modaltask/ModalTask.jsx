import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { route } from "ziggy-js";
function Modeltesk2({ taskId, description, instructions, fields }) {
    const [image, setImage] = useState(null);
    const [formValues, setFormValues] = useState({});
    const [errors, setErrors] = useState({});

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageURL = URL.createObjectURL(file);
            setImage(imageURL);
            setFormValues(prevValues => ({
                ...prevValues,
                [event.target.name]: imageURL
            }));
        }
    };

    const handleRemoveImage = () => {
        setImage(null);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormValues(prevValues => ({
            ...prevValues,
            [name]: value
        }));
    };

    const validateForm = () => {
        const newErrors = {};
        fields.forEach(field => {
            if (field.required === 1 && !formValues[field.name.en]) {
                newErrors[field.name.en] = `${field.name.en} is required`;
            }
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (validateForm()) {
            const formData = new FormData();
            formData.append('task_id', taskId);

            // Append form values
            for (const key in formValues) {
                formData.append(key, formValues[key]);
            }

            // Append files
            fields.forEach(field => {
                if (field.type === 'image' && formValues[field.name.en]) {
                    const fileInput = document.querySelector(`input[name="${field.name.en}"]`);
                    if (fileInput && fileInput.files[0]) {
                        formData.append(field.name.en, fileInput.files[0]);
                    }
                }
            });

            try {
                const response = await axios.post(route('client.dashboard.tasks.update.manual'), formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                if (response.data.success) {
                    toast.success(response.data.message);
                    setTimeout(() => {
                        window.location.reload();
                    }, 2000);
                } else {
                    toast.error(response.data.message);
                }
            } catch (error) {
                toast.error('An error occurred while submitting the form.');
            }
        } else {
            for (const field in errors) {
                toast.error(errors[field]);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="Modeltesk2-cardes1-containeres">
                <div className="Modeltesk2-cardes1-headeres">
                    Description of the Task (what needs to be done)
                </div>

                <div className="Modeltesk2-cardes1-body">
                    {/* <div className="Modeltesk2-task-info">
              <span>
                <strong>commission</strong>
                <span className="Modeltesk2-heilight">: 2.5%</span>
              </span>
              <span>
                <strong>Time</strong><span className="Modeltesk2-heilight">: 00:21:33</span>
              </span>
              <span>
                <strong>Category</strong>
                <span className="Modeltesk2-heilight">: Youtube</span>
              </span>
            </div> */}

                    <p dangerouslySetInnerHTML={{ __html: description }} />
                </div>
            </div>

            <div className="Modeltesk2-container">
                <div className="Modeltesk2-cardes2">
                    <div className="Modeltesk2-header">instructions</div>
                    <div className="Modeltesk2-cardes1-body">
                        <p dangerouslySetInnerHTML={{ __html: instructions }} />
                    </div>
                </div>
                {fields.map((field, index) => (
                    <div key={index}>
                        <div className="Modeltesk2-headerform">{field.name.en}</div>
                        <div className="Modeltesk2-section">
                            {field.type === 'text' ? (
                                <input
                                    type="text"
                                    className="Modeltesk2-text-input"
                                    placeholder={field.name.en}
                                    name={field.name.en}
                                    value={formValues[field.name.en] || ''}
                                    onChange={handleInputChange}
                                    required={field.required === 1}
                                />
                            ) : field.type === 'image' ? (
                                <div className="Modeltesk2-upload-box">
                                    <input type="file" id="file" />
                                    <label>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            name={field.name.en}
                                            onChange={handleFileUpload}
                                        />
                                        Attach The File
                                    </label>
                                </div>
                            ) : null}
                        </div>
                        {image && field.type === 'image' && (
                            <div className="Modeltesk2-image-preview">
                                <img src={image} alt="Modeltesk2-Uploaded preview" />
                                <button
                                    className="Modeltesk2-remove-button"
                                    onClick={handleRemoveImage}
                                >
                                    Remove
                                </button>
                            </div>
                        )}
                    </div>
                ))}
                {/* <div className="Modeltesk2-headerform">notes</div>
                <div className="Modeltesk2-section">
                    <div className="Modeltesk2-notes-container">
                        <textarea
                            className="Modeltesk2-textarea"
                            placeholder="notes"
                        ></textarea>
                    </div>
                </div> */}
                <button className="Modeltesk2-button ">Send</button>
            </div>
        </form>
    );
}

export default Modeltesk2;
