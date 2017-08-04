<template>
    <div id="gallery">
        <swiper :options="swiperOption">
            <swiper-slide v-for="slide in swiperSlides">
                <img :src="slide.src">
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
                    autoplay: 3500,
                    setWrapperSize :true,
                    pagination : '',
                    effect: 'fade',
                    speed: 500,
                    mousewheelControl : true,
                    observeParents:true,
                },
                swiperSlides: [1, 2, 3, 4, 5]
            }
        },
        mounted() {
            this.updateFlickr();
            //setInterval(this.updateFlickr, 3600000);
            setInterval(() => {
                //console.log('simulate async data');
                let swiperSlides = this.swiperSlides;
                if (swiperSlides.length < 10) swiperSlides.push(swiperSlides.length + 1)
            }, 3000)
        },
        methods: {
            updateFlickr() {
                let api = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=6c14f85120153781612e77b6c7a397a1' +
                    '&user_id=139294463%40N06&extras=url_l&per_page=500&format=json&nojsoncallback=1';
                let self = this;
                fetch(api).then(function(res){
                    return res.json();
                }).then(function(json){
                    let slides = [];
                    for(let i = 0; i < json.photos.photo.length; i ++) {
                        let j = Math.floor(Math.random() * json.photos.photo.length);
                        slides[i] = {
                            src: json.photos.photo[j].url_l
                        };
                        json.photos.photo.splice(j, 1);
                    }
                    self.swiperSlides = slides;
                    //console.log(self.swiperSlides)
                }).catch(function(error) { console.log(error); });
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
    .swiper-slide {
        width: 100%;
        height: 100%;
        text-align: center;
        background-color: #000;
    }
    #gallery img {
        max-height: 574px;
    }
</style>