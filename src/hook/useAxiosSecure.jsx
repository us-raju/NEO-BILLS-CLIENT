import axios from "axios";
import useAuth from "./useAuth";
import { useEffect } from "react";

const instance = axios.create({
  baseURL: "http://localhost:5000",
});

const useAxiosSecure = () => {
  const { user } = useAuth();
  useEffect(() => {
    // request interceptor
    const requestInterceptor = instance.interceptors.request.use((config) => {
      config.headers.authorization = `Bearer ${user.accessToken}`;
      return config;
    });

    // response interceptors
    // const responsiveInterceptor = instance.interceptors.response.use(
    //   (res) => {
    //     return res;
    //   },
    //   (err) => {
    //     const status = err.status;
    //     if (status === 401 || status === 403) {
    //       console.log("logout for bad request");
    //     }
    //   }
    // );

    return () => {
      instance.interceptors.request.eject(requestInterceptor);
    };
  }, [user]);

  return instance;
};
export default useAxiosSecure;
