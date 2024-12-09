import { useState } from "react";
import {
    EnvelopeIcon,
    PencilSquareIcon,
    LockClosedIcon,
} from "@heroicons/react/24/solid";

import character from "../../../../../assets/character.jpg";
import DashboardLayout from "../../../Layout/DashboardLayout";
import { usePage } from "@inertiajs/inertia-react";
import axios from "axios";
import { route } from "ziggy-js";
import toast from "react-hot-toast";
import { Inertia } from "@inertiajs/inertia";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import qricones from "../../../photo/qr.svg";


const PersonalSettings = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [profileImage, setProfileImage] = useState(null);
    const app_url = usePage().props.app_url;
    const client = usePage().props.auth.client;
    const [isEnabled, setIsEnabled] = useState(client.is_2a);
    const [qrCodeUrl, setQrCodeUrl] = useState("");
    const [code, setCode] = useState("");
    const handleEditClick = () => {
        setIsModalOpen(true);
    };

    const handlePasswordClick = () => {
        setIsPasswordModalOpen(true);
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setSelectedImage(imageUrl);
            setProfileImage(file);
        }
    };
    const handleUpdateClick = async () => {
        try {
            if (profileImage) {
                const formData = new FormData();
                formData.append("profile_image", profileImage);

                const response = await axios.post(
                    route("client.dashboard.update-profile-image"),
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );

                if (response.data.success) {
                    toast.success("Profile image updated successfully");
                    setTimeout(() => {
                        closeModal();
                        setProfileImage(null);
                        Inertia.reload();
                    }, 2000);
                } else {
                    toast.error(response.data.message);
                }
            } else {
                toast.error("Please select an image");
            }
        } catch (error) {
            toast.error("Failed to update profile image");
            console.error(error);
        }
    };
    const handlePasswordChange = async () => {
        if (newPassword === confirmPassword) {
            const response = await axios.post(
                route("client.dashboard.change-password"),
                {
                    current_password: password,
                    new_password: newPassword,
                    new_password_confirmation: confirmPassword,
                }
            );
            if (response.data.success) {
                toast.success("Password changed successfully");
                setTimeout(() => {
                    Inertia.reload();
                    setShowPasswordModal(false);
                }, 2000);
            } else {
                toast.error(response.data.message);
            }
        } else {
            toast.error("Passwords do not match");
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const closePasswordModal = () => {
        setIsPasswordModalOpen(false);
    };
    const toggleSwitch = () => {
        setIsEnabled(!isEnabled);
        if (!isEnabled) {
            axios.get(route("client.dashboard.2fa-qr-url")).then((response) => {
                setQrCodeUrl(response.data.qrCodeUrl);
            });
        } else {
            setIsEnabled(false);
        }
    };
    const enable2fa = () => {
        axios
            .post(route("client.dashboard.enable-2fa.post"), { code: code })
            .then((response) => {
                if (response.data.success) {
                    setIs2faEnabled(true);
                    setIsModalOpen(false);
                    toast.success(response.data.message);
                } else {
                    toast.error(response.data.message);
                }
            });
    };
    const { auth } = usePage().props;
    const user = auth.client;
    const accImg = user.profile_image
        ? app_url + "/storage/" + user.profile_image
        : character;

    return (
        <DashboardLayout>
            <div className="personalstteing-container">
                <h2 className="personalstteing-title">
                    Personal Settings
                </h2>
                <div className="personalstteing-profileSection">
                    <img
                        src={accImg}
                        alt="Profile"
                        className="personalstteing-profileImage"
                    />
                    <div className="personalstteing-profileInfo">
                        <h3 style={{fontSize:"18px" ,marginBottom:"5px"}}>{user.name}</h3>
                        <p style={{fontSize:"18px" }}>{user.email}</p>
                    </div>
                    <div className="personalstteing-buttons">
                        <button
                            className="personalstteing-editButton"
                            alt="Edit Photo"
                            onClick={handleEditClick}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="26"
                                height="26"
                                viewBox="0 0 26 26"
                                fill="none"
                                className="personalstteing-icon"
                            >
                                <path
                                    d="M11.9181 3.16443H5.09428C2.83307 3.16443 1 4.99744 1 7.25857V20.9059C1 23.167 2.83307 25 5.09428 25H18.7419C21.0031 25 22.8361 23.167 22.8361 20.9059L22.8361 14.0822M7.82379 18.1763L12.7892 17.1758C13.0528 17.1227 13.2949 16.9929 13.4849 16.8027L24.6005 5.6814C25.1335 5.14819 25.1331 4.28388 24.5997 3.75112L22.245 1.39917C21.7119 0.866627 20.848 0.86699 20.3153 1.39998L9.19852 12.5225C9.0088 12.7123 8.87926 12.9538 8.8261 13.2169L7.82379 18.1763Z"
                                    stroke="white"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            Edit
                        </button>
                        <button
                            className="personalstteing-passwordButton"
                            alt="Change Password"
                            onClick={handlePasswordClick}
                        >
                            <svg
                                style={{ marginRight: "8px" }}
                                width="25"
                                height="32"
                                viewBox="0 0 25 32"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M12.3636 1C8.10732 4.5825 5.43939 4.75 1 4.75V19.1687C1 24.9225 5.04419 26.4237 12.3636 31C19.6831 26.4237 23.7273 24.9225 23.7273 19.1687C23.7273 13.415 23.7273 4.75 23.7273 4.75C19.2879 4.75 16.6199 4.5825 12.3636 1Z"
                                    stroke="white"
                                    stroke-width="2"
                                    stroke-linejoin="round"
                                />
                                <path
                                    d="M7.5 13.3333V12.5714C7.5 10.039 9.50714 8 12 8C14.4929 8 16.5 10.039 16.5 12.5714V13.3333M7.5 13.3333C6.675 13.3333 6 14.019 6 14.8571V22.4762C6 23.3143 6.675 24 7.5 24H16.5C17.325 24 18 23.3143 18 22.4762V14.8571C18 14.019 17.325 13.3333 16.5 13.3333M7.5 13.3333H16.5M12 17.1429C12.825 17.1429 13.5 17.8286 13.5 18.6667C13.5 19.5048 12.825 20.1905 12 20.1905C11.175 20.1905 10.5 19.5048 10.5 18.6667C10.5 17.8286 11.175 17.1429 12 17.1429Z"
                                    stroke="white"
                                />
                            </svg>
                            Change Password
                        </button>
                    </div>
                </div>
                <div className="personalstteing-switchSection">
                    <span className="personalstteing-label">
                        Two Factor Authentication
                    </span>
                    <label className="personalstteing-switch">
                        <input
                            type="checkbox"
                            checked={isEnabled}
                            onChange={toggleSwitch}
                        />
                        <span className="personalstteing-slider"></span>
                    </label>
                </div>
                <div className="personalstteing-formContainer">
                    <form>
                        <div className="personalstteing-inputGroup">
                            <div>
                                <label className="personalstteing-labelPersonals">Full Name</label>
                                <input
                                    type="text"
                                    disabled
                                    value={user.name.split(" ")[0]}
                                    style={{fontSize:"16px" , color:"#DFBC8A"}}
                                />
                            </div>
                            <div>
                                <label className="personalstteing-labelPersonals">Last Name</label>
                                <input
                                    type="text"
                                    disabled
                                    value={user.name.split(" ")[1]}
                                    style={{fontSize:"16px"}}
                                />
                            </div>
                        </div>

                        <div className="personalstteing-inputGroup">
                            <div>
                                <label className="personalstteing-labelPersonals">Telegram Username</label>
                                <input
                                    type="text"
                                    disabled
                                    value={user.telegram_username}
                                    style={{fontSize:"16px"}}
                                />
                            </div>
                            <div>
                                <label className="personalstteing-labelPersonals">Username</label>
                                <input
                                    type="text"
                                    disabled
                                    value={user.username}
                                    style={{fontSize:"16px"}}
                                />
                            </div>
                        </div>

                        <div className="personalstteing-inputGroup">
                            <div>
                                <label className="personalstteing-labelPersonals">Email</label>
                                <input
                                    type="email"
                                    disabled
                                    value={user.email}
                                    style={{fontSize:"16px"}}
                                />
                            </div>
                            <div>
                                <label className="personalstteing-labelPersonals">Phone Number</label>
                                <PhoneInput
                                    value={client.phone}
                                    disabled={true}
                                    disableCountrySelector={true}
                                    style={{fontSize:"16px"}}
                                />
                            </div>
                        </div>
                    </form>
                </div>
                {isModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white p-6 rounded-2xl shadow-md flex flex-col items-center space-y-5">
                            {selectedImage && (
                                <>
                                    <img
                                        src={selectedImage}
                                        alt="Profile Preview"
                                        className="w-20 h-20 rounded-full shadow-sm"
                                    />
                                </>
                            )}
                            <div className="flex justify-center">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="text-sm"
                                />
                            </div>
                            {selectedImage && (
                                <button
                                    onClick={handleUpdateClick} // Ensure this function is defined
                                    className="bg-primary text-white p-2 rounded"
                                >
                                    Update Image
                                </button>
                            )}
                            <button
                                onClick={closeModal}
                                className="text-white bg-black border border-black p-2 rounded"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}
                {isPasswordModalOpen && (
                    <div className="personalstteing-modalOverlay">
                        <div className="personalstteing-modalContent">
                            <div className="personalstteing-modalHeader" style={{display:"flex",justifyContent:"space-between"}}>
                                <h3>Change Password</h3>
                                <button
                                    onClick={closePasswordModal}
                                    className="personalstteing-closeButton"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="personalstteing-closeButton1"
                                       
                                    >
                                        <line
                                            x1="18"
                                            y1="6"
                                            x2="6"
                                            y2="18"
                                        ></line>
                                        <line
                                            x1="6"
                                            y1="6"
                                            x2="18"
                                            y2="18"
                                        ></line>
                                    </svg>
                                </button>
                            </div>
                            <div className="personalstteing-passwordForm">
                                <label className="personalstteing-label">
                                    Current Password
                                </label>
                                <input
                                    className="personalstteing-input"
                                    onChange={(e) => setPassword(e.target.value)}
                                    type="password"
                                    placeholder="Current Password"
                                    style={{ fontSize: "14px" }}
                                />
                                <label className="personalstteing-label">
                                    New Password
                                </label>
                                <input
                                    className="personalstteing-input"
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    type="password"
                                    placeholder="New Password"
                                    style={{ fontSize: "14px" }}
                                />
                                <label className="personalstteing-label">
                                    Confirm New Password
                                </label>
                                <input
                                    className="personalstteing-input"
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    type="password"
                                    placeholder="Confirm New Password"
                                    style={{ fontSize: "14px" }}
                                />
                                <div className="personalstteing-buttons">
                                    <button
                                    className="personalstteing-saveButton1"
                                     
                                        onClick={handlePasswordChange}
                                    >
                                        Save
                                    </button>
                                    <button
                                    className="personalstteing-saveButton2"
                                   
                                        onClick={closePasswordModal}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {isEnabled && qrCodeUrl ? (
                    <div className="personalstteing-modalOverlay">
                        <div className="personalstteing-modalContent">
                            <h3 style={{ fontSize: "18px" }}>
                                Scan this QR Code to Enable 2FA
                            </h3>
                            <p style={{ fontSize: "18px" }}>
                                Use your authenticator app to scan the QR code
                                below. Please enter the code from your
                                authenticator app to enable 2FA.
                            </p>
                            <div className="personalstteing-qrCode">
                                <img
                                    src={qrCodeUrl}
                                    alt="QR Code"
                                    className="personalstteing-qrCodeImage"
                                  
                                />
                            </div>
                            <div
                                className="personalstteing-inputGroup"
                            
                                style={{
                                    position: "relative",
                                    width: "100%",
                                    textAlign: "center",
                                }}
                            >
                                <img
                                    src={qricones}
                                    alt="Icon"
                                    className="personalstteing-icon22"
                                
                                />
                                <input
                                    type="text"
                                    placeholder="Enter Code"
                                    className="personalstteing-input223"
                                   
                                    onChange={(e) => setCode(e.target.value)}
                                />
                            </div>
                            <div
                                className="personalstteing-modalButtonContainer"
                            >
                                <button
                                    onClick={enable2fa}
                                    className="personalstteing-enableButton"
                                    style={{
                                     
                                    }}
                                >
                                    Enable
                                </button>
                                <button
                                className="personalstteing-cancelButton"
                                   
                                    onClick={() => setIsEnabled(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                ) : null}
            </div>
        </DashboardLayout>
    );
};

export default PersonalSettings;
