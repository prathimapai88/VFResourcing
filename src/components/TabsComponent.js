import React, { useState } from 'react';
import './../../styles/TabsComponent.scss';
import RoleEligibility from './RoleEligibility';
import './../../styles/RoleEligibility.scss';
import './../../styles/Skill.scss';
import Skill from './../components/Skill';

const TabComponent = ({details}) => {
  const [activeTab, setActiveTab] = useState('tab1');

  return (
    <div>
      <div className="tabs-container">
        <button
          className={activeTab === 'tab1' ? 'active' : ''}
          onClick={() => setActiveTab('tab1')}
        >
          Role Eligibility
        </button>
        <button
          className={activeTab === 'tab2' ? 'active' : ''}
          onClick={() => setActiveTab('tab2')}
        >
          Skills
        </button>
      </div>
      <div className="tab-content">
        {activeTab === 'tab1' && <RoleEligibility details={details}/>}
        {activeTab === 'tab2' && <Skill />}
      </div>
    </div>
  );
};

export default TabComponent;
