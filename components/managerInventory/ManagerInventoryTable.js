import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { Checkbox } from 'react-native-paper';
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
import BrandsDao from '../../Database/DAO/BrandsDao';

function RenderItem({ isMobile, item, getSGPIAccount, outletTypeData }) {
  const { selectedBalance } = useSelector(state => state.inputInventoryReducer);

  const selectedBalanceKeys = Object.keys(selectedBalance);
  const [value, setValue] = React.useState('0');
  const [transaction, setTransaction] = useState([]);
  const [showTransaction, setShowTransaction] = useState(false);
  const [sgpiId, setSgpiId] = useState('');
  const [sgpiName, setSgpiName] = useState('');
  const [customerTypeName, setCustomerTypeName] = React.useState('-');
  const [brandName, setBrandname] = React.useState('-');

  // console.log("itemitem",item)
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
      // console.log(data);
      setSgpiName(data[0]?.SgpiName);
      setSgpiId(data[0]?.SgpiId);
      let dt = data?.reduce((arr, item) => {
        arr.push([
          moment(item.CreatedTa).format('DD/MM/YY'),
          item.Debits || '-',
          item.Credits || '-',
          item.OutletName || '-',
          item.OutletCode || '-',
          item.OutlettypeName || '-',
          item.BeatName || '-',
          item.DcrDate ? moment(item.DcrDate).format('DD/MM/YY') : '-',
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
        setBrandname(res[0]?.BrandName);
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
          minHeight:35
        }}>
        <View style={{}}>
          <Checkbox.Android
            color="#34acd3"
            status={
              selectedBalanceKeys.includes(item.Uniquecode)
                ? 'checked'
                : 'unchecked'
            }
            onPress={() => handleOnChecked()}
          />
        </View>

        <View style={styles.container}>
          <Text
            style={{
              ...styles.headText1,
              fontSize: isLandscape ? 11 : 12,
              width: '80%',
            }}>
            {getSGPIAccount?.AccountName}
          </Text>
        </View>
        <View style={{ ...styles.container }}>
          {item?.SgpiType != null ? (
            <Text
              style={{ ...styles.headText1, fontSize: isLandscape ? 11 : 12 }}>
              {item.SgpiType}
            </Text>
          ) : (
            <></>
          )}
        </View>
        <View style={{ ...styles.container, flex: 2 }}>
          {item?.SgpiName != null ? (
            <Text
              style={{ ...styles.headText1, fontSize: isLandscape ? 11 : 12 }}>
              {item.SgpiName}
            </Text>
          ) : (
            <></>
          )}
        </View>
        <View style={{ ...styles.container }}>
          {item?.UseStartDate != null ? (
            <Text
              style={{
                ...styles.headText1,
                fontSize: isLandscape ? 11 : 12,
                width: '80%',
              }}>
              {moment(item?.UseStartDate)?.format('DD/MM/YYYY')}
            </Text>
          ) : (
            <></>
          )}
        </View>
        <View style={{ ...styles.container }}>
          {item?.UseEndDate != null ? (
            <Text
              style={{
                ...styles.headText1,
                fontSize: isLandscape ? 11 : 12,
                width: '80%',
              }}>
              {moment(item?.UseEndDate)?.format('DD/MM/YYYY')}
            </Text>
          ) : (
            <></>
          )}
        </View>

        <TouchableOpacity
          testID='openTransactions'
          onPress={() => openTransactions(item)}
          style={{ ...styles.container, width: '100%', height: '100%' }}>
          {item?.Balance != null ? (
            <Text
              style={{
                ...styles.headText1,
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
            <Text
              style={{ ...styles.headText1, fontSize: isLandscape ? 11 : 12 }}>
              {item?.Credits}
            </Text>
          ) : (
            <></>
          )}
        </View>
        <View style={{ ...styles.container }}>
          {item?.Debits != null ? (
            <Text
              style={{ ...styles.headText1, fontSize: isLandscape ? 11 : 12 }}>
              {item?.Debits}
            </Text>
          ) : (
            <></>
          )}
        </View>
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
          <Text style={{ ...styles.headText, fontSize: isLandscape ? 11 : 12, left: isMobile ? -10 : 0 }}>
            {brandName}
          </Text>
        </View>

        <View style={{ ...styles.container, zIndex: -1, right: 10 }}>
          <TextInput
            testID={`SGPI-${item.Uniquecode}`}
            editable={
              selectedBalanceKeys.includes(item.Uniquecode) ? true : false
            }
            style={
              selectedBalanceKeys.includes(item.Uniquecode)
                ? {
                  width: 55,
                  height: 35,
                  zIndex: 1,
                  top: 3,
                  fontSize: 12,
                  borderWidth: 1,
                  borderColor:
                    selectedBalance[item.Uniquecode].qty > 0 &&
                      selectedBalance[item.Uniquecode].qty <= item?.Balance
                      ? Colors.borderColor1
                      : 'red',
                  borderRadius: 15,
                  textAlign: 'center',
                }
                : {
                  width: 55,
                  height: 35,
                  zIndex: 1,
                  top: 3,
                  fontSize: 12,
                  borderWidth: 1,
                  borderColor: Colors.borderColor1,
                  borderRadius: 15,
                  textAlign: 'center',
                }
            }
            keyboardType="numeric"
            onChangeText={txt => {
              let temp = '';
              temp = txt.replace(/[^0-9]/g, '');
              if (temp.length === 0) {
                handleTextInput('');
              } else {
                handleTextInput(temp);
              }
            }}
            value={value}
          />
        </View>
      </View>
      <ModalRoot
        testID='showTransactionsModal'
        showModal={showTransaction}
        height={'70%'}
        width={isMobile ? '95%' : '80%'}
        content={
          <View style={{ width: '100%' }}>
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
                testID='closeTransactions'
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
    </ScrollView>
  );
}

const ManagerInventoryTable = props => {
  const dispatch = useDispatch();
  const { selectedBalance } = useSelector(state => state.inputInventoryReducer);
  const selectedBalanceKeys = Object.keys(selectedBalance);
  const [checked, setChecked] = React.useState(false);
  const { isMobile } = useSelector(state => state.isLandscape);

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

  return (
    <>
      <View
        style={{
          borderWidth: 1,
          borderRadius: 10,
          overflow: 'hidden',
          borderColor: Colors.borderColor1,
          backgroundColor: 'white',
          height: 'auto',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'center',
            backgroundColor: '#e9f6fa',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            // height: 40,
            alignItems: 'center',
          }}>
          <View style={{}}>
            <Text>
              <Checkbox.Android
                color="#34acd3"
                status={checked ? 'checked' : 'unchecked'}
                onPress={() => {
                  checked ? handleRemoveAll() : handleCheckedAll();
                }}
              />
            </Text>
          </View>
          <View style={styles.container}>
            <Text style={styles.headText1}>User</Text>
          </View>
          <View style={styles.container}>
            <Text style={styles.headText1}>Type</Text>
          </View>
          <View style={{ ...styles.container, flex: 2 }}>
            <Text style={styles.headText1}>Name</Text>
          </View>
          <View style={styles.container}>
            <Text style={styles.headText1}>Start Date</Text>
          </View>
          <View style={{ ...styles.container }}>
            <Text style={styles.headText1}>End Date</Text>
          </View>
          <View style={styles.container}>
            <Text style={styles.headText1}>Current Stock</Text>
          </View>
          <View style={styles.container}>
            <Text style={styles.headText1}>Credited</Text>
          </View>
          <View style={styles.container}>
            <Text style={styles.headText1}>Debited</Text>
          </View>
          <View style={{ ...styles.container }}>
            <Text style={styles.headText}>Status</Text>
          </View>

          <View style={{ ...styles.container }}>
            <Text style={{ ...styles.headText }}>Customer</Text>
            <Text style={{ ...styles.headText, textAlign: 'left' }}>Type</Text>
          </View>
          <View style={{ ...styles.container }}>
            {/* <Text style={styles.headText}>Strategic SGPI</Text> */}
            <Text style={{ ...styles.headText }}>Strategic</Text>
            <Text style={{ ...styles.headText, textAlign: 'left' }}>SGPI</Text>
          </View>

          <View style={{ ...styles.container }}>
            <Text style={styles.headText}>Brand</Text>
          </View>

          <View style={{ ...styles.container }}>
            <Text style={styles.headText}>Action</Text>
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
                  isMobile={isMobile}
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

export default ManagerInventoryTable;
ManagerInventoryTable.defaultProps = {
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
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
  },
});