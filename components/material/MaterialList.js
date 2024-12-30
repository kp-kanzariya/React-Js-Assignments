import { View, TouchableOpacity, Image, StyleSheet, Text } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '../../assets/config/Colors'
import { FontFamily } from '../../assets/fonts/FontFamily'
import { FontSize } from '../../assets/fonts/Fonts';
import { MyThemeClass } from '../shared/Theme/ThemeDarkLightColor';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native'
import ShimmerProductCategoryList from '../productcatalogue/ShimmerProductCategoryList';
import { getData } from '../../api/Request';
import { API } from '../../api/API';
import { SERVER_URL } from '../../api/commonRepository';
// import Header from '../shared/header/Header';


function CategoryList({ item, subHeaderTitle, handleOpenModal }) {
    // const [isShowRightDrawer, setIsShowRightDrawer] = React.useState(false);
    const { mode } = useSelector(state => state.mode);
    const themecolor = new MyThemeClass(mode).getThemeColor()
    let navigation = useNavigation();
    const [image_url, set_image_url] = React.useState(null);

    React.useEffect(() => {
        async function getServerURL() {
            try {
                let s_u = await SERVER_URL();
                if (item.Url) {
                    if (item.MediaId == '') {
                        set_image_url(null);
                    } else {
                        set_image_url(`${s_u}media?id=${item.MediaId}`);
                    }
                }
                else if (item.FolderIcon == 0) {
                    set_image_url(null);
                }
                else {
                    set_image_url(`${s_u}media?id=${item.FolderIcon}`);
                }
            } catch (e) {
                set_image_url(null);
            }
        }
        getServerURL();
    }, []);


    return (
        <>
            <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => {
                    if (item.Url) {
                        handleOpenModal(item.Url)
                    } else {
                        navigation.push('Material', {
                            navigateFrom: 'Folder',
                            FolderId: item.FolderId,
                            subHeaderTitle: subHeaderTitle + " > " + item.FolderName
                        }
                        )//End of navigate 
                    }//End of Else
                }
                }>
                <View style={{ ...styles.MainView }}>
                    <View style={{ ...styles.SecondView, backgroundColor: themecolor.BOXTHEMECOLOR, borderColor: Colors.borderColor1, }}>
                        <View style={{ ...styles.ImageView, flex: 1 }}>
                            {image_url != null ?
                                (
                                    <Image
                                        style={styles.IMGStyle}
                                        source={{ uri: image_url }}
                                        resizeMode={'contain'} />
                                ) : (
                                    item.MediaId == '' ?
                                        (
                                            <>
                                                <Image
                                                    style={styles.IMGStyle}
                                                    source={require('../../assets/alembicimages/file.png')}
                                                    resizeMode={'contain'} />
                                            </>
                                        ) : (<>
                                            <Image
                                                style={styles.IMGStyle}
                                                source={require('../../assets/alembicimages/folderimage.png')}
                                                resizeMode={'contain'} />
                                        </>)
                                )
                            }
                        </View>
                        <View style={{ alignItems: 'center', justifyContent: 'center', alignSelf: 'center', top: 15, width: '100%', flex: 1 }}>
                            {item.FolderName != null && <Text numberOfLines={3} ellipsizeMode='tail' style={{ ...styles.CardText, textAlign: 'auto', color: themecolor.TXTWHITE, }}>{item.FolderName}</Text>}
                            {item.Name != null && <Text numberOfLines={3} ellipsizeMode='tail' style={{ ...styles.CardText, textAlign: 'auto', color: themecolor.TXTWHITE }}>{item.Name}</Text>}
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </>
    )
}


export default function ProductCategoryList(props) {


    return (
        <View style={styles.mainView}>



            {props.shimmer ? (
                <>

                    <ShimmerProductCategoryList />
                </>
            ) : (props.folders.map((item) => <CategoryList item={item} subHeaderTitle={props.subHeaderTitle} props={props} handleOpenModal={props.handleOpenModal} />))}

        </View>


    )
}

const styles = StyleSheet.create({
    mainView: {
        flexDirection: 'row', flexWrap: 'wrap', width: '100%', justifyContent: 'flex-start'
    },
    CardText: {
        fontSize: 14,
        fontFamily: FontFamily.TTCommonsBold,
        color: Colors.black,
        alignSelf: 'center',
        // top: 35,

    },
    MainView: { height: 180, alignItems: 'center', justifyContent: 'center', alignSelf: 'center', padding: 3 },
    SecondView: {
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        flex: 1,
        backgroundColor: 'red',
        width: 185,
        borderRadius: 10,
        // height: 115,
        overflow: 'hidden',
        paddingHorizontal: 12,
        borderWidth: 1
    },
    ImageView: {
        backgroundColor: Colors.bgcolor,
        borderRadius: 50,
        width: 55,
        height: 55,
        justifyContent: 'center',
        alignSelf: 'center',
        // top: 15,
    },
    IMGStyle: {
        width: 82,
        height: 82,
        justifyContent: 'center',
        alignSelf: 'center',
    },
    statusTextIn: {
        fontSize: FontSize.labelText2,
        fontFamily: FontFamily.TTCommonsMedium,
        alignSelf: 'center',
        top: 19,
        color: '#44bd32',
    },
    DotStatusGreenColor: {
        width: 5,
        height: 5,
        borderRadius: 10,
        backgroundColor: '#44bd32',
    },

    containerresponsive: {

        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '33%',
        alignSelf: 'center',
        height: 'auto',
    },
    responsiveBox: {
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'space-around',

    },
});