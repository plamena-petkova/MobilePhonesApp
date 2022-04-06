const {model, Schema} = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = Number(process.env.SALTROUNDS) || 5;

const userSchema = new Schema({
    email: {type: String, required:[true, 'Email is required']},
    firstName: {type: String, required:[true, 'First name is required']},
    lastName:{type: String, required:[true, 'Last name is required']},
    // password:{type:String, required:true, minlength:[5, 'Password should be at least 5 characters']}
    
    hashedPassword: {type: String, required: true},
});

// userSchema.methods = {
//     matchPassword: function (password) {
//         return bcrypt.compare(password, this.password);
//     }
// }

// userSchema.pre('save', function (next) {
//     if (this.isModified('password')) {
//         bcrypt.genSalt(saltRounds, (err, salt) => {
//             if (err) {
//                 next(err);
//             }
//             bcrypt.hash(this.password, salt, (err, hash) => {
//                 if (err) {
//                     next(err);
//                 }
//                 this.password = hash;
//                 next();
//             })
//         })
//         return;
//     }
//     next();
// });



userSchema.index({email:1}, {
    collation: {
        locale: 'en',
        strength:1
    }
})

const User = model('User', userSchema);

module.exports = User;


