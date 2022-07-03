<h1>Greetings</h1>

<h3>This is the repository for the CRUD application that is built using the MERN stack </h3>

This simple CRUD app was made using MongoDB, Express JS, React JS and Node js together known as the MERN stack.
Only JavaScript is used to make this crud application.

After `git clone`-ing this repository,

```powershell
cd client/
npm install

cd server/
npm install
```

This installs the required dependencies of this project.

The MongoDB database is hosted on MongoDB cloud of my personal account. For you to check and run the database commands, make a .env file in the server folder and type 
```env
DATABASE_URL = mongodb://localhost/<database_name>
```
The database name for my project is 'crud' but you can set it to anything you want. The collection that will be created would be named as 'users' from the file in models folder because the collection name becomes the name of the file name. 

<h4>Note that this is a fully responsive website and it can be viewed on your phone or tablet as well</h4>

I have modified some of the bootstrap classes for this website to be fully responsive. Instead of using create-react-app, I have used vite - a JavaScript framework for front-end applications. 

### In vite.config.js, the settings to the backend are configured as proxy with `/api` with `http://localhost:5000/`. This is to know for the front-end app that it has a backend server connected or vite does not really recognizes the server. 


You can make your own changes by forking this repository into your own or cloning it into your own local computer. For contributions make a seperate branch and make changes to the code.

## Thank you
