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

    await existing.save();

    return existing;

}

async function deleteById(id){
    await Phone.findByIdAndDelete(id);
}

module.exports = {
    create,
    getAll,
    getById,
    update,
    deleteById
}