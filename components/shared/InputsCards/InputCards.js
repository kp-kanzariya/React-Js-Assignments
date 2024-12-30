import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import NumericInput from 'react-native-numeric-input';
import { FontFamily } from '../../../assets/fonts/FontFamily';
import { Colors } from '../../../assets/config/Colors';
import { FontSize } from '../../../assets/fonts/Fonts';
import Foundation from 'react-native-vector-icons/Foundation';
import Spacer from '../spacers/Spacer';
import { SERVER_URL } from '../../../api/commonRepository';
import { store } from '../../../redux/store';
import moment from 'moment';
import { useSelector } from 'react-redux';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { AlertDanger, AlertWarning } from '../alerts/Alert';
import DCRInputDao from '../../../Database/DAO/DCRInputDao';
import DailyCallsDAO from '../../../Database/DAO/DailyCallsDAO';
import ModalRoot from '../modals/ModalRoot';
import { MyThemeClass } from '../Theme/ThemeDarkLightColor';
import MCIcon from 'react-native-vector-icons/MaterialIcons';
import outletViewDao from '../../../Database/DAO/outletViewDao';
import FIcon from 'react-native-vector-icons/FontAwesome';


const DATA = [
  {
    id: '1',
    title: 'Azithral 500 Tablet',
    image: require('../../../assets/alembicimages/liquidMedicine1.jpg'),
    avilable: 'Available 10 Pcs.',
  },
  {
    id: '2',
    title: 'Second Item',
    image: require('../../../assets/alembicimages/liquidMedicine1.jpg'),
    avilable: 'Available 6 Pcs.',
  },
  {
    id: '3',
    title: 'Third Item',
    image: require('../../../assets/alembicimages/liquidMedicine1.jpg'),
    avilable: 'Available 7 Pcs.',
  },
  {
    id: '3',
    title: 'Third Item',
    image: require('../../../assets/alembicimages/liquidMedicine1.jpg'),
    avilable: 'Available 7 Pcs.',
  },
];

function UnsyncedRenderItem({ item, isMobile }) {
  const [customerName, setCustomerName] = React.useState('');
  const [outletCode, setOutletCode] = React.useState('');

  React.useEffect(() => {
    async function temp() {
      let res = await outletViewDao.getOutletNameByOutletOrgId(
        item?.OutletOrgDataId,
      );
      if (res.length > 0) {
        setCustomerName(
          res[0].OutlettypeName == 'Doctor'
            ? `Dr. ${res[0].OutletContactName}`
            : res[0].OutletName,
        );
        setOutletCode(res[0].OutletCode);
      }
    }
    temp();
  }, []);

  return (
    <View
      style={{
        maxWidth: isMobile ? '100%' : '32%',
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginTop: 10,
        borderRadius: 10,
        backgroundColor: '#EAEAEA',
        flex: 1,
        marginHorizontal: 5,
        height: 100
        // paddingHorizontal:10
      }}>
      {/* First Row Start */}

      <View style={{ flexDirection: 'row' }}>
        <View style={{ justifyContent: 'flex-start', width: '60%' }}>
          <Text style={{ fontWeight: 'bold', color: 'green' }}>DCR Date</Text>
        </View>

        <View style={{ justifyContent: 'flex-end', width: '40%' }}>
          <Text
            style={{
              textAlign: 'right',
              fontWeight: 'bold',
              color: 'green',
            }}>
            {item?.DcrDate}
          </Text>
        </View>
      </View>
      {/* First Row End */}

      {/* Second Row Start */}
      <View style={{ flexDirection: 'row' }}>
        <View style={{ justifyContent: 'flex-start', width: '60%' }}>
          <Text style={{ fontWeight: '400', color: 'grey' }}>Customer</Text>
        </View>

        <View style={{ justifyContent: 'flex-end', width: '40%' }}>
          <Text style={{ fontWeight: '400', color: 'grey', textAlign: 'right' }}>
            {customerName}
          </Text>
        </View>
      </View>
      {/* Second Row End */}

      {/* Third Row Start */}
      <View style={{ flexDirection: 'row' }}>
        <View style={{ justifyContent: 'flex-start', width: '60%' }}>
          <Text style={{ fontWeight: '400', color: 'grey' }}>P Code</Text>
        </View>

        <View style={{ justifyContent: 'flex-end', width: '40%' }}>
          <Text style={{ fontWeight: '400', color: 'grey', textAlign: 'right' }}>
            {outletCode}
          </Text>
        </View>
      </View>
      {/* Third Row End */}

      {/* Fourth Row Start */}
      <View style={{ flexDirection: 'row' }}>
        <View style={{ justifyContent: 'flex-start', width: '60%' }}>
          <Text style={{ fontWeight: '400', color: 'grey' }}>
            Distributed Quantity
          </Text>
        </View>

        <View style={{ justifyContent: 'flex-end', width: '40%' }}>
          <Text style={{ fontWeight: '400', color: 'grey', textAlign: 'right' }}>
            {item.distributedQTY} pcs
          </Text>
        </View>
      </View>
      {/* Fourth Row End */}

      <View style={{ paddingVertical: 5 }} />
    </View>
  );
}

