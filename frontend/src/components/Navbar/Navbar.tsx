import {Link} from "react-router-dom";
import styled from "styled-components";

const MenuContainer = styled.div`
  display: flex;
  gap: 10px;
`;

export const Navbar = () => {
  return (
    <nav>
      <div>
        <span>PARKEE Parking POS</span>
      </div>
      <MenuContainer>
        <Link to="/check-in">Check In</Link>
        <Link to="/check-out">Check Out</Link>
      </MenuContainer>
    </nav>
  );
};
