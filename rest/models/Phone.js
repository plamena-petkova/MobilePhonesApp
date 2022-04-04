const {model, Schema} = require('mongoose');

const schema = new Schema({
    phoneName: {type: String, required: [true, 'Phone name is required']},
    phonePrice: {type: Number, required: [true, 'Phone price is required'], minlength: [1, 'Price must be positive number!']},
    description: {type: String, required: [true, 'Description is required'], minlength: [10, 'Description must be more than 10 charachters long!']},
    img: {type: String, required: [true, 'Image is required']},
    releaseDate:{type: String,required: [true, 'Image is required']},
    // phoneLikes: {type: String},
    // comments: {type: String},
    // userId: IUser;
})


const Phone = model('Phone', schema);

module.exports = Phone;