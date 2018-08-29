const Schema = require('./');
const mongoose = require('mongoose');
mongoose.set('debug', true);
const uri = 'mongodb://localhost/test';
const User = Schema('User', {
    username: String
});

const init = async () => {
    const conn = await mongoose.connect(uri, {
        useNewUrlParser: true
    });
    await User.create({
        username: 'ithot'
    });
    await conn.disconnect();
}

const TEST_CASE = {
    update: async () => {
        const conn = await mongoose.connect(uri, {
            useNewUrlParser: true
        });
        try {
            await User.updateMany({}, { username: 'ithot-many' });
            await User.findByIdAndUpdate('5b861ebf50c4624798e0dbb2', { username: 'findById' });
            await User.updateOne({}, { username: 'ithot-one' });
        } catch (err) {
            console.log(err);
        }
        await conn.disconnect();
    },
    json: async () => {
        const conn = await mongoose.connect(uri, {
            useNewUrlParser: true
        });
        let user = await User.findOne();
        console.log(user.toJSON());
        await conn.disconnect();
    }
};