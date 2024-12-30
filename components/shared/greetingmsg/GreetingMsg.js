import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Dimensions, View, Text, Image, StyleSheet } from 'react-native';
import Carousel from 'react-native-banner-carousel';
const { width, height } = Dimensions.get('window');
import { FontFamily } from '../../../assets/fonts/FontFamily';
import { FontSize } from '../../../assets/fonts/Fonts';
import { Colors } from '../../../assets/config/Colors';
import { fontSize } from '../../../assets/fonts/FontSize';
import { useSelector } from 'react-redux';
import Simmer_GreetingMsg from './Simmer_GreetingMsg';
import useResponsiveDimensions from '../../../hooks/useResponsiveDimensions';

const BannerWidth = Dimensions.get('screen').width;
const BannerHeight = 100;
const data = [
  {
    id: 1,
    title: 'Birthday Reminder',
    subtitle:
      'Today is Dr. Avantika Yadav from CIMS hospital has birthday today.',
    pic: require('../../../assets/alembicimages/profile_user.jpg'),
  },
  {
    name: 'carousel2',
    pic: require('../../../assets/alembicimages/profile_user.jpg'),
    title: 'Birthday Reminder',
    subtitle:
      'Today is Dr. Avantika Yadav from CIMS hospital has birthday today.',
  },
  {
    name: 'carousel3',
    pic: require('../../../assets/alembicimages/profile_user.jpg'),
    title: 'Birthday Reminder',
    subtitle:
      'Today is Dr. Avantika Yadav from CIMS hospital has birthday today.',
  },
];

function Renderimage({ item, index, props }) {
  const { mode } = useSelector(state => state.mode);
  const { isLandscape } = useSelector(state => state.isLandscape);
  // const [startDayCardWidth] = useResponsiveDimensions({mobile:['100%','100%'],tab:['30%','100%']})


  const [show, setShow] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 2000);
  }, []);


  return (
    <>
      {show ? (
        <></>
      ) : (
        <Simmer_GreetingMsg />
      )}

      {show &&
       <View
        style={{
          // flex: 1,
          width: '88%',
          alignItems: 'center',
          height: 110,
          flexDirection: 'row',
          // justifyContent: 'center',
          borderWidth: 0.5,
          borderColor: Colors.borderColor1,
          borderRadius: 6,
          backgroundColor: Colors.MRGREEN,
        }}>
        <View style={{ justifyContent: 'center' ,marginLeft:10}}>
          <Image
            key={index}
            style={{
              width: 52,
              height: 52,
            }}
            resizeMode={'contain'}
            source={item.pic}
          />
        </View>
        <View
          style={{
            justifyContent: 'center',
            paddingHorizontal: 0,
            width: '70%',
            marginLeft:10
          }}>
          <Text
            style={{
              fontFamily: FontFamily.TTCommonsDemiBold,
              fontSize: FontSize.labelText3,
              color: Colors.black,
            }}>
            {item.title}
          </Text>
          <Text
            style={{
              fontFamily: FontFamily.TTCommonsMedium,
              color: 'black',
              fontSize: 9,
            }}>
            {item.subtitle}
          </Text>
        </View>
      </View>}
    </>
  );
}

export default function GreetingMsg(props) {
  const { mode } = useSelector(state => state.mode);
  const { isLandscape } = useSelector(state => state.isLandscape);

  return (
    <>
      <View style={{ width:'100%'}}>
        <Carousel
          autoplay={false}
          autoplayTimeout={5000}
          loop
          index={0}
          pageSize={BannerWidth}>
          {data.map((item, index) => (
            <Renderimage item={item} key={index} />
          ))}
        </Carousel>
      </View>
    </>
  );
}


const styles = StyleSheet.create({

  simmer_container: {
    width: '100%',
    height: 110,
    backgroundColor: '#ffffff',
    padding: 5,
    borderRadius: 10,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#e2e2e2',
    overflow: 'hidden',
  },
  simmer_img_background: {
    width: '25%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    position: 'relative',
  },


  simmer_side_all_text_container: {
    padding: 5,
  },

});


GreetingMsg.defaultProps = {
  //   data: data,
  width: 500,
};
