import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput } from 'react-native';
import { Checkbox } from 'react-native-paper';
import { FontFamily } from '../../../assets/fonts/FontFamily';
import { FontSize } from '../../../assets/fonts/Fonts';
import { Colors } from '../../../assets/config/Colors';
import { useSelector } from 'react-redux';
import { MyThemeClass } from '../Theme/ThemeDarkLightColor';

const CheckboxDropdown = ({ placeholder, disable, options, selectedValues, onChange, width = 300 }) => {
  const { mode } = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef(null);
  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
    if (!dropdownVisible) {
      inputRef?.current?.focus();
    }
  };

  const toggleOption = (value) => {
    const isSelected = selectedValues.includes(value);
    let updatedValues;

    if (isSelected) {
      updatedValues = selectedValues.filter((item) => item !== value);
    } else {
      updatedValues = [...selectedValues, value];
    }

    onChange(updatedValues);
  };

  const filteredOptions = options.filter(
    (item) =>
      item.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <View style={{ ...styles.container, width: width }}>
      <View style={{ justifyContent: 'center', alignItems: 'center', height: 40, width: '100%', }} /* onPress={toggleDropdown} */>
        <Text style={{ fontFamily: FontFamily.TTCommonsMedium, fontSize: FontSize.labelText4,color:themecolor.TXTWHITE}} >{placeholder}</Text>
      </View>

      {/* {true && ( */}
      <View style={styles.dropdown}>
        <TextInput
          ref={inputRef}
          style={styles.searchInput}
          placeholder="Search..."
          onChangeText={(text) => setSearchTerm(text)}
          value={searchTerm}
          placeholderTextColor={themecolor.TXTWHITE}
        />
        <ScrollView style={styles.scrollView}>
          {filteredOptions?.map((item) => (
            <TouchableOpacity
              disabled={disable}
              key={item.value}
              style={styles.checkboxItem}
              onPress={() => toggleOption(item.value)}
            >
              <Checkbox.Android
                disabled={disable}
                status={selectedValues.includes(item.value) ? 'checked' : 'unchecked'}
                onPress={() => toggleOption(item.value)}
              />
              <Text style={{ fontFamily: FontFamily.TTCommonsMedium, fontSize: FontSize.labelText2 ,color:themecolor.TXTWHITE}} >{item.label}</Text>

            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      {/* )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    zIndex: 1,
    // width: 300
  },
  dropdown: {
    position: 'relative',
    // top: 20, // Adjust this value based on your UI
    right: 0,
    left: 0,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ccc',
    maxHeight: 180,
    borderRadius: 10
  },
  scrollView: {
    maxHeight: 180, // Adjust this value based on your UI
  },
  checkboxItem: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    // padding: 2,
    // borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  searchInput: {
    padding: 10,
    // borderBottomWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#e2e2e2',
    borderTopLeftRadius: 9,
    borderTopRightRadius: 9
  },
});

export default CheckboxDropdown;
