import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';

const SkillItem = ({ skill, onRetry, acquiredSkillIds }) => {
  const [hasError, setHasError] = useState(skill.name === "React");
  const [isAcquired, setIsAcquired] = useState(false);
  const { id } = useParams();
  const handleRetry = () => {
    setHasError(false);
    onRetry(skill.id);
  };

  const addSkill = async () => {

    try {
      const response = await axios.post(`http://localhost:4000/resources/${id}/create-skill`, {
        id: skill.id,
      });
      if (response.status === 200) {
        setAcquiredSkillIds((prev) => [...prev, skill.id]);
      }
    } catch (error) {
      console.error("Error adding skill:", error);
    }
  };

  useEffect(() => {
    const acquired = acquiredSkillIds.includes(skill.id);
    setIsAcquired(acquired);
  }, [acquiredSkillIds, skill.id]);

  return (
    <div className={`skill-item ${isAcquired ? "active-skill" : ""}`}>
      <div  className="skill-info">
        <span className="skill-name">{skill.name}</span>
        <span className={`skill-roles ${isAcquired ? "active-text" : ""}`} >
          Roles: {skill.requiredForRoles.map((role) => role.name).join(", ")}
        </span>
      </div>

      {isAcquired ? (
        <button onClick={addSkill} className="button remove">
          Remove
        </button>
      ) : (
        <button onClick={addSkill} className="button add">Add</button>
      )}
    </div>
  );
};

export default SkillItem;
