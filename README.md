# Clutter - P2P twitter-clone built on holochain

A group of cats is called a Clutter, Cludder, Clowder, Kendle, or Kindle. Maybe it's time for a fully distributed shoutcast network of cool cats to eat a certain bluebird.

Clutter is a work in progress, sample application which exists to demonstrate how easy it is to build applications on holochain.

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
