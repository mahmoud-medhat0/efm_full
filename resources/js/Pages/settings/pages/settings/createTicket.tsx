import { useState } from "react";
import DashboardLayout from "../../../../Pages/settings/Layout";
import { usePage } from "@inertiajs/inertia-react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Inertia } from "@inertiajs/inertia";
import { route } from "ziggy-js";
const CreateTicket = () => {
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
    const { ticketCategories, lang: locale } = usePage().props;
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        console.log(title, category, description, image);
        const response = await axios.post(route("client.dashboard.create-ticket.post"), {
            title: title,
            ticket_category_id: category,
            description: description,
            image: image,
        });
        if (response.data.success) {
            toast.success(response.data.message);
            Inertia.visit(route("client.dashboard"));
        } else {
            toast.error(response.data.message);
        }
    };
    const handleImageChange = (event: any) => {
        const file = event.target.files[0];
        if (file) {
            setImage(file);
        }
    };
    return (
        <DashboardLayout>
            <div className="pt-10 max-w-md mx-auto bg-black shadow-2xl rounded-xl p-10 border border-gray-200">
                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="flex flex-col">
                        <label className="mb-3 text-lg font-semibold text-gold">
                            Ticket Title
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="border border-gold rounded-lg p-3 text-gold focus:outline-none focus:ring-2 focus:ring-gold"
                            placeholder="اكتب عنوان التذكرة"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-3 text-lg font-semibold text-gold">
                            Category
                        </label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="border border-gold rounded-lg p-3 text-gold focus:outline-none focus:ring-2 focus:ring-black"
                        >
                            <option value="">Select Category</option>
                            {ticketCategories.map((category) => (
                                <option value={category.id}>
                                    {category.name[locale]}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-3 text-lg font-semibold text-gold">
                            DescriptionTicker
                        </label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="border border-gold rounded-lg p-3 text-gold focus:outline-none focus:ring-2 focus:ring-gold"
                            placeholder="وصف المشكلة أو الطلب"
                        ></textarea>
                    </div>

                    <div
                        style={{
                            marginBottom: "15px",
                            border: "1px dashed #666",
                            padding: "20px",
                            textAlign: "center",
                        }}
                    >
                        <label
                            htmlFor="file-upload"
                            style={{ cursor: "pointer" }}
                        >
                            <input
                                id="file-upload"
                                type="file"
                                onChange={handleImageChange}
                                style={{ display: "none" }}
                            />
                            <span style={{ color: "#be9e88" }}>
                                Attach Image
                            </span>
                        </label>
                        {image && (
                            <div style={{ marginTop: "10px" }}>
                                <p>Selected file: {image.name}</p>
                                <img
                                    src={URL.createObjectURL(image)}
                                    alt="Selected"
                                    style={{
                                        marginTop: "10px",
                                        width: "100%",
                                        maxWidth: "200px",
                                        borderBottom: "10px solid #800000",
                                    }}
                                />
                            </div>
                        )}
                    </div>

                    <div className="flex justify-between">
                        <button
                            type="submit"
                            className="bg-gradient-to-r from-gold to-gold text-white py-2 px-5 rounded-lg shadow-md hover:from-black hover:to-black focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            Create Ticket
                        </button>
                        <button
                            type="button"
                            className="bg-black text-white py-2 px-5 rounded-lg shadow-md hover:bg-black focus:outline-none focus:ring-2 focus:ring-black"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </DashboardLayout>
    );
};

export default CreateTicket;
