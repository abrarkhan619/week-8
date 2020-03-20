const mongoose = require('mongoose');
const UserSchema = require('./models/user');

mongoose.connect('mongodb+srv://Abrar:password123abc@usersignup-ewwmc.mongodb.net/userdb?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const user = new UserSchema({
    name: 'his name',
    email: 'yourName@mail.com',
    password: 'mySuperSecretPassword'
});

// user.save();

UserSchema.find({}, (err, docs) => {
    console.log(docs);
});