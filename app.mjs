import './config.mjs';
import './db.mjs';
import express from 'express';
import mongoose from 'mongoose';
import url from 'url';
import path from 'path';
import session from 'express-session';

const Review = mongoose.model('Review');

const app = express();

// set up express static
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, 'public')));

// configure templating to hbs
app.set('view engine', 'hbs');

// body parser (req.body)
app.use(express.urlencoded({ extended: false }));

// session middle ware
const sessionOptions = { 
	secret: 'secret for signing session id', 
	saveUninitialized: false, 
	resave: false 
};
app.use(session(sessionOptions));

// Middleware to increment the page visit counter
app.use((req, res, next) => {
  if (!req.session.count) {
    req.session.count = 1;
  } else {
    req.session.count += 1;
  }

  // Make the visit count available to all templates using res.locals
  res.locals.count = req.session.count;
  next();
});


// route handler for home page
app.get('/', async (req, res) => {
  const filter = {}; 

  // Check if query parameters exist and add them to the filter
  if (req.query.semester) {
    filter.semester = req.query.semester;
  }

  if (req.query.year) {
    filter.year = req.query.year;
  }

  if (req.query.professor) {
    filter.professor = req.query.professor;
  }

  try {
    const reviews = await Review.find(filter);
    res.render('reviews', { reviews });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving reviews.');
  }
});

// Show the form for adding a review
app.get('/reviews/add', (req, res) => {
  res.render('add');
});

// middleware for form submission
app.post('/reviews/add', async (req, res) => {
  const { courseNumber, courseName, semester, year, professor, review } = req.body;

  try {
    // Create a new review
    const newReview = new Review({ courseNumber, courseName, semester, year, professor, review });

    await newReview.save();
    
    // Store the review in the session
    if (!req.session.reviews) {
      req.session.reviews = [];
    }

    req.session.reviews.push(newReview);

    // Redirect back to the page that shows all reviews
    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error adding a review.');
  }
});


app.get('/reviews/mine', (req, res) => {
  const myReviews = req.session.reviews || [];

  res.render('myReviews', { myReviews });
});



app.listen(process.env.PORT || 3000);
