const BASE_URL = 'https://ugo.botue.com'
// const BASE_URL = 'https://www.uinav.com'
function request (options) {
  if (!options.noLoading) {
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
  }
  return new Promise((resolve, reject) => {
    wx.request({
      url: BASE_URL + options.url,
      data: options.data,
      methods: options.method || 'GET',
      header: options.header,
      success: res => {
        let {meta, message} = res.data
        if (meta.status === 200) {
          resolve(message)
        } else {

        }
      },
      fail: err => {
        console.log(err)
      },
      complete () {
        // 关闭loading
        if (!options.noLoading) {
          wx.hideLoading()
        }
      }
    })
  })
}
export default request
