import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import { RESOURCES_URL } from "../common/constants/apiConstants";
import usePostRequest from "../common/utils/usePostRequest";
import useDeleteRequest from "../common/utils/useDeleteRequest";


interface Skill {
  id: string;
  name: string;
  requiredForRoles: { name: string }[];
}

interface SkillItemProps {
  skill: Skill;
  acquiredSkillIds: number[];
  onUpdate: (id: string, acquired: boolean) => void;
}

const SkillItem: React.FC<SkillItemProps> = ({ skill, acquiredSkillIds, onUpdate }) => {
  const [isAcquired, setIsAcquired] = useState(false);
  const { id } = useParams();
  const  [rowErr, setrowErr]= useState(false);
  const { isLoading, data, postData } = usePostRequest();
  const { deleteInProgress ,error, deleteData } = useDeleteRequest();

  const handleRetry = () => {
    setrowErr(true);
    removeSkill();
  };

  const addSkill = async () => {
    await postData(`${RESOURCES_URL}/${id}/create-skill`, {
      id: skill.id,
    });
    setIsAcquired(true);
    onUpdate(skill.id, true);  // Notify parent of addition
   };

  const removeSkill = async () => {
    await deleteData(`${RESOURCES_URL}/${id}/skill/${skill.id}`);
    setIsAcquired(false);
    onUpdate(skill.id, false); 
  };

  useEffect(() => {
    const acquired = acquiredSkillIds.includes(skill.id);
    setIsAcquired(acquired);
  }, [acquiredSkillIds, skill.id]);

  return (
    <div className={`skill-item ${isAcquired ? "active-skill" : ""} ${error || rowErr ? "error" : ""}`}>
      <div className="skill-info">
        <span className="skill-name">{skill.name}</span>
        <span className={`skill-roles ${isAcquired ? "active-text" : ""}  ${error || rowErr ? "error" : ""}`}>
          Roles: {skill.requiredForRoles.map((role) => role.name).join(", ")}
        </span>
      </div>

      {error || rowErr  ? (
        <button onClick={handleRetry} className="button retry">
          {deleteInProgress ? <span className="inprogress-spinner"></span> : "Retry"}
        </button>
      ) : (
        <>
          {isAcquired ? (
            <button onClick={removeSkill} className="button remove">
              {deleteInProgress ? <span className="inprogress-spinner"></span> : "Remove"}
            </button>
          ) : (
            <button onClick={addSkill} className="button add">
              {isLoading ? <span className="inprogress-spinner"></span> : "Add"}
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default SkillItem;
