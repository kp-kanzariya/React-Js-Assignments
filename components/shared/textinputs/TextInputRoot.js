import { View, TextInput, SafeAreaView, Text, KeyboardAvoidingView } from 'react-native';
import React, { useState, useRef } from 'react';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import { Colors } from '../../../assets/config/Colors';
import { FontFamily } from '../../../assets/fonts/FontFamily';
import { MyThemeClass } from '../Theme/ThemeDarkLightColor';
import { useSelector } from 'react-redux';
const TextInputRoot = props => {
  const { mode } = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor();
  const [textStyle, setTextStyle] = useState({
    height: props.height,
    backgroundColor: props.backgroundColor,
    borderRadius: 8,
    borderWidth: props.borderWidth,
    borderColor: props.borderColor,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    width: '100%',
    overflow: 'hidden',
    // paddingLeft:5
  });
  return (
    // <KeyboardAvoidingView style={{ flex: 1, justifyContent: 'center', height: '100%' }} behavior='padding'>
    <SafeAreaView style={{ flex: 1 }}>
      <View style={textStyle}>
        {
          props.icon &&
          <View style={{ width: '6%', justifyContent: 'center', alignItems: 'center' }}>
            <FAIcon name="search" size={15} color={themecolor.TXTWHITE} />
          </View>
        }
        <TextInput
          {...props}
          keyboardType={props.KeyType}
          style={{ height: '100%', left: props.textMarginLeft, width: props.icon ? '94%' : '100%', color: 'black', textAlign: 'left', fontFamily: FontFamily.TTCommonsMedium, paddingHorizontal: props.PH, textAlignVertical: props.TEXTTOP }}
          onChangeText={txt => {
            props.setInput(txt);
            props.onTextChange(txt);
          }}

          // backgroundColor={props.backgroundColor}
          onFocus={() =>
            setTextStyle(prev => {
              return { ...prev, borderColor: props.OnFocusColor, borderWidth: 1 };
            })
          }
          onBlur={() =>
            setTextStyle(prev => {
              return { ...prev, borderColor: props.OnBlurColor, };
            })
          }
          placeholder={props.placeholder}
          placeholderTextColor={themecolor.TXTWHITE}
          value={props.input}
        />
      </View>
    </SafeAreaView>
    // </KeyboardAvoidingView>
  );
};

export default TextInputRoot;
TextInputRoot.defaultProps = {
  OnFocusColor: 'blue',
  OnBlurColor: 'grey',
  placeholder: 'Enter text',
  borderColor: Colors.borderColor1,
  width: '95%',
  height: 45,
  icon: false,
  onTextChange: () => { },
  backgroundColor: 'rgba(0,0,0,0.1)',
  textMarginLeft: 0,
  borderWidth: 0.5,
  left: 10,
  PH: 5,
  setInput: () => { }
};
