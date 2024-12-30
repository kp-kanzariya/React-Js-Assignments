import { View, Text, FlatList } from 'react-native';
import React from 'react';
import { RadioButton } from 'react-native-paper';
import { FontFamily } from '../../assets/fonts/FontFamily';
import { Colors } from '../../assets/config/Colors';
import { FontSize } from '../../assets/fonts/Fonts';
import NumericInput from 'react-native-numeric-input';
import Attachment from '../shared/attachment/Attachment';

function RenderItem({ item, index, checked, setChecked }) {
  const handleRadioBox = (id, value) => {
    if (id == 1) {
      setChecked('Yes');
    } else {
      setChecked('No');
    }
  };

  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          borderRadius: 10,
          backgroundColor: '#FFF',
          borderColor: 'lightgrey',
          borderWidth: 2,
          width: '94%',
          alignSelf: 'center',
          padding: 20,
        }}>
        <View>
          <Text style={{ fontWeight: 'bold' }}>{item.question}</Text>
          {item.answer_type == 'tag' ? (
            <>
              <View style={{ flexDirection: 'row', top: 5 }}>
                {item.answer_list.map(itm => {
                  return (
                    <View
                      style={{
                        padding: 3,
                        backgroundColor: '#DEEFDF',
                        borderRadius: 20,
                        paddingHorizontal: 10,
                        marginRight: 10,
                      }}>
                      <Text style={{ color: '#259328' }}>{itm.name}</Text>
                    </View>
                  );
                })}
              </View>
            </>
          ) : (
            <>
              {item.answer_type == 'boolean' ? (
                <>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignSelf: 'flex-start',
                    }}>
                    <RadioButton.Android
                      value="Yes"
                      color={'#259328'}
                      uncheckedColor={'#FFF'}
                      status={checked == 'Yes' ? 'checked' : 'unchecked'}
                      onPress={() =>
                        checked == 'Yes' ? {} : handleRadioBox(1, 'Yes')
                      }
                    />
                    <Text
                      style={{
                        top: 10,
                        fontFamily: FontFamily.TTCommonsMedium,
                        color: Colors.black,
                        fontSize: FontSize.labelText,
                      }}>
                      Yes
                    </Text>

                    <RadioButton.Android
                      value="No"
                      color={'#259328'}
                      uncheckedColor={'#000'}
                      status={checked == 'No' ? 'checked' : 'unchecked'}
                      onPress={() =>
                        checked == 'No' ? {} : handleRadioBox(2, 'No')
                      }
                    />
                    <Text
                      style={{
                        top: 10,
                        fontFamily: FontFamily.TTCommonsMedium,
                        color: Colors.black,
                        fontSize: FontSize.labelText,
                      }}>
                      No
                    </Text>
                  </View>
                </>
              ) : (
                <>
                  {item.answer_type == 'qty_spinner' ? (
                    <>
                      <NumericInput
                        minValue={0}
                        totalWidth={90}
                        totalHeight={40}
                        textColor="#0b142b"
                        borderColor="#fff"
                      />
                    </>
                  ) : (
                    <></>
                  )}
                </>
              )}
            </>
          )}
          <>
            {item.answer_type == 'camera' ? (
              <View style={{ flexDirection: 'row' }}>
                <View >
                  <Attachment />
                </View>

                <Text
                  style={{
                    marginTop: 5,
                    marginLeft: 5,
                    fontFamily: FontFamily.PopinsExtraLight,
                    fontSize: 11,
                  }}>
                  Camera
                </Text>
              </View>
            ) : (
              <></>
            )}
          </>
        </View>

        {/* <Text>{item.answer}</Text> */}
      </View>
    </>
  );
}

export default function SurveyQuestions(props) {
  const [checked, setChecked] = React.useState('Yes');
  return (
    <View style={{ top: 30 }}>
      <FlatList
        data={props.data}
        renderItem={({ item, index }) => (
          <RenderItem
            item={item}
            index={index}
            checked={checked}
            setChecked={setChecked}
          />
        )}
      />
    </View>
  );
}
