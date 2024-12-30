import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import ProgressBar from '../reports/ProgressBar';
import {FlatList} from 'react-native-gesture-handler';
import {Colors} from '../../assets/config/Colors';
import {FontFamily} from '../../assets/fonts/FontFamily';
import {FontSize} from '../../assets/fonts/Fonts';
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons';

// import {Divider} from 'react-native-paper';
const RenderFunction = ({item}) => {
  return (
    <View style={{marginTop: 10}}>
      <View
        style={{
          ...styles.subContainerCss,
        }}>
        <View style={{...styles.label_View_Css}}>
          <View
            style={{
              ...styles.Color_View_Css,
              backgroundColor: item.color,
            }}></View>
          <View style={{marginLeft: 10}}>
            <Text
              style={{
                ...styles.label_text_Css,
              }}>
              {item.label}
            </Text>
          </View>
        </View>
        <View style={{...styles.count_main_View_Css}}>
          <Text
            style={{
              ...styles.count_text_Css,
            }}>
            {item.count}
          </Text>
          <Text style={{marginLeft: 5, top: -2}}>
            <SimpleIcon
              name="arrow-right"
              color={'blue'}
              style={{fontSize: 10}}
            />
          </Text>
        </View>
      </View>
      <View style={{height: 10}} />
      <View style={{borderWidth: 0.3, borderColor: 'grey'}} />
      <View style={{height: 1}} />
    </View>
  );
};

const ExpenseCard = props => {
  return (
    <View
      style={{
        ...styles.Flatlist_View_Css,
        width: props.width,
        height: props.height,
      }}>
      <ProgressBar size={70} circleWidth={15} circleTitle={'Expenses'} />
      <View style={{width: '100%'}}>
        <FlatList
          data={props.data}
          renderItem={({item}) => <RenderFunction item={item} />}
          keyExtractor={(item, index) => index}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  subContainerCss: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  label_View_Css: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  Color_View_Css: {
    width: 10,
    height: 10,
    borderRadius: 20,
    overflow: 'hidden',
  },
  label_text_Css: {
    fontFamily: FontFamily.TTCommonsMedium,
    color: 'black',
    fontSize: FontSize.labelText2,
  },
  count_main_View_Css: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  count_text_Css: {
    fontFamily: FontFamily.TTCommonsMedium,
    color: 'blue',
    fontSize: FontSize.labelText2,
  },
  Flatlist_View_Css: {
    backgroundColor: 'white',
    padding: 20,

    borderRadius: 12,
    alignSelf: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.borderColor1,
  },
});

export default ExpenseCard;
ExpenseCard.defaultProps = {
  width: '94%',
  height: 'auto',
  data: [
    {color: 'yellow', label: 'Submited', count: '10'},
    {color: 'blue', label: 'Created', count: '4'},
    {color: 'red', label: 'Raised', count: '6'},
    {color: 'green', label: 'Rejected', count: '9'},
  ],
};
