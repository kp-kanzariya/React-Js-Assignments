import React, { useEffect, useState } from 'react';
import { View, TextInput, StyleSheet, Dimensions, KeyboardAvoidingView, ScrollView, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { FontFamily } from '../../../assets/fonts/FontFamily';
import { FontSize } from '../../../assets/fonts/Fonts';
import { Colors } from '../../../assets/config/Colors';
import { useSelector } from 'react-redux';
import { MyThemeClass } from '../Theme/ThemeDarkLightColor';


const Input = (
  props,
  
) => {
 
  const { mode } = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor();

  const [showPlaceholder, setshowPlaceholder] = useState(false);
  const [txt, setTxt] = useState('');

  useEffect(() => {
    if (props.showPlaceholderOnTop) {
      if (txt?.length > 0) {
        setshowPlaceholder(true)
      } else {
        setshowPlaceholder(false)
      }
    }
  }, [txt])

  useEffect(() => {
    if (props.value) {
      setTxt(props.value)
    }
  }, [props.value])


  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>

      <KeyboardAvoidingView style={{ flex: 1, justifyContent: 'center', }} behavior='padding'>
        {/* <View > */}
        <View
          style={[
            style.inputContainer,
            {
              width: props.width,
              height: props.height,
              backgroundColor: !props.editable ? Colors.borderColor : props.backgroundColor,
              borderRadius: props.borderRadius,
              borderColor: props.borderColor,

            },
          ]}>
          {props.icon ? (
            <View style={{ width: '12%', alignSelf: 'center' }}>
              <Icon
                name={props.iconName}
                style={{ color: '#000', fontSize: 22, marginRight: 10 }}
              />
            </View>
          ) : (
            <></>
          )}
          {showPlaceholder && <View style={{ position: 'absolute', top: -1, left: props.topPlaceHolderLeftPosition, paddingHorizontal: 5, backgroundColor: 'white', borderWidth: 1, borderRadius: 10, borderColor: Colors.borderColor1 }} ><Text style={{ fontSize: FontSize.labelText, fontFamily: FontFamily.TTCommonsMedium ,color:themecolor.TXTWHITE}} >{props.placeholder}</Text></View>}
          <View style={{ width: '100%', flexWrap: 'wrap', alignSelf: 'flex-start', justifyContent: 'center', }}>

         
            <TextInput
              style={{ color: '#000', width: '100%', fontFamily: FontFamily.TTCommonsMedium, fontSize: 14, height: props.HeightInputBox, top: props.TOPS || showPlaceholder ? 5 : 0, }}
              placeholder={props.placeholder}
              placeholderTextColor={props.placeholderColor}
              onChangeText={(txt) => {
                let temp = ''
                if (props.type == 'alphabate') {
                  temp = txt.replace(/[^a-z\s]/gi, '').replace(/\s{2,}/g, ' ').replace(/\s+$/, '').concat(txt.endsWith(' ') ? ' ' : '')
                  setTxt(temp); props.onChangeText(temp)
                } else if (props.type == 'number') {
                  temp = txt.replace(/[^0-9]/g, '');
                  setTxt(temp); props.onChangeText(temp)
                } else if (props.type == 'alphanum') {
                  temp = txt.replace(/[^a-z0-9]/g, '');
                  setTxt(temp); props.onChangeText(temp)
                } else {
                  setTxt(txt); props.onChangeText(txt)
                }

              }}
              numberOfLines={5}
              textAlignVertical={props.TextTop}
              multiline={props.MULTILINE}
              keyboardType={props.keyboardType}
              maxLength={props.LENGTH}
              onFocus={() => {
                if (props.showPlaceholderOnTop) {
                  if (txt?.length > 0) {
                    setshowPlaceholder(true)
                  } else {
                    setshowPlaceholder(false)
                  }
                }
              }}
              value={props.value}
              editable={props.editable}

            />
            {/* } */}

          </View>
        </View>
        {/* </View> */}
      </KeyboardAvoidingView>
    </ScrollView>

  );
};

Input.defaultProps = {
  placeholder: '',
  width: '80%',
  height: 30,
  icon: false,
  iconColor: 'white',
  borderRadius: 10,
  textColor: 'white',
  backgroundColor: 'rgba(0,0,0,0.1)',
  iconName: 'account-arrow-right-outline',
  borderColor: '#FFF',
  onChangeText: () => { },
  editable: true,
  value: false,
  showPlaceholderOnTop: false,
  topPlaceHolderLeftPosition: 15,
  type: 'both'
};

export default Input;

const style = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    borderWidth: 0.5,
  },
});
