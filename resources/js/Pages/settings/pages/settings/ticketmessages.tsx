import React, { useState } from 'react';
import DashboardLayout from "../../../../Pages/settings/Layout";
import { usePage } from "@inertiajs/inertia-react";

const TicketMessages = () => {
    const { ticket, ticketMessages } = usePage().props;
    console.log(ticket);
    const [reply, setReply] = useState('');
    const [image, setImage] = useState<File | null>(null);

    const handleReplyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setReply(e.target.value);
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImage(e.target.files[0]);
            console.log('Image selected:', e.target.files[0]);
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Reply:', reply);
        console.log('Image:', image);
    };

    const styles = {
        container: {
            maxWidth: '900px',
            margin: 'auto',
            padding:20,
            borderRadius: '20px',
            fontFamily: 'Arial, sans-serif',
            paddingTop: '40px',
        },
        header: {
            alignItems: 'center',
            marginBottom: '20px'
        },
        title: {
            fontSize: '18px',
            color: '#333',
            margin: 0
        },
        statusBadge: {
            color: 'white',
            backgroundColor: '#d9534f',
            padding: '4px 10px',
            borderRadius: '5px',
            fontSize: '14px'
        },
        button: {
            backgroundColor: '#6c63ff',
            color: 'white',
            borderRadius: '8px',
            padding: '5px 15px',
            border: 'none',
            cursor: 'pointer'
        },
        contentBox: {
            backgroundColor: '#f4f6f8',
            padding: '15px',
            borderRadius: '10px',
            marginBottom: '20px',
            border: '2px solid #2d3a4a'
        },
        contentText: {
            margin: '10px 0',
            color: '#555'
        },
        replyBox: {
            backgroundColor: '#f4f6f8',
            padding: '15px',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '20px',
            border: '2px solid #be9e88'
        },
        profileImage: {
            width: '30px',
            height: '30px',
            borderRadius: '50%',
            backgroundColor: '#d9d9d9'
        },
        supportText: {
            color: '#555'
        },
        replyForm: {
            backgroundColor: '#f9f9f9',
            padding: '15px',
            borderRadius: '10px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
        },
        textArea: {
            resize: 'vertical',
            minHeight: '80px',
            padding: '8px',
            fontSize: '14px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            outline: 'none'
        },
        attachBox: {
            border: '2px dotted #ccc',
            borderRadius: '10px',
            height: '100px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#555',
            fontSize: '14px',
            cursor: 'pointer',
            overflow: 'hidden',
            position: 'relative'
        },
        fileInput: {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            opacity: 0,
            cursor: 'pointer'
        },
        submitButton: {
            padding: '10px',
            fontSize: '16px',
            color: 'white',
            backgroundColor: '#007bff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            transition: 'background-color 0.3s'
        },
        contentImage: {
            width: '100px',
            height: '100px',
            borderRadius: '10px',
            marginTop: '10px'
        },
        // Media Queries for Responsive Design
        '@media (max-width: 600px)': {
            container: {
                padding: '10px'
            },
            header: {
                flexDirection: 'column',
                alignItems: 'flex-start'
            },
            button: {
                width: '100%',
                textAlign: 'center'
            },
            contentBox: {
                padding: '10px'
            },
            replyBox: {
                flexDirection: 'column',
                alignItems: 'flex-start'
            },
            replyForm: {
                padding: '10px'
            },
            submitButton: {
                width: '100%'
            }
        }
    };
    return (
        <>
            <DashboardLayout>
                <div style={styles.container}>
                    <div style={styles.header}>
                        <h3 style={styles.title}>
                            {ticket.title} - {ticket.ticket_id} - <span style={styles.statusBadge}>{ticket.status}</span>
                        </h3>
                    </div>
                    {ticketMessages.map((message: any) => (
                        message.message_from == 'user' ?
                        <div style={styles.contentBox}>
                            <p style={styles.contentText}>{message.client.name}</p>
                            <p style={styles.contentText}>
                                {message.message}
                            </p>
                            {message.image && message.image != '' && (
                                <img src={message.image_url} style={styles.contentImage} alt='image'/>
                            )}
                        </div>
                        :
                        <div style={styles.replyBox}>
                            <div style={styles.profileImage}>
                                <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" width="30" height="30" viewBox="0 0 256 256" xmlSpace="preserve">
                                    <defs></defs>
                                    <g style={{ stroke: 'none', strokeWidth: 0, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fill: 'none', fillRule: 'nonzero', opacity: 1 }} transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)">
                                        <path d="M 45 0 C 20.147 0 0 20.147 0 45 c 0 24.853 20.147 45 45 45 s 45 -20.147 45 -45 C 90 20.147 69.853 0 45 0 z M 45 22.007 c 8.899 0 16.14 7.241 16.14 16.14 c 0 8.9 -7.241 16.14 -16.14 16.14 c -8.9 0 -16.14 -7.24 -16.14 -16.14 C 28.86 29.248 36.1 22.007 45 22.007 z M 45 83.843 c -11.135 0 -21.123 -4.885 -27.957 -12.623 c 3.177 -5.75 8.144 -10.476 14.05 -13.341 c 2.009 -0.974 4.354 -0.958 6.435 0.041 c 2.343 1.126 4.857 1.696 7.473 1.696 c 2.615 0 5.13 -0.571 7.473 -1.696 c 2.083 -1 4.428 -1.015 6.435 -0.041 c 5.906 2.864 10.872 7.591 14.049 13.341 C 66.123 78.957 56.135 83.843 45 83.843 z" style={{ stroke: 'none', strokeWidth: 1, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fill: 'rgb(0,0,0)', fillRule: 'nonzero', opacity: 1 }} transform="matrix(1 0 0 1 0 0)" strokeLinecap="round" />
                                    </g>
                                </svg>
                            </div>
                            <p style={styles.supportText}>{message.message}</p>
                            {message.image && message.image != '' && (
                                <img src={message.image_url} style={styles.contentImage} alt='image'/>
                            )}
                        </div>
                    ))}
                    {(ticket.status == 'open' || ticket.status == 'pending') ? (
                        <form onSubmit={handleSubmit} style={styles.replyForm}>
                            <textarea
                            style={styles.textArea}
                            value={reply}
                            onChange={handleReplyChange}
                            placeholder="اكتب ردك هنا"
                            required
                        ></textarea>
                        <div style={styles.attachBox}>
                            Attach Image
                            <input
                                type="file"
                                style={styles.fileInput}
                                onChange={handleImageUpload}
                            />
                        </div>
                        <button
                            type="submit"
                            style={styles.submitButton}
                        >
                            إرسال الرد
                            </button>
                        </form>
                    ) : <div>
                        <p>لا يمكنك الرد على هذا التذكرة</p>
                        </div>}
                </div>
            </DashboardLayout>
        </>
    );
}

export default TicketMessages;