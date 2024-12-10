import React from 'react';
import Navbar from '../components/NavBar';
import PostForm from '../components/PostForm';
import PostList from '../components/PostList';

// Main DiscussionBoard Component
function DiscussionBoard() {
    return (
        <div>
            <Navbar />
            <div>
                <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Discussion Board</h1>
                <PostForm />
                <PostList />
            </div>
        </div>
    );
}

export default DiscussionBoard;
