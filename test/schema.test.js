const mongoose = require('mongoose')
mongoose.set('debug', false)
const Schema = require('../src/schema')

let conn

const Foo2 = Schema('Foo2', {
    name: String,
    age: Number
})

const Foo = Schema('Foo', {
    name: String,
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

beforeAll(async () => {
    conn = await mongoose.connect('mongodb://DESKTOP-KDJKJGK/test', {
        useNewUrlParser: true
    })
    await Foo.deleteMany()
    await Foo2.deleteMany()
    let foo2 = await Foo2.create({ name: 'foo2', age: 59 })
    await Foo.create({ name: 'foo', foo2: foo2.id, age: 20, weight: 74.5, balance: 1000100.5 })
})

test('created_at updated_at define', async () => {
    let foo = await Foo.findOne()
    expect(foo.created_at).toBeDefined()
    expect(foo.updated_at).toBeDefined()
})

test('auto manage updated_at', async () => {
    let foo = await Foo.findOne()
    await sleep(1500)
    let _foo = await Foo.findOneAndUpdate({}, { name: '_foo' }, { new: true })
    expect(foo.updated_at.getTime()).not.toEqual(_foo.updated_at.getTime())
    let _date = new Date()
    let _foo_ = await Foo.findOneAndUpdate({}, { updated_at: _date }, { new: true })
    expect(_date.getTime()).toEqual(_foo_.updated_at.getTime())
})

test('Schema.ObjectId', async () => {
    let foo = await Foo.findOne().populate('foo2')
    expect(foo.foo2).toHaveProperty('name')
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

test('Model.page', async () => {
    let docs = []
    for (let i = 0; i < 10; i++) {
        docs.push({ name: i })
    }
    await Foo2.insertMany(docs)
    let foos = await Foo2.find({}).page(1, 5)
    expect(foos.length).toEqual(5)
})

afterAll(async () => {
    await Foo.deleteMany()
    await Foo2.deleteMany()
    await conn.disconnect()
})