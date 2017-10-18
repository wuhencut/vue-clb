<template>
  <section>
    <router-link v-if="show" :to="{path: backURL, query: query}" class="nav-left"><i class="icon-back"></i></router-link>
    <a v-if="!show" href="javascript:window.history.back();" class="nav-left"><i class="icon-back"></i></a>
  </section>
</template>
<script>
  export default{
    name: 'backMenu',
    data(){
      return {
        backURL: '',
        query: this.$route.query,
        historyLen: window.history.length,
        show: false,
      }
    },
    mounted(){
      let t = this;
      t.backURL = t.query[0] || '';
      delete t.query.backURL;
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
