# Anonymous Course Reviews
![Screen Recording 2023-12-18 at 10 40 44 PM (2)](https://github.com/dj980907/CourseReview/assets/108609222/4ce1ccf5-f90c-449e-af46-825181b83e46)

## Description

This is a site where users can anonymously post reviews for courses. 
I used mongoose to read in all of the reviews from the database. Then, display the reviews in a table.
I added a form to my page that allows users to filter the table by semester, year, and professor's name via GET and query string parameters.
I also created another page that contains a form to add new reviews. The form POSTs data… and then redirect back to /
This website keeps track of the number of times a user has visited any page on the site using express-session
