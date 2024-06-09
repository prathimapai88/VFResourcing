import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Shimmer from './Shimmer';
import useAPI from '../common/utils/useAPI';
import { RESOURCES_URL } from '../common/constants/apiConstants';
import './../../styles/SideNav.scss';

interface UserData {
  id: string;
  name: string;
}

const SideNav: React.FC = () => {
  const { data: userData, loading, error } = useAPI(RESOURCES_URL);
  const sortedUserData = userData?.slice().sort((a, b) => (a['name'] < b['name'] ? -1 : 1));
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const { id }: { id?: string } = useParams(); // Make id optional

  useEffect(() => {
    setSelectedUserId(id || null); // Use null if id is undefined
  }, [id]);

  const handleUserClick = (userId: string) => {
    setSelectedUserId(userId);
  };

  return (
    <div className="side-nav">
      <div>
        <Link to={`/`}>
          <span className="logo">VF</span>
          <span className="logo-name">RESOURCING</span>
        </Link>
      </div>
      {loading && <Shimmer count={6} />}
      {error && <p>Error: {error}</p>}
      {!loading && !error && (
        <ul>
          {sortedUserData?.map(user => (
            <li className={user && user['id'] === selectedUserId ? 'active' : ''} key={user['id']}>
              <Link onClick={() => handleUserClick(user['id'])} to={`/userDetails/${user['id']}`}>
                {user['name']}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SideNav;
