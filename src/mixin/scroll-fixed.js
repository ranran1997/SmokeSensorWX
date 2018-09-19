const debounce = (func, wait, immediate) => {
  let timeout, args, context, timestamp, result;
  return function () {
    context = this;
    args = arguments;
    timestamp = new Date();
    const later = () => {
      const last = (new Date()) - timestamp;
      if (last < wait) {
        timeout = setTimeout(later, wait - last);
      } else {
        timeout = null;
        result = func.apply(context, args);
      }
    };
    if (!timeout) {
      timeout = setTimeout(later, wait);
    }
    return result;
  };
}
// 滚动条记录， 适用于 keep-alive 组件
export default {
	data(){
		return {
			scrollTop: 0
		}
	},

	mounted(){
		const vm = this;
		vm.$el.addEventListener('scroll', debounce(function() {
			vm.scrollTop = vm.$el.scrollTop;
		}, 50))
	},

	activated(){
		this.$el.scrollTop = this.scrollTop;
	},
}
