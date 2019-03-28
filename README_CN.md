![base-schema](art/logo.png)

[![Build Status](https://img.shields.io/travis/ithot-all/base-schema/master.svg?style=flat-square)](https://travis-ci.org/ithot-all/base-schema)

[![NPM](https://nodei.co/npm/base-schema.png?compact=true)](https://npmjs.org/package/base-schema)

# base-schema
:smile: mongoose Schema 小助手

### 功能
- 给您的Schema添加`created_at`和`updated_at`属性并且自动管理他们 
- 从输出的json中删除`_id`和`__v`
  
### 安装 
```
npm i base-schema -S
```

### 用法 
```javascript
const Schema = require('base-schema')
const Foo = Schema('Foo', {
    name: String
})
await Foo.create({ name: 'foo' })
```

### 属性

| 名称                | 描述                             |
| ------------------- | -------------------------------- |
| `Schema.Time`       | mongoose.Schema.Types.Time       |
| `Schema.ObjectId`   | mongoose.Schema.Types.ObjectId   |
| `Schema.Int32`      | mongoose.Schema.Types.Int32      |
| `Schema.Decimal128` | mongoose.Schema.Types.Decimal128 |
| `Schema.Double`     | mongoose.Schema.Types.Double     |

### 测试
```
npm test
```