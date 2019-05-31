const BaseField = require('./field')

class Phone extends BaseField {
    wrap (schema) {
        schema.add({
            phone: {
                type: String, unique: true
            },
            used_phones: {
                type: [String], select: false
            },
        })
        schema.pre('save', function (next) {
            if (this.isModified('phone')) {
                this.used_phones = this.used_phones || []
                this.used_phones.push(this.phone)
            }
            next()
        })
    }
}

module.exports = new Phone()