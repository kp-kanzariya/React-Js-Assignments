import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { FontFamily } from '../../../assets/fonts/FontFamily';
import ButtonRoot from '../buttons/ButtonRoot';
import FOIcon from 'react-native-vector-icons/Fontisto';
import MIcon from 'react-native-vector-icons/MaterialIcons';
// import {useNavigation} from '@react-navigation/native';
import { Colors } from '../../../assets/config/Colors';
import _ from 'lodash';
import { useSelector } from 'react-redux';

const SubHeader = props => {
  const { isMobile } = useSelector(state => state.isLandscape);
  const handleClickOnpress = () => {
    try {
      props.onPress()
    } catch (error) {
      console.error('Error processing click:', error);
    }
  }
  const debouncedHandleButtonClick = _.debounce(handleClickOnpress, 300);

  return (
    <View
      style={{
        width: props.headerWidth,
        ...styles.container,
        backgroundColor: props.bgsub,
      }}>
      <View style={{ ...styles.left_side_view }}>
        {props.backArrow && (
          <TouchableOpacity
          testID='goBack'
           style={{
            ...styles.backspace_icon,
          }} onPress={debouncedHandleButtonClick}>
            <MIcon
              name="keyboard-backspace"
              size={27}
              color={Colors.gray}
            />
          </TouchableOpacity>
        )}
        {props.showImage && <View
          style={{
            marginLeft: 10,
            height: 50,
            width: 50,
            borderRadius: 80,
            borderWidth: 2,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {props.img}
        </View>}

        <View style={{ ...styles.name_container,width:props.left_side_view_text_width ,width: isMobile?'60%':'auto'}}>
          <Text
            style={{
              ...styles.name_text,
              fontSize: props?.fontSizeNameText
            }}>
            {props.name }
          </Text>
          {props.subName && (
            <Text
              style={{
                ...styles.name_text,
                fontSize: 12,
                top: 0,
                fontFamily: FontFamily.TTCommonsMedium,
                color: props.subNameColor
              }}>
              {props.subName}
            </Text>
          )}
        </View>
      </View>

      {props.otherContent && (
        <View style={props.otherContentStyle}>
          {props.otherContent}
        </View>
      )}
      {/* {props.rightContent && ( */}
      <View style={{ ...styles.right_side_view }}>
        {props.add && (
          <TouchableOpacity
            // style={{
            //   width: 30,
            //   height: 30,
            //   backgroundColor: '#e2e2e2',
            //   justifyContent: 'center',
            //   alignItems: 'center',
            //   borderRadius: 5,
            //   right: 5,
            // }}
            style={{
              ...styles.search_icon,
            }}
            testID='SubHeader-Add'
            onPress={props.addOnPress}>
            <MIcon
              name="add"
              size={22}
              color={Colors.gray}
            />
          </TouchableOpacity>
        )}
        {props.btn && (
          <ButtonRoot
            testID={props.headerBtnTestId}
            title={props.btnTitle}
            width={'auto'}
            height={30}
            borderRadius={20}
            padding={4}
            onPress={props.btnOnPress}
            Right={props.Right}
            preIconName={props.ICONS}
            TOPS={props.TOPS}
            preIconSize={props.preIconSize}
          />
        )}

        {props.search && (
          <TouchableOpacity
            style={{ marginLeft: 10 }}
            onPress={props.searchOnPress}>
            <MIcon
              name="search"
              style={{
                ...styles.search_icon,
              }}
            />
          </TouchableOpacity>
        )}

        {props.filter && (
          <TouchableOpacity
            style={{
              width: 30,
              height: 30,
              backgroundColor: '#e2e2e2',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 5,
            }}
            onPress={props.onFilterPress}>
            <FOIcon
              size={14}
              name="filter"
              style={{
                ...styles.filter_icon,
              }}
              color={Colors.gray}
            />
          </TouchableOpacity>
        )}

        {props.addNew && (
          <TouchableOpacity
            disabled={props.buttonDisabled ? true : false}
            style={{ right: 20, flexDirection: 'row', backgroundColor: props.buttonDisabled ? '#e2e2e2' : '#50b030', height: 30, alignItems: 'center', justifyContent: 'space-between', borderRadius: 5, paddingHorizontal: 10 }}
            onPress={props.addNewOnPress}>
            <MIcon
              name={props.addNewIcon}
              size={22}
              color={props.buttonDisabled ? '#7f8c8d' : '#fff'}
            />
            <View style={{ marginLeft: 5, }}>
              {props.addNewTopHead && <Text style={{ fontFamily: FontFamily.TTCommonsMedium, fontSize: 12, color: props.buttonDisabled ? '#7f8c8d' : '#fff' }}>
                {props.addNewTopHead}
              </Text>}
              {props.addNewBottomHead && <Text style={{ fontFamily: FontFamily.TTCommonsMedium, fontSize: 10, color: props.buttonDisabled ? '#7f8c8d' : '#fff', marginTop: -2 }}>
                {props.addNewBottomHead}
              </Text>}
            </View>
          </TouchableOpacity>
        )}

        {props?.right_other_content != null && props?.right_other_content}


      </View>
      {/* )} */}
    </View>
  );
};

export default SubHeader;
SubHeader.defaultProps = {
  rightContent: false,
  subName: false,
  title: '+ Add New',
  headerWidth: '97%',
  filter: false,
  search: false,
  add: false,
  otherContent: false,
  btn: false,
  btnTitle: 'Add',
  backArrow: true,
  showImage: false,
  otherContentStyle: { alignSelf: 'center', left: 0 },
  subNameColor: 'black',
  addNewIcon: "add-circle",
  fontSizeNameText: 16,
  right_other_content: null,
  left_side_view_text_width:'auto',
  headerBtnTestId:'headerBtn'

};

const styles = StyleSheet.create({
  container: {
    // width: '97%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  left_side_view: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backspace_icon: {
    color: '#7f8c8d',
    fontSize: 30,
    alignItems: 'center',
    fontWeight: 'bolder',
    backgroundColor: '#e2e2e2',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  name_container: {
    marginLeft: 10,
    // alignItems:'center'
  },
  name_text: {
    color: '#000',
    fontSize: 16,
    // top: 3,
    fontFamily: FontFamily.TTCommonsDemiBold,
  },

  right_side_view: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  search_icon: {
    color: '#7f8c8d',
    // fontSize: 20,
    alignItems: 'center',
    fontWeight: 'bolder',
    borderRadius: 30,
    backgroundColor: '#e2e2e2',
    padding: 5,
  },
  filter_icon: {
    // color: '#7f8c8d',
    // fontSize: 17,
    // alignItems: 'center',
    // fontWeight: 'bolder',
    // borderRadius: 8,
    // backgroundColor: '#e2e2e2',
    // padding: 5,
  },

});
