import { FlatList, StyleSheet, Text, View, KeyboardAvoidingView, } from 'react-native';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import POBProductList from './POBProductCard';
import ButtonRoot from '../shared/buttons/ButtonRoot';
import { Colors } from '../../assets/config/Colors';
import { getMappingByPrimaryOrSecondaryOutlet } from '../../Database/Helpers/PobHelper';
import { FontSize } from '../../assets/fonts/Fonts';
import { FontFamily } from '../../assets/fonts/FontFamily';
import { AlertWarning } from '../shared/alerts/Alert';
import { appendTextToFile } from '../../helper/utils/Logger';
import { store } from '../../redux/store';


export default function POBProductsList(props) {
  const navigation = useNavigation();
  const { isLandscape } = useSelector(state => state.isLandscape);
  const { primaryOutlet, secondaryOutlet, OutletCart } = useSelector(state => state.POB);
  let CartValue = Object.values(OutletCart);
  const [getMapping, setMapping] = React.useState({});
  const [refresh, setRefresh] = React.useState(false);
  const [Total, setTotal] = useState('');
  const [Quantity, setQuantity] = useState('');
  const [ptrMargin, setPTRMargin] = useState('');
  const [subTotal, setSubTotal] = useState('');


  const fetchMapping = async () => {
    try {
      let mapping = await getMappingByPrimaryOrSecondaryOutlet({ primary_outlet_id: primaryOutlet.Outlet_Id, secondary_outlet_id: secondaryOutlet.Outlet_Id });
      setMapping(mapping[0]);
    } catch (e) {
      console.error("Error in POBProductsList Line 72-->", e);
      appendTextToFile({
        text: `Error in catch fun fetchMapping inside POBProductsList Line 78 ${e}`,
        headerDate: store?.getState().header.headerDate
      });
    }
  }

  React.useEffect(() => {
    fetchMapping()
  }, [])


  React.useEffect(() => {
    let total = 0;
    let quantity = 0;
    let ptrmargin = 0;
    let subtotal = 0;
    CartValue.forEach(item => {
      total = parseFloat(total) + parseFloat(item.TotalPtr);
      quantity += item.quantity;
      ptrmargin = (parseFloat(ptrmargin) + parseFloat(item.ptrMargin)).toFixed(2);
      subtotal += item.subTotal;
    });
    setTotal(total);
    setQuantity(quantity);
    setPTRMargin(ptrmargin);
    setSubTotal(subtotal);
    if (quantity == 0) {
      setQuantity(null);
    }
  }, [refresh]);


  const handleClickOnCart = async () => {
    if (Quantity == null) {
      AlertWarning("Please Add product");
    } else {
      navigation.navigate('POBOverview', {
        Total: Total,
        ptrMargin: ptrMargin,
        subTotal: subTotal
      });
    }
  }

  let badgeWidth = 22;
  if (Quantity > 10 && Quantity < 100) {
    badgeWidth = 22
  }
  else if (Quantity >= 100 && Quantity < 1000) {
    badgeWidth = 30
  }
  return (
    <View style={{ ...styles.mainContainer }}>
      <KeyboardAvoidingView
        style={{ flexDirection: 'column', justifyContent: 'center', flex: 1 }}
        behavior={Platform.OS == "ios" ? "padding" : null}
        keyboardVerticalOffset={100}
        enabled>
        {/* <ScrollView contentContainerStyle={{flexGrow:1,flex:1}}> */}
        <FlatList
          data={props.data}
          key={isLandscape ? 2 : 1}
          numColumns={isLandscape ? 2 : 1}
          renderItem={({ item }) => (
            <>

              <View
                style={{
                  ...styles.POBProductList_item,
                }}>
                <POBProductList item={item} secondaryOutlet={secondaryOutlet} primaryOutlet={primaryOutlet} getMapping={getMapping} setRefresh={setRefresh} refresh={refresh} />
              </View>

            </>
          )}
          keyExtractor={(_, index) => index.toString()}
          ListFooterComponent={<View style={{ height: 100 }}></View>}
        />

        {/* </ScrollView> */}
      </KeyboardAvoidingView>

      <View
        style={{
          ...styles.ButtonViewCss,
        }}>
        {Quantity != null && <View style={{
          backgroundColor: 'orange', borderRadius: 25, width:
            badgeWidth, height: badgeWidth, position: 'absolute', top: -5, right: -4, justifyContent: 'center', alignItems: 'center', borderWidth: 0.5, borderColor: Colors.borderColor1
        }} >
          <Text style={{ color: 'white', fontFamily: FontFamily.Popinssemibold, fontSize: FontSize.labelText }} >{Quantity}</Text>
        </View>
        }
        <ButtonRoot
          testID='Order-Cart'
          width={50}
          color={Colors.deepskyblue}
          height={50}
          borderRadius={50}
          icon="shopping-cart"
          onPress={() => handleClickOnCart()}
        />
        <View style={{ marginHorizontal: 3 }} />
        {/* <ButtonRoot
          onPress={() => {
            navigation.navigate('POBOverview');
          }}
          title="Confirm POB"
          width={110}
          color={Colors.deepskyblue}
          borderRadius={14}
          height={35}
        /> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    width: '96%',
    alignSelf: 'center',
    flex: 1,
  },
  POBProductList_item: {
    flex: 1,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ButtonViewCss: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    flexDirection: 'row',
  },
});
