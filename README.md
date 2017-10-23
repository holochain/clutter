# Clutter

[![Code Status](https://img.shields.io/badge/Code-Pre--Alpha-orange.svg)](https://github.com/Holochain/clutter#feature-roadmap-and-current-progress)
[![In Progress](https://img.shields.io/waffle/label/Holochain/clutter/in%20progress.svg)](http://waffle.io/Holochain/clutter)
[![Gitter](https://badges.gitter.im/metacurrency/holochain.svg)](https://gitter.im/metacurrency/holochain?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=body_badge)
[![License: GPL v3](https://img.shields.io/badge/License-GPL%20v3-blue.svg)](http://www.gnu.org/licenses/gpl-3.0)

**P2P twitter-clone built on holochain**
A group of cats is called a Clutter, Cludder, Clowder, Kendle, or Kindle. Maybe it's time for a fully distributed shoutcast network of cool cats to eat a certain bluebird.

Clutter is a work in progress, sample application which exists to demonstrate how easy it is to build applications on holochain.


**[Code Status:](https://github.com/metacurrency/holochain/milestones?direction=asc&sort=completeness&state=all)** Pre-alpha. Not for production use. This application has not been audited for any security validation.

## Installation

Prerequiste: [Install holochain](https://github.com/metacurrency/holochain/#installation) on your machine.
You can install clutter very simply with this:

``` shell
hcdev init -cloneExample=clutter

```

## Usage

To do a test run of clutter simply type

``` shell
cd clutter
hcdev web
```
you should see something like:

``` shell
Copying chain to: /home/bootstrap/.holochaindev
...
Serving holochain with DNA hash:QmZYxoxcqgCp6Xf6xVe8ptzPkmH8QMzxqp4r49QYpS2fEF on port:4141
```
Then simply point your browser to http://localhost:4141 access the clutter UI.

### Tests
To run all the stand alone tests:

``` shell
hcdev test
```

Currently there are two scenario tests:

#### followAndShare
``` shell
hcdev scenario followAndShare
```
This test spins up two nodes `jane` and `joe` and tests that following and reading posts works. To watch the network traffic and details try:

``` shell
hcdev -debug scenario followAndShare
```
#### scaling

This test is designed to be run on separate machines and spins up many clones on each and confirms that they all talk to eachother.

## Feature Roadmap and Current Progress
 - [x] Set default handle from AgentID string
 - [x] Enable users to change their handle
 - [x] Share mews (tweets) -- up to 256 characters
 - [x] Follow someone (by specified handle)
 - [x] Unfollow someone
 - [x] View post stream of people you follow sorted by time
 - [x] Detect #hashtags in post text
 - [x] Create hashtag anchors if they don't exist
 - [x] Link from hashtag anchor to posts with that hashtag
 - [x] Show posts which have a particular hashtag
 - [x] Mark posts as a favorite :star:
 - [x] Link favorited posts from a user/handle
 - [ ] Show someone's :star: favorited posts
 - [ ] Edit a previous post **(partially implemented)**
 - [ ] Refollow someone previously unfollowed **(partially implemented - Have to fix put/del/put links sequence)**
 - [ ] Detect @mentions in post text
 - [ ] Link from handle posts which @mention them
 - [ ] Show @mentions for a user/handle
 - [ ] Lists - Special anchor type with text being "*[userhandle]-[listname]*" with links to users on a named list which is named unique-per-user
 - [ ] Reply to mew (add reply-to link + link to replies)
 - [ ] Remew/Retweet (link to original in content of post? + new content?)
 - [ ] Enable direct messages via N2N private messaging
 - [ ] Detect links
 - [ ] Include links (w/ link shortening?) as linked link
 - [ ] Pretty display of OpenGraph data for first link
 - [ ] Create/Read/Update/Delete User profile info (first name, last name, location, picture, website, etc.)
 - [ ] Keyword indexing/search with Holodex integration
 - [ ] Search with result groupings/tabs (people, posts, tags, trending, )
 - [ ] Add UI tabs/views: feed, mentions, direct messages, lists
 - [ ] Embed pictures ("pic" link to url) with pretty render
 - [ ] Integrate with Twitter for publishing mews to tweets from your unique userspace
 - [ ] Integrate with DPKI for bridging app contexts


## Contribute
We welcome pull requests and issue tickets.  Find us on [gitter](https://gitter.im/metacurrency/holochain) to chat.

Contributors to this project are expected to follow our [development protocols & practices](https://github.com/metacurrency/holochain/wiki/Development-Protocols).

## License
[![License: GPL v3](https://img.shields.io/badge/License-GPL%20v3-blue.svg)](http://www.gnu.org/licenses/gpl-3.0)

Copyright (C) 2017, The MetaCurrency Project (Eric Harris-Braun, Arthur Brock, et. al.)

This program is free software: you can redistribute it and/or modify it under the terms of the license provided in the LICENSE file (GPLv3).  This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.

**Note:** We are considering other 'looser' licensing options (like MIT license) but at this stage are using GPL while we're getting the matter sorted out.
