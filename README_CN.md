![base-schema](art/logo.png)

[![Build Status](https://img.shields.io/travis/ithot-all/base-schema/master.svg?style=flat-square)](https://travis-ci.org/ithot-all/base-schema)

[![NPM](https://nodei.co/npm/base-schema.png?compact=true)](https://npmjs.org/package/base-schema)

# base-schema
:smile: mongoose Schema 小助手

### 功能
- give your schema append `created_at` `updated_at` and manage them 
- delete `_id` `__v` fields from output json
  
### 安装 
```
npm i base-schema -S
```

### 用法 
```javascript
const Schema = require('base-schema')
const User = Schema('User', {
    username: String
})
(async() => {
    await User.create({ name: 'foo' })
})()
```

### 属性

| 属性              | 描述                                 |
| ----------------- | ------------------------------------ |
| `Schema.Time`     | 一种日期类型，获取的时候是unix时间戳 |
| `Schema.ID`       | mongoose.Types.ObjectId              |
| `Schema.ObjectId` | mongoose.Schema.Types.ObjectId       |

### 测试
```
npm test
```