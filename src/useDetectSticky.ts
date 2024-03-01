import React, { useState, useRef, useEffect } from 'react';

interface ObserverSettings {
  threshold: number[];
}

const useDetectSticky = (
    ref: React.MutableRefObject<unknown>,
    observerSettings: ObserverSettings = { threshold: [1] }
  ): [boolean, React.MutableRefObject<unknown>, React.Dispatch<React.SetStateAction<boolean>>] => {
    const [isSticky, setIsSticky] = useState<boolean>(false);
    const newRef = useRef<unknown>(null);
    
    ref.current ||= newRef.current;
  
    useEffect(() => {
      const cachedRef = ref.current;
      const observer = new IntersectionObserver(
        ([e]) => setIsSticky(e.intersectionRatio < 1),
        observerSettings
      );
  
      observer.observe(cachedRef);
  
      return () => {
        observer.unobserve(cachedRef);
      };
    }, []);
  
    return [isSticky, ref, setIsSticky];
  };

  export default useDetectSticky;