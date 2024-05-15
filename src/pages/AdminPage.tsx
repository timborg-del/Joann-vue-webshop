// AdminPage.tsx
import React from 'react';
import './AdminPage.css'; // Import CSS file for styling

const AdminPage: React.FC = () => {
  return (
    <div className="admin-container">
      <h1>Welcome to the Admin Page</h1>
      <p>This is a restricted area for admin users only.</p>
      {/* Add any admin-related content here */}
    </div>
  );
};

export default AdminPage;
