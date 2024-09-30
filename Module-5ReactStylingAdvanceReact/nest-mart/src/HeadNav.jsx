import React, { useState } from 'react';
import styled from 'styled-components';
import Navbar from './HeaderNav1';

const HeaderNav = styled.div`
  display:flex;
  justify-content:space-between;
  margin: 0 20px;
`;

const MainCategoriesWrap = styled.div`
  position: relative;

  &:hover .categories-dropdown-wrap {
    display: block;
  }
`;

const CategoriesButton = styled.a`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 12px;
  background-color:greenyellow;
  margin:10px 20px;
  border-radius:5px;
  text-decoration: none;
  color: black;
  font-size:18px;
  font-weight:600;
`;

const CategoriesDropdownWrap = styled.div`
  display: none;
  position: absolute;
  background: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 1;
  width: 250px;
  margin-top: 10px;
`;

const DropdownInner = styled.div`
  display: flex;
`;

const DropdownList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  width: 50%;
`;

const DropdownItem = styled.li`
  a {
    display: flex;
    align-items: center;
    padding: 10px;
    text-decoration: none;
    color: black;

    img {
      margin-right: 10px;
    }
    
    &:hover {
      background: #f0f0f0;
    }
  }
`;


const HeaderNavi = () => {
  return (
    <HeaderNav>
      <MainCategoriesWrap>
        <CategoriesButton href="#">
        <i class="fa-brands fa-intercom"></i> 
          <span className="et mx-2">Browse</span> All Categories
          <i className="fa-solid fa-arrow-down mx-2"></i>
        </CategoriesButton> 
        <CategoriesDropdownWrap className="categories-dropdown-wrap">
          <DropdownInner>
            <DropdownList>
              <DropdownItem>
                <a href="#">
                  <img src="https://nest.botble.com/storage/product-categories/icon-1.png" alt="Milks and Dairies" width={30} height={30} /> 
                  Milks and Dairies
                </a>
              </DropdownItem>
              <DropdownItem>
                <a href="#">
                  <img src="https://nest.botble.com/storage/product-categories/icon-2.png" alt="Clothing & beauty" width={30} height={30} /> 
                  Clothing & beauty
                </a>
              </DropdownItem>
              {/* Add more items here... */}
            </DropdownList>
            <DropdownList>
              <DropdownItem>
                <a href="#">
                  <img src="https://nest.botble.com/storage/product-categories/icon-6.png" alt="Wines & Drinks" width={30} height={30} /> 
                  Wines & Drinks
                </a>
              </DropdownItem>
              <DropdownItem>
                <a href="#">
                  <img src="https://nest.botble.com/storage/product-categories/icon-7.png" alt="Fresh Seafood" width={30} height={30} /> 
                  Fresh Seafood
                </a>
              </DropdownItem>
              
            </DropdownList>
          </DropdownInner>
        </CategoriesDropdownWrap>
      </MainCategoriesWrap>

     <Navbar/>

      <div className="hotline">
        <img src="https://nest.botble.com/themes/nest/imgs/theme/icons/icon-headphone.svg" alt="hotline" />
        <p>1900 - 888<span>24/7 Support Center</span></p>
      </div>
    </HeaderNav>
  );
};

export default HeaderNavi;
