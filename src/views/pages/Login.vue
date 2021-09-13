<template>
  <div class="auth login">
    <div class="logo d-flex justify-center align-center"></div>
    <div class="form-login">
      <div class="title text-center">Đăng nhập</div>
      <a-form-model :model="form" :rules="rules" ref="form" class="form-wrap">
        <a-form-model-item prop="username" ref="username" class="form-item">
          <a-input
            size="large"
            placeholder="Email, Số điện thoại"
            v-model.trim="form.username"
            class="no-radius"
          >
            <a-tooltip slot="suffix">
              <a-icon type="user" />
            </a-tooltip
            >
          </a-input>
        </a-form-model-item>
        <a-form-model-item
          prop="password"
          ref="password"
          class="form-item form-item-pw"
        >
          <a-input-password
            placeholder="Mật khẩu"
            size="large"
            v-model.trim="form.password"
            class="no-radius"
          ></a-input-password>
        </a-form-model-item>
        <a-form-model-item class="form-item form-item-pw">
          <div class="d-flex justify-between align-center">
            <a-checkbox v-model="form.remember" style="font-size: 13px">
              Duy trì đăng nhập
            </a-checkbox>
            <router-link to="/login" style="font-size: 13px"
            >Quên mật khẩu?
            </router-link
            >
          </div>
        </a-form-model-item>
        <a-form-model-item class="form-item form-item-submit">
          <div class="d-flex justify-end">
            <a-button type="primary" class="no-radius" htmlType="submit" @click="submitForm(form)"
                      :loading="loadingForm"
            >Đăng nhập
            </a-button
            >
          </div>
        </a-form-model-item>
      </a-form-model>
    </div>
  </div>
</template>

<script>
import {notify} from "@/helpers/notify";
import AuthService from "@/services/app/auth.service"

export default {
  name: "Login",
  data() {
    return {
      form: {
        username: "",
        password: "",
        remember: false,
      },
      loadingForm: false,
      rules: {
        username: [
          {
            required: true,
            message: "Tên đăng nhập không để trống",
            trigger: "change",
          }
        ],
        password: [
          {
            required: true,
            message: "Mật khẩu không để trống",
            trigger: "change",
          }
        ]
      }
    }
  },

  methods: {
    //Check before call api Backend
    submitForm(form){
      this.$refs.form.validate((valid) => {
        if(valid){
          this.onSubmit(form)
        }else {
          notify('warning', 'Cảnh báo !', 'Vui lòng nhập đầy đủ thông tin bắt buộc')
        }
      })
    },

    //This function allow call login method backend
    onSubmit(form){
      let body = {
        userName: form.username,
        password: form.password,
      };
      this.loadingForm =  true;
      AuthService.login(body)
        .then((res) => {
          console.log(res);
            if(res.code === 1){
              localStorage.setItem("Access-Token", res.data.token);
              localStorage.setItem("Token-Expire", res.data.expiredTime);
              localStorage.setItem("User-Info", JSON.stringify(res.data.userInfo))
              localStorage.setItem("Active-Link", JSON.stringify(res.data.activeComponent))
              notify('success', 'Thành công', 'Đăng nhập thành công')
              setTimeout(() => {
                this.$router.push("/");
              }, 1500);
            } else {
              notify('warning', 'Có lỗi xảy ra', res.message || 'Vui lòng thử lại')
            }
            this.loadingForm = false;
          }).catch((err) => {
              notify("error", "Đăng nhập thất bại", err.message);
              this.loadingForm = false;
            })
    }
  }
}
</script>

<style lang="scss">
.auth {
  height: 100%;
  background-color: #0a709c;
  height: 100vh;

  .logo {
    height: 30%;
    //background-image: url("../../../assets/images/ic_logo.png");
    background-position: center;
    background-repeat: no-repeat;
  }

  .form-login {
    width: 360px;
    margin: auto;
    background-color: #fff;
    padding: 30px;

    .title {
      color: #199ed8;
      font-weight: 500;
      margin-bottom: 20px;
      font-size: 13px;
    }

    .form-wrap {
      .form-item {
        input {
          font-size: 13px;
        }
      }
    }
  }
}
</style>
