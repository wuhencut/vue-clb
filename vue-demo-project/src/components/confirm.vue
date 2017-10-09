<template>
  <div>
    <div class="db-bg"></div>
    <div class="db-wrap" style="z-index:10001; top: 30%;display: block">
      <div class="db-content">
        <div style="padding: 15px 20px 20px; text-align: center" v-html="confirmMsg"></div>
      </div>
      <div class="db-footer">
        <ul>
          <li><a href="javascript:;" @click="close(0)">取消</a></li>
          <li><a href="javascript:;" @click="close(1)">{{sureTxt}}</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  export default{
    name: 'confirm',
    props: ['confirmMsg', 'txtX', 'sureTxt'],
    dada(){
      return {}
    },
    mounted(){

    },
    methods: {
      close(flag){
        if (flag == 0) {
          this.$emit('cancel')
        } else {
          this.$emit('sure')
        }
      },
    }
  }
</script>
