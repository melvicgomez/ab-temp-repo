'use client';
import { useState } from 'react';
import Login from './components/login';

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div
      onContextMenu={(e) => {
        e.preventDefault();
      }}
    >
      {!isAuthenticated ? (
        <Login setIsAuthenticated={setIsAuthenticated} />
      ) : (
        <div>login</div>
      )}
    </div>
  );
}
