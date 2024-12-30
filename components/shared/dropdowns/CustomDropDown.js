import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Dimensions,
  } from 'react-native';
//   import ImagesPath from '../constants/ImagesPath';
  import React, {useState} from 'react';
  import FAIcon from 'react-native-vector-icons/FontAwesome';
  const width = Dimensions.get('screen').width;
  const height = Dimensions.get('screen').height;
  const CustomDropDown = ({
    Salutation = [],
    value = {},
    label,
    onSelect = () => {},
  }) => {
    const [showOption, setShowOption] = useState(false);
  
    const onSelctedItem = val => {
      setShowOption(false);
      onSelect(val);
    };
    return (
      <View style={styles.container}>
        {!showOption && (
          <TouchableOpacity
            style={styles.dropDownStyle}
            activeOpacity={0.6}
            onPress={() => setShowOption(!showOption)}>
            <Text>{!!value ? value?.name : label} </Text>
            <FAIcon
            
            name='angle-down' size={25}/>
           
          </TouchableOpacity>
        )}
        {showOption && (
          <View
            style={{
              backgroundColor: 'rgba(0,0,0,0.1)',
              padding: 8,
              width: width * 0.3,
              borderRadius: 22,
              //  marginTop:30,
  
              // position:'absolute',
             
            }}>
            {Salutation.map((val, i) => {
              return (
                <TouchableOpacity
                  key={String(i)}
                  onPress={() => onSelctedItem(val)}
                  style={{
                    paddingVertical: 8,
                    borderRadius: 4,
                    paddingHorizontal: 6,
                  }}>
                  <Text>{val.name}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {},
    dropDownStyle: {
      width: width * 0.3,
      backgroundColor: 'rgba(0,0,0,0.1)',
      padding: 8,
      borderRadius: 35,
      minHeight: 2,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: height * 0.1,
    },
  });
  
  export default CustomDropDown;
  