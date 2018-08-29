# base-schema
:zap: a mongoose base schema

# function
- give your schema append `created_at` `updated_at` and manage them 
- delete `_id` `__v` fields from output json
  
# install 
```
npm install base-schema
```

# usage 
```javascript
const Schema = require('base-schema');
const User = Schema('User', {
    username: String
});
```
# contribute
> if you feel what else a base shema should have, welcome to improve [issue](https://github.com/dtboy1995/mongoose-acid/issues)