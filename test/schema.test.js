const mongoose = require('mongoose')
mongoose.set('debug', false)
const Schema = require('../src/schema')

const Foo2 = Schema('Foo2', {
    name: String
})

const Foo = Schema('Foo', {
    name: String,
    deleted_at: Schema.Time,
    foo2: {
        type: Schema.ObjectId,
        ref: 'Foo2'
    },
    balance: Schema.Decimal128,
    age: Schema.Int32,
    weight: Schema.Double
})

const sleep = (millis) => {
    return new Promise((resolve) => {
        setTimeout(resolve, millis)
    })
}

let conn

beforeAll(async () => {
    conn = await mongoose.connect('mongodb://localhost/test', {
        useNewUrlParser: true
    })
    await Foo.deleteMany()
    await Foo2.deleteMany()
    let foo2 = await Foo2.create({ name: 'foo2' })
    await Foo.create({ name: 'foo', foo2: foo2.id, age: 20, weight: 74.5, balance: 1000100.5 })
})

test('created_at updated_at definition', async () => {
    let foo = await Foo.findOne()
    expect(foo.created_at).toBeDefined()
    expect(foo.updated_at).toBeDefined()
})

test('auto manage updated_at', async () => {
    let foo = await Foo.findOne()
    await sleep(1500)
    let _foo = await Foo.findOneAndUpdate({}, { name: '_foo' }, { new: true })
    expect(foo.updated_at).not.toEqual(_foo.updated_at)
    let user = new Date()
    let user_foo = await Foo.findOneAndUpdate({}, { updated_at: user }, { new: true })
    expect(parseInt(user.getTime() / 1000)).toEqual(user_foo.updated_at)
})

test('Schema.ObjectId', async () => {
    let foo = await Foo.findOne().populate('foo2')
    expect(foo.foo2).toHaveProperty('name')
})

test('Schema.Time', async () => {
    let foo = await Foo.findOne()
    expect(foo.deleted_at).toBeDefined()
    expect(typeof foo.deleted_at === 'number').toBeTruthy()
})

test('Schema.Double', async () => {
    let foo = await Foo.findOne()
    expect(foo.weight).toBeDefined()
    expect(foo.weight instanceof mongoose.Types.Double).toBeTruthy()
})

test('Schema.Decimal128', async () => {
    let foo = await Foo.findOne()
    expect(foo.balance).toBeDefined()
    expect(foo.balance instanceof mongoose.Types.Decimal128).toBeTruthy()
})

test('Schema.Int32', async () => {
    let foo = await Foo.findOneAndUpdate({}, { $inc: { age: 1.5 } }, { new: true })
    expect(foo.age).toBeDefined()
    expect(typeof foo.age === 'number').toBeTruthy()
    expect(foo.age).toEqual(Math.round(20 + 1.5))
})

afterAll(async () => {
    await Foo.deleteMany()
    await Foo2.deleteMany()
    await conn.disconnect()
})