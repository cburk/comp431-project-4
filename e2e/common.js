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
    username: 'cjb6test',
    password: 'minerals-related-business'
}

exports.regCreds = {
    username: 'asd1',
    password: 'a-b-c',
    phone: '123-123-1234',
    email: 'a@b.c',
    zip: '12345',
    date: 'Tue Jan 02 1990 00:00:00 GMT-0600 (CST)'
}

exports.register = () =>
    sleep(500)
        .then(findId('register-username').sendKeys(exports.regCreds.username))
        .then(findId('register-password').sendKeys(exports.regCreds.password))
        .then(findId('register-email').sendKeys(exports.regCreds.email))
        .then(findId('register-phone').sendKeys(exports.regCreds.phone))
        .then(findId('register-zip').sendKeys(exports.regCreds.zip))
        .then(findId('register-date').sendKeys(exports.regCreds.date))
        .then(findId('register-submit').click())
        .then(sleep(2000))

exports.login = () =>
    sleep(500)
        .then(findId('login-username').clear())
        .then(findId('login-password').clear())
        .then(findId('login-username').sendKeys(exports.creds.username))
        .then(findId('login-password').sendKeys(exports.creds.password))
        .then(findId('login-login').click())
        .then(sleep(2000))

