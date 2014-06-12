#IcarusBot Twitter Plugin

Adds a handler for a `!tw` message that posts a user's most current tweet, with
an option to specify the users Xth previous tweet.

Available commands:
 - `!tw example-user` - Pull in the latest tweet from user `example-user`
 - `!tw example-user 5` - Pull in the 5th latest tweet from the user

##Usage
 - Create an 'app' at dev.twitter.com, and generate api keys and an
   access token.
 - In your bot, require the plugin, passing the bot, followed by an options
   object.

###Example:
```
var bot = require('icarusbot')
var twetter = require('icarusbot-twitter')(bot, {
  apiKey: 'your really long api key',
  apiSecret: 'your really long api secret',
  accessToken: 'your really long access token',
  accessSecret: 'your really long access secret',
})
```
