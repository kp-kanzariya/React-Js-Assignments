import {StyleSheet,Image} from 'react-native';
import React from 'react';

const UserDummyImage = () => {
  return (
    <Image
      source={require('../../assets/alembicimages/profile_user.jpg')}
      resizeMode="contain"
      style={{...styles.img_style}}
    />
  );
};

export default UserDummyImage;

const styles = StyleSheet.create({
  img_style:{
    width: '100%', height: '100%'
  }
});
