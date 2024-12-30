import { View, StyleSheet, KeyboardAvoidingView, ScrollView } from 'react-native';
import React from 'react';
import ModalRoot from './ModalRoot';
import ButtonRoot from '../buttons/ButtonRoot';
import { FontFamily } from '../../../assets/fonts/FontFamily';
import useResponsiveDimensions from '../../../hooks/useResponsiveDimensions';
import Dropdown from '../dropdowns/DropdownComponent';
import { Colors } from '../../../assets/config/Colors';
import { TextInput } from 'react-native';
import { FontSize } from '../../../assets/fonts/Fonts';
import Label from '../Label';
import { useSelector } from 'react-redux';
import { MyThemeClass } from '../Theme/ThemeDarkLightColor';
import { AlertWarning } from '../alerts/Alert';

const ConfirmationUi = ({ title, subTitle, props, setShowModal, onConfirm, getAllAccountWithDamage, remark, setRemark, initiallySelectedEmployeeId, initiallySelectedSGPIId, setSecondarySelectedSGPIId }) => {

  const [getAllAccountWithoutInital, setAllAccountWithoutInitialSelect] = React.useState([]);
  const [selectedAccount, setSelectedAccount] = React.useState(null);

  // console.log("data check", getAllAccountWithDamage)

  React.useEffect(() => {
    let arr = []
    getAllAccountWithDamage?.map(item => {
      if (item?.id?.split('@')[0] != initiallySelectedSGPIId) {
        let obj = { label: item.label, value: item?.id?.split('@')[0] }
        arr.push(obj);
      }
    })
    setAllAccountWithoutInitialSelect(arr);
  }, [])
  const { mode } = useSelector(state => state.mode);
  const { isLandscape } = useSelector(state => state.isLandscape);
  const themecolor = new MyThemeClass(mode).getThemeColor()
  return (

    <>

      <View style={{ width: '100%', justifyContent: 'center', alignSelf: 'center', }}>



        <View style={{ top: -15, width: '100%', }}>
          <Label Size={16} Family={FontFamily.TTCommonsBold} Label={subTitle} />
          <View style={{ marginVertical: 5 }} />
          <View style={{ borderBottomWidth: 1, borderBottomColor: Colors.borderColor1 }} />
        </View>

        <View
          style={{
            width: '100%',
          }}>
          <View>
            <Label Size={14} Family={FontFamily.TTCommonsMedium} Label={'Select User/Reason'} />
          </View>
          <View style={{ marginTop: 5 }} />
          <Dropdown
            width={'100%'}
            HEIGHTS={200}
            backroundColor={Colors.Textinputbg}
            borderRadius={8}
            borderwidth={0.5}
            borderColors={Colors.borderColor1}
            options={getAllAccountWithoutInital}
            placeholder="Select"
            onSelect={setSecondarySelectedSGPIId}
            onPressfun={setSelectedAccount}
          />
        </View>
        <View style={{ marginVertical: 5 }} />

        <View style={{ zIndex: -1 }}>
          <Label Size={14} Family={FontFamily.TTCommonsMedium} Label={'Remark'} />

          <View
            style={{
              ...styles.TextInput_View_Css,
              top: 5,
            }}>
            <TextInput
              multiline
              numberOfLines={3}
              textAlignVertical={'top'}
              style={{
                width: '100%',
                backgroundColor: Colors.Textinputbg,
                color: 'black',
                minHeight: 60,
                paddingHorizontal: 5
              }}
              onChangeText={txt => setRemark(txt)}
            />

          </View>

        </View>
        <View style={{ marginVertical: 10 }} />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            width: '100%',
            alignSelf: 'center',
            zIndex: -2
          }}>
          <ButtonRoot
            onPress={() => {
              if (selectedAccount) {
                onConfirm()
              } else {
                AlertWarning('Please choose employee first.')
              }
            }}
            borderRadius={30}
            width={100}
            color="#50b030"
            height={35}
            title={'Submit'}
          />
          <ButtonRoot
            onPress={() => setShowModal(false)}
            width={100}
            borderRadius={30}
            height={35}
            color={'white'}
            textColor={'black'}
            title={'Cancel'}
            borderWidth={0}
          />
        </View>
      </View>
    </>

  );
};

const TransferUnitModal = ({
  showModal,
  subTitle,
  setShowModal,
  title,
  onConfirm,
  getAllAccountWithDamage,
  setRemark,
  remark,
  initiallySelectedEmployeeId,
  initiallySelectedSGPIId,
  setSecondarySelectedSGPIId

}) => {
  const [modalWidth] = useResponsiveDimensions({
    mobile: ['50%', '90%'],
    tab: ['40%', '60%'],
  });
  return (
    <>
      <ModalRoot
        showModal={showModal}
        setShowModal={setShowModal}
        width={modalWidth}
        content={
          <ConfirmationUi
            title={title}
            subTitle={subTitle}
            setShowModal={setShowModal}
            onConfirm={onConfirm}
            getAllAccountWithDamage={getAllAccountWithDamage}
            remark={remark}
            setRemark={setRemark}
            initiallySelectedSGPIId={initiallySelectedSGPIId}
            initiallySelectedEmployeeId={initiallySelectedEmployeeId}
            setSecondarySelectedSGPIId={setSecondarySelectedSGPIId}
          />
        }
      />
    </>
  );
};

export default TransferUnitModal;

TransferUnitModal.defaultProps = {
  title: 'Transfer Input',
  subTitle: 'User',
  onConfirm: () => {
    alert('please pass onConfirm function');
  },
};
const styles = StyleSheet.create({
  MV3: { marginVertical: 3 },
  MV5: { marginVertical: 5 },
  MV8: { marginVertical: 8 },
  MainView: {
    width: '100%',
    flexWrap: 'wrap',
    alignSelf: 'center',
    //   height: 'auto',
    // justifyContent: 'space-between',
  },
  InputMainView: {
    width: '90%',
    flexDirection: 'row',
    // backgroundColor: Colors.Textinputbg,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },

  MainViewCss: {
    // flex: 1,
    // padding: 20,
    height: '100%',
    width: '90%',
    alignSelf: 'center',
    // backgroundColor: 'lightblue',
    paddingBottom: 50,
  },
  SubContainer: {
    height: 50,
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: Colors.borderColor1,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  leave_Text_Css: {
    fontFamily: FontFamily.TTCommonsMedium,
    color: 'black',
  },
  FormDate_To_ToDate_Css: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    fontSize: FontSize.labelText,
    // padding: 8,
    flexWrap: 'wrap',
    // backgroundColor:'red'
  },
  Date_Text_Css: {
    color: 'black',
    fontFamily: FontFamily.TTCommonsMedium,
    fontSize: 12,
  },

  leave_Durataion_Text_Css: {
    fontFamily: FontFamily.TTCommonsMedium,
    color: 'black',
    fontSize: FontSize.labelText,
    marginLeft: 5,
    marginTop: 5,
  },

  FirstSecondHalfView_Css: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // padding: 8,
    marginTop: 5,
  },
  To_Text_Css: {
    marginHorizontal: 10,
    fontFamily: FontFamily.TTCommonsMedium,
    fontSize: 12,
    color: Colors.black,
  },

  TextInput_View_Css: {
    borderRadius: 12,
    backroundColor: Colors.Textinputbg,
    width: '100%',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.borderColor1,
  },

  Button_View_Css: {
    flexDirection: 'row',
    alignItems: 'center',
    // padding: 8,
    marginTop: 15,
    zIndex: -1,
  },

});