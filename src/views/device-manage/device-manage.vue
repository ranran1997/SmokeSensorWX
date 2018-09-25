<template>
  <div class="device-manage">
    <van-nav-bar title="添加管理" left-text="返回" right-text="按钮" @click-left="sanQRCode" @click-right="addDevice">
      <van-icon name="qr" slot="left" size="1.4em" />
      <van-icon name="add" slot="right" size="1.4em" />
    </van-nav-bar>
    <van-list v-model="loading" :finished="finished" :immediate-check="false" :offset="100" @load="loadMore">
      <van-swipe-cell :right-width="delWidth" :on-close="onClose" v-for="(item, index) in items" :key="index">
        <van-cell-group :border="true">
          <van-cell :value="item.imei" icon="smoke-sensor2">
            <template slot="title">
              <span class="van-cell-text">{{item.devname}}</span>
              <van-tag type="danger">{{item.friendname}}</van-tag>
            </template>
            <template slot="right-icon">
              <van-icon v-if="item.pic" name="password-view" color="green" size="1.4em" class="van-cell__right-icon" @click="viewPic(item.pic)" />
              <van-icon v-if="!item.pic" name="camera" color="red" size="1.4em" class="van-cell__right-icon" @click="takePic(item.imei)" />
            </template>
          </van-cell>
        </van-cell-group>
        <van-button slot="right" class="van-swipe-cell__right" :style="{'width':delWidth+'px'}" tag="div">
          删除
        </van-button>
      </van-swipe-cell>

    </van-list>

    <is-empty v-if="isEmpty">暂无设备，请添加设备</is-empty>

    <transition name="fade">
      <van-icon name="back-top" class="backTop" @click.native="backTop" v-show="showArrow" />
    </transition>
  </div>
</template>

<script>
import { mediaURL } from "@/config";
import { mapState } from "vuex";
import wx from "weixin-js-sdk";
import { getDevicePagedList, delDevice, uploadPic } from "@/api/device";
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
  computed: {
    ...mapState({
      // 箭头函数可使代码更简练
      username: state => state.user.username,
      mobile: state => state.user.mobile
    }),
    delWidth() {
      return window.innerWidth * 0.2;
    }
  },
  watch: {},

  created() {
    this.resetInit();
    this.scrollShowArrow = throttle(this.scrollShowArrow, 100);
  },
  activated() {
    this.eventListen(true);
  },

  deactivated() {
    this.eventListen(false);
  },

  methods: {
    sanQRCode() {
      const vm = this;
      wx.scanQRCode({
        needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
        scanType: ["qrCode"], // 可以指定扫二维码还是一维码，默认二者都有
        success: function(res) {
          try {
            const reg = /^\d{15}$/;
            let result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
            if (reg.test(result)) {
              let IMEI = result;
              vm.$router.push({
                path: "/add-device",
                query: {
                  IMEI: IMEI,
                  ICCID: ""
                }
              });
            }else{
               vm.$toast("请扫描烟感设备二维码");
            }
            // alert(result);
            // let IMEI = result.split("&")[0].split("=")[1];
            // let ICCID = result.split("&")[1].split("=")[1];
            // vm.$router.push({
            //   path: "/add-device",
            //   query: {
            //     IMEI: IMEI,
            //     ICCID: ICCID
            //   }
            // });
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
    takePic(imei) {
      const vm = this;
      wx.chooseImage({
        count: 1, //张数， 默认9
        sizeType: ["compressed"], //建议压缩图
        sourceType: ["album", "camera"], // 来源是相册、相机
        success: function(res) {
          // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
          var localId = res.localIds[0];
          wx.uploadImage({
            localId: localId, // 需要上传的图片的本地ID，由chooseImage接口获得
            isShowProgressTips: 1, // 默认为1，显示进度提示
            success: function(res) {
              var serverId = res.serverId; // 返回图片的服务器端ID
              vm.uploadPic(serverId, imei);
            }
          });
        }
      });
    },
    viewPic(picPath) {
      const devicePicPath = mediaURL + picPath;
      wx.previewImage({
        current: "", // 当前显示图片的http链接
        urls: [devicePicPath] // 需要预览的图片http链接列表
      });
    },
    async uploadPic(serverId, imei) {
      let res = await uploadPic({ media_id: serverId, imei: imei });
      if (res.code === 0) {
        this.resetData();
        this.$toast.success("上传成功！");
      } else {
        this.$toast.fail("上传失败！");
      }
    },
    initData(loadMore = false) {
      let params = {
        page: this.pages.currPage,
        row: this.pages.perPage
      };
      return getDevicePagedList(params).then(res => {
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
    font-size: 14px;
    height: 100%;
    display: inline-block;
    text-align: center;
    display: flex;
    align-items: center; /*垂直居中*/
    justify-content: center; /*水平居中*/
    background-color: #f44;
  }
}
.van-button__text {
  width: 100%;
}
</style>
