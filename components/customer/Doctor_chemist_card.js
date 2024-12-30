import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native'
import React from 'react'
import { FontFamily } from '../../assets/fonts/FontFamily'
import { ImagesAssets } from '../shared/ImagesAssets'
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import ENIcon from 'react-native-vector-icons/Entypo';
import { useSelector } from 'react-redux';
import ButtonRoot from '../shared/buttons/ButtonRoot';


function RenderItem({ item, isLandscape, props }) {
    return (
        <TouchableOpacity onPress={() => props.navigation.push('DoctorView', {
            item: item, Outlet_Id: item.Outlet_Id
        })}>
            <View style={{ flexDirection: 'row', borderRadius: 20, backgroundColor: 'white', padding: 10, margin: 5 }} >
                <View
                    style={{
                        ...styles.img_background,
                    }}>
                    <Image
                        resizeMode="contain"
                        style={{
                            ...styles.img,
                            width: '100%',
                            height: '100%'
                        }}
                        source={ImagesAssets.Doctors}
                    />

                </View>

                <View style={{}}>
                    {item.OutlettypeName &&
                        <View style={{ flexDirection: 'row', justifyContent: "space-between" }} >
                            <Text style={{ ...styles.name_text }}>{item.OutletContactName}</Text>
                            <View  >
                                <ButtonRoot width={55} height={15} borderRadius={12} color='#50b030' title={item.OutlettypeName} fontSize={8} />
                            </View>

                        </View>
                    }

                    <View style={{ ...styles.specialization_container, justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                            <MCIcon
                                name="stethoscope"
                                style={{
                                    ...styles.sethoscope_icon,
                                }}
                            />

                            {item.Classification != null ? (<Text style={{ ...styles.specialization_text }}>
                                {item.Classification}
                            </Text>) : (<Text style={{
                                ...styles.sethoscope_icon,
                            }}>NA</Text>)}
                        </View>
                        {item.OutletContactNo && <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                            <ENIcon
                                name="mobile"
                                style={{
                                    ...styles.mobile_icon,
                                }}
                            />
                            {item.OutletContactNo != null ? (<Text style={{ ...styles.mobile_text }}>
                                {item.OutletContactNo}
                            </Text>) : (<Text style={{ ...styles.mobile_text }}>NA</Text>)}

                        </View>}
                    </View>

                    <View style={{ ...styles.hospital_address, }}>

                        <View>
                            <ENIcon
                                name="location-pin"
                                style={{
                                    ...styles.location_icon,
                                }}
                            />
                        </View>

                        <View style={{ ...styles.hospital_text_container }}>
                            {item.outlet_address != undefined || null ?
                                (
                                    <Text
                                        ellipsizeMode="tail"
                                        numberOfLines={2}
                                        style={{ ...styles.hospital_text_ }}
                                    >
                                        {item.hospital_address}
                                    </Text>

                                )
                                : (
                                    <Text style={{ ...styles.hospital_text_ }}>NA</Text>
                                )
                            }
                        </View>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )

}

export default function Doctor_chemist_card(props) {
    const { isLandscape } = useSelector(state => state.isLandscape);
    return (

        <View style={{}}>
            <FlatList
                data={props.data}
                contentContainerStyle={{
                    flexWrap: 'wrap', flexDirection: 'row', justifyContent: "center", width: '100%',
                }}
                renderItem={({ item }) => <RenderItem item={item} isLandscape={isLandscape} props={props.props} />
                }
            />
        </View>
    )
}


const styles = StyleSheet.create({

    img_background: {
        width: 100,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        position: 'relative',
    },

    img: {
        width: 80,
        height: 110,
    },

    name_text: {
        fontFamily: FontFamily.TTCommonsBold,
        color: '#000',
        fontSize: 12,
    },

    mobile_icon: {
        color: 'green',
        fontSize: 14,
        borderRadius: 5,
    },

    mobile_text: {
        fontFamily: FontFamily.TTCommonsMedium,
        color: '#000',
        fontSize: 10,
    },

    specialization_container: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    sethoscope_icon: {
        color: 'green',
        fontSize: 14,
        borderRadius: 5,
    },

    specialization_text: {
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
        // width: '88%',
        alignItems: 'center'
    },
    hospital_text_: {
        fontFamily: FontFamily.TTCommonsMedium,
        color: '#000',
        fontSize: 10,
        width: 200
    },

});