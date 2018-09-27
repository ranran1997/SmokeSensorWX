<template>
  <div class="user">
    <div class="user_header" :style="{backgroundImage: `url(${background_image})`}">
      <van-icon name="set" class="user_set" />
      <div class="user_avatar">
        <img :src="headimage" alt="头像" width="20%">
      </div>
      </div>
      <van-cell-group>
        <van-cell title="个人信息">
        </van-cell>
        <van-cell icon="contact" title="姓名" :value="username" />
        <van-cell icon="mobile" title="手机" :value="mobile" />
        <van-cell icon="shop" title="商户名称" :value="shopname" />
        <van-cell icon="address" title="地址" :value="addr" />
        <van-cell icon="liability" title="附件">
          <template slot="right-icon">
            <van-icon v-if="dutypath" name="password-view" color="green" size="1.4em" class="van-cell__right-icon" @click="viewPic" />
            <van-icon v-if="!dutypath" name="camera" color="red" size="1.4em" class="van-cell__right-icon" @click="takePic" />
          </template>

        </van-cell>
      </van-cell-group>
      <div class="operaiton-button">
        <van-button size="large" type="danger" :loading="isLoading" @click="unBindWx" class="btn-bind">解绑</van-button>
      </div>

    </div>
</template>

<script>
import { mediaURL } from "@/config";
import { uploadDutyLetter,UnBindUser } from "@/api/user";
import wx from "weixin-js-sdk";
import { mapState, mapMutations } from "vuex";
import avatar_default from "../../assets/images/avatar_default.png";
import bg_default from "../../assets/images/user_head_bg.png";
export default {
  data() {
    return {
      background_image: bg_default,
      isLoading:false
    };
  },
  computed: mapState({
    // 箭头函数可使代码更简练
    username: state => state.user.username,
    mobile: state => state.user.mobile,
    headimage: state => state.user.headimage || avatar_default,
    shopname: state => state.user.shopname,
    addr: state => state.user.addr,
    dutypath: state => state.user.dutypath
  }),

  watch: {},

  created() {},

  methods: {
    ...mapMutations({
      setDutyPath: "setDutyPath" // 将 `this.add()` 映射为 `this.$store.commit('increment')`
    }),
    takePic() {
      const vm = this;
      wx.chooseImage({
        count: 1, //张数， 默认9
        sizeType: ["compressed"], //建议压缩图
        sourceType: ["album", "camera"], // 来源是相册、相机
        success: function(res) {
          // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
          var localId = res.localIds[0];
          // wx.previewImage({
          //   current: "", // 当前显示图片的http链接
          //   urls: [localId] // 需要预览的图片http链接列表
          // });
          wx.uploadImage({
            localId: localId, // 需要上传的图片的本地ID，由chooseImage接口获得
            isShowProgressTips: 1, // 默认为1，显示进度提示
            success: function(res) {
              var serverId = res.serverId; // 返回图片的服务器端ID
              vm.uploadDutyLetter(serverId);
            }
          });
        }
      });
    },
    viewPic() {
      const dutypath = mediaURL + this.dutypath;
      wx.previewImage({
        current: "", // 当前显示图片的http链接
        urls: [dutypath] // 需要预览的图片http链接列表
      });
    },
    async uploadDutyLetter(serverId) {
      let res = await uploadDutyLetter({ media_id: serverId });
      if (res.code === 0) {
        this.setDutyPath(res.result.dutypath);
        this.$toast.success("上传成功！");
      } else {
        this.$toast.fail("上传失败！");
      }
    },
    async unBindWx() {
      this.isLoading=true;
      let res = await UnBindUser({});
      if (res.code === 0) {
        this.$router.replace('/bind')
      } else {
        this.$toast.fail(res.mag);
      }
       this.isLoading=false;
    }
  }
};
</script>


<style lang="scss" scoped>
.user_header {
  position: relative;
  background-repeat: no-repeat;
  background-size: cover;
  height: 130px;
  box-sizing: border-box;
  text-align: center;
  color: #fff;
  padding-top: 30px;
}

i.user_set {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 24px;
}
.user_avatar {
  margin-bottom: 10px;
  img {
    border: 0;
    border-radius: 50%;
  }
}
.operaiton-button {
  padding: 30px 15px;
}
</style>
