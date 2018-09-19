<template>
	<div class="device-manage">
    <van-nav-bar
      title="添加管理"
      left-text="返回"
      right-text="按钮"
      @click-left="sanQRCode"
      @click-right="addDevice"
    >
      <van-icon name="photograph" slot="left"  size="1.4em"/>
      <van-icon name="add" slot="right" size="1.4em"/>
    </van-nav-bar>
        <van-list
      v-model="loading"
      :finished="finished"
      :immediate-check="false"
      :offset="100"
      @load="loadMore"
    >
        <van-swipe-cell  :right-width="70" :on-close="onClose"  v-for="(item, index) in items" :key="index">
            <van-cell-group :border="true">
                <van-cell :value="item.imei" icon="smoke-sensor2">
                  <template slot="title">
                    <span class="van-cell-text">{{item.devname}}</span>
                    <van-tag type="danger">{{item.friendname}}</van-tag>
                  </template>    
                </van-cell>
            </van-cell-group>
            <van-button slot="right" class="van-swipe-cell__right" tag="div" >
              删除
            </van-button>
        </van-swipe-cell>

      </van-list>
    
      <is-empty v-if="isEmpty">暂无设备，请添加设备</is-empty>
    
      <transition name="fade">
        <van-icon
          name="back-top"
          class="backTop"
          @click.native="backTop"
          v-show="showArrow"
        />
      </transition>
	</div>
</template>

<script>
import { mapState } from "vuex";
import wx from "weixin-js-sdk";
import { WxGetSign } from "@/api/wx";
import { getDevicePagedList, delDevice } from "@/api/device";
import loadMore from "@/mixin/list-load-more";
import scrollFixed from "@/mixin/scroll-fixed";
import IsEmpty from "@/views/components/is-empty/";
import { throttle } from "@/libs/util";
export default {
  mixins: [loadMore, scrollFixed],
  data() {
    return {
      showArrow: false
    };
  },
  computed: mapState({
    // 箭头函数可使代码更简练
    username: state => state.user.username,
    mobile: state => state.user.mobile
  }),
  watch: {},

  created() {
    this.resetInit();
    this.scrollShowArrow = throttle(this.scrollShowArrow, 100);
    this.queryJsConfig();
  },
  activated() {
    this.eventListen(true);
  },

  deactivated() {
    this.eventListen(false);
  },

  methods: {
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
          jsApiList: ["checkJsApi", "scanQRCode"]
        });
        wx.error(function(res) {
          alert("出错了：" + res.errMsg); //这个地方的好处就是wx.config配置错误，会弹出窗口哪里错误，然后根据微信文档查询即可。
        });
      }
    },
    sanQRCode() {
      const vm = this;
      wx.scanQRCode({
        needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
        scanType: ["qrCode"], // 可以指定扫二维码还是一维码，默认二者都有
        success: function(res) {
          try {
            let result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
            let IMEI = result.split("&")[0].split("=")[1];
            let ICCID = result.split("&")[1].split("=")[1];
            vm.$router.push({
              path: "/add-device",
              query: {
                IMEI: IMEI,
                ICCID: ICCID
              }
            });
          } catch (error) {
            vm.$toast("请扫描烟感设备二维码");
          }

          //   window.location.href = result; //因为我这边是扫描后有个链接，然后跳转到该页面
        }
      });
    },
    addDevice() {
      this.$router.push("/add-device");
    },
    onClose(clickPosition, instance) {
      const vm = this;
      const IMEI = instance.$children[0].$children[0].value;
      switch (clickPosition) {
        case "left":
        case "cell":
        case "outside":
          instance.close();
          break;
        case "right":
          this.$dialog
            .confirm({
              message: "确定删除吗？"
            })
            .then(() => {
              vm.deleteDeivice(IMEI);
              instance.close();
            })
            .catch(() => {
              // on cancel
            });
          break;
      }
    },
    async deleteDeivice(IMEI) {
      let res = await delDevice({ imei: IMEI });
      if (res.code === 0) {
        this.resetInit();
      } else {
        this.$toast.fail(res.msg);
      }
    },
    initData(loadMore = false) {
      let params = {
        page: this.pages.currPage,
        row: this.pages.perPage
      };
      return getDevicePagedList(params, {
        hideLoading: true
      }).then(res => {
        console.log(res);
        const items = res.result.data;
        const page = {
          totalCount: res.result.total,
          pageCount: Math.ceil(res.result.total / this.pages.perPage)
        };
        this.items.push(...items);
        return page;
      });
    },
    eventListen(isBind = true) {
      if (isBind) {
        this.$el.addEventListener("scroll", this.scrollShowArrow);
      } else {
        this.$el.removeEventListener("scroll", this.scrollShowArrow);
      }
    },
    scrollShowArrow() {
      this.showArrow = this.$el.scrollTop > 120;
    },
    backTop() {
      this.$el.scrollTop = 0;
    }
  },

  components: {
    IsEmpty
  }
};
</script>


<style lang="scss" scoped>
@import "../../assets/scss/mixin";
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s;
}
.backTop {
  position: fixed;
  right: 20px;
  bottom: 80px;
  font-size: 24px;
}
.device-manage {
  overflow: auto;
  height: 100%;
}

.van-swipe-cell {
  &__left,
  &__right {
    color: #ffffff;
    font-size: 15px; 
    width: 70px; /* no*/
    height: 100%;
    display: inline-block;
    text-align: center;
    display: flex;
    align-items: center; /*垂直居中*/
    justify-content: center; /*水平居中*/
    background-color: #f44;
  }
}
.van-button__text{
  width:100%;
}
</style>
