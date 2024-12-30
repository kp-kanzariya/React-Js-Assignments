import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Colors} from '../../assets/config/Colors';
import {DashboardButton} from './DashboardButton';

export default function DashboardButtonGrid(props) {
  const dispatch = useDispatch();
  const [buttonData, setButtonData] = React.useState([]);
  const {configuration} = useSelector(state => state.systemConfig);
  const [temp, setTemp] = React.useState(false);
  const {teamList} = useSelector(state => state.teamUnderData);
  const {isMobile} = useSelector(state => state.isLandscape);

  let fetchTeam = useSelector(state => state.teamUnderData);

  // console.log('qqqqqqqqqqqqqqqqq', configuration?.['enable_lead_module'])

  React.useEffect(() => {
    let arr = [];
    dispatch({type: 'REMOVE_BRAND_OUTLET_Org_ID_BY_FILTER'});
    console.log(
      "configuration?.['enable_offers_and_schemes_module']",
      configuration?.['enable_offers_and_schemes_module'],
    );
    if (props.showOn == 'Dashboard') {
      arr.push({
        bgcolor: Colors.MRSTARTMYDAY,
        iconimg: require('../../assets/alembicimages/customer.png'),
        title: 'Customers',
        navigateTo: 'Customer',
        navigateFrom: 'Dashboard',
        canAccessWithoutInternet: false,
        badge: {status: false, count: ''},
        data: {},
      });
    }

    if (props.showOn == 'Dashboard') {
      arr.push({
        bgcolor: Colors.MRSTARTMYDAY,
        iconimg: require('../../assets/alembicimages/dashboard/expense.png'),
        title: 'Expense',
        navigateTo: 'Expense',
        navigateFrom: '',
        canAccessWithoutInternet: true,
        badge: {status: false, count: ''},
        data: {},
      });
    }
    if (props.showOn == 'Dashboard') {
      arr.push({
        bgcolor: Colors.MRSTARTMYDAY,
        iconimg: require('../../assets/alembicimages/dashboard/leave.png'),
        title: 'Leaves',
        navigateTo:
          teamList?.length > 0 ? 'LeaveManagerDashboard' : 'LeaveDashboard',
        navigateFrom: 'action',
        canAccessWithoutInternet: false,
        badge: {status: false, count: 5},
        data: {},
      });
    }

    if (props.showOn == 'Dashboard') {
      arr.push({
        bgcolor: Colors.MRSTARTMYDAY,
        iconimg: require('../../assets/alembicimages/dashboard/catalogue.png'),
        title: 'Documents',
        navigateTo: 'Material',
        navigateFrom: 'Dashboard',
        canAccessWithoutInternet: false,
        badge: {status: false, count: ''},
        data: {},
      });
    }
    if (props.showOn == 'Dashboard') {
      arr.push({
        bgcolor: Colors.MRSTARTMYDAY,
        iconimg: require('../../assets/alembicimages/dashboard/mtp.png'),
        title: 'MTP',
        navigateTo: 'Mtp',
        navigateFrom: 'Dashboard',
        canAccessWithoutInternet: false,
        badge: {status: false, count: ''},
        data: {},
      });
    }

    if (
      !isMobile &&
      props.showOn == 'DoctorView' &&
      configuration?.['e_detailing']
    ) {
      if (props.isDisable && props.permission) {
        arr.push({
          bgcolor: Colors.MRSTARTMYDAY,
          iconimg: require('../../assets/alembicimages/dashboard/edetailing.png'),
          title: 'E-Detailing',
          navigateTo: 'E_DetailingModal',
          navigateFrom: 'doctorViewdisable',
          canAccessWithoutInternet: true,
          badge: {status: false, count: ''},
          data: props.data,
        });
      } else if (props.permission && configuration?.['e_detailing']) {
        arr.push({
          bgcolor: Colors.MRSTARTMYDAY,
          iconimg: require('../../assets/alembicimages/dashboard/edetailing.png'),
          title: 'E-Detailing',
          navigateTo: 'E_DetailingModal',
          navigateFrom: 'doctorViewEnable',
          canAccessWithoutInternet: true,
          badge: {status: false, count: ''},
          data: props.data,
        });
      }
    }

    if (
      !isMobile &&
      props.showOn == 'Dashboard' &&
      configuration?.['e_detailing']
    ) {
      arr.push({
        bgcolor: Colors.MRSTARTMYDAY,
        iconimg: require('../../assets/alembicimages/dashboard/edetailing.png'),
        title: 'E-Detailing',
        navigateTo: 'E-Detailing',
        navigateFrom: 'doctorViewEnable',
        canAccessWithoutInternet: true,
        badge: {status: false, count: ''},
        data: props.data,
      });
    }

    if (props.showOn == 'Dashboard') {
      arr.push({
        bgcolor: Colors.MRSTARTMYDAY,
        iconimg: require('../../assets/alembicimages/dashboard/report.png'),
        title: 'Reports',
        navigateTo: 'Reports',
        navigateFrom: 'action',
        canAccessWithoutInternet: false,
        badge: {status: false, count: ''},
        data: {},
      });
    }
    if (props.showOn == 'DoctorView') {
      if (props.isDisable) {
        arr.push({
          bgcolor: Colors.MRSTARTMYDAY,
          iconimg: require('../../assets/alembicimages/dashboard/leave.png'),
          title: 'Reschedule',
          navigateTo: 'ResheduleModal',
          navigateFrom: 'doctorViewdisable',
          canAccessWithoutInternet: false,
          badge: {status: false, count: ''},
          data: props?.data,
        });
      } else {
        arr.push({
          bgcolor: Colors.MRSTARTMYDAY,
          iconimg: require('../../assets/alembicimages/dashboard/leave.png'),
          title: 'Reschedule',
          navigateTo: 'ResheduleModal',
          navigateFrom: 'doctorViewEnable',
          canAccessWithoutInternet: false,
          badge: {status: false, count: ''},
          data: props?.data,
        });
      }
    }
    if (props.showOn == 'DoctorView') {
      if (props.isDisable) {
        arr.push({
          bgcolor: Colors.MRSTARTMYDAY,
          iconimg: require('../../assets/alembicimages/doctor360/skip.png'),
          title: 'Skip Visit',
          navigateTo: 'SkipVisitModal',
          navigateFrom: 'doctorViewdisable',
          canAccessWithoutInternet: false,
          badge: {status: false, count: ''},
          data: props?.data,
        });
        arr.push({
          bgcolor: Colors.MRSTARTMYDAY,
          iconimg: require('../../assets/alembicimages/doctor360/survey.png'),
          title: 'Survey',
          navigateTo: 'SurveyCategory',
          navigateFrom: 'doctorViewdisable',
          canAccessWithoutInternet: false,
          badge: {status: false, count: ''},
          data: props?.data,
        });
      } else {
        // alert(JSON.stringify(props.data))
        arr.push({
          bgcolor: Colors.MRSTARTMYDAY,
          iconimg: require('../../assets/alembicimages/doctor360/skip.png'),
          title: 'Skip Visit',
          navigateTo: 'SkipVisitModal',
          navigateFrom: 'doctorViewEnable',
          canAccessWithoutInternet: false,
          badge: {status: false, count: ''},
          data: props?.data,
        });
        arr.push({
          bgcolor: Colors.MRSTARTMYDAY,
          iconimg: require('../../assets/alembicimages/doctor360/survey.png'),
          title: 'Survey',
          navigateTo: 'SurveyCategory',
          navigateFrom: 'doctorViewEnable',
          canAccessWithoutInternet: false,
          badge: {status: false, count: ''},
          data: props?.data,
        });
        if (configuration?.['capture_closing_stock']) {
          arr.push({
            bgcolor: Colors.MRSTARTMYDAY,
            iconimg: require('../../assets/alembicimages/doctor360/survey.png'),
            title: 'Liquidation',
            navigateTo: 'ClosingStock',
            navigateFrom: 'doctorViewEnable',
            canAccessWithoutInternet: false,
            badge: {status: false, count: ''},
            data: props?.data,
          });
        }
      }
    }

    if (props.showOn == 'Dashboard') {
      arr.push({
        bgcolor: Colors.MRSTARTMYDAY,
        iconimg: require('../../assets/alembicimages/dashboard/inputinventory.png'),
        title: 'Input Inventory',
        navigateTo: 'InputInventory',
        navigateFrom: 'Dashboard',
        canAccessWithoutInternet: false,
        badge: {status: false, count: ''},
      });
    }
    if (
      props.showOn == 'Dashboard' &&
      configuration?.['enable_offers_and_schemes_module']
    ) {
      arr.push({
        bgcolor: Colors.MRSTARTMYDAY,
        iconimg: require('../../assets/alembicimages/dashboard/inputinventory.png'),
        title: 'Offers & Promotion',
        navigateTo: 'OffersPromotion',
        navigateFrom: 'Dashboard',
        canAccessWithoutInternet: false,
        badge: {status: false, count: ''},
      });
    }
    if (props.showOn == 'Dashboard' && configuration?.['enable_lead_module']) {
      arr.push({
        bgcolor: Colors.MRSTARTMYDAY,
        iconimg: require('../../assets/alembicimages/rx.png'),
        title: 'Rx Tracking',
        navigateTo: 'AllTrackingView',
        navigateFrom: 'Dashboard',
        canAccessWithoutInternet: false,
        badge: {status: false, count: props.tracking || 0},
      });
    }
    if (props.showOn == 'Dashboard' && fetchTeam?.teamList?.length > 0) {
      arr.push({
        bgcolor: Colors.MRSTARTMYDAY,
        iconimg: require('../../assets/alembicimages/customer.png'),
        title: 'My Team',
        navigateTo: 'Team',
        navigateFrom: 'Dashboard',
        canAccessWithoutInternet: false,
        badge: {status: false, count: ''},
        data: {},
      });
    }
    if (
      props.showOn == 'Dashboard' &&
      configuration?.['enable_JWFeedback'] &&
      fetchTeam?.teamList?.length > 0
    ) {
      arr.push({
        bgcolor: Colors.MRSTARTMYDAY,
        iconimg: require('../../assets/alembicimages/customer.png'),
        title: 'Feedback',
        navigateTo: 'Feedback',
        navigateFrom: 'Dashboard',
        canAccessWithoutInternet: false,
        badge: {status: true, count: 5},
        data: {},
      });
    }
    setButtonData(arr);
    setTemp(true);
  }, [temp, fetchTeam?.teamList?.length]);

  return (
    <>
      {temp && (
        <View
          testID={props.testID || 'GridCardsContainer'}
          style={{
            ...styles.GridCards,
            width: '100%',
            justifyContent: 'flex-start',
          }}>
          {buttonData.map((item, indx) => (
            <DashboardButton
              testID={`DashboardButton_${indx}`} // Unique testID for each button
              badgeData={props.badgeData}
              endDayButton={props.endDayButton}
              canViewAgenda={props.canViewAgenda}
              setRefreshButton={props.setRefreshButton}
              refreshButton={props.refreshButton}
              key={indx}
              {...item}
              setRefreshOutletStatus={props.setRefreshOutletStatus}
              refreshOutletStatus={props.refreshOutletStatus}
              tracking={props.tracking || 0}
            />
          ))}
        </View>
      )}
    </>
  );
}

DashboardButtonGrid.defaultProps = {
  testID: 'ButtonGrid',
};

const styles = StyleSheet.create({
  GridCards: {
    width: '92%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    // backgroundColor:'green',
    // padding:5,
    // marginVertical: 8,
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
  },
  containerRes: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    width: '92%',
    alignSelf: 'center',
    height: 'auto',
    alignItems: 'flex-start',
  },
  responsiveBoxButtonGrid: {
    width: '98%',
    alignSelf: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },

  VIKS: {
    // flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: '1.1rem',
    alignSelf: 'center',
    width: '98%',
    justifyContent: 'space-between',
    // flexBasis: '50%' ,
  },
});
