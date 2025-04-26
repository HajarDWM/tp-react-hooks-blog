import { useEffect, useRef, useState } from 'react';

const useIntersectionObserver = (callback) => {
  const observer = useRef();
  const [node, setNode] = useState(null);

  useEffect(() => {
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        callback();
      }
    });

    const { current: currentObserver } = observer;

    if (node) {
      currentObserver.observe(node);
    }

    return () => currentObserver.disconnect();
  }, [node, callback]);

  return setNode;
};

export default useIntersectionObserver;
