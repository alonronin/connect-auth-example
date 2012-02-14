Facebook and Twitter connect using connect-auth.
Saving the session to MongoDB using connect-mongo.

cd to connect-auth-example
npm install

change app id's and secrets in app.settings.facebook and app.settings.twitter

run mongodb, you can change settings in express.session store object.

## Options

  - `db` Database name
  - `collection` Collection (optional, default: `sessions`) 
  - `host` MongoDB server hostname (optional, default: `127.0.0.1`)
  - `port` MongoDB server port (optional, default: `27017`)
  - `username` Username (optional)
  - `password` Password (optional)
  - `url` Connection url of the form: `mongodb://user:pass@host:port/database/collection`.
          If provided, information in the URL takes priority over the other options.
  - `clear_interval` Interval in seconds to clear expired sessions (optional, default: `-1`).
          Values <= 0 disable expired session clearing.

node app.js

callack url's need to point back to /login

if you run from localhost don't forget to create local.host at your hosts file, 
or just point youe dev.domain.com to your localhost.

I will add more examples later on.