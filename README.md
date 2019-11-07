# KatchUp - An event organising/booking application

## Introduction

KatchUp is an event notification application built based on Client-Server architecture. Users make use of a mobile application to get notified about the events happening around or host an event by themselves and to post it on the KatchUp platform to let the users know about the event. On the server side we have a Node server running to handle the client requests and responding to each of these requests by fetching corresponding data from the database system.

We have divided the system into three parts front-end, back-end and database system. Below we see the technologies used for each part of the system.

![image](https://user-images.githubusercontent.com/49751425/68389195-ac751b00-0162-11ea-9aab-18fa34a612c2.png)

Entire project is built as a three-layered client-server application consisting of 
1.	Presentation layer
2.	Business layer
3.	Data layer
### Presentation Layer
Presentation layer is consisting of a Mobile application and a Web application. These applications are on the client side.

Mobile application - is designed for customers to view the events or post the events on the platform. This application runs on Android mobile platform for now.
<Content can be used from Dhirain’s document>

Web application - is designed for admins/agents at KatchUp to review the user posted events for its authenticity and take actions on it so that it appears to all the users using the mobile app.

Web application is developed completely in ReactJs. ReactJs being famous among developers, provides faster rendering, stable application on the browser. Web application is having two components each for login and validation module. Admins can log in to the application and view the events that are to be validated. Admin should look at all the data posted by the host for its authenticity and take action on it.

Below are the screens for web applications
1.	Log in screen : Admins use their credentials to log in to the application

  ![image](https://user-images.githubusercontent.com/49751425/68389329-f958f180-0162-11ea-998b-2bca506b9ac8.png)
			    Figure 1 : Log in screen on web application
		
2.	Validation screen: Logged in admins see the below screen where they have to take actions on the posted events.
 
  ![image](https://user-images.githubusercontent.com/49751425/68389356-0970d100-0163-11ea-830c-c4d29a245bfc.png)
 
			Figure 2: Validation screen on web application


Steps to run the web application
1.	Make sure server and database is up and running
2.	Open the source code using Visual studio code 
3.	Open the terminal in VS Code and type ‘npm install’ to get the node modules installed
4.	Type the command ‘node start’ to open the web application in the browser

### Business Layer
Under business layer all the back-end services are implemented. All the services are hosted as Restful APIs. This is the Server-side system.
Business layer is developed using NodeJs along with npm and node express for Http services. NodeJs is a powerful JavaScript framework built on Google Chrome’s JavaScript V8 Engine. NodeJs makes the system light weight and makes it faster, reliable and scalable.
npm
npm (Node Package Manager) is a package manager for the JavaScript programming language. It is the default package manager for the JavaScript runtime environment Node.js. It consists of a command line client, also called npm, and an online database of public and paid-for private packages, called the npm registry. The registry is accessed via the client, and the available packages can be browsed and searched via the npm website. The package manager and the registry are managed by npm, Inc.

Node Express
Express is the most popular Node web framework. It provides mechanism to write handlers with different HTTP verbs at different URL routes. It allows us to set common web application settings like the port to use for connecting, and the location of templates that are used for rendering the response. Also, we can easily add additional request processing "middleware" at any point within the request handling pipeline.
All Restful APIs are hosted at a particular URL and are exposed to the clients for their use. Clients request the server for data at a specific URL. Server upon request from the client make connection with database to fetch and send it back to the client. Server makes contact with the database by using ‘pg-promise’ middleware of node. This uses the connection string of the database server in order to fetch the data.

Steps to run the server
1.	Make sure you have pg admin 3 and create database server at a port and run the script file(KatchUpScript.txt) present the source code folder. This will ensure all the database tables and functions are created.
2.	Install Node from the official node website.
3.	Open the source code using VS Code editor.
4.	Open the terminal and run ‘npm install’ to get the node modules installed.
5.	Navigate to Source code -> Katchup -> Source -> BusinessLogic folder in the terminal
6.	Run ‘node app.js’ command and wait for the server to come up
7.	‘Server listening at port: 3005’ message appears and that ensures our server is up and running.

## Client-Server Architecture

Figure below shows the architectural diagram of the system.

![image](https://user-images.githubusercontent.com/49751425/68389555-88660980-0163-11ea-9f59-9f920b7948dc.png)
                        Figure 3: System architecture
			      (Source : https://msdn.microsoft.com/en-us/magazine/jj991974.aspx)
            
 As seen figure 3, Client can be a mobile application or a web application. They will be interested in certain data and hence they make communication with the web server using http requests. Requests can be GET, POST, PUT or DELETE. Upon receiving the client request, server will try to contact the database through several queries for requested data. The database responds to the server request by providing the data rows. Web server performs some logic on the data received from the database and converts it into the JSON format and sends it back as response to the http requests of the clients. Thus, a complete workflow is established through http call. Numbering done (1-4) in the figure 3 shows the flow of requests throughout the system.
 
 
### APIs defined on the server
1.API for Login – POST api
URL	<Base URL>+ “/login”
Sample Input	{"userid" : "1", "password" : "password1"}
Sample Response	{"email":"user1@gmail.com", "pincode":"47475", "name":"user1","user_id":1,"message":"User logged in!!"}

2.API for Signup– POST api
URL	<Base URL>+ "/signup"
Sample Input	{"name" : "user3", "password" : "password3", "pinCode":"47475", "contactNumber":"948075", "email": "user3@gmail.com"}

Sample Response	{"email":"user36@gmail.com", "pincode":"47475", "name":"user36","user_id":59,"message":"User Signed up..."}

		
3. API for Getting pincodes – GET api
URL	<Base URL>+ "/getpincode"
Sample Input	NA 

Sample Response	{"pincodes":["47475","47178","33102","40210","44135","45127","48143","50667"]}

4.API for Posting an event– POST api
URL	<Base URL>+ "/postevent"
Sample Input	{"eventname" : "holiparty", "eventdescription" : "Celebrating holi festival", "date":"2019-05-28", "time":"18:00:00", "eventtype":"normal", "eventcategory":"party", "cost":"5", "userid":"1", "totalseats":"80", "pincode":"47475", "premiumtype":"1"}
Sample Response	{"userid":"1","message":"Data posted for evaluation.."}

5.API for Updating event status after admin validation– POST api
URL	<Base URL>+ "/updateventstatus"
Sample Input	{"eventid" : "3", "status": "1"}
Sample Response	{“message” : “Success”}

6.API for Get all events for validation for admin – GET api
URL	<Base URL>+ "/getalleventsforadmin"
Sample Input	NA
Sample Response	[{"event_id":5,"address":null,"pincode":"47475","event_type":"normal","event_category":"party","date_of_event":"2019-10-30T23:00:00.000Z", "time_of_the_event": "18:00:00", cost_of_ticket":"$5.00","user_id":1,"total_seats":80, "status_id":0, "premium_type":"1",  "event_name":"diwali party","event_description":"Celebrating diwali festival"}]

7.API for Register for an event – POST api
URL	<Base URL>+ "/registerevent"
Sample Input	{"eventid" : "3", "userid" : "6" , "seats": "1"}
Sample Response	[{"booking_id":57,"email":"user2@gmail.com"}]

8.API to get details of an event – POST api
URL	<Base URL>+ "/getevent"
Sample Input	{"eventid" : "3"}
Sample Response	[{"event_id":3,"address":null,"pincode":"47475","event_type":"normal","event_category":"party","date_of_event":"2019-05-27T22:00:00.000Z",
"time_of_the_event":"18:00:00","cost_of_ticket":"$5.00","user_id":1,"total_seats":"80","status_id":1,"premium_type":"1","event_name":"holiparty", "event_description":"Celebrating holi festival"}]

9.API to get all events for a user – POST api
URL	<Base URL>+ "/getallevents"
Sample Input	{"userid" : "1", "pincode" : "47475"}
Sample Response	[{"event_name":"holiparty","pincode":"47475","event_type":"normal","event_category":"party","date_of_event":"2019-05-27T22:00:00.000Z"}, {"event_name":"holiparty","pincode":"47475","event_type":"normal","event_category":"party","date_of_event":"2019-05-27T22:00:00.000Z"}]


				




