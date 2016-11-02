# Dashboard

Corporate Dashboard App, Project 4 from Udacity Senior Web Developer Nanodegree. It's a responsive app.  
### Requirement  
> You must develop a corporate dashboard application using a front-end MVC framework of your choosing. The dashboard application must contain a header (with the currently selected dashboard’s name); a menu, allowing the user to navigate between dashboards; and the primary dashboard display area. You should find, or create, your own data files in CSV and JSON formats to provide data to the dashboards. The required dashboards are:
A geospatial view, identifying the number of employees at various company locations.
A “key metrics” view, containing components displaying: the number of open issues, a line chart reflecting number of paying customers over a period of time, and a bar chart reflecting number of reported issues over a period of time.
A “data view” of all issues, with an appearance similar to a spreadsheet, that is sortable and filterable. An issue should contain the following fields:
submission timestamp,
customer name,
customer email address,
description,
open/closed status,
closed timestamp,
employee name  

> Udacity

##[Demo](https://udacityfour.firebaseapp.com/#/app/home)  
You can see a demo [here](https://udacityfour.firebaseapp.com/#/app/home).  

### Mobile  
<img src="https://firebasestorage.googleapis.com/v0/b/udacityfour.appspot.com/o/udacityfour.firebaseapp.com-(iPhone%206).png?alt=media&token=2385b14a-0f38-4ae9-b8aa-07021e74073b" width="250" height="500" /> <img src="https://firebasestorage.googleapis.com/v0/b/udacityfour.appspot.com/o/udacityfour.firebaseapp.com-(iPhone%206)%202.png?alt=media&token=c3b038f1-8adc-450e-941f-8ab4539f9e3a" width="250" height="500" /> <img src="https://firebasestorage.googleapis.com/v0/b/udacityfour.appspot.com/o/udacityfour.firebaseapp.com-(iPhone%206)%20(1).png?alt=media&token=0e814c6b-fe5d-43d9-9f55-706c3546a5ff" width="250" height="500" />

### Desktop  
![image](https://firebasestorage.googleapis.com/v0/b/udacityfour.appspot.com/o/Screen%20Shot%202016-10-31%20at%205.00.18%20pm.png?alt=media&token=a018ad37-ed24-47e7-9b56-47020e96e727)  

##Technologies
[AngularJS](https://angularjs.org/)  
[Firebase](https://www.firebase.com/)  
JavaScript  
HTML5  
CSS3  
Gulp
BootStrap 3
Angular Material  
JQuery  

##Dependencies
- **Node.js**  
You must download and install it [here](https://nodejs.org/en/).  

##Running
Go to root folder of project, open your terminal and then follow steps:  
###Development Server  
- Installing dependencies:
```{r, engine='bash', count_lines}
$ npm install
```

```{r, engine='bash', count_lines}
$ bower install
```
- List Gulp tasks:  
```{r, engine='bash', count_lines}
$ gulp
```

- Running server:  
```{r, engine='bash', count_lines}
$ gulp serve
```
###Distribution Server  
- Generate distribution:  
```{r, engine='bash', count_lines}
$ gulp build
```

- Running distribution server:  
```{r, engine='bash', count_lines}
$ gulp dist:test
```

##Features  
**Version 1.0.0**  
- First commit
