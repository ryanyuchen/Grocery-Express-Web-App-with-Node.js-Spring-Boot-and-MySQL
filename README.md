# CS6310 Group 6 Summer 2022

This repository contains a Java application for grocery express service. It contains a Java backend service that uses [Spring Boot](https://spring.io/projects/spring-boot) and [MySQL](https://https://www.mysql.com/) as our web service framework, and an [Next.js](https://nextjs.org/) web server that serves our html file.

## Required Dependencies 
Frontend:
* Install [Node.js](https://nodejs.org/en/)
* If you are windows user, you may need to add `'C:\Program Files\nodejs'` to your PATH environment variable
* To install libraries, run `npm install` in director `'/grocery-express'` <br>

Backend:
* Download the backend docker file at https://hub.docker.com/repository/docker/mdltshw/cs6310
OR install a Java Compiler (Java 1.8.0_291)
* If you have many different java version in your machine, you need to move Java 1.8.0_291 to the top of PATH environment variable.
* You can check it by run `java -version` in command window and it return `java version "1.9.0_291"`
* The backend spring boot is initialized using [spring initializr](https://start.spring.io/) with `Jave 8` and `Spring Boot 2.6.10`
* `Maven`: This project uses [Apache Maven](https://maven.apache.org/) to manage itself. 
You will see the dependencies defined in `'/pom.xml'`, and the maven commands called by the backend's Dockerfile
* Install `Lombok`: setting -> plug-in -> install Lombok
* 

## Quickstart
* Unzip `source_code.zip`
* You may need to delete `.idea` folder if you experience error when opening with IntelliJ and then restart InitelliJ
* Import `'/mysql-init-files/cs6310_summer_group6-demo.sql'` into MySQL
* Update your username and password of MySQL in `'/src/main/resources/application.properties'`
* Run `GroceryExpress.java` to start backend service
* Run `npm run dev` in `'/grocery-express'` to start frontend web page
* Open `http://localhost:3000` in your web browser

## Frontend
The front end service calls our backend service and displays the query results. Our `Next.js` service is deployed on port 3000
You should be able to navigate to [http://localhost:3000](http://localhost:3000) to view the page

## Backend
Our backend contains the database for grocery express application and it is connected to [Spring Boot](https://spring.io/projects/spring-boot) framework.
You can navigate to [http://localhost:9090](http://localhost:9090) to view the returned JSON object

## Database
The database is `MySQL 8.0`. 




