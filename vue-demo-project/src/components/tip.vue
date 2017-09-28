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
    dada(){
      return {
        showTip: true,
      }
    },
    mounted(){
      this.startTimer();
    },
    methods: {
      startTimer(){
        setTimeout(function () {
//          console.log(document.getElementsByClassName('db-tip-wrap')[0].style);
          document.getElementsByClassName('db-tip-wrap')[0].style.display = 'none'
        }, 2000);
      }
    }
  }
</script>