function ModalContent({
  actualBalance,
  unsyncedBalance,
  showModal,
  setShowModal,
  sgpiStockWithDCR,
  sgpiId,
  SgpiAccountId,
  sgpiName
}) {
  const { mode } = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor();
  const { isLandscape, isMobile } = useSelector(state => state.isLandscape);


  return (
    <>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          padding: 20,
          borderRadius: 10,
          width: '100%',
          // height: sgpiStockWithDCR[sgpiId]?.length > 0 ? '85%':'auto',
          // flex:1
          top: 30,
          // zIndex:-1
          // backgroundColor:'red'
        }}>
        <View style={{ position: 'absolute', flex: 1, right: 5, top: -30 }}>
          <TouchableOpacity
            testID='toggleModal'
            onPress={() => {
              setShowModal(!showModal);
            }}
            activeOpacity={1}>
            <View
              style={{
                width: 25,
                height: 25,
                borderRadius: 30,
                borderWidth: 0.5,
                justifyContent: 'center',
                alignItems: 'center',
                borderColor: themecolor.TXTWHITE,
              }}>
              <MCIcon name="close" color={themecolor.TXTWHITE} size={20} />
            </View>
          </TouchableOpacity>
        </View>

        <View style={{}}>
          <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
            <Text style={{ fontWeight: 'bold', fontSize: 14 }}>Balance :</Text>
            <Text style={{ fontWeight: 'bold', fontSize: 14, right: 15 }}>{sgpiName}</Text>

          </View>

          <View
            style={{
              padding: 8,
              top: 10,
              borderRadius: 10,
              backgroundColor: '#EAEAEA',
            }}>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ justifyContent: 'flex-start', width: '60%' }}>
                <Text style={{ fontWeight: 'bold', color: 'green' }}>
                  SGPI ID / SGPI CODE
                </Text>
              </View>

              <View style={{ justifyContent: 'flex-end', width: '40%' }}>
                <Text
                  style={{
                    textAlign: 'right',
                    fontWeight: 'bold',
                    color: 'green',
                  }}>
                  {sgpiId}/{SgpiAccountId}
                </Text>
              </View>
            </View>

            {/* First Row Start */}

            <View style={{ flexDirection: 'row' }}>
              <View style={{ justifyContent: 'flex-start', width: '60%' }}>
                <Text style={{ fontWeight: 'bold', color: 'green' }}>
                  Actual Balance
                </Text>
              </View>

              <View style={{ justifyContent: 'flex-end', width: '40%' }}>
                <Text
                  style={{
                    textAlign: 'right',
                    fontWeight: 'bold',
                    color: 'green',
                  }}>
                  {actualBalance} pcs
                </Text>
              </View>
            </View>
            {/* First Row End */}

            {/* Second Row Start */}
            <View style={{ flexDirection: 'row' }}>
              <View style={{ justifyContent: 'flex-start', width: '60%' }}>
                <Text style={{ fontWeight: '400', color: 'grey' }}>
                  Unsynced Balance
                </Text>
              </View>

              <View style={{ justifyContent: 'flex-end', width: '40%' }}>
                <Text
                  style={{
                    fontWeight: '400',
                    color: 'grey',
                    textAlign: 'right',
                  }}>
                  {unsyncedBalance == 0 ||
                    unsyncedBalance == null ||
                    unsyncedBalance == undefined
                    ? `0 pcs`
                    : `${unsyncedBalance} pcs`}
                </Text>
              </View>
            </View>
            {/* Second Row End */}
          </View>
        </View>

        {/* <ScrollView> */}

        {/* Summary Part Start */}
        {sgpiStockWithDCR[sgpiId]?.length > 0 && (
          <View style={{ marginTop: 20, width: '100%' }}>
            <View style={{ justifyContent: 'flex-start' }}>
              <Text style={{ fontWeight: 'bold', fontSize: 14 }}>
                Unsynced Distribution:
              </Text>
              <FlatList
                data={sgpiStockWithDCR[sgpiId]}
                showsVerticalScrollIndicator={false}
                // horizontal={false}
                numColumns={isMobile ? 1 : 3}
                renderItem={({ item }) => (
                  <UnsyncedRenderItem
                    item={item}
                    actualBalance={actualBalance}
                    unsyncedBalance={unsyncedBalance}
                    isMobile={isMobile}
                  />
                )}
              />
            </View>
          </View>
        )}
        {/* </ScrollView> */}

        {/* Summary part End */}
      </View>
    </>
  );
}

