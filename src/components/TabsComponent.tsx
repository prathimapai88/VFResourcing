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

  // Fetch the active tab value from the browser URL
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const tabFromUrl = queryParams.get('tab') || 'tab1';
    setActiveTab(tabFromUrl);
  }, [id]);

  // Update the browser URL when the active tab changes
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    queryParams.set('tab', activeTab);
    const newUrl = `${window.location.pathname}?${queryParams.toString()}`;
    window.history.replaceState(null, '', newUrl);
  }, [activeTab]);

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
