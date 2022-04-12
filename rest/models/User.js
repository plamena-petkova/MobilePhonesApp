const {model, Schema} = require('mongoose');


const userSchema = new Schema({
    email: {type: String, required:[true, 'Email is required']},
    firstName: {type: String, required:[true, 'First name is required']},
    lastName:{type: String, required:[true, 'Last name is required']},
    hashedPassword: {type: String, required: true, minlength:[5, 'Password should be at least 5 characters']},

});

userSchema.index({email:1}, {
    collation: {
        locale: 'en',
        strength:1
    }
})

const User = model('User', userSchema);

module.exports = User;