const Item = ({
  item,
  IsEnabled,
  expenseFilter,
  sgpiStock,
  tempFlag,
  sgpiStockWithDCR,
  campaignSGPI
}) => {
  const { headerDate } = useSelector(state => state.header);
  const { Inputs, InputSwitches } = useSelector(state => state.DCR);
  const { isLandscape, isMobile } = useSelector(state => state.isLandscape);

  // let inputSwitchKeys = Object.keys(InputSwitches);

  //   console.log("InputSwitches.....", InputSwitches)
  // console.log("item",item)
  // console.log('Inputs in Items Line 55 --->', item);
  const Inputkeys = Object.keys(Inputs);
  const [redIcon, setRedIcon] = useState(null);
  const [qty, setQty] = React.useState('');
  const [display, setDisplay] = useState('none');
  const [imageURL, setImageURL] = React.useState(null);
  const [tempStop, setTempStop] = useState(false);
  const [refresh, setRefresh] = React.useState(true);

  // console.log("sgpiStock ===>>>>",sgpiStock)
  // console.log("item?.Balance...",item?.Balance)
  // console.log("parseInt(item?.Balance) - parseInt(sgpiStock[`${item?.SgpiId}`])",parseInt(item?.Balance) - parseInt(sgpiStock[`${item?.SgpiId}`]))

  // console.log("parseInt(sgpiStock[`${item?.SgpiId}`]",parseInt(sgpiStock[`${item?.SgpiId}`]))
  React.useEffect(() => {
    let inputValues = Object.values(Inputs);
    inputValues.forEach((i, index) => {
      // console.log("item above the If Line 74 ---===>",item)
      // console.log("i above the If Line 75 ---===>",i)

      if (i?.SgpiId == item?.SgpiId && IsEnabled) {
        setQty(i.qty);
      }
    });
    if (
      !Inputs.hasOwnProperty(item?.SgpiId) &&
      InputSwitches.hasOwnProperty(item?.SgpiType) &&
      item?.switch
    ) {
      setQty(0);
    }
    setTempStop(true);
  }, [IsEnabled, Inputs]);

  React.useEffect(() => {
    try {
      const end = new Date(item?.UseEndDate);
      const givenDate = new Date(headerDate);
      if (end <= givenDate) {
        let d = moment(item?.UseEndDate)?.format('DD MMM');
        setRedIcon(`Distribution date ${d}`);
      }
    } catch (e) {
      console.error('Error in catch..', e);
      appendTextToFile({
        text: `Error in catch fun useEffect inside InputCards Line 104 ${e}`,
        headerDate: headerDate,
      });
    }
  }, []);

  React.useEffect(() => {
    async function getServerURL() {
      try {
        let SER_URL = await SERVER_URL();
        setImageURL(`${SER_URL}media?id=${item?.SgpiMedia}`);
      } catch (e) { }
    }
    getServerURL();
  }, []);

  const changleDisplay = () => {
    setDisplay(prev => (prev == 'flex' ? 'none' : 'flex'));
  };

  const handleQty = value => {
    // console.log('item New==>', value);
    if (value > 0) {
      let obj = {
        SgpiId: item?.SgpiId,
        qty: value,
        SgpiMedia: item?.SgpiMedia,
        SgpiName: item?.SgpiName,
        SgpiType: item?.SgpiType,
        Balance: item?.Balance,
      };
      setQty(value);
      store.dispatch({ type: 'ADD_INPUTS', payload: [item?.SgpiId, obj] });
      // store.dispatch({ type: 'ADD_INPUT_SWITCHES', payload: [item?.SgpiType, true] });
    } else {
      setQty(value);
      store.dispatch({ type: 'REMOVE_INPUTS', payload: item?.SgpiId });
    }
  };

  const [CalculatedValue, setCalculatedValue] = React.useState(0);
  React.useEffect(() => {
    console.log("Actual Balance ====", item?.Balance);
    console.log("Unsynced Balance ====", sgpiStock[`${item?.SgpiId}`]);

    sgpiStock[`${item?.SgpiId}`]
      ? setCalculatedValue(
        parseInt(item?.Balance) - parseInt(sgpiStock[`${item?.SgpiId}`]),
      )
      : setCalculatedValue(item?.Balance);
  }, [sgpiStock]);

  React.useEffect(() => { }, [tempFlag]);

  const [refreshForQuantity, setRefreshForQuantity] = React.useState(false);


  React.useEffect(() => {
    if(Platform.OS === 'android') {
      setTempStop(false)
      setTimeout(() => {
        setTempStop(true)
        setQty(0)
      }, 100)
    }
  }, [IsEnabled])


  const [showModal, setShowModal] = React.useState(false);

  const handleClickOnBalance = () => {
    setShowModal(true);
  };
  // console.log("campaignSGPI ===>", campaignSGPI)
  // 
  return (
    <>
      {
        <>
          <View style={{ ...styles.mainContainer, zIndex: 9999, width: 170 }}>
            <Spacer h={20} />
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
                width: 70,
                height: 70,
              }}>
              <Image
                style={{ ...styles.imageCss, borderRadius: 10 }}
                source={{ uri: imageURL }}
                resizeMode="center"
              />
            </View>

            <Text style={{ ...styles.textCss, flex: 1 }}>{item?.SgpiName}</Text>

            <View style={styles.numericInputCss}>
              {tempStop && IsEnabled && CalculatedValue > 0 && (
                <NumericInput
                  testID='incDcrInputs'
                  minValue={0}
                  value={qty}
                  valueType="integer"
                  totalWidth={90}
                  totalHeight={40}
                  onLimitReached={(isMax, msg) => {
                    setQty(0);
                    if (qty <= 1) {
                      store.dispatch({
                        type: 'REMOVE_INPUTS',
                        payload: item?.SgpiId,
                      });
                    } else {
                      AlertDanger('Max limit reached');
                    }
                  }}
                  maxValue={CalculatedValue}
                  textColor="#0b142b"
                  borderColor="#fff"
                  onChange={value => {
                    console.log('selected value', value);

                    if (value > CalculatedValue) {
                      setTempStop(false);
                      // alert("Hii")
                      setTimeout(() => {
                        store.dispatch({
                          type: 'REMOVE_INPUTS',
                          payload: item?.SgpiId,
                        });
                        setQty(0);
                        setTempStop(true);
                      }, 100);
                      // setQty(0);
                      // setRefreshForQuantity(!refreshForQuantity)
                      // alert(value)
                      AlertDanger('Max limit reached');
                    } else {
                      // alert("Hii")

                      handleQty(value);
                    }
                  }}
                />
              )}
              {tempStop && IsEnabled && CalculatedValue < 1 && (
                <Text
                  style={{
                    fontFamily: FontFamily.TTCommonsMedium,
                    color: 'red',
                  }}>
                  No Balance
                </Text>
              )}
            </View>

            <TouchableOpacity testID='ClickOnBalance' onPress={() => handleClickOnBalance()}>
              <View style={{ alignSelf: 'center', marginTop: 5 }}>
                <Text
                  style={{
                    fontFamily: FontFamily.TTCommonsMedium,
                    fontSize: 12,
                    color: Colors.MRGREEN,
                  }}>
                  Available {CalculatedValue} Pcs.
                </Text>
                {/* <Text>{ qty} tempStop - {tempStop} ,IsEnabled-{IsEnabled}</Text> */}
              </View>
            </TouchableOpacity>

            <View
              style={{
                position: 'absolute',
                top: 8,
                left: 10,
                flexDirection: 'row',
              }}>
              <TouchableOpacity testID='showInfo' onPress={() => changleDisplay()}>
                <Foundation name="info" size={25} color="grey" />
              </TouchableOpacity>

              <View
                style={{
                  backgroundColor: 'grey',
                  borderRadius: 12,
                  marginLeft: 0,
                  top: -10,
                  display: display,
                  paddingHorizontal: 7,
                  justifyContent: 'center',
                  alignSelf: 'center',
                  alignItems: 'center',
                  paddingVertical: 5,
                }}>
                <Text
                  style={{
                    marginTop: 0,
                    color: 'white',
                    fontFamily: FontFamily.TTCommonsMedium,
                    fontSize: 9,
                    textAlign: 'center',
                    flexWrap: 'wrap',
                  }}>
                  {/* {redIcon} */}
                  {`Distribution date ${moment(item?.UseEndDate)?.format(
                    'DD MMM',
                  )}`}
                </Text>
              </View>

            </View>
            {campaignSGPI.includes(item?.SgpiId) &&
              <View style={{
                position: 'absolute',
                top: 0,
                right: 5,
                flexDirection: 'row',
              }}>
                <FIcon name="bookmark" color={Colors.royalblue} size={14} style={{ right: 2 }} />

              </View>}

          </View>
          <ModalRoot
            width={'90%'}
            padding={5}
            height="70%"
            showModal={showModal}
            setShowModal={setShowModal}
            content={
              <ModalContent
                actualBalance={item?.Balance}
                unsyncedBalance={sgpiStock[`${item?.SgpiId}`]}
                setShowModal={setShowModal}
                showModal={showModal}
                sgpiStockWithDCR={sgpiStockWithDCR}
                sgpiId={item?.SgpiId}
                sgpiName={item?.SgpiName}
                SgpiAccountId={item?.SgpiAccountId}
              />
            }
          />

          <View style={{ paddingVertical: 30 }} />
        </>
      }
    </>
  );
};

