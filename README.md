#**TDD project docs**

*tdd_tamplate* is a base rails project with testing framework.
The project is pre-defined with commonly used db tables, & Postgres support.

## Setup

### Renaming the app.
After cloning the project, the app name is 'TddTemplate'.
You should rename it by running `./rename_project NewAppName`.

### Server Setup
#### Ruby
 - Use RMV to install needed ruby version.
 - You migth need to `cd` out & back in to the project folder for chagnes to take affect.

#### Gems
Gems are managed by `bundler`.
 - make sure you have bundler installed. run `gem install bundler`
 - `bundle install` will install gems according to Gemfile.

### Client Setup
Client side modules are managed by `Node`:
 - `npm install` will install node modules & bower components.
 - `npm shrinkwrap` will lock versions.

When chaging
### Running tests
 - Cleint - **karma** will generate automatically after when you run `npm test`.
 - Server -**Rspec** will generate the reports only when you run `COVERAGE=true rspec`.
 - Coverage reports can be found under *coverage/* folder.

run `guard` to start auto watch. you might need to edit Guardfile to fit your unique setup.
every time a watched file is saved, tests will run in the background.
**Guard** will trigger rspec, karma, rubucop, jslint (and more. visit Guardfile for full review).

## Deploying to Heroku
 - create a heroku app.
 - make sure the postgres addon is installed.
 - setup Ruby build pack by running `heroku buildpacks:set heroku/ruby`
 - setup NodeJS build pack by running `heroku buildpacks:add --index 1 heroku/nodejs`
 - deploy by running `git push <Heroku Git Reop> master`
