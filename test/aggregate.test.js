const mongoose = require('mongoose')
mongoose.set('debug', false)
const Schema = require('../src/schema')

let conn

const A = Schema('A', {
    name: String
})

const B = Schema('B', {
    name: String,
    a: {
        type: Schema.ObjectId,
        ref: 'A'
    }
})


beforeAll(async () => {
    conn = await mongoose.connect('mongodb://localhost/test', {
        useNewUrlParser: true
    })
    await A.deleteMany()
    await B.deleteMany()
    let a = await A.create({ name: 'a' })
    let bs = []
    for (let i = 0; i < 10; i++) {
        if (i % 2 == 0) {
            bs.push({ name: `b${i}`, a: a.id })
        } else {
            bs.push({ name: `b${i}` })
        }
    }
    await B.create(bs)
})

test('without Schema.Id', async () => {
    let a = await A.findOne()
    let id = a.id.toString()
    let result = await B.aggregate().match({ a: id })
    expect(result.length).toEqual(0)
})

test('with Schema.Id', async () => {
    let a = await A.findOne()
    let id = a.id.toString()
    let result = await B.aggregate().match({ a: Schema.Id(id) })
    expect(result.length).toEqual(5)
})

afterAll(async () => {
    await A.deleteMany()
    await B.deleteMany()
    await conn.disconnect()
})