// pages/add/add.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: '',
    content2:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    var id = e.id;
    if (id) {
      getData(id, this);
    } else {
      this.setData({
        id: Date.now()
      })
    }
  },

  /**
   * input change事件
   */
  change(e) {
    var val = e.detail.value;
    this.setData({
      content: val
    });
  },
  change2(e) {
    var val = e.detail.value;
    this.setData({
      content2: val
    });
  },


  /**
   * cancel 事件
   */
  cancel() {
    wx.navigateBack();
  },

  sure() {
    var reg = /^\s*$/g;
    if (!this.data.content || reg.test(this.data.content)) {
      console.log('不能为空');
      return;
    }
    this.setData({
      time: Date.now()
    });
    setValue(this);
    wx.navigateBack();
  }
})

/**
 * 根据跳转的url中的id获取编辑信息回填
 */
function getData(id, page) {
  var arr = wx.getStorageSync('txt');
  if (arr.length) {
    arr.forEach((item) => {
      if (item.id == id) {
        page.setData({
          id: item.id,
          content: item.content,
          content2:item.content2
        })
      }
    })
  }
}

/**
 * 设置填写的信息，分编辑、新增
 */
function setValue(page) {
  var arr = wx.getStorageSync('txt');
  var data = [], flag = true;
  if (arr.length) {
    arr.forEach(item => {
      if (item.id == page.data.id) {
        item.time = Date.now();
        item.content = page.data.content;
        item.content2 = page.data.content2;
        flag = false;
      }
      data.push(item);
    })
  }
  if (flag) {
    data.push(page.data);
  }
  wx.setStorageSync('txt', data);
}