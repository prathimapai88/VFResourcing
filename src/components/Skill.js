import React, { useState, useEffect } from "react";
import { SKILLS_API_URL } from "./../common/constants/apiConstants";
import useAPI from "../common/utils/useAPI";
import SkillItem from "./SkillItem";
import "./../../styles/Skill.scss";

function Skill(props) {
  const { data: skills, loading, error } = useAPI(SKILLS_API_URL);
  const [acquiredSkillIds, setAcquiredSkillIds] = useState(
    props.acquiredSkillIds
  );
  const [showAcquired, setShowAcquired] = useState(false);
  const [filteredSkills, setFilteredSkills] = useState([]);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const initialShowAcquired = queryParams.get("showAcquired") === "true";
    setShowAcquired(initialShowAcquired); // Set initial value of showAcquired
    let sortedSkills = [...skills].sort((a, b) => a.name.localeCompare(b.name));
    if (initialShowAcquired) {
      setFilteredSkills(
        sortedSkills.filter((skill) => acquiredSkillIds.includes(skill.id))
      );
    } else {
      setFilteredSkills(sortedSkills);
    }
  }, [skills, acquiredSkillIds]); 

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    queryParams.set("showAcquired", showAcquired);
    const newUrl = `${window.location.pathname}?${queryParams.toString()}`;
    window.history.replaceState(null, "", newUrl);
    let sortedSkills = [...skills].sort((a, b) => a.name.localeCompare(b.name));
    if (showAcquired) {
      setFilteredSkills(
        sortedSkills.filter((skill) => acquiredSkillIds.includes(skill.id))
      );
    } else {
      setFilteredSkills(sortedSkills);
    }
  }, [showAcquired]); // Update URL only when showAcquired changes

 

  const handleUpdate = (id, acquired) => {
    setAcquiredSkillIds((prevState) =>
      acquired
        ? [...prevState, id]
        : prevState.filter((skillId) => skillId !== id)
    );
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
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setShowAcquired(!showAcquired);
              }
            }}
          />

          <span className="label-text">Only show acquired skills</span>
        </label>
      </div>
      <div className="skills-list">
        {filteredSkills.length > 0 ? (
          filteredSkills.map((skill) => (
            <SkillItem
              key={skill.id}
              acquiredSkillIds={acquiredSkillIds}
              skill={skill}
              onUpdate={handleUpdate} // Pass the update handler
            />
          ))
        ) : (
          <div className="no-records">No Acquired Skills Available</div>
        )}
      </div>
    </div>
  );
}

export default Skill;
