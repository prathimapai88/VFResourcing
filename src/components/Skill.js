import React from "react";
import { useState, useEffect } from "react";
const skillsData = [
  {
    id: 1,
    name: "AWS",
    requiredForRoles: [
      {
        id: 3,
        name: "Devops Engineer",
      },
    ],
  },
  {
    id: 2,
    name: "SQL",
    requiredForRoles: [
      {
        id: 2,
        name: "Backend Developer",
      },
      {
        id: 3,
        name: "Devops Engineer",
      },
    ],
  },
  {
    id: 3,
    name: "JavaScript",
    requiredForRoles: [
      {
        id: 1,
        name: "Frontend Developer",
      },
    ],
  },
  {
    id: 4,
    name: "TypeScript",
    requiredForRoles: [
      {
        id: 1,
        name: "Frontend Developer",
      },
    ],
  },
  {
    id: 6,
    name: "Azure",
    requiredForRoles: [
      {
        id: 3,
        name: "Devops Engineer",
      },
    ],
  },
  {
    id: 7,
    name: "Node",
    requiredForRoles: [
      {
        id: 1,
        name: "Frontend Developer",
      },
    ],
  },
  {
    id: 8,
    name: "Python",
    requiredForRoles: [
      {
        id: 3,
        name: "Devops Engineer",
      },
    ],
  },
  {
    id: 9,
    name: ".NET",
    requiredForRoles: [
      {
        id: 2,
        name: "Backend Developer",
      },
    ],
  },
  {
    id: 5,
    name: "React",
    requiredForRoles: [
      {
        id: 1,
        name: "Frontend Developer",
      },
    ],
  },
  {
    id: 10,
    name: "First Aid At Work",
    requiredForRoles: [],
  },
];

const SkillItem = ({ skill, onRetry }) => {
  const [hasError, setHasError] = useState(skill.name === "React");

  const handleRetry = () => {
    setHasError(false);
    onRetry(skill.id);
  };

  return (
    <div className={`skill-item ${hasError ? "retry" : ""}`}>
      <div className="skill-info">
        <span className="skill-name">{skill.name}</span>
        <span className="skill-roles">
          Roles: {skill.requiredForRoles.map((role) => role.name).join(", ")}
        </span>
      </div>

      {hasError ? (
        <button onClick={handleRetry} className="button retry">
          Retry
        </button>
      ) : (
        <button className="button add">Add</button>
      )}
    </div>
  );
};

function Skill() {
  const [skills, setSkills] = useState(skillsData);

  const handleRetry = (id) => {
    console.log(`Retrying skill with id: ${id}`);
  };

  return (
    <div className="skills-list">
      {skills.map((skill) => (
        <SkillItem key={skill.id} skill={skill} onRetry={handleRetry} />
      ))}
    </div>
  );
}

export default Skill;
