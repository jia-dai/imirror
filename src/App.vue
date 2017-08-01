<template>
  <div class="container" id="app">
    <div class="row">
      <section>
        <div class="left">
          <Datetime></Datetime>
        </div>
        <div class="right">
          <div id="weather"></div>
          <div id="temp"></div>
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

  export default {
      //name: 'app',
      data () {
        return {}
      },
      components: {
          Datetime,
          News
      }
  }
</script>

<style>
</style>
