import { View, Text } from 'react-native';
import React from 'react';
// import { Rating } from 'react-native-ratings';
import StarRating from 'react-native-star-rating';

import { Colors } from '../../assets/config/Colors';
import { store } from '../../redux/store';
import { useSelector } from 'react-redux';
import { appendTextToFile } from '../../helper/utils/Logger';

export default function StarRating1(props) {
  const { survey } = useSelector(state => state.DCR)


  const ratingCompleted = rating => {
    // alert('hi')
    try {
      let body = {
        "Question": "Rate as per overall doctor's interest towards the products",
        "Answer": rating
      }
      store.dispatch({ type: 'ADD_SURVEY', payload: ["Question2", body] })
    } catch (err) {
      console.error("Rating in Rating", err)
      appendTextToFile({
        text: `Error in catch fun ratingCompleted inside Rating Line 26 ${err}`,
        headerDate: store?.getState().header.headerDate
      });
    }

  };

  return (

    // <StarRating
    //   type="star"
    //   ratingColor={Colors.MRGREEN}
    //   ratingBackgroundColor={Colors.MRGREEN}
    //   ratingCount={5}
    //   // startingValue={ survey["Question2"]?.Answer != '' ? survey["Question2"].Answer:0 }
    //   startingValue={ survey["Question2"]?.Answer != '' ? survey["Question2"].Answer:0 }

    //   imageSize={30}
    //   onFinishRating={(rating)=>ratingCompleted(rating)}
    //   style={{ paddingVertical: 10, alignSelf: 'flex-start', left: 10,}}
    // />

    <StarRating
      testID={'startRating'}
      disabled={props?.navigateFrom == "LastScreen" ? true : false}
      containerStyle={{ width: 100, left: 10, paddingVertical: 5 }}
      starSize={25}
      maxStars={5}
      rating={survey["Question2"]?.Answer != '' ? survey["Question2"].Answer : 0}
      selectedStar={(rating) => ratingCompleted(rating)}
      fullStarColor={Colors.MRGREEN}
      buttonStyle={{ margin: 2 }}
      animation
    />

  );
}
