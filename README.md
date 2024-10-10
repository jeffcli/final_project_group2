### Wellness tracker -- A react.js app written by Vivek Jagadeesh, Jeffrey Li, and Carter Moore for CS 4241 A24

Deployment Link - https://finaldeploymentwebware-c99517e0c12a.herokuapp.com/
## Application overview:
Our application allows users to conveniently keep track of their wellness routines. Our app includes the following features:
<br>
1. Users can create habits that they want to build and keep track of how often they are completing those habits. This will allow users to build a routine, and make progress to achieving a consistent set of habits. Users can add, delete, and check off habits on the habits page.
2. Second, wellness tracker allows users to log their mood out of 10 to keep track of their average mood over the last seven days. This will help users log their wellbeing, and identify any causes of stress or mental unwellness.
3. Third, users can suggest and view inspirational quotes suggested by other users on the home page.
4. Additionally, users can maintain a journal to reflect on their lives by submitting and viewing entries on a daily basis. This will allow users to keep track of their daily experiences, and users can edit or delete these entries later.
5. Finally, users can keep track of their friends, and their respective wellbeing via their mood. Users can add other users (these users are fetched from the Auth0 management API) as friends, and create a relationship between friends (ex: roommates, friend, etc.). Friends can be updated and deleted easily as well, allowing users to easily change the people they wish to keep in touch with.

In conclusion, our application enables users to quickly and easily keep track of their wellness, and build positive habits that allow them to enhance their wellbeing.

## Instructions for logging in

Login info -> email= softengd24p@gmail.com password = FinalCS4241

## Technologies used
Language -> TypeScript. We used typescript across the app (including tsx files for react). We found that this made development easier, since we knew what kind of data was being passed around the application.


React -> Our entire UI is written using react.js. React allowed us not only to integrate JavaScript into our UI, but also to use several of its functionalities like useEffect, useContext , and useState. This allowed us to easily pass data around the entire application (this was particularly true of useContext). We also were all very familiar with React.js, so this was an obvious choice.

ShadCn UI -> We used ShadCn UI as our UI library of choice. ShadCn comes with a variety of pre-made components which were easy to integrate into our application, and allowed us to make a reusable, consistent theme across the app.

TailwindCSS -> All of our styling is done using tailwind css. Tailwind makes it very easy to style components, and allows us to create a consistent theme across the app without having to write css ourselves. We also had significant familiarity with tailwinds, which made it easier to develop.

Auth0 -> We used auth0 for our user authentication. Auth0 made it very easy to authenticate users, and retrieve their information using the useAuth0 hook. We also used access tokens to ensure users were logged in before making any api requests.

Express.js -> We used Express to create our backend server, and to serve static files during deployment (more on this later). We used routers to create API posts and get requests, and set up the backend to run on port 3001 during development.

MongoDB and Mongoose -> We used mongodb as our database for the project. We used mongoose because we felt that our data needed a schema (especially since we were using TypeScript). Mongoose allowed us to auto-generate types and models which made using data and collections very easy

Heroku -> We deployed our application to Heroku. While Heroku is not the easiest cloud service provider, it was the only one which allowed us to deploy a backend without too much of a hassle.

## Challenges
Deployment was the most significant challenge we encountered. Finding a service which allows for us to deploy a frontend and backend was very challenging, and configuring the repo for deployment was equally difficult.

Another challenge that we faced was integrating all of our features together. While we worked on our own, at the end, all of our features needed to be included in the final app, and some features made close use of each other.
## Contributions
Vivek
- Repo Setup (FE+BE, auth0, mongo)
- Friends Page
- Heroku deployment

Carter
- Habits Page
- Home/Welcome Page
- Figma UI design mockups

Jeffrey
- Notebook Page
- Figma Mockups
- MongoDB schema designs

Video link here: https://youtu.be/pDTlQYR5Iec