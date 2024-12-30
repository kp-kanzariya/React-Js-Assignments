import { useNavigation } from "@react-navigation/native";
import React from "react";
import { FlatList, View, TouchableOpacity, Text } from "react-native";
import { useSelector } from "react-redux";
import { MyThemeClass } from "../Theme/ThemeDarkLightColor";
import styles from '../../../assets/css/styleProducts'

// Customer_List END
function SearchProductList({ item, themecolor, permission }) {

  const navigation = useNavigation();

  const generateColor = () => {
    const randomColor = Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, '0');
    return `#${randomColor}`;
  };

  let avatarName = '';
  // permission[item?.OutlettypeId]?.includes(
  //     'can_show_top_on_outlet_name',
  //   )
  //     ? item?.OutletName
  //     : item?.OutletContactName,

  if (permission[item?.OutlettypeId]?.includes('can_show_top_on_outlet_name')) {
    avatarName = `${item?.OutletName[0].toUpperCase()}`;
  } else {
    avatarName = `${item?.OutletContactName[0].toUpperCase()}`;
  }



  const handleClickOnOutlet = async (item) => {
    navigation.push('DoctorView', {
      item: item,
      headingName: permission[item?.OutlettypeId]?.includes(
        'can_show_top_on_outlet_name',
      )
        ? item?.OutletName
        : item?.OutletContactName,
      outletId: item?.Outlet_Id,
      outletOrgId: item?.OutletOrgId,
      outletTypeId: item?.OutlettypeId,
      navigateFrom: 'Search',
    });
  }

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => handleClickOnOutlet(item)}
        style={{ borderColor: themecolor.BOXBORDERCOLOR1, width: '100%', justifyContent: 'center', alignSelf: 'center', }}>
        <View
          style={{ ...styles.SearchSecondView, backgroundColor: themecolor.BOXTHEMECOLOR, justifyContent: 'flex-start', borderRadius: 10, }}>

          {/* New Start */}
          <View style={{ paddingHorizontal: 10 }}>
            <View
              style={{
                backgroundColor: generateColor(),
                ...styles.CircleNewColor
              }}>
              <Text
                style={{ ...styles.CircleNewColorText, color: themecolor.TXTWHITE }}>
                {avatarName}
              </Text>
            </View>
          </View>
          {/* New End */}

          <View style={{ justifyContent: 'center', }}>
            <Text
              style={{ ...styles.ProductName, color: themecolor.TXTWHITE }}>
              {item?.OutletName}
            </Text>
            <Text
              style={{ ...styles.MRPText, color: themecolor.TXTWHITE }}>
              {item?.OutletContactName}
            </Text>
            <Text
              style={{ ...styles.MRPText, color: themecolor.TXTWHITE }}>
              {item?.OutletContactNo}
            </Text>

          </View>
        </View>
      </TouchableOpacity>
      <View style={{ marginVertical: 1 }} />
    </>
  );
}

function SearchingFLList(props) {
  const { mode } = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor()
  const { permission } = useSelector(state => state.roles);
  const { isLandscape, isMobile } = useSelector(state => state.isLandscape);
  return (
    <View
      style={{
        width: '100%',
        justifyContent: 'center',
        alignSelf: 'center',
      }}>
      <FlatList
        key={isLandscape ? 2 : 1}
        numColumns={isLandscape ? 2 : 1}
        data={props.searchedData}
        renderItem={({ item }) =>
          <>
            <View style={{ width: isLandscape ? '49.5%' : '99%', margin: 3 }}>
              <SearchProductList item={item} themecolor={themecolor}
                permission={permission}
              />
            </View>
          </>
        }
        showsVerticalScrollIndicator={false}
        scrollEnabled={true}
      />
    </View>
  );
}

export { SearchingFLList }