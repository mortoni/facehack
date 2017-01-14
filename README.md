# Capstone Project

Capstone Project, Project 5 from Udacity Senior Web Developer Nanodegree. It's a responsive app.  
### Requirement  
> You must create your very own web application that functions just as a native mobile application would, using all that you’ve learned throughout this Nanodegree program.

> Udacity

##[Demo](https://facehack-19ecb.firebaseapp.com/)  
You can see a demo [here](https://facehack-19ecb.firebaseapp.com/).  

### Mobile  
<img src="https://raw.githubusercontent.com/mortoni/facehack/master/app/images/mobile-1.png" width="250" height="500" /> <img src="https://raw.githubusercontent.com/mortoni/facehack/master/app/images/mobile-2.png" width="250" height="500" /> <img src="https://raw.githubusercontent.com/mortoni/facehack/master/app/images/mobile-3.png" width="250" height="500" />

### Desktop  
![image](https://raw.githubusercontent.com/mortoni/facehack/master/app/images/desktop.png)  

##Technologies
[AngularJS](https://angularjs.org/)  
[Firebase](https://www.firebase.com/)  
Web Components  
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

##How Application Works ?
Login in using your facebook account. Look for pages of your interest in Dashboard
 e.g. CNN, Then option for Hack it, then go to the Pool and if the app finds any new content
  it will be show on Contents Pool. Once it appear click add to database.

If you want an offline experience you have to go Settings and tick offline experience.
and type in a code.

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
$ gulp dist:serve
```

##Features  
**Version 1.0.0**  
- First commit
