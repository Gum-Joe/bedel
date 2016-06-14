![Logo](client/assets/img/Bedel_Logo_1.png)
# Bedel [![Build Status](https://travis-ci.org/Gum-Joe/bedel.svg?branch=master)](https://travis-ci.org/Gum-Joe/bedel) [![Coverage Status](https://coveralls.io/repos/github/Gum-Joe/bedel/badge.svg?branch=master)](https://coveralls.io/github/Gum-Joe/bedel?branch=master) [![Code Climate](https://codeclimate.com/github/Gum-Joe/bedel/badges/gpa.svg)](https://codeclimate.com/github/Gum-Joe/bedel)
Build, ship and manage apps, all from one dashboard.

# Getting started
### Before you get started, check you have the following:
- `node.js >= 6.0.0`
- `mongodb >= 2.0.0`

### As we are yet to tag our first release, clone this repo and run:
```bash
cd path/to/bedel
npm install
```
###### To start bedel:
```bash
bin/bedel
```
***Note:*** *You may need to add a username and password manually to you mongodb in the 'bedel' database. Please use [bcryptjs](https://github.com/dcodeIO/bcrypt.js) to hash the password with a salt factor of 10.*

# Tests
```bash
npm test
```
