import React, { useState, useEffect, useCallback } from 'react';
import usePosts from '../hooks/usePosts';
import PostSearch from './PostSearch';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

const PostList = () => {
  const { posts, loading, error, fetchMorePosts } = usePosts();
  const [filteredPosts, setFilteredPosts] = useState(posts);
  const [page, setPage] = useState(1);
  const [selectedTag, setSelectedTag] = useState(null);

  const handleSearch = useCallback((query) => {
    let filtered = posts;
    if (selectedTag) {
      filtered = filtered.filter(post => post.tags.includes(selectedTag));
    }
    filtered = filtered.filter(post =>
      post.title.toLowerCase().includes(query.toLowerCase()) ||
      post.body.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredPosts(filtered);
  }, [posts, selectedTag]);

  const handleTagFilter = (tag) => {
    setSelectedTag(tag);
  };

  const loadMorePosts = useCallback(() => {
    setPage((prevPage) => prevPage + 1);
    fetchMorePosts(page + 1);
  }, [fetchMorePosts, page]);

  const setObserverNode = useIntersectionObserver(loadMorePosts);

  useEffect(() => {
    setFilteredPosts(posts);
  }, [posts]);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error.message}</p>;

  return (
    <div>
      <PostSearch onSearch={handleSearch} />
      <div>
        <button onClick={() => handleTagFilter(null)}>Tous</button>
        {/* Ajoutez des boutons pour chaque tag ici */}
      </div>
      {filteredPosts.map(post => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
          <p>Tags: {post.tags.join(', ')}</p>
        </div>
      ))}
      <div ref={setObserverNode} style={{ height: '1px' }} />
    </div>
  );
};

export default PostList;
