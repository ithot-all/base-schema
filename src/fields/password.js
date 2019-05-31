const bcrypt = require('bcryptjs')
const util = require('util')
const hash = util.promisify(bcrypt.hash)
const compare = util.promisify(bcrypt.compare)
const BaseField = require('./field')

class Password extends BaseField {
    wrap (schema) {
        schema.add({
            password: {
                type: String,
                select: false
            }
        })
        schema.pre('save', function (next) {
            if (this.isModified('password')) {
                hash(this.password, 5).then((hash) => {
                    this.password = hash
                    next()
                }).catch(next)
            } else {
                next()
            }
        })
        schema.methods = Object.assign(schema.methods, {
            compwd (password) {
                return compare(password, this.password)
            }
        })
    }
}

module.exports = new Password()