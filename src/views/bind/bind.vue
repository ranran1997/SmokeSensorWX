<template>
  <div class="bind">
    <van-cell-group>
      <van-field type="tel" v-model="bindForm.mobile" required clearable label="手机号" placeholder="请输入手机号" :error-message="errorMsg.mobile" />
      <van-field v-model="bindForm.validate_code" center required clearable label="验证码" placeholder="请输入短信验证码" :error-message="errorMsg.validate_code">

        <van-button slot="button" size="small" type="primary" @click="getValidateCode" :disabled="sendMsgDisabled">{{smsBtnText}}</van-button>
      </van-field>
      <van-field v-model="bindForm.username" required clearable label="姓名" placeholder="请输入姓名" :error-message="errorMsg.username" />
      <van-field v-model="bindForm.shopname" required clearable label="商户名称" placeholder="请输入商户名称" :error-message="errorMsg.shopname" />
      <van-field v-model="bindForm.addr" required clearable label="地址" type="textarea" placeholder="请输入详细地址" rows="2" autosize :error-message="errorMsg.addr" />
    </van-cell-group>
    <div class="bind-button">
      <van-button size="large" type="danger" :loading="isBinding" @click="bindWx" class="btn-bind">绑定</van-button>
    </div>

  </div>
</template>

<script>
import { WxGetUser } from "@/api/wx";
import { BindUser, GetSMSValidate } from "@/api/user";
import validator from "@/libs/validator";
import { GetQueryString } from "@/libs/util";
import { mapMutations } from "vuex";
export default {
  name: "bind",
  data() {
    return {
      bindForm: {
        mobile: "",
        validate_code: "",
        username: "",
        addr: "",
        shopname: "",
        purpose: 1,
        openid: "",
        headimage: "",
        cookie_value: "",
        dutypath:""
      },
      errorMsg: {
        mobile: "",
        validate_code: "",
        username: "",
        addr: "",
        shopname: ""
      },
      rules: {
        username: [{ required: true, message: "请输入名称" }],
        mobile: [
          {
            validator: (rule, value, callback) => {
              if (!value) {
                callback("请输入手机号码");
              } else if (/^[1][0-9]{10}$/.test(value)) {
                callback();
              } else {
                callback("请输入正确的手机号码");
              }
            }
          }
        ],
        validate_code: [{ required: true, message: "请输入验证码" }],
        addr: [{ required: true, message: "请输入安装地址" }],
        shopname: [{ required: true, message: "请输入商户名称" }]
      },
      isBinding: false,
      time: 120, // 发送验证码倒计时
      sendMsgDisabled: false
    };
  },
  computed: {
    smsBtnText: function() {
      if (this.sendMsgDisabled) {
        return `${this.time}秒后获取`;
      } else {
        return "发送验证码";
      }
    }
  },
  created() {
    this.getWxUserInfo();
    this.validator = validator(this.rules, this.bindForm);
  },

  methods: {
    ...mapMutations({
      setUserInfo: "setWxUserInfo" // 将 `this.add()` 映射为 `this.$store.commit('increment')`
    }),
    async getWxUserInfo() {
      const wx_code = GetQueryString("code");
      let res = await WxGetUser({ code: wx_code });
      if (res.code === -1 && res.result) {
        this.bindForm.openid = res.result.openid;
        this.bindForm.headimage = res.result.headimage;
      } else if (res.code === -1 && res.msg) {
        this.$router.replace("/auth");
      } else if (res.code === 0) {
        this.setUserInfo(res.result);
        this.$router.replace("/user");
      }
    },
    async getValidateCode() {
      if (!this.sendMsgDisabled) {
        if (/^[1][0-9]{10}$/.test(this.bindForm.mobile)) {
          let res = await GetSMSValidate({
            mobile: this.bindForm.mobile,
            purpose: this.bindForm.purpose
          });
          this.countDown();
        } else {
          this.$toast("请输入正确的手机号");
        }
      }
    },
    countDown() {
      let me = this;
      me.sendMsgDisabled = true;
      let interval = window.setInterval(function() {
        if (me.time-- <= 0) {
          me.time = 60;
          me.sendMsgDisabled = false;
          window.clearInterval(interval);
        }
      }, 1000);
    },
    bindWx() {
      this.validate(async (errors, fields) => {
        this.isBinding = true;
        if (!errors) {
          let res = await BindUser(this.bindForm);
          if (res.code === 0) {
            this.bindForm.cookie_value = res.result.cookie_value;
            this.setUserInfo(this.bindForm);
            this.$router.replace("/user");
          } else {
            this.$toast(res.msg);
          }
        }
        this.isBinding = false;
      });
    },
    /**
     * 清除验证提示
     * @param attrs
     */
    resetField(attrs) {
      attrs = !attrs
        ? Object.keys(this.errorMsg)
        : Array.isArray(attrs) ? attrs : [attrs];
      attrs.forEach(attr => {
        this.errorMsg[attr] = "";
      });
    },
    /**
     * 验证方法
     * @param callback
     * @param data
     */
    validate(callback, data) {
      this.validator.validate((errors, fields) => {
        this.resetField();
        if (errors) {
          fields.forEach(item => {
            this.errorMsg[item.field] = item.message;
          });
        }
        callback && callback(errors, fields);
      }, data);
    },
    submit() {
      this.validate((errors, fields) => {});
    },
    reset() {
      this.data = {
        name: "",
        code: "",
        mobile: ""
      };
      this.validator.setData(this.data);
      this.resetField();
    }
  },

  components: {}
};
</script>


<style lang="scss" scoped>
.bind {
  position: relative;
  background-color: $bg-color;
  height: 100vh;
  .text-title {
    padding-top: 50px;
  }
  .bind-button {
    padding: 30px 15px;
  }
}
</style>