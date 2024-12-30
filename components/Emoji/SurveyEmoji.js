import React from 'react';
import {
  TouchableOpacity,
  Dimensions,
  Text,
  StyleSheet,
  View,
  Image,
} from 'react-native';
import { SERVER_URL } from '../../api/commonRepository';
const { width } = Dimensions.get('window');


export default function SurveyEmoji({
  selected,
  setSelected,
  onPress,
  dcrReview,
  option,
  mediaId,
}) {

  let str = option;
  str = str.replace(/"/g, '');
  let finalOpt = str.split(',');
  str = mediaId;
  str = str.replace(/"/g, '');
  let finalMedia = str.split(',');
  let finalData = finalMedia.map((item, index) => {
    return { emoji: item, answer: finalOpt[index] };
  });

  const [serverURL, setServerURL] = React.useState('');

  React.useEffect(() => {
    s_URL();
  }, []);

  const s_URL = async () => {
    let s_u = await SERVER_URL();
    setServerURL(s_u);
  };

  return (
    <>
      <View style={{ flexDirection: 'row', flexWrap: "wrap", left: 5 }}>
        {finalData.map(item => {
          return (
            <View style={{ flexDirection: "column", alignItems: "center" }} >
              <View style={{ width: 100 }} >
                <TouchableOpacity
                  onPress={() => {
                    setSelected(item.emoji);
                    onPress(item.answer);
                  }}
                  activeOpacity={0.7}>
                  {selected === item.emoji ? (
                    <Image
                      style={styles.LogoBottom}
                      resizeMode={'contain'}
                      source={{ uri: `${serverURL}media?id=${item.emoji}` }}
                    />
                  ) : (
                    <Image
                      style={styles.LogoBottomBlur}
                      resizeMode={'contain'}
                      source={{ uri: `${serverURL}media?id=${item.emoji}` }}
                    />
                  )}
                </TouchableOpacity>
              </View>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: 'bold',
                  color: 'black',
                  textAlign: "center",
                }}>
                {item.answer}
              </Text>
            </View>
          );
        })}
      </View>
    </>
  );
}
const styles = StyleSheet.create({

  item: {
    borderRadius: 10,
    width: width * 0.9,
    overflow: 'hidden',
    backgroundColor: '#ecf9fb',
  },

  LogoBottom: {
    width: 43,
    height: 43,
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 10
  },
  LogoBottomBlur: {
    width: 43,
    height: 43,
    alignSelf: 'center',
    opacity: 0.2,
    marginTop: 10,
    marginBottom: 10
  },

});
