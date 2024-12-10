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

            // 刷新頁面
            window.location.reload(); // 使用此方式刷新整個頁面
        } catch (err) {
            console.log("Error while posting: ", err.message);
        }
    };

    return (
        <div style={styles.container}>
            <form onSubmit={handleSubmit} style={styles.form}>
                <textarea
                    placeholder="Write something..."
                    value={postText}
                    onChange={(e) => setPostText(e.target.value)}
                    style={styles.textarea}
                    rows="3"
                ></textarea>
                <button type="submit" style={styles.button}>
                    Post
                </button>
            </form>
        </div>
    );
}

// CSS-in-JS Styles
const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '30vh', // Full height to center vertically
        // backgroundColor: '#f4f4f4', // Light background for the page
    },
    form: {
        width: '40%', // Form width
        backgroundColor: '#ffffff', // Form background
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 3px 8px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    textarea: {
        width: '100%', // Full width of the form
        padding: '15px',
        fontSize: '16px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        boxSizing: 'border-box',
        marginBottom: '20px', // Space between textarea and button
        resize: 'none', // Prevent resizing
    },
    button: {
        padding: '12px 30px',
        fontSize: '16px',
        backgroundColor: '#007BFF',
        color: '#ffffff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
    buttonHover: {
        backgroundColor: '#0056b3', // Darker blue on hover
    },
};

export default PostForm;
