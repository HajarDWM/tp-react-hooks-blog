import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PostDetails = ({ postId }) => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const response = await axios.get(`https://dummyjson.com/posts/${postId}`);
        setPost(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchPostDetails();
  }, [postId]);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error.message}</p>;

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <p>Tags: {post.tags.join(', ')}</p>
    </div>
  );
};

export default PostDetails;
