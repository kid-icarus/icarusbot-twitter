var twetter = require('node-twitter-api')

module.exports = function(bot, config) {
  bot.on('msg', function(msg) {
    var tw = twetter({
      consumerKey: config.apiKey,
      consumerSecret: config.apiSecret,
      callback: ''
    })
    var matches =  msg.msg.match(/^!tw (\w+) ?(\d+)?/)

    if (!matches) {
      return
    }
    var index = parseInt(matches[2], 10) || 0

    tw.getTimeline('user', {screen_name: matches[1]}, config.accessToken, config.accessSecret, function(err, data) {
      if (err) return
      bot.msg([msg.chan], msg.sender + ': ' + data[index].user.screen_name + ': ' + data[index].text)
    })
  })
}
