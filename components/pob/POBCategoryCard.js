import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {FontFamily} from '../../assets/fonts/FontFamily';
import {FontSize} from '../../assets/fonts/Fonts';
import {useNavigation} from '@react-navigation/native';

const POBCategoryCard = props => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('POBProducts')}
      style={{
        ...styles.mainContainer,
      }}>
      <View
        style={{
          ...styles.text_cat_css,
        }}>
        <Text>{props.cat_image}</Text>
      </View>
      <View style={{width: '80%', marginLeft: 10}}>
        <Text
          style={{
            ...styles.title_Css,
          }}>
          {props.cat_title}
        </Text>
        {props.qty && (
          <Text
            style={{
              ...styles.qty_Css,
            }}>
            qty: {props.qty}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default POBCategoryCard;
POBCategoryCard.defaultProps = {
  cat_title: 'abc',
  cat_image: 'not found',
  qty: false,
};
const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    padding: 10,
    borderRadius: 12,
  },
  text_cat_css: {
    width: 55,
    height: 55,
    borderRadius: 50,
    borderWidth: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title_Css: {
    fontFamily: FontFamily.TTCommonsMedium,
    fontSize: FontSize.labelText,
    color: 'black',
  },
  qty_Css: {
    fontFamily: FontFamily.TTCommonsMedium,
    fontSize: FontSize.labelText,
  },
});
