# Project Three

Project Three is an Exercise Prescription Website. Here providers can prescribe
tailored exercises for their clients, using videos and instructional guides.
Originally designed to be utilized by physical therapists, it can be also fill
the needs of personal trainers, yoga instructors, martial arts teachers, and
more!

# Wiki

This README covers installation and basic usage of the site. For further
information, please refer to
[backend-pt](https://github.com/AFresnedo/backend-pt/wiki).

## Installation

Create a local folder with this repo with cmd ($ signifies terminal cmd):

```
$ git clone git@github.com:AFresnedo/backend-pt.git
```

This back end requires [NodeJS](https://nodejs.org/en/download/)
to run. After installation, you may install prerquisite modules.

To install prerequisites, navigate to the top folder in the repo and type:

```
$ npm install
```

This app uses MongoDB for the database. Refer to
[MongoDB's installation instructions](https://docs.mongodb.com/manual/installation/)
if you do not have it already installed.

You will need to create a .env file, at the top level, with the following:

```
JWT_SECRET='set_your_secret_key_here_developer'
MONGODB_URI='your_mongodb_database_name_for_this_app_here_developer'
PORT=set_your_preferred_port_number_here_developer
```

> JWT_SECRET should be a strong and unique password of your choosing.
> <br />
> Please give the name of the database you wish to use by entering it in
> MONGODB_URI.
> <br />
> If you leave PORT empty it will use the default value of 3000.

## Basic Usage

## Credits

Developed by [Andres](#), [Jon](#), and [Justin](#).
