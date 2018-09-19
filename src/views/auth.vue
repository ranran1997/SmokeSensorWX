<template>
  <div>

  </div>
</template>
 
<script>
import {frontWebURL} from "@/config"
import { WxAUTH } from "@/api/wx";
import { GetQueryString } from "@/libs/util";
export default {
  data() {
    return {
    };
  },
  computed: {},
  created() {
    //就是前面说的ReturnGetCodeUrl方法

      this.ReturnGetCodeUrl();

  },
  methods: {
    async ReturnGetCodeUrl() {
      let data = await WxAUTH({call_back:frontWebURL+'/#/bind'});
      if (data.code===0) {
        window.location.href = data.result.url;
      }
    }
  },
  watch: {},

  components: {},

  mounted: function() {}
};
</script>
<style lang='scss' scoped>
</style>