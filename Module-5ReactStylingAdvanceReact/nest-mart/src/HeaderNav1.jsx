import React from 'react';
import styled from 'styled-components';

const NavbarContainer = styled.div`
 
`;

const Nav = styled.nav`
  /* padding: 1rem 0; */
`;

const MenuList = styled.ul`
  list-style: none;
  display: flex;
  justify-content: space-around;
  margin: 0;
  padding: 0;
`;

const MenuItem = styled.li`
  position: relative;
  margin:20px;
  font-weight:600;
  font-size:18px;
  &:hover .sub-menu {
    display: block;
  }
`;

const MenuLink = styled.a`
  text-decoration: none;
  color: #000;
  display: flex;
  align-items: center;

  &:hover {
    color: #007bff;
  }
`;

const SubMenu = styled.ul`
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  background-color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  list-style: none;
  padding: 0;
  margin: 0;
  z-index: 100;

  & li {
    padding: 0.5rem 1rem;
    &:hover {
      background-color: #f8f9fa;
    }
  }
`;

const SubMenuLink = styled.a`
  text-decoration: none;
  color: #000;
`;

const Navbar = () => {
  return (
    <NavbarContainer>
      <Nav>
        <MenuList>
          <MenuItem>
            <MenuLink href="#" className="active">
              <i className="menu-icon fi-rs-home"></i>
              Home 
            </MenuLink>
            <SubMenu className="sub-menu">
              <li><SubMenuLink href="#">Home 1</SubMenuLink></li>
              <li><SubMenuLink href="#">Home 2</SubMenuLink></li>
              <li><SubMenuLink href="#">Home 3</SubMenuLink></li>
              <li><SubMenuLink href="#">Home 4</SubMenuLink></li>
              <li><SubMenuLink href="#">Home 5</SubMenuLink></li>
              <li><SubMenuLink href="#">Home 6</SubMenuLink></li>
            </SubMenu>
          </MenuItem>
          <MenuItem>
            <MenuLink href="#">
              Shop <i className="fi-rs-angle-down"></i>
            </MenuLink>
            <SubMenu className="sub-menu">
              <li><SubMenuLink href="#">Shop Grid - Full Width</SubMenuLink></li>
              <li><SubMenuLink href="#">Shop Grid - Right Sidebar</SubMenuLink></li>
              <li><SubMenuLink href="#">Shop Grid - Left Sidebar</SubMenuLink></li>
              <li><SubMenuLink href="#">Products Of Category</SubMenuLink></li>
            </SubMenu>
          </MenuItem>
          {/* Repeat similar structure for other menu items */}
          <MenuItem>
            <MenuLink href="#">
              Blog <i className="fi-rs-angle-down"></i>
            </MenuLink>
            <SubMenu className="sub-menu">
              <li><SubMenuLink href="#">Blog Grid</SubMenuLink></li>
              <li><SubMenuLink href="#">Blog List</SubMenuLink></li>
              <li><SubMenuLink href="#">Blog Big</SubMenuLink></li>
              <li><SubMenuLink href="#">Blog Wide</SubMenuLink></li>
              <li>
                <SubMenuLink href="#">
                  Single Post <i className="fi-rs-angle-right"></i>
                </SubMenuLink>
                <SubMenu className="level-menu level-menu-modify">
                  <li><SubMenuLink href="#">Single Post Right Sidebar</SubMenuLink></li>
                  <li><SubMenuLink href="#">Single Post Left Sidebar</SubMenuLink></li>
                  <li><SubMenuLink href="#">Single Post Full Width</SubMenuLink></li>
                  <li><SubMenuLink href="#t">Single Post with Product Listing</SubMenuLink></li>
                </SubMenu>
              </li>
            </SubMenu>
          </MenuItem>
          <MenuItem>
            <MenuLink href=''>Venders</MenuLink>
          </MenuItem>
          <MenuItem>
            <MenuLink href=''>Mega Menu</MenuLink>
          </MenuItem>
          <MenuItem>
            <MenuLink href=''>Pages</MenuLink>
          </MenuItem>
          <MenuItem>
            <MenuLink href=''>Contact</MenuLink>
          </MenuItem>
        </MenuList>
      </Nav>
    </NavbarContainer>
  );
};

export default Navbar;
