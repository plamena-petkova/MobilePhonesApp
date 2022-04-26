const {model, Schema, Types: {ObjectId}} = require('mongoose');

const schema = new Schema({
    phoneName: {type: String, required: [true, 'Phone name is required']},
    phonePrice: {type: Number, required: [true, 'Phone price is required'], minlength: [1, 'Price must be positive number!']},
    description: {type: String, required: [true, 'Description is required'], minlength: [10, 'Description must be more than 10 charachters long!']},
    img: {type: String, required: [true, 'Image is required']},
    releaseDate:{type: String,required: [true, 'Release Date is required']},
    owner: {type: ObjectId, ref: 'User'},
    likes: {type: [ObjectId], ref: 'User', default: [] },
    rating: {type: Number, default: 0}
    
    // comments: {type: String}
})


const Phone = model('Phone', schema);

module.exports = Phone;