import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontFamily } from '../../assets/fonts/FontFamily';
import { FontSize } from '../../assets/fonts/Fonts';
import { Colors } from '../../assets/config/Colors';
import { FlatList } from 'react-native';
import { store } from '../../redux/store';
import SimmerCampaign from '../../screens/dcr/SimmerCampaign';
import { isLandscape } from 'react-native-device-info';
import ModalRoot from '../shared/modals/ModalRoot';
import BasicTable from '../shared/tables/BasicTable';
import Spacer from '../shared/spacers/Spacer';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import { getTransactions } from '../../api/commonRepository';
import moment from 'moment';
import { MyThemeClass } from '../shared/Theme/ThemeDarkLightColor';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import outletViewDao from '../../Database/DAO/outletViewDao';
import BrandsDao from '../../Database/DAO/BrandsDao';

function ModalContent({
  actualBalance,
  unsyncedBalance,
  showModal,
  setShowModal,
  sgpiStockWithDCR,
  sgpiId,
  SgpiAccountId,
  sgpiName,
}) {
  const { mode } = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor();
  const { isMobile } = useSelector(state => state.isLandscape);

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
            testID='closeModal'
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
            <Text style={{ fontWeight: 'bold', fontSize: 14, right: 15 }}>
              {sgpiName}
            </Text>
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

function UnsyncedRenderItem({ item }) {
  const [customerName, setCustomerName] = React.useState('');
  const [outletCode, setOutletCode] = React.useState('');
  const { isMobile } = useSelector(state => state.isLandscape);

  React.useEffect(() => {
    async function temp() {
      let res = await outletViewDao.getOutletNameByOutletOrgId(
        item?.OutletOrgDataId,
      );
      if (res.length > 0) {
        setCustomerName(
          res[0]?.OutlettypeName == 'Doctor'
            ? `Dr. ${res[0]?.OutletContactName}`
            : res[0]?.OutletName,
        );
        setOutletCode(res[0]?.OutletCode);
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
            {item?.DcrDate ? moment(item?.DcrDate).format('DD/MM/YYYY') : '-'}
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

function RenderItem({
  sgpiStockWithDCR,
  objectVal,
  item,
  index,
  getSGPIAccount,
  outletTypeData,
}) {
  const { selectedBalance } = useSelector(state => state.inputInventoryReducer);
  const { isMobile } = useSelector(state => state.isLandscape);

  const selectedBalanceKeys = Object.keys(selectedBalance);
  const [showModal, setShowModal] = useState(false);
  const [transaction, setTransaction] = useState([]);
  const [showTransaction, setShowTransaction] = useState(false);
  const [sgpiName, setSgpiName] = useState('');
  const [sgpiId, setSgpiId] = useState('');
  const [customerTypeName, setCustomerTypeName] = React.useState('-');
  const [brandName, setBrandname] = React.useState('-');

  const [value, setValue] = React.useState('0');
  // console.log("itemitem", item)
  const handleOnChecked = () => {
    if (selectedBalanceKeys.includes(item.Uniquecode)) {
      setValue('0');
      store.dispatch({ type: 'REMOVE_SELECTED_DATA', payload: item.Uniquecode });
    } else {
      setValue('0');
      store.dispatch({
        type: 'SET_SELECTED_DATA',
        payload: [item.Uniquecode, item],
      });
    }
  };

  const handleTextInput = txt => {
    setValue(txt);
    let obj = {
      Balance: selectedBalance[item.Uniquecode]?.Balance,
      EmployeeId: selectedBalance[item.Uniquecode]?.EmployeeId,
      SgpiAccountId: selectedBalance[item.Uniquecode]?.SgpiAccountId,
      SgpiId: selectedBalance[item.Uniquecode]?.SgpiId,
      SgpiMedia: selectedBalance[item.Uniquecode]?.SgpiMedia,
      SgpiName: selectedBalance[item.Uniquecode]?.SgpiName,
      SgpiType: selectedBalance[item.Uniquecode]?.SgpiType,
      Uniquecode: selectedBalance[item.Uniquecode]?.Uniquecode,
      UseEndDate: selectedBalance[item.Uniquecode]?.UseEndDate,
      UseStartDate: selectedBalance[item.Uniquecode]?.UseStartDate,
      qty: txt,
    };
    store.dispatch({
      type: 'SET_SELECTED_DATA',
      payload: [item.Uniquecode, obj],
    });
  };

  const openTransactions = async item => {
    const data = await getTransactions(item);
    if (data) {
      // console.log('datadtadadta', data);
      setSgpiName(data[0]?.SgpiName);
      setSgpiId(data[0]?.SgpiId);
      setBrandname(data[0]?.BrandName)
      let dt = data?.reduce((arr, item) => {
        arr.push([
          moment(item.CreatedTa).format('DD/MM/YY'),
          item.Debits || '-',
          item.Credits || '-',
          item.OutletName || '-',
          item.OutletCode || '-',
          item.OutlettypeName || '-',
          item.BeatName || '-',
          item?.DcrDate ? moment(item.DcrDate).format('DD/MM/YY') : '-',
          item.Remark || '-',
        ]);
        return arr;
      }, []);
      setTransaction(dt);
      setShowTransaction(true);
    }
  };

  const getStatus = item => {
    const start = new Date(item.UseStartDate);
    const end = new Date(item.UseEndDate);
    const givenDate = new Date();
    if (givenDate >= start && givenDate <= end) {
      return 'Active';
    } else {
      return 'Previous';
    }
  };

  React.useEffect(() => {
    async function temp() {
      outletTypeData.map(newItem => {
        if (newItem.OutlettypeId == item.OutlettypeId) {
          setCustomerTypeName(newItem.OutlettypeName);
        }
      });
    }
    temp();
  }, []);


  React.useEffect(() => {
    async function temp() {
      try {
        let res = await BrandsDao.getBrandById(item?.BrandId);
        if (res.length > 0) {
          setBrandname(res[0]?.BrandName);
        }
      } catch (e) {
        console.error('Error while getting line 391 -->', e);
      }
    }
    temp();
  }, []);

  return (
    <ScrollView style={{}} nestedScrollEnabled>
      <View
        style={{
          flexDirection: 'row',
          alignSelf: 'center',
          marginBottom: 5,
          borderTopWidth: 0.8,
          borderColor: Colors.borderColor1,
          alignItems: 'center',
          minHeight: 35,
        }}>
        {/* <View style={styles.container}>
                      <Text style={{ ...styles.headText1, fontSize: isLandscape ? 11 : 12, width: '80%' }}>
                          {getSGPIAccount?.AccountName}
                      </Text>
                  </View> */}
        <View style={{ ...styles.container }}>
          {item?.SgpiType != null ? (
            <Text style={{ ...styles.headText, fontSize: isLandscape ? 11 : 12 }}>
              {item.SgpiType}
            </Text>
          ) : (
            <></>
          )}
        </View>
        <View style={{ ...styles.container, flex: 2 }}>
          {item?.SgpiName != null ? (
            <Text style={{ ...styles.headText, fontSize: isLandscape ? 11 : 12 }}>
              {item.SgpiName}
            </Text>
          ) : (
            <></>
          )}
        </View>
        <View style={{ ...styles.container }}>
          {item?.UseStartDate != null ? (
            <Text style={{ ...styles.headText, fontSize: isLandscape ? 11 : 12 }}>
              {moment(item?.UseStartDate).format('DD/MM/YYYY')}
            </Text>
          ) : (
            <></>
          )}
        </View>
        <View style={{ ...styles.container }}>
          {item?.UseEndDate != null ? (
            <Text style={{ ...styles.headText, fontSize: isLandscape ? 11 : 12 }}>
              {moment(item?.UseEndDate).format('DD/MM/YYYY')}
            </Text>
          ) : (
            <></>
          )}
        </View>

        <TouchableOpacity
          testID='openTransac'
          onPress={() => openTransactions(item)}
          style={{ ...styles.container, width: '100%', height: '100%' }}>
          {item?.Balance != null ? (
            <Text
              style={{
                ...styles.headText,
                fontSize: isLandscape ? 11 : 12,
                color: 'blue',
              }}>
              {item?.Balance}
            </Text>
          ) : (
            <></>
          )}
        </TouchableOpacity>
        <View style={{ ...styles.container }}>
          {item?.Credits != null ? (
            <Text style={{ ...styles.headText, fontSize: isLandscape ? 11 : 12 }}>
              {item?.Credits}
            </Text>
          ) : (
            <></>
          )}
        </View>
        <View style={{ ...styles.container }}>
          {item?.Debits != null ? (
            <Text style={{ ...styles.headText, fontSize: isLandscape ? 11 : 12 }}>
              {item?.Debits}
            </Text>
          ) : (
            <></>
          )}
        </View>

        {/* <View style={{ ...styles.container }}>
                      {item?.IsStrategic != null ? (
                      <Text style={{ ...styles.headText, fontSize: isLandscape ? 11 : 12 }}
                      >{item?.IsStrategic}</Text>
                      ) : (<></>)}
  
                  </View> */}
        <View style={{ ...styles.container }}>
          <Text
            style={{
              ...styles.headText,
              fontSize: isLandscape ? 11 : 12,
              color: getStatus(item) == 'Active' ? Colors.MRGREEN : 'tomato',
            }}>
            {getStatus(item)}
          </Text>
        </View>

        <TouchableOpacity
          testID='showModal'
          onPress={() => setShowModal(true)}
          style={{ ...styles.container }}>
          <Text
            style={{
              ...styles.headText,
              color: 'red',
              fontSize: FontSize.labelText3,
            }}>
            {objectVal[item.SgpiId] || '-'}
          </Text>
        </TouchableOpacity>

        <View style={{ ...styles.container }}>
          <Text style={{ ...styles.headText, fontSize: isLandscape ? 11 : 12 }}>
            {customerTypeName}
          </Text>
        </View>

        <View style={{ ...styles.container }}>
          {item?.IsStrategic != null ? (
            <Text style={{ ...styles.headText, fontSize: isLandscape ? 11 : 12 }}>
              {item?.IsStrategic?.toString()}
            </Text>
          ) : (
            <></>
          )}
        </View>

        <View style={{ ...styles.container }}>
          <Text style={{ ...styles.headText, fontSize: isLandscape ? 11 : 12 }}>
            {brandName}
          </Text>
        </View>

        {/* objectVal */}
      </View>
      <ModalRoot
        showModal={showTransaction}
        height={'70%'}
        width={isMobile ? '95%' : '80%'}
        content={
          <View style={{ width: '100%', position: 'relative' }}>
            <View
              style={{
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
              }}>
              <Text
                style={{
                  fontFamily: FontFamily.PopinsMedium,
                  fontSize: FontSize.labelText4,
                }}>
                Transactions
              </Text>
            </View>
            <View style={{ width: '100%' }}>
              <Text
                style={{
                  fontFamily: FontFamily.PopinsMedium,
                  fontSize: FontSize.labelText3,
                }}>
                Sgpi ID : {sgpiId}
              </Text>
              <Text
                style={{
                  fontFamily: FontFamily.PopinsMedium,
                  fontSize: FontSize.labelText3,
                }}>
                Brand : {brandName}
              </Text>
              <Text
                style={{
                  fontFamily: FontFamily.PopinsMedium,
                  fontSize: FontSize.labelText3,
                }}>
                Sgpi Name : {sgpiName}
              </Text>
              <TouchableOpacity
                testID='showTransaction'
                style={{ top: -20, right: 0, position: 'absolute' }}
                onPress={() => setShowTransaction(false)}>
                <FAIcon name="close" size={30} />
              </TouchableOpacity>
            </View>

            <View>
              <Spacer />
              <ScrollView
                horizontal
                style={{}}
                contentContainerStyle={{ width: isMobile ? 600 : '100%' }}>
                <BasicTable
                  HT={300}
                  RowBorderWidth={0.5}
                  RowBorderColor={Colors.borderColor}
                  tableHead={[
                    'Transaction date',
                    'Debited',
                    'Credited',
                    'Customer',
                    'Customer Code',
                    'Customer Type',
                    'Beat Name',
                    'Dcr Date',
                    'Remark',
                  ]}
                  tableData={transaction}
                />
              </ScrollView>
            </View>
          </View>
        }
        setShowModal={setShowTransaction}
      />

      <ModalRoot
        width={'90%'}
        padding={5}
        height="70%"
        showModal={showModal}
        setShowModal={setShowModal}
        content={
          <ModalContent
            actualBalance={item?.Balance}
            unsyncedBalance={objectVal[`${item?.SgpiId}`]}
            setShowModal={setShowModal}
            showModal={showModal}
            sgpiStockWithDCR={sgpiStockWithDCR}
            sgpiId={item?.SgpiId}
            sgpiName={item?.SgpiName}
            SgpiAccountId={item?.SgpiAccountId}
          />
        }
      />
    </ScrollView>
  );
}

const MRInventoryTable = props => {
  const dispatch = useDispatch();
  const { selectedBalance } = useSelector(state => state.inputInventoryReducer);
  const selectedBalanceKeys = Object.keys(selectedBalance);
  const [checked, setChecked] = React.useState(false);
  // const [transaction, setTransaction] = useState([]);
  // const [showTransaction, setShowTransaction] = useState(false);
  // const [showModal, setShowModal] = useState(false);

  const handleCheckedAll = () => {
    setChecked(true);
    props.data.map(item => {
      store.dispatch({
        type: 'SET_SELECTED_DATA',
        payload: [item.Uniquecode, item],
      });
    });
  };
  const handleRemoveAll = () => {
    setChecked(false);
    store.dispatch({ type: 'REMOVE_ALL_SELECTED_DATA' });
  };

  // const openTransactions = async (item) => {
  //     const data = await getTransactions(item);
  //     if (data) {
  //         console.log(data)
  //         let dt = data?.reduce((arr, item) => {
  //             arr.push([moment(item.CreatedTa).format('DD/MM/YYYY'), item.Debits || '-', item.Credits || '-', item.OutletName || '-', item.OutlettypeName || '-', item.BeatName || '-', item.DcrDate || '-', item.Remark || '-'])
  //             return arr
  //         }, [])
  //         setTransaction(dt)
  //         setShowTransaction(true)
  //     }

  // }

  return (
    <>
      <View
        style={{
          borderWidth: 1,
          borderRadius: 10,
          overflow: 'hidden',
          borderColor: Colors.borderColor1,
          backgroundColor: 'white',
          height: '87%',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'center',
            backgroundColor: '#e9f6fa',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            height: 30,
            alignItems: 'center',
            // justifyContent:'center'
          }}>
          {/* <View style={styles.container}>
                          <Text style={styles.headText1}>User</Text>
                      </View> */}
          <View style={styles.container}>
            <Text style={styles.headText}>Type</Text>
          </View>
          <View style={{ ...styles.container, flex: 2 }}>
            <Text style={styles.headText}>Name</Text>
          </View>
          <View style={styles.container}>
            <Text style={styles.headText}>Start Date</Text>
          </View>
          <View style={{ ...styles.container }}>
            <Text style={styles.headText}>End Date</Text>
          </View>
          <View style={styles.container}>
            <Text style={styles.headText}>Current Stock</Text>
          </View>
          <View style={styles.container}>
            <Text style={styles.headText}>Credited</Text>
          </View>
          <View style={styles.container}>
            <Text style={styles.headText}>Debited</Text>
          </View>
          <View style={styles.container}>
            <Text style={styles.headText}>Status</Text>
          </View>
          <View style={{ ...styles.container }}>
            <Text style={styles.headText}>Draft</Text>
          </View>
          <View style={{ ...styles.container }}>
            <Text style={styles.headText}>Customer Type</Text>
          </View>
          <View style={{ ...styles.container }}>
            <Text style={styles.headText}>Strategic SGPI</Text>
          </View>

          <View style={{ ...styles.container }}>
            <Text style={styles.headText}>Brand</Text>
          </View>
        </View>
        {props.simmerEffectTable ? (
          <SimmerCampaign />
        ) : (
          <>
            <FlatList
              data={props.data}
              renderItem={({ item, index }) => (
                <RenderItem
                  sgpiStockWithDCR={props.sgpiStockWithDCR}
                  objectVal={props.objectVal}
                  item={item}
                  index={index}
                  getSGPIAccount={props.getSGPIAccount}
                  outletTypeData={props.outletTypeData}
                />
              )}
              ListFooterComponent={<View style={{ paddingVertical: 10 }}></View>}
            />
          </>
        )}
      </View>
    </>
  );
};

export default MRInventoryTable;
MRInventoryTable.defaultProps = {
  outlets: [],
  noDataMessage: '',
};

const styles = StyleSheet.create({
  headText: {
    fontFamily: FontFamily.TTCommonsMedium,
    fontSize: FontSize.labelText,
    color: 'black',
  },
  headText1: {
    fontFamily: FontFamily.TTCommonsMedium,
    fontSize: FontSize.small,
    color: 'black',
    textAlign: 'center',
    height: 30,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});