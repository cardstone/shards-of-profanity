# Shards of Profanity

### The Idea
A web replica of the popular party game, [Cards Against Humanity](https://cardsagainsthumanity.com/)

### The Features
* private game sessions
* built in chat
* custom cards

### The Tech Stack
* Node.js as the underlying framework
* Express.js for back-end server
* Socket.io for peer-to-peer chat and communications
* Angular.js for front-end MVC JS framework
* MongoDB for the back-end database
* Git for version control
* Amazon Web Services for server hosting & management

### Languages
* Javascript
* HTML
* CSS

### The Team
* [Anthony Maldarelli](https://github.com/amaldare93)
* [Andrew Miloslavsky](https://github.com/andrewmilo)
* [Alvin Zablan](https://github.com/azablan)
* [Jesse Mcready](https://github.com/jessemcready)

### Project Structure
```
.
├── app                       # server-side javascvript
│   ├── models                  # data models
│   └── routes.js               # Express routes
├── cards                     # card txt files
├── config                    # config files
├── dist                      # final site files (built by gulp)
├── node_modules              # npm dependencies (build by npm install)
├── public                    # front-end code for site
│   ├── css                     # sass files
│   │   ├── 1-plugins             # folder for 3rd party plugins
│   │   ├── 2-base                # folder for site-wide styles
|   |   ├── 3-sections            # folder for styling sections / modules
|   |   └── main.sass             # imports all other sass files
|   ├── images                  # images (duh)
|   ├── js                      # front-end javascript
|   |   ├── controllers           # Angular controllers (functions)
|   |   ├── directives            # Angular directives (custom html elements)
|   |   ├── services              # Angular services (accessing servers / DB / APIs)
|   |   ├── app.js                # initializes Angular app
|   |   └── appRoutes.js          # Angular routes
|   ├── views                   # Angular views (html templates)
|   └── index.html              # root of website
├── gulpfile.js               # gulp build tasks
├── package.json              # lists all npm dependencies
├── README.md                 # you are here
└── server.js                 # initializes Express server
```

### Getting Started
To start working from this repository, first make sure you have installed
* [Node.js](https://nodejs.org/en/)
* [MongoDB](https://www.mongodb.org/downloads)

then

```sh
# FIRST TIME
# Clone Github Repository:
$ git clone https://github.com/cardstone/shards-of-profanity.git

# Switch into directory
$ cd shards-of-profanity

# Install npm modules
$ npm install

# Setup mongo directory and run mongo process
$ mkdir -p /data/db
$ mongod

# Load cards into mongoDB using script
$ cd scripts
$ node load_cards.js ../data/black/output.txt black vanilla
$ node load_cards.js ../data/white/output.txt white vanilla

# Run Gulp to build files and start up a quick server
$ gulp
```
