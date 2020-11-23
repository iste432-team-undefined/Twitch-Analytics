# Twitch Analytics
Class project that utilizes the [Twitch API](https://dev.twitch.tv/docs/api) to provide users statistics on various streamers and categories

## To Run:
* Machine must have a postgres server running
* Log into the server and create a database named "twitch"
* Open a console inside the project directory and run the sql script named "twitch_analytic_postgres.sql" in the "twitch" database.  Example of how to do this from a commandline: "psql -U postgres -d twitch -a -f twitch_analytic_postgres.sql"
* Run "npm i" in the project directory to install the required modules for the project.
* Run "node ." in the project directory to start the application on "localhost:3000/".
* Log in as username: "test" password: "test"

* If the program fails, one place to check is the top of the "db.js" file where the "Pool" object is created. Check to make sure the user, host, database, password, and port for this object are accurate with your install of postgres.
* Try running "node ." in the project directory again.

## TODO
* Implement test classes using [MochaJS](https://mochajs.org/)
* Continue working on final code to be delivered