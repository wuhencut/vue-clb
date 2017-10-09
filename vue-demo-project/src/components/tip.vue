<template>
  <div class="db-tip-wrap">
    <div class="db-tip">
      {{tip}}
    </div>
  </div>
</template>
<script>
  export default{
    name: 'tip',
    props: ['tip'],
    data(){
      return {
      }
    },
    mounted(){
      this.startTimer();
    },
    methods: {
      startTimer(){
        let t = this;
        setTimeout(function () {
          t.$emit('hide')
        }, 2000);
      }
    }
  }
</script>
