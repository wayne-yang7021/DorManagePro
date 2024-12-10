import React, { useState } from 'react';
import { useAuth } from "../context/authContext";
import { useMyContext } from '../context/context';

function ManageDiscussion() {
    const { admin } = useAuth(); // Get admin information from AuthContext
    const { posts } = useMyContext(); // Fetch all posts from MyContext
    const [postList, setPostList] = useState(posts); // Local state to manage posts
    const [responseMessage, setResponseMessage] = useState(''); // Used to display success or error messages

    const handleDelete = async (postId) => {
        try {
            const response = await fetch(`http://localhost:8888/api/admin/delete_post`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    mesid: postId, // Send mesid in the request body
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to delete');
            }

            // Update the local state to remove the deleted post
            setPostList((prevList) => prevList.filter((post) => post.mesid !== postId));

            // Display a success message
            setResponseMessage('Post deleted successfully.');

            // Remove the success message after 3 seconds
            setTimeout(() => {
                setResponseMessage('');
            }, 3000);
        } catch (error) {
            console.error('Error deleting post:', error.message);
            setResponseMessage('Failed to delete post.');
            
            // Remove the error message after 3 seconds
            setTimeout(() => {
                setResponseMessage('');
            }, 3000);
        }
    };

    return (
        <div style={styles.container}>
            {/* Admin heading */}
            {admin && <h2 style={styles.heading}>Manage Discussion Board - {admin.dormId}</h2>}

            {/* Success or error message */}
            {responseMessage && <p style={styles.responseMessage}>{responseMessage}</p>}

            {/* Post list */}
            {postList.length > 0 ? (
                <div style={styles.postList}>
                    {postList.map((post) => (
                        <div key={post.mesid} style={styles.postCard}>
                            {/* Top section with timestamp and delete button */}
                            <div style={styles.postHeader}>
                                <span style={styles.timestamp}>{new Date(post.sentTime).toLocaleString()}</span>
                                <button
                                    style={styles.deleteButton}
                                    onClick={() => handleDelete(post.mesid)}
                                >
                                    Delete
                                </button>
                            </div>

                            {/* Main post content */}
                            <div style={styles.postContent}>
                                <h3 style={styles.postTitle}>{post.messages}</h3>
                                {post.url && (
                                    <a
                                        href={post.url}
                                        style={styles.postLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {post.url}
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p style={styles.noData}>No posts available.</p>
            )}
        </div>
    );
}

export default ManageDiscussion;

// Styles for the post design
const styles = {
    container: {
        padding: '20px',
        maxWidth: '800px',
        margin: '0 auto',
        backgroundColor: '#f9f9f9',
    },
    heading: {
        fontSize: '20px',
        color: '#333',
        marginBottom: '20px',
    },
    responseMessage: {
        marginBottom: '20px',
        padding: '10px',
        color: '#155724',
        backgroundColor: '#d4edda',
        border: '1px solid #c3e6cb',
        borderRadius: '4px',
        fontSize: '14px',
    },
    postList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
    },
    postCard: {
        display: 'flex',
        flexDirection: 'column',
        padding: '15px',
        backgroundColor: '#ffffff',
        border: '1px solid #ddd',
        borderRadius: '8px',
        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
        transition: '0.3s ease',
    },
    postHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    timestamp: {
        fontSize: '12px',
        color: '#999',
    },
    deleteButton: {
        backgroundColor: '#ff4d4f',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        padding: '5px 10px',
        fontSize: '12px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
    deleteButtonHover: {
        backgroundColor: '#d9363e',
    },
    postContent: {
        marginTop: '10px',
    },
    postTitle: {
        fontSize: '16px',
        fontWeight: 'bold',
        color: '#333',
        marginBottom: '10px',
    },
    postLink: {
        fontSize: '14px',
        color: '#007bff',
        textDecoration: 'none',
    },
    noData: {
        textAlign: 'center',
        color: '#555',
        fontSize: '16px',
    },
};
