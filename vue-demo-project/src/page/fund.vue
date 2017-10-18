<template>
  <section class="page-pay">
    <div class="page-fund">
      <header class="page-header">
        <div class="header-wrap">
          <h3>资金明细 </h3>
          <a href="#/myHome" class="nav-left"><i class="icon-back"></i></a>
        </div>
      </header>
      <div class="mod-fund">
        <div v-if="fundList.length > 0">
          <div v-for="fund in fundList" class="wrap">
            <div class="info clearfix" @click="showCurrFundDetail(fund.id);">
              <dl class="info-l">
                <dt>{{fund.explain}}</dt>
                <dd v-if="currType == 'income' || currType == 'outcome'">{{fund.time | formatTime('yyyy/MM/dd HH:mm:ss')}}
                </dd>
                <dd v-if="(currType == 'charge' || currType == 'withdraw')">{{fund.disposeTime | formatTime('yyyy/MM/dd HH:mm:ss')}}
                </dd>
                <dd v-if="(currType == 'all')">{{(fund.disposeTime?fund.disposeTime:fund.requestTime) | formatTime('yyyy/MM/dd HH:mm:ss')}}</dd>
              </dl>
              <dl class="info-r">
                <dt v-if="fund.type==1">+{{fund.money.toFixed(2)}}</dt>
                <dt v-if="fund.type==2">-{{fund.money.toFixed(2)}}</dt>
                <dd
                  v-if="((currType == 'charge' && fund.status == 0) || (currType == 'all' && fund.explain != '提现取出' && fund.status == 0))">
                  未处理
                </dd>
                <dd v-if="fund.status == 1" class="txt-red">成功</dd>
                <dd v-if="fund.status == 2" class="txt-grey">失败</dd>
                <dd v-if="fund.status == 3">已取消</dd>
                <dd v-if="fund.status == 4">处理中</dd>
              </dl>
            </div>
            <dd
              v-if="(currType == 'withdraw' && fund.status == 0) || (currType == 'all' && fund.explain=='提现取出'&&fund.status == 0)"
              class="cancel-outcome" @click="cancelWithdraw(fund.id);">取消
            </dd>
            <div v-if="fund.id == currFund" class="detail">
              <div v-if="(currType == 'withdraw')||(currType == 'all'&&fund.type == 2&&fund.explain == '提现取出')"
                   class="mod-pay-detail">
                <ul
                  :class="{'process-begin':(fund.status == 0), 'process-doing':(fund.status == 4), 'process-succ':(fund.status == 1), 'process-fail':(fund.status == 2),'process-cancel':(fund.status == 3)}">
                  <li class="begin">
                    <div class="line"></div>
                    <dl>
                      <dt>提现</dt>
                      <dd>{{ fund.requestTime | formatTime('yyyy-MM-dd HH:mm')}}</dd>
                    </dl>
                  </li>
                  <li class="doing">
                    <div class="line"></div>
                    <dl>
                      <dt>处理中</dt>
                      <dd v-if="fund.status == 4">{{fund.requestTime | formatTime('yyyy-MM-dd HH:mm')}}</dd>
                      <dd v-if="fund.status == 1 || fund.status == 2 || fund.status == 3">{{fund.disposeTime |  formatTime('yyyy-MM-dd HH:mm')}}
                      </dd>

                    </dl>
                  </li>
                  <li class="done">
                    <div class="line"></div>
                    <dl v-if="fund.status != 1 && fund.status != 2 && fund.status != 3">
                      <dt>提现成功</dt>
                      <dd></dd>
                    </dl>
                    <dl v-if="fund.status == 1">
                      <dt>提现成功</dt>
                      <dd>{{fund.disposeTime | formatTime('yyyy-MM-dd HH:mm')}}</dd>
                    </dl>
                    <dl v-if="fund.status == 2">
                      <dt>提现失败</dt>
                      <dd>{{fund.disposeTime | formatTime('yyyy-MM-dd HH:mm')}}</dd>
                    </dl>
                    <dl v-if="fund.status == 3">
                      <dt>已取消</dt>
                      <dd>{{fund.disposeTime | formatTime('yyyy-MM-dd HH:mm')}}</dd>
                    </dl>
                  </li>
                </ul>
              </div>
              <p v-if="currType == 'withdraw'" class="pt10">提现账户:{{fund.detail}}</p>
              <p v-if="currType == 'withdraw' && fund.status == 3" class="pt10 txt-s12 pb10">
                详情：您已取消提现，提现金额已返还至你的账户余额。</p>
              <p v-if="(currType != 'withdraw')||(currType!='all'&&fund.type == 2&&fund.explain == '提现取出')"
                 class="txt-s12 txt-grey pt5">详情：{{fund.detail}}</p>
            </div>
          </div>
          <div v-if="currPage != totalPage" class="pt10">
            <div class="mod-more"
                 @click="getFundDetailList(fundTypeList[currType].value, fundTypeList[currType].explain, (currPage+1));">
              加载更多
            </div>
          </div>
        </div>
        <div v-if="fundList.length == 0" class="mod-no-data">暂无数据</div>
      </div>
    </div>
    <div class="fund-dialog">
      <ul style="border-bottom: 1px solid #ECECEC">
        <li :class="currType" v-for="(value, key) in fundTypeList" @click="confirmFundType(key);">
          <span :class="key">{{value.text}}</span>
        </li>
      </ul>
    </div>
    <confirm v-if="glb.showConfirm" :confirmMsg="glb.confirmMsg" @sure="confirmFunc(1)" @cancel="confirmFunc(0)"
             :sureTxt="glb.sureTxt"></confirm>
    <loading v-if="glb.showLoading"></loading>
    <tip v-if="glb.showTip" :tip="glb.tipMsg" @hide="glb.showTip = false"></tip>
  </section>
