import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useAPI from "../common/utils/useAPI";
import { RESOURCES_URL } from "../common/constants/apiConstants";

function RoleEligibility({ details, setAcquiredSkillIds }) {
  const { id } = useParams();
  const {
    data: eligibility,
    loading,
    error,
  } = useAPI(RESOURCES_URL + `/${id}/role-eligibility`);
  const [skillCounts, setSkillCounts] = useState([]);
  const [totalEligibility, setTotalEligibility] = useState(0);

  useEffect(() => {
    if (eligibility) {
      let roleEligibilityCount = 0;
      const counts = eligibility.map((role) => {
        const acquiredSkills = role.skillsRequired.filter((skill) => skill.hasSkill);
        const acquiredCount = acquiredSkills.length;
        if (acquiredCount > 0) {
          roleEligibilityCount += 1;
          setTotalEligibility(roleEligibilityCount);
        }
        return { roleName: role.name, acquiredCount, acquiredSkills };
      });

      // Collect all acquired skill IDs
      const allAcquiredSkillIds = counts.flatMap(role => 
        role.acquiredSkills.map(skill => skill.id)
      );
      setAcquiredSkillIds(allAcquiredSkillIds);

      setSkillCounts(counts);
    }
  }, [eligibility, setAcquiredSkillIds]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="role-eligibility-container">
      <div className="eligibility-info">{details.name} is eligible for {totalEligibility} roles</div>
      {eligibility.map((role, index) => (
        <div key={role.id} className={skillCounts[index] && skillCounts[index].acquiredCount > 0 ? 'role-eligibility-item eligible' : 'role-eligibility-item'}>
          <div>{role.name}</div>
          <div className="acquired-additional-info">
            {skillCounts[index] && skillCounts[index].acquiredCount} of {role.skillsRequired.length} Required skills
          </div>
        </div>
      ))}
    </div>
  );
}

export default RoleEligibility;
