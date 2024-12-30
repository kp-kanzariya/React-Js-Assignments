import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { FontFamily } from '../../assets/fonts/FontFamily';
import ButtonRoot from '../shared/buttons/ButtonRoot';
import Input from '../shared/textinputs/Input';
import InteralNotesDao from '../../Database/DAO/InteralNotesDao';
import moment from 'moment';
import { getEmployeeId } from '../../api/commonRepository';
import { Colors } from '../../assets/config/Colors';

const NoteComp = props => {
  const [Note, setNote] = React.useState('');
  const [NoteTitle, setNoteTitle] = React.useState('');
  const submitNotes = async () => {
    let NoteDate = moment().format('YYYY-MM-DD');
    let employee_id = await getEmployeeId();
    await InteralNotesDao.submitInternalNotes({
      Note,
      NoteTitle,
      NoteDate,
      Orgunitid: props.doctorViewProp.item.OrgUnitId,
      OutletOrgDataId: props.doctorViewProp.item.OutletOrgId,
      CompanyId: props.doctorViewProp.item.CompanyId,
      EmployeeId: employee_id
    });
    props.setShowModal(false);
    props.setRefresh(!props.refresh)
  };
  return (
    <View>
      <View style={{ ...styles.heading_text_container }}>
        <Text style={{ ...styles.heading_text }}>Note</Text>
      </View>
      <View style={{ ...styles.input_cont }}>
        <Input
          placeholder="Note Title"
          onChangeText={txt => setNoteTitle(txt)}
          width="100%"
          // HeightInputBox={45}
          height={45}
          borderRadius={7}
          backgroundColor={Colors.Textinputbg}
          placeholderColor={Colors.grey}
          TextTop='center'
          multiline={true}
          TOPS={10}
        />
      </View>
      <View style={{ ...styles.input_cont }}>
        <Input
          placeholder="Note"
          onChangeText={txt => setNote(txt)}
          width="100%"
          HeightInputBox={65}
          height={65}
          borderRadius={7}
          backgroundColor={Colors.Textinputbg}
          placeholderColor={Colors.grey}
          multiline={true}
          TOPS={5}
        />
      </View>
      <View style={{ ...styles.btn_cont }}>
        <View style={{}}>
          <ButtonRoot
            color="#50b030"
            width={100}
            height={40}
            borderRadius={10}
            fontSize={14}
            isdisable={(Note.length >= 3 && NoteTitle.length >= 3) ? false:true}
            onPress={() => submitNotes()}
          />
        </View>
        <View style={{ marginLeft: 15 }}>
          <Text style={{ fontFamily: FontFamily.TTCommonsMedium, fontSize: 14 }} onPress={() => props.setShowModal(false)}>Cancel</Text>
        </View>
      </View>
    </View>
  );
};

export default NoteComp;

const styles = StyleSheet.create({
  heading_text: {
    fontFamily: FontFamily.TTCommonsBold,
    color: '#000000',
    fontSize: 17,
  },
  heading_text_container: {
    width: '100%',
    padding: 5,
  },
  input_cont: {
    width: '100%',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  btn_cont: {
    marginTop: 15,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
