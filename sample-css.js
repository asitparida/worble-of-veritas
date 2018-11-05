var RNC = require('react-native-css');
console.log(RNC.default)
const result = RNC.default.toJSS(`
  description {
    margin-bottom: 20px;
    font-size: 18px;
    text-align: center;
    color: #656656;
  }
 
  container {
    padding: 30px;
    margin-top: 65px;
    align-items: center;
    display: block;
  }
`)
console.log(result);