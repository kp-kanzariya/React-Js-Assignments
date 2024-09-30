import styled from "styled-components";
import HeadMid from "./HeadMid";

const Container = styled.div`
  width: 100%;
  padding: 5px 15px;
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Column = styled.div``;

const HeaderInfo = styled.div`
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    li {
      margin-right: 15px;
    }
    a {
      text-decoration: none;
      color: inherit;
      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

const NewsFlash = styled.div`
  text-align: center;
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    li {
      margin-bottom: 10px;
      i {
        margin-right: 5px;
      }
      a {
        color: blue;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
`;

const FlagImage = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 5px;
`;

const HeaderInfoRight = styled(HeaderInfo)`
  justify-content: flex-end;
  ul {
    display: flex;
    li {
      margin-left: 15px;
      position: relative;
      .language-dropdown {
        position: absolute;
        display: none;
        z-index:1000;
        background-color: #ffffff;
        border: 1px solid #2600ff;
        padding: 5px;
        li {
          padding: 5px;
          a {
            display: flex;
            align-items: center;
          }
        }
      }
      &:hover .language-dropdown {
        display: block;
      }
    }
  }
`;

export default function Header() {
  return (
    <>
      <Container>
        <Row>
          <Column >
            <HeaderInfo>
              <ul>
                <li>
                  <a >About Us</a>
                </li>
                <li>
                  <a>
                    Order Tracking
                  </a>
                </li>
              </ul>
            </HeaderInfo>
          </Column>
          <Column  >
            <NewsFlash>
              <ul>
                <li>
                  <span>
                    <b className="text-success">Trendy 25</b> silver jewelry,
                    save up 35% off today
                  </span>
                  <a >Shop now</a>
                </li>
                
              </ul>
            </NewsFlash>
          </Column>
          <Column >
            <HeaderInfoRight>
              <ul>
                <li>
                  Need help? Call Us:{" "}
                  <strong className="text-brand">1900 - 888</strong>
                </li>
                <li>
                  <a href="javascript:void(0)">
                    <FlagImage
                      src="https://nest.botble.com/vendor/core/core/base/img/flags/us.svg"
                      alt="English flag"
                    />
                    English
                  </a>
                  <ul className="language-dropdown">
                    <li>
                      <a >
                        <FlagImage
                          src="https://nest.botble.com/vendor/core/core/base/img/flags/vn.svg"
                          alt="Tiếng Việt flag"
                        />
                        Tiếng Việt
                      </a>
                    </li>
                    <li>
                      <a >
                        <FlagImage
                          src="https://nest.botble.com/vendor/core/core/base/img/flags/sa.svg"
                          alt="Arabic flag"
                        />
                        Arabic
                      </a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="javascript:void(0)">
                    USD 
                  </a>
                  <ul className="language-dropdown">
                    <li>
                      <a >
                        USD
                      </a>
                    </li>
                    <li>
                      <a >
                        EUR
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </HeaderInfoRight>
          </Column>
        </Row>
      </Container>
      <hr className="m-0" />
       <HeadMid/>
    </>
  );
}
