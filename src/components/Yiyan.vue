<template>
    <div id="yiyan">
        <h3 class="words">{{yiyan.hitokoto}}</h3>
        <h5 class="source" v-if="yiyan.from">——《{{yiyan.from}}》</h5>
    </div>
</template>

<script>
    export default {
        name: 'yiyan',
        data() {
            return {
                yiyan: ''
            }
        },
        mounted() {
            this.updateYiyan();
            setInterval(this.updateYiyan, 120000)
        },
        methods: {
            updateYiyan() {
                let api = 'http://api.hitokoto.cn/?charset=utf-8';
                let self = this;
                fetch(api).then(function(res){
                    return res.json();
                }).then(function(json){
                    self.yiyan = json;
                    //console.log(self.yiyan)
                }).catch(function(error) { console.log(error); });
            }
        }
    }
</script>

<style>
    #yiyan {
        padding: 200px 0 20px 0;
    }
    #yiyan .words {
        font-size: 20px;
        text-align: center;
        width: 100%;
    }
    #yiyan .source {
        min-width: 30%;
        float: right;
        font-size: 14px;
        margin: 0;
    }
</style>