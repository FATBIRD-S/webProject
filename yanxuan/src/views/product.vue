<template>
    <div id="product">
        <van-nav-bar @click-left="onClickLeft" title="商品" left-text="返回" left-arrow />
        <!-- 轮播 -->
        <van-swipe :autoplay="3000">
            <van-swipe-item v-for="(item, index) in data.gallery" :key="index">
                <img class="swipeImg" v-lazy="item.img_url" />
            </van-swipe-item>
        </van-swipe>
        <!-- 保障 -->
        <div class="info">
            <span>30天无忧退货</span>
            <span>48小时快速退款</span>
            <span>满88元免邮费</span>
        </div>
        <!-- 商品信息 -->
        <div class="explain">
            <h3 class="title">{{this.info.name}}</h3>
            <p class="about">{{this.info.goods_brief}}</p>
            <p class="price">￥{{this.info.retail_price}}</p>
        </div>
        <!-- 规格选择 -->
        <van-cell class="choseSize" title="请选择规格数量" is-link />
        <!-- 商品参数 -->
        <div class="proPrams">
            <h4 class="proTi">商品参数</h4>
            <div class="proItem" v-for="(item1,index1) in data.attribute" :key="index1">
                <span class="proItem_name">{{item1.name}}</span>
                <span class="proItem_value">{{item1.value}}</span>
            </div>
        </div>
        <!-- 商品详情 -->
        <div class="proDetail" v-html="info.goods_desc"></div>
        <!-- 商品导航栏 -->
        <van-goods-action>
            <van-goods-action-icon icon="chat-o" text="客服" color="#07c160" />
            <van-goods-action-icon to="/buycart" :info="$store.state.cartTotal.goodsCount==0?'':$store.state.cartTotal.goodsCount"
                icon="cart-o" text="购物车" />
            <van-goods-action-icon icon="star" text="已收藏" color="#ff5000" />
            <van-goods-action-button @click="chooseSku" type="warning" text="加入购物车" />
            <van-goods-action-button type="danger" text="立即购买" />
        </van-goods-action>
        <!-- 选择商品规格 -->
        <van-sku v-model="skuShow" :sku="sku" :goods="goods" :hide-stock="sku.hide_stock" @buy-clicked="onBuyClicked"
            @add-cart="onAddCartClicked" />

    </div>
</template>

