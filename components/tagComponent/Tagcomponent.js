import {View, StyleSheet, Text, ScrollView, Dimensions} from 'react-native';
import {Colors} from '../../assets/config/Colors';
import { FontFamily } from '../../assets/fonts/FontFamily';


const Tagcomponent = props => {
  return (
    <View
      style={{
        width: props?.width,
        backgroundColor: '#cfeff8',
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 5,
        borderRadius: 10,
        height: props.Height,
        borderWidth:1,
        borderColor: Colors.borderColor1
      }}>
       <ScrollView
              style={{
                maxHeight: 200,
                borderRadius: 10,
                overflow: 'hidden',
              }}
              nestedScrollEnabled={true}
              showsVerticalScrollIndicator={true}
   
        contentContainerStyle={{flexDirection: 'row', flexWrap: 'wrap'}}>
        {props?.tags?.split(',')?.map(itm => {
          return (
            <View style={styles.container}>
              <Text onPress={() => {}} style={styles.itemText}>
                {itm}
              </Text>
              
            </View>
          );
        })}
        <View style={{marginVertical:50}} />
      </ScrollView>
    </View>
  );
};
export default Tagcomponent;
Tagcomponent.defaultProps={
   width:'auto'
};

const styles = StyleSheet.create({
  mainContainer: {
    width: 'auto',
    backgroundColor: '#cfeff8',
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 5,
    borderRadius: 15,
    //  marginHorizontal:22,
  },

  container: {
    width: 'auto',
    paddingHorizontal: 8,
    backgroundColor: Colors.bluetheme,
    margin: 2,
    borderRadius: 25,
    height: 22,
    justifyContent: 'center',
    //  alignSelf:'center'
  },

  itemText: {
    color: Colors.white,
    fontSize: 11,
    fontFamily: FontFamily.TTCommonsMedium,
  },
});
