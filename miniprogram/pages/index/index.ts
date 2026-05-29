Page({
  data: {
    stories: [
      { title: '给阿嬷的情书', subtitle: '跨越时空的思念' },
      { title: '血脉相连', subtitle: '寻根之旅' },
      { title: '回家的路', subtitle: '三代人的期盼' }
    ],
    currentStory: 0,
    stats: {
      totalPosts: 1256,
      success: 89,
      activeSeekers: 342,
      regions: 28
    }
  },

  onLoad() {
    // 页面加载
    this.startCarousel();
  },

  onShow() {
    // 页面显示
  },

  startCarousel() {
    setInterval(() => {
      const next = (this.data.currentStory + 1) % this.data.stories.length;
      this.setData({ currentStory: next });
    }, 5000);
  },

  goToSearch() {
    wx.switchTab({
      url: '/pages/search/search'
    });
  },

  goToPublish() {
    wx.switchTab({
      url: '/pages/publish/publish'
    });
  }
});
