var twetter = require('node-twitter-api')

module.exports = function(bot, config) {
  var tw = twetter({
    consumerKey: config.apiKey,
    consumerSecret: config.apiSecret,
    callback: ''
  })

  var getTimeline = function(username, index, cb) {
    index = index || 0
    tw.getTimeline('user', {screen_name: username}, config.accessToken, config.accessSecret, function(err, data) {
      if (err) {
        cb(err)
      }
      if(index >= data.length) {
        cb('Error: tweet out of range, up to ' + data.length + 'past tweets allowed.') 
      }
      else {
        cb(null, data[index].user.screen_name + ': ' + data[index].text)
      }
    })
  }

  var getTweet = function(id, cb) {
    tw.statuses('show', {id: id}, config.accessToken, config.accessSecret, function(err, data) {
      if (err) cb(err)
      cb(null, data.user.screen_name + ': ' + data.text)
    })
  }

  bot.on('msg', function(msg) {
    var matches =  msg.msg.match(/^!tw (\w+) ?(\d+)?/)
    if (!matches) {
      return
    }

    var response = ''
    var index = parseInt(matches[2], 10) || 0

    if (matches[1] === 'id') {
      getTweet(matches[2], function(err, response) {
        if (err) return
        bot.msg([msg.chan], msg.sender + ': ' + response)
      })
    }
    else {
      getTimeline(matches[1], matches[2], function(err, response) {
        if (err) return
        bot.msg([msg.chan], msg.sender + ': ' + response)
      })
    }

  })
}
