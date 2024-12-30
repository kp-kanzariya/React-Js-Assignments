import React, { useEffect, useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Voice from '@react-native-community/voice';
import { FontFamily } from '../../../assets/fonts/FontFamily';
import { Colors } from '../../../assets/config/Colors';
const { width } = Dimensions.get('screen');

export default function SearchBar(props) {

  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    Voice.onSpeechStart = onSpeechStartHandler;
    Voice.onSpeechEnd = onSpeechEndHandler;
    Voice.onSpeechResults = onSpeechResultsHandler;
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechStartHandler = e => {
  };
  const onSpeechEndHandler = e => {
    setLoading(false);
  };

  const onSpeechResultsHandler = e => {
    let text = e.value[0];
    props.setSearchValue(text);
  };

  const startRecording = async () => {
    setLoading(true);
    try {
      await Voice.start('en-Us');
    } catch (error) {
      console.error('error raised', error);
    }
  };

  return (
    <View style={styles.SearchBarComponent}>
      <View style={styles.SearchIcon}>
        <Icon name={props.LeftIcon} size={14} color={props.lefticoncolor} style={{ top: props.TOPS }} />
      </View>
      <TextInput
        testID='searchBarComp'
        value={props.searchValue}
        onChangeText={text => props.setSearchValue(text)}
        style={{ ...styles.SearchTextInput, height: props.height }}
        placeholder={props.placeholder}
        placeholderTextColor={props.placetextcolor}
      
      />

    </View>
  );
}
SearchBar.defaultProps = {
  height: 45,
  placeholder: 'Search',
  titlecolor: '#FFF',
  BRadius: 7,

};

const styles = StyleSheet.create({
  SearchBarComponent: {
    width: '100%',
    alignSelf: 'center',
    flexDirection: 'row',
    backgroundColor: Colors.white,
    marginTop: 0,
    borderRadius: 10,
    height: 45,
    borderWidth: 0.5,
    borderColor: Colors.borderColor1
  },

  SearchIcon: { alignSelf: 'center', left: 10 },
  SearchTextInput: {
    left: 15,
    width: '92%',
    fontFamily: FontFamily.TTCommonsMedium,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    top: 2,
    color:"#000"
  },
  MicIcon: { alignSelf: 'center', left: 0 },
  Close: { alignSelf: 'center', left: 12 },
  touchview: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
