import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';

const SkillItem = ({ skill, onRetry, acquiredSkillIds, onUpdate }) => {
  const [hasError, setHasError] = useState(false);
  const [isAcquired, setIsAcquired] = useState(false);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  const handleRetry = () => {
    setHasError(false);
    removeSkill();
  };

  console.log('acquiredSkillIds',acquiredSkillIds);

  const addSkill = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`http://localhost:4000/resources/${id}/create-skill`, {
        id: skill.id,
      });
      if (response.status === 200) {
        setIsAcquired(true);
        onUpdate(skill.id, true);  // Notify parent of addition
      }
    } catch (error) {
      setHasError(true);
    } finally {
      setLoading(false);
    }
  };

  const removeSkill = async () => {
    setLoading(true);
    try {
      const response = await axios.delete(`http://localhost:4000/resources/${id}/skill/${skill.id}`);
      if (response.status === 200) {
        setIsAcquired(false);
        onUpdate(skill.id, false);  // Notify parent of removal
      }
    } catch (error) {
      setHasError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const acquired = acquiredSkillIds.includes(skill.id);
    setIsAcquired(acquired);
  }, [acquiredSkillIds, skill.id]);

  return (
    <div className={`skill-item ${isAcquired ? "active-skill" : ""} ${hasError ? "error" : ""}`}>
      <div className="skill-info">
        <span className="skill-name">{skill.name}</span>
        <span className={`skill-roles ${isAcquired ? "active-text" : ""}  ${hasError ? "error" : ""}`}>
          Roles: {skill.requiredForRoles.map((role) => role.name).join(", ")}
        </span>
      </div>

      {hasError ? (
        <button onClick={handleRetry} className="button retry">
          Retry
        </button>
      ) : (
        <>
          {isAcquired ? (
            <button onClick={removeSkill} className="button remove">
              {loading ? <span className="inprogress-spinner"></span> : "Remove"}
            </button>
          ) : (
            <button onClick={addSkill} className="button add">
              {loading ? <span className="inprogress-spinner"></span> : "Add"}
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default SkillItem;
