import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Colors } from '../../../assets/config/Colors';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import { FontFamily } from '../../../assets/fonts/FontFamily';
import { appendTextToFile } from '../../../helper/utils/Logger';
import { store } from '../../../redux/store';
import { FontSize } from '../../../assets/fonts/Fonts';
import Input from '../textinputs/Input';

const Dropdown = props => {
  const [selectedValue, setSelectedValue] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [showPlaceholder, setshowPlaceholder] = useState(false);
  const [options, setOptions] = useState([])
  const [searchedData, setSearchedData] = useState([])
  const [searchTxt, setSearchTxt] = useState(null)
  const handleSelectValue = (item) => {
    try {
      setSelectedValue(item.label);
      setShowDropdown(false);
      props.onSelect(item.value);
      props.onSelectGetItem(item);
      props.optionFunctionOnSelect(item.value);
      props.onPressfun(item.value);
      props.onPressLabelFun(item.label);
      props.onPressfunforSurveyDD(item.label);
      if (props?.isSearchEnable) {
        setOptions(props?.options)
      }
    } catch (e) {
      console.error('In Catch in DropdownComponent Line 16', e);
      appendTextToFile({
        text: `Error in catch fun handleSelectValue inside DropdownComponent Line 30 ${e}`,
        headerDate: store?.getState().header.headerDate,
      });
    }
  };

  useEffect(() => {
    if (selectedValue) {
      setshowPlaceholder(true);
    }
  }, [selectedValue]);

  useEffect(() => {
    if (props?.value) {
      setSelectedValue(props?.value);
    }
  }, [props?.value]);

  const filterOutlet = async (data, key) => {
    //     console.log("total data",data)
    // console.log("key to search",key)
    let fData = data?.filter((item) => item?.value == key);
    // console.log("fdata inside Dropdown", fData)
    if (fData.length > 0) {
      setSelectedValue(fData[0]?.label)
    }
  }

  useEffect(() => {
    if (props?.dynamicId) {
      filterOutlet(props?.options, props?.dynamicId)
    }
  }, [props?.dynamicId])


  const handleSearchText = (txt) => {
    setSearchTxt(txt)
    const filterSearchData = props?.options.filter((itm) => {
      return itm.label.toLowerCase().includes(txt.toLowerCase())
    })
    if(filterSearchData.length>0){
      setSearchedData(filterSearchData)
    }else{
      setSearchedData([])
    }
  }

  useEffect(() => {
    if (props?.isSearchEnable && searchTxt) {
      setOptions(searchedData)
      return
    }
    setOptions(props?.options)

  }, [searchedData, props?.options])



  return (
    <View
      style={{
        ...styles.container,
        width: props.width,
        borderRadius: props.borderRadius,
        backgroundColor: props.editable ? props.backroundColor : Colors.borderColor,
        zIndex: 99999,
        borderWidth: props.borderwidth,
        borderColor: props.borderColors,
        height: props.height,
        justifyContent: 'center',
        minHeight: 45,
        // position: 'relative'
      }}>
      {showPlaceholder && (
        <View
          style={{
            position: 'absolute',
            top: -1,
            left: 15,
            paddingHorizontal: 5,
            backgroundColor: 'white',
            borderWidth: 1,
            borderRadius: 10,
            borderColor: Colors.borderColor1,
          }}>
          <Text style={{ fontSize: FontSize.labelText, fontFamily: FontFamily.TTCommonsMedium, color: Colors.black }}>
            {props.placeholder}
          </Text>
        </View>
      )}
      <TouchableOpacity
        testID='toggleDropdown'
        disabled={!props.editable}
        style={{
          ...styles.button,
          borderRadius: props.borderRadius,
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
        }}
        onPress={() => {
          setShowDropdown(!showDropdown);
          props.onClick();
        }}>
        <Text
          style={{
            fontFamily: FontFamily.TTCommonsMedium,
            fontSize: 14,
            color: props.placecolor,
            top: showPlaceholder ? 2 : 0
          }}>
          {selectedValue || props.placeholder}
        </Text>
        <Text
          style={{
            right: 0,
            fontFamily: FontFamily.TTCommonsDemiBold,
            fontSize: 14,
            color: Colors.MRTEXTGREY,
          }}>
          <FAIcon name={!showDropdown ? 'angle-down' : 'angle-up'} size={20} />
        </Text>
      </TouchableOpacity>
      {/* <View  > */}
      {showDropdown && (
        <View style={{ position: 'relative' }}>

          {props?.isSearchEnable && <View>
            <Input
              // placeholder={`Email${requiredFeilds[OutletType]?.includes('Email') ? '*' : ''}`}
              placeholder={`Search...`}
              width="100%"
              borderColor={Colors.borderColor1}
              borderRadius={0}
              height={45}
              HeightInputBox={45}
              backgroundColor={Colors.white}
              placeholderColor={Colors.black}
              onChangeText={txt => handleSearchText(txt)}
              editable={true}
              // value={doctorInputs.email}
              showPlaceholderOnTop
            />
          </View>}

          <View
            style={{
              position: 'relative',
              zIndex: 2,
              backgroundColor: 'white',
              width: '100%',
              borderRadius: 10,
              borderWidth: 1,
              borderColor: Colors.borderColor1,
              top: 0,
              maxHeight: props.HEIGHTS,
            }}>
            {/* <ScrollView contentContainerStyle={{maxHeight:200,width:'100%'}} nestedScrollEnabled={true}> */}
            <ScrollView
              nestedScrollEnabled={true}
              horizontal={false}
            // style={{
            //   borderRadius: 10,
            //   overflow: 'hidden',
            //   height: props.HEIGHTS,
            //   // flex:1
            //   width: '100%',
            // }}
            >
              {options.map((item, index) => (
                <>
                  <TouchableOpacity
                    testID={`${item.label}+${index}`}
                    key={index}
                    style={{
                      ...styles.option,
                    }}
                    onPress={() => handleSelectValue(item)}>
                    <Text
                      style={{
                        fontFamily: FontFamily.TTCommonsMedium,
                        fontSize: 14,
                        color: Colors.black,
                      }}>
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                </>
              ))}
            </ScrollView>
          </View>
        </View>
      )}
    </View>
    // </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
    zIndex: 10,
    borderWidth: 1,
    borderColor: Colors.borderColor1,
  },
  button: {
    // backgroundColor: '#eee',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  dropdown: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 5,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderWidth: 1,
    borderColor: Colors.borderColor,
  },
  option: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});

export default Dropdown;
Dropdown.defaultProps = {
  options: [
    { label: 'value one', value: 1 },
    { label: 'value two', value: 2 },
    { label: 'value three', value: 3 },
    { label: 'value three', value: 4 },
    { label: 'value three', value: 5 },
    { label: 'value three', value: 6 },
  ],
  onSelect: () => { },
  onSelectGetItem: () => { },
  placeholder: 'Select',
  backgroundColor: 'white',
  borderRadius: 6,
  optionFunctionOnSelect: () => { },
  onPressfun: () => { },
  onPressLabelFun: () => { },
  onPressfunforSurveyDD: () => { },
  height: 'auto',
  editable: true,
  onClick: () => { },
  placecolor: 'black',
  isSearchEnable: false
};
