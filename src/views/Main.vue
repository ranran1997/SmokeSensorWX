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
  import Tabbar from '@/views/components/Tabbar'
  import { mapState } from 'vuex'
  import {login,logout} from '@/api/user';
export default {
  components:{
    Tabbar
  },
  data () {
    return {
      loginModal: false,
      btnLoading:false,
      isLoging:false,
      loginForm:{
        mobile: '18627774450',
        password: '123456',
        login_type:2
      },
    }
  },
  computed: {
    ...mapState({
      'isVip': state => state.user.isVip,
      'userName':state => state.user.userName,
      'userAvator':state => state.user.avatorImgPath,
   })
  },
  created(){
    this.$store.commit('updateUserState');
    this.$store.commit('setCurrentSubject');
  },
  methods: {
    openLoginModal() {
      this.loginModal = true;
    },
    backHomePage(){
      this.$router.push({
        name: 'home'
      })
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.main{
    background-color: #f2f2f2;
    height: 100vh;
    overflow-y: auto;
    padding-bottom: 50px;
    box-sizing: border-box;
}
</style>
