![base-schema](art/logo.png)

[![Build Status](https://img.shields.io/travis/ithot-all/base-schema/master.svg?style=flat-square)](https://travis-ci.org/ithot-all/base-schema)

[![NPM](https://nodei.co/npm/base-schema.png?compact=true)](https://npmjs.org/package/base-schema)

# base-schema
:smile: mongoose base schema simply

### functions
- give schema append `created_at` `updated_at` and manage them 
- delete `_id` `__v` fields from output json
- add the `page` method for paging
  
### install 
```
npm i base-schema -S
```

### usage 
```javascript
const Schema = require('base-schema')
const Foo = Schema('Foo', {
    name: String
})
await Foo.create({ name: 'foo' })
await Foo.find({}).page(1, 10)
```

### attribute

| name                | ref                              | description                                 |
| ------------------- | -------------------------------- | ------------------------------------------- |
| `Schema.ObjectId`   | mongoose.Schema.Types.ObjectId   | A ref to `mongoose.Schema.Types.ObjectId`   |
| `Schema.Int32`      | mongoose.Schema.Types.Int32      | A ref to `mongoose-int32` module            |
| `Schema.Decimal128` | mongoose.Schema.Types.Decimal128 | A ref to `mongoose.Schema.Types.Decimal128` |
| `Schema.Double`     | mongoose.Schema.Types.Double     | A ref to `@mongoosejs/double` module        |

### default field
| name       | ref                   | description                                               |
| ---------- | --------------------- | --------------------------------------------------------- |
| `phone`    | Schema.Field.phone    | add the `phone` and `used_phones` fields to Shema         |
| `password` | Schema.Field.password | add the `password` field and the `compwd` method to Shema |

```js
const { phone, password } = Schema.Field
const User = Schema('User', { phone: phone, password: password })
const user = await User.create({
    phone: '13812345678',
    password: '@lili520'
})
// user.phone = '13812345678'
// user.used_phones = ['13812345678']
// user.password = hash
// await user.compwd('@lili520') is true
// await User.findOne().select('+password +used_phones') 
// password and used_phones default no select
```

### ObjectId used in the aggregation 
```js
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
// origin {a: new mongoose.Types.Object('5cf8e018e5fd67512487be2e')}
await B.aggregate().match({ a: Schema.Id('5cf8e018e5fd67512487be2e') })
```

### test
```
npm test
```