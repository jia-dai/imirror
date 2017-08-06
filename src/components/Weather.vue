<template>
    <div id="weather-wrap">
        <div id="weather" v-if="weather">
            <h2><img id="weather-icon" :src="imgUrl" width="101" height="101"></img> {{weather.now.tmp}}&deg;</h2>
            <div id="region">{{weather.basic.city}}</div>
            <div id="indexes">
                <div><span>体感温度</span><br>{{weather.now.fl}}&deg;</div>
                <div><span>相对湿度</span><br>{{weather.now.hum}}<small>%</small></div>
                <div><span>PM2.5</span><br>{{weather.aqi.city.pm25}}</div>
                <div><span>空气质量</span><br>{{weather.aqi.city.qlty}}</div>
            </div>
            <div id="temp" v-if="room_temp">室内温度：{{room_temp}}&deg; 室内湿度：{{room_hum}}<small>%</small></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'weather',
        data () {
            return {
                weather: '',
                imgUrl: '',
                room_temp: 0,
                room_hum: 0
            }
        },
        mounted () {
            this.updateWeather();
            setInterval(this.updateWeather, 100000)
        },
        methods: {
            updateWeather () {
                let api = 'https://free-api.heweather.com/v5/weather?city=%E6%B7%B1%E5%9C%B3&key=aa6b2b92808c4dd7aeb560d2b75aaf11';
                let dht22 = "/static/dht22.json";
                let self = this;
                fetch(api).then(function(res){
                    return res.json();
                }).then(function(json){
                    self.weather = json.HeWeather5[0];
                    self.imgUrl = './src/assets/image/weather/'+self.weather.now.cond.code+'.png';
                    localStorage.setItem("weather", JSON.stringify(self.weather));
                    //console.log(json)
                }).catch(function(error) { console.log(error); });
                fetch(dht22).then(function(res){
                    return res.json();
                }).then(function(json){
                    self.room_temp = json.temp;
                    self.room_hum = json.hum;
                    console.log(json)
                }).catch(function(error) { console.log(error); });

            }
        }
    }
</script>

<style>
    #weather h2 {
        margin: 0 0 3px;
        color: #F8F8FF;
        font-size: 80px;
        font-weight: 300;
        text-align: right;
    }

    #weather div, #temp {
        line-height: 30px;
        /*margin-right: 100px;
        font-family: 'Open Sans', sans-serif;*/
        font-size: 1.5em;
        margin-top: 6px;
    }
    #weather-icon {
        display: block;
        float: left;
        margin-left: 120px;
        margin-right: 18px;
        margin-top: 8px;
    }
    #weather, #temp {
        text-align: right;
        /*margin-bottom: 20px;*/
    }
    #indexes div {
        width: 96px;
        /*float: right;*/
        display: inline-block;
        border-right: #ccc 1px solid;
        text-align: center;
    }
    #indexes div:last-child {
        border-right: none;
    }
    #indexes div span {
        font-size: 0.66em;
        color: #999;
    }
</style>
