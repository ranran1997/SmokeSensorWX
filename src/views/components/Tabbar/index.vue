<template>
	<van-tabbar v-model="active" style="z-index: 1999">
		<van-tabbar-item
			v-for="(tab, index) in tabbar"
			:icon="tab.icon"
			:to="tab.path"
			:dot="tab.dot"
			:info="tab.info"
			:key="index">
			{{tab.name}}
		</van-tabbar-item>
	</van-tabbar>
</template>


<script>
	import { Tabbar, TabbarItem } from 'vant';
	export default {
		data() {
			return {
				active: 0,
				tabbar: [
					{
						name: "设备管理",
						path: "/device-manage",
						pathName: "device-manage",
						icon: "smoke-sensor",
						dot: false,
						info: ""
					},
					{
						name: "个人中心",
						path: "/user",
						pathName: "user",
						icon: "user",
						dot: false,
						info: ""
					}
				]
			}
		},
		
		watch:{
			'$route': 'changeActive'
		},
		
		created(){
			const toName = this.$route.name
			this.setActive(toName)
		},
		
		methods: {
			changeActive({ name }){
				this.setActive(name)
			},
			setActive(name){
				this.tabbar.forEach((tab, i) => {
					if(tab.pathName == name){
						this.active = i;
						return false;
					}
				})
			}
		},
		
		components:{
			 [Tabbar.name]: Tabbar,
			 [TabbarItem.name]: TabbarItem,
		}
	}

</script>
