import axios from "axios";
import useAuth from "./useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const instance = axios.create({
  baseURL: "https://neobill-server.vercel.app/",
});

const useAxiosSecure = () => {
  const { user, LogOut } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    // request interceptor
    const requestInterceptor = instance.interceptors.request.use((config) => {
      config.headers.authorization = `Bearer ${user.accessToken}`;
      return config;
    });
    // response interceptors
    const responsiveInterceptor = instance.interceptors.response.use(
      (res) => {
        return res;
      },
      (err) => {
        const status = err.status;
        if (status === 401 || status === 403) {
          LogOut().then(() => {
            navigate("/login");
          });
        }
      }
    );

    return () => {
      instance.interceptors.request.eject(requestInterceptor);
      instance.interceptors.response.eject(responsiveInterceptor);
    };
  }, [user, LogOut, navigate]);

  return instance;
};
export default useAxiosSecure;
