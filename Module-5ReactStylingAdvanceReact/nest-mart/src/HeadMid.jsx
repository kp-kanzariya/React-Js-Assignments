// import { styled } from "@mui/material";
import React from "react";
import styled from "styled-components";


function HeadMid() {
  const HeaderMiddle = styled.div`
    &.header-middle {
      padding-top: 15px;
      padding-bottom: 15px;
      /* display: none; */

      &.sticky-bar {
        position: sticky;
        top: 0;
        z-index: 999;
      }
    }
  `;

  const Container1 = styled.div`
    margin: 0 auto;
  `;

  const HeaderWrap = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `;

  const Logo = styled.div`
    /* width: 120px; */
  `;

  const HeaderRight = styled.div`
    display: flex;
    align-items: center;
  `;
  const HeaderCenter = styled.div`
    width: 50%;
    padding: 5px;
    border: 3px solid green;
    border-radius: 5px;
    justify-content: space-around;
    display: flex;
    align-items: center;
  `;

  const SearchStyle2 = styled.div`
    form {
      display: flex;
      .form-group--icon {
        position: relative;
      }
      .product-category-select {
        font-size: 21px;
        padding: 3px 5px;
        outline: none;
        border: none;
      }
      .input-search-product {
        font-size: 19px;
        padding: 5px 140px;
        border: none;
      }
      .btn {
        border: none;
        cursor: pointer;
        svg {
          fill: #fff;
        }
      }
    }
  `;

  const HeaderActionRight = styled.div`
    display: flex;
  `;

  const HeaderAction2 = styled.div`
    display: flex;
  `;

  const HeaderActionIcon2 = styled.div`
    position: relative;
    a {
      display: flex;
      align-items: center;
      text-decoration: none;
      .pro-count {
        background-color: blue;
        color: white;
        position: absolute;
        top: -8px;
        left: 15px;
        padding: 1px 7px;
        border-radius: 50%;
      }

      .lable {
        margin-left: 5px;
        color: gray;
      }
    }
  
    &:hover .cart-dropdown-wrap {
      display: block;
    }
  `;

  return (
    <div>
      <HeaderMiddle className="header-middle  sticky-bar">
        <Container1>
          <HeaderWrap>
            <Logo>
              <a href="#">
                <img
                  height={"50px"}
                  src="https://nest.botble.com/storage/general/logo.png"
                  alt="Nest - Laravel Multipurpose  "
                />
              </a>
            </Logo>
            <HeaderCenter>
              <SearchStyle2>
                <form action="" method="">
                  <div className="form-group--icon">
                    <select
                      className="product-category-select"
                      name="categories[]"
                    >
                      <option value="">All Categories</option>
                      <option value="">Categories</option>
                      <option value="">Categories</option>
                      <option value="">Categories</option>
                    </select>
                  </div>
                  <input
                    type="text"
                    className="input-search-product"
                    placeholder="Search for items..."
                  />
                  <button className="btn" type="submit">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
                      <path d="M21 21l-6 -6" />
                    </svg>
                  </button>
                </form>
              </SearchStyle2>
            </HeaderCenter> 

            <HeaderRight>
              <HeaderActionRight>
                <HeaderAction2>
                  <HeaderActionIcon2>
                    <a href="#">
                      <img
                        alt="Compare"
                        src="https://nest.botble.com/themes/nest/imgs/theme/icons/icon-compare.svg"
                      />
                      <span className="pro-count compare-count">0</span>
                    </a>
                    <a href="#">
                      <span className="lable">Compare</span>
                    </a>
                  </HeaderActionIcon2>
                  <HeaderActionIcon2>
                    <a href="#">
                    <i class="fa-regular fa-heart fs-3 text-dark"></i>
                      <span className="pro-count  compare-count">0</span>
                    </a>
                    <a href="#">
                      
                      <span className="lable">Wishlist</span>
                    </a>
                  </HeaderActionIcon2>
                  <HeaderActionIcon2>
                    <a href="#">
                    <i class="fa-solid fa-cart-shopping fs-3 text-dark"></i>
                      <span className="pro-count  compare-count">0</span>
                    </a>
                    <a href="#">
                      <span className="lable">AddToCart</span>
                    </a>
                  </HeaderActionIcon2>
                  <HeaderActionIcon2>
                    <a href="#">
                    <i class="fa-regular fa-user fs-3 text-dark"></i>
                      <span className="pro-count  compare-count">0</span>
                    </a>
                    <a className="lab" href="https://nest.botble.com/compare">
                      <span className="lable">NewUser  </span>
                    </a>
                  </HeaderActionIcon2>
                </HeaderAction2>
              </HeaderActionRight>
            </HeaderRight> 
          </HeaderWrap>
        </Container1>
      </HeaderMiddle>
      <hr className="m-0" />
    </div>
  );
}

export default HeadMid;
