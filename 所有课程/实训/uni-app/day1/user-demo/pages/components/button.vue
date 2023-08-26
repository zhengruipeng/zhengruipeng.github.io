<template>
	<view>
		<text>按钮样式</text>
		<u-button >默认按钮</u-button>
		<u-button type="primary">主要按钮</u-button>
		<u-button type="success">成功按钮</u-button>
		<u-button type="info">信息按钮</u-button>
		<u-button type="warning">警告按钮</u-button>
		<u-button type="error">危险按钮</u-button>
		<text>按钮尺寸</text>
		<u-button size="default">江湖</u-button>
		<u-button size="medium">夜雨</u-button>
		<u-button size="mini">十年灯</u-button>
		<text>水波纹效果</text>
		<u-button :ripple="true" type="primary">十年</u-button>
		<u-button :ripple="true" ripple-bg-color="#909399">之约</u-button>
		<text>加载状态</text>
		<u-button :loading="true">加载中</u-button>
	</view>
</template>

<script>
</script>

<style>
</style>
