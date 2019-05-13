module.exports = (schema) => {
    schema.add({
        phone: {
            type: String, unique: true
        },
        used_phones: {
            type: [String], select: false
        },
    })
    schema.pre('save', (next) => {
        if (this.isModified('phone')) {
            this.used_phones = this.used_phones || []
            this.used_phones.push(this.phone)
        }
        next()
    })
}