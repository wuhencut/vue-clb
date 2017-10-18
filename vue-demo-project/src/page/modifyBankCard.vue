<template>
  <div>
    <section class="page-pay">
      <div class="page-modify-bank-card">
        <header class="page-header">
          <div class="header-wrap">
            <h3>修改银行卡</h3>
            <backMenu></backMenu>
          </div>
        </header>
        <div class="mod-modify-bank-card">
          <div class="pl15 pr15">
            <div class="card-info clearfix">
              <span class="icon"><i :class="bankClass"></i></span>
              <p v-if="bankCard" class="title">{{bankCard.bank}} <span v-if="bankCard.defaultCard==0">(默认卡)</span></p>
              <p v-if="bankCard" class="number">**** **** **** {{bankCard.cardNumber.substr(-4)}}</p>
            </div>
          </div>
          <div class="mt15">
            <ul class="list">
              <li>
                <span>开户名</span>
                <span>{{user.name}}</span>
              </li>
              <li @click="chooseProvice();">
                <span>开户所在省</span>
                <span>{{province}}</span>
                <i class="mod-arrow-r"></i>
              </li>
              <li @click="chooseCity();">
                <span>开户所在市</span>
                <span>{{city}}</span>
                <i class="mod-arrow-r"></i>
              </li>
              <li @click="chooseBranch();">
                <span>开户支行</span>
                <span>{{branch}}</span>
                <i class="mod-arrow-r"></i>
              </li>
            </ul>
          </div>
        </div>
        <div class="pt20 pl15 pr15">
          <button class="btn btn-blue" @click="save();">确定</button>
        </div>
        <div class="pt20 pl15 pr15 pb20 txt-red clearfix">
          <span class="fl" v-if="bankCard && bankCard.defaultCard!=0" @click="setDefaultBankCard();">设为默认卡</span>
          <span class="fr" @click="deleteBankCard();">删除银行卡</span>
        </div>
      </div>
      <tip :tip="glb.tipMsg" @hide="glb.showTip = false" v-if="glb.showTip"></tip>
      <loading v-if="glb.showLoading"></loading>
      <confirm :confirmMsg="glb.confirmMsg" @sure="confirmFunc(1)" :sureTxt="glb.sureTxt" @cancel="confirmFunc(0)" v-if="glb.showConfirm"></confirm>
    </section>
    <!--选择开户行-->
    <div class="dialog-wrap" v-show="showDialog" style="padding-bottom: 0;">
      <section class="page-pay">
        <div class="page-bank-branch page-dialog">
          <header class="page-header">
            <div class="header-wrap">
              <h3 v-if="title">{{title}}</h3>
              <a @click="showDialog = false;" class="nav-left"><i class="icon-back"></i></a>
            </div>
          </header>
          <div class="mod-menu-wrap">
            <a v-if="title" class="mod-menu" v-for="item in list" @click="sureChoose(title,item[0],item[1]);">
              {{item[1]}}
            </a>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
  export default{
    data(){
      return {
        title: '',
        glb: this.global,
        bankCardId: this.$route.params.bankCardId,
        provinces: this.server.SystemService().getProvince(),
        cities: this.server.SystemService().getCities(),
        backURL: this.$route.query.backURL || '/bankCardList',
        bankCard: null,
        user: {},
        showDialog: false,
        list: [], //保存省市支行的数组，通用数组
        provinceId: '',
        province: '请选择省',
        city: '请选择市',
        branch: '请选择开户支行',
        sureBankCard: '',
        confirmType: '',//弹窗类型
        bankClass: '',//银行卡头部样式图片
      }
    },
    mounted(){
      this.getData();
    },
    methods: {
      getData(){
        let t = this;
        this.glb.showLoading = true;
        this.axios.all([
          this.server.UserService.getBankCardById(t.bankCardId),
          this.server.UserService.getUserInfo()
        ]).then(this.axios.spread(function (bankCard, userInfo) {
          var bankCardData = bankCard.data;
          var userData = userInfo.data;
          if (bankCardData.code == 100 && userData.code == 100) {
            t.user = userData.data;
            t.bankCard = bankCardData.data;
            t.bankClass = 'icon-bank-' + t.bankCard.bankCode;
            if (t.user.name == '') {
              t.toIdenty();
            } else {
              t.initData();
            }
          } else {
            X.tip(bankCardData['resultMsg']);
          }
          t.glb.showLoading = false;
        })).catch(function (error) {
          if (error) {
            Promise.reject(error);
          } else {
            t.glb.showTip = true;
            t.glb.tipMsg = '服务器请求异常';
          }
        });
      },


      //选择省份
      chooseProvice() {
        let t = this;
        this.title = '开户省份';
        this.list = [];
        var i, len = this.provinces.length;
        for (i = 0; i < len; i++) {
          t.list.push(t.provinces[i]);
        }
        t.showDialog = true;
      },

      //选择城市
      chooseCity() {
        let t = this;
        t.title = '开户城市';
        t.list = [];
        if (t.province == '' || t.province == '请选择省' || t.provinceId == '') {
          t.glb.showTip = true;
          t.glb.tipMsg = '请选择开户省份';
          return;
        }
        var i, len = t.cities.length, city;
        for (i = 0; i < len; i++) {
          city = t.cities[i];
          if (city[0] == t.provinceId) {
            t.list.push([city[1], city[2]]);
          }
        }
        t.showDialog = true;
      },

      //选择支行
      chooseBranch() {
        let t = this;
        t.title = '开户支行';
        t.list = [];
        if (t.province == '' || t.province == '请选择省') {
          t.glb.showTip = true;
          t.glb.tipMsg = '请选择开户省份';
          return;
        }
        if (t.city == '' || t.city == '请选择市') {
          t.glb.showTip = true;
          t.glb.tipMsg = '请选择开户城市';
          return;
        }
        t.showDialog = true;
        t.glb.showLoading = true;
        this.server.UserService.getSubBank(t.bankCard.bank, t.province, t.city).then(function (res) {
          var data = res.data;
          if (data.code == 100) {
            var banks = data.data, i, len = banks.length;
            for (i = 0; i < len; i++) {
              t.list.push([0, banks[i]]);
            }
            t.showDialog = true;
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
      },

      //确认选择省市支行信息
      sureChoose(title, id, name) {
        let t = this;
        switch (title) {
          case '开户省份':
            t.province = name;
            t.provinceId = id;
            t.city = '请选择市';
            t.branch = '请选择开户支行';
            break;
          case '开户城市':
            t.city = name;
            t.branch = '请选择开户支行';
            break;
          case '开户支行':
            t.branch = name;
            break;
        }
        t.showDialog = false;
      },

      //将数据保存下来
      save() {
        let t = this;
        if (t.province == '' || t.province == '请选择省') {
          t.glb.showTip = true;
          t.glb.tipMsg = '请选择开户省份';
          return;
        }
        if (t.city == '' || t.city == '请选择市') {
          t.glb.showTip = true;
          t.glb.tipMsg = '请选择开户城市';
          return;
        }
        if (t.branch == '' || t.branch == '请选择开户支行') {
          t.glb.showTip = true;
          t.glb.tipMsg = '请选择开户支行';
          return;
        }
        t.glb.showLoading = true;
        //更新银行卡信息
        this.server.UserService.updateCardInfo(t.bankCard.id, t.bankCard.bank, t.province, t.city, t.branch).then(function (res) {
          var data = res.data;
          if (data.code == 100) {
            t.glb.showTip = true;
            t.glb.tipMsg = '银行卡信息保存成功';
            t.router.push({path: t.backURL});
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
      },

      //设置默认卡
      setDefaultBankCard() {
        let t = this;
        t.glb.showLoading = true;
        this.server.UserService.setDefaultBankCard(t.bankCardId).then(function (res) {
          var data = res.data;
          if (data.code == 100) {
            t.glb.showTip = true;
            t.glb.tipMsg = '默认卡设置成功';
            t.$router.push({path: '/bankCardList'});
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
      },

      //删除卡
      deleteBankCard() {
        let t = this;
        t.glb.showConfirm = true;
        t.glb.confirmMsg = '您确定要删除该银行卡吗';
        t.glb.sureTxt = '确定';
        t.confirmType = 'del';
      },

      //实名认证
      toIdenty(){
        let t = this;
        t.glb.showConfirm = true;
        t.glb.confirmMsg = '您还未实名认证，请先实名认证';
        t.glb.sureTxt = '确定';
        t.confirmType = 'toIdenty';
      },

      //confirm弹窗操作
      confirmFunc(type){
        let t = this;
        if (t.confirmType == 'del' && type == 1) {
          t.glb.showConfirm = false;
          t.glb.showLoading = true;
          this.server.UserService.delBankCard(t.bankCardId).then(function (res) {
            var data = res.data;
            if (data.code == 100) {
              t.glb.showTip = true;
              t.glb.tipMsg = '银行卡删除成功';
              t.$router.push({path: '/bankCardList'});
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
        } else if (t.confirmType == 'del' && type == 0) {
          t.glb.showConfirm = false;
        } else if (t.confirmType == 'toIdenty' && type == 1) {
          t.glb.showConfirm = false;
          t.$router.push({path: '/identification', query: {backURL: '/myInfo'}});
        } else {
          t.glb.showConfirm = false;
          t.$router.push({path: '/myInfo'});
        }
      },
      //初始化数据
      initData() {
        let t = this;
        var i, len = t.provinces.length;
        for (i = 0; i < len; i++) {
          if (t.bankCard.province == t.provinces[i][1]) {
            t.provinceId = t.provinces[i][0];
            break;
          }
        }
        t.province = t.bankCard.province;
        t.city = t.bankCard.city;
        t.branch = t.bankCard.subbranch;
      },

    },
    computed: {},
    destroyed(){

    }
  }
</script>
