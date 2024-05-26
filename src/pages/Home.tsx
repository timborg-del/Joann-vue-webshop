import React from 'react';
import './Home.css'; // Import CSS file for Home styles
import useFetchData from '../hooks/useFetchData';

const Home: React.FC = () => {
  const { data, isLoading, error } = useFetchData('http://localhost:7203/api/user/1'); // Adjust URL as necessary

  return (
    <div className="home-container">
      <div className="home-content">
        <h2>Welcome</h2>
        <p>
          This is the homepage of your online store. You can provide a brief introduction to your store,
          showcase featured products, or include any other relevant information here.
        </p>
        <h3>User Information</h3>
        {isLoading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        {data && (
          <div>
            <p>Name: {data.Name}</p>
            <p>Email: {data.Email}</p>
            <p>Address: {data.Address}</p>
            <p>Phone: {data.PhoneNumber}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;




