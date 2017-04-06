import { expect } from 'chai'
import { findId, sleep } from './selenium'

// TODO add your test user credentials here!
/*
exports.creds = {
    username: 'sep1test',
    password: 'native-web-tester'
}
*/
exports.creds = {
    username: 'cjb6',
    password: 'someone-task-concerned'
}


exports.login = () =>
    sleep(500)
        .then(findId('login-username').clear())
        .then(findId('login-password').clear())
        .then(findId('login-username').sendKeys(exports.creds.username))
        .then(findId('login-password').sendKeys(exports.creds.password))
        .then(findId('login-login').click())
        .then(sleep(2000))

