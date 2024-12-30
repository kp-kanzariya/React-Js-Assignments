import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import ENIcon from 'react-native-vector-icons/Entypo';
import { FontFamily } from '../../../assets/fonts/FontFamily'
import ButtonRoot from '../buttons/ButtonRoot';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const ChemistCard = ({ primaryOutlet }) => {


    return (
        <>


            <View style={{ ...styles.container }}>
                <View style={{ ...styles.side_all_text_container, width: '100%' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ ...styles.name_container, }}>
                            <Text style={{ ...styles.name_text }}>
                                {primaryOutlet.OutletContactName != null ? primaryOutlet.OutletContactName : 'NA'}
                            </Text>
                        </View>

                        <View >
                            <ButtonRoot width={55} height={15} borderRadius={12} color='#50b030' title={primaryOutlet.OutlettypeName} fontSize={8} />
                        </View>
                    </View>

                    <View style={{ ...styles.chemist_name_mobile_container }}>
                        <View style={{ ...styles.chemist_name_container }}>
                            <MCIcon
                                name="account-circle"
                                style={{
                                    ...styles.acount_icon
                                }}
                            />
                            <View style={{ ...styles.chemistname_text_container }}>
                                <Text style={{ ...styles.chemist_text }}>{primaryOutlet.OutletContactName != null ? primaryOutlet.OutletContactName : 'NA'}</Text>
                            </View>
                        </View>
                        <View style={{ ...styles.chemist_mobile_container }}>
                            <ENIcon
                                name="mobile"
                                style={{
                                    ...styles.mobile_icon
                                }}
                            />
                            <View style={{ ...styles.mobile_text_container }}>
                                <Text style={{ ...styles.mobile_text }}>{primaryOutlet.OutletContactNo != null ? primaryOutlet.OutletContactNo : 'NA'}</Text>
                            </View>
                        </View>
                    </View>


                    <View style={{ ...styles.location_container }}>
                        <View style={{ ...styles.chemist_name_container }}>
                            <ENIcon
                                name="location-pin"
                                style={{
                                    ...styles.location_icon
                                }}
                            />
                            <View style={{ ...styles.location_text_container, width: '95%' }}>
                                <Text
                                    ellipsizeMode='tail' numberOfLines={2}
                                    style={{ ...styles.location_text }}>
                                    {primaryOutlet.address != null ? primaryOutlet.address : ''}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>

        </>
    )
}

export default ChemistCard

const styles = StyleSheet.create({

    container: {
        width: '100%', backgroundColor: '#ffffff', padding: 5, borderRadius: 10,
        flexDirection: 'row', borderWidth: 1, borderColor: '#e2e2e2', overflow: 'hidden'
    },

    side_all_text_container: {
        height: '100%',
        padding: 5
    },


    img_background: {
        width: '25%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5
    },
    img: {
        width: 80,
        height: 110
    },
    name_container: {
        // justifyContent: 'center',
        marginLeft: 2
    },
    name_text: {
        fontFamily: FontFamily.TTCommonsMedium,
        color: '#000',
        fontSize: 12
    }, mobile_container: {
        alignItems: 'center',
        flexDirection: 'row', marginTop: 3
    },
    mobile_no: {
        marginLeft: 5,
        marginTop: 2
    },




    chemist_name_mobile_container: {
        alignItems: 'center', flexDirection: 'row',
        marginTop: 3
    },
    chemist_name_container: {
        flexDirection: 'row',
    },
    acount_icon: {
        color: 'green',
        fontSize: 14,
        borderRadius: 5,
    },
    chemistname_text_container: {
        marginLeft: 5,
        marginTop: 2
    },
    chemist_text: {
        fontFamily: FontFamily.TTCommonsMedium,
        color: '#000', fontSize: 12
    },


    chemist_mobile_container: {
        flexDirection: 'row',
        marginLeft: 10
    },
    mobile_icon: {
        color: 'green',
        fontSize: 12,
        borderRadius: 5,
    },
    mobile_text_container: {
        marginLeft: 5,
        marginTop: 2
    },
    mobile_text: {
        fontFamily: FontFamily.TTCommonsMedium,
        color: '#000', fontSize: 12
    },



    location_container: {
        alignItems: 'center', flexDirection: 'row',
        marginTop: 3
    },
    location_text_container: {
        marginLeft: 5,
        marginTop: 2,
    },
    location_text: {
        fontFamily: FontFamily.TTCommonsMedium,
        color: '#000', fontSize: 12
    },

    location_icon: {
        color: 'green',
        fontSize: 15,
        borderRadius: 5,
    },



    opening_dob_container: {
        alignItems: 'center', flexDirection: 'row',
        marginTop: 3
    },

    opening_container: {
        flexDirection: 'row',
    },
    calander_icon: {
        color: 'green',
        fontSize: 14,
        borderRadius: 5,
    },
    clock_icon: {
        color: 'green',
        fontSize: 14,
        borderRadius: 5,
    },
    opening_text_container: {
        marginLeft: 5,
        marginTop: 2
    },

    opening_text: {
        fontFamily: FontFamily.TTCommonsMedium,
        color: '#000', fontSize: 9
    },

    dob_container: {
        flexDirection: 'row',
        marginLeft: 10
    },
    dob_text_container: {
        marginLeft: 3,
        marginTop: 2
    },
    dob_text: {
        fontFamily: FontFamily.TTCommonsMedium,
        color: '#000', fontSize: 9
    }, ring_icon: {
        color: 'green',
        fontSize: 15,
        borderRadius: 5,
    }, annivarsary_container: {
        alignItems: 'center', flexDirection: 'row',
        marginTop: 3
    },
    annivarsary_text_container: {
        marginLeft: 5,
        marginTop: 2
    },
    annivarsary_text: {
        fontFamily: FontFamily.TTCommonsMedium,
        color: '#000', fontSize: 9
    },



    btn: {
        width: '54%', flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 5,
    }, last_visit_container: {
        alignItems: 'center', flexDirection: 'row',
        marginTop: 3
    },
})



ChemistCard.defaultProps = {
    data: {
        medical_name: 'Gheli Medicines',
        chemist_name: 'Chemist name',
        chemist_mobile: ' chm mobile',
        medical_address: 'medical addres ssss aaa fff ffff sss rrsd ssdkfjh  shshshs sgsgsg gsgsgs vagag',
        medical_opening_date: 'Opening Date 11 feb 2021',
        medical_dob: 'DOB 27 Sep 1991',
        anniversary: 'Anniversary: 12 Nov 2016',

        last_visit: 'Last visited 23 oct , 10:30 AM'

    },

}