![base-schema](art/logo.png)

[![Build Status](https://img.shields.io/travis/ithot-all/base-schema/master.svg?style=flat-square)](https://travis-ci.org/ithot-all/base-schema)

[![NPM](https://nodei.co/npm/base-schema.png?compact=true)](https://npmjs.org/package/base-schema)

# base-schema
:smile: a mongoose base schema simply

### functions
- give your schema append `created_at` `updated_at` and manage them 
- delete `_id` `__v` fields from output json
  
### install 
```
npm i base-schema -S
```

### usage 
```javascript
const Schema = require('base-schema')
const User = Schema('User', {
    username: String
})
(async() => {
    await User.create({ name: 'foo' })
})()
```

### attribute

| attribute            | description                                       |
| ----------------- | ------------------------------------------------- |
| `Schema.Time`     | A Date type that is retrieved as a Unix timestamp |
| `Schema.ID`       | mongoose.Types.ObjectId                           |
| `Schema.ObjectId` | mongoose.Schema.Types.ObjectId                    |

### test
```
npm test
```