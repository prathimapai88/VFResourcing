import React, { useState, useEffect } from "react";
import { SKILLS_API_URL } from "./../common/constants/apiConstants";
import useAPI from "../common/utils/useAPI";
import SkillItem from "./SkillItem";


function Skill({ acquiredSkillIds }) {
  const { data: skills, loading, error } = useAPI(SKILLS_API_URL);
  const [showAcquired, setShowAcquired] = useState(false);
  const [filteredSkills, setFilteredSkills] = useState([]);

  useEffect(() => {
    if (showAcquired) {
      setFilteredSkills(skills.filter(skill => acquiredSkillIds.includes(skill.id)));
    } else {
      setFilteredSkills(skills);
    }
  }, [showAcquired, skills, acquiredSkillIds]);

  const handleRetry = (id) => {
    console.log(`Retrying skill with id: ${id}`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="skills-container">
      <div className="filter-options">
        <label>
          <input
            type="checkbox"
            checked={showAcquired}
            onChange={(e) => setShowAcquired(e.target.checked)}
          />
          Only show acquired skills
        </label>
      </div>
      <div className="skills-list">
        {filteredSkills.map((skill) => (
          <SkillItem
            key={skill.id}
            acquiredSkillIds={acquiredSkillIds}
            skill={skill}
            onRetry={handleRetry}
          />
        ))}
      </div>
    </div>
  );
}

export default Skill;