<script>
    import axios from 'axios'
    import api from '../assets/config/api.js'

    let sku = {
        // 所有sku规格类目与其值的从属关系，比如商品有颜色和尺码两大类规格，颜色下面又有红色和蓝色两个规格值。
        // 可以理解为一个商品可以有多个规格类目，一个规格类目下可以有多个规格值。
        tree: [{
            k: '颜色', // skuKeyName：规格类目名称
            v: [{
                    id: '30349', // skuValueId：规格值 id
                    name: '红色', // skuValueName：规格值名称

                },
                {
                    id: '1215',
                    name: '蓝色',

                }
            ],
            k_s: 's1' // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
        }],
        // 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
        list: [{
            id: 2259, // skuId，下单时后端需要
            price: 100, // 价格（单位分）
            s1: '1215', // 规格类目 k_s 为 s1 的对应规格值 id
            s2: '1193', // 规格类目 k_s 为 s2 的对应规格值 id
            s3: '0', // 最多包含3个规格值，为0表示不存在该规格
            stock_num: 110 // 当前 sku 组合对应的库存
        }],
        price: '1.00', // 默认价格（单位元）
        stock_num: 227, // 商品总库存
        collection_id: 2261, // 无规格商品 skuId 取 collection_id，否则取所选 sku 组合对应的 id
        none_sku: false, // 是否无规格商品
        hide_stock: false // 是否隐藏剩余库存
    }
    let goods = {
        // 默认商品 sku 缩略图
        // title: 'name',
        picture: 'https://img.yzcdn.cn/1.jpg'
    }

    export default {
        props: ['id'],
        data() {
            return {
                data: {},
                info: {},
                skuShow: false,
                sku: sku,
                goods: goods
            }
        },
        async created() {
            this.$store.dispatch('AjaxCart')
            let res = await axios.get(api.GoodsDetail, {
                params: {
                    id: this.id
                }
            })
            this.data = res.data.data
            this.info = res.data.data.info
            this.goods.picture = this.info.primary_pic_url
            // this.goods.title = this.info.name
            this.sku.price = this.info.retail_price
            this.sku.stock_num = this.info.goods_number

            let tree = []
            this.data.specificationList.forEach((item, index) => {
                let arr = []
                item.valueList.forEach((product, i) => {
                    arr.push({
                        id: product.id,
                        name: product.value
                    })
                })
                tree.push({
                    k: item.name, // skuKeyName：规格类目名称
                    v: arr,
                    k_s: "s" + item.specification_id // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
                })
            })
            this.sku.tree = tree

            let list = []
            this.data.productList.forEach((goods, j) => {
                let k_s = goods.goods_specification_ids.split("_")
                list.push({
                    id: goods.id, // skuId，下单时后端需要
                    price: goods.retail_price * 100, // 价格（单位分）
                    s1: k_s[0], // 规格类目 k_s 为 s1 的对应规格值 id
                    s2: k_s[1], // 规格类目 k_s 为 s2 的对应规格值 id
                    s3: 0, // 最多包含3个规格值，为0表示不存在该规格
                    stock_num: goods.goods_number // 当前 sku 组合对应的库存
                })
            })
            this.sku.list = list

            // console.log(this.data)
            // console.log(this.sku.list)
        },
        methods: {
            onClickLeft() {
                this.$router.go(-1)
            },
            onBuyClicked() {
                //提交到订单页
            },
            async onAddCartClicked(Data) {
                //提交到购物车
                this.skuShow = false
                // console.log(Data)
                // let chooseContent = Data.selectedSkuComb.s1 + '_' + Data.selectedSkuComb.s2
                // console.log(chooseContent)
                // let resultPro = this.data.productList.filter((item, index) => {

                //     if (item.goods_specification_ids == chooseContent) {
                //         return true
                //     } else {
                //         return false
                //     }
                // })
                // console.log(resultPro)
                let cartRes = await axios.post(api.CartAdd, {
                    goodsId: this.info.id,
                    number: Data.selectedNum,
                    productId: Data.selectedSkuComb.id
                })
                console.log(cartRes)
                let cart = cartRes.data.data
                this.$store.commit('setCartList', cart.cartList)
                this.$store.commit('setCartTotal', cart.cartTotal)
            },
            chooseSku() {
                this.skuShow = true
            }

        }
    }
</script>

<style lang="less">
    #product {
        .swipeImg {
            width: 100%;
        }

        .info {
            display: flex;
            justify-content: space-around;
            font-size: 12px;
            color: #999999;
            height: 24px;
            line-height: 24px;
            background: #efefef;

            span {
                position: relative;
            }

            span::before {
                content: "";
                display: block;
                position: absolute;
                left: -10px;
                top: 9px;
                width: 4px;
                height: 4px;
                border-radius: 50%;
                border: 1px solid #666;
            }
        }

        .explain {
            justify-content: center;
            text-align: center;

            .title {
                font-weight: 700;
                color: #444;
                margin: 18px 0 3px 0;
            }

            .about {
                color: #909090;
                margin: 3px 0;
                font-size: 12px;
            }

            .price {
                color: red;
                font-weight: 900;
            }
        }

        .choseSize {
            border-top: 2px solid #eee;
            border-bottom: 8px solid #eee;
        }

        .proPrams {
            padding-bottom: 20px;

            .proTi {
                font-size: 15px;
                margin: 5px 15px;
            }

            .proItem {
                display: flex;
                justify-content: space-between;
                width: 90%;
                height: 24px;
                line-height: 24px;
                margin: 0 auto;
                font-size: 12px;
                background-color: #efefef;
                color: #666;
            }

            .proItem_value {
                width: 250px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        }

        .proDetail {
            padding-bottom: 50px;

            img {
                width: 100%;
            }

            p {
                margin: 0;
                padding: 0;
                display: flex;
            }
        }

    }
</style>
