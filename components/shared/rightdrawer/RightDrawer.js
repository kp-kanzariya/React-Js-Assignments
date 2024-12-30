import React, { useState } from "react";
import { Button, Text, View,StyleSheet,Dimensions,StatusBar } from "react-native";
import Modal from "react-native-modal";
const { width,height } = Dimensions.get('screen');
import Label from '../Label';
import MCIcon from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from "react-redux";

function RightDrawer(props) {
  const deviceWidth = Dimensions.get("window").width;
  const {isLandscape} = useSelector(state => state.isLandscape);
  return (
    <>
       <StatusBar
       hidden 
          translucent
          backgroundColor="transparent"
        />
      <Modal 
      isVisible={props.isModalVisible}
      deviceWidth={width}
      deviceHeight={height}
      onBackdropPress={() => props.setModalVisible(false)}
      onSwipeComplete={() => props.setModalVisible(false)}
      swipeDirection={'right'}
      animationIn={'bounceInRight'}
      // animationOut={'fadeIn'}
      style={{right:0,}}
      >
      <View style={{...styles.centeredView}}>
            <View
              style={{
                ...styles.modalView,
                padding: props.padding,
                borderBottomLeftRadius:20,
                borderTopLeftRadius:20,
                height: isLandscape ? height*0.9 : '100%',
                right: isLandscape ? -70 : -50
              }}>
            <View style={{flexDirection:'row',width:'80%',justifyContent:'space-between',top:10}}>
             <Label LEFT={0} Label="Notification" />
             <MCIcon name="close" size={20} />
             </View>
            </View>
          </View>
      </Modal>
      </>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    right:0,
    alignSelf:'flex-end',
    width:'100%'
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    alignItems: 'center',
    borderBottomLeftRadius:20,
    borderTopLeftRadius:20,
    // right:-50,
    // width:'100%',
    alignSelf:'flex-end',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default RightDrawer;