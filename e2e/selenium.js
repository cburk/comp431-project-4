const webdriver = require('selenium-webdriver')

const url = 'http://localhost:8080/index.html'

const driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build()

exports.driver = driver
exports.By = webdriver.By
exports.findId = id => driver.findElement(webdriver.By.id(id))
exports.findName = id => driver.findElement(webdriver.By.name(id))
exports.findAllByClass = name => driver.findElements(webdriver.By.name(name))
exports.pageSource = text => driver.getPageSource()
//exports.findCSS = css => driver.findElement(webdriver.By.css(css))
exports.go = _ => driver.navigate().to(url)
exports.sleep = millis => driver.sleep(millis)

