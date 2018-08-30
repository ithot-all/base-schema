![android-sex-http](art/logo.png)

# base-schema
:smile: 一个简易的生成mongoose Schema的小库

# 功能
- 给你的schema追加`created_at` `updated_at`字段并且管理他们的变化 
- 再输出的json中删除 `_id` `__v`字断
- 将`mongoose.Promise` 替换为 `bluebird`
  
# 安装
```
npm install base-schema --save
```

# 用法 

### 简单点
```javascript
const Schema = require('base-schema');
const User = Schema('User', {
    username: String
});
(async() => {
    await User.updateOne({}, { username: 'ithot' });
})();
```

### 其他
```javascript
const Schema = require('base-schema');
// 默认返回的是Model
const User = Schema('User', {
    username: String
});
// 设置第一个参数为false将返回Schema
const UserSchema = Schema(false, {
    username: String
});
```

# 贡献
> 如果你觉得一个基类Schema还应该有什么，欢迎一起改进[issue](https://github.com/dtboy1995/mongoose-acid/issues)