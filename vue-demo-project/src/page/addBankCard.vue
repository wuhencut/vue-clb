<template>
  <div>
    <section class="page-pay">
      <div class="page-add-bank-card">
        <header class="page-header">
          <div class="header-wrap">
            <h3>添加银行卡</h3>
            <router-link :to="backURL" class="nav-left"><i class="icon-back"></i></router-link>
          </div>
        </header>
        <div class="mod-add-bank-card">
          <div class="title">为确保资金安全，只能添加“{{userName}}”的银行卡</div>
          <div>
            <ul class="list">
              <li>
                <span>开户名</span>
                <span v-if="userName">{{userName}}</span>
              </li>
              <li @click="showBankList=true">
                <span>开户银行</span>
                <span>{{bankName}}</span>
                <i class="mod-arrow-r"></i>
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
            <ul class="list mt20">
              <li>
                <span>银行卡号</span>
                <span><input v-model="bankCard" type="text" class="inp" placeholder="请输入银行卡号"></span>
              </li>
              <li>
                <span>确认卡号</span>
                <span><input v-model="sureBankCard" type="text" class="inp" placeholder="确认银行卡号"></span>
              </li>
            </ul>
          </div>
        </div>
        <div class="pt20 pl15 pr15 pb20">
          <button class="btn btn-blue" @click="save();">确定</button>
        </div>
      </div>
    </section>
    <!--选择银行-->
    <div class="dialog-wrap" v-if="showBankList" style="padding-bottom:0">
      <section class="page-pay">
        <div class="page-bank-list page-dialog">
          <header class="page-header">
            <div class="header-wrap">
              <h3>选择银行</h3>
              <a href="" @click="showBankList = false" class="nav-left"><i class="icon-back"></i></a>
            </div>
          </header>
          <div class="mod-menu-wrap">
            <a class="mod-menu" v-for="(bank, bankCodeKey) in bankList" @click="sureChooseBank(bankCodeKey);">
              <i :class="bank.bankClassName" class="mr5"></i>
              {{bank.bankName}}
              <i class="mod-ok-r" v-if="bankCodeKey == bankCode"></i>
            </a>
          </div>
        </div>
      </section>
    </div>
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
            <a class="mod-menu" v-for="item in list" @click="sureChoose(title,item[0],item[1]);">
              {{item[1]}}
            </a>
          </div>
        </div>
      </section>
    </div>
    <tip :tip="glb.tipMsg" @hide="glb.showTip = false" v-if="glb.showTip"></tip>
    <loading v-if="glb.showLoading"></loading>
    <confirm :confirmMsg="glb.confirmMsg" @sure="confirmFunc(1)" @cancel="confirmFunc(0)" v-if="glb.showConfirm"></confirm>
  </div>
