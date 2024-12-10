import React from "react";
import { useMyContext } from "../context/context";

// PostList Component - for displaying posts
function PostList() {
    const { posts } = useMyContext();
    // if (posts[0]) {
    //     console.log("success");
    // }
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

// Styles defined here
const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '20px',
    },
    noPostsText: {
        color: '#666',
    },
    postCard: {
        width: '33%', // Occupies 1/3 of the screen width
        backgroundColor: '#f9f9f9',
        border: '1px solid #ddd',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        marginBottom: '20px',
        padding: '15px',
        position: 'relative', // For absolute positioning of "Anonymous"
    },
    anonymousTag: {
        position: 'absolute',
        top: '10px',
        left: '10px',
        fontSize: '12px',
        color: '#aaa',
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
