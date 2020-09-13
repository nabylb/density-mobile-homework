import React, {useState, useEffect} from 'react';
import axios from 'axios';

const useSocket = (url: string) => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    axios.defaults.baseURL = 'https://api.density.io/v2/sockets';
    axios.defaults.headers.common['Authorization'] =
      'Bearer tok_KOcggRz4zULjCXCLHUkmRamnv1KLNnSxEzhTUDpqswL';

    setIsLoading(true);

    axios({
      method: 'post',
    })
      .then(function (response) {
        var ws = new WebSocket(response.data.url);

        // TODO: Auth Errors
        //     400 Bad Request
        // The request sent to the API is invalid. Additional information will be returned in the response body.

        // 403 Forbidden
        // The client is not allowed to perform this request. Can be caused by a missing or invalid API token.

        // 404 Not Found
        // The requested resource does not exist.

        // 409 Conflict
        // The request conflicts with another request.

        // TODO: Time formatting

        // TODO: Pagination: 200

        // TODO: Close the connection when goes to the background

        // TODO: Put data in Redux and persist to local storage???

        //TODO: Read from local storage.

        // TODO: Hide key

        // Animate new rooms addition

        // Add last timestamp
        ws.onopen = () => {
          // connection opened
          ws.send('something'); // send a message
        };

        ws.onmessage = (e) => {
          // a message was received
          setIsLoading(false);
          setData(e.data);
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
  }, []);

  return {data, error, isLoading};
};

export default useSocket;
