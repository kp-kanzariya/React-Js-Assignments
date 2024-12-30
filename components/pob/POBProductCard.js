import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Colors } from '../../assets/config/Colors';
import { FontFamily } from '../../assets/fonts/FontFamily';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import NumericInput from 'react-native-numeric-input';
import { Image } from 'react-native';
import { database } from '../../Database';
import { Q } from '@nozbe/watermelondb';
import { store } from '../../redux/store';
import { SERVER_URL } from '../../api/commonRepository';
import { AlertWarning } from '../shared/alerts/Alert';
import { useKeyboardVisible } from '../../hooks/useKeyboardVisible';
import { appendTextToFile } from '../../helper/utils/Logger';
import OutletStockDao from '../../Database/DAO/OutletStockDao';
import IonIcon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import ButtonRoot from '../shared/buttons/ButtonRoot';

const pricebook = database.collections.get('Pricebooklines');

const POBProducCard = ({
  item,
  getMapping,
  refresh,
  setRefresh,
  secondaryOutlet,
  primaryOutlet
}) => {
  const { OutletCart } = useSelector(state => state.POB);
  const { configuration } = useSelector(state => state.systemConfig);
  const [sellingPrice, setSellingPrice] = React.useState('');
  const [maxRetailPrice, setMaxRetailPrice] = React.useState('');
  const [qty, setQty] = React.useState(0);
  const [image_url, set_image_url] = React.useState(null);
  const [closingStockAndUpdateAtObj, setClosingStockAndUpdateAtObj] = React.useState({})


  const fetchClosingStock = async (outletId, productId) => {
    try {
      let data = await OutletStockDao.getCurrenrStockByProductId(productId, outletId)
      setClosingStockAndUpdateAtObj(data)
    } catch (error) {
      console.log('errorrrrr___fetchClosingStock____', error)

    }
  }
  useEffect(() => {
    fetchClosingStock(primaryOutlet?.OutletOrgId, item?.Products_Id)
  }, [])

  // console.log('closingStockAndUpdateAtObjwwww', closingStockAndUpdateAtObj)

  React.useEffect(() => {
    try {
      const keyExist = OutletCart.hasOwnProperty(item.Products_Id);
      if (keyExist) {
        setQty(OutletCart[item.Products_Id].quantity);
      }
    } catch (e) {
      setQty(0);
    }
  }, []);

  const getPricebook = async () => {
    try {
      let price = await pricebook.query(
        Q.where('PricebookId', getMapping.PricebookId),
        Q.and(Q.where('ProductId', item.Products_Id)),
      );
      setMaxRetailPrice(price[0].MaxRetailPrice);
      setSellingPrice(price[0].SellingPrice);
    } catch (e) {
      appendTextToFile({
        text: `Error in catch fun getPricebook inside POBProductsCard Line 125 ${e}`,
        headerDate: store?.getState().header.headerDate
      });
      console.error('Error in POBProductsCard Line 27--->', e);
    }
  };

  React.useEffect(() => {
    getPricebook();
  }, []);

  const handleAddToCart = (value, item1) => {
    if (value > 0) {
      setQty(value);
      item1['quantity'] = value;
      item1['sellingPrice'] = sellingPrice;
      item1['maxRetailPrice'] = maxRetailPrice;
      item1['TotalPtr'] = parseFloat(sellingPrice * value).toFixed(2);
      item1['subTotal'] = maxRetailPrice * value;
      item1['ptrMargin'] = (maxRetailPrice - sellingPrice) * value;
      store.dispatch({
        type: 'ADD_OUTLET_CART',
        payload: [item1.Products_Id, item1],
      });
      setRefresh(!refresh);
    } else {
      setQty(value);
      store.dispatch({ type: 'REMOVE_OUTLET_CART', payload: item1.Products_Id });
      setRefresh(!refresh);
    }
    // setRefresh1(!refresh1);
  };
  // console.log('item--->>>>>70', item);

  // var image_id = item.ProductImages.split(',')
  // console.log('image---->>>>>>>', image_id[0])

  React.useEffect(() => {
    async function getServerURL() {
      try {
        let s_u = await SERVER_URL();
        if (item?.ProductImages == '' || item?.ProductImages == null) {
          set_image_url(null);
        } else {
          set_image_url({ uri: `${s_u}media?id=${item?.ProductImages.split(',')[0]}` });
        }
      } catch (e) {
        set_image_url(null);
      }
    }
    getServerURL();
  }, []);

  // console.log("closingStockAndUpdateAtObj",closingStockAndUpdateAtObj?.LastSync);
  const handleAdd = (item1) => {
    setQty(1);
      item1['quantity'] = 1;
      item1['sellingPrice'] = sellingPrice;
      item1['maxRetailPrice'] = maxRetailPrice;
      item1['TotalPtr'] = parseFloat(sellingPrice * 1).toFixed(2);
      item1['subTotal'] = maxRetailPrice * 1;
      item1['ptrMargin'] = (maxRetailPrice - sellingPrice) * 1;
      store.dispatch({
        type: 'ADD_OUTLET_CART',
        payload: [item1.Products_Id, item1],
      });
      setRefresh(!refresh);
  }

  return (
    <View
      style={{
        ...styles.mainContainer,
        // backgroundColor:'red',
        overflow: 'hidden'
      }}>
      <View style={{ width: '100%' }}>
        <View style={{ flexDirection: 'row' }}>
          <View
            style={{
              ...styles.imageCss,

            }}>
            {image_url != null ? (
              <Image
                source={image_url}
                style={{ width: '100%', height: '100%', borderRadius: 5 }}
                resizeMode="contain"
                onError={() => set_image_url(require('../../assets/alembicimages/noimagenew.png'))}
              />) :
              (<Image
                source={require('../../assets/alembicimages/noimagenew.png')}
                style={{ width: '100%', height: '100%', borderRadius: 5 }}
                resizeMode="contain"
              />)}
          </View>

          <View
            style={{
              // justifyContent: 'space-between',
              width: '75%',
              // backgroundColor: 'red',
              justifyContent: 'center',
              left: 10,
            }}>
            <View>
              <Text
                style={{
                  ...styles.cat_text_Css,
                  flexWrap: 'wrap',
                  width: '75%'
                }}>
                {item?.ProductName}
              </Text>
            </View>
            <View style={{ marginVertical: 3 }} />
            <View style={{ flexDirection: 'row' }}>
              <Text
                style={{ fontFamily: FontFamily.TTCommonsMedium, fontSize: 12, color: Colors.gray }}>
                WBR: <FAIcon name="rupee" size={10} /> {sellingPrice}
              </Text>
              <Text
                style={{
                  fontFamily: FontFamily.TTCommonsMedium,
                  fontSize: 12,
                  left: 20,
                  color: Colors.gray
                }}>
                MRP: <FAIcon name="rupee" size={10} /> {maxRetailPrice}
              </Text>
            </View>
          </View>

          <View
            style={
              {
                // ...styles.Available_ViewCss,
                flex: 1
              }
            }>
            {qty>0 && sellingPrice != null &&
              maxRetailPrice != null &&
              maxRetailPrice != '' &&
              sellingPrice != null && (
                <View
                  style={{
                    alignSelf: 'flex-end',
                    position: 'absolute',
                    top: 12,
                  }}>
                  <NumericInput
                    // ref={inputRef}
                    // onKeyboard
                    testID='POB:incrDcrQty'
                    rounded
                    valueType='integer'
                    minValue={0}
                    totalWidth={80}
                    maxValue={9999}
                    // onLimitReached={(isMax, msg) => AlertWarning("Max Limit is 9999")}
                    // totalHeight={25}
                    value={qty}
                    textColor="#0b142b"
                    borderColor="#fff"
                    iconStyle={{ color: Colors.gray }}
                    onChange={value => handleAddToCart(value, item)}

                  />
                </View>
              )}
            {qty<=0 &&sellingPrice != null &&
              maxRetailPrice != null &&
              maxRetailPrice != '' &&
              sellingPrice != null && <View
              style={{
                alignSelf: 'flex-end',
                position: 'absolute',
                top: 12,
                right: 5
              }}>
              <ButtonRoot
                testID='Add-cart'
                width={50}
                color={Colors.deepskyblue}
                height={25}
                borderRadius={50}
                title='Add'
                // icon="shopping-cart"
                onPress={() => handleAdd(item)}
              />
            </View>}




          </View>
        </View>
      </View>
      {configuration?.['capture_closing_stock'] && <View style={{ flexDirection: 'row', backgroundColor: '#def2d4', height: 28, alignItems: 'center' }}>
        <View style={{ marginLeft: 20 }} >
          <IonIcon color={'green'} name='layers' />
        </View>
        <Text style={{ fontFamily: FontFamily.TTCommonsMedium, color: 'black', marginLeft: 5 }} >{`${closingStockAndUpdateAtObj?.closingQty} Qty ( ${item?.PackingDesc} )  as of ${closingStockAndUpdateAtObj?.LastSync ? moment(closingStockAndUpdateAtObj?.LastSync).format('DD MMM YYYY') : moment().format('DD MMM 0YY')}`}</Text>
      </View>}
    </View>
  );
};

export default POBProducCard;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'white',
    // paddingTop: 10,
    // paddingLeft:10,
    // paddingRight:10,
    borderWidth: 1,
    borderColor: Colors.borderColor1,
    borderRadius: 12,
    width: '100%',
    // margin:4
  },
  imageCss: {
    width: 55,
    height: 55,
    borderRadius: 50,
    borderWidth: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cat_text_Css: {
    fontFamily: FontFamily.TTCommonsDemiBold,
    color: 'black',
    fontSize: 14,
  },
  MRP_Text_Css: {
    marginLeft: 50,
    fontFamily: FontFamily.TTCommonsMedium,
    fontSize: 10,
  },
  ViewCss: {
    width: '96%',
    marginVertical: 12,
    borderBottomWidth: 0.5,
    alignSelf: 'center',
    borderColor: Colors.borderColor1,
  },
  Available_ViewCss: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // width: '94%',
    alignSelf: 'center',
  },
  AvailableTextCss: {
    fontFamily: FontFamily.TTCommonsMedium,
    fontSize: 10,
  },
  text12345_Css: {
    fontFamily: FontFamily.TTCommonsMedium,
    color: 'black',
    fontSize: 10,
  },
});
