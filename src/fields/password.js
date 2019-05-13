const bcrypt = require('bcryptjs')
const util = require('util')
const hash = util.promisify(bcrypt.hash)
const compare = util.promisify(bcrypt.compare)

module.exports = (schema) => {
    schema.add({
        type: String,
        select: false
    })
    schema.pre('save', (next) => {
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
        comppwd (password) {
            return compare(password, this.password)
        }
    })
}