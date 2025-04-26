import React, { useState, useEffect } from 'react';
import useDebounce from '../hooks/useDebounce';

const PostSearch = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    onSearch(debouncedQuery);
  }, [debouncedQuery, onSearch]);

  return (
    <input
      type="text"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Rechercher des posts..."
    />
  );
};

export default PostSearch;