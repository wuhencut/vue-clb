<template>
  <div>
    <app-banner :listImg="listImg"></app-banner>
  </div>
</template>
<script>

  import Banner from './banner.vue'
  import a from '../images/banner/banner1.jpg'
  import b from '../images/banner/banner2.jpg'
  import c from '../images/banner/banner3.jpg'
  import d from '../images/banner/banner4.jpg'
  import e from '../images/banner/banner5.jpg'
  export default {
    name: 'Home',
    data() {
      return {
        listImg: [{
          url: a
        }, {
          url: b
        }, {
          url: c
        }, {
          url: d
        }, {
          url: e
        }]
      }
    },
    components: {
      'app-banner': Banner
    }
  };
</script>
