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
          <ul id="outlook"></ul>
        </div>
      </section>
    </div>
    <div class="row">
      <div id="yiyan">
        <h3 class="words"></h3>
        <h5 class="source"></h5>
      </div>
    </div>
    <div class="galleria"></div>
  </div>
</template>

<script>
  import Datetime from './components/Datetime.vue'
  import News from './components/News.vue'
  import Weather from './components/Weather.vue'

  export default {
      //name: 'app',
      data () {
        return {}
      },
      components: {
          Datetime,
          News,
          Weather
      }
  }
</script>

<style>
</style>
