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
    <div style={styles.container}>
      <h1 style={styles.title}>{ticket.title} - {ticket.ticket_id} - <span style={styles.statusBadge}>{ticket.status}</span></h1>
      <div style={styles.chatContainer} ref={chatContainerRef}>
        {ticketMessages.map((message) => (
          <div
            key={message.id}
            style={
              message.message_from === "admin"
                ? styles.adminMessageContainer
                : styles.userMessageContainer
            }
          >
            {/* {message.message_from === "admin" && message.user && (
              <img
                src={message.user.profile_image_url}
                alt="Admin Avatar"
                style={styles.avatar}
              />
            )} */}
            <div
              style={{
                ...styles.messageBubble,
                ...(message.message_from === "admin" ? styles.userBubble : {}),
              }}
            >
              <p style={styles.messageText}>{message.message}</p>
              {message.image && (
                <img
                  src={message.image_url}
                  alt="attachment"
                  style={styles.image}
                />
              )}
              <span style={styles.messageTime}>{message.created_at_human}</span>
            </div>
            {message.message_from === "user" && message.client && (
              <img
                src={message.client.profile_image_url}
                alt="User Avatar"
                style={styles.avatar}
              />
            )}
          </div>
        ))}
      </div>

      {attachmentPreview && (
        <div style={styles.attachmentPreview}>
          <img
            src={attachmentPreview}
            alt="Uploaded Attachment"
            style={styles.previewImage}
          />
          <button style={styles.removeButton} onClick={handleRemoveAttachment}>
            Remove
          </button>
        </div>
      )}
      {ticket.status == 'open' || ticket.status == 'pending' ? (
      <div style={styles.inputContainer}>
        <img
          src={iconattachment}
          alt="Attachment Icon"
          style={styles.attachmentIcon}
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
          style={styles.inputField}
        />
        <button
          style={{
            ...styles.sendButton,
            ...(isHoveringSend ? styles.sendButtonHover : {}),
          }}
          onClick={handleSendMessage}
          onMouseEnter={() => setIsHoveringSend(true)}
          onMouseLeave={() => setIsHoveringSend(false)}
        >
          <img style={styles.sendIcon} src={iconsend} alt="Send Icon" />
        </button>
      </div>
      ) : <div>
        <p>لا يمكنك الرد على هذا التذكرة</p>
        </div>}
    </div>
    </DashboardLayout>
  );
};

const styles = {
  container: {
    textAlign: "center",
    margin: "20px auto",
    maxWidth: "90%",
    backgroundColor: "#f9f9f9",
    borderRadius: "10px",
    padding: "20px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    height: "auto",
    direction: "rtl",
  },
  statusBadge: {
    color: 'white',
    backgroundColor: '#d9534f',
    padding: '4px 10px',
    borderRadius: '5px',
    fontSize: '14px'
},
  title: {
    fontSize: "24px",
    color: "#333",
    marginBottom: "20px",
  },
  chatContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    marginBottom: "20px",
    maxHeight: "60vh",
    overflowY: "auto",
    padding: "10px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  userMessageContainer: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: "10px",
  },
  adminMessageContainer: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: "10px",
  },
  messageBubble: {
    minWidth: "10rem",
    maxWidth: "70%",
    padding: "15px 26px 25px 26px",
    borderRadius: "15px",
    backgroundColor: "#f0f0f0",
    position: "relative",
    border: "1px solid #d4af37",
    marginBottom: "10px",
  },
  userBubble: {
    backgroundColor: "#fff",
  },
  messageText: {
    fontSize: "14px",
    margin: "0 0 5px 0",
    color: "#333",
    textAlign: "right",
  },
  messageTime: {
    fontSize: "12px",
    color: "#aaa",
    position: "absolute",
    bottom: "5px",
    left: "10px",
  },
  image: {
    marginTop: "10px",
    maxWidth: "100%",
    borderRadius: "10px",
  },
  avatar: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
  },
  attachmentPreview: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#f9f9f9",
    padding: "10px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    marginBottom: "20px",
  },
  previewImage: {
    width: "100px",
    height: "100px",
    borderRadius: "10px",
    objectFit: "cover",
  },
  removeButton: {
    backgroundColor: "#f44336",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    padding: "5px 10px",
    cursor: "pointer",
  },
  inputContainer: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginTop: "20px",
    flexWrap: "wrap",
  },
  attachmentIcon: {
    width: "30px",
    height: "30px",
    cursor: "pointer",
    marginRight: "10px",
  },
  inputField: {
    flex: "1",
    padding: "10px",
    borderRadius: "20px",
    border: "1px solid #ccc",
    fontSize: "14px",
    minWidth: "200px",
    textAlign: "right",
  },
  sendButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "10px",
    width: "45px",
    height: "45px",
    borderRadius: "50%",
    border: "none",
    cursor: "pointer",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.2s, box-shadow 0.2s",
  },
  sendButtonHover: {
    transform: "scale(1.1)",
    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)",
  },
  sendIcon: {
    width: "20px",
    height: "20px",
  },
  '@media (max-width: 600px)': {
    container: {
      padding: "10px",
    },
    inputField: {
      fontSize: "12px",
    },
  },
};

export default ChatApp;
