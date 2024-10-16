'use client';
import { useState } from 'react';
import Login from './components/login';
import Dashboard from './components/dashboard';

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div
      onContextMenu={(e) => {
        e.preventDefault();
      }}
    >
      {!isAuthenticated ? <Login setIsAuthenticated={setIsAuthenticated} /> : <Dashboard />}
    </div>
  );
}
