import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import ModalRoot from '../shared/modals/ModalRoot';
import {FontFamily} from '../../assets/fonts/FontFamily';
import {FontSize} from '../../assets/fonts/Fonts';
import {FlatList} from 'react-native-gesture-handler';
import ButtonRoot from '../shared/buttons/ButtonRoot';

const RenderFun = ({item}) => {
  return (
    <View style={{...styles.ViewContainer}}>
      <View style={{...styles.subViewContainer}}></View>
      <Text
        style={{
          ...styles.text_Css,
        }}>
        {item.spec}
      </Text>
    </View>
  );
};

const FilterComp = ({
  data = [
    {spec: 'Cardiologist'},
    {spec: 'Gynecologist'},
    {spec: 'Ophthalmology'},
  ],
  modal,
}) => {
  return (
    <View style={{width: '100%'}}>
      <Text style={{...styles.text_container}}>Filter By</Text>
      <View>
        <View style={{...styles.Not_Visited_container}}>
          <View style={{...styles.not_Visited_View_Css}}></View>
          <Text
            style={{
              ...styles.not_Visited_text_Css,
            }}>
            Not visited in last week
          </Text>
        </View>
        <View style={{...styles.last_15_days_View}}>
          <View style={{...styles.last_15_days_sub_View}}></View>
          <Text
            style={{
              ...styles.text_15_days_Css,
            }}>
            Not visited in last 15 days
          </Text>
        </View>
        <View style={{...styles.Not_visited_in_last_30_days_View}}>
          <View style={{...styles.not_visited_sub_View}}></View>
          <Text
            style={{
              ...styles.Not_visited_in_last_30_days_text_Css,
            }}>
            Not visited in last 30 days
          </Text>
        </View>
      </View>
      <View style={{height: 10}} />
      <Text style={{...styles.Specialization_text_Css}}>Specialization</Text>
      <View>
        {/* <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={{height: 12, width: 12, borderWidth: 1}}></View>
          <Text
            style={{
              fontFamily: FontFamily.TTCommonsMedium,
              fontSize: FontSize.labelText,
              marginLeft:10
            }}>
            Cardiologist
          </Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={{height: 12, width: 12, borderWidth: 1}}></View>
          <Text
            style={{
              fontFamily: FontFamily.TTCommonsMedium,
              fontSize: FontSize.labelText,
              marginLeft:10
            }}>
            Gynecologist
          </Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={{height: 12, width: 12, borderWidth: 1}}></View>
          <Text
            style={{
              fontFamily: FontFamily.TTCommonsMedium,
              fontSize: FontSize.labelText,
              marginLeft:10
            }}>
            Ophthalmology
          </Text>
        </View> */}
        <FlatList
          data={data}
          renderItem={({item}) => <RenderFun item={item} />}
          keyExtractor={(item, indx) => indx}
        />
      </View>
      <View style={{flexDirection: 'row', marginTop: 10}}>
        <ButtonRoot
          title="Apply"
          width={100}
          height={40}
          color="green"
          borderRadius={15}
          onPress={() => alert('please pass function')}
        />
        <ButtonRoot
          title="Cancel"
          width={90}
          height={40}
          color="transparent"
          textColor="black"
          onPress={() => modal(false)}
        />
      </View>
    </View>
  );
};

const DoctorFilterModal = props => {
  // const [doctorFilterModal, setDoctorFilterModal] = useState(false);
  return (
    <ModalRoot
      showModal={props.doctorFilterModal}
      setShowModal={props.setDoctorFilterModal}
      content={
        <FilterComp data={props.data} modal={props.setDoctorFilterModal} />
      }
      padding={20}
    />
  );
};

export default DoctorFilterModal;

const styles = StyleSheet.create({
  ViewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subViewContainer: {
    height: 12,
    width: 12,
    borderWidth: 1,
  },
  text_Css: {
    fontFamily: FontFamily.TTCommonsMedium,
    fontSize: FontSize.labelText,
    marginLeft: 10,
  },
  text_container: {
    fontFamily: FontFamily.TTCommonsMedium,
    color: 'black',
  },
  Not_Visited_container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  not_Visited_View_Css: {
    height: 12,
    width: 12,
    borderWidth: 1,
  },
  not_Visited_text_Css: {
    fontFamily: FontFamily.TTCommonsMedium,
    fontSize: FontSize.labelText,
    marginLeft: 10,
  },
  last_15_days_View: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  last_15_days_sub_View: {
    height: 12,
    width: 12,
    borderWidth: 1,
  },
  text_15_days_Css: {
    fontFamily: FontFamily.TTCommonsMedium,
    fontSize: FontSize.labelText,
    marginLeft: 10,
  },
  Not_visited_in_last_30_days_View: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  not_visited_sub_View: {
    height: 12,
    width: 12,
    borderWidth: 1,
  },
  Not_visited_in_last_30_days_text_Css: {
    fontFamily: FontFamily.TTCommonsMedium,
    fontSize: FontSize.labelText,
    marginLeft: 10,
  },
  Specialization_text_Css: {
    fontFamily: FontFamily.TTCommonsMedium,
    color: 'black',
  },
});
