import React, { useState } from 'react';
  import { StyleSheet, Text, View } from 'react-native';
  import { Dropdown } from 'react-native-element-dropdown';
import { Colors } from '../../../assets/config/Colors';
import { FontFamily } from '../../../assets/fonts/FontFamily';

 

const NewDropDown = (props) => {
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    const renderLabel = () => {
      if (value || isFocus) {
        return (
          <Text style={[styles.label, isFocus && { color: 'gray',fontSize:8 }]}>
           {props.label} 
          </Text>
        );
      }
      return null;
    };

    const handleOnChange=(item)=>{
        setIsFocus(false);
        setValue(item.value);
        props.onPressfun(item.value)
    }

    return (
      <View style={{...styles.container, width:props.width}}>
        {renderLabel()}
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: 'gray' }]}
          placeholderStyle={{...styles.placeholderStyle,fontSize:props.placeholderFontSize,color:'#000',fontFamily:FontFamily.TTCommonsMedium}}
          selectedTextStyle={{...styles.selectedTextStyle,fontSize:props.selectedItemFontSize,color:props.selectedItemColor}}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={props.data}
          search={true}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? props.label : '...'}
          searchPlaceholder="Search..."
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            handleOnChange(item)
          }}
        />
      </View>
    );
}

export default NewDropDown

NewDropDown.defaultProps ={
    onPressfun: () =>{},
    label: ' Dropdown label',
    width:400,
    data:[
        { label: 'Item 1', value: '1' },
        { label: 'Item 2', value: '2' },
        { label: 'Item 3', value: '3' },
        { label: 'Item 4', value: '4' },
        { label: 'Item 5', value: '5' },
        { label: 'Item 6', value: '6' },
        { label: 'Item 7', value: '7' },
        { label: 'Item 8', value: '8' },
      ],
      placeholderFontSize:14,
      selectedItemFontSize:14,
      selectedItemColor:'#000'
}

const styles = StyleSheet.create({
    container: {
    // backgroundColor: '#fff',
      padding: 8,
      // width:400
    },
    dropdown: {
      height: 40,
      borderColor: Colors.borderColor1,
      // borderWidth: 0.5,
      borderRadius: 20,
      paddingHorizontal: 8,
      backgroundColor: Colors.Textinputbg,

    },
    icon: {
      marginRight: 5,
    },
    label: {
      position: 'absolute',
      backgroundColor:'#fff',
      left: 20,
      top: 1,
      zIndex: 999,
      paddingHorizontal: 5,
      fontSize: 10,
      borderRadius:10,
      borderWidth:1,
      borderColor:Colors.borderColor1
    },
    placeholderStyle: {
      fontSize: 14,
    },
    selectedTextStyle: {
      fontSize: 13,
      
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
  });