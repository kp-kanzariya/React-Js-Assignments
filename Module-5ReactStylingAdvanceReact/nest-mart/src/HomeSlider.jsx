import React from 'react';
import styled from 'styled-components';


const HomeSliderSection = styled.section`
  position: relative;
  margin-bottom: 30px;
  margin: 20px;
  background-image:url(https://nest.botble.com/storage/sliders/1-1.png);
  background-size:cover;
  border-radius:50px;
`;

const Container = styled.div`

  .home-slide-cover {
    margin-top: 30px;
  }

  .hero-slider-1 {
    .single-hero-slider {
      background-size: cover;
      background-position: center;
      position: relative;

      .slider-content {
        h1 {
          font-size: 4rem;
          margin-bottom: 40px;
          line-height: 1.2;
        }

        p {
          margin-bottom: 65px;
        }

        .newsletter {
          .form-subscribe {
            display: flex;
            background-color:white;
            width:35%;
            border-radius: 40px;

            .form-control {
              width: 100%;
              padding: 10px;
              border:none;
              border-radius: 4px;
              border-radius: 40px; 
            }

            .btn {
              padding: 10px 20px;
              background-color: #41ff5a;
              color: #ffffff;
              border: none;
              border-radius: 41px;
              cursor: pointer;
              transition: background-color 0.3s ease;

              &:hover {
                background-color: #45a049;
              }
            }
          }

          
        }
      }
    }
  }
`;

const SliderArrow = styled.div`
  
`;

const HomeSlider = () => {
  return (
    <div>
      <hr className='m-0' />
    <HomeSliderSection>
      
          <Container >
        <div className="home-slide-cover p-5"  >
          <div className="hero-slider-1 ">
            <div className="single-hero-slider ">
              <div className="slider-content">
                <h1 className="display-2 ">Don’t miss amazing<br />grocery deals</h1>
                <p className="">Sign up for the daily newsletter</p>
                <div className="newsletter">
                  <form >
                    {/* <input type="hidden" name="_token" /> */}
                    <div className="form-subscribe d-flex">
                    <i class="fa-brands fa-telegram m-2 fs-2"></i>
                      <input
                        className="form-control "
                        placeholder="Enter Your Email"
                        id="newsletter-email"
                        required
                        name="email"
                        type="email"
                      />
                      <button className="btn" type="submit">Subscribe</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            {/* <div className="single-hero-slider single-animation-wrap">
              <div className="slider-content">
                <h1 className="display-2 mb-40">Fresh Vegetables<br />Big discount</h1>
                <p className="mb-65">Save up to 50% off on your first order</p>
                <div className="newsletter">
                  <form method="POST" action="https://nest.botble.com/newsletter/subscribe">
                    <input type="hidden" name="_token" value="iZ8Xy8LFq2iN77zFrC2uEZcQggzcJ9P5ahPeMHE9" />
                    <div className="form-subscribe d-flex">
                      <input
                        className="form-control"
                        placeholder="Enter Your Email"
                        id="newsletter-email"
                        required
                        name="email"
                        type="email"
                      />
                      <button className="btn" type="submit">Subscribe</button>
                    </div>
                  </form>
                </div>
              </div>
            </div> */}
          </div>
        </div>
        <SliderArrow>
          
        </SliderArrow>
      </Container>
    </HomeSliderSection>
    </div>);
};

export default HomeSlider;
