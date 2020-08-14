<script>
	// import tim from 'common/tim.js';
	export default {
		onLaunch: function() {
			console.log('App Launch');
		},
		onShow: function() {
			console.log('App Show');
		},
		onHide: function() {
			console.log('App Hide');
		}
	}
</script>

<style lang="scss">
	@import '/uview-ui/index.scss';
	// html {
	// 	font-size: calc(100vw / 7.5);
	// }
	page {
		min-height: 100%;
		background-color: #f7f7f7;
	}
</style>
