# Anonymous Course Reviews

<img width="1440" alt="Screen Shot 2023-12-18 at 10 49 23 PM" src="https://github.com/dj980907/CourseReview/assets/108609222/3650db99-2932-4c92-b187-ce8d9741d903">

## Description

- This is a site where users can anonymously post reviews for courses. 
- I used mongoose to read in all of the reviews from the database. Then, display the reviews in a table.
- I added a form to my page that allows users to filter the table by semester, year, and professor's name via GET and query string parameters.
- I also created another page that contains a form to add new reviews. The form POSTs data… and then redirect back to /
- This website keeps track of the number of times a user has visited any page on the site using express-session
