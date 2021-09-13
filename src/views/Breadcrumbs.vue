<template>
  <div class="app flex-row align-items-center backgound-login">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="8">
          <b-card-group>
            <b-card no-body class="p-4">
              <b-card-body>
                <b-form>
                  <h1>Đăng nhập</h1>
                  <p class="text-muted">Nhập tài khoản của bạn</p>
                  <b-input-group class="mb-3">
                    <b-input-group-prepend><b-input-group-text><i class="icon-user"></i></b-input-group-text></b-input-group-prepend>
                    <b-form-input type="text"
                                  class="form-control"
                                  placeholder="Username"
                                  autocomplete="username email"
                                  v-model="email"
                                  @keydown.enter="login"/>
                  </b-input-group>
                  <b-input-group class="mb-4">
                    <b-input-group-prepend><b-input-group-text><i class="icon-lock"></i></b-input-group-text></b-input-group-prepend>
                    <b-form-input type="password"
                                  class="form-control"
                                  placeholder="Password"
                                  autocomplete="current-password"
                                  v-model="password"
                                  @keydown.enter="login"/>
                  </b-input-group>
                  <b-row>
                    <b-col cols="4">
                      <b-button variant="primary" class="px-4" @click="login">Đăng nhập</b-button>
                    </b-col>
                    <b-col cols="4" class="text-right">
                      <!--                      <b-button variant="link" class="px-0">Quên mật khẩu?</b-button>-->
                    </b-col>
                    <b-col cols="4" class="text-right">
                      <!--                      <b-button variant="link" class="px-0" @click="$router.push('/pages/request/otp')">Đăng nhập bằng mã OTP</b-button>-->
                    </b-col>
                  </b-row>
                </b-form>
              </b-card-body>
            </b-card>
          </b-card-group>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
export default{
  data() {
    return {
      isLoading: false,
      email: "",
      password: ""
    };
  },

  methods: {
    login(){
      console.log("123")
    }
  }
}
</script>
