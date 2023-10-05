import {StyleSheet, View} from 'react-native';
import Header from '../../components/Header';
import fetchApi from '../../utils/fetch';
import {useEffect, useState} from 'react';
import TodaysImage from '../../components/TodaysImage';
import {PostImage} from '../../types';
import {format, sub} from 'date-fns';
import LastFiveDaysImages from '../../components/LastFiveDaysImages';

const Home = () => {
  const [todaysImage, setTodaysImage] = useState<PostImage>({});
  const [lastFiveDaysImages, setLastFiveDaysImages] = useState<PostImage[]>([]);

  //fetch 1 image
  useEffect(() => {
    const loadTodaysImage = async () => {
      try {
        const todaysImageResponse = await fetchApi();
        setTodaysImage(todaysImageResponse);
      } catch (error) {
        console.error(error);
        setTodaysImage({});
      }
    };

    loadTodaysImage().catch(null);
  }, []);

  //fetch 5 images
  useEffect(() => {
    const loadLast5DaysImages = async () => {
      try {
        const date = new Date();
        const todaysDate = format(date, 'YYY-MM-dd');
        const fiveDaysAgoDate = format(sub(date, {days: 5}), 'YYY-MM-dd');
        const lastFiveDaysImagesResponse = await fetchApi(
          `&start_date=${fiveDaysAgoDate}&end_date=${todaysDate}`,
        );

        setLastFiveDaysImages(lastFiveDaysImagesResponse);
      } catch (error) {
        console.error(error);
      }
    };

    loadLast5DaysImages().catch(null);
  }, []);

  return (
    <View style={styles.container}>
      <Header />
      <TodaysImage {...todaysImage} />
      <LastFiveDaysImages postImages={lastFiveDaysImages} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
});

export default Home;
