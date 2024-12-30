import React from 'react';
import {
  TouchableOpacity,
  Dimensions,
  Text,
  StyleSheet,
  View,
  Image,
  FlatList,
} from 'react-native';
import { useSelector } from 'react-redux';
import { store } from '../../redux/store';
import { FontFamily } from '../../assets/fonts/FontFamily';
const { width } = Dimensions.get('window');

const data3 = [
  {
    question: 'Que 4. Select VAS Scale as per current pain',
    pic: require('../../assets/alembicimages/smile/nopainnotselected.png'),
  },
];

function Smilee({ selected, setSelected, disable }) {
  const { survey } = useSelector(state => state.DCR)

  React.useEffect(() => {
    if (survey["Question3"].Answer == 'Very Satisfied') {
      setSelected(1)
    }
    else if (survey["Question3"].Answer == 'Satisfied') {
      setSelected(2)
    }
    else if (survey["Question3"].Answer == 'Neutral') {
      setSelected(3)
    }
    else if (survey["Question3"].Answer == 'Unsatisfied') {
      setSelected(4)
    }
    else if (survey["Question3"].Answer == 'Very Unsatisfied') {
      setSelected(5)
    }
  }, [])

  const handleAddEmoji = (value) => {
    let body = {
      "Question": "How was doctor's reponse towards the presentation?",
      "Answer": value
    }
    store.dispatch({ type: 'ADD_SURVEY', payload: ["Question3", body] })
  }

  return (
    <>
      <View style={{ ...styles.mainContainerCss }}>
        <View
          style={{
            ...styles.subContainerCss,
            height: 'auto'
          }}>
          <View
            style={{
              ...styles.View_Container_Css,
            }}>
            <TouchableOpacity
              testID={`Smilee-${selected}`}
              disabled={disable}
              onPress={() => { setSelected(1); handleAddEmoji('Very Satisfied') }}
              activeOpacity={1}
            >
              {selected == 1 ? (
                <Image
                  style={styles.LogoBottom}
                  resizeMode={'contain'}
                  source={require('../../assets/alembicimages/smile/nopainselected.png')}
                />
              ) : (
                <Image
                  style={styles.LogoBottom}
                  resizeMode={'contain'}
                  source={require('../../assets/alembicimages/smile/nopainnotselected.png')}
                />
              )}
              <Text style={{ ...styles.texts }}>Very Satisfied</Text>
            </TouchableOpacity>
            <TouchableOpacity
              disabled={disable}
              onPress={() => { setSelected(2); handleAddEmoji('Satisfied') }}
              activeOpacity={1}
            >
              {selected == 2 ? (
                <Image
                  style={styles.LogoBottom}
                  resizeMode={'contain'}
                  source={require('../../assets/alembicimages/smile/mildselected.png')}
                />
              ) : (
                <Image
                  style={styles.LogoBottom}
                  resizeMode={'contain'}
                  source={require('../../assets/alembicimages/smile/mildnotselected.png')}
                />
              )}
              <Text style={{ ...styles.texts }}>Satisfied</Text>
            </TouchableOpacity>
            <TouchableOpacity
              disabled={disable}
              onPress={() => { setSelected(3); handleAddEmoji('Neutral') }}
              activeOpacity={1}

            >
              {selected == 3 ? (
                <Image
                  style={styles.LogoBottom}
                  resizeMode={'contain'}
                  source={require('../../assets/alembicimages/smile/moderateselected.png')}
                />
              ) : (
                <Image
                  style={styles.LogoBottom}
                  resizeMode={'contain'}
                  source={require('../../assets/alembicimages/smile/moderatenotselected.png')}
                />
              )}
              <Text style={{ ...styles.texts }}>Neutral</Text>
            </TouchableOpacity>

            <TouchableOpacity
              disabled={disable}
              onPress={() => { setSelected(4); handleAddEmoji('Unsatisfied') }}
              activeOpacity={1}
            >
              {selected == 4 ? (
                <Image
                  style={styles.LogoBottom}
                  resizeMode={'contain'}
                  source={require('../../assets/alembicimages/smile/verysevereselected.png')}
                />
              ) : (
                <Image
                  style={styles.LogoBottom}
                  resizeMode={'contain'}
                  source={require('../../assets/alembicimages/smile/veryseverenotselected.png')}
                />
              )}
              <Text style={{ ...styles.texts }}>Unsatisfied</Text>
            </TouchableOpacity>

            <TouchableOpacity
              disabled={disable}
              onPress={() => { setSelected(5); handleAddEmoji('Very Unsatisfied') }}
              activeOpacity={1}
            >
              {selected == 5 ? (
                <Image
                  style={styles.LogoBottom}
                  resizeMode={'contain'}
                  source={require('../../assets/alembicimages/smile/worstpainselected.png')}
                />
              ) : (
                <Image
                  style={styles.LogoBottom}
                  resizeMode={'contain'}
                  source={require('../../assets/alembicimages/smile/worstpainnotselected.png')}
                />
              )}
              <Text style={{ ...styles.texts }}>Very Unsatisfied</Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              ...styles.Emoji_Text_Css,
            }}>
          </View>
        </View>
      </View>
    </>
  );
}

export default function Emoji({ selected, setSelected, onPress, dcrReview, disable }) {

  return (
    <>
      <FlatList
        data={data3}
        scrollEnabled={true}
        renderItem={({ item }) => <Smilee dcrReview={dcrReview} onPress={onPress} selected={selected} setSelected={setSelected} disable={disable} />}
        keyExtractor={item => item.id}
      />
    </>
  );
}
const styles = StyleSheet.create({
  texts: {
    fontSize: 12,
    color: 'black',
    fontFamily: FontFamily.TTCommonsMedium
  },
  circlesmile: {
    width: 43,
    height: 43,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
  item: {
    borderRadius: 10,
    width: width * 0.9,
    overflow: 'hidden',
    backgroundColor: '#ecf9fb',
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.1)',
  },

  LogoBottom: {
    width: 43,
    height: 43,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  mainContainerCss: {
    flex: 1,
    justifyContent: 'center',
  },
  subContainerCss: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  View_Container_Css: {
    flexDirection: 'row',
    width: '92%',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 'auto'
  },
  Emoji_Text_Css: {
    flexDirection: 'row',
    width: '92%',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
  },
});
