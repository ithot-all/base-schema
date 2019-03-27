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