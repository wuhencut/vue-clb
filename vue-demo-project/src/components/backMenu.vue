<template>
  <section>
    <router-link v-if="show" :to="backURL" class="nav-left"><i class="icon-back"></i></router-link>
    <a v-if="!show" href="javascript:window.history.back();" class="nav-left"><i class="icon-back"></i></a>
  </section>
</template>
<script>
  export default{
    name: 'backMenu',
    data(){
      return {
        backURL: this.$route.query.backURL,
        historyLen: window.history.length,
        show: false,
      }
    },
    mounted(){
      let t = this;
      if(this.backURL && this.backURL != ''){
        if(t.backURL == '/index')t.backURL = '/';
        t.show = true;
      } else{
        t.show = false;
      }
    },
    methods: {}
  }
</script>
