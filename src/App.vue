<template>
  <div class="container" id="app">
    <div class="row">
      <section>
        <div class="left">
          <Datetime></Datetime>
        </div>
        <div class="right">
          <Weather></Weather>
        </div>
      </section>
    </div>
    <div class="row">
      <section>
        <div class="left">
          <News></News>
        </div>
        <div class="right">
          <Forecast></Forecast>
        </div>
      </section>
    </div>
    <div class="row">
      <Yiyan></Yiyan>
    </div>
    <Flickr></Flickr>
  </div>
</template>

<script>
  import Datetime from './components/Datetime.vue'
  import News from './components/News.vue'
  import Weather from './components/Weather.vue'
  import Forecast from './components/Forecast.vue'
  import Yiyan from './components/Yiyan.vue'
  import Flickr from './components/Flickr.vue'

  export default {
      //name: 'app',
      data () {
        return {}
      },
      components: {
          Datetime,
          News,
          Weather,
          Forecast,
          Yiyan,
          Flickr
      }
  }
</script>

<style>
</style>
