import { Link } from "react-router-dom";
import Shimmer from './Shimmer';
import useAPI from "../common/utils/useAPI";
import { RESOURCES_URL } from "./../common/constants/apiConstants";
import './../../styles/SideNav.scss';
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

const SideNav = () => {
  const { data: userData, loading, error } = useAPI(RESOURCES_URL);
  const sortedUserData = userData?.slice().sort((a, b) => a.name.localeCompare(b.name));
  const [selectedUserId, setSelectedUserId] = useState(null);
  const { id } = useParams();

  useEffect(() => {
      setSelectedUserId(id);
  }, [id]);


  const handleUserClick = (id) => {
    setSelectedUserId(id);
  };

  return (
    <div className="side-nav">
      <div>
        <Link to={`/`}>
          <span className="logo">VF</span>
          <span className="logo-name">RESOURCING</span>
        </Link>
      </div>
      {loading && <Shimmer />}
      {error && <p>Error: {error}</p>}
      {!loading && !error && (
        <ul>
          {sortedUserData?.map(user => (
            <li className={user.id === selectedUserId ? 'active' : ''} key={user.id}>
              <Link onClick={() => handleUserClick(user.id)} to={`/userDetails/${user.id}`}>{user.name}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SideNav;
