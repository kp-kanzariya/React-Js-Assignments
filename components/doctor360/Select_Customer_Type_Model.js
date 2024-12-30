import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import { FontFamily } from '../../assets/fonts/FontFamily';
import ModalRoot from '../shared/modals/ModalRoot';
import { useSelector } from 'react-redux';
import StyleCss from '../../assets/css/styleOutlet';
import { ImagesAssets } from '../shared/ImagesAssets';
import MCIcon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../../assets/config/Colors';


const Select_Customer_Type_Model = props => {
  const { isLandscape } = useSelector(state => state.isLandscape);


  const RenderContent = () => {
    return (
      <View style={{ width: '100%' }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            alignSelf: 'center',
            // backgroundColor: 'red',
          }}>
          <Text style={{ ...styles.title, fontSize: 16, fontFamily: FontFamily.TTCommonsBold }}>
            {props.heading}
          </Text>
          {/* <Entypo
                  name="cross"
                  size={30}
                  onPress={() => props.setDateListModal(!props.datelistModal)}
                />  */}
          <View
            style={{
              ...StyleCss.FLexCenter,

              top: 0,

            }}>

            <TouchableOpacity
              testID='closeCustTypeModal'
              onPress={() => props.setShowModal(!props.showModal)}
              activeOpacity={0.5}>
              <View style={{ ...StyleCss.CLOSEBUTTON, borderColor: Colors.black, width: 20, height: 20 }}>
                <MCIcon name="close" color={Colors.black} size={16} />
              </View>
            </TouchableOpacity>

          </View>
        </View>

        <View style={{ borderBottomWidth: 1, borderColor: Colors.lightgray, width: '100%', paddingVertical: 3 }} />
        <View
          style={{
            ...styles.doctor_to_chemistView,
            width: '98%'
          }}>
          <TouchableOpacity
            testID={props?.firstBoxText}
            onPress={() => {
              props.firstBoxOnPress()
            }}
            style={{ ...styles.doctor_View }}>
            <Image
              style={{ width: 40, height: 40 }}
              source={ImagesAssets.Doctor}
              resizeMode={'contain'}
            />

            <Text style={{ ...styles.box_text, fontFamily: FontFamily.TTCommonsMedium }}>{props.firstBoxText}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            testID={props?.secondBoxText}
            onPress={() => {
              props.secondBoxOnPress()
            }}
            style={{
              ...styles.chemistPharmacy_View,
            }}>
            <Image
              style={{ width: 40, height: 40 }}
              source={ImagesAssets.Store}
              resizeMode={'contain'}
            />

            <Text style={{ ...styles.box_text, fontFamily: FontFamily.TTCommonsMedium }}>{props.secondBoxText}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <>
      <ModalRoot
        width={isLandscape ? '40%' : '80%'}
        height={isLandscape ? 'auto' : '26%'}
        padding={15}
        showModal={props.showModal}
        setShowModal={props.setShowModal}
        content={<RenderContent />}
      />
    </>
  );
};

export default Select_Customer_Type_Model;
Select_Customer_Type_Model.defaultProps = {
  firstBoxOnPress: () => { alert('please pass firstBoxOnPress') },
  secondBoxOnPress: () => { alert('please pass secondBoxOnPress') }
}

const styles = StyleSheet.create({
  heading_text: {
    fontFamily: FontFamily.TTCommonsBold,
    color: '#000000',
    fontSize: 16,
  },
  heading_text_container: {
    width: '100%',
    // marginLeft: 35,
    // backgroundColor:'red',
    alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-between'
  },

  doctor_to_chemistView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: '94%',
  },
  doctor_View: {
    borderRadius: 5,
    backgroundColor: '#34acd3',
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 26,
    margin: 5,
  },

  chemistPharmacy_View: {
    borderRadius: 5,
    backgroundColor: '#34acd3',
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 26,
    margin: 5,
  },
  box_text: {
    color: '#fff',
    fontSize: 13,
    alignSelf: 'center',
    fontFamily: FontFamily.TTCommonsMedium,
    top: 5,
  },
});
