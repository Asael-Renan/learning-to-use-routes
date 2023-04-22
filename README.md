# how to run this project
1. Create a `.env` file at the root of the project and add the following variables:

-For the DB_NAME variable, write the name of your database.

-For the DB_USER variable, write the name of your database user.

-For the DB_PASSWORD variable, write the password of your database.

```env
DB_NAME=yourDatabaseName
DB_USER=root
DB_PASSWORD=1234
```

2. In the first line of the `app.js` file found in the `public/js/app.js` folder, change the value of the url variable to the `url` of your server. Example: http://localhost:3000


```js
const url = "PUT YOUR URL HERE"
```

3. Run the project.
```
npm start
```
