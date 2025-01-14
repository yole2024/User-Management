import baseService from "./baseService";

interface UserLoginReq {
    username: string;
    password: string;
}

export const userLoginService = async (data: UserLoginReq) => {
    const url = `/api/auth/login`;
    return await baseService(url, "post", data);
  };