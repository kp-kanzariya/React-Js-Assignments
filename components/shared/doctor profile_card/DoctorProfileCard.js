import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Linking,
} from 'react-native';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { FontFamily } from '../../../assets/fonts/FontFamily';
import { useNavigation } from '@react-navigation/native';
import Simmer_DoctorProfileCard from './Simmer_DoctorProfileCard';
import stylesCard from '../../../assets/css/stylesBeat';
import { ImagesAssets } from '../ImagesAssets';
import { useSelector } from 'react-redux';
import { MyThemeClass } from '../../../components/shared/Theme/ThemeDarkLightColor';
import FIcon5 from 'react-native-vector-icons/FontAwesome5';
import IoIcon from 'react-native-vector-icons/Ionicons';
import TextTicker from 'react-native-text-ticker';
import MCcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors } from '../../../assets/config/Colors';
import moment from 'moment';
import { formatText } from '../../../api/commonRepository';

const DoctorProfileCard = ({ data, outletTypeId }) => {
  const navigation = useNavigation();
  const [show, setShow] = useState(true);
  const { permission } = useSelector(state => state.roles);
  useEffect(() => {
    if (Object?.keys(data)?.length > 0) {
      setShow(false);
    }
  }, [data]);

  // console.log("profile data ", JSON.stringify(data));
  const { isLandscape, isMobile } = useSelector(state => state.isLandscape);
  const { mode } = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor();
  // console.log("Check doctorView roles permissions", permission)

  return (
    <>
      {show ? (
        <Simmer_DoctorProfileCard />
      ) : (
        <>
          <View
            style={{
              ...styles.container,
              flex: 1,
              // justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
              alignSelf: 'center',
              height: isMobile ? null : 155,
            }}>
            <View
              style={{
                // ...styles.img_background,
                // width: '24%',
                left: 2,
              }}>
              {/* <Image
                resizeMode="contain"
                style={{
                  // ...styles.img,
                  width: 120,
                  height: 120,
                }}
                source={ImagesAssets.DoctorImages}
              /> */}

              {permission[outletTypeId]?.includes('profile_card_image') ? (
                <View>
                  <Image
                    resizeMode="contain"
                    style={{
                      width: 125,
                      height: 125,
                      borderRadius: 10,
                    }}
                    source={ImagesAssets.DoctorImages}
                  />
                </View>
              ) : (
                <View>
                  <Image
                    resizeMode="contain"
                    style={{
                      width: 125,
                      height: 125,
                      borderRadius: 10,
                    }}
                    source={ImagesAssets.Stores}
                  />
                </View>
              )}
            </View>
            <View
              style={{
                left: 12,
                width: '60%',
                justifyContent: 'flex-start',
                alignSelf: 'center',
              }}>
              {/* <View > */}
              <View
                style={{
                  width: '100%',
                  justifyContent: 'flex-start',
                  alignSelf: 'flex-start',
                }}>
                <View style={stylesCard.FL1}>
                  {data.OutletName && (
                    <Text
                      style={{
                        ...stylesCard.FLHeadText,
                        fontSize: 16,
                        fontFamily: FontFamily.TTCommonsBold,
                        color: themecolor.TXTWHITE,
                        left: 5,
                        top: 5
                      }}>
                      {permission[outletTypeId]?.includes(
                        'can_show_top_on_outlet_name',
                      )
                        ? data?.OutletName
                        : data?.OutletContactName}
                    </Text>
                  )}
                </View>
              </View>
              <View style={{ marginVertical: 3 }} />
              <View
                style={{
                  // ...stylesCard.FLVIEW,
                  // justifyContent: 'space-between',
                  flexDirection: 'row',
                  // width: isLandscape ? '100%' : '90%',
                }}>
                <View
                  style={{
                    ...stylesCard.FLVIEW2,
                    // width: isLandscape ? '10%' : 'auto',
                    // justifyContent: 'flex-start',
                    // alignSelf: 'flex-start',
                    marginTop: 1,
                    // flex: 1,
                    right: 3,
                    width: '50%',
                  }}>
                  {permission[outletTypeId]?.includes(
                    'can_show_top_on_outlet_name',
                  ) ? (
                    <Text style={{}}>
                      <IoIcon name="person" size={15} color={Colors.MRGREEN} />
                    </Text>
                  ) : (
                    <MCIcon
                      style={{ right: 1 }}
                      name="stethoscope"
                      size={16}
                      color={Colors.MRGREEN}
                    />
                  )}
                  {data?.Classification != null ? (
                    <Text
                      style={{
                        ...stylesCard.MobileText,
                        fontSize: 12,
                        fontFamily: FontFamily.TTCommonsMedium,
                        color: themecolor.TXTWHITE,
                        left: 2,
                      }}>
                      {permission[outletTypeId]?.includes(
                        'can_show_top_on_outlet_name',
                      )
                        ? `${formatText(data.OutletSalutation)} ${data.OutletContactName
                        }`
                        : data?.Classification}
                    </Text>
                  ) : (
                    <Text
                      style={{
                        ...stylesCard.SmallHeading,
                        fontSize: 12,
                        fontFamily: FontFamily.TTCommonsMedium,
                        color: themecolor.TXTWHITE,
                        left: 1,
                      }}>
                      NA
                    </Text>
                  )}
                </View>
                {!permission[outletTypeId]?.includes(
                  'can_show_top_on_outlet_name',
                ) && (
                    <View
                      style={{
                        ...stylesCard.FLVIEW3,
                        // width: 150,
                        // justifyContent: 'flex-start',
                        // alignSelf: 'flex-start',
                        width: isLandscape ? '45%' : 120,
                        marginLeft:20
                        // flex: 1,
                      }}>
                      <MCIcon
                        name="bell"
                        style={{ right: 2 }}
                        color={Colors.MRGREEN}
                        size={16}
                      />
                      <Text
                        style={{
                          ...stylesCard.MobileText,
                          fontSize: 12,
                          fontFamily: FontFamily.TTCommonsMedium,
                          color: themecolor.TXTWHITE,
                          left: 0,
                          flexWrap: 'wrap',
                        }}>
                        {data?.VisitFq} VF
                      </Text>
                    </View>
                  )}
              </View>
              <View style={{ marginVertical: 3 }} />
              <View
                style={{
                  ...stylesCard.FLVIEW,
                  justifyContent: 'space-between',
                  // width:'95%',
                  paddingVertical: 2,
                  flexWrap: 'wrap',
                  // backgroundColor:'blue'
                }}>
                <View
                  style={{
                    ...stylesCard.FLVIEW3,
                    flex: 1,
                    // backgroundColor:'red'
                    // width: isLandscape ? '60%' : 'auto',
                    // justifyContent: 'flex-start',
                    // alignSelf: 'flex-start',
                  }}>
                  <FIcon5 name="mobile" size={15} color={Colors.MRGREEN} />

                  {data.OutletContactNo != null ? (
                    <Text
                      style={{
                        ...stylesCard.MobileText,
                        fontSize: 12,
                        fontFamily: FontFamily.TTCommonsMedium,
                        color: themecolor.TXTWHITE,
                        // left: 7,
                      }}>
                      {data.OutletContactNo}
                    </Text>
                  ) : (
                    <Text
                      style={{
                        ...stylesCard.MobileText,
                        fontSize: 12,
                        fontFamily: FontFamily.TTCommonsMedium,
                        color: themecolor.TXTWHITE,
                        // left: 7,
                      }}>
                      NA
                    </Text>
                  )}
                </View>
                <View
                  style={{
                    ...stylesCard.CalendarView,
                    justifyContent: 'flex-start',
                    alignSelf: 'flex-start',
                    // width:'35%',
                    flex: 1,
                  }}>
                  <MCIcon
                    name="email"
                    size={15}
                    color={Colors.MRGREEN}
                    style={{ left: 1 }}
                  />
                  {data.OutletEmail != null ? (
                    <TouchableOpacity
                      onPress={() => Linking.openURL(`mailto:${data.email}`)}>
                      <TextTicker
                        style={{
                          ...stylesCard.MobileText,
                          flexWrap: 'wrap',
                          // justifyContent: 'flex-start',
                          // alignSelf: 'flex-start',
                          // maxWidth: 200,
                          textDecorationLine: 'underline',
                          width: isLandscape ? 100 : 'auto',
                          top: -1,
                          left: 2,
                        }}
                        duration={5000}
                        numberOfLines={2}
                        ellipsizeMode="tail"
                        loop
                        bounce
                        repeatSpacer={10}
                        marqueeDelay={1000}
                        scrollSpeed={1000}
                        animationType={'scroll'}>
                        {data.OutletEmail}
                      </TextTicker>
                      {/* <Text
                     style={{
                      ...stylesCard.MobileText,
                      flexWrap: 'wrap',
                      // justifyContent: 'flex-start',
                      // alignSelf: 'flex-start',
                      // maxWidth: 200,
                      textDecorationLine:'underline',
                      width:isLandscape?100:'auto',
                    }}
                     >
                      {data.OutletEmail}
                    </Text> */}
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity>
                      <Text
                        style={{
                          ...stylesCard.MobileText,
                          fontSize: 12,
                          fontFamily: FontFamily.TTCommonsMedium,
                          color: themecolor.TXTWHITE,
                          left: 3,
                          flexWrap: 'wrap',
                          width: isLandscape ? '100%' : 70,
                        }}>
                        NA
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
              <View style={{ marginVertical: 3 }} />
              <View
                style={{
                  ...stylesCard.FLVIEW,
                  justifyContent: 'space-between',
                  // width:'95%',
                  paddingVertical: 2,
                  flexWrap: 'wrap',
                }}>
                <View
                  style={{
                    ...stylesCard.FLVIEW3,
                    // backgroundColor:'yellow'
                    flex: 1,
                    // width: isLandscape ? '60%' : 'auto',
                    // justifyContent: 'flex-start',
                    // alignSelf: 'flex-start',
                  }}>
                  <FIcon5
                    name="calendar-alt"
                    size={12}
                    color={Colors.MRGREEN}
                  />
                  {data.OutletContactBday != null ? (
                    <Text
                      style={{
                        ...stylesCard.MobileText,
                        color: themecolor.TXTWHITE,
                      }}>
                      DOB : {data?.OutletContactBday }
                    </Text>
                  ) : (
                    <Text
                      style={{
                        ...stylesCard.MobileText,
                        fontSize: 12,
                        fontFamily: FontFamily.TTCommonsMedium,
                        color: themecolor.TXTWHITE,
                        // left: 7,
                      }}>
                      NA
                    </Text>
                  )}
                </View>
                <View
                  style={{
                    ...stylesCard.CalendarView,
                    justifyContent: 'flex-start',
                    alignSelf: 'flex-start',
                    // width:'35%'
                    flex: 1,
                    // left:1
                    marginLeft:isMobile?20:0
                  }}>
                  <MCcon
                    name="ring"
                    size={16}
                    color={Colors.MRGREEN}
                    style={{ left: 1 }}
                  />

                  {data.OutletContactAnniversary != null ? (
                    <Text
                      style={{
                        ...stylesCard.MobileText,
                        color: themecolor.TXTWHITE,
                        left: 2,
                        // width:isLandscape?100:'100%',
                        // flexWrap:'wrap'
                      }}>
                      Anniversary:
                      {data?.OutletContactAnniversary}
                    </Text>
                  ) : (
                    <Text
                      style={{
                        ...stylesCard.MobileText,
                        fontSize: 12,
                        fontFamily: FontFamily.TTCommonsMedium,
                        color: themecolor.TXTWHITE,
                        left: 2,
                        flexWrap: 'wrap',
                        width: isLandscape ? 100 : '90%',
                      }}>
                      NA
                    </Text>
                  )}
                </View>
              </View>
              <View style={{ marginVertical: 3 }} />
              <View
                style={{
                  ...stylesCard.FLVIEW,
                  justifyContent: 'space-between',
                  // width:'95%',
                  // paddingVertical: 2,
                  flexWrap: 'wrap',

                  // backgroundColor:'red'
                }}>
                {/* <View
                  style={{
                    ...stylesCard.FLVIEW3,
                  // backgroundColor:'yellow'
                  flex:1,
                    // width: isLandscape ? '60%' : 'auto',
                    justifyContent: 'flex-start',
                    alignSelf: 'flex-start',
                    alignItems:'flex-start'
                  }}>
                  <FIcon5
                    name="map-marker-alt"
                    size={14}
                    color={Colors.MRGREEN}
                  />
                  {data.OutletAddress != null ? (
                    <Text
                      style={{
                        ...stylesCard.MobileText,
                        maxWidth:160,
                        flexWrap:'wrap',
                        textAlign:'left',
                        fontSize: 12,
                        fontFamily: FontFamily.TTCommonsMedium,
                        color: themecolor.TXTWHITE,
                      }}>
                      {data.OutletAddress}
                    </Text>
                  ) : (
                    <Text>NA</Text>
                  )}
                </View> */}
                <View
                  style={{
                    ...stylesCard.CalendarView,
                    justifyContent: 'flex-start',
                    alignSelf: 'flex-start',
                    // width:'35%'
                    flex: 1,
                  }}>
                  {!permission[outletTypeId]?.includes(
                    'can_show_top_on_outlet_name',
                  ) && (
                      <>
                        <MCcon name="star" size={18} color={Colors.MRGREEN} />

                        <View style={{ ...stylesCard.RingView, marginLeft: 5, overflow: 'hidden', width: '100%' }}>
                          {data.BrandFocus != null ? (
                            <TextTicker
                              style={{
                                ...stylesCard.MobileText,
                                // flexWrap: 'wrap',
                                // justifyContent: 'flex-start',
                                // alignSelf: 'flex-start',
                                // maxWidth: 200,

                                top: -1,
                                left: 2,
                                // backgroundColor: 'red',

                              }}
                              duration={10000}
                              numberOfLines={2}
                              ellipsizeMode="tail"
                              loop
                              bounce
                              // repeatSpacer={10}
                              marqueeDelay={1000}
                              scrollSpeed={1000}
                              animationType={'scroll'}>


                              {data.BrandFocus.split(',').map((item, index) => {
                                return (
                                  // <Text
                                  //   style={{
                                  //     ...stylesCard.MobileText,
                                  //     color: themecolor.TXTWHITE,
                                  //     left: 2,
                                  //     top: 1
                                  //   }}>
                                  //   P{index+1} : {item} {data?.BrandFocus?.split(',').length > index +1  ? '| ':'' }
                                  // </Text>




                                  <Text>
                                    P{index + 1} : {item}{' '}
                                    {data?.BrandFocus?.split(',').length > index + 1
                                      ? '| '
                                      : ''}
                                  </Text>
                                );
                              })}
                            </TextTicker>
                          ) : (
                            <Text
                              style={{
                                ...stylesCard.MobileText,
                                fontSize: 12,
                                fontFamily: FontFamily.TTCommonsMedium,
                                color: themecolor.TXTWHITE,
                                left: 1,
                                top: 1,
                              }}>
                              P1 : NA
                            </Text>
                          )}
                        </View>
                      </>
                    )}
                </View>
              </View>
              <View style={{ marginVertical: 3 }} />
              <View
                style={{
                  ...stylesCard.FLVIEW,
                  justifyContent: 'space-between',
                  // width:'95%',
                  // paddingVertical: 2,
                  flexWrap: 'wrap',

                  // backgroundColor:'red'
                }}>
                {/* <View
                  style={{
                    ...stylesCard.FLVIEW3,
                  // backgroundColor:'yellow'
                  flex:1,
                    // width: isLandscape ? '60%' : 'auto',
                    justifyContent: 'flex-start',
                    alignSelf: 'flex-start',
                    alignItems:'flex-start'
                  }}>
                  <FIcon5
                    name="map-marker-alt"
                    size={14}
                    color={Colors.MRGREEN}
                  />
                  {data.OutletAddress != null ? (
                    <Text
                      style={{
                        ...stylesCard.MobileText,
                        maxWidth:160,
                        flexWrap:'wrap',
                        textAlign:'left',
                        fontSize: 12,
                        fontFamily: FontFamily.TTCommonsMedium,
                        color: themecolor.TXTWHITE,
                      }}>
                      {data.OutletAddress}
                    </Text>
                  ) : (
                    <Text>NA</Text>
                  )}
                </View> */}
                <View
                  style={{
                    ...stylesCard.CalendarView,
                    justifyContent: 'flex-start',
                    alignSelf: 'flex-start',
                    // width:'35%'
                    flex: 1,
                  }}>

                  <>
                  <View style={{ ...stylesCard.RingView, marginLeft: 5, top: -2, alignItems: 'flex-start', overflow: 'hidden', flexDirection:isMobile?'column':'row', width: '90%' }}>
                      <View style={{ flexDirection: 'row', alignItems: 'center' }} >

                        <MCcon name="key" size={18} color={Colors.MRGREEN} top={-2} />
                        <Text
                          style={{
                            ...stylesCard.MobileText,
                            color: themecolor.TXTWHITE,
                          }}>
                          Legacy Code : {data.OutletCode}
                        </Text>
                      </View>
                      <View style={{ flexDirection: 'row', alignItems: 'center',marginLeft:isMobile?0:20 }} >
                        <MCcon name="key" size={18} color={Colors.MRGREEN} top={-2} />
                        <Text
                          style={{
                            ...stylesCard.MobileText,
                            color: themecolor.TXTWHITE,
                            left: 5
                          }}>
                          P Code : {data?.OutletOrgCode || 'NA'}
                        </Text>
                      </View>
                    </View>
                  </>

                </View>
              </View>

              {/* </View> */}
            </View>
            {/* <View
              style={{
                ...styles.side_all_text_container,
                width: '80%',
                justifyContent:'flex-start',
                paddingHorizontal:10,
                alignSelf:'center'
              }}>
              <View style={{...styles.name_container}}>
                {data.OutletName && (
                  <Text style={{...styles.name_text}}>{data?.OutletName}</Text>
                )}
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: '80%',
                  justifyContent: 'space-between',
                }}>
                <View style={{...styles.dob_annivarsary_container}}>
                  <View style={{...styles.dob_container}}>
                    <View>
                      <MCIcon
                        name="stethoscope"
                        style={{
                          ...styles.sethoscope_icon,
                        }}
                      />
                    </View>
                    <View style={{...styles.specialization_text_container}}>
                      {data.Classification != null ? (
                        <Text style={{...styles.specialization_text}}>
                          {data.Classification}
                        </Text>
                      ) : (
                        <Text>NA</Text>
                      )}
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    ...styles.mobile_container,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <MCIcon name="bell" color="green" size={15} />
                  <Text style={{...styles.dob_txt}}>
                    {data?.VisitFq} Visit Frequency{' '}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: '80%',
                  justifyContent: 'space-between',
                }}>
                <View style={{...styles.dob_annivarsary_container}}>
                  <View style={{...styles.dob_container}}>
                    <View>
                    <ENIcon
                      name="mobile"
                      style={{
                        ...styles.mobile_icon,
                      }}
                    />
                    </View>
                    <View style={{...styles.specialization_text_container}}>
                    {data.OutletContactNo != null ? (
                      <Text style={{...styles.dob_txt}}>
                        {' '}
                        {data.OutletContactNo}
                      </Text>
                    ) : (
                      <Text>NA</Text>
                    )}
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    ...styles.mobile_container,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <MCIcon name="bell" color="green" size={15} />
                  <Text style={{...styles.dob_txt}}>
                    {data?.VisitFq} Visit Frequency{' '}
                  </Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row',
                  alignItems: 'center',
                  width: '80%',
                  justifyContent: 'space-between',}}>
                <View style={{...styles.dob_container}}>
                    <ENIcon
                      name="mobile"
                      style={{
                        ...styles.mobile_icon,
                      }}
                    />
                  <View style={{...styles.dob_text_cont}}>
                    {data.OutletContactNo != null ? (
                      <Text style={{...styles.dob_txt}}>
                        {' '}
                        {data.OutletContactNo}
                      </Text>
                    ) : (
                      <Text>NA</Text>
                    )}
                  </View>
                </View>

                <View style={{...styles.annivarsary_container}}>
                  <View>
                    <MCIcon
                      name="email"
                      style={{
                        ...styles.ring_icon,
                      }}
                    />
                  </View>
                  <View style={{...styles.anivarsary_view}}>
                    {data.OutletEmail != null ? (
                      <Text style={{...styles.anivarsary_text}}>
                        {data.OutletEmail}
                      </Text>
                    ) : (
                      <Text>NA</Text>
                    )}
                  </View>
                </View>
              </View>

              <View style={{...styles.dob_annivarsary_container}}>
                <View style={{...styles.dob_container}}>
                  <View>
                    <MCIcon
                      name="calendar"
                      style={{
                        ...styles.calander_icon,
                      }}
                    />
                  </View>
                  <View style={{...styles.dob_text_cont}}>
                    {data.OutletContactBday != null ? (
                      <Text style={{...styles.dob_txt}}>
                        {data.OutletContactBday}
                      </Text>
                    ) : (
                      <Text>NA</Text>
                    )}
                  </View>
                </View>

                <View style={{...styles.annivarsary_container}}>
                  <View>
                    <MCIcon
                      name="ring"
                      style={{
                        ...styles.ring_icon,
                      }}
                    />
                  </View>
                  <View style={{...styles.anivarsary_view}}>
                    {data.OutletContactAnniversary != null ? (
                      <Text style={{...styles.anivarsary_text}}>
                        {data.OutletContactAnniversary}
                      </Text>
                    ) : (
                      <Text style={{...styles.anivarsary_text}}>
                        NA
                      </Text>
                    )}
                  </View>
                </View>
              </View>
            </View> */}
          </View>
        </>
      )}
    </>
  );
};

export default DoctorProfileCard;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#ffffff',
    padding: 5,
    borderRadius: 10,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#e2e2e2',
  },
  img_background: {
    width: '25%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    position: 'relative',
  },

  side_all_text_container: {
    height: '100%',
    padding: 5,
  },

  img: {
    width: 80,
    height: 110,
  },
  name_container: {
    justifyContent: 'center',
    marginLeft: 2,
  },
  name_text: {
    fontFamily: FontFamily.TTCommonsBold,
    color: '#000',
    fontSize: 12,
  },
  mobile_container: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 3,
  },
  mobile_icon: {
    color: 'green',
    fontSize: 14,
    borderRadius: 5,
  },
  mobile_no: {
    marginLeft: 5,
    marginTop: 2,
  },
  mobile_text: {
    fontFamily: FontFamily.TTCommonsMedium,
    color: '#000',
    fontSize: 10,
  },
  specialization_doctor_address_container: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 3,
  },
  specialization_container: {
    flexDirection: 'row',
  },
  sethoscope_icon: {
    color: 'green',
    fontSize: 13,
    borderRadius: 5,
  },
  specialization_text_container: {
    marginLeft: 5,
    // marginTop: 1,
  },
  specialization_text: {
    fontFamily: FontFamily.TTCommonsMedium,
    color: '#000',
    fontSize: 10,
  },
  doctor_address_container: {
    flexDirection: 'row',
    marginLeft: 15,
    width: '67%',
  },
  doctor_address: {
    marginLeft: 5,
    marginTop: 2,
    width: '89%',
  },
  doctor_txt: {
    fontFamily: FontFamily.TTCommonsMedium,
    color: '#000',
    fontSize: 10,
  },
  hospital_address: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 3,
  },
  location_icon: {
    color: 'green',
    fontSize: 15,
    borderRadius: 5,
  },
  hospital_text_container: {
    marginLeft: 5,
    marginTop: 2,
    width: '88%',
  },
  hospital_text_: {
    fontFamily: FontFamily.TTCommonsMedium,
    color: '#000',
    fontSize: 10,
  },
  dob_annivarsary_container: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 3,
  },
  dob_container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  calander_icon: {
    color: 'green',
    fontSize: 14,
    borderRadius: 5,
  },
  dob_text_cont: {
    marginLeft: 5,
    marginTop: 2,
  },
  dob_txt: {
    fontFamily: FontFamily.TTCommonsMedium,
    color: '#000',
    fontSize: 10,
  },
  annivarsary_container: {
    flexDirection: 'row',
    marginLeft: 15,
    width: '61%',
    alignItems: 'center',
    marginTop: 3,
  },
  ring_icon: {
    color: 'green',
    fontSize: 14,
    borderRadius: 5,
  },
  anivarsary_view: {
    marginLeft: 5,
    marginTop: 2,
  },
  anivarsary_text: {
    fontFamily: FontFamily.TTCommonsMedium,
    color: '#000',
    fontSize: 10,
  },
});
DoctorProfileCard.defaultProps = {
  data: {
    name: 'Dr.Prashant Verma',
    mobile_no: '7999795193',
    specialization: 'specialization',
    doctor_address: 'B1,Opera House,shangiram apartment,Ahemdabad',
    hospital_address: 'B1,Opera House,shangiram apartment,Ahemdabad',
    dob: 'DOB 25 Sep 1991',
    anniversary: 'Anniversary: 12 Nov 2016',
    last_visit: 'Last visit 21 oct, 12:30 PM',
    image: require('../../../assets/alembicimages/doctor_icon.png'),
  },
  isDoctor: true,
};
