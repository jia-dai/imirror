<template>
    <div id="datetime">
        <p id="time">{{hours}}:{{minutes}}<sup>{{seconds}}</sup></p>
        <p id="date">{{month}}月{{date}}日 星期{{day}}</p>
        <p id="lunar">{{lunar.GanZhiYear}}年 {{lunar.lunarMonthName}} {{lunar.lunarDayName}}</p>
        <div>
            <span v-if="lunar.term">{{lunar.term}}</span>
            <span v-if="lunar.solarFestival">{{lunar.solarFestival}}</span>
            <span v-if="lunar.lunarFestival">{{lunar.lunarFestival}}</span>
        </div>
    </div>
</template>

<script>
    import { getZeroPad } from '../filters/index.js'
    let LunarCalendar = require("lunar-calendar");
    export default {
        name: 'datetime',
        data () {
            return {
                month: '',
                date: '',
                day: '',
                hours: '',
                minutes: '',
                seconds: '',
                hourtime: '',
                lunar: ''
            }
        },
        mounted () {
            setInterval(this.updateDateTime, 1000)
        },
        methods: {
            updateDateTime () {
                let days = new Array("日", "一", "二", "三", "四", "五", "六");
                let now = new Date();
                let current = {
                    year : now.getFullYear(),
                    month : now.getMonth()+1,
                    day : now.getDate()
                };
                let currentLunar = LunarCalendar.solarToLunar(current.year, current.month, current.day);
                this.month = now.getMonth();
                this.date = now.getDate();
                this.day = days[now.getDay()];
                this.hours = now.getHours();
                this.minutes = getZeroPad(now.getMinutes());
                this.seconds = getZeroPad(now.getSeconds());
                /*
                let lunar = currentLunar.GanZhiYear+'年 ' + currentLunar.lunarMonthName + ' ' + currentLunar.lunarDayName;
                if(currentLunar.term != undefined) lunar += ' ('+currentLunar.term+')';
                if(currentLunar.solarFestival != undefined) lunar += ' / '+currentLunar.solarFestival;
                if(currentLunar.lunarFestival != undefined) lunar += ' / '+currentLunar.lunarFestival;
                */
                this.lunar = LunarCalendar.solarToLunar(current.year, current.month, current.day);
            }
        }
    }
</script>

<style>
    #datetime p {
        font-size: 1.5em;
    }

    #time {
        font-size: 8em !important;
        padding: 0;
        margin: 0 0 3px;
    }

    #time sup {
        top: -1em;
        font-size: 50%;
    }
</style>