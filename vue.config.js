const path = require('path');
const dotenv = require('dotenv');
const dotenvExpand = require('dotenv-expand');

const env = dotenv.config({ path: path.resolve(__dirname, '.env.prod') });
dotenvExpand(env);

module.exports = {
  chainWebpack: config => {
    config.plugin('define').use(require('webpack/lib/DefinePlugin'), [{ 'process.env': JSON.stringify(process.env) }]);
  }
};
