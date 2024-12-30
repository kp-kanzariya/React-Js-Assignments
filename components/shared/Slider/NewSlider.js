import React, { useRef, useState } from 'react';
import {
  StyleSheet,
  Animated,
  View,
  Text,
  Image,
  Dimensions,
} from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { useSelector } from 'react-redux';
import { Colors } from '../../../assets/config/Colors';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import { FontFamily } from '../../../assets/fonts/FontFamily';
import outletViewDao from '../../../Database/DAO/outletViewDao';


import { colors } from '../../shared/Slider/carouselData';

export const SCREEN_WIDTH = Dimensions.get('screen').width;
export const CAROUSEL_VERTICAL_OUTPUT = 0;
function NewSlider() {
  const { isLandscape, isMobile } = useSelector(state => state.isLandscape);
  const { headerDate } = useSelector(state => state.header);

  const [activeSlide, setActiveSlide] = useState(0);
  const [activeSlideData, setActiveSlideData] = useState([]);
  const sliderBackground = useRef(new Animated.Value(0)).current;

  const handleBackgroundChange = slideIndex => {
    Animated.spring(sliderBackground, {
      toValue: slideIndex,
      useNativeDriver: false,
    }).start();
  };

  React.useEffect(() => {
    async function getAllCustomerBirthdayAndAnniversarryFun() {
      try {
        let outlet =
          await outletViewDao.getAllCustomerBirthdayAndAnniversarryFun({
            date: headerDate,
          });
        setActiveSlideData(outlet);
      } catch (e) {
        setActiveSlideData([]);
      }
    }
    getAllCustomerBirthdayAndAnniversarryFun();
    return () => {
      setActiveSlideData([]);
    };
  }, [headerDate]);

  // renderItem ...

  const renderItem = (
    { item }, // render every carousel content
  ) => {
    return (
      <View
        style={{
          ...styles.snapCarouselItem,
          width: isLandscape ? 350 : '100%',
          justifyContent: 'center',
          height: isLandscape ? 110 : null,
          top: isLandscape ? 5 : null
        }}>
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignSelf: 'center', alignItems: isLandscape ? null : 'center' }}>
          <View
            style={{
              borderRadius: 100,
              backgroundColor: item.bgColor,
              width: 70,
              height: 70,
              justifyContent: 'center',
              alignSelf: 'center',
              left: 3,
              top: isLandscape ? -5 : 0
            }}>
            <Image
              style={{
                width: 45,
                height: 45,
                alignSelf: 'center',
              }}
              resizeMode={'contain'}
              source={item.renderIcon}
            />
          </View>
          <View style={{
            width: isLandscape
              ? '75%'
              : '80%',
            marginLeft: isMobile
              ? isLandscape
                ? 19
                : 15
              : isLandscape
                ? 20
                : 10,
            justifyContent: 'center',

          }}>

            <View style={{ width: isLandscape ? '75%' : '80%', top: !isMobile ? -5 : -3 }}>
              <Text style={{ ...styles.carouselItemTitleText, width: '95%', top: -5 }}>{item.title} Reminder</Text>
              <Text style={{ ...styles.descriptionText, width: isLandscape ? '80%' : '100%', flexWrap: 'wrap' }}>{<Text style={{ fontWeight: 'bold', }}>{item.OutletSalutation}. {item.OutletContactName}</Text>} from {<Text style={{ fontWeight: 'bold', }}>{item.OutletName}</Text>} has {item.title} today</Text>

            </View>
          </View>
        </View>
      </View>
    );
  };

  const renderPagination = () => (
    // render carousel pagination
    <Pagination
      dotsLength={activeSlideData.length}
      activeDotIndex={activeSlide}
      dotStyle={styles.dotStyle}
      containerStyle={{
        paddingVertical: 1,
        bottom: isLandscape ? 2 : 10,
      }}
    />
  );
  return (
    <>
      {activeSlideData?.length > 0 ? (
        <View style={{ ...styles.snapCarousel }}>
          {/* <View style={{height: isLandscape ? null : null,}}> */}
          <Carousel
            layout={'default'}
            data={activeSlideData}
            renderItem={renderItem}
            onSnapToItem={index => setActiveSlide(index)}
            onScrollIndexChanged={handleBackgroundChange}
            sliderWidth={SCREEN_WIDTH}
            itemWidth={SCREEN_WIDTH}
            autoplayInterval={5000}
            autoplay
            loop
          //  inactiveSlideScale={1}

          />
          {/* </View> */}
          {renderPagination()}
        </View>
        // <></>
      ) :
        <View style={{
          justifyContent: 'center',
          alignSelf: 'center',
          backgroundColor: Colors.MRSTARTMYDAYCARD,
          borderRadius: 10,
          borderColor: Colors.borderColor1,
          // borderWidth: 1,
          width: '100%',
          height: 110,
          flex: 1,
          alignItems: 'center'
        }}>
          <FAIcon name="birthday-cake" size={50} color={Colors.MRGREEN} />
          <View style={{ paddingVertical: 5 }} />
          <Text style={{ fontFamily: FontFamily.TTCommonsDemiBold, fontSize: 15, color: Colors.black }}>No Reminder for Today</Text>
        </View>

      }


    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    width: '100%',
    height: 100,
    borderRadius: 10,
  },
  snapCarousel: {
    backgroundColor: Colors.MRSTARTMYDAYCARD,
    // paddingBottom: 16,
    // paddingTop: 8,
    borderRadius: 10,
    overflow: 'hidden',
    width: '100%',
    flex: 1,
    height: 110
  },
  descriptionText: {
    color: colors.biscay,
    fontSize: 13,
    // paddingVertical: 16,
    // width: '90%',
    fontFamily: FontFamily.TTCommonsMedium,
  },
  titleText: {
    color: colors.white,
    fontFamily: FontFamily.TTCommonsMedium,
    fontSize: 13,
    width: '100%',
  },
  snapCarouselItem: {
    height: 110,
    width: 285,
    borderRadius: 5,
    backgroundColor: Colors.MRSTARTMYDAYCARD,
    padding: 16,
    overflow: 'hidden',
  },
  carouselItemTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  carouselItemTitleText: {
    fontSize: 16,
    color: Colors.black,
    fontFamily: FontFamily.TTCommonsBold,
  },
  paginationContainer: {
    paddingVertical: 2,
    bottom: 4,
  },
  dotStyle: {
    backgroundColor: Colors.MRGREEN,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#402583',
    backgroundColor: colors.white,
    shadowOffset: {
      width: 0,
      height: 0,
    },
  },
  avatar: {
    height: 54,
    width: 54,
    resizeMode: 'contain',
    borderRadius: 54 / 2,
  },
  fullNameText: {
    fontSize: 16,
    marginLeft: 24,
  },
});


export default NewSlider;

