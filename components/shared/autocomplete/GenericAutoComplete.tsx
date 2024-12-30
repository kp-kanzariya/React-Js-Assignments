import React, { useState } from 'react';
import { StyleSheet, Text, View, ViewStyle, TextStyle } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface DropdownItem {
  [key: string]: any;
}


const defaultData: DropdownItem[] = [
    { label: 'Apple', value: 1 },
    { label: 'Banana', value: 2 },
    { label: 'Cherry', value: 3 },
    { label: 'Date', value: 4 },
    { label: 'Elderberry', value: 5 },
    { label: 'Fig', value: 6 },
    { label: 'Grape', value: 7 },
    { label: 'Honeydew', value: 8 },
    { label: 'Kiwi', value: 9 },
    { label: 'Lemon', value: 10 },
    { label: 'Mango', value: 11 },
    { label: 'Nectarine', value: 12 },
    { label: 'Orange', value: 13 },
    { label: 'Papaya', value: 14 },
    { label: 'Quince', value: 15 },
    { label: 'Raspberry', value: 16 },
    { label: 'Strawberry', value: 17 },
    { label: 'Tangerine', value: 18 },
    { label: 'Ugli Fruit', value: 19 },
    { label: 'Vanilla Bean', value: 20 },
    { label: 'Watermelon', value: 21 },
    { label: 'Xigua', value: 22 },
    { label: 'Yellow Passion Fruit', value: 23 },
    { label: 'Zucchini', value: 24 },
    { label: 'Blueberry', value: 25 },
    { label: 'Blackberry', value: 26 },
    { label: 'Cantaloupe', value: 27 },
    { label: 'Cranberry', value: 28 },
    { label: 'Pineapple', value: 29 },
    { label: 'Peach', value: 30 },
    { label: 'Guava', value: 31 },
    { label: 'Pomegranate', value: 32 },
    { label: 'Lychee', value: 33 },
    { label: 'Mulberry', value: 34 },
    { label: 'Passion Fruit', value: 35 },
  ];

interface GenericAutoCompleteProps<T extends DropdownItem> {
  data?: T[];
  value?: T[keyof T] | null;
  onChange?: (item: T) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  label?: string;
  labelField?: keyof T;
  valueField?: keyof T;
  maxHeight?: number;
  containerStyle?: ViewStyle;
  dropdownStyle?: ViewStyle;
  placeholderStyle?: TextStyle;
  selectedTextStyle?: TextStyle;
  inputSearchStyle?: TextStyle;
  iconStyle?: any;
  renderLeftIcon?: (visible?: boolean) => React.ReactElement | null;
  renderRightIcon?: (visible?: boolean) => React.ReactElement | null;
  isRenderLabel?:boolean;
  padding?:number;
  backgroundColor?:any ;
  borderRadius?:number;
}

const GenericAutoComplete = <T extends DropdownItem>({
  data = defaultData as T[], 
  value,
  onChange = (item) => {console.log("item=>",item)},
  placeholder = 'Select item',
  searchPlaceholder = 'Search...',
  label = 'Dropdown label',
  labelField = 'label',
  valueField = 'value',
  maxHeight = 300,
  containerStyle,
  dropdownStyle,
  placeholderStyle,
  selectedTextStyle,
  inputSearchStyle,
  iconStyle,
  renderLeftIcon,
  renderRightIcon,
  isRenderLabel = false,
  padding = 0,
  backgroundColor = null,
  borderRadius = 0
}: GenericAutoCompleteProps<T>) => {
  const [selectedValue, setSelectedValue] = useState<T[keyof T] | null>(value || null);
  const [isFocus, setIsFocus] = useState(false);

  const renderLabel = () => {
    if (selectedValue || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: 'blue' }]}>
          {label}
        </Text>
      );
    }
    return null;
  };

  const handleChange = (item: T) => {
    const selectedVal = item[valueField as string];
    setSelectedValue(selectedVal);
    onChange(item);
    setIsFocus(false);
  };

  return (
    <View style={[containerStyle ,{padding, backgroundColor,borderRadius}]}>
      {isRenderLabel && renderLabel()}
      <Dropdown
        style={[styles.dropdown, dropdownStyle, isFocus && { borderColor: 'blue' }]}
        placeholderStyle={[styles.placeholderStyle, placeholderStyle]}
        selectedTextStyle={[styles.selectedTextStyle, selectedTextStyle]}
        inputSearchStyle={[styles.inputSearchStyle, inputSearchStyle]}
        iconStyle={[styles.iconStyle, iconStyle]}
        data={data}
        search
        maxHeight={maxHeight}
        labelField={labelField as string}
        valueField={valueField as string}
        placeholder={!isFocus ? placeholder : '...'}
        searchPlaceholder={searchPlaceholder}
        value={selectedValue} // This value now matches the type
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={handleChange}
        renderLeftIcon={renderLeftIcon || ((visible) => (
          <Icon
            style={[styles.icon, iconStyle]}
            color={visible ? 'blue' : 'black'}
            name="arrow-drop-down"
            size={20}
          />
        ))}
        renderRightIcon={renderRightIcon || undefined}
      />
    </View>
  );
};

export default GenericAutoComplete;

const styles = StyleSheet.create({
  dropdown: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 11,
  },
  placeholderStyle: {
    fontSize: 12,
  },
  selectedTextStyle: {
    fontSize: 12,
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
