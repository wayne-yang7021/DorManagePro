import React, { useState } from "react";
import { useAuth } from "../context/authContext";

// PostForm Component - for creating a new post
function PostForm() {
    const [postText, setPostText] = useState('');
    const { user } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8888/api/user/post', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ssn: user.ssn,
                    dorm_id: user.dormId,
                    messages: postText,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to post');
            }

            const data = await response.json();
            console.log('Post successful:', data);

            // Refresh the page
            window.location.reload();
        } catch (err) {
            console.log("Error while posting: ", err.message);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.window}>
                <div style={styles.titleBar}>
                    <span style={styles.title}>New Post</span>
                </div>
                <form onSubmit={handleSubmit} style={styles.form}>
                    <textarea
                        placeholder="Write something..."
                        value={postText}
                        onChange={(e) => setPostText(e.target.value)}
                        style={styles.textarea}
                        rows="5"
                    ></textarea>
                    <button type="submit" style={styles.button}>
                        Post
                    </button>
                </form>
            </div>
        </div>
    );
}

// CSS-in-JS Styles for Windows XP look
const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        fontFamily: 'Tahoma, Geneva, sans-serif',
    },
    window: {
        width: '400px',
        backgroundColor: '#E1E1E1', // Soft gray background for window
        border: '2px solid #5A5A5A', // Border similar to window frames
        borderRadius: '4px',
        boxShadow: 'inset 1px 1px 8px rgba(255, 255, 255, 0.5), 4px 4px 10px rgba(0, 0, 0, 0.5)',
    },
    titleBar: {
        backgroundColor: '#6C6C6C', // Darker title bar
        padding: '4px 10px',
        color: '#FFFFFF',
        fontSize: '14px',
        fontWeight: 'bold',
        borderTopLeftRadius: '4px',
        borderTopRightRadius: '4px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: '14px',
        fontWeight: 'bold',
    },
    form: {
        padding: '10px',
    },
    textarea: {
        width: '100%',
        height: '100px',
        padding: '10px',
        fontSize: '14px',
        border: '1px solid #A5A5A5',
        borderRadius: '3px',
        boxSizing: 'border-box',
        marginBottom: '10px',
        resize: 'none',
    },
    button: {
        padding: '8px 20px',
        fontSize: '14px',
        backgroundColor: '#C0C0C0', // Classic gray button color
        color: '#000000',
        border: '1px solid #5A5A5A',
        borderRadius: '3px',
        cursor: 'pointer',
        fontFamily: 'Tahoma, Geneva, sans-serif',
    },
    buttonHover: {
        backgroundColor: '#A0A0A0', // Darker gray when hovered
    },
};

export default PostForm;