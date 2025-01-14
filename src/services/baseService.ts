import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const BASE_URL = `https://server-n42x.onrender.com`

export interface BaseResponse {
    res: AxiosResponse | null;
    err: Record<string, any> | undefined;
}

const baseService = async (
    url: string,
    method: AxiosRequestConfig["method"],
    data?: any,
    headers?: any
  ): Promise<BaseResponse> => {
    const response: BaseResponse = {
      res: null,
      err: undefined,
    };

    const token = localStorage.getItem("authToken");
    try {
      response.res = await axios({
        url: BASE_URL + url,
        method: method,
        data: data,
        headers: headers || {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
      });
 
    } catch (error: any) {    
      if (axios.isAxiosError(error)) { 
        if (error.code === 'ERR_NETWORK') {
          response.err = { message: "בעיית רשת: החיבור לאינטרנט לא תקין" };
        } else {
          response.err = {
            message: error.response?.data?.error || error.message,
            status: error.response?.status,
          };
        }
      } else {
        response.err = { message: "אירעה שגיאה כללית" };
      }
    }
    return response;
  };

  export default baseService;
