import mongoose from 'mongoose';

const signupSchema = new mongoose.Schema({
    username: { type: String, required:true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true},
    totalBalance: { type: Number, required: true}
})

const Signup = mongoose.model('Signup', signupSchema);

export default Signup;