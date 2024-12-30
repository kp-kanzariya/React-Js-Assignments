import React from 'react';
import StarRating from 'react-native-star-rating';
import { Colors } from '../../assets/config/Colors';

export default function SurveyRating({onPress, setRating, rating}) { 
  
  const ratingCompleted = rating => {
    setRating(rating)
    onPress(rating)
  };

  return (
    <>
      <StarRating
        disabled={false}
        maxStars={5}
        rating={rating}
        selectedStar={(rating) => ratingCompleted(rating)}
        fullStarColor={Colors.MRGREEN}
        buttonStyle={{margin:2}}
      />
    </>
  );
}

