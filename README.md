## Demostration <ADD URL>
picture of LI/FB/TW post
<p align="center">
  <img src="<url here>" >
</p>

## Description <ADD URL>
ImPostr is your one stop shop social media platform content manager. Connect your Facebook, LinkedIn, and Twitter accounts, enter topics that your are interested in, and sit back and relax. We will go find popular and relevant content and post them on your wall. Build personal brand, get a following, and drive engagemnt with your profiles. Networking for a software job? Ramp up your posts on different technologies on your LinkedIn account. Trying to be more active socially? Post some NFL acticles or cat photos! For a more hands on approach, your can create custom posts, cancel generated posts, and view all of your activity across all platforms in one place.

[Live demo the app here](<url to aws docker container>)

<p align="center">
  <img src="<url of screenshot entering settings>">
</p>

## Table of Contents

1. [Usage](#usage)
1. [Screenshots](#screenshots)
1. [Getting Started](#getting-started)
    1. [Prerequisites](#prerequisites)
    1. [Installing Dependencies](#installing-dependencies)
1. [Understanding the Code Base](#understanding-the-code-base)
    1. [File Structure](#file-structure)
    1. [Where to Begin](#where-to-begin)
1. [The Tech Stack](#tech-stack)
1. [Core Team](#core-team)
1. [Contributing](#contributing)
1. [Licensing](#license)

## Usage

1. Go to site url and signup with a username and password
1. Select and authenticate platforms you would like to connect (Facebook, Twitter, and/or LinkedIn)
1. For each platform, select posting preferences by entering your interests, autopost, and interval
1. Sit back and relax! If you want a more hands on experience, you can schedule custom posts, manage your automatically generated post queue, and view your activity

## Screenshots <CHANGE URLS AND ADD IMAGES>
<p align="center">
  <img src="<URL HERE>">
</p>

## Getting Started

### Prerequisites <ENTER INSTRUCTIONS FOR SETTING UP EACH PLATFORM, RENAMES __CUTESTUFF.JS>

Install [Node](https://nodejs.org/en/) and [PostgreSQL](https://www.postgresql.org/download/) in your development environment.

You'll also need to set up Facebook, LinkedIn, and Twitter App keys in order to develop for ImPostr:

In your root directory, create file named '__cutestuff.js' and add and export the following parameters obtained from the instructions: DB_ENDPOINT, DB_SECRET, DB_USER, FACEBOOK_APP_ID, FACEBOOK_APP_SECRET, LINKEDIN_KEY, LINKEDIN_SECRET, STATELINKEDIN, TWITTER_CONSUMER_KEY, TWITTER_CONSUMER_SECRET

Finally, set up your Sublime Text with the ESLinter using Package Install.
[Use this guide](https://medium.com/@dan_abramov/lint-like-it-s-2015-6987d44c5b48#.ne1ikvdg9) to set up your Sublime for linting.

Everything else will be included inside NPM install.

### Installing Dependencies <EDIT>

From within the root directory:

```sh
npm i
```

### Running The App <DOCKER INSTRUCTIONS>

Start your instance of PostgreSQL

Run this script to start webpack -w and to start (w/ nodemon) server/server.js

```sh
npm run dev
```

<URL TO START PAGE>

## Understanding the Code Base

### File Structure <COPY PASTE FINAL FILE STRUCTURE>

```sh
<HERE>
```

### Where to Begin

#### Front-End

#### Server-side

#### Database Design

<p align="center">
  <img src="https://s16.postimg.org/cdxbzc4md/Screen_Shot_2016_08_22_at_11_55_15_AM.png">
</p>

## Testing

Current testing coverage is <ENTER A PERCETAGE>

From the root directory, run the following script

```sh
npm test
```

Tools user for testing:
- Mocha
- Chai
- Sinion
- Chai-As-Promised
<ENTER MORE HERE>

## Tech Stack

- Node
- Express
- PostgreSQL
- Sequelize
- Webpack
- React, Redux, React Dom
- Eslint
- Babel

## Core Team

  - [Justin Ross](https://github.com/JustinTRoss)
  - [Steven Chung](https://github.com/StevenChung)
  - [Matt Dubie](https://github.com/mdubie)

## Contributing

1. Fork the repo.
1. Clone it to your local computer
1. Cut a namespaced feature branch from master and name it appropriately
1. Make commits and prefix each commit with the type of work you were doing
1. Before you push, rebase upstream changes into your branch, fix any potential conflicts, and then push to your fork.
1. Submit a pull request directly to the master from your feature branch
1. Someone else will perform code review to keep codebase clean
1. Fix any errors or issues raised by the reviewer and push the fixes as a single new commit
1. Repeat until the pull request is merged.

See [CONTRIBUTING.md](_CONTRIBUTING.md) for contribution guidelines in detail.

## License

M.I.T
