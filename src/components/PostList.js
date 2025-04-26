import React, { useCallback, useMemo } from 'react';
import usePosts from '../hooks/usePosts';
import PostSearch from './PostSearch';

const PostList = () => {
  const { posts, loading, error } = usePosts();
  const [filteredPosts, setFilteredPosts] = useState(posts);

  const handleSearch = useCallback((query) => {
    const filtered = posts.filter(post =>
      post.title.toLowerCase().includes(query.toLowerCase()) ||
      post.body.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredPosts(filtered);
  }, [posts]);

  const memoizedPosts = useMemo(() => filteredPosts, [filteredPosts]);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error.message}</p>;

  return (
    <div>
      <PostSearch onSearch={handleSearch} />
      {memoizedPosts.map(post => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
};

export default PostList;
