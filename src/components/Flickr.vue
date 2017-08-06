<template>
    <div id="gallery">
        <swiper :options="swiperOption">
            <swiper-slide v-for="slide in swiperSlides" :key="swiperSlides.id" :style="{backgroundImage: 'url('+slide.src+')'}">
            </swiper-slide>
        </swiper>
    </div>
</template>

<script>
    export default {
        name: 'flickr',
        data() {
            return {
                swiperOption: {
                    autoplay: 5000,
                    setWrapperSize :true,
                    pagination : '',
                    effect: 'fade',
                    speed: 500,
                    mousewheelControl : false,
                    observeParents: true,
                },
                allSlides: [],
                swiperSlides: []
            }
        },
        mounted() {
            this.updateFlickr();
            //setInterval(this.updateFlickr, 3600000);
            let self = this;
            setInterval(() => {
                self.updateSlides();
            }, 150000)
        },
        methods: {
            updateFlickr() {
                console.log('[.] Update Flickr');
                let api = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=6c14f85120153781612e77b6c7a397a1' +
                    '&user_id=139294463%40N06&extras=url_l&per_page=500&format=json&nojsoncallback=1';
                let self = this;
                fetch(api).then(function(res){
                    return res.json();
                }).then(function(json){
                    self.allSlides = json.photos.photo;
                    self.updateSlides();
                }).catch(function(error) { console.log(error); });
            },
            updateSlides() {
                let swiperSlides = this.allSlides;
                if(swiperSlides.length > 0) {
                    //console.log(swiperSlides);
                    let slides = [];
                    let i = 0, j = 0, temp = null;
                    for (i = swiperSlides.length - 1; i > 0; i -= 1) {
                        j = Math.floor(Math.random() * (i + 1));
                        temp = swiperSlides[i];
                        swiperSlides[i] = swiperSlides[j];
                        swiperSlides[j] = temp;
                    }
                    for (let i = 0; i < 30; i++) {
                        slides[i] = {
                            src: swiperSlides[i].url_l,
                            id: i
                        }
                    }
                    console.log(slides);
                    this.swiperSlides = slides;
                }
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
    .swiper-container {
        height: 100%;
    }
    .swiper-slide {
        width: 100%;
        height: 100%;
        text-align: center;
        background-color: #000;
        background-position: center;
        background-size: contain;
        background-repeat: no-repeat;
    }
    #gallery img {
        max-height: 574px;
    }
</style>