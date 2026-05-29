App({
  onLaunch() {
    // 获取用户信息
    this.getUserInfo();
    
    // 获取系统信息
    this.getSystemInfo();
    
    // 检测语言偏好
    this.detectLanguage();
  },

  onShow() {
    // 小程序启动或从后台进入前台
  },

  onHide() {
    // 小程序从前台进入后台
  },

  globalData: {
    userInfo: null,
    language: 'zh-CN',
    systemInfo: null
  },

  getUserInfo() {
    const userInfo = wx.getStorageSync('userInfo');
    if (userInfo) {
      this.globalData.userInfo = userInfo;
    }
  },

  getSystemInfo() {
    const systemInfo = wx.getSystemInfoSync();
    this.globalData.systemInfo = systemInfo;
  },

  detectLanguage() {
    const savedLang = wx.getStorageSync('language');
    if (savedLang) {
      this.globalData.language = savedLang;
    } else {
      // 根据系统语言检测
      const systemLang = this.globalData.systemInfo?.language;
      if (systemLang?.startsWith('zh')) {
        this.globalData.language = 'zh-CN';
      } else if (systemLang?.startsWith('th')) {
        this.globalData.language = 'th-TH';
      } else {
        this.globalData.language = 'en-US';
      }
    }
  },

  setLanguage(lang: string) {
    this.globalData.language = lang;
    wx.setStorageSync('language', lang);
  }
});
