<template>
    <div id="forecast-wrap">
        <ul id="forecast">
            <li v-for="item in forecast" class="panel">
                <div class="day_name">{{item.date}}</div>
                <div class="day_icon"><img :src="item.imgUrl" style="width:36px; height:36px" width="36" height="36"></div>
                <div class="day_text_wrapper"><p class="day_text">{{item.cond.txt_d}}<span v-if="item.cond.txt_d != item.cond.txt_n">转{{item.cond.txt_n}}</span></p></div>
                <div class="temperature_range">{{item.tmp.min}}~{{item.tmp.max}}&deg;</div>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'forecast',
        data () {
            return {
                forecast: ''
            }
        },
        mounted () {
            this.updateForecast();
            setInterval(this.updateForecast, 60000)
        },
        methods: {
            updateForecast () {
                let weather = window.localStorage.getItem('weather');
                if(weather) {
                    let forecasts = JSON.parse(weather);
                    forecasts = forecasts.daily_forecast;
                    forecasts[0].date = '今天';
                    forecasts[1].date = '明天';
                    let dat = new Date(forecasts[2].date);
                    forecasts[2].date = (dat.getMonth()+1)+'月'+dat.getDate()+'日';
                    for(let i = 0; i <= 2 ; i ++) {
                        // weather icon
                        forecasts[i].imgUrl = './src/assets/image/weather/'+Math.max(forecasts[i].cond.code_d, forecasts[i].cond.code_n)+'.png';
                    }

                    console.log(forecasts);
                    this.forecast = forecasts;

                }
            }
        }
    }
</script>

<style>
    #forecast-wrap {
        height: 181px;
        overflow: hidden;
    }
    #forecast {
        display: block;
        vertical-align: top;
        padding: 0;
        margin: 0;
        border-top: 1px solid #DDD;
        border-bottom: 1px solid #999;
    }

    i {
        color: #F8F8FF;
        font-size: 150px;
        font-weight: normal;
        font-style: normal;
        line-height: 1.0;
    }

    #weather h2 {
        margin: 0 0 3px;
        color: #F8F8FF;
        font-size: 80px;
        font-weight: 300;
        text-align: right;
    }

    #weather div, #temp {
        height: 30px;
        line-height: 30px;
        /*margin-right: 100px;
        font-family: 'Open Sans', sans-serif;*/
        font-size: 1.5em;
    }

    .panel {
        position: relative;
        display: block;
        width: 100%;
        height: 60px;
        font-size: 18px;
        border-bottom: 1px solid #999;
        -webkit-transition: transform 0.15s ease-in;
        -moz-transition: transform 0.15s ease-in;
        -o-transition: transform 0.15s ease-in;
        transition: transform 0.15s ease-in;
        -webkit-transition: -o-transform 0.15s ease-in;
        -moz-transition: -o-transform 0.15s ease-in;
        -o-transition: -o-transform 0.15s ease-in;
        transition: -o-transform 0.15s ease-in;
        -webkit-transition: -ms-transform 0.15s ease-in;
        -moz-transition: -ms-transform 0.15s ease-in;
        -o-transition: -ms-transform 0.15s ease-in;
        transition: -ms-transform 0.15s ease-in;
        -webkit-transition: -moz-transform 0.15s ease-in;
        -moz-transition: -moz-transform 0.15s ease-in;
        -o-transition: -moz-transform 0.15s ease-in;
        transition: -moz-transform 0.15s ease-in;
        -webkit-transition: -webkit-transform 0.15s ease-in;
        -moz-transition: -webkit-transform 0.15s ease-in;
        -o-transition: -webkit-transform 0.15s ease-in;
        transition: -webkit-transform 0.15s ease-in;
    }
    .day_name {
        position: absolute;
        line-height: 60px;
        left: 5px;
        width: 75px;
        text-align: center;
    }
    .day_icon {
        position: absolute;
        /*top: 9px;*/
        left: 92px;
        height: 60px;
        line-height: 60px;
        width: 50px;
    }
    .day_text_wrapper {
        display: table;
        position: absolute;
        top: 0;
        left: 140px;
        width: 175px;
        height: 60px;
    }
    .day_text {
        display: table-cell;
        height: 60px;
        vertical-align: middle;
        line-height: 24px;
        font-weight: 400;
        color: #ddd;
    }
    .temperature_range {
        position: absolute;
        left: 315px;
        width: 80px;
        height: 60px;
        line-height: 60px;
        text-align: right;
    }
</style>