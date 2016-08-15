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
    hostedDomain: process.env.hostedDomain || 'http://www.localhost:3000',
    alternateDomain: process.env.alternateDomain || 'http://127.0.0.1:3000',
    twitterConsumerKey: process.env.TWITTER_CONSUMER_KEY || 'iuzErv06c19D6Jqo1xT8pJP1N',
    twitterConsumerSecret: process.env.TWITTER_CONSUMER_SECRET || 'Z2AdiITIkBQPHi890hqaWIASlwEoc21G5Y2ggVsU9mEHuCFaOt',
    // twitterAppToken: process.env.TWITTER_APP_TOKEN || '4809076273-k27f30MCUdO8Zy8aLMTeDZpcfvpvmssAKKYNnQ5',
    // twitterAppTokenSecret: process.env.TWITTER_APP_TOKEN_SECRET || 'hd2INy6Mthqy2kr3Jtcj7l982vmAREDxskJISPF6J0MRw',
    twitterBearerToken: process.env.TWITTER_BEARER_TOKEN || 'AAAAAAAAAAAAAAAAAAAAADBMwQAAAAAA9vxtpYpYao2anTI8CmGUhN3%3Dt0SMtGELGF2fWzQ9Xv3X3FgC39zVkvLdG36Npvd7bkGBeUMZU5',
  },
  production: {
    rootPath: rootPath,
    port: process.env.PORT || '3000',
    secret: process.env.SECRET || 'mattdubiesucks123',
    db: process.env.DATABASE_URL || 'postgres://palpaca:mattdubiesucks123@impostorthesis.ct52emcpwnt6.us-west-1.rds.amazonaws.com/thesis',
    logLevel: process.env.LOG_LEVEL || 'tiny',
    hostedDomain: process.env.hostedDomain || 'http://www.localhost:3000',
    alternateDomain: process.env.alternateDomain || 'http://127.0.0.1:3000',
    twitterConsumerKey: process.env.TWITTER_CONSUMER_KEY || 'iuzErv06c19D6Jqo1xT8pJP1N',
    twitterConsumerSecret: process.env.TWITTER_CONSUMER_SECRET || 'Z2AdiITIkBQPHi890hqaWIASlwEoc21G5Y2ggVsU9mEHuCFaOt',
    // twitterAppToken: process.env.TWITTER_APP_TOKEN || '4809076273-k27f30MCUdO8Zy8aLMTeDZpcfvpvmssAKKYNnQ5',
    // twitterAppTokenSecret: process.env.TWITTER_APP_TOKEN_SECRET || 'hd2INy6Mthqy2kr3Jtcj7l982vmAREDxskJISPF6J0MRw',
    twitterBearerToken: process.env.TWITTER_BEARER_TOKEN || 'AAAAAAAAAAAAAAAAAAAAADBMwQAAAAAA9vxtpYpYao2anTI8CmGUhN3%3Dt0SMtGELGF2fWzQ9Xv3X3FgC39zVkvLdG36Npvd7bkGBeUMZU5',
  }
};

module.exports = config[env];
