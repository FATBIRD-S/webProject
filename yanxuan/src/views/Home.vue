<template>
  <div class="home" id="home">
    <!-- search -->
    <van-search v-model="searchValue" placeholder="商品搜索" input-align="center"/>
    <!-- swipe -->
    <van-swipe :autoplay="3000" :width="375" :height="200">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img class="swiperimg" v-lazy="image.image_url" />
      </van-swipe-item>
    </van-swipe>
    <!-- 图标导航 -->
    <van-grid :column-num="5">
      <van-grid-item v-for="(item, index) in channel" :key="index" :icon="item.icon_url" :text="item.name" />
    </van-grid>
    <!-- 品牌制造商提供 -->
    <div class="brandList">
    <van-panel title="品牌制造商提供">
          <van-grid :border="false" :column-num="2">
            <van-grid-item v-for="(item1, index1) in brandList" :key="index1">
              <van-image fit="cover" lazy-load :src="item1.new_pic_url" />
              <h4 class="title">{{item1.name}}</h4>
              <p class="price">{{item1.floor_price}}元起</p>
            </van-grid-item>
          </van-grid>
    </van-panel>
    </div>
    <!-- 新品首发 -->
    <div class="newList">
    <van-panel title="品牌制造商提供">
          <van-grid :border="false" :column-num="2">
            <van-grid-item v-for="(item2, index2) in newGoodsList" :key="index2">
              <van-image fit="cover" lazy-load :src="item2.list_pic_url" />
              <h4 class="title">{{item2.name}}</h4>
              <p class="price">{{item2.retail_price}}元</p>
            </van-grid-item>
          </van-grid>
    </van-panel>
    </div>
    <!-- 人气面板 -->
    <div class="hotList">
    <van-panel title="人气尖货">
          <van-card v-for="(item3, index3) in hotGoodsList" :key="index3"
            :price="item3.retail_price"
            :desc="item3.goods_brief"
            :title="item3.name"
            :thumb="item3.list_pic_url"
          />
    </van-panel>
    </div>
    <!-- 专题精选 -->
    <div class="topicList">
    <h4>专题精选</h4>
    <van-swipe :autoplay="3000" :width="375" :height="260" :show-indicators="false">
      <van-swipe-item v-for="(item4, index4) in topicList" :key="index4">
        <img class="swiperimg" v-lazy="item4.item_pic_url" />
        <div class="explain">
            <h5 class="title">{{item4.title}}</h5>
            <p class="content">{{item4.subtitle}}</p>
            <span class="readed">{{item4.read_count}}<van-icon name="browsing-history" /></span>
            
        </div>
      </van-swipe-item>
    </van-swipe>
    </div>
    <!-- 推荐列表 -->
    <div class="categoryList">
    <van-panel title="品牌制造商提供">
          <div v-for="(block, index0) in categoryList">
              <van-grid :border="false" :column-num="2">
                  <h4 class="title">{{block.name}}</h4>
                <van-grid-item v-for="(item, index) in block.goodsList" :key="index">
                  <van-image fit="cover" lazy-load :src="item.list_pic_url" />
                  <h4 class="title">{{item.name}}</h4>
                  <p class="price">￥{{item.retail_price}}</p>
                </van-grid-item>
              </van-grid>
          </div>
    </van-panel>
    </div>
    
    
    
    
    <div style="height: 50px;"></div>
    
    <tab-btn></tab-btn>
    
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios'
import api from '../assets/config/api.js'
import Vue from 'vue';
import { Lazyload } from 'vant';
import tabBtn from '../components/tabBtn.vue';

Vue.use(Lazyload);

export default {
  name: 'Home',
  data:function (){
      return {
          searchValue: '',
          data: {},
          
      }
  },
  computed: {
      images:function() {
          if(typeof this.data.banner == 'object'){
              return this.data.banner
          }else{
              return []
          }
      },
      channel:function() {
          if(typeof this.data.channel == 'object'){
              return this.data.channel
          }else{
              return []
          }
      },
      brandList:function() {
          if(typeof this.data.brandList == 'object'){
              return this.data.brandList
          }else{
              return []
          }
      },
      newGoodsList:function() {
          if(typeof this.data.newGoodsList == 'object'){
              return this.data.newGoodsList
          }else{
              return []
          }
      },
      hotGoodsList:function() {
          if(typeof this.data.hotGoodsList == 'object'){
              return this.data.hotGoodsList
          }else{
              return []
          }
      },
      topicList:function() {
          if(typeof this.data.topicList == 'object'){
              return this.data.topicList
          }else{
              return []
          }
      },
      categoryList:function() {
          if(typeof this.data.categoryList == 'object'){
              return this.data.categoryList
          }else{
              return []
          }
      }
  },
  async mounted() {
      let res = await axios.get(api.IndexUrl)
      // console.log(res.data)
      this.data = res.data.data
  },
  components:{
      tabBtn
  }
}

</script>

<style lang="less">
    #home{
        .van-grid-item{
            overflow: hidden
        }
        .swiperimg{
            width: 375px;
            height: 200px;
        }
        .brandList{
            .van-grid-item__content{
                padding: 0;
            }
            .title{
                position: absolute;
                top: 10px;
                left: 10px;
            }
            .price{
                position: absolute;
                top: 35px;
                left: 10px;
                font-size: 15px;
                color: #999;
            }
            .van-image__img{
            border: 1px solid #fff;
            }
        }
        
        .newList{
            .title{
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                margin: 5px auto;
            }
            
            .price{
                
                font-size: 15px;
                color: #999;
                margin: 5px;
            }
        }
        
        .hotList{
            .van-card__price{
                color: red;
            }
            .van-card__content{
                justify-content: center;
                text-align: left;
            }
            .van-card__title{
                font-size: 14px;
                color: #444;
                padding: 5px 0;
                font-weight: 900;
            }
        }
        
        .topicList{
            .explain{
                justify-content: center;
                text-align: left;
                height: 50px;
                .title{
                    margin: 5px 5px;
                }
                .content{
                    font-size: 12px;
                    margin: 5px 5px;
                    padding: 0;
                }
                .readed{
                    position: absolute;
                    bottom: 35px;
                    right: 15px;
                    font-size: 13px;
                    color: red;
                }
            }
            
        }
        
        .categoryList{
            h4 {
                width: 100%;
            }
            .title{
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                margin: 5px;
                font-size: 15px;
            }
            .price{
                margin: 5px;
                color: #900;
                font-size: 14px;
            }
        }
        
    }
    
</style>