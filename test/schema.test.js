const mongoose = require('mongoose')
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
    }
})

let conn

beforeAll(async () => {
    conn = await mongoose.connect('mongodb://localhost/test', {
        useNewUrlParser: true
    })
    await Foo.deleteMany()
    await Foo2.deleteMany()
    let foo2 = await Foo2.create({ name: 'foo2' })
    await Foo.create({ name: 'foo', foo2: foo2.id })
})

test('created_at updated_at', async () => {
    let foo = await Foo.findOne()
    expect(foo.created_at).toBeDefined()
    expect(foo.updated_at).toBeDefined()
    let _foo = await Foo.findOneAndUpdate({}, { name: '_foo' }, { new: true })
    expect(foo.updated_at).not.toEqual(_foo.updated_at)
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

afterAll(async () => {
    await Foo.deleteMany()
    await Foo2.deleteMany()
    await conn.disconnect()
})