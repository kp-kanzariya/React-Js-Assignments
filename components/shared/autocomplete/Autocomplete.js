import { View, Text, TouchableOpacity, Dimensions , TextInput} from 'react-native'
import React from 'react'
import Autocomplete from 'react-native-autocomplete-input';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import Octicons from 'react-native-vector-icons/Octicons';
import { Colors } from '../../../assets/config/Colors';
import Color, {
  MyThemeClass,
} from '../../../components/shared/Theme/ThemeDarkLightColor';
import { useSelector } from 'react-redux';
const {width, height} = Dimensions.get('window')
const Data = [
    {
      name: 'Rajat',
    },
    {
        name: 'Vishwas',
    },
    {
        name: 'Abhinav',
    },
    {
        name: 'Vikram',
    }
  ];
export default function AutoComplete(props) {
  const {mode} = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor();
    return (
            <View
                style={{
                  width: '100%',
                  flex:1
                }}>
                <Autocomplete
                // containerStyle={{borderWidth: 0}}
                // inputContainerStyle={{borderWidth: 0.5,left:10,borderColor:Colors.borderColor1,borderRadius:6,}}
                textInputProps={{
                  placeholder: 'Type 3+ letters',
                  autoCorrect: false,
                  autoCapitalize: 'none',
                  color: '#000',
                }}
                inputContainerStyle={{
                  // backgroundColor: '#FFF',
                  borderRadius: 5,
                  zIndex: 9999,
                  color: '#000',
                  borderWidth: 0,
                  borderColor:Colors.borderColor,
                  left:5,
                }}
                listContainerStyle={{maxHeight:200}}
                suggestionsListContainerStyle={{
                  color: themecolor.TXTWHITE,
                  backgroundColor: themecolor.BOXTHEMECOLOR,
                  
                }}
                containerStyle={{
                  flexGrow: 1,
                  flexShrink: 1,
                  width: '100%',
                  borderWidth:0.5,
                  borderRadius:6,
                  borderColor:Colors.borderColor1,
                  color: '#000',
                }}
                style={{borderColor:Colors.borderColor,borderRadius:6,borderWidth:0.5,height:40,color: '#000',}}
                  autoCapitalize="none"
                  autoCorrect={false}
                  data={props.filteredData}
                  placeholder="Search & Select"
                  onChangeText={text => props.onSearch(text)}
                  defaultValue={props.selectedValue}
                  flatListProps={{
                    keyExtractor: (_, idx) => idx,
                    renderItem: ({ item }) => (
                     props.renderItem(item)
                    ),
                  }}
                  placeholderTextColor={themecolor.TXTWHITE}
                />
                <Octicons
                  name="search"
                  color={themecolor.TXTWHITE}
                  size={16}
                  style={{
                    top: 12,
                    right: 10,
                    zIndex: 99999,
                    position: 'absolute',
                  }}
                />
              </View>
    );
}
AutoComplete.defaultProps={
    data:Data,
    onSearch:()=>{},
    filteredData:[],
    renderItem:{},
    selectedValue:''
}

/**
 * 
 * Do not remove anything,if you have any query please connect with me,If you want to use this Autocomplete
 * please refer QRCDrawerContent.js
 * Abhinav shrivastava
 */