</template>
<script>
  export default{
    data(){
      return {
        glb: this.global,
        pageSize: 10,
        currType: this.$route.query.type || 'all',//当前类别
        currFund: 0,//当前选择ID
        currPage: 1,//当前页
        totalPage: 1,//总页数
        //类别列表
        fundTypeList: {
          all: {
            value: 'chargeWithdraw',
            text: '全部',
            explain: 'all'
          },
          charge: {
            value: 'chargeWithdraw',
            text: '充值',
            explain: 'income'
          },
          withdraw: {
            value: 'chargeWithdraw',
            text: '提现',
            explain: 'outcome'
          },
          income: {
            value: 'loan',
            text: '收入',
            explain: 'income'
          },
          outcome: {
            value: 'loan',
            text: '支出',
            explain: 'outcome'
          }
        },

        //数据列表
        fundList: [],
      }
    },
    mounted(){
      //初始化加载数据列表
      this.confirmFundType(this.currType, this.currPage);
    },
    methods: {
      //根据条件获取数据列表
      getFundDetailList(action, explain, page) {
        let t = this;
        var isNotTypeChanged = false;
        action = action || '';
        page = page || 1;

        if (action == t.fundTypeList[t.currType].value && explain == t.fundTypeList[t.currType].explain) {
          isNotTypeChanged = true;
        }

        t.glb.showLoading = true;
        if (explain == 'all') {
          this.server.PayService.getFundAll(action, page, t.pageSize).then(function (res) {
            var data = res.data;
            if (data.code == 100) {
              var list = data.data['items'];
              t.currPage = data.data['pageIndex'];//当前页
              t.totalPage = data.data['totalPage'];//总页数
              if (isNotTypeChanged && page != 1) {
                t.fundList = t.fundList.concat(list);
              } else {
                t.fundList = list;
              }
            } else {
              t.glb.showTip = true;
              t.glb.tipMsg = data['resultMsg'];
            }
            t.glb.showLoading = false;
          }).catch(function (error) {
            if (error) {
              Promise.reject(error);
            } else {
              t.glb.showTip = true;
              t.glb.tipMsg = '服务器请求异常';
            }
          });
        } else {
          this.server.PayService.getFundDetail(action, explain, page, t.pageSize).then(function (res) {
            var data = res.data;
            if (data.code == 100) {
              var list = data.data['items'];
              t.currPage = data.data['pageIndex'];//当前页
              t.totalPage = data.data['totalPage'];//总页数
              if (isNotTypeChanged && page != 1) {
                t.fundList = t.fundList.concat(list);
              } else {
                t.fundList = list;
              }
            } else {
              t.glb.showTip = true;
              t.glb.tipMsg = data['resultMsg'];
            }
            t.glb.showLoading = false;
          }).catch(function (error) {
            if (error) {
              Promise.reject(error);
            } else {
              t.glb.showTip = true;
              t.glb.tipMsg = '服务器请求异常';
            }
          });
        }
      },

      //确认选择类别
      confirmFundType(currType, page) {
        let t = this;
        page = page || 1;
        var type = t.fundTypeList[currType].value;
        var explain = t.fundTypeList[currType].explain;

        t.currType = currType;
        t.showTypeDialog = false;
        t.getFundDetailList(type, explain, page);
      },

      //显示当前选择的明细详情
      showCurrFundDetail(fundId) {
        this.currFund = this.currFund == fundId ? 0 : fundId;
      },

      //取消提现
      cancelWithdraw(fundId) {
        this.glb.showConfirm = true;
        this.glb.confirmMsg = '取消提现后金额自动退还到账户余额';
        this.glb.sureTxt = '确定';
        X.dialog.confirm('取消提现后金额自动退还到账户余额', {
          notify: function (nt) {
            if (nt == 1) {
              /*$scope.$apply(function () {
               cancel(fundId);
               });*/
              cancel(fundId);
            }
          }
        })
      },

      cancel(id) {
        let t = this;
        t.glb.showLoading = true;
        t.server.PayService.cancelWithdraw(id).then(function (res) {
          var data = res.data;
          if (data.code == 100) {
            var withDraw = t.fundTypeList['withdraw'];
            t.getFundDetailList(withDraw['value'], withDraw['explain']);
          } else {
            t.glb.showTip = true;
            t.glb.tipMsg = data['resultMsg'];
          }
          t.glb.showLoading = false;
        }).catch(function (error) {
          if (error) {
            Promise.reject(error);
          } else {
            t.glb.showTip = true;
            t.glb.tipMsg = '服务器请求异常';
          }
        });
      }
    },
    computed: {},
    destroyed(){

    }
  }
</script>
