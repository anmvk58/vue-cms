import axios from "axios";
import interceptor from "@/plugins/axios/interceptor";

const http = axios.create({
  // baseURL: process.env.VUE_APP_API_BASE_URL,
  // baseURL: "http://qrmkt-cms-api.dev.icheck.vn/qr-mkt-cms/api/v1/",
  baseURL: "https://petkingdom-cms.thiendia.site/cms/api/v1/",

  withCredentials: false,
  headers: {
    Accept: "application/json",
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin' : '*',
  },
});

interceptor.configResponse([http])
interceptor.configRequest([http])

export {
  http
}
