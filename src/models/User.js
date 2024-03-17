import {Schema, model} from 'mongoose';


const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    username: {
        type: String,
        required: [true, 'Username is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    address: {
        street: { type: String },
        suite: { type: String },
        city: { type: String },
        zipcode: { type: String },
        geo: {
            lat: { type: String },
            lng: { type: String }
        }
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required']
    },
    website: {
        type: String,
        required: [true, 'Website is required']
    },
    company: {
        name: { type: String },
        catchPhrase: { type: String },
        bs: { type: String }
    }
}, {
    timestamps: true
});

const User = model('User', userSchema);

export default User;