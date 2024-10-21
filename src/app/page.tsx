'use client';
import { useEffect, useState } from 'react';
import Login from './components/login';
import Dashboard from './components/dashboard';

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const compareDates = () => {
    const storedDate = localStorage.getItem('futureDateTime'); // Get from localStorage
    if (storedDate) {
      const currentTime = new Date();
      const futureTime = new Date(storedDate);
      return currentTime < futureTime; // Compare current time and future date
    }
    return false;
  };

  // Use useEffect to compare dates when the component loads
  useEffect(() => {
    setIsAuthenticated(compareDates());
  }, []); // Empty dependency array to run only on mount

  const calculateFutureDateTime = () => {
    const now = new Date();
    now.setHours(now.getHours() + 120); // Add 120 hours
    return now.toISOString(); // Format as ISO string (e.g., 2024-10-27T14:34:00.000Z)
  };

  return (
    <div
      onContextMenu={(e) => {
        e.preventDefault();
      }}
    >
      {!isAuthenticated ? (
        <Login
          setIsAuthenticated={(f) => {
            setIsAuthenticated(f);
            const dateTime = calculateFutureDateTime();
            localStorage.setItem('futureDateTime', dateTime); // Store in localStorage
          }}
        />
      ) : (
        <Dashboard />
      )}
    </div>
  );
}
