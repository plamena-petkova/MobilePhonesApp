const Phone = require('../models/Phone');

async function getAll() {
    return Phone.find({});
}

async function create(phone) {
    const result = new Phone(phone);
    await result.save();

    return result;
}

function getById(id) {
    return Phone.findById(id);
}

async function update(id, phone) {
    const existing = await Phone.findById(id);

    existing.phoneName = phone.phoneName;
    existing.phonePrice = phone.phonePrice;
    existing.description = phone.description;
    existing.img = phone.img;
    existing.releaseDate = phone.releaseDate;
    existing.likes = phone.likes;
    existing.rating = phone.rating

    await existing.save();

    return existing;

}

async function deleteById(id){
    await Phone.findByIdAndDelete(id);
}

async function like(phoneId, userId) {
    const phone = await Phone.findById(phoneId);

    if(phone.likes.includes(userId)){
       throw new Error('User has already liked the phone!');
    }

    phone.likes.push(userId);
    phone.rating += 1;
    
    await phone.save();

    return phone;

}

module.exports = {
    create,
    getAll,
    getById,
    update,
    deleteById,
    like
}