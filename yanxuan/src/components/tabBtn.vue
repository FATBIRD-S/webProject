<template>
    <!-- 导航栏 -->
    <van-tabbar @click="bottomIndex(value)" v-model="tabActive">
        <van-tabbar-item icon="wap-home" to="/">首页</van-tabbar-item>
        <van-tabbar-item icon="bag">专题</van-tabbar-item>
        <van-tabbar-item icon="bars" to="/category">分类</van-tabbar-item>
        <van-tabbar-item icon="cart" to="/buycart">购物车</van-tabbar-item>
        <van-tabbar-item icon="manager">我的</van-tabbar-item>
    </van-tabbar>
</template>

<script>
    export default {
        data() {
            return {
                tabActive: 0
            }
        },

        mounted() {
            switch (this.$route.path) {
                case "/":
                    this.tabActive = 0;
                    break;
                case "/category":
                    this.tabActive = 2;
                    break;
                case "/buycart":
                    this.tabActive = 3;
                    break;
                default:
                    this.tabActive = 0;
            }
        }
    }
</script>

<style>
</style>
