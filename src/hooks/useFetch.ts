import {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import _ from 'lodash';

axios.defaults.baseURL = 'https://api.density.io/v2';
axios.defaults.headers.common['Authorization'] =
  'Bearer tok_KOcggRz4zULjCXCLHUkmRamnv1KLNnSxEzhTUDpqswL';

const useFetch = () => {
  const [data, setData] = useState<any>(null);
  const [event, setEvent] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const shouldLoadSpacesList = async () => {
      const spaces = await AsyncStorage.getItem('persist:density');
      if (
        !spaces ||
        (spaces && _.isEmpty(JSON.parse(JSON.parse(spaces).spaces).spaces))
      ) {
        fetch();
      } else {
        websocket();
      }
    };

    shouldLoadSpacesList();
  }, []);

  const fetch = () => {
    setIsLoading(true);

    axios({
      method: 'get',
      url: '/spaces/',
    })
      .then(function (response) {
        // Save spaces list with initial counts to Redux
        setIsLoading(false);
        setData(response.data.results);
        websocket();
      })
      .catch((error) => {
        setError(error.message);
        console.log(error.message);
        setIsLoading(false);
      });
  };

  const websocket = () => {
    axios({
      method: 'post',
      url: '/sockets/',
    })
      .then(function (response) {
        var ws = new WebSocket(response.data.url);
        ws.onopen = () => {
          // connection opened
          ws.send('something'); // send a message
        };

        ws.onmessage = (e) => {
          // a message was received
          setEvent(e.data);
          console.log(e.data);
        };

        ws.onerror = (e) => {
          // an error occurred
          setError(e.message);
          console.log(e.message);
        };

        ws.onclose = (e) => {
          // connection closed
          console.log(e.code, e.reason);
        };
      })
      .catch((error) => {
        setError(error.message);
        console.log(error.message);
      });
  };

  return {data, event, error, isLoading, refetch: fetch, setError};
};

export default useFetch;
