import { View, Button, TouchableOpacity, Text } from 'react-native';
import React, { useCallback, useState } from 'react';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { FontFamily } from '../../../assets/fonts/FontFamily';
import { Colors } from '../../../assets/config/Colors';
import _ from 'lodash';

const ButtonRoot = props => {

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleClickOnpress = () => {
    // alert("Hii")
    try {
      setIsButtonDisabled(false);
      props.onPress()
      console.log('Button clicked!');
    } catch (error) {
      console.error('Error processing click:', error);
    }
    finally {
      setIsButtonDisabled(false);
    }
  }

  // const debouncedHandleButtonClick = _.debounce(handleClickOnpress, 300);



  return (
    <TouchableOpacity
      testID={props?.testID}
      disabled={props?.isdisable ? props?.isdisable : isButtonDisabled}
      style={{
        paddingHorizontal: props.padding,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: props.isdisable ? 'lightgrey' : props.color,
        width: props.width,
        height: props.height,
        borderRadius: props.borderRadius,
        alignSelf: props.alignSelf,
        zIndex: -1,
        borderColor: props.borderColor,
        borderWidth: props.borderWidth,
        right: props.Right,
        left: props.LEFT,
        top: props.TOPSS
      }}
      // onPress={props.onPress }>
      // onPress={() => { !props.withoutDebounce ? debouncedHandleButtonClick() : props.onPress() }}
      onPress={() => {
        if (!isButtonDisabled) {
          setIsButtonDisabled(true);
          handleClickOnpress()
        }
      }
      }

    >

      {props.icon ? (
        <Text>
          <FAIcon name={props.icon} size={18} color={props.iconColor} />
        </Text>
      ) : (
        <View style={{ alignItems: 'center' }} >
          {props.subTitle && <Text
            style={{
              color: props.textColor,
              fontFamily: FontFamily.TTCommonsDemiBold,
              fontSize: props.subTitleFontSize,
              // fontWeight: props.fontWeight,
              top: props.TOPS,
              left: 1
            }}
          >{props.subTitle}</Text>}
          <Text
            style={{
              color: props.textColor,
              fontFamily: FontFamily.TTCommonsDemiBold,
              fontSize: props.fontSize,
              // fontWeight: props.fontWeight,
              // top: props.TOPS,
              left: 1,
              top: props.subTitle ? -2 : 0
            }}>
            {/* {props.preIconName && (
            <FAIcon name={props.preIconName} size={props.preIconSize} />
          )}{' '} */}
            {props.preIconName &&
              props.iconType == 'FA' ? <FAIcon name={props.preIconName} style={props.preIconStyle} size={props.preIconSize} /> : <MCIcon name={props.preIconName} size={props.preIconSize} style={props.preIconStyle} />

            }

            {' '}{props.title}{' '}
            {props.postIconName &&
              props.iconType == 'FA' ? <FAIcon name={props.postIconName} size={props.postIconSize} style={props.postIconStyle} /> : <MCIcon name={props.postIconName} size={props.postIconSize} style={props.postIconStyle} />

            }
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

ButtonRoot.defaultProps = {
  onPress: () => { },
  title: 'Submit',
  color: Colors.MRGREEN,
  textColor: 'white',
  width: '100%',
  height: 50,
  borderRadius: 10,
  // onPress: () => { },
  icon: null,
  iconColor: 'white',
  fontSize: 12,
  preIconName: null,
  postIconName: null,
  borderColor: Colors.borderColor1,
  fontWeight: '200',
  preIconSize: 15,
  postIconSize: 15,
  borderWidth: 1,
  iconType: 'FA',
  isdisable: false,
  alignSelf: 'center',
  subTitle: '',
  subTitleFontSize: 8,
  withoutDebounce: false,
  testID:'ButtonRoot',
};

export default ButtonRoot;