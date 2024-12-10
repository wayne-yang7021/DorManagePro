import React from "react";
import { useMyContext } from "../context/context";

// PostList Component - for displaying posts
function PostList() {
    const { posts } = useMyContext();

    return (
        <div style={styles.container}>
            {posts.length === 0 ? (
                <p style={styles.noPostsText}>No posts yet. Be the first to post something!</p>
            ) : (
                posts.map((post, index) => (
                    <div key={index} style={styles.postCard}>
                        {/* "Anonymous" tag */}
                        <div style={styles.anonymousTag}>Anonymous</div>
                        {/* Post content */}
                        <div style={styles.postContent}>{post.messages}</div>
                    </div>
                ))
            )}
        </div>
    );
}

// Styles for Windows XP look
const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '20px',
        padding: '10px',
    },
    noPostsText: {
        color: '#666',
        fontFamily: 'Tahoma, Geneva, sans-serif',
        fontSize: '14px',
    },
    postCard: {
        width: '33%', // Occupies 1/3 of the screen width
        backgroundColor: '#E1E1E1', // Soft gray background for card
        border: '2px solid #5A5A5A', // Border similar to XP window frames
        borderRadius: '4px',
        boxShadow: 'inset 1px 1px 8px rgba(255, 255, 255, 0.5), 4px 4px 10px rgba(0, 0, 0, 0.5)', // XP shadow effect
        marginBottom: '20px',
        padding: '15px',
        position: 'relative', // For absolute positioning of "Anonymous"
        fontFamily: 'Tahoma, Geneva, sans-serif',
    },
    anonymousTag: {
        position: 'absolute',
        top: '10px',
        left: '10px',
        fontSize: '12px',
        color: '#A9A9A9', // Lighter gray for XP tags
        fontWeight: 'bold',
    },
    postContent: {
        marginTop: '20px', // Offset for "Anonymous" tag
        fontSize: '16px',
        lineHeight: '1.6',
        color: '#333',
        wordWrap: 'break-word',
    },
};

export default PostList;