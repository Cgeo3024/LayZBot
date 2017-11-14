# Project Title

LayZBot is a discord bot which provides tools for running an online game of Dungeons and Dragons. It is built to use a mongoDB database hosted on MLab, and be itself hosted on Heroku. It is possible to host the bot wherever you wish, but the database connections are specific to MongoDB. Using a different databse type requires replacing the lookups.js file.

Not included in this uploaded is a .env file containing login information for discord and mLab. You will be required to include this file to run your own copy of LayZBot.

### Prerequisites

This project runs on node.js.
Please check the package.json for version details.

THe Minimal requirements for running this project are as follows:
```
    node
    discord.io
    mongojs
```

Additional packages have been included and are needed to compile, but can be removed without impacting the programs function. They are:

```
chai
mocha
winston
ws
```

### Functions