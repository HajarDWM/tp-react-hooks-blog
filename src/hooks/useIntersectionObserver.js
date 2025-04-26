 import { useEffect, useRef } from 'react';

const useIntersectionObserver = (callback) => {
  const observerNode = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          callback();
        }
      },
      { threshold: 1.0 }
    );

    if (observerNode.current) {
      observer.observe(observerNode.current);
    }

    return () => {
      if (observerNode.current) {
        observer.unobserve(observerNode.current);
      }
    };
  }, [callback]);

  return observerNode;
};

export default useIntersectionObserver;