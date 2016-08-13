const path = require('path');

const env = process.env.NODE_ENV || 'development';
const rootPath = path.join(__dirname, '../..');

const config = {
  development: {
    rootPath: rootPath,
    port: process.env.PORT || '3000',
    secret: process.env.SECRET || 'mattdubiesucks123',
    db: process.env.DATABASE_URL || 'postgres://palpaca:mattdubiesucks123@impostorthesis.ct52emcpwnt6.us-west-1.rds.amazonaws.com/thesis',
    logLevel: process.env.LOG_LEVEL || 'dev',
    twitterConsumerKey: process.env.TWITTER_CONSUMER_KEY || 'iuzErv06c19D6Jqo1xT8pJP1N',
    twitterConsumerSecret: process.env.TWITTER_CONSUMER_SECRET || 'Z2AdiITIkBQPHi890hqaWIASlwEoc21G5Y2ggVsU9mEHuCFaOt',
  },
  production: {
    rootPath: rootPath,
    port: process.env.PORT || '3000',
    secret: process.env.SECRET || 'mattdubiesucks123',
    db: process.env.DATABASE_URL || 'postgres://palpaca:mattdubiesucks123@impostorthesis.ct52emcpwnt6.us-west-1.rds.amazonaws.com/thesis',
    logLevel: process.env.LOG_LEVEL || 'tiny',
  }
};

module.exports = config[env];
