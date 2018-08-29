![android-sex-http](art/logo.png)

# base-schema
:smile: a mongoose base schema simply

# function
- give your schema append `created_at` `updated_at` and manage them 
- delete `_id` `__v` fields from output json
- `mongoose.Promise` replace to `bluebird`
  
# install 
```
npm install base-schema
```

# usage 

### simple
```javascript
const Schema = require('base-schema');
const User = Schema('User', {
    username: String
});
(async() => {
    await User.updateOne({}, { username: 'ithot' });
})();
```

### other
```javascript
const Schema = require('base-schema');
// default return Model
const User = Schema('User', {
    username: String
});
// your can set first param to false to return Schema
const UserSchema = Schema(false, {
    username: String
});
```

# contribute
> If you feel what else a base shema should have, welcome to improve [issue](https://github.com/dtboy1995/mongoose-acid/issues)