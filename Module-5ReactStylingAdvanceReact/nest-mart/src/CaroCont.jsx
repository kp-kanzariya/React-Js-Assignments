import React from "react";
import styled from "styled-components";

const CaroHeader = styled.div`
  display: flex;
`;
const LeftSide = styled.div`
  width: 23%;
  padding: 2px 20px;
`;
const RightSide = styled.div`
  width: 75%;
  display: flex;
  justify-content: space-between;
  text-align: center;
  .navl {
    margin: 10px 0;
  }
  .navl a {
    text-decoration: none;
    color: black;

    margin: 5px;
    font-size: 17px;
    font-weight: 600;
  }
`;
const CarouselContainer = styled.div`
  position: relative;
`;

const CarouselSliderWrapper = styled.div`
  display: flex;
  text-align: center;
`;

const Card = styled.div`
  width: 10%;
  /* animation: fadeInUp 0.5s forwards; */
  border: 1px solid gray;
  padding: 10px;
  margin: 10px;
  border-radius: 10px;
  background-color: lightgoldenrodyellow;
`;

const Figure = styled.figure`
  overflow: hidden;
`;

const Image = styled.img`
  width: 70%; /* Make the image responsive */
  height: auto;
`;

const HeadingCard = styled.p`
  font-weight: bold;
`;

const ItemCount = styled.span`
  display: block;
`;
const Anchor = styled.a`
  text-decoration: none;
  color: black;
`;

const Carousel = () => {
  const categories = [
    {
      title: "Milks and Dairies",
      items: "6 items",
      imgSrc: "https://nest.botble.com/storage/product-categories/image-1.png",
    },
    {
      title: "News and Dairies",
      items: "2 items",
      imgSrc: "https://nest.botble.com/storage/product-categories/image-1.png",
    },

    {
      title: "Clothing ",
      items: "9 items",
      imgSrc: "https://nest.botble.com/storage/product-categories/image-2.png",
    },
    {
      title: "Beauty",
      items: "9 items",
      imgSrc: "https://nest.botble.com/storage/product-categories/image-2.png",
    },
    {
      title: "Trendy",
      items: "9 items",
      imgSrc: "https://nest.botble.com/storage/product-categories/image-2.png",
    },
    {
      title: "Spicy",
      items: "9 items",
      imgSrc: "https://nest.botble.com/storage/product-categories/image-2.png",
    },
    {
      title: "Tasty",
      items: "9 items",
      imgSrc: "https://nest.botble.com/storage/product-categories/image-2.png",
    },
    {
      title: "Beauty",
      items: "9 items",
      imgSrc: "https://nest.botble.com/storage/product-categories/image-2.png",
    },
    {
      title: "Pet Toy",
      items: "7 items",
      imgSrc: "https://nest.botble.com/storage/product-categories/image-3.png",
    },
  ];

  return (
    <>
      <CaroHeader>
        <LeftSide>
          <h2> Featured Categories</h2>
        </LeftSide>
        <RightSide>
          <div className="navl">
            <a href="#">Pet Foods</a>
            <a className="text-success" href="#">
              Vegetables
            </a>
            <a href="#">Cake & Milk</a>
            <a href="#">Coffee & Tea</a>
          </div>
          <div className="arrows">
            <i class="fa-solid fa-arrow-left bg-info  p-2 rounded-circle border-3"></i>
            <i class="fa-solid fa-arrow-right bg-info  p-2 m-2 rounded-circle border-3"></i>
          </div>
        </RightSide>
      </CaroHeader>
      <CarouselContainer>
        <CarouselSliderWrapper id="carousel-10-columns" title="Top Categories">
          {categories.map((category, index) => (
            <Card key={index}>
              <Figure>
                <Anchor>
                  <Image src={category.imgSrc} alt={category.title} />
                </Anchor>
              </Figure>
              <HeadingCard>
                <Anchor title={category.title}>{category.title}</Anchor>
              </HeadingCard>
              <ItemCount>{category.items}</ItemCount>
            </Card>
          ))}
        </CarouselSliderWrapper>
      </CarouselContainer>
    </>
  );
};

export default Carousel;
