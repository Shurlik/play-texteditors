"use client";
import { useState, useEffect } from 'react';

const useSidebar = () => {
  // Check for browser environment
  const isBrowser = typeof window !== "undefined";

  // Initialize state with a function to avoid SSR issues
  const [isSidebarPinned, setSidebarPinned] = useState<boolean>(() => {
    if (isBrowser) {
      return JSON.parse(localStorage.getItem('isSidebarPinned') || 'false');
    }
    return false;
  });

  const [isSidebarOpen, setSidebarOpen] = useState<boolean>(() => {
    if (isBrowser) {
      return JSON.parse(localStorage.getItem('isSidebarOpen') || 'false');
    }
    return false;
  });

  const toggleSidebar = () => {
    setSidebarOpen((prevState) => {
      const newState = !prevState;
      if (isBrowser) localStorage.setItem('isSidebarOpen', JSON.stringify(newState));
      return newState;
    });
  };

  const toggleSidebarPin = () => {
    setSidebarPinned((prevState) => {
      const newState = !prevState;
      if (isBrowser) localStorage.setItem('isSidebarPinned', JSON.stringify(newState));
      return newState;
    });
  };

  useEffect(() => {
    if (isBrowser) {
      localStorage.setItem('isSidebarOpen', JSON.stringify(isSidebarOpen));
      localStorage.setItem('isSidebarPinned', JSON.stringify(isSidebarPinned));
    }
  }, [isSidebarOpen, isSidebarPinned, isBrowser]);

  return {
    isSidebarOpen,
    isSidebarPinned,
    toggleSidebar,
    toggleSidebarPin,
  };
};

export default useSidebar;