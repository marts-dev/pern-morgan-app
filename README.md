# Covid Situation Tracker

This application is for my technical exam implemented using PERN stack.

## Getting Started

### Requirements

- [PostgreSQL 12](https://www.postgresql.org/docs/12/index.html)
- [NodeJS and NPM](https://nodejs.org/en/download/)
- [Git clone of this app](https://github.com/marts-dev/pern-morgan-app)

## Running the App Locally

After accomplishing the requirements above, proceed with the following steps:

1.  Change your working directory into the project folder

    `cd pern-morgan-app`

2.  Install the required modules of the server

    `npm install`

3.  Install the required modules of the client

    `cd client && npm install`

    > You may do steps 2 and 3 in a separate terminal

4.  While waiting for the modules to be installed, you may proceed to preparing your database

    1. In the main directory of the project(e.g. pern-morgan-app), create a file named **.env** with the following contents:

    > PG_USER=[postgres username]<br>
    > PG_PASSWORD=[postgres password]<br>
    > PG_HOST=localhost<br>
    > PG_PORT=5432<br>
    > PG_DATABASE=[database name]

    > **Note:** Replace the **[info]** with the appropriate value

5.  When the above steps are completed, you may run the application

    #### For the server

    1. Open a terminal, then go to main directory of the project

       `cd pern-morgan-app`

    2. Execute the following command

       `npm start`

    3. If everything is ok, you should see the following output

       `Server started at port 5000`

    #### For the client

    1. Open a terminal, then go to client directory of the project

       `cd pern-morgan-app/client`

    2. Execute the following command

       `npm start`

    3. You should see something simillar to the following:

       > You can now view client in the browser.<br>
       > Local: http://localhost:3000<br>
       > On Your Network: http://172.17.49.33:3000<br>
       > Note that the development build is not optimized.
       > To create a production build, use yarn build.

## Using the application

Upon going to the link above, you will see the following:
![Covid Tracker App](/assets/startpage.png)

To start the application, press the start button.
You will then see the following:

![Covid Tracker App Search Box](/assets/searchpage.png)

You may then input the search queries and submit it to get the results.

![Covid Tracker App Result View](/assets/resultview.png)

## Deployed Version

You may also try the deployed version.
[Heroku App: Covid Tracker](https://pern-morgan-app.herokuapp.com/)
