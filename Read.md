The project is working on local Mongo and cloud Mongodb, by default is set to local base.
If you want to use cloud MongoDB please change the /config/config.js:
from -> const env = process.env.NODE_ENV || 'local' 
to -> const env = process.env.NODE_ENV || 'cloud';
The project is using Express, MongoDb, mongoose, Handelbars, jwt, cookies.
For security purpose are made blaklist token list for all users that were logout.
All errors handling are made in mongoose
