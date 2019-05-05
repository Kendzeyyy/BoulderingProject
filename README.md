# BoulderingProject

Bouldering project for Server side scripting frameworks course. 
Idea for this BoulderingProject app is that users can upload pictures
of different routes from bouldering halls. At the moment there are two places
in category which are Kiipeilyareena and Boulderkeskus. Inside these categories
are locations of each bouldering halls. There is a map for the hall and images of it.

---

Tools:
* WebStorm
* Express js
* Node
* Mongodb
* Jelastic

---

### Backend  

The project is using MVC (Model-View-Controller) structure.  
* Model folder contains schemas of the file and users.  
* View folder has a pug jade views which in this project replaced the html.  
* Controller folder contains methods which is used by classes in router (In this case fetching the file json data from MongoDB).  
In addition, there is public folder which contains css, js and uploaded images. In js folder has app.js script which fetch all file json data and place it to the front page and the css is to make project look more prettier. Images are saved in upload folder, but the imageurl and name are saved in MongoDB. There is also a config folder which has authentication and passport for register and login.

---

### List of API

#### Home 

* `'/home' -  GET`               -   home page with all posts  
* `'/upload' -  POST`            -   save image to folder and upload new post  

#### File API

* `'/file/all' -  GET`           -   get posts from mongodb (title, description... )  
* `'/file/add' -  GET`           -   upload page view  
* `'/file/delete/:id' -  GET`    -   delete page view  
* `'/file/edit/:id' -  GET`      -   edit page view  
* `'/file/' -  PUT`              -   for editing posts (req.body.id)  
* `'/file/' -  DELETE`           -   for deleting posts (req.body.id)  

#### User API

* `'/users/login' -  GET`        -   login page view  
* `'/users/login' -  POST`       -   check if user exist and login  
* `'/users/register' -  GET`     -   register page view  
* `'/users/register' -  POST`    -   create user  
* `'/users/logout' -  GET`       -   log out  

#### Location API

* `'/location' -  GET`           -   get all location pugs  

---
