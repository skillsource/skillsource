# skillsource
The goal of this application is to allow users to create courses containing steps necessary to create a skill.  Users have access to joining courses and following the steps set out by the creator in order to learn the skill.

# Tech Stack
###### Frontend Framework: React.js
###### Middleware for handling routing: Express.js
###### Backend server: Node.js
###### Database: MySQL
###### Database ORM: Sequelize

# Features implemented
###### Create new user & logging in & logging out
###### Authentication of components to only users who are logged in
###### Dashboard contains 3 tabs for viewing courses by: Courses Completed, Courses Enrolled, Courses Created
###### JWT Implementation for authentication in front end client and back end server
###### Restricted & unrestricted routes
###### Create new course
###### Create steps associated with a course
###### Course has a progress meter
###### Course tracks when user has completed all steps
###### Course has ability to embed YouTube videos and display screenshot of website (URL)
###### User has ability to rate course
###### Course rating displays & has aggregate of all users' ratings
###### Comment section for a course
###### User has ability add comment if they are logged in
###### Entity relationships handled with Sequelize


# Setup Dev Environment
```
npm install
npm start
```

# Database Setup
In one tab, ensure mysql is running by entering:
```
mysql.server start
```

If you are interested in accessing your database, enter:
```
mysql -u root -p
```

No password is required.  Double hit enter key to enter mysql

# NPM

`npm start` runs `webpack --watch` and `nodemon server/index.js` concurrently

You can visit the site at `localhost:3000`

