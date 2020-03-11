<template>
    <div id="category">
        <van-search v-model="searchValue" placeholder="商品搜索" input-align="center" />

        <van-tree-select 
        :items="items" 
        :main-active-index.sync="activeIndex" 
        :active-id.sync="activeId"
        height="calc(100vh - 104px)"
        @click-nav='changeRight'
        >
            <template slot="content">
                <div class="bannerImg">
                    <img width="100%" :src="bannerImg" />
                </div>
                <van-grid :column-num="3">
                  <van-grid-item 
                  v-for="(item, index) in subCategoryList" 
                  :key="index" 
                  :icon="item.banner_url" 
                  :text="item.name" 
                  @click='getindex(index)'
                  :to="'/categorylist/' + item.id"/>
                </van-grid>
            </template>
        </van-tree-select>
        <tab-btn></tab-btn>
    </div>

</template>

<script>
    import tabBtn from '../components/tabBtn.vue';
    import api from '../assets/config/api.js';
    import axios from 'axios'

    export default {
        data: function() {
            return {
                data: {},
                searchValue: "",
                activeId: 0,
                activeIndex: 0,
                subCategoryList: [],
                bannerImg: '',
                liveactive: 0
            }
        },
        components: {
            tabBtn
        },
        computed: {
            items() {
                // [{text: '分组 1'}, {text: '分组 2'}]}
                if (this.data.categoryList == undefined) {
                    return []
                } else {
                    let arr = [];
                    this.data.categoryList.forEach((item, index) => {
                        item.text = item.name;
                        arr.push(item);
                    })
                    // console.log(arr);
                    return arr;
                }
            }
        },
        watch:{
            async activeIndex(){
                if(this.items.length!==0){
                    let id = this.items[this.activeIndex].id;
                    // console.log(id)
                    let res = await axios.get(api.CatalogCurrent,{params:{id}})
                    this.subCategoryList = res.data.data.currentCategory.subCategoryList
                    this.bannerImg = this.items[this.activeIndex].img_url
                    console.log(this.subCategoryList)
                }else{
                    this.subCategoryList = []
                }
            }
        },
        async created() {
            let res = await axios.get(api.CatalogList)
            let data = res.data;
            this.data = data.data;
            
            let id = this.items[this.activeIndex].id;
            let content = await axios.get(api.CatalogCurrent,{params:{id}})
            this.subCategoryList = content.data.data.currentCategory.subCategoryList
            this.bannerImg = this.items[this.activeIndex].img_url
            
            console.log(data)
        },
        methods:{
            changeRight(index){
                // console.log(index)
                this.activeIndex = index;
            },
            getindex(index){
                console.log(index)
                this.$store.commit('setCateGoryIndex', index)
                
            }
        }
    }
</script>

<style lang="less">
#category{
    .wap_banner_url{
        width: 100%;
        box-sizing: border-box;
        padding: 10px;
    }
}
</style>
