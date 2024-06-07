const UserIcon = ({ details }) => {
  
  const getInitials = (name) => {
    const [firstName, lastName] = name.split(" ");
    return `${firstName.charAt(0)}${lastName.charAt(0)}`;
  };

  return (
    <div className="display-flex">
      <span className="icon">{getInitials(details.name)}</span>
      <span className="icon-name">{details.name}</span>
    </div>
  );
};

export default UserIcon;
