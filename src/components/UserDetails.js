import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserIcon from './../common/component/UserIcon';
import TabsComponent from './TabsComponent';
import Spinner from './../common/component/Spinner';
import { RESOURCES_URL } from "./../common/constants/apiConstants";
import useAPI from "../common/utils/useAPI";

const UserDetails = () => {
  const { id } = useParams();
  const { data: userData, loading, error } = useAPI(`${RESOURCES_URL}/${id}`);

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
