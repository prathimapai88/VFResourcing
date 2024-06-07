import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useAPI from "../common/utils/useAPI";
import { API_URL } from "../common/constants/apiConstants";

function RoleEligibility({details}) {
  const { id } = useParams();
  const {
    data: eligibility,
    loading,
    error,
  } = useAPI(API_URL + `/${id}/role-eligibility`);
  const [skillCounts, setSkillCounts] = useState([]);
  const [totalEligiblity, settotalEligiblity] = useState(0);

  useEffect(() => {
    if (eligibility) {
      let roleEligibilityCount=0;
      const counts = eligibility.map((role) => {
        
        const acquiredCount = role.skillsRequired.filter(
          (skill) => skill.hasSkill
        ).length;
        if(acquiredCount>0){
          roleEligibilityCount=roleEligibilityCount+1;
          settotalEligiblity(roleEligibilityCount);
        }
        return { roleName: role.name, acquiredCount };
      });
      setSkillCounts(counts);
    }
  }, [eligibility]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div  className="role-eligibility-container">
      <div className="eligiblity-info">{details.name} is eligible for {totalEligiblity} role </div>
      {eligibility.map((role, index) => (
        <div key={role.id} className={skillCounts[index] && skillCounts[index].acquiredCount>0 ? 'role-eligibility-item eligible' : 'role-eligibility-item'} >
          <div>{role.name}</div>
          <div>
            {skillCounts[index] && skillCounts[index].acquiredCount} of {role.skillsRequired.length} Required skills
          </div>
        </div>
      ))}
    </div>
  );
}

export default RoleEligibility;
