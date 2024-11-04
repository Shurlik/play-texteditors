import React from 'react';

import LogoutIcon from "@mui/icons-material/Logout";

import LinkCustom from "./LinkCustom";

interface LogoutItemProps {
  onClick?: () => void; 
}

const LogoutItem: React.FC<LogoutItemProps> = ({ onClick }) => {
  return (
    <LinkCustom
      Icon={LogoutIcon}
      name={'Logout'}
      to={'#'}
      onClick={onClick}
    />
  );
};

export default LogoutItem;