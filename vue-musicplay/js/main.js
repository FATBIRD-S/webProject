/*
  1:歌曲搜索接口
    请求地址:https://autumnfish.cn/search
    请求方法:get
    请求参数:keywords(查询关键字)
    响应内容:歌曲搜索结果

  2:歌曲url获取接口
    请求地址:https://autumnfish.cn/song/url
    请求方法:get
    请求参数:id(歌曲id)
    响应内容:歌曲url地址
  3.歌曲详情获取
    请求地址:https://autumnfish.cn/song/detail
    请求方法:get
    请求参数:ids(歌曲id)
    响应内容:歌曲详情(包括封面信息)
  4.热门评论获取
    请求地址:https://autumnfish.cn/comment/hot?type=0
    请求方法:get
    请求参数:id(歌曲id,地址中的type固定为0)
    响应内容:歌曲的热门评论
  5.mv地址获取
    请求地址:https://autumnfish.cn/mv/url
    请求方法:get
    请求参数:id(mvid,为0表示没有mv)
    响应内容:mv的地址
*/

var musicApp = new Vue({
    el:"#play",
    data:{
        seaName:'陈奕迅',
        musicList:[],
        musicSrc:'',
        imgURL:'./img/disc.png',
        hotComments:[]
        
    },
    methods:{
        searchEnter:function() {
            var that = this;
            axios.get('https://autumnfish.cn/search?keywords=' + this.seaName)
            .then(responce => {
                // console.log(responce);
                that.musicList = responce.data.result.songs;
                // console.log(that.musicList);
                
            },
            function(err){
            });
        },
        musicPlay(id) {
            var that = this;
            console.log(id);
            // 获取歌曲封面
            axios.get('https://autumnfish.cn/song/detail?ids=' + id)
            .then(musicInf => {
                // console.log(musicInf);
                that.imgURL = musicInf.data.songs[0].al.picUrl;
            },function(err){
                
            });
            // 获取歌曲URL
            axios.get('https://autumnfish.cn/song/url?id=' + id)
            .then(urlResponce => {
                // console.log(urlResponce);
                that.musicSrc = urlResponce.data.data[0].url;
                // console.log(that.musicSrc);
            },function(err){
                
            });
            axios.get('https://autumnfish.cn/comment/hot',{
                params: {
                    type: 0,
                    id: id
                }
            }).then(pinResponce => {
                // console.log(pinResponce)
                that.hotComments = pinResponce.data.hotComments;
                console.log(that.hotComments)
            },function(err) {
                
            })
            
        }
       
    },
    // beforeMount:function(){
    //     this.seaName = '陈奕迅';
    // },
    // mounted: function() {
    //     this.$options.methods.musicPlay(65766);
    //     // this.$options.methods.searchEnter();
    //     console.log(this.seaName)
        // console.log(this.$el);
        // console.log(this.$data);
    // }
})