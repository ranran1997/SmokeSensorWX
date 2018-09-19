<template>
	<div class="add-device">
    	<van-cell-group>
			<van-field
				v-model="deviceForm.imei"
				required
				clearable
         left-icon="imei"
				label="IMEI"
				placeholder="请输入IMEI号"
				:error-message="errorMsg.imei"
				/>
			<van-field
				v-model="deviceForm.iccid"
				center
				required
				clearable
        left-icon="iccid"
				label="ICCID"
				placeholder="请输入ICCID号"
				:error-message="errorMsg.iccid"
				/>
			<van-field
				v-model="deviceForm.friendname"
				clearable
        left-icon="device-name"
				label="自定义名称"
				placeholder="请输入自定义名称"
			/>
		</van-cell-group>
		<div class="submit-button">
				<van-button size="large" type="danger" 
        :loading="isLoading" @click="addDevice" >提交</van-button>
		</div>	
	</div>
</template>

<script>
import { addDevice } from "@/api/device";
import validator from "@/libs/validator";
export default {
  data() {
    return {
      deviceForm: {
        imei: "",
        iccid: "",
        friendname: ""
      },
       errorMsg: {
        imei: "",
        iccid: ""
      },
      rules: {
        imei: [{ required: true, message: "请输入imei号" }],
        iccid: [{ required: true, message: "请输入iccid" }]
      },
      isLoading:false
    };
  },
  watch: {},

  created() {
      this.validator = validator(this.rules, this.deviceForm);
  },
  mounted(){
 
  },
   activated() {
    this.$route.query.IMEI?this.deviceForm.imei = this.$route.query.IMEI:this.deviceForm.imei=""
    this.$route.query.ICCID?this.deviceForm.iccid = this.$route.query.ICCID:this.deviceForm.iccid=""
  },

  methods: {
    async addDevice() {
        this.validate(async (errors, fields) => {
        this.isLoading = true;
        if (!errors) {
            let res = await addDevice(this.deviceForm)
          if (res.code === 0) {
            this.$toast.success('添加成功')
            this.$router.replace("/device-manage");
          }else if(res.code === -1){
           this.$toast.fail(res.msg)
          }
        }
        this.isLoading = false;
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
  },

  components: {}
};
</script>


<style lang="scss" scoped>
  .submit-button {
    padding: 30px 15px;
  }
</style>
