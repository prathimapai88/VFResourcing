import React, { useEffect, useState } from 'react';
import './../../styles/TabsComponent.scss';
import RoleEligibility from './RoleEligibility';
import './../../styles/RoleEligibility.scss';
import './../../styles/Skill.scss';
import Skill from './Skill';

interface TabComponentProps {
  details: object; 
  id: string; 
}

const TabComponent: React.FC<TabComponentProps> = ({ details, id }) => {
  const [activeTab, setActiveTab] = useState<string>('tab1');
  const [acquiredSkillIds, setAcquiredSkillIds] = useState<number[]>([]);

  useEffect(() => {
    setActiveTab('tab1');
  }, [id]);

  return (
    <div className="tab-layout">
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
        {activeTab === 'tab1' && (
          <RoleEligibility
            details={details}
            setAcquiredSkillIds={setAcquiredSkillIds}
          />
        )}
        {activeTab === 'tab2' && <Skill acquiredSkillIds={acquiredSkillIds} />}
      </div>
    </div>
  );
};

export default TabComponent;
