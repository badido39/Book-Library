import axios, { AxiosResponse } from 'axios';

const BASE_API_URL = 'http://localhost:3000';

class HttpMethods {
  // ------------------GET------------------//

  Get = async (endPoint: string, headers?: Record<string, unknown>) => {
    const result = await axios
      .get(BASE_API_URL + endPoint, headers)
      .then((res: AxiosResponse) => {
        return res.data;
      })
      .catch((e: AxiosResponse) => {
        return e.data;
      });
    return result;
  };
  // ------------------POST------------------//

  Post = async (
    endPoint: string,
    headers?: Record<string, unknown>,
    payload: Record<string, unknown>
  ) => {
    const result = await axios
      .post(BASE_API_URL + endPoint, payload, headers)
      .then((res: AxiosResponse) => {
        return res.data;
      })
      .catch((e: AxiosResponse) => {
        return e.data;
      });
    return result;
  };
}
export default HttpMethods;
