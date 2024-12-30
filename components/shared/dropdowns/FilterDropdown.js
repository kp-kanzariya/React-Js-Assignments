  import React, { useState, useEffect } from 'react';
  import { View, Text, Animated, ScrollView, TouchableOpacity } from 'react-native';
  import FAIcon from 'react-native-vector-icons/FontAwesome';
  import { FontFamily } from '../../../assets/fonts/FontFamily';
  import { FontSize } from '../../../assets/fonts/Fonts';
  import { Colors } from '../../../assets/config/Colors';
  import { appendTextToFile } from '../../../helper/utils/Logger';
  import { store } from '../../../redux/store';

  const FilterDropdown = props => {
    const [selectedValue, setSelectedValue] = useState(props.defaultSelected);
    const [dropdownHeight, setDropdownHeight] = useState(new Animated.Value(0));
    const [data, setData] = useState([]);
    const [icon, setIcon] = useState('angle-down');
    const toggleDropdown = () => {
      if (dropdownHeight._value === 0) {
        Animated.timing(dropdownHeight, {
          toValue:
            data.length * props.itemHeight, //  - (props.itemHeight-5) height of child elements
          duration: 300,
          useNativeDriver: false,
        }).start();
        setIcon('angle-up');
      } else {
        Animated.timing(dropdownHeight, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }).start();
        setIcon('angle-down');
      }
    };
    useEffect(() => {
      // setSelectedValue(items[0].label);
      try {
        let mymap = new Map();
        let unique = props?.options?.filter(el => {
          const val = mymap.get(el.label);
          if (val) {
            if (el.id < val) {
              mymap.delete(el.label);
              mymap.set(el.label, el.id);
              return true;
            } else {
              return false;
            }
          }
          mymap.set(el.label, el.id);
          return true;
        });
        let data = unique.filter(itm => {
          return itm.label != selectedValue;
        });
        setData(data);
      } catch (err) {
        console.error("🚀 ~ file: FilterDropdown.js:54 ~ useEffect ~ err:", err)
        appendTextToFile({
          text: `Error in catch fun useEffect inside FilterDropdown Line 58 ${err}`,
          headerDate: store?.getState().header.headerDate
        });
      }
    }, [selectedValue, props?.options]);

    const onItemPress = item => {
      setSelectedValue(item.label);
      props.onValueChange(item);
      toggleDropdown();
    };

    return (
      <View
        style={{
          borderRadius: props.radius,
          overflow: 'hidden',
          position: 'absolute',
          left: props.left,
          right: props.right,
          zIndex: 99999,
          top: props.topp,
          width: props?.width
        }}>
        <TouchableOpacity
          testID={props.testKeyOpenDropdowm}
          onPress={toggleDropdown}
          style={{
            backgroundColor: props.backgroundColor,
            width: props?.width,
            borderTopRightRadius: props.radius,
            borderTopLeftRadius: props.radius,
            alignItems: 'center',
            zIndex: 99,
            paddingHorizontal: 9,
            paddingVertical: props.paddingVertical,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              color: 'white',
              fontSize: FontSize.labelText,
              fontFamily: FontFamily.TTCommonsDemiBold,
            }}>
            {selectedValue}
          </Text>
          <Text style={{ color: 'white', marginLeft: 5 }}>
            <FAIcon name={icon} size={18} />
          </Text>
        </TouchableOpacity>
        <Animated.View
          style={{
            height: dropdownHeight,
            backgroundColor: props.backgroundColor,
            borderBottomRightRadius: props.radius,
            borderBottomLeftRadius: props.radius,
            paddingHorizontal: 10,
            width: 'auto',
            zIndex: 99999,
            maxHeight: 160,
            flex: 1
          }}>
          <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled={true} contentContainerStyle={{ flexGrow: 1 }} >
            {data?.map((item, index) => (
              <>
                <TouchableOpacity
                  testID={`${item?.label}-${item.id}`}
                  key={item?.id}
                  onPress={() => onItemPress(item)}
                  style={{ justifyContent: 'center', height: 'auto', paddingVertical: 1 }}>
                  <Text
                    style={{
                      color: 'white',
                      fontFamily: FontFamily.TTCommonsMedium,
                      fontSize: FontSize.labelText,
                    }}>
                    {item?.label}
                  </Text>
                </TouchableOpacity>
              </>
            ))}
          </ScrollView>
        </Animated.View>
      </View>
    );
  };

  export default FilterDropdown;

  FilterDropdown.defaultProps = {
    onValueChange: () => { },
    options: [
      { label: 'Doctor', id: 1 },
      { label: 'Chemist', id: 2 },
      { label: 'Cardio', id: 3 },
      { label: 'Ortho', id: 4 },
    ],
    paddingVertical: 0,
    itemHeight: 25,
    radius: 10,
    // onValueChange: () => {},
    defaultSelected: 'Doctor',
    backgroundColor: Colors.MRDROPDOWNGREEN,
    left: null,
    right: null,
    topp: -2,
    width: 'auto',
    testKeyOpenDropdowm: 'opendropdown'
    // options:[{label:'hello',id:1}]
  };
