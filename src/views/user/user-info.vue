<template>
	<div class="user">
    <div class="user_header" :style="{backgroundImage: `url(${background_image})`}">
      <van-icon name="set" class="user_set" @click="toSetting" />
      <div class="user_avatar">
        <img :src="headimage" @click="toLogin" alt="头像" width="20%" >
      </div>
    </div>
    <van-cell-group>
			<van-cell title="个人信息" >
			</van-cell>
      <van-cell icon="contact" title="姓名" :value="username"/>
			<van-cell icon="mobile" title="手机"  :value="mobile" />
			<van-cell icon="address" title="地址" :value="addr" />
		</van-cell-group>
	</div>
</template>

<script>
import { mapState } from "vuex";
import avatar_default from "../../assets/images/avatar_default.png";
import bg_default from "../../assets/images/user_head_bg.png";
export default {
  data() {
    return {
      background_image: bg_default
    };
  },
  computed: mapState({
    // 箭头函数可使代码更简练
    username: state => state.user.username,
    mobile: state => state.user.mobile,
    headimage: state => state.user.headimage||avatar_default,
    addr: state => state.user.addr
  }),

  watch: {},

  created() {},

  methods: {},

  components: {}
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
</style>
