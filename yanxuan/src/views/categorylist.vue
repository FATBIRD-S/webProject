<template>
    <div id="categoryList">
        <van-tabs v-model="active">
            <van-tab v-for="(item, index) in data" :key="index" :title="item.name">
                <h3 class="front">{{item.front_name}}</h3>
                <van-grid :column-num="2" :border='false'>
                    <van-grid-item v-for="(item1, index1) in productList" :key="index1" :to="'/product/' + item1.id" >
                        <van-image :src="item1.list_pic_url" />
                        <h5 class="van-ellipsis">{{item1.name}}</h5>
                        <p class="price">￥{{item1.retail_price}}</p>
                      </van-grid-item>
                </van-grid>
            </van-tab>
        </van-tabs>
        <tab-btn></tab-btn>
    </div>
    
    
</template>

<script>
    import axios from 'axios'
    import api from '../assets/config/api.js'
    import tabBtn from '../components/tabBtn.vue';

    export default {
        props: ['id'],
        data() {
            return {
                active: '',
                data: {},
                productList: {}
            }
        },
        async created() {
            let res = await axios.get(api.GoodsCategory, {
                params: {
                    id: this.id
                }
            })
            // console.log(res)
            this.active = this.$store.state.cateGoryIndex
            this.data = res.data.data.brotherCategory
            // this.active = this.liveactive
            // console.log(this.liveactive)
        },
        methods: {

        },
        watch: {
            async active() {
                let id = this.data[this.active].id
                let page = 1;
                let size = 20;
                console.log(id)

                let res = await axios.get(api.GoodsList, {
                    params: {
                        categoryId: id,
                        page: page,
                        size: size
                    }
                })
                this.productList = res.data.data.data
                // console.log(res)
                // console.log(this.productList)

            }
        },
        components:{
            tabBtn
        }
        
    }
</script>

<style lang="less">
    #categoryList{
        .van-ellipsis{
            width: 100%;
            margin: 5px;
        }
        .van-grid-item{
            overflow: hidden;
        }
        .price{
            color: red;
            margin: 0px;
        }
        .front{
            text-align: center;
        }
    }
</style>
