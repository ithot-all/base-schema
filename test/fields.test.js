const mongoose = require('mongoose')
mongoose.set('debug', false)
const Schema = require('../src/schema')

let conn

const Test = Schema('Test', {
    name: String,
    phone: Schema.Field.phone,
    password: Schema.Field.password
})

beforeAll(async () => {
    conn = await mongoose.connect('mongodb://localhost/test', {
        useNewUrlParser: true
    })
    await Test.deleteMany()
    await Test.create({
        phone: '13812345678',
        password: '@lili520',
        name: 'test'
    })
})

test('Schema.Field phone', async () => {
    let test = await Test.findOne().select('+used_phones')
    expect(test.phone).toBeDefined()
    expect(test.used_phones).toBeDefined()
    expect(test.used_phones.length).toEqual(1)
    expect(test.used_phones[0] === test.phone).toBeTruthy()
})

test('Schema.Field password', async () => {
    let test = await Test.findOne().select('+password')
    expect(test.password).toBeDefined()
    let match = await test.compwd('@lili520')
    expect(match).toBeTruthy()
})

test('Schema.Field full field', async () => {
    let test = await Test.findOne().select('+password +used_phones')
    expect(test.name).toBeDefined()
    expect(test.phone).toBeDefined()
    expect(test.used_phones).toBeDefined()
    expect(test.password).toBeDefined()
})

afterAll(async () => {
    await Test.deleteMany()
    await conn.disconnect()
})