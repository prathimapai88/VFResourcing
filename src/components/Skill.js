import React, { useState, useEffect } from "react";
import { SKILLS_API_URL } from "./../common/constants/apiConstants";
import useAPI from "../common/utils/useAPI";
import SkillItem from "./SkillItem";
import './../../styles/Skill.scss'; // Import the SCSS file

function Skill({ acquiredSkillIds }) {
  const { data: skills, loading, error } = useAPI(SKILLS_API_URL);
  const [showAcquired, setShowAcquired] = useState(false);
  const [filteredSkills, setFilteredSkills] = useState([]);

  useEffect(() => {
    let sortedSkills = [...skills].sort((a, b) => a.name.localeCompare(b.name));
    if (showAcquired) {
      setFilteredSkills(sortedSkills.filter(skill => acquiredSkillIds.includes(skill.id)));
    } else {
      setFilteredSkills(sortedSkills);
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
        <label className="label">
          <input
            type="checkbox"
            checked={showAcquired}
            onChange={(e) => setShowAcquired(e.target.checked)}
          />
          <span className="label-text">Only show acquired skills</span>
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
