<template>
    <div id="gallery">
        <transition-group tag="div" class='slide-img' name="flip-list">
            <div v-for="(item, index ) in slides" :key="index" v-show="index===nowIndex">
                <img :src="item.src" alt="">
            </div>
        </transition-group>
    </div>
</template>

<script>
    export default {
        name: 'flickr',
        data() {
            return {
                slides: [],
                inv: 3000,  // 图片自动切换速度
                nowIndex: 0
            }
        },
        computed: {
            nextIndex () {
                if (this.nowIndex === this.slides.length - 1) {
                    return 0
                } else {
                    return this.nowIndex + 1
                }
            }
        },
        mounted() {
            this.updateFlickr();
            setInterval(this.updateFlickr, 60000)
        },
        methods: {
            updateFlickr() {
                let api = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=6c14f85120153781612e77b6c7a397a1&user_id=139294463%40N06&extras=url_l&per_page=500&format=json&nojsoncallback=1';
                let self = this;
                fetch(api).then(function(res){
                    return res.json();
                }).then(function(json){
                    let slides = [];
                    for(let i = 0; i < json.photos.photo.length; i ++) {
                        slides[i] = {
                            src: json.photos.photo[i].url_l
                        }
                    }
                    self.slides = slides;
                    console.log(self.slides)
                }).catch(function(error) { console.log(error); });
                this.runInv();
            },
            goto (index) {
                this.nowIndex = index
            },
            runInv () {
                this.invId = setInterval(() => {
                    this.goto(this.nextIndex)
                }, this.inv)
            }
        }
    }

</script>
<style>
    #gallery {
        width: 100%;
        height: 574px;
        position: fixed;
        left: 0;
        bottom: 0;
    }
    #gallery div {
        text-align: center;
    }
    #gallery img {
        max-height: 574px;
        object-fit:cover;
    }
    .flip-list-enter-active, .flip-list-leave-active {
        transition: all 1s;
    }
    flip-list-enter, .flip-list-leave-active {
        opacity: 0;
    }
</style>