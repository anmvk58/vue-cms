import router from "@/router";
// import VueRouter from 'vue-router'
// const { isNavigationFailure, NavigationFailureType } = VueRouter

function configRequest(instance) {
  instance.forEach((obj) => {
    obj.interceptors.request.use(
      function (config) {
        const token = localStorage.getItem("Access-Token");
        if (token) {
          config.headers.Authorization = "Bearer " + token;
        }
        console.log(config.headers);
        return config;
      },
      function (err) {
        return Promise.reject(err);
      }
    );
  })
}

function configResponse(instance) {
  instance.forEach((obj) => {
    obj.interceptors.response.use(
      (response) => {
        return response.data;
      },
      (error) => {
        if (error.response) {
          if (
            (error.response.status === 401 ||
              error.response.status === 403)
            &&
            router.path !== '/login'
          ) {
            localStorage.clear()
            return router.replace({name: "Login"}).catch((err) => {
              return Promise.reject({
                code: 99,
                message: "Hết phiên đăng nhập, vui lòng đăng nhập lại!"
              })
            })
          }
          return Promise.reject(error.response.data);
        }
      }
    );
  })
}

export default {
  configRequest,
  configResponse,
};
