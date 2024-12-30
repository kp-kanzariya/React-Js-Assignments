import {
  View,
  Dimensions,
  TextInput,
  StyleSheet
} from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import { Colors } from '../../../assets/config/Colors';
import { FlatListSortBy, FlatListTeamMember } from '../../../screens/Surveyv/Sorting/SortAndFilter';
import Label from '../Label';
import Smilee from '../../../components/Emoji/Emoji'
import StarRating from '../../rating/Rating';
import { FontFamily } from '../../../assets/fonts/FontFamily';
import { useSelector } from 'react-redux';
import { MyThemeClass } from '../Theme/ThemeDarkLightColor';

const { width, height } = Dimensions.get('window');

export default function DcrServeyComp() {

  let survey_Ques_Ans = useSelector(state => state.DCRsurvey)

  const { isLandscape } = useSelector(state => state.isLandscape);
  const themecolor = new MyThemeClass(mode).getThemeColor();
  const mode = useSelector(state => state.mode);

  const [selected, setSelected] = useState(survey_Ques_Ans.smileeAns);
  const [checked, setChecked] = React.useState(survey_Ques_Ans.attentionAns);
  const [checkedTeamMember, setCheckedTeamMember] = React.useState(survey_Ques_Ans.teamMemberAns);
  const [rating, setRating] = useState(survey_Ques_Ans.rateAns)
  const [getRemarkInput, setRemarkInput] = useState(survey_Ques_Ans.remarkAns)
  const [checkboxID, setCheckboxID] = useState(survey_Ques_Ans.teamMemberID)
  const [teamMemberData, setTeamMemberData] = useState([])
  const [teamMemberLength, setTeamMemberLength] = useState([])

  let showTeamMemQues = () => {
    let filteredData = survey_Ques_Ans.teamMemberAns.filter((item, index) => {
      return item.isChecked === true
    })
    setTeamMemberLength(filteredData)
  }

  useEffect(() => {
    showTeamMemQues()
  }, [])


  return (
    <View style={{ flex: 1, width: '100%', justifyContent: 'center', alignSelf: 'center' }}>
      <View>
        {survey_Ques_Ans.attentionQues && <View style={{ ...styles.MV3 }}>
          <View
            style={{
              ...styles.MainCardView,
              width: isLandscape ? '50%' : '100%',
            }}>
            <Label LEFT={10} Size={16} Family={FontFamily.TTCommonsMedium} Label="Does doctor given you proper attention?" />
            <FlatListSortBy checked={checked} setChecked={setChecked} onPress={() => { }} />

          </View>
        </View>}

        {survey_Ques_Ans.rateQues &&
          <View style={{ ...styles.MV3, width: '100%' }}>
            <View style={styles.MainCardView}>
              <Label LEFT={10} Size={16} Family={FontFamily.TTCommonsMedium} Label="Rate as per overall doctor's interest towards the products" />
              <View style={{ ...styles.MV3 }} />
              <StarRating setRating={setRating} rating={rating} dcrReview={true} onPress={() => { }} />
            </View>
          </View>}

        {survey_Ques_Ans.smileeQues &&
          <View style={{
            ...styles.MV3, width: '100%', backgroundColor: 'white',
            borderWidth: 0.8,
            borderRadius: 10,
            borderColor: Colors.borderColor1,
            paddingVertical: 10,
          }}>
            {/* <View > */}
            <Label LEFT={10} Size={16} Family={FontFamily.TTCommonsMedium} Label="How was doctor's reponse towards the presentation?" />
            <View style={{ ...styles.MV5 }} />
            <Smilee setSelected={setSelected} selected={selected} dcrReview={true} onPress={() => { }} />
            {/* </View> */}
          </View>}

        {teamMemberLength.length > 0 && <View style={{ ...styles.MV3, width: '100%' }}>
          <View style={styles.MainCardView}>
            <Label LEFT={10} Size={16} Family={FontFamily.TTCommonsMedium} Label="Select team member who assists you during the showcase to doctors" />
            <FlatListTeamMember teamMemberData={survey_Ques_Ans.teamMemberAns} setTeamMemberData={setTeamMemberData} checkboxID={checkboxID} checkedTeamMember={checkedTeamMember} setCheckedTeamMember={setCheckedTeamMember} onPress={() => { }} />
          </View>
        </View>}

        {survey_Ques_Ans.remarkQues && <View style={{ ...styles.MV3, width: '100%' }}>
          <View style={styles.MainCardView}>
            <Label LEFT={10} Size={16} Family={FontFamily.TTCommonsMedium} Label="Enter Doctor Remark" />

            <View
              style={{
                ...styles.InputMainView,
                borderWidth: 0.5,
                borderColor: themecolor.BOXBORDERCOLOR1,
                backgroundColor: Colors.Textinputbg,
                width: isLandscape ? '97%' : '100%',
                marginVertical: 7
              }}>
              <TextInput
                multiline={true}
                numberOfLines={3}
                textAlign="left"
                value={getRemarkInput}
                style={{ ...styles.TextInput_Css }}
                onChangeText={(txt) => setRemarkInput(txt)}
              />
            </View>
          </View>
        </View>}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  MainCardView: {
    // width: '100%',
    backgroundColor: 'white',
    borderWidth: 0.8,
    borderRadius: 10,
    borderColor: Colors.borderColor1,
    marginTop: 5,
    paddingVertical: 10,
  },
  media: {
    backgroundColor: Colors.borderColor1,
    height: 25,
    paddingHorizontal: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
  },
  type: { fontFamily: FontFamily.TTCommonsMedium, color: '#444850', fontSize: 13 },
  lastbutton: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    alignSelf: 'center',
    bottom: 20,
  },
  mainV: { flex: 1, backgroundColor: Colors.GREY2, width: '100%' },
  mainlast: { width: '96%', alignSelf: 'center', top: 10 },
  InputMainView: {
    // width: '90%',
    flexDirection: 'row',
    backgroundColor: Colors.Textinputbg,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  MainView: {
    // width: '94%',
    flexWrap: 'wrap',
    alignSelf: 'center',
    height: 'auto',
    // justifyContent: 'space-between',
  },

  mainContainer: {
    flexDirection: 'row',
    left: 40,
    width: width * 0.9,
  },
  TextInput_Css: {
    width: '100%',
    borderRadius: 15,
    left: 5,
    textAlignVertical: 'top',
    color: '#000',
  },

  ImageView_Css: {
    // backgroundColor: '#fff',
    // width: isLandscape ? '65%' : '100%',
    alignItems: 'center',
    marginTop: 15,

    right: 120,
    // position:'absolute',
    // right:0
  },

  TouchableOpacity_Css: {
    justifyContent: 'space-between',
    alignContent: 'center',
    flexDirection: 'row',
    width: width * 0.9,
  },

  CameraIcon_Css: {
    width: width * 0.1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  CamerView_Css: {
    width: width * 0.78,
    justifyContent: 'center',
  },
  MV3: { marginVertical: 3 },
  MV5: { marginVertical: 5 },
  MV8: { marginVertical: 8 },
});