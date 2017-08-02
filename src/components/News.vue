<template>
    <div id="news-wrap">
        <ul id="news" v-if="news.length" :style="{ top }">
            <li v-for="item in news" class="panel">
                <div class="news_title">{{item.title}}</div>
                <div class="news_digest">{{item.digest}}</div>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'news',
        data () {
            return {
                news: '',
                activeIndex: 0
            }
        },
        computed: {
            top() {
                return - this.activeIndex * 60 + 'px';
            }
        },
        mounted () {
            this.updateNews();
            setInterval(_ => {
                if(this.activeIndex < this.news.length-2) {
                    this.activeIndex += 1;
                } else {
                    this.activeIndex = 0;
                }
            }, 10000);
            setInterval(this.updateNews, 300000)
        },
        methods: {
            updateNews () {
                let api = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20json%20where%20url%3D'http%3A%2F%2Fc.m.163.com%2Fnc%2Farticle%2Fheadline%2FT1348647853363%2F0-20.html'&format=json";
                let self = this;
                fetch(api).then(function(res){
                        return res.json();
                    }).then(function(json){
                        self.news = json.query.results.json.T1348647853363;
                        console.log(self.news)
                    }).catch(function(error) { console.log(error); });
            }
        }
    }
</script>

<style>
    #news-wrap {
        height: 180px;
        overflow: hidden;
    }
    #news {
        position: relative;
        transition: top 0.5s;
        display: block;
        padding: 0;
        margin: 0;
        border-top: 1px solid #DDD;
        border-bottom: 1px solid #999;
    }
    .news_title, .news_digest {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
    .news_title {
        padding: 3px 5px 3px 5px;
        font-size: 1.1em;
    }
    .news_digest {
        padding: 0 5px 0 5px;
        font-size: 0.86em;
        color: #ccc;
    }
</style>