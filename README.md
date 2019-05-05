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
