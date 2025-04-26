 import { useState, useEffect } from 'react';
import axios from 'axios';

const usePosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMorePosts = async (page) => {
    try {
      const response = await axios.get(`https://dummyjson.com/posts?limit=10&skip=${(page - 1) * 10}`);
      setPosts((prevPosts) => [...prevPosts, ...response.data.posts]);
    } catch (err) {
      setError(err);
    }
  };

  useEffect(() => {
    const fetchInitialPosts = async () => {
      try {
        const response = await axios.get('https://dummyjson.com/posts?limit=10');
        setPosts(response.data.posts);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchInitialPosts();
  }, []);

  return { posts, loading, error, fetchMorePosts };
};

export default usePosts;