</template>
<script>
  export default{
    data(){
      return {
        glb: this.global,
        provinces: this.server.SystemService().getProvince(),
        cities: this.server.SystemService().getCities(),
        backURL: this.$route.query.backURL || '/bankCardList',
        bankList: {},
        user: {},
        showBankList: false,
        userName: '',
        bankCode: '',
        bankName: '请选择银行',
        showDialog: false,
        list: [],//保存省市支行的数组，通用数组
        provinceId: '',
        province: '请选择省',
        city: '请选择市',
        branch: '请选择开户支行',
        bankCard: '',
        sureBankCard: '',
        title: '',
      }
    },
    mounted(){
      console.log(this.provinces,this.cities);
      this.getData();
      console.log(this.bankList);
    },
    methods: {
      getData(){
        this.glb.showLoading = true;
        let t = this;
        this.axios.all([
          this.server.UserService.getBankInfo(),
          this.server.UserService.getUserInfo()
        ]).then(this.axios.spread(function (bankList, userInfo) {
          var bankListData = bankList.data;
          var userData = userInfo.data;
          if (bankListData.code == 100 && userData.code == 100) {
            t.user = userData.data;
            t.userName = t.X.maskName(t.user.name);
            t.parseBankList(bankListData.data);
            t.initValidate();
          } else {
            if (bankListData.code != 100) {
              t.glb.showTip = true;
              t.glb.tipMsg = bankListData['resultMsg'];
            } else if (userData.code != 100) {
              t.glb.showTip = true;
              t.glb.tipMsg = userData['resultMsg'];
            }
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

      //选择银行
      sureChooseBank(bankCode) {
        this.showBankList = false;
        this.bankCode = bankCode;
        this.bankName = this.bankList[bankCode].bankName;
        this.provinceId = '';
        this.province = '请选择省';
        this.city = '请选择市';
        this.branch = '请选择开户支行';
      },

      //选择省份
      chooseProvice() {
        let t = this;
        this.title = '开户省份';
        this.list = [];
        if (this.bankName == '' || this.bankName == '请选择银行') {
          t.glb.showTip = true;
          t.glb.tipMsg = '请选择银行';
          return;
        }
        var i, len = t.provinces.length;
        for (i = 0; i < len; i++) {
          t.list.push(t.provinces[i]);
        }
        t.showDialog = true;
      },

      //选择城市
      chooseCity() {
        let t = this;
        this.title = '开户城市';
        this.list = [];
        if (this.bankName == '' || this.bankName == '请选择银行') {
          t.glb.showTip = true;
          t.glb.tipMsg = '请选择银行';
          return;
        }
        if (this.province == '' || this.province == '请选择省' || this.provinceId == '') {
          t.glb.showTip = true;
          t.glb.tipMsg = '请选择开户省份';
          return;
        }
        var i, len = this.cities.length, city;
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
        this.title = '开户支行';
        this.list = [];
        if (this.bankName == '' || this.bankName == '请选择银行') {
          t.glb.showTip = true;
          t.glb.tipMsg = '请选择银行';
          return;
        }
        if (this.province == '' || this.province == '请选择省') {
          t.glb.showTip = true;
          t.glb.tipMsg = '请选择开户省份';
          return;
        }
        if (this.city == '' || this.city == '请选择市') {
          t.glb.showTip = true;
          t.glb.tipMsg = '请选择开户城市';
          return;
        }
        this.showDialog = true;
        this.glb.showLoading = true;
        this.server.UserService.getSubBank(this.bankName, this.province, this.city).then(function (res) {
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
        switch (title) {
          case '开户省份':
            this.province = name;
            this.provinceId = id;
            this.city = '请选择市';
            this.branch = '请选择开户支行';
            break;
          case '开户城市':
            this.city = name;
            this.branch = '请选择开户支行';
            break;
          case '开户支行':
            this.branch = name;
            break;
        }
        this.showDialog = false;
      },

      //将数据保存下来
      save() {
        let t = this;
        if (this.bankName == '' || this.bankName == '请选择银行') {
          t.glb.showTip = true;
          t.glb.tipMsg = '请选择银行';
          return;
        }
        if (this.province == '' || this.province == '请选择省') {
          t.glb.showTip = true;
          t.glb.tipMsg = '请选择开户省份';
          return;
        }
        if (this.city == '' || this.city == '请选择市') {
          t.glb.showTip = true;
          t.glb.tipMsg = '请选择开户城市';
          return;
        }
        if (this.branch == '' || this.branch == '请选择开户支行') {
          t.glb.showTip = true;
          t.glb.tipMsg = '请选择开户支行';
          return;
        }
        if (this.bankCard == '') {
          t.glb.showTip = true;
          t.glb.tipMsg = '请输入银行卡号';
          return;
        }
        if (!this.X.isBankCard(this.bankCard)) {
          t.glb.showTip = true;
          t.glb.tipMsg = '请输入正确的银行卡号';
          return;
        }
        if (this.sureBankCard == '') {
          t.glb.showTip = true;
          t.glb.tipMsg = '请输入确认卡号';
          return;
        }
        if (this.bankCard != this.sureBankCard) {
          t.glb.showTip = true;
          t.glb.tipMsg = '确认卡号与银行卡号不一致';
          return;
        }
        this.glb.showLoading = true;
        //更新银行卡信息
        this.server.UserService.bindBankCard(this.bankName, this.province, this.city, this.branch, this.bankCard).then(function (res) {
          var data = res.data;
          if (data.code == 100) {
            t.glb.showTip = true;
            t.glb.tipMsg = '银行卡添加成功';
            //是否需要返回跳转
            t.$router.push({path: t.backURL});
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
      //confirm弹框操作
      confirmFunc(type){
        if (type == 1) {
          this.$router.push({path: '/identification', query: {backURL: '/bankCardList'}});
          this.glb.showConfirm = false;
        } else {
          this.$router.push({path: '/myInfo'});
          this.glb.showConfirm = false;
        }
      },


      //实名认证
      initValidate() {
        if (!this.user.named) {
          this.glb.confirmMsg = '您还未实名认证，请先实名认证';
          this.glb.showConfirm = true;
        }
      },

      //组装银行列表
      parseBankList(bankList) {
        let t = this;
        if (!bankList || !bankList.length) return;
        bankList.forEach(function (item) {
          item.bankClassName = 'icon-bank-' + item.code;
          t.bankList[item.code] = item;
        });
      }


    },
    computed: {},
    destroyed(){

    }
  }
</script>
