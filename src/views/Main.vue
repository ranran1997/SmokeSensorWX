<template>
  <div>
    <div class="main">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive">
          <!-- 这里是会被缓存的视图组件，比如 Home！ -->
        </router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive">

      </router-view>
    </div>
    <Tabbar></Tabbar>
  </div>
</template>

<script>
import Tabbar from "@/views/components/Tabbar";
import { mapState } from "vuex";
import wx from "weixin-js-sdk";
import { WxGetSign } from "@/api/wx";
export default {
  components: {
    Tabbar
  },
  data() {
    return {};
  },
  computed: {
    ...mapState({
      mobile: state => state.user.mobile
    })
  },
  created() {
    this.queryJsConfig();
  },
  methods: {
    openLoginModal() {
      this.loginModal = true;
    },
    backHomePage() {
      this.$router.push({
        name: "home"
      });
    },
    async queryJsConfig() {
      const params = {
        url: window.location.href.split("#")[0],
        mobile: this.mobile
      };
      let res = await WxGetSign(params);
      if (res.code === 0) {
        const data = res.result;
        wx.config({
          // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          debug: false,
          // 必填，公众号的唯一标识
          appId: data.appId,
          // 必填，生成签名的时间戳
          timestamp: data.timestamp,
          // 必填，生成签名的随机串
          nonceStr: data.nonceStr,
          // 必填，签名
          signature: data.signature,
          // 必填，需要使用的JS接口列表，所有JS接口列表
          jsApiList: ["checkJsApi", "scanQRCode","chooseImage","uploadImage","previewImage"]
        });
        wx.error(function(res) {
          alert("出错了：" + res.errMsg); //这个地方的好处就是wx.config配置错误，会弹出窗口哪里错误，然后根据微信文档查询即可。
        });
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.main {
  background-color: #f2f2f2;
  height: 100vh;
  overflow-y: auto;
  padding-bottom: 50px;
  box-sizing: border-box;
}
</style>
