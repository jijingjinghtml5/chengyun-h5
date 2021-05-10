const pageGenerator = require('./plop-templates/page/prompt')
const componentGenerator = require('./plop-templates/component/prompt')
const storeGenerator = require('./plop-templates/store/prompt.js')

module.exports = function (plop) {
  plop.setGenerator('page', pageGenerator)
  plop.setGenerator('component', componentGenerator)
  plop.setGenerator('store', storeGenerator)
}
