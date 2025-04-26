import React from 'react';
import { BrowserRouter as Router, Route, Routes, useParams } from 'react-router-dom';
import PostList from './components/PostList';
import PostDetails from './components/PostDetails';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PostList />} />
        <Route path="/posts/:postId" element={<PostDetailsWrapper />} />
      </Routes>
    </Router>
  );
};

// Wrapper to pass postId as a prop to PostDetails
const PostDetailsWrapper = () => {
  const { postId } = useParams();
  return <PostDetails postId={postId} />;
};

export default App;