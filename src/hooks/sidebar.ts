"use client"
import { useState, useEffect } from 'react';

const useSidebar = () => {
  // Defining types for state variables
  const [isSidebarPinned, setSidebarPinned] = useState<boolean>(() => {
    return JSON.parse(localStorage.getItem('isSidebarPinned') || 'false') || false;
  });

  const [isSidebarOpen, setSidebarOpen] = useState<boolean>(() => {
    return JSON.parse(localStorage.getItem('isSidebarOpen') || 'false') || false;
  });

  const toggleSidebar = () => {
    setSidebarOpen((prevState) => {
      const newState = !prevState;
      localStorage.setItem('isSidebarOpen', JSON.stringify(newState));
      return newState;
    });
  };

  const toggleSidebarPin = () => {
    setSidebarPinned((prevState) => {
      const newState = !prevState;
      localStorage.setItem('isSidebarPinned', JSON.stringify(newState));
      return newState;
    });
  };

  useEffect(() => {
    localStorage.setItem('isSidebarOpen', JSON.stringify(isSidebarOpen));
    localStorage.setItem('isSidebarPinned', JSON.stringify(isSidebarPinned));
  }, [isSidebarOpen, isSidebarPinned]);

  // Defining the return type of the hook
  return {
    isSidebarOpen,
    isSidebarPinned,
    toggleSidebar,
    toggleSidebarPin,
  };
};

export default useSidebar;