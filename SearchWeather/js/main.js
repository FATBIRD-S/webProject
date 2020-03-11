var app = new Vue({
    el:"#app",
    data:{
        weatherList: [],
        hotCity:['合肥','昆明','北京','上海','南京','深圳'],
        notice:'',
        city:''
    },
    methods:{
        searchCity: function() {
            let weatherList = [];
            let notice = '';
            // console.log(value);
            axios.get(`http://wthrcdn.etouch.cn/weather_mini?city=${this.city}`)
            .then(response => {
                console.log(response);
                this.weatherList = response.data.data.forecast;
                this.notice = response.data.data.ganmao;
            })
            .catch(err => {
              console.log(err);
            })
            .finally(() => { });
        },
        clickSearch: function(hot) {
            this.city = hot;
            this.searchCity();
        },
        canvasDraw: function() {
            let canvas = this.$refs.mycanvas;
            let context = canvas.getContext('2d');
            canvas.width = 600;
            canvas.heigth = 300;
            
        }
    }
})