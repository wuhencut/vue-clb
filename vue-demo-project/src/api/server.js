/**
 * Created by js on 2017/9/12.
 */
var axios = require('axios');
var storage = window.localStorage, agentCode = storage.getItem('agentCode') || 'YZTZ', source = agentCode || '';
var baseHost = '';
var urls = {
  login: '/sso/yztz_user_login_check.json',
  logout: '/sso/j_spring_security_logout.json',
  imgCode: '/sso/checkCode.json',
  getUserInfo: '/user/userInfo/getUserInfo.json',
  indexShowData: '/index/getIndexData.json',
  getServerTime: '/home/currentTime.json',
  futuresServer: '/futuresquote/getFuturesQuote.json',
  regNextStep: '/sso/register/goNextStep.json',
  getRegisterCode: '/sso/register/getRegisterCode.json',
  doRegister: '/sso/register/doRegister.json',
  resetForgetPassword: '/sso/forget/resetForgetPassword.json',
  forgetCheckLogin: '/sso/forget/checkLogin.json',
  getMsgPage: '/user/messager/getMsgPage.json',
  postMsg: '/user/messager/postMsg.json',
  getBalance: '/pay/global/assets/getBalance.json',//获取用户实际余额
  getSimBalance: '/pay/global/assets/getSimBalance.json',//获取用户模拟币余额
  getBankInfo: '/home/getBankInfo.json',
  getBankCards: '/pay/bankCard/getBankCards.json',
  getBankCardInfo: '/pay/bankCard/getBankCardInfo.json',
  bindBankCard: '/pay/bankCard/bindBankCard.json',
  delBankCard: '/pay/bankCard/deleteCard.json',
  setDefaultBankCard: '/pay/bankCard/setDefaultCard.json',
  updateCardInfo: '/pay/bankCard/updateCardInfo.json',
  getBankCardById: '/pay/bankCard/getBankCardById.json',

  sendForgetCode: '/sso/forget/sendForgetCode.json',
  doWithdraw: '/pay/withdraw/doWithdraw.json',
  updateRealname: '/user/security/updateRealname.json',
  loginPwdModify: '/user/security/loginPwdModify.json',
  withdrawPwdSet: '/user/security/withdrawPwdSet.json',
  withdrawPwdModify: '/user/security/withdrawPwdModify.json',
  getSubBank: '/pay/bankCard/getSubBank.json',
  getFundDetail: '/pay/user/fundDetail/getFundDetail.json',
  getFundAll:'/pay/user/fundDetail/getFundAll.json',
  getNoticeList: '/index/getNoticeList.json',
  forgetWithdrawPasswordCode: '/user/security/forgetWithdrawPasswordCode.json',
  resetWithdrawPwd: '/user/security/resetWithdrawPwd.json',
  getNoticeById: '/index/getNoticeById.json',
  h5FirstPayUrl: '/pay/payGateway/h5FirstPayUrl.json',
  h5PayUrl: '/pay/payGateway/h5PayUrl.json',
  payGateway: '/pay/payGateway/getLLWapPayUrl.json',
  //期货-点卖
  getSaleFutures: '/futures/strategy/getSaleFuturesStrategy.json',
  getRisk: '/futuresindex/getRiskByCommodityNo.json',
  createFuturesStrategy: '/futures/strategy/createFuturesStrategy.json',
  //外盘-结算
  getSettleStrategy: '/futures/strategy/getSettleStrategy.json',
  //平仓-发起
  closeFutures: '/futures/strategy/closeFuturesStrategy.json',
  //外盘协议签署
  outerSignAgreement: '/futures/strategy/signAgreement.json',
  //设置止盈止损线
  setQuitGainLoss: '/futures/strategy/setQuitGainLoss.json',
  alipay: '/pay/alipay.json',
  getStrategyInfo: '/futures/strategy/getStrategyInfo.json',
  //获取弹窗和banner
  getADBanner: '/home/header.json',
  //红包列表
  getPacketInfo: '/tip/getTipInfo.json',
  receivePacket: '/tip/receiveTip.json',
  getPacketRecordList: '/tip/getTipRecord.json',
  getPacketFundInfo: '/tip/getTipFundInfo.json',
  getNewsList: '/index/getFuturesNews.json',
  //推广赚钱
  getExtensionInfo: '/home/generalize/getGeneralizeInfo.json',
  getWechatCode: '/home/generalize/getQRcode.json',
  getExtensionUserList: '/home/generalize/getGeneralizeUsers.json',
  //支付宝账户认证
  bindingAlipayAccount: '/user/security/bindingAlipayAccount.json',
  //发送手机解绑短信验证码
  mobileUnbindCode: '/user/security/mobileUnbindCode.json',
  //手机号解绑
  unbindMobile: '/user/security/unbindMobile.json',
  //发送手机绑定短信验证码
  mobileBindCode: '/user/security/mobileBindCode.json',
  //手机号绑定
  bindMobile: '/user/security/bindMobile.json',
  //取消提现
  cancelWithdraw: '/pay/withdraw/cancelWithdraw.json',
  //改版公告
  getNotices: '/index/getNotices.json',
  //昨日盈利排行榜
  getUserRank: '/index/getUserRank.json',
  //上月盈利排行榜
  getUnionRank: '/union/getUnionRank.json',
  //活动列表
  getActivityInfo: '/activity/getActivityInfo.json',
  //子活动列表
  getActAwardSetInfo: '/activity/getActAwardSetInfo.json',
  //红包领取
  receiveTipByActivity: '/tip/receiveTipByActivity.json'

};

function getURL(method){
    return baseHost + urls[method];
}

/*export const NoticeService = {
  getNotices:function (page, pageSize) {
    let params = {
      device: 1,
      page: page || 1,
      pageSize: pageSize || 10,
      agentCode: agentCode
    };
    return axios({
      method: 'GET',
      url: getURL('getNotices'),
      params: params
    })
  }
};*/

export default{
  //登录服务
  LoginService:{
    login:function (username, password) {
      var data = {
        authencationType: 'AJAX',
        device: 1,
        remeber: true,
        entrance: '',
        username: username,
        password: password,
        agentCode: agentCode,
        source: agentCode
      };
      return axios({
        method: 'POST',
        url: getURL('login'),
        data: data
      });
    },
    logout:function () {
      var data = {
        device: 1,
        agentCode: agentCode,
        source: agentCode
      };
      return axios({
        method: 'POST',
        url: getURL('logout'),
        data: data
      });
    }
  },
  //注册服务
  RegisterService:{
    //注册下一步
    regNextStep:function (mobile, checkCode) {
      var data = {
        device: 1,
        mobile: mobile,
        checkCode: checkCode,
        agentCode: agentCode,
        source: agentCode
      };
      return axios({
        method: 'POST',
        url: getURL('regNextStep'),
        data: data
      });
    },
    doRegister: function (mobile, username, password) {
      var data = {
        device: 1,
        password: password,
        mobile: mobile,
        username: username,
        agentCode: agentCode,
        source: agentCode
      };
      return axios({
        method: 'POST',
        url: getURL('doRegister'),
        data: data
      });
    },
    //获取验证码
    getRegisterCode: function (mobile, checkCode) {
      var data = {
        device: 1,
        checkCode: checkCode,
        mobile: mobile,
        agentCode: agentCode,
        source: agentCode
      };
      return axios({
        method: 'POST',
        url: getURL('getRegisterCode'),
        data: data
      });
    }
  },
  //密码服务
  PasswordService:{
    //忘记密码服务
    resetForgetPassword: function (mobile, checkCode, password) {
      var data = {
        device: 1,
        mobile: mobile,
        checkCode: checkCode,
        password: password,
        agentCode: agentCode,
        source: agentCode
      };
      return axios({
        method: 'POST',
        url: getURL('resetForgetPassword'),
        data: data
      });
    },

    //获取验证码
    sendForgetCode: function (mobile, checkCode) {
      var data = {
        device: 1,
        type: 2,
        mobile: mobile,
        checkCode: checkCode,
        agentCode: agentCode,
        source: agentCode
      };
      return axios({
        method: 'POST',
        url: getURL('sendForgetCode'),
        data: data
      });
    },
    //修改登录密码
    loginPwdModify: function (oldPassword, newPassword) {
      var data = {
        device: 1,
        newPassword: newPassword,
        oldPassword: oldPassword,
        agentCode: agentCode,
        source: agentCode
      };
      return axios({
        method: 'POST',
        url: getURL('loginPwdModify'),
        data: data
      })
    },
    //提现密码服务
    PwdSet: function (password) {
      var data = {
        device: 1,
        password: password,
        agentCode: agentCode,
        source: agentCode
      };
      return axios({
        method: 'POST',
        url: getURL('withdrawPwdSet'),
        data: data
      })
    },
    //提现密码修改
    PwdModify: function (newPwd, oldPwd) {
      var data = {
        device: 1,
        newPassword: newPwd,
        oldPassword: oldPwd,
        agentCode: agentCode,
        source: agentCode
      };
      return axios({
        method: 'POST',
        url: getURL('withdrawPwdModify'),
        data: data
      })
    },
    //重置提现密码服务
    resetWithdrawPwd: function (password, checkCode) {
      var data = {
        device: 1,
        password: password,
        checkCode: checkCode,
        agentCode: agentCode,
        source: agentCode
      };
      return axios({
        method: 'POST',
        url: getURL('resetWithdrawPwd'),
        data: data
      });
    },

    //获取提现密码重置验证码
    sendPasswordCode: function () {
      var data = {
        device: 1,
        useVoice: false,
        agentCode: agentCode,
        source: agentCode
      };
      return axios({
        method: 'POST',
        url: getURL('forgetWithdrawPasswordCode'),
        data: data
      });
    }
  },
  //用户服务
  UserService:{
    //获取用户信息
    getUserInfo: function () {
      var data = {
        device: 1,
        agentCode: agentCode,
        source: agentCode
      };
      return axios({
        method: 'POST',
        url: getURL('getUserInfo'),
        data: data
      });
    },
    //获取用户余额
    getBalance: function () {
      var data = {
        device: 1,
        agentCode: agentCode,
        source: agentCode
      };
      return axios({
        method: 'POST',
        url: getURL('getBalance'),
        data: data
      });
    },
    //获取用户模拟币余额
    getSimBalance: function () {
      var data = {
        device: 1,
        agentCode: agentCode,
        source: agentCode
      };
      return axios({
        method: 'POST',
        url: getURL('getSimBalance'),
        data: data
      });
    },
    //获取银行信息
    getBankInfo: function () {
      var params = {
        device: 1,
        agentCode: agentCode,
        source: agentCode
      };
      return axios({
        method: 'GET',
        url: getURL('getBankInfo'),
        params: params
      });
    },
    //获取银行卡信息
    getBankCardInfo: function () {
      var data = {
        device: 1,
        agentCode: agentCode,
        source: agentCode
      };
      return axios({
        method: 'POST',
        url: getURL('getBankCardInfo'),
        data:data
      });
    },
    //获取银行卡信息
    getBankCards: function () {
      var data = {
        device: 1,
        agentCode: agentCode,
        source: agentCode
      };
      return axios({
        method: 'POST',
        url: getURL('getBankCards'),
        data: data
      });
    },
    //支付宝账户认证
    bindingAlipayAccount: function (alipayAccount, tradeAmount, tradeNo) {
      var data = {
        device: 1,
        alipayAccount: alipayAccount,
        tradeNo: tradeNo,
        tradeAmount: tradeAmount,
        agentCode: agentCode,
        source: agentCode
      };
      return axios({
        method: 'POST',
        url: getURL('bindingAlipayAccount'),
        data: data
      });
    },
    //根据用户ID获取银行卡信息
    getBankCardById: function (bankCardId) {
      var data = {
        device: 1,
        cardId: bankCardId,
        agentCode: agentCode,
        source: agentCode
      };
      return axios({
        method: 'POST',
        url: getURL('getBankCardById'),
        data: data
      });
    },
    //绑定银行卡
    bindBankCard: function (bank, province, city, branch, bankCard) {
      var data = {
        device: 1,
        bank: bank,
        province: province,
        city: city,
        branch: branch,
        bankCard: bankCard,
        agentCode: agentCode,
        source: agentCode
      };
      return axios({
        method: 'POST',
        url: getURL('bindBankCard'),
        data: data
      });
    },
    //更新银行卡setDefaultBankCard
    updateCardInfo: function (id, bank, province, city, branch) {
      var data = {
        device: 1,
        bank: bank,
        province: province,
        city: city,
        branch: branch,
        id: id,
        agentCode: agentCode,
        source: agentCode
      };
      return axios({
        method: 'POST',
        url: getURL('updateCardInfo'),
        data: data
      });
    },
    //设置默认银行卡
    setDefaultBankCard: function (bankCardId) {
      var data = {
        device: 1,
        cardId: bankCardId,
        agentCode: agentCode,
        source: agentCode
      };
      return axios({
        method: 'POST',
        url: getURL('setDefaultBankCard'),
        data: data
      });
    },
    //删除银行卡
    delBankCard: function (bankCardId) {
      var data = {
        device: 1,
        cardId: bankCardId,
        agentCode: agentCode,
        source: agentCode
      };
      return axios({
        method: 'POST',
        url: getURL('delBankCard'),
        data: data
      });
    },
    //获取分支行
    getSubBank: function (bank, province, city) {
      var data = {
        device: 1,
        bankName: bank,
        province: province,
        city: city,
        agentCode: agentCode,
        source: agentCode
      };
      return axios({
        method: 'POST',
        url: getURL('getSubBank'),
        data: data
      });
    },

    //实名认证
    realName: function (name, IDNum) {
      var data = {
        device: 1,
        name: name,
        idNumber: IDNum,
        agentCode: agentCode,
        source: agentCode
      };
      return axios({
        method: 'POST',
        url: getURL('updateRealname'),
        data: data
      });
    },
    //获取留言
    getMsgPage: function (page, pageSize) {
      var data = {
        device: 1,
        page: page || 1,
        pageSize: pageSize || 10,
        agentCode: agentCode,
        source: agentCode
      };
      return axios({
        method: 'POST',
        url: getURL('getMsgPage'),
        data: data
      });
    },
    //提交留言
    postMsg: function (type, contact, content) {
      var data = {
        device: 1,
        type: type,
        contact: contact,
        content: content,
        agentCode: agentCode,
        source: agentCode
      };
      return axios({
        method: 'POST',
        url: getURL('postMsg'),
        data: data
      });
    },

    //外盘协议签署
    outerSignAgreement: function (commodityNo) {
      var data = {
        device: 1,
        commodityNo: commodityNo,
        agentCode: agentCode,
        source: agentCode
      };
      return axios({
        method: 'POST',
        url: getURL('outerSignAgreement'),
        data: data
      });
    },

    //发送手机解绑短信验证码
    mobileUnbindCode: function (code) {
      var data = {
        device: 1,
        checkCode: code,
        agentCode: agentCode,
        source: agentCode
      };
      return axios({
        method: 'POST',
        url: getURL('mobileUnbindCode'),
        data: data
      });
    },

    //手机号解绑
    unbindMobile: function (code) {
      var data = {
        device: 1,
        checkCode: code,
        agentCode: agentCode,
        source: agentCode
      };
      return axios({
        method: 'POST',
        url: getURL('unbindMobile'),
        data: data
      });
    },

    //发送手机绑定短信验证码
    mobileBindCode: function (code, mobile) {
      var data = {
        device: 1,
        checkCode: code,
        mobile: mobile,
        agentCode: agentCode,
        source: agentCode
      };
      return axios({
        method: 'POST',
        url: getURL('mobileBindCode'),
        data: data
      });
    },

    //发送手机绑定短信验证码
    bindMobile: function (code, mobile) {
      var data = {
        device: 1,
        checkCode: code,
        mobile: mobile,
        agentCode: agentCode,
        source: agentCode
      };
      return axios({
        method: 'POST',
        url: getURL('bindMobile'),
        data: data
      });
    }
  },

  //支付服务
  PayService:{
    //获取资金明细
    getFundDetail: function (action, explain, page, pageSize) {
      var data = {
        device: 1,
        action: action,
        timeStart: '1year',//一周，一月，半年，一年
        explain: explain,//支出，收入
        page: page || 1,
        pageSize: pageSize || 20,
        agentCode: agentCode,
        source: agentCode
      };
      return axios({
        method: 'POST',
        url: getURL('getFundDetail'),
        data: data
      });
    },

    //获取所有资金明细
    getFundAll: function (action, page, pageSize) {
      var data = {
        device: 1,
        action: action,
        timeStart: '1year',//一周，一月，半年，一年
        page: page || 1,
        pageSize: pageSize || 20,
        agentCode: agentCode,
        source: agentCode
      };
      return axios({
        method: 'POST',
        url: getURL('getFundAll'),
        data: data
      });
    },

    //联动首次充值链接
    h5FirstPayUrl: function (bankCode, money, card, charge) {
      var data = {
        device: 1,
        bankCode: bankCode,
        money: money,
        bankCard: card,
        charge: charge,
        agentCode: agentCode,
        source: agentCode
      };
      return axios({
        method: 'POST',
        url: getURL('h5FirstPayUrl'),
        data: data
      });
    },

    //联动非首次充值链接
    h5PayUrl: function (cardId, money, charge) {
      var data = {
        device: 1,
        cardId: cardId,
        money: money,
        charge: charge,
        agentCode: agentCode,
        source: agentCode
      };
      return axios({
        method: 'POST',
        url: getURL('h5PayUrl'),
        data: data
      });
    },

    payGateway: function (money) {
      var data = {
        device: 1,
        money: money,
        agentCode: agentCode,
        source: agentCode
      };
      return axios({
        method: 'POST',
        url: getURL('payGateway'),
        data: data
      });
    },

    //支付宝
    alipay: function (money, account) {
      var data = {
        device: 1,
        alipayName: account,
        money: money,
        charge: 0,
        agentCode: agentCode,
        source: agentCode
      };
      return axios({
        method: 'POST',
        url: getURL('alipay'),
        data: data
      });
    },

    //用户提现
    doWithdraw: function (cardId, money, password) {
      var data = {
        device: 1,
        cardId: cardId,
        money: money,
        password: password,
        agentCode: agentCode,
        source: agentCode
      };
      return axios({
        method: 'POST',
        url: getURL('doWithdraw'),
        data: data
      });
    },

    //取消提现
    cancelWithdraw: function (id) {
      var data = {
        device: 1,
        id: id,
        agentCode: agentCode,
        source: agentCode
      };
      return axios({
        method: 'POST',
        url: getURL('cancelWithdraw'),
        data: data
      });
    }
  },

  //公告服务
  NoticeService:{
    //获取公告列表
    getNoticeList: function (page, pageSize) {
      var params = {
        device: 1,
        page: page || 1,
        pageSize: pageSize || 10,
        agentCode: agentCode,
        source: agentCode
      };
      return axios({
        method: 'GET',
        url: getURL('getNoticeList'),
        params: params
      });
    },


    getNoticeById: function (noticeId) {
      var params = {
        device: 1,
        noticeId: noticeId,
        agentCode: agentCode,
        source: agentCode
      };
      return axios({
        method: 'GET',
        url: getURL('getNoticeById'),
        params: params
      });
    },

    //获取新闻
    getNewsList: function (page, pageSize, time) {
      var params = {
        device: 1,
        page: page || 0,
        pageSize: pageSize || 10,
        time: time,
        agentCode: agentCode,
        source: agentCode
      };
      return axios({
        method: 'GET',
        url: getURL('getNewsList'),
        params: params
      });
    },

    //改版公告
    getNotices: function (page, pageSize) {
      var params = {
        device: 1,
        page: page || 1,
        pageSize: pageSize || 10,
        agentCode: agentCode,
        source: agentCode
      };
      return axios({
        method: 'GET',
        url: getURL('getNotices'),
        params: params
      });
    }
  },

  //交易服务
  TradeService:{
    //外盘-点卖
    getSaleFutures: function (type) {
      var data = {
        device: 1,
        type: type || 2,
        agentCode: agentCode,
        source: agentCode
      };
      return axios({
        method: 'POST',
        url: getURL('getSaleFutures'),
        data: data
      });
    },

    //外盘-结算
    getTradeResult: function (page, pageSize, type) {
      var data = {
        device: 1,
        type: type || 2,
        page: page || 1,
        pageSize: pageSize,
        agentCode: agentCode,
        source: agentCode
      };
      return axios({
        method: 'POST',
        url: getURL('getSettleStrategy'),
        data: data
      });
    },

    //平仓-发起
    getCloseFutures: function (ids, type) {
      if (X.isArray(ids)) {
        ids = ids.join(',');
      }
      var data = {
        device: 1,
        ids: ids,
        type: type || 2,
        agentCode: agentCode,
        source: agentCode
      };
      return axios({
        method: 'POST',
        url: getURL('closeFutures'),
        data: data
      });
    },

    //外盘-设置止盈止损线
    setQuitGainLoss: function (id, type, quitLoss, quitGain) {
      var data = {
        device: 1,
        id: id,
        type: type || 2,
        quitLoss: quitLoss,
        quitGain: quitGain,
        agentCode: agentCode,
        source: agentCode
      };
      return axios({
        method: 'POST',
        url: getURL('setQuitGainLoss'),
        data: data
      });
    },

    //风控参数
    getRisk: function (commodityNo) {
      var params = {
        device: 1,
        commodityNo: commodityNo,
        agentCode: agentCode,
        source: agentCode
      };
      return axios({
        method: 'GET',
        url: getURL('getRisk'),
        params: params
      });
    },

    //创建期货策略
    createFuturesStrategy: function (data) {
      data.device = 1; data.agentCode = agentCode;
      data.source = agentCode;

      return axios({
        method: 'POST',
        url: getURL('createFuturesStrategy'),
        data: data
      });
    },

    //获取单条期货策略信息
    getStrategyInfo: function (id) {
      var data = {
        device: 1,
        type: 2,
        id: id,
        agentCode: agentCode,
        source: agentCode
      };
      return axios({
        method: 'POST',
        url: getURL('getStrategyInfo'),
        data: data
      });
    }
  },

  //股票信息服务
  StockService:{
    //获取期货股票的信息
    getFuturesQuote: function (commodityNo) {
      var params = {
        type: 'real',
        commodityNo: commodityNo,
        agentCode: agentCode,
        source: agentCode
      };
      return axios({
        url: getURL('futuresServer'),
        method: 'GET',
        params: params
      });
    },

    //获取期货K线数据
    getFuturesKline: function (commodityNo, klineType) {
      var params = {
        type: 'kline',
        klineType: klineType,
        commodityNo: commodityNo,
        agentCode: agentCode,
        source: agentCode
      };
      return axios({
        url: getURL('futuresServer'),
        method: 'GET',
        params: params
      });
    },

    //获取期货分时图数据
    getFuturesSline: function (commodityNo) {
      var params = {
        type: 'minute',
        commodityNo: commodityNo,
        agentCode: agentCode,
        source: agentCode
      };
      return $http({
        url: URLService.getURL('futuresServer'),
        method: 'GET',
        params: params
      });
    },

    //持仓数据获取
    getFuturesSimpleQuote: function (commodityNo) {
      var params = {
        type: 'simpleReal',
        commodityNo: commodityNo,
        agentCode: agentCode,
        source: agentCode
      };
      return axios({
        url: getURL('futuresServer'),
        method: 'GET',
        params: params
      });
    }
  },

  //系统服务
  SystemService: function(){

    //节假日 CNY中国假日，USD美国假日
    var holidays = {
      CNY: {},
      USD: {}
    };
    //交易时间段，通过获取后台接口配置，经过转化处理，缓存与该对象
    var TRADEPERIOD = {};
    //行情时间段
    var PERIOD = {
      // HSI: [[["09:30", "12:00"], ["13:00", "16:00"]], [["17:00", "23:30"]]],//恒指
      // HSI: [["09:30", "12:00"], ["13:00", "16:00"]],//恒指
      // GC: [['06:00', '24:00'], ['00:00', '05:00']],//美黄金
      // CL: [['06:00', '24:00'], ['00:00', '05:00']]//美原油
    };
    var systemTime = Date.now(), currencyType = 'CNY';

    window.setInterval(function () {
      systemTime += 1000;
    }, 1000);

    return {
      getServerTime:function () {
        return axios({
          url: getURL('getServerTime'),
          method: 'GET'
        });
      },
      getCurrentTime: function () {
        return systemTime;
      },
      setCurrentTime: function (time) {
        var hour = new Date().getTimezoneOffset();
        systemTime = time + (480 + hour) * 60000;
      },
      setCurrentCurrencyType: function (type) {
        currencyType = type;
      },
      /**
       * 设置节假日对象
       * @param holiday[Object]
       */
      setHoliday: function (holiday) {
        holidays[currencyType] = holiday;
      },
      setTradePeriod: function (period) {
        TRADEPERIOD = period;
      },
      setQuotePeriod: function (period, type) {
        PERIOD[type] = period;
      },
      /**
       * 是否是节假日
       * @param time判断的时间,毫秒或者日期类型
       * @param type中国节日或者美国节日(CNY,USD)
       * @returns {boolean}
       */
      isHoliday: function (time) {
        if (time && !X.isDate(time)) {
          time = new Date(time);
        }
        var holiday = holidays[currencyType], now = time || new Date(systemTime);
        var year = holiday[now.getFullYear()];
        if (!year) {
          return false;
        }
        var month = year[now.getMonth() + 1];
        if (!month) {
          return false;
        }
        var date = now.getDate();
        // , c = s + (t.getHours() < 18 ? "D" : "N");

        return month.indexOf(date) != -1;
      },
      /**
       * 是否是周末
       * @param time日期或者毫秒
       * @returns {boolean}
       */
      isWeekend: function (time) {
        time = time || new Date(systemTime);
        time = X.isDate(time) ? time : new Date(time);
        var t = time.getDay();
        return 0 === t || 6 === t;
      },
      /**
       * 解析节假日配置
       * @param str节假日字符串
       * @returns {{}}节假日对象
       */
      parseHoliday: function (str) {
        if (!str)return;
        var h = {}, arr = str.split(',');
        arr.forEach(function (dateStr) {
          var dateArr = dateStr.split('-'),
            year = dateArr[0] - 0, month = dateArr[1] - 0, day = dateArr[2] - 0;
          if (h[year]) {
            if (h[year][month]) {
              h[year][month].push(day);
            } else {
              h[year][month] = [day];
            }
          } else {
            h[year] = {};
            h[year][month] = [day];
          }
        });
        return h;
      },
      /**
       * 解析字符串的交易时段为对象
       * @param strPeriod时段字符串
       * @returns {Array}时段对象
       */
      parsePeriod: function (strPeriod) {
        //strPeriod : "08:30,12:00|13:00,19:55"
        //strPeriod : "08:30,12:00|13:00,19:55;20:00,21:00|22:00,23:00"
        if (!strPeriod) {
          return;
        }
        var outer = strPeriod.split(';'), retOuter = [];
        outer.forEach(function (str) {
          var inner = str.split('|'), retInner = [];
          inner.forEach(function (time) {
            var times = time.split(',');
            if (times[0].length == 4)times[0] = '0' + times[0];
            if (times[1].length == 4)times[1] = '0' + times[1];
            retInner.push(times);
          });
          retOuter.push(retInner);
        });
        if (retOuter.length == 1) {
          retOuter = retOuter[0];
        }
        return retOuter;
      },
      /**
       * 获取对应条件的时间段，这个时间段可能是行情的时间（本地配置），也可能是交易时间（服务器配置）
       * @param commNo商品编号
       * @param type交易类别(quote:行情时间,trade:交易时间)
       * @returns {{}}
       */
      getQueryPeriod: function (commNo, type) {
        return type == 'trade' ? TRADEPERIOD : PERIOD[commNo];
      },
      /**
       * 获取真实的时间段
       * @param commNo商品编号
       * @param time相对的时间 930,1111 number
       * @param type交易类别(quote:行情时间,trade:交易时间)
       * @returns {*|{}}
       */
      getRealPeriod: function (commNo, time, type) {
        var period = this.getQueryPeriod(commNo, type);
        var i = 0, prevTime, nextTime;
        if (X.isArray(period[0][0])) {
          while (true) {
            prevTime = period[i];
            nextTime = period[i + 1];
            if (!nextTime) {
              return prevTime;
            }
            var bbt = prevTime[0][0].replace(":", "") - 0, ebt = nextTime[0][0].replace(":", "") - 0;
            if (time >= bbt && time < ebt) {
              return prevTime;
            }
            i++;
          }
        }
        return period;
      },
      /**
       * 根据商品编号和查询类型判断当前时间是否在交易时段
       * @param commNo
       * @param type(trade,quote)
       * @returns {boolean}
       */
      isInPeriod: function (commNo, type) {
        var now = new Date(systemTime), day = now.getDay(), isIn = false;
        if (day == 0) {
          return isIn;
        }
        var prevDay = new Date(systemTime).setDate(now.getDate() - 1);
        var prevIsHoliday = this.isHoliday(prevDay), isHoliday = this.isHoliday();
        var time = X.formatDate(now, 'h:m'), period = this.getRealPeriod(commNo, time.replace(":", "") - 0, type);
        //X.log(time, prevIsHoliday, isHoliday,period);
        period.forEach(function (t) {
          var bTime = t[0], eTime = t[1];
          //这里判断什么条件下能够处在交易时间段
          //1、如果包括跨天时间段，并且当前时间在时间段中间，这时候如果前一天不是节假日并且今天也不是周一则在交易时段
          //2、如果不包括跨天则判断是否是非周六的时间段内，如果满足条件只要判断下今天是不是节假日就好了
          if ("00:00" === bTime && time >= bTime && time < eTime) {
            if (!prevIsHoliday && day != 1) {
              isIn = true;
            }
          } else {
            if (day != 6 && time >= bTime && time < eTime) {
              isIn = !isHoliday;
            }
          }
        });
        return isIn;
      },
      //判断时间，显示不同的电话
      cellPhoneNumber: function (){
        var now = new Date(systemTime), time = X.formatDate(now,'h:m'), period = ['17:30', '21:00'],obj = {cellPhone: '0571-28284082',cellPhoneATag : 'tel:0571-28284082'};
        if(time >= period[0] && time <= period[1]){obj.cellPhone = '0571-28284082';obj.cellPhoneATag = 'tel:0571-28284082'};//到时候再换成手机号
        return obj;
      },

      agentIndex: function () {
        var storage = window.localStorage,
          agentCode = storage.getItem('agentCode'),/*
         agentCode01 = storage.getItem('agentCode01'),*/
          indexUrl/*,indexUrl = '/index';agentCode != ''? indexUrl = '/index/9090' : indexUrl = '/index'*/;
        if(agentCode == '' || !agentCode){
          indexUrl = '/index';
          return indexUrl;
        }else if(agentCode != ''){
          indexUrl = '/index/' + agentCode;
          return indexUrl;
        }
      },
      /**
       * 获取下一个交易时间提示
       * @param commNo商品标识
       * @returns {string}
       */
      getTipsForNextTime: function (commNo) {
        var t = this, now = new Date(systemTime), time = X.formatDate(now, 'h:m'), _period = [], period = this.getQueryPeriod(commNo, 'trade');
        if (X.isArray(period[0][0])) {
          //此处貌似有BUG，如果有多段貌似需要循环拼接:已修复
          //period = period[0].slice().concat(period[1]);
          period.forEach(function (arr) {
            _period = _period.concat(arr);
          });
        } else {
          _period = period
        }
        var len = _period.length, i, nextTime;
        for (i = 0; i < len; i++) {
          var timePeriod = _period[i], bt = timePeriod[0];
          if ("00:00" !== bt && time < bt) {
            nextTime = bt;
            break;
          }
        }
        var beginTime = _period[0][0], endTime = _period[_period.length - 1][1], nextDay = '今天';

        function nextTradeDay() {
          var day = 0;
          do {
            day++;
            now.setDate(now.getDate() + 1);
          } while (t.isWeekend(now) || t.isHoliday(now));
          nextTime = beginTime;
          nextDay = day <= 1 ? '明天' : X.formatDate(now, 'M月D日');
        }

        if (t.isWeekend(now) || t.isHoliday(now) || (endTime > beginTime && time >= endTime)) {
          nextTradeDay();
        }
        return '下次交易时间为' + nextDay + nextTime;
      },
      /**
       * 获取当前时段结束提示
       * @param commNo商品标识
       * @returns {string}
       */
      getTipsForTradeStopTime: function (commNo) {
        var now = new Date(systemTime), time = X.formatDate(now, 'h:m'), period = this.getRealPeriod(commNo, time.replace(":", "") - 0, 'trade');
        // if (X.isArray(period[0][0])) {
        //     period = period[0].slice().concat(period[1]);
        // }
        //X.log(period)
        var stopTime = period[period.length - 1][1];
        // for (var i = 0; i < period.length; i++) {
        //     var timePeriod = period[i], et = timePeriod[1];
        //     if ("24:00" !== et && time < et) {
        //         stopTime = et;
        //         break;
        //     }
        // }

        return '持仓时间至' + stopTime;
      },

      uuid: function (len) {
        var r = "0Aa1Bb2Cc3Dd4Ee5Ff6Gg7Hh8Ii9Jj0Kk1Ll2Mm3Nn4Oo5Pp6Qq7Rr8Ss9Tt0Uu1Vv2Ww3Xx4Yy5Zz6789", l = r.length, ret = '';
        len = len || 20;
        while (len--) {
          ret += r.charAt(Math.random() * l | 0);
        }
        return ret;
      },
      getProvince: function () {
        var province = [["1", "北京市"], ["2", "天津市"], ["3", "河北省"], ["4", "山西省"], ["5", "内蒙古自治区"], ["6", "辽宁省"], ["7", "吉林省"], ["8", "黑龙江省"], ["9", "上海市"], ["10", "江苏省"],
          ["11", "浙江省"], ["12", "安徽省"], ["13", "福建省"], ["14", "江西省"], ["15", "山东省"], ["16", "河南省"], ["17", "湖北省"], ["18", "湖南省"], ["19", "广东省"],
          ["20", "广西壮族自治区"], ["21", "海南省"], ["22", "重庆市"], ["23", "四川省"], ["24", "贵州省"], ["25", "云南省"], ["26", "西藏自治区"], ["27", "陕西省"], ["28", "甘肃省"], ["29", "青海省"],
          ["30", "宁夏回族自治区"], ["31", "新疆维吾尔自治区"], ["32", "香港特别行政区"], ["33", "澳门特别行政区"], ["34", "台湾省"]];
        return province;
      },
      getCities: function () {
        var cities = [
          ["1", "1", "北京市", "100000"], ["2", "2", "天津市", "100000"], ["3", "3", "石家庄市", "050000"], ["3", "4", "唐山市", "063000"], ["3", "5", "秦皇岛市", "066000"], ["3", "6", "邯郸市", "056000"], ["3", "7", "邢台市", "054000"], ["3", "8", "保定市", "071000"], ["3", "9", "张家口市", "075000"], ["3", "10", "承德市", "067000"], ["3", "11", "沧州市", "061000"], ["3", "12", "廊坊市", "065000"], ["3", "13", "衡水市", "053000"], ["4", "14", "太原市", "030000"], ["4", "15", "大同市", "037000"], ["4", "16", "阳泉市", "045000"], ["4", "17", "长治市", "046000"], ["4", "18", "晋城市", "048000"], ["4", "19", "朔州市", "036000"], ["4", "20", "晋中市", "030600"], ["4", "21", "运城市", "044000"], ["4", "22", "忻州市", "034000"], ["4", "23", "临汾市", "041000"], ["4", "24", "吕梁市", "030500"], ["5", "25", "呼和浩特市", "010000"], ["5", "26", "包头市", "014000"], ["5", "27", "乌海市", "016000"], ["5", "28", "赤峰市", "024000"], ["5", "29", "通辽市", "028000"], ["5", "30", "鄂尔多斯市", "010300"], ["5", "31", "呼伦贝尔市", "021000"], ["5", "32", "巴彦淖尔市", "014400"], ["5", "33", "乌兰察布市", "011800"], ["5", "34", "兴安盟", "137500"], ["5", "35", "锡林郭勒盟", "011100"], ["5", "36", "阿拉善盟", "016000"], ["6", "37", "沈阳市", "110000"], ["6", "38", "大连市", "116000"], ["6", "39", "鞍山市", "114000"], ["6", "40", "抚顺市", "113000"], ["6", "41", "本溪市", "117000"], ["6", "42", "丹东市", "118000"], ["6", "43", "锦州市", "121000"], ["6", "44", "营口市", "115000"], ["6", "45", "阜新市", "123000"], ["6", "46", "辽阳市", "111000"], ["6", "47", "盘锦市", "124000"], ["6", "48", "铁岭市", "112000"], ["6", "49", "朝阳市", "122000"], ["6", "50", "葫芦岛市", "125000"], ["7", "51", "长春市", "130000"], ["7", "52", "吉林市", "132000"], ["7", "53", "四平市", "136000"], ["7", "54", "辽源市", "136200"], ["7", "55", "通化市", "134000"], ["7", "56", "白山市", "134300"], ["7", "57", "松原市", "131100"], ["7", "58", "白城市", "137000"], ["7", "59", "延边州", "133000"], ["8", "60", "哈尔滨市", "150000"], ["8", "61", "齐齐哈尔市", "161000"], ["8", "62", "鸡西市", "158100"], ["8", "63", "鹤岗市", "154100"], ["8", "64", "双鸭山市", "155100"], ["8", "65", "大庆市", "163000"], ["8", "66", "伊春市", "152300"], ["8", "67", "佳木斯市", "154000"], ["8", "68", "七台河市", "154600"], ["8", "69", "牡丹江市", "157000"], ["8", "70", "黑河市", "164300"], ["8", "71", "绥化市", "152000"], ["8", "72", "大兴安岭地区", "165000"], ["9", "73", "上海市", "200000"], ["10", "74", "南京市", "210000"], ["10", "75", "无锡市", "214000"], ["10", "76", "徐州市", "221000"], ["10", "77", "常州市", "213000"], ["10", "78", "苏州市", "215000"], ["10", "79", "南通市", "226000"], ["10", "80", "连云港市", "222000"], ["10", "81", "淮安市", "223200"], ["10", "82", "盐城市", "224000"], ["10", "83", "扬州市", "225000"], ["10", "84", "镇江市", "212000"], ["10", "85", "泰州市", "225300"], ["10", "86", "宿迁市", "223800"], ["11", "87", "杭州市", "310000"], ["11", "88", "宁波市", "315000"], ["11", "89", "温州市", "325000"], ["11", "90", "嘉兴市", "314000"], ["11", "91", "湖州市", "313000"], ["11", "92", "绍兴市", "312000"], ["11", "93", "金华市", "321000"], ["11", "94", "衢州市", "324000"], ["11", "95", "舟山市", "316000"], ["11", "96", "台州市", "318000"], ["11", "97", "丽水市", "323000"], ["12", "98", "合肥市", "230000"], ["12", "99", "芜湖市", "241000"], ["12", "100", "蚌埠市", "233000"], ["12", "101", "淮南市", "232000"], ["12", "102", "马鞍山市", "243000"], ["12", "103", "淮北市", "235000"], ["12", "104", "铜陵市", "244000"], ["12", "105", "安庆市", "246000"], ["12", "106", "黄山市", "242700"], ["12", "107", "滁州市", "239000"], ["12", "108", "阜阳市", "236100"], ["12", "109", "宿州市", "234100"], ["12", "110", "巢湖市", "238000"], ["12", "111", "六安市", "237000"], ["12", "112", "亳州市", "236800"], ["12", "113", "池州市", "247100"], ["12", "114", "宣城市", "366000"], ["13", "115", "福州市", "350000"], ["13", "116", "厦门市", "361000"], ["13", "117", "莆田市", "351100"], ["13", "118", "三明市", "365000"], ["13", "119", "泉州市", "362000"], ["13", "120", "漳州市", "363000"], ["13", "121", "南平市", "353000"], ["13", "122", "龙岩市", "364000"], ["13", "123", "宁德市", "352100"], ["14", "124", "南昌市", "330000"], ["14", "125", "景德镇市", "333000"], ["14", "126", "萍乡市", "337000"], ["14", "127", "九江市", "332000"], ["14", "128", "新余市", "338000"], ["14", "129", "鹰潭市", "335000"], ["14", "130", "赣州市", "341000"], ["14", "131", "吉安市", "343000"], ["14", "132", "宜春市", "336000"], ["14", "133", "抚州市", "332900"], ["14", "134", "上饶市", "334000"], ["15", "135", "济南市", "250000"], ["15", "136", "青岛市", "266000"], ["15", "137", "淄博市", "255000"], ["15", "138", "枣庄市", "277100"], ["15", "139", "东营市", "257000"], ["15", "140", "烟台市", "264000"], ["15", "141", "潍坊市", "261000"], ["15", "142", "济宁市", "272100"], ["15", "143", "泰安市", "271000"], ["15", "144", "威海市", "265700"], ["15", "145", "日照市", "276800"], ["15", "146", "莱芜市", "271100"], ["15", "147", "临沂市", "276000"], ["15", "148", "德州市", "253000"], ["15", "149", "聊城市", "252000"], ["15", "150", "滨州市", "256600"], ["15", "151", "菏泽市", "255000"], ["16", "152", "郑州市", "450000"], ["16", "153", "开封市", "475000"], ["16", "154", "洛阳市", "471000"], ["16", "155", "平顶山市", "467000"], ["16", "156", "安阳市", "454900"], ["16", "157", "鹤壁市", "456600"], ["16", "158", "新乡市", "453000"], ["16", "159", "焦作市", "454100"], ["16", "160", "濮阳市", "457000"], ["16", "161", "许昌市", "461000"], ["16", "162", "漯河市", "462000"], ["16", "163", "三门峡市", "472000"], ["16", "164", "南阳市", "473000"], ["16", "165", "商丘市", "476000"], ["16", "166", "信阳市", "464000"], ["16", "167", "周口市", "466000"], ["16", "168", "驻马店市", "463000"], ["17", "169", "武汉市", "430000"], ["17", "170", "黄石市", "435000"], ["17", "171", "十堰市", "442000"], ["17", "172", "宜昌市", "443000"], ["17", "173", "襄樊市", "441000"], ["17", "174", "鄂州市", "436000"], ["17", "175", "荆门市", "448000"], ["17", "176", "孝感市", "432100"], ["17", "177", "荆州市", "434000"], ["17", "178", "黄冈市", "438000"], ["17", "179", "咸宁市", "437000"], ["17", "180", "随州市", "441300"], ["17", "181", "恩施州", "445000"], ["17", "182", "神农架", "442400"], ["18", "183", "长沙市", "410000"], ["18", "184", "株洲市", "412000"], ["18", "185", "湘潭市", "411100"], ["18", "186", "衡阳市", "421000"], ["18", "187", "邵阳市", "422000"], ["18", "188", "岳阳市", "414000"], ["18", "189", "常德市", "415000"], ["18", "190", "张家界市", "427000"], ["18", "191", "益阳市", "413000"], ["18", "192", "郴州市", "423000"], ["18", "193", "永州市", "425000"], ["18", "194", "怀化市", "418000"], ["18", "195", "娄底市", "417000"], ["18", "196", "湘西土家族苗族自治州", "416000"], ["19", "197", "广州市", "510000"], ["19", "198", "韶关市", "521000"], ["19", "199", "深圳市", "518000"], ["19", "200", "珠海市", "519000"], ["19", "201", "汕头市", "515000"], ["19", "202", "佛山市", "528000"], ["19", "203", "江门市", "529000"], ["19", "204", "湛江市", "524000"], ["19", "205", "茂名市", "525000"], ["19", "206", "肇庆市", "526000"], ["19", "207", "惠州市", "516000"], ["19", "208", "梅州市", "514000"], ["19", "209", "汕尾市", "516600"], ["19", "210", "河源市", "517000"], ["19", "211", "阳江市", "529500"], ["19", "212", "清远市", "511500"], ["19", "213", "东莞市", "511700"], ["19", "214", "中山市", "528400"], ["19", "215", "潮州市", "515600"], ["19", "216", "揭阳市", "522000"], ["19", "217", "云浮市", "527300"], ["20", "218", "南宁市", "530000"], ["20", "219", "柳州市", "545000"], ["20", "220", "桂林市", "541000"], ["20", "221", "梧州市", "543000"], ["20", "222", "北海市", "536000"], ["20", "223", "防城港市", "538000"], ["20", "224", "钦州市", "535000"], ["20", "225", "贵港市", "537100"], ["20", "226", "玉林市", "537000"], ["20", "227", "百色市", "533000"], ["20", "228", "贺州市", "542800"], ["20", "229", "河池市", "547000"], ["20", "230", "来宾市", "546100"], ["20", "231", "崇左市", "532200"], ["21", "232", "海口市", "570000"], ["21", "233", "三亚市", "572000"], ["22", "234", "重庆市", "400000"], ["23", "235", "成都市", "610000"], ["23", "236", "自贡市", "643000"], ["23", "237", "攀枝花市", "617000"], ["23", "238", "泸州市", "646100"], ["23", "239", "德阳市", "618000"], ["23", "240", "绵阳市", "621000"], ["23", "241", "广元市", "628000"], ["23", "242", "遂宁市", "629000"], ["23", "243", "内江市", "641000"], ["23", "244", "乐山市", "614000"], ["23", "245", "南充市", "637000"], ["23", "246", "眉山市", "612100"], ["23", "247", "宜宾市", "644000"], ["23", "248", "广安市", "638000"], ["23", "249", "达州市", "635000"], ["23", "250", "雅安市", "625000"], ["23", "251", "巴中市", "635500"], ["23", "252", "资阳市", "641300"], ["23", "253", "阿坝藏族羌族自治州", "624600"], ["23", "254", "甘孜藏族自治州", "626000"], ["23", "255", "凉山州", "615000"], ["24", "256", "贵阳市", "55000"], ["24", "257", "六盘水市", "553000"], ["24", "258", "遵义市", "563000"], ["24", "259", "安顺市", "561000"], ["24", "260", "铜仁地区", "554300"], ["24", "261", "黔西南州", "551500"], ["24", "262", "毕节地区", "551700"], ["24", "263", "黔东南州", "551500"], ["24", "264", "黔南州", "550100"], ["25", "265", "昆明市", "650000"], ["25", "266", "曲靖市", "655000"], ["25", "267", "玉溪市", "653100"], ["25", "268", "保山市", "678000"], ["25", "269", "昭通市", "657000"], ["25", "270", "丽江市", "674100"], ["25", "271", "思茅市", "665000"], ["25", "272", "临沧市", "677000"], ["25", "273", "楚雄州", "675000"], ["25", "274", "红河州", "654400"], ["25", "275", "文山州", "663000"], ["25", "276", "西双版纳州", "666200"], ["25", "277", "大理州", "671000"], ["25", "278", "德宏州", "678400"], ["25", "279", "怒江州", "671400"], ["25", "280", "迪庆州", "674400"], ["26", "281", "拉萨市", "850000"], ["26", "282", "昌都地区", "854000"], ["26", "283", "山南地区", "856000"], ["26", "284", "日喀则地区", "857000"], ["26", "285", "那曲地区", "852000"], ["26", "286", "阿里地区", "859100"], ["26", "287", "林芝地区", "860100"], ["27", "288", "西安市", "710000"], ["27", "289", "铜川市", "727000"], ["27", "290", "宝鸡市", "721000"], ["27", "291", "咸阳市", "712000"], ["27", "292", "渭南市", "714000"], ["27", "293", "延安市", "716000"], ["27", "294", "汉中市", "723000"], ["27", "295", "榆林市", "719000"], ["27", "296", "安康市", "725000"], ["27", "297", "商洛市", "711500"], ["28", "298", "兰州市", "730000"], ["28", "299", "嘉峪关市", "735100"], ["28", "300", "金昌市", "737100"], ["28", "301", "白银市", "730900"], ["28", "302", "天水市", "741000"], ["28", "303", "武威市", "733000"], ["28", "304", "张掖市", "734000"], ["28", "305", "平凉市", "744000"], ["28", "306", "酒泉市", "735000"], ["28", "307", "庆阳市", "744500"], ["28", "308", "定西市", "743000"], ["28", "309", "陇南市", "742100"], ["28", "310", "临夏回族自治州", "731100"], ["28", "311", "甘南藏族自治州", "747000"], ["29", "312", "西宁市", "810000"], ["29", "313", "海东地区", "810600"], ["29", "314", "海北藏族自治州", "810300"], ["29", "315", "黄南藏族自治州", "811300"], ["29", "316", "海南藏族自治州", "813000"], ["29", "317", "果洛藏族自治州", "814000"], ["29", "318", "玉树藏族自治州", "815000"], ["29", "319", "海西蒙古族藏族自治州", "817000"], ["30", "320", "银川市", "750000"], ["30", "321", "石嘴山市", "753000"], ["30", "322", "吴忠市", "751100"], ["30", "323", "固原市", "756000"], ["30", "324", "中卫市", "751700"], ["31", "325", "乌鲁木齐市", "830000"], ["31", "326", "克拉玛依市", "834000"], ["31", "327", "吐鲁番地区", "838000"], ["31", "328", "哈密地区", "839000"], ["31", "329", "昌吉回族自治州", "831100"], ["31", "330", "博尔塔拉蒙古自治州", "833400"], ["31", "331", "巴音郭楞蒙古自治州", "841000"], ["31", "332", "阿克苏地区", "843000"], ["31", "333", "克孜勒苏柯尔克孜自治州", "835600"], ["31", "334", "喀什地区", "844000"], ["31", "335", "和田地区", "848000"], ["31", "336", "伊犁哈萨克自治州", "833200"], ["31", "337", "塔城地区", "834700"], ["31", "338", "阿勒泰地区", "836500"], ["31", "339", "石河子市", "832000"], ["31", "340", "阿拉尔市", "843300"], ["31", "341", "图木舒克市", "843900"], ["31", "342", "五家渠市", "831300"], ["32", "343", "香港特别行政区", "000000"], ["33", "344", "澳门特别行政区", "000000"], ["34", "345", "台湾省", "000000"]];
        return cities;
      },
      /**
       * 获取非交易时间段提示
       * @param commNo交易编号
       * @returns {*}非交易时间段提示信息
       */
      beyondTradeTimeTips: function (commNo) {
        var _period = [], str = [], period = this.getQueryPeriod(commNo, 'trade');
        var i, len, head = '非交易时间不可交易<br><br>【{{COMMNO}}的买入时间】<br>', sc;
        var commodity = {
          HSI: '恒指',
          GC: '美黄金',
          SI: '美白银',
          CL: '美原油',
          CN: '富时A50',
          DAX: '德指',
          MHI: '小恒指'
        };

        if (!X.isArray(period))return '';

        if (X.isArray(period[0][0])) {
          period.forEach(function (arr) {
            _period = _period.concat(arr);
          });
        } else {
          _period = period;
        }

        len = _period.length;
        for (i = 0; i < len; i++) {
          var timePeriod = _period[i], bt = timePeriod[0], et = timePeriod[1];
          //判断跨天
          if (et == '24:00' && _period[i + 1] && _period[i + 1][0] == '00:00') {
            str.push(bt + ' - ' + _period[i + 1][1] + '<br>');
            i++;
          } else {
            str.push(bt + ' - ' + et + '<br>');
          }
        }
        sc = head + str.join('') + '（周末及节假日休市）';
        return sc.replace('{{COMMNO}}', commodity[commNo]);
      }
    };
  },

  //认证服务
  AuthService:function () {
    var sessionStorage = window.sessionStorage;
    return {
      auth: function () {
        var session = sessionStorage.getItem('sessionID'), now = Date.now(), timeOut = 2 * 60 * 60 * 1000;
        //没有找到用户信息为未登录
        if (!session) {
          return false;
        }
        var sessionArr = session.split('#'), lastLoginTime = sessionArr[1];
        //session超时
        if (now - lastLoginTime > timeOut) {
          sessionStorage.removeItem('sessionID');
          return false;
        }
        sessionArr[1] = now;
        sessionStorage.setItem('sessionID', sessionArr.join('#'));
        return true;
      },
      signIn: function (userID) {
        var authStr = [userID, Date.now()].join('#');
        sessionStorage.setItem('sessionID', authStr);
      },
      signOut: function () {
        sessionStorage.removeItem('sessionID');
      }
    };
  },

  //拦截器
  myInterceptor:function(){
    var interceptor = {
      'request': function (config) {
        return config;
      },
      'response': function (response) {
        if (X.isObject(response.data)) {
          if (response.data.code == 100) {
            AuthService.auth();
          } else if (response.data.code == 405) {
            AuthService.signOut();
            $location.path('/login').replace();
          }
        }
        return response;
      },
      'requestError': function (rejection) {
        return rejection;
      },
      'responseError': function (rejection) {
        return rejection;
      }
    };
    return interceptor;
  },

  //股票和弹窗服务
  ADBannerService: {
    //获取弹窗和滑动banner的数据
    getADBannerData: function () {
      var params = {
        device: 1,
        agentCode: agentCode,
        source: agentCode
      };
      return axios({
        method: 'GET',
        url: getURL('getADBanner'),
        params: params
      });
    }
  },

  //红包服务
  PacketService:{
    //获取红包具体shuju
    getPacketInfoData: function () {
      var params = {
        device: 1,
        agentCode: agentCode,
        source: agentCode
      };
      return axios({
        method: 'GET',
        url: getURL('getPacketInfo'),
        params: params
      });
    },

    //收取红包数据
    receivePacketData: function (title, money) {
      var params = {
        device: 1,
        title: title,
        money: money,
        agentCode: agentCode,
        source: agentCode
      };
      return axios({
        method: 'POST',
        url: getURL('receivePacket'),
        params: params
      });
    },

    //获取红包资金数据
    getPacketFundInfoData: function () {
      var params = {
        device: 1,
        agentCode: agentCode,
        source: agentCode
      };
      return axios({
        method: 'GET',
        url: getURL('getPacketFundInfo'),
        params: params
      });
    },

    //获取红包记录列表数据
    getPacketRecordListData: function () {
      var params = {
        device: 1,
        agentCode: agentCode,
        source: agentCode
      };
      return axios({
        method: 'GET',
        url: getURL('getPacketRecordList'),
        params: params
      });
    },

    //获取活动列表
    getActivityInfo: function () {
      var params = {
        device: 1,
        agentCode: agentCode,
        source: agentCode
      };
      return axios({
        method: 'GET',
        url: getURL('getActivityInfo'),
        params: params
      })
    },

    //子活动列表
    getActAwardSetInfo: function (activityId) {
      var params = {
        device: 1,
        agentCode: agentCode,
        activityId: activityId,
        source: agentCode
      };
      return axios({
        method: 'GET',
        url: getURL('getActAwardSetInfo'),
        params: params
      })
    },

    //红包领取
    receiveTipByActivity: function (title, awardLogId, money) {
      var params = {
        device: 1,
        agentCode: agentCode,
        title: title,
        awardLogId: awardLogId,
        money: money,
        source: agentCode
      };
      return $http({
        method: 'POST',
        url: URLService.getURL('receiveTipByActivity'),
        params: params
      })
    }
  },

  //推广赚钱服务
  ExtensionService:{
    //获取推广信息
    getExtensionInfoData: function () {
      var params = {
        device: 1,
        agentCode: agentCode,
        source: agentCode
      };
      return axios({
        method: 'POST',
        url: getURL('getExtensionInfo'),
        params: params
      });
    },

    //获取推广用户列表
    getExtensionUserListData: function (page, pageSize) {
      var params = {
        device: 1,
        page: page,
        pageSize: pageSize,
        agentCode: agentCode,
        source: agentCode
      };
      return axios({
        method: 'POST',
        url: getURL('getExtensionUserList'),
        params: params
      });
    }
  },

  //排行服务
  RankService:{
    //获取排行数据
    getRank: function (type) {
      var url = type == 'day' ? URLService.getURL('getUserRank') : URLService.getURL('getUnionRank');
      var params = {
        device: 1,
        agentCode: agentCode,
        source: agentCode
      };
      return axios({
        method: 'GET',
        url: url,
        params: params
      })

    }
  }
}


