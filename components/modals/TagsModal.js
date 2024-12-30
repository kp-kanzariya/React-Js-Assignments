import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { FontSize } from '../../assets/fonts/Fonts';
import { Colors } from '../../assets/config/Colors';
import { FontFamily } from '../../assets/fonts/FontFamily';
import ModalRoot from '../shared/modals/ModalRoot';
import ButtonRoot from '../shared/buttons/ButtonRoot';
import stylesS from '../../assets/css/stylesSorting';
import StyleCss from '../../assets/css/styleOutlet';
import MCIcon from 'react-native-vector-icons/MaterialIcons';
import useResponsiveDimensions from '../../hooks/useResponsiveDimensions';
import { useSelector } from 'react-redux';
import { MyThemeClass } from '../shared/Theme/ThemeDarkLightColor';
import OutletTagsDAO from '../../Database/DAO/OutletTagsDAO';
import { store } from '../../redux/store';
import { AlertWarning } from '../shared/alerts/Alert';
import { useNavigation } from '@react-navigation/native';
import { appendTextToFile } from '../../helper/utils/Logger';


function CallTypeButton({ item, index }) {
  const { selectedTags } = useSelector(state => state.outletTags);
  const selectedTagsKeys = Object.keys(selectedTags);

  const handleSelectTags = async () => {
    if (selectedTagsKeys.includes(`${item?.OutletTagId}`)) {
      store.dispatch({
        type: 'REMOVE_OUTLET',
        payload: item?.OutletTagId
      });
    } else {
      store.dispatch({
        type: 'SELET_TAGS',
        payload: [item?.OutletTagId, item?.TagName]
      });
    }
  }

  return (
    <>
      <TouchableOpacity
        testID={`${item?.TagName}-${index}`}
        onPress={() => handleSelectTags()}
        style={{
          borderRadius: 20,
          width: 'auto',
          height: 25,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: selectedTagsKeys.includes(`${item?.OutletTagId}`) ? Colors.MRMTP : Colors.Textinputbg,
          marginVertical: 3,
          marginHorizontal: 5,
          flex: 1
        }}>
        <View style={{ marginHorizontal: 10 }}>
          <Text
            style={{
              ...stylesS.TextDark,
              color: selectedTagsKeys.includes(`${item?.OutletTagId}`) ? '#FFF' : Colors.MRAGENDABUTTONBG,
            }}>
            {item?.TagName}
          </Text>

        </View>
      </TouchableOpacity>
    </>
  );
}

const TagsModal = props => {
  const { isLandscape } = useSelector(state => state.isLandscape);
  const { tags } = useSelector(state => state.outletTags);
  const { selectedTags } = useSelector(state => state.outletTags);
  const navigation = useNavigation()
  const [modalWidth] = useResponsiveDimensions({
    mobile: ['50%', '90%'],
    tab: ['40%', '60%'],
  });

  // console.log("props in Tags Modal===",props)
  const { mode } = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor();
  const [getTags, setTags] = React.useState([]);

  React.useEffect(() => {
    setTags(Object.values(tags));
  }, [tags]);


  React.useEffect(() => {
    async function temp() {
      try {
        let res = await OutletTagsDAO.getAllTags();
        // SET_OUTLET_TAG
        let obj = {};
        res.forEach(item => {
          obj[item.OutletTagId] = item;
        });
        store.dispatch({ type: 'SET_ALL_OUTLET_TAG', payload: obj });
      } catch (e) {
        appendTextToFile({
          text: `Error in catch inside StartDayTimeModal Line 125 ${e}`,
          headerDate: store?.getState().header.headerDate
        });
      }
    }
    temp();
  }, []);


  // console.log('props.showModal', props.showModal);


  const handleClickOnSubmit = async () => {
    if (Object.values(selectedTags).length == 0) {
      props.setShowModal(false)
      AlertWarning("Please select any tag");
    } else {
      props.setShowModal(false)
      // console.log("selectedTags.join....", Object.values(selectedTags).join(','));
      navigation.push('EdetailingTask', {
        rehearse: true, data: Object.values(selectedTags).join(','),
        navigateFrom: 'dashboard'
      });
    }
  }

  return (
    <>
      <ModalRoot
        testID={'TagsModal'}
        showModal={props.showModal}
        setShowModal={props.setShowModal}
        width={isLandscape ? '50%' : '100%'}
        height={350}
        padding={10}
        content={
          <>
            <View style={{
              width: '100%',
              alignSelf: 'center',
              alignItems: 'center',
            }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '100%',
                  alignSelf: 'center',
                  paddingVertical: 3
                }}>
                <Text
                  style={{
                    ...styles.title,
                    fontSize: 16,
                    fontFamily: FontFamily.TTCommonsBold,
                  }}>
                  Select Speciality To Start E-Detailing
                </Text>
                <TouchableOpacity
                  testID={'closeTagModal'}
                  onPress={() => {
                    props.setShowModal(!props.showModal)
                    store.dispatch({
                      type: 'REMOVE_ALL_TAGS'
                    });
                  }}
                  activeOpacity={0.5}>
                  <View
                    style={{
                      ...StyleCss.CLOSEBUTTON,
                      borderColor: themecolor.TXTWHITE,
                      width: 22,
                      height: 22,
                      top: -1
                    }}>
                    <MCIcon
                      name="close"
                      color={themecolor.TXTWHITE}
                      size={16}
                    />
                  </View>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: Colors.borderColor1,
                  width: '100%',
                  marginVertical: 5
                }}
              />
            </View>
            <View
              style={{
                width: '100%',
                alignSelf: 'center',
                justifyContent: 'center',
                zIndex: 9999,
              }}>

              <FlatList
                data={getTags}
                renderItem={({ item, index }) =>
                  <>
                    <CallTypeButton item={item} index={index} />
                  </>}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  width: '100%',
                }}
              // numColumns={4}
              // key={1}

              />
              <View style={{ paddingVertical: 10 }} />
              <View style={{ flexDirection: 'row', justifyContent: 'center', alignSelf: 'center' }}>
                <ButtonRoot
                  testID={'Start E-Detailing'}
                  title="Start E-Detailing"
                  width={'40%'}
                  height={40}
                  color={Colors.MRGREEN}
                  borderRadius={15}
                  fontSize={16}
                  onPress={() => handleClickOnSubmit()}
                />

              </View>
            </View>
          </>
        }
      />
    </>
  );
};

export default TagsModal;

const styles = StyleSheet.create({

  title: {
    fontFamily: FontFamily.TTCommonsMedium,
    fontSize: FontSize.h5,
    color: Colors.black,
    alignSelf: 'flex-start',
  },

});