const InputCards = props => {
  const [show, setShow] = useState(true);

  React.useEffect(() => {
    setTimeout(() => {
      setShow(false);
    }, 2000);
  }, [props.tempFlag]);

  const { isLandscape, isMobile } = useSelector(state => state.isLandscape);
  // let numColumns = 3;
  return (
    <>
      <View style={{ flex: 1 }}>
        {show ? (
          <SkeletonPlaceholder borderRadius={4}>
            <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
              <SkeletonPlaceholder.Item
                width={165}
                height={200}
                borderRadius={16}
                marginLeft={10}
              />
              <SkeletonPlaceholder.Item
                width={165}
                height={200}
                borderRadius={16}
                marginLeft={10}
              />
              <SkeletonPlaceholder.Item
                width={165}
                height={200}
                borderRadius={16}
                marginLeft={10}
              />
              <SkeletonPlaceholder.Item
                marginLeft={20}></SkeletonPlaceholder.Item>
            </SkeletonPlaceholder.Item>
          </SkeletonPlaceholder>
        ) : (
          <>
            <View>
              <KeyboardAvoidingView
                style={{ flexDirection: 'column', justifyContent: 'center' }}
                // behavior={Platform.OS == "ios" ? "padding" : null}
                // keyboardVerticalOffset={100}
                enabled>
                <ScrollView
                  horizontal={isMobile ? (isLandscape ? false : true) : false}>
                  <FlatList
                    data={props.data}
                    renderItem={({ item, index }) => (
                      <Item
                        item={item}
                        indx={index}
                        IsEnabled={props.IsEnabled}
                        expenseFilter={props.expenseFilter}
                        sgpiStock={props.sgpiStock}
                        tempFlag={props.tempFlag}
                        sgpiStockWithDCR={props.sgpiStockWithDCR}
                        campaignSGPI={props.campaignSGPI}
                      />
                    )}
                    keyExtractor={item => item.id}
                    // contentContainerStyle={{ flexDirection: 'row', flexWrap: isMobile ? (isLandscape ? 'wrap' : 'nowrap') : 'wrap', }}
                    // contentContainerStyle={{ flexDirection: 'row', flexWrap: isMobile ? (isLandscape ? 'wrap' : 'nowrap') : 'wrap', }}
                    scrollEnabled={true}
                    // horizontal
                    numColumns={isMobile ? 1 : 5}
                  />
                </ScrollView>
              </KeyboardAvoidingView>
            </View>
          </>
        )}
      </View>
    </>
  );
};

export default InputCards;

InputCards.defaultProps = {
  inputSampleData: DATA,
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#fff',
    width: 160,
    borderRadius: 16,
    // marginLeft: 10,
    borderWidth: 1,
    borderColor: Colors.borderColor1,
    position: 'relative',
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    // borderColor:Colors.borderColor1
  },
  mciIconCss: {
    color: '#ff2a2a',
    fontWeight: 'bolder',
  },
  imageCss: {
    height: '100%',
    width: '100%',
    // marginTop: 20,
    // marginLeft: 45,
    // backgroundColor: 'red'
  },
  textCss: {
    marginTop: 10,
    color: '#000',
    alignSelf: 'center',
    fontFamily: FontFamily.TTCommonsDemiBold,
    fontSize: 13,
    // backgroundColor: 'yellow',
  },
  numericInputCss: {
    alignSelf: 'center',
    borderWidth: 0,
  },
});

