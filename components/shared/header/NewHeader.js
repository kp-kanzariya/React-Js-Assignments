import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { MyThemeClass } from '../Theme/ThemeDarkLightColor';
import { useSelector } from 'react-redux';
import ICI from 'react-native-vector-icons/Ionicons';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors } from '../../../assets/config/Colors';
import { FontFamily } from '../../../assets/fonts/FontFamily';

const NewHeader = (props) => {
    const mode = useSelector(state => state.mode);
    const themecolor = new MyThemeClass(mode).getThemeColor();

    return (
        <View style={[styles.headerContainer, { height: props?.height, backgroundColor: themecolor.HEADERTHEMECOLOR }]}>
            <View style={styles.contentContainer}>
                {/* Back Arrow */}
                <TouchableOpacity onPress={props?.onPressBackArrow} style={styles.iconButton}>
                    <ICI
                        name="arrow-back-sharp"
                        style={styles.icon}
                        size={26}
                    />
                </TouchableOpacity>

                {/* Header Text */}
                <View style={styles.textContainer}>
                    <Text style={styles.leftText}>{props?.left_side_text}</Text>
                    {props?.left_side_text_subTitle && (
                        <Text style={styles.subTitleText}>{props.left_side_text_subTitle}</Text>
                    )}
                </View>

                {/* Right-side Icons */}
                <View style={styles.rightIconsContainer}>
                    {props?.rightIconName && (
                        <TouchableOpacity onPress={props?.onPressRightIcon} style={styles.iconButton}>
                            <ICI
                                name={props.rightIconName}
                                style={styles.icon}
                                size={26}
                            />
                        </TouchableOpacity>
                    )}
                    {props?.secondRightIconName && (
                        <TouchableOpacity onPress={props?.onPressSecondRightIcon} style={styles.iconButton}>
                            <MCI
                                name={props.secondRightIconName}
                                style={styles.icon}
                                size={26}
                            />
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        </View>
    );
};

export default NewHeader;

NewHeader.defaultProps = {
    height: 85,
    left_side_text: 'Hello Hemu',
    onPressBackArrow: () => {},
    onPressRightIcon: () => {},
    onPressSecondRightIcon: () => {},
};

const styles = StyleSheet.create({
    headerContainer: {
        width: '100%',
        borderBottomRightRadius: 15,
        borderBottomLeftRadius: 15,
        justifyContent: 'center',
    },
    contentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginTop: 15,
    },
    iconButton: {
        paddingHorizontal: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        color: Colors.white,
    },
    textContainer: {
        marginLeft: 10,
        justifyContent: 'center',
    },
    leftText: {
        fontFamily: FontFamily.TTCommonsMedium,
        color: Colors.white,
        fontSize: 20,
    },
    subTitleText: {
        fontFamily: FontFamily.TTCommonsMedium,
        color: Colors.white,
        fontSize: 14,
    },
    rightIconsContainer: {
        flexDirection: 'row',
        marginLeft: 'auto',
        alignItems: 'center',
    },
});
