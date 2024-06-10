import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useAPI from "../common/utils/useAPI";
import { RESOURCES_URL } from "../common/constants/apiConstants";

// Define types for the component props
interface RoleEligibilityProps {
  details: {
    name: string;
  };
  setAcquiredSkillIds: (ids: number[]) => void;
}

// Define types for the API response
interface Skill {
  id: number;
  hasSkill: boolean;
}

interface Role {
  id: number;
  name: string;
  skillsRequired: Skill[];
}

// Define the component with typed props
const RoleEligibility: React.FC<RoleEligibilityProps> = ({
  details,
  setAcquiredSkillIds,
}) => {
  const { id } = useParams<{ id: string }>();
  const {
    data: eligibility,
    loading,
    error,
  } = useAPI(RESOURCES_URL + `/${id}/role-eligibility`);

  const [skillCounts, setSkillCounts] = useState<
    { roleName: string; acquiredCount: number; acquiredSkills: Skill[] }[]
  >([]);

  const [totalEligibility, setTotalEligibility] = useState(0);

  useEffect(() => {
    if (eligibility) {
      let roleEligibilityCount = 0;
      const counts = eligibility.map((role) => {
        const acquiredSkills = role.skillsRequired.filter(
          (skill) => skill.hasSkill
        );
        const acquiredCount = acquiredSkills.length;
        if (acquiredCount === role.skillsRequired.length) {
          roleEligibilityCount += 1;
        }
        setTotalEligibility(roleEligibilityCount);

        return { roleName: role.name, acquiredCount, acquiredSkills };
      });

      // Collect all acquired skill IDs
      const allAcquiredSkillIds = counts.flatMap((role) =>
        role.acquiredSkills.map((skill) => skill.id)
      );
      setAcquiredSkillIds(allAcquiredSkillIds);

      setSkillCounts(counts);
    }
  }, [eligibility, setAcquiredSkillIds]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="role-eligibility-container">
      <div className="eligibility-info">
        {details.name} is eligible for {totalEligibility}{" "}
        {totalEligibility === 1 ? "role" : "roles"}
      </div>

      {eligibility.map((role, index) => (
        <div
          key={role.id}
          className={
            skillCounts[index] &&
            skillCounts[index].acquiredCount === role.skillsRequired.length
              ? "role-eligibility-item eligible"
              : "role-eligibility-item"
          }
        >
          <div>{role.name}</div>
          <div className="acquired-additional-info">
            {skillCounts[index] && skillCounts[index].acquiredCount} of{" "}
            {role.skillsRequired.length} Required skills
          </div>
        </div>
      ))}
    </div>
  );
};

export default RoleEligibility;
