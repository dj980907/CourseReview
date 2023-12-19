import mongoose from 'mongoose';

mongoose.connect(process.env.DSN);

// my schema goes here!
const ReviewSchema = new mongoose.Schema({
    courseNumber: String,
    courseName: String,
    semester: String,
    year: Number,
    professor: String,
    review: String
});

mongoose.model('Review', ReviewSchema);
