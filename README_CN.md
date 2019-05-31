![base-schema](art/logo.png)

[![Build Status](https://img.shields.io/travis/ithot-all/base-schema/master.svg?style=flat-square)](https://travis-ci.org/ithot-all/base-schema)

[![NPM](https://nodei.co/npm/base-schema.png?compact=true)](https://npmjs.org/package/base-schema)

# base-schema
:smile: mongoose Schema 小助手

### 功能
- 给Schema添加`created_at`和`updated_at`属性并且自动管理他们 
- 从输出的json中删除`_id`和`__v`
- 添加page方法用来分页
  
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
await Foo.find({}).page(1, 10)
```

### 属性

| 名称                | 引用                             | 描述                                           |
| ------------------- | -------------------------------- | ---------------------------------------------- |
| `Schema.ObjectId`   | mongoose.Schema.Types.ObjectId   | 一个 `mongoose.Schema.Types.ObjectId` 的引用   |
| `Schema.Int32`      | mongoose.Schema.Types.Int32      | 一个 `mongoose-int32` 模块的引用               |
| `Schema.Decimal128` | mongoose.Schema.Types.Decimal128 | 一个 `mongoose.Schema.Types.Decimal128` 的引用 |
| `Schema.Double`     | mongoose.Schema.Types.Double     | 一个 `@mongoosejs/double` 模块的引用           |

### 预设字段
| 名称       | 引用                  | 描述                                    |
| ---------- | --------------------- | --------------------------------------- |
| `phone`    | Schema.Field.phone    | 给Shema添加`phone`和`used_phones`字段   |
| `password` | Schema.Field.password | 给Shema添加`password`字段和`compwd`方法 |

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
// password 和 used_phones 默认不查询
```

### 测试
```
npm test
```