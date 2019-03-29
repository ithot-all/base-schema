![base-schema](art/logo.png)

[![Build Status](https://img.shields.io/travis/ithot-all/base-schema/master.svg?style=flat-square)](https://travis-ci.org/ithot-all/base-schema)

[![NPM](https://nodei.co/npm/base-schema.png?compact=true)](https://npmjs.org/package/base-schema)

# base-schema
:smile: mongoose base schema simply

### functions
- give your schema append `created_at` `updated_at` and manage them 
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
| `Schema.Time`       | mongoose.Schema.Types.Time       | A date type that retrieves a UNIX timestamp |
| `Schema.ObjectId`   | mongoose.Schema.Types.ObjectId   | A ref to `mongoose.Schema.Types.ObjectId`   |
| `Schema.Int32`      | mongoose.Schema.Types.Int32      | A ref to `mongoose-int32` module            |
| `Schema.Decimal128` | mongoose.Schema.Types.Decimal128 | A ref to `mongoose.Schema.Types.Decimal128` |
| `Schema.Double`     | mongoose.Schema.Types.Double     | A ref to `@mongoosejs/double` module        |

### test
```
npm test
```