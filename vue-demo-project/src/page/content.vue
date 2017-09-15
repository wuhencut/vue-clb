<template>
  <div>
    <app-banner :listImg="listImg"></app-banner>
  </div>
</template>
<script>

  import Banner from './banner.vue'
  import a from '../../static/image/banner1.jpg'
  import b from '../../static/image/banner2.jpg'
  import c from '../../static/image/banner3.jpg'
  import d from '../../static/image/banner4.jpg'
  import e from '../../static/image/banner5.jpg'
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
