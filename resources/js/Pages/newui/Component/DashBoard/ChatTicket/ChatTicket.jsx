import React, { useState, useEffect, useRef } from "react";
import iconsend from "../../../photo/send icon.svg";
import iconattachment from "../../../photo/ATTCHMENT ICON.svg";
import DashboardLayout from '../../../Layout/DashboardLayout';
import { usePage } from "@inertiajs/inertia-react";
import axios from "axios";
import { route } from "ziggy-js";
import toast from "react-hot-toast";
import { Inertia } from "@inertiajs/inertia";
const ChatApp = () => {
  const { ticket, ticketMessages } = usePage().props;
  const [currentMessage, setCurrentMessage] = useState("");
  const [attachment, setAttachment] = useState(null);
  const [attachmentPreview, setAttachmentPreview] = useState(null);
  const [isHoveringSend, setIsHoveringSend] = useState(false);

  const chatContainerRef = useRef(null);

  useEffect(() => {
    const scrollToBottom = () => {
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
      }
    };
    const delay = setTimeout(scrollToBottom, 1000); // Set a delay of 100ms
    return () => clearTimeout(delay); // Cleanup the timeout on component unmount or update
  }, [ticketMessages]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
        setAttachment(file);
        const reader = new FileReader();
        reader.onload = (event) => {
            setAttachmentPreview(event.target.result);
        };
        reader.readAsDataURL(file);
    }
  };

  const handleRemoveAttachment = () => {
    setAttachment(null);
    setAttachmentPreview(null);
  };

  const handleSendMessage = async () => {
    if (currentMessage.trim() === "" && !attachment) {
      return;
    }
    const formData = new FormData();
    formData.append('ticket_id', ticket.id);
    formData.append('message', currentMessage);
    if (attachment) {
        formData.append('image', attachment);
    }

    const response = await axios.post(route('client.dashboard.ticket.message.store'), formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });

    if (response.data.success) {
        setCurrentMessage("");
        setAttachment(null);
        setAttachmentPreview(null);
    } else {
        toast.error(response.data.message);
    }
    Inertia.reload();
  };

  return (
    <DashboardLayout>
    <div className="chatticket-container">
      <h1 className="chatticket-title">
        {ticket.title} - {ticket.ticket_id} - <span className="chatticket-statusBadge">{ticket.status}</span>
      </h1>
      <div className="chatticket-chatContainer" ref={chatContainerRef}>
        {ticketMessages.map((message) => (
          <div
            key={message.id}
            className={
              message.message_from === "admin"
                ? "chatticket-adminMessageContainer"
                : "chatticket-userMessageContainer"
            }
          >
            <div
              className={`chatticket-messageBubble ${
                message.message_from === "admin" ? "chatticket-userBubble" : ""
              }`}
            >
              <p className="chatticket-messageText">{message.message}</p>
              {message.image && (
                <img
                  src={message.image_url}
                  alt="attachment"
                  className="chatticket-image"
                />
              )}
              <span className="chatticket-messageTime">{message.created_at_human}</span>
            </div>
            {message.message_from === "user" && message.client && (
              <img
                src={message.client.profile_image_url}
                alt="User Avatar"
                className="chatticket-avatar"
              />
            )}
          </div>
        ))}
      </div>

      {attachmentPreview && (
        <div className="chatticket-attachmentPreview">
          <img
            src={attachmentPreview}
            alt="Uploaded Attachment"
            className="chatticket-previewImage"
          />
          <button className="chatticket-removeButton" onClick={handleRemoveAttachment}>
            Remove
          </button>
        </div>
      )}
      {ticket.status == 'open' || ticket.status == 'pending' ? (
      <div className="chatticket-inputContainer">
        <img
          src={iconattachment}
          alt="Attachment Icon"
          className="chatticket-attachmentIcon"
          onClick={() => document.getElementById("fileUpload").click()}
        />
        <input
          id="fileUpload"
          type="file"
          style={{ display: "none" }}
          onChange={handleFileUpload}
        />
        <input
          type="text"
          placeholder="Type your message here..."
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
          className="chatticket-inputField"
        />
        <button
          className={`chatticket-sendButton ${
            isHoveringSend ? "chatticket-sendButtonHover" : ""
          }`}
          onClick={handleSendMessage}
          onMouseEnter={() => setIsHoveringSend(true)}
          onMouseLeave={() => setIsHoveringSend(false)}
        >
          <img className="chatticket-sendIcon" src={iconsend} alt="Send Icon" />
        </button>
      </div>
      ) : <div>
        <p>لا يمكنك الرد على هذا التذكرة</p>
        </div>}
    </div>
    </DashboardLayout>
  );
};

export default ChatApp;
