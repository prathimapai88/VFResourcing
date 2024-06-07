import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import UserIcon from './../common/component/UserIcon';
import TabsComponent from './TabsComponent';
import Spinner from './../common/component/Spinner';

const UserDetails = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/resources/${id}`);
        setUserData(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [id]);

  if (loading) return <Spinner/>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {userData ? (
        <div>
           <UserIcon details={userData}/>
           <TabsComponent details={userData}/>
           
        </div>
      ) : (
        <p>No user data found.</p>
      )}
    </div>
  );
};

export default UserDetails;
