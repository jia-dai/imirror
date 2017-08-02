<template>
    <div id="weather-wrap">
        <div id="weather">
            <h2><img id="weather-icon" :src="imgUrl" width="101" height="101"></img> {{weather.now.tmp}}&deg;</h2>
            <div id="region">{{weather.basic.city}}</div>
            <div id="indexes">
                <span>体感温度：{{weather.now.fl}}&deg;</span>
                <span>能见度：{{weather.now.vis}}km</span>
                <span>相对湿度：{{weather.now.hum}}%</span>
                <span>气压：{{weather.now.pres}}hPa</span>
                <span>空气质量：{{weather.aqi.city.qlty}} ({{weather.aqi.city.aqi}})</span>
                <span>PM2.5：{{weather.aqi.city.pm25}}μg/m<sup>3</sup></span>
                <span v-if="room_temp>0">室内温度：°</span>
                <span v-if="room_hum>0">室内湿度：%</span>
            </div>
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
                forecast_day0: '',
                room_temp: 0,
                room_hum: 0

            }
        },
        mounted () {
            this.updateWeather();
            setInterval(this.updateNews, 60000)
        },
        methods: {
            updateWeather () {
                let api = 'https://free-api.heweather.com/v5/weather?city=%E6%B7%B1%E5%9C%B3&key=aa6b2b92808c4dd7aeb560d2b75aaf11';
                let self = this;
                fetch(api).then(function(res){
                    return res.json();
                }).then(function(json){
                    self.weather = json.HeWeather5[0];
                    self.imgUrl = './src/assets/image/weather/'+self.weather.now.cond.code+'.png';
                    self.forecast_day0 = self.weather.daily_forecast[0].cond.txt_d == self.weather.daily_forecast[0].cond.txt_n ? self.weather.daily_forecast[0].cond.txt_d : self.weather.daily_forecast[0].cond.txt_d+'转'+self.weather.daily_forecast[0].cond.txt_n;
                    localStorage.setItem("weather", self.weather);
                    //console.log(json)
                }).catch(function(error) { console.log(error); });

            }
        }
    }
</script>

<style>
    #indexes span {
        width: 180px;
        float: right;
    }
</style>
