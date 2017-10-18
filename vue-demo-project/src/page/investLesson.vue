<template>
  <section class="page-invest">
    <div class="page-knowledge">
      <header class="page-header">
        <div class="header-wrap">
          <h3>投资课堂</h3>
          <router-link :to="indexUrl" class="nav-left">
            <i class="icon-back"></i>
          </router-link>
        </div>
      </header>
      <div class="mod-nav">
        <router-link :key="item.id" v-for="item in navObjs" :class="item.className" :to="item.href">{{item.content}}
        </router-link>
      </div>

      <div class="more-knowledge">
        <p class="trade-knowledge"><i>交易宝典</i></p>
        <div class="container">
          <router-link :key="item.id" v-for="item in titleObjs" :class="item.className" :to="item.href">
            {{item.content}}
          </router-link>
        </div>
      </div>


    </div>
  </section>
</template>
<script>
  export default{
    data(){
      return {
        indexUrl: this.server.SystemService().agentIndex(),
        navObjs: {
          'know001': {
            className: 'base-knowledge',
            href: '/knowledgeDetail/know001',
            content: '基础知识'
          },
          'konw002': {
            className: 'safe-knowledge',
            href: '/knowledgeDetail/know002',
            content: '安全知识'
          }
        },
        titleObjs: {
          'QA0001': {
            className: 'invest1',
            href: '/knowledgeDetail/QA0001',
            content: '[K线图专题]利用K线图看懂原油走势'
          },
          'QA0002': {
            className: 'invest2',
            href: '/knowledgeDetail/QA0002',
            content: 'K线图中哪些信号需要警示'
          },
          'QA0003': {
            className: 'invest3',
            href: '/knowledgeDetail/QA0003',
            content: '关于BOLL的总结与注意事项 '
          },
          'QA0004': {
            className: 'invest4',
            href: '/knowledgeDetail/QA0004',
            content: '谁动了我的盈利'
          },
          'QB0001': {
            className: 'invest5',
            href: '/knowledgeDetail/QB0001',
            content: '完美组合拳：MACD搭配布林带'
          },
          'QB0002': {
            className: 'invest6',
            href: '/knowledgeDetail/QB0002',
            content: '原油投资技术分析有什么缺点？'
          },
          'QB0003': {
            className: 'invest7',
            href: '/knowledgeDetail/QB0003',
            content: '原油投资如何控制、降低风险？'
          },
          'QB0004': {
            className: 'invest8',
            href: '/knowledgeDetail/QB0004',
            content: '原油投资如何正确把握利润？'
          }
        },
      }
    }
  }
</script>
