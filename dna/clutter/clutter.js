var FIRST_NAME = 'firstName';
var FAVOURITES = 'favourites';
var PROFILE_PIC = 'profilePic';

function getProperty(name) {
  // The definition of the function you intend to expose
  return property(name); // Retrieves a property of the holochain from the DNA (e.g., Name, Language
}

/**
 * @param fave is the hash to add to favourites
 * @return current array of favourites or null if input is invalid
 **/
function addFavourite(fave) {
  var links;

  // validates if fave is a hash
  if (!RegExp(/Qm[a-zA-Z0-9]*/).test(fave)) {
    return null;
  }
  try {
    links = getLinks(App.Agent.Hash, FAVOURITES, { Load: true });
  } catch (exception) {
    debug('Error getting favourite links when adding: ' + exception);
  }
  try {
    var faveHash;
    var faves = getFavourites();

    // add a random value to the array to maintain uniqueness
    // for the purposes of using update
    faves[0] = 'abc' + Math.random(); //makeHash(FAVOURITES, Math.random());
    faves.push(fave);

    // if the link doesn't exist, create it:
    if (!links || links.length < 1) {
      faveHash = commit(FAVOURITES, faves);
      commit('profile_links', {
        Links: [{ Base: App.Agent.Hash, Link: faveHash, Tag: FAVOURITES }]
      });
      // not great...remove 1st element here to remove unique value
      faves.splice(0, 1);
    } else {
      faves = updateFavourite(faves);
    }
  } catch (exception) {
    debug('Error committing faves: ' + exception);
  }
  return faves;
}

/**
 * @param none
 * @returns an array of favourites
 **/
function getFavourites() {
  var links;
  var faves = [];
  try {
    links = getLinks(App.Agent.Hash, FAVOURITES, { Load: true });
    if (links && links.length > 0) {
      faves = links[links.length - 1].Entry;
    }
  } catch (exception) {
    debug('Error getting favourite link: ' + exception);
  }
  return faves;
}

/**
 * @param fave to remove
 * @returns the list of favourites
 **/
function removeFavourite(fave) {
  var faves = getFavourites();
  var faveIndex = faves.indexOf(fave);

  if (faveIndex < 0) {
    faves.splice(0, 1);
    return faves;
  }
  try {
    var removed = faves.splice(faveIndex, 1);
    faves = updateFavourite(faves);
  } catch (exception) {
    debug('Error removing from favourites: ' + exception);
  }
  return faves;
}

/**
 * Helper function to update the fave array and the associated links:
 * @param faves is the array of favourites we want stored
 * @return updated array of faves
 **/
function updateFavourite(faves) {
  try {
    var links = getLinks(App.Agent.Hash, FAVOURITES, { Load: true });
    var oldHash = links[links.length - 1].Hash;
    var faveHash = update(FAVOURITES, faves, oldHash);

    commit('profile_links', {
      Links: [
        {
          Base: App.Agent.Hash,
          Link: oldHash,
          Tag: FAVOURITES,
          LinkAction: HC.LinkAction.Del
        }
      ]
    });

    commit('profile_links', {
      Links: [
        {
          Base: App.Agent.Hash,
          Link: faveHash,
          Tag: FAVOURITES
        }
      ]
    });
  } catch (exception) {
    debug('Error updating favourites: ' + exception);
  }
  faves.splice(0, 1);
  return faves;
}

/*
 * @param data is a string representing a 64-bit encoded image
 * @return data which is a 64-bit encoded image
 **/
function setProfilePic(data) {
  return setProfileProp(data, PROFILE_PIC);
}

/**
 * @param data is a string representing a firstName
 * @return data which is firstName
 **/
function setFirstName(data) {
  return setProfileProp(data, FIRST_NAME);
}

/**
 * @param data is a string representing a profile data field
 * @param tag is the tag used to store the profile data
 * @return data which is a profile data field
 **/
function setProfileProp(data, tag) {
  var profilePropHash;
  var links;
  try {
    // Check if profile pic has been set and update if so.
    links = getLinks(App.Agent.Hash, tag, { Load: true });
  } catch (exception) {
    return 'Error getting links: ' + exception;
  }
  try {
    if (links && links.length > 0) {
      profilePropHash = update(tag, data, links[0].Hash);

      // Delete the old hash, so we only ever have one record
      commit('profile_links', {
        Links: [
          {
            Base: App.Agent.Hash,
            Link: links[0].Hash,
            Tag: tag,
            LinkAction: HC.LinkAction.Del
          }
        ]
      });
    } else {
      // Otherwise add it for the first time:
      profilePropHash = commit(tag, data);
    }
    // On the DHT, put a link from my hash to the hash of firstName
    commit('profile_links', {
      Links: [{ Base: App.Agent.Hash, Link: profilePropHash, Tag: tag }]
    });
  } catch (exception) {
    return 'Error updating or committing: ' + exception;
  }
  return data;
}

/**
 * @param none
 * @return profilePic associated with this user
 **/
function getProfilePic() {
  return getProfileProp(PROFILE_PIC);
}

/**
 * @param tag associated with the property we want to retrieve
 * @return profileProp associated with the tag and current user
 **/
function getProfileProp(tag) {
  var links;
  try {
    links = getLinks(App.Agent.Hash, tag, { Load: true });

    if (links.length < 1) {
      return '';
    }
  } catch (exception) {
    return 'Error (getting firstName): ' + exception;
  }
  return links[0].Entry;
}

/**
 * @param none
 * @return firstName associated with this user
 **/
function getFirstName() {
  return getProfileProp(FIRST_NAME);
}

function appProperty(name) {
  // The definition of the function you intend to expose
  if (name == 'Agent_Handle') {
    debug('Agent_Handle');
    debug(getHandle(App.Key.Hash));
    return getHandle(App.Key.Hash);
  }
  if (name == 'App_Agent_String') {
    return App.Agent.String;
  }
  if (name == 'App_Key_Hash') {
    return App.Key.Hash;
  }
  if (name == 'App_DNA_Hash') {
    return App.DNA.Hash;
  }
  return 'Error: No App Property with name: ' + name;
}

function useHandle(handle) {
  debug(
    '<mermaid>' +
      App.Agent.String +
      '-->>DHT:Check to see if ' +
      App.Agent.String +
      ' has any exisitng handles</mermaid>'
  );
  var handles = getLinks(App.Key.Hash, 'handle');
  debug(
    '<mermaid>DHT->>' +
      App.Agent.String +
      ':returned ' +
      handles.length +
      ' existing handles for ' +
      App.Agent.String +
      '</mermaid>'
  );
  if (handles.length > 0) {
    if (anchorExists('handle', handle) === 'false') {
      var oldKey = handles[0].Hash;
      var key = update('handle', anchor('handle', handle), oldKey);
      debug(
        '<mermaid>' +
          App.Agent.String +
          '->>' +
          App.Agent.String +
          ':' +
          App.Agent.String +
          ' has a handle so update it</mermaid>'
      );
      commit('handle_links', {
        Links: [
          {
            Base: App.Key.Hash,
            Link: oldKey,
            Tag: 'handle',
            LinkAction: HC.LinkAction.Del
          },
          { Base: App.Key.Hash, Link: key, Tag: 'handle' }
        ]
      });
      debug(
        '<mermaid>' +
          App.Agent.String +
          '->>DHT:Update link to ' +
          handle +
          ' in "handle_links"</mermaid>'
      );
      commit('directory_links', {
        Links: [
          {
            Base: App.DNA.Hash,
            Link: oldKey,
            Tag: 'handle',
            LinkAction: HC.LinkAction.Del
          },
          { Base: App.DNA.Hash, Link: key, Tag: 'handle' }
        ]
      });
      debug(
        '<mermaid>' +
          App.Agent.String +
          '->>DHT:Update link to ' +
          handle +
          ' in "directory_links"</mermaid>'
      );
      return key;
    } else {
      // debug('HandleInUse')
      return 'HandleInUse';
    }
  }
  if (anchorExists('handle', handle) === 'false') {
    var useHandleKey = commit('handle', anchor('handle', handle));
    debug(
      '<mermaid>' +
        App.Agent.String +
        '->>' +
        App.Agent.String +
        ':commit new handle' +
        handle +
        '</mermaid>'
    );
    debug(
      '<mermaid>' + App.Agent.String + '->>DHT:Publish ' + handle + '</mermaid>'
    );
    commit('handle_links', {
      Links: [{ Base: App.Key.Hash, Link: useHandleKey, Tag: 'handle' }]
    });
    debug(
      '<mermaid>' +
        App.Agent.String +
        '->>DHT:Link ' +
        useHandleKey +
        ' to "handle_links"</mermaid>'
    );
    commit('directory_links', {
      Links: [{ Base: App.DNA.Hash, Link: useHandleKey, Tag: 'directory' }]
    });
    debug(
      '<mermaid>' +
        App.Agent.String +
        '->>DHT:Link ' +
        handle +
        ' to "directory_links"</mermaid>'
    );
    return useHandleKey;
  } else if (getAgent(handle) === App.Key.Hash) {
    // Logged out user is requesting old handle
    useHandleKey = makeHash('handle', anchor('handle', handle));
    debug(
      '<mermaid>' +
      App.Agent.String +
      '->>' +
      App.Agent.String +
      ':restore handle ' +
      handle +
      '</mermaid>'
    );
    debug(
      '</mermaid>' +
      App.Agent.String +
      '->>DHT:Publish ' +
      handle +
      '</mermaid>'
    );
    commit('handle_links', {
      Links: [
        {
          Base: App.Key.Hash,
          Link: useHandleKey,
          Tag: 'handle'
        }
      ]
    });
    debug(
      '<mermaid>' +
      '->>DHT:Link ' +
      useHandleKey +
      ' to "handle_links"</mermaid>'
    );
    return useHandleKey;
  } else {
    // debug('HandleInUse')
    return 'HandleInUse';
  }
}

// returns the handle of an agent by looking it up on the user's DHT entry, the last handle will be the current one?
function getHandle(agentKey) {
  var links = getLinks(agentKey, 'handle', { Load: true });
  // debug(links);
  if (links.length > 0) {
    var anchorHash = links[0].Entry.replace(/"/g, '');
    return get(anchorHash).anchorText;
  } else {
    return '';
  }
}

function logOut() {
  var handles = getLinks(App.Key.Hash, 'handle');
  if (handles.length > 0) {
    var handleKey = handles[0].Hash;
    debug(
      '<mermaid>' +
      App.Agent.String +
      '->>' +
      App.Agent.String +
      ':logout from handle' +
      '</mermaid>'
    );
    commit('handle_links', {
      Links: [
        {
          Base: App.Key.Hash,
          Link: handleKey,
          Tag: 'handle',
          LinkAction: HC.LinkAction.Del
        }
      ]
    });
    return 'LoggedOut';
  } else {
    return '';
  }
}

function getAgent(handle) {
  if (anchorExists('handle', handle) === 'false') {
    return '';
  } else {
    return get(anchor('handle', handle), { GetMask: HC.GetMask.Sources })[0];
  }
}

function getHandles() {
  // debug('get the handles');
  if (property('enableDirectoryAccess') != 'true') {
    return undefined;
  }

  var links = getLinks(App.DNA.Hash, 'directory', { Load: true });
  // debug(links);
  var handles = [];
  for (var i = 0; i < links.length; i++) {
    var handleHash = links[i].Source;
    var handle = get(links[i].Entry).anchorText;
    debug(handle + 'handle');
    handles.push({ handleHash: handleHash, handle: handle });
  }
  return handles;
}

function follow(handle) {
  // Expects a handle of the person you want to follow
  // Commits a new follow entry to my source chain
  // On the DHT, puts a link on their hash to my hash as a "follower"
  // On the DHT, puts a link on my hash to their hash as a "following"
  debug('Follow ' + handle);
  var anchorHash = anchor('handle', handle);
  debug(
    '<mermaid>' +
      App.Agent.String +
      '->>DHT:Link ' +
      handleHash() +
      ' to follow ' +
      anchorHash +
      '</mermaid>'
  );
  return commit('follow', {
    Links: [
      { Base: anchorHash, Link: handleHash(), Tag: 'followers' },
      { Base: handleHash(), Link: anchorHash, Tag: 'following' }
    ]
  });
}

// get a list of all the people from the DHT a user is following or follows
function getFollow(params) {
  var type = params.type;
  var base = anchor('handle', params.from);
  // var  base = makeHash('handle', params.from);
  debug('params.from ' + params.from + ' hash=' + JSON.stringify(base));
  var handles = [];
  if (type == 'followers' || type == 'following') {
    handleLinks = getLinks(base, type);
    for (var i = 0; i < handleLinks.length; i++) {
      handles.push(get(handleLinks[i].Hash).anchorText);
    }
  }
  return handles;
}

function post(post) {
  var key = commit('post', post); // Commits the post block to my source chain, assigns resulting hash to 'key'

  debug(
    '<mermaid>' +
      App.Agent.String +
      '->>' +
      App.Agent.String +
      ':commit new meow</mermaid>'
  );
  debug('<mermaid>' + App.Agent.String + '->>DHT:Publish new meow</mermaid>');

  // On the DHT, puts a link on my anchor to the new post
  commit('post_links', {
    Links: [{ Base: handleHash(), Link: key, Tag: 'post' }]
  });
  debug(
    '<mermaid>' +
      App.Agent.String +
      '->>DHT:Link meow to "post_links"</mermaid>'
  );

  // get any hashtags in the post message
  var hashtags = getHashtags(post.message);
  debug(hashtags);

  // create an anchor of type hashtag for each tag present
  // link from the the anchor to the post
  hashtags.forEach(function(hashtag) {
    var anchorHash = anchor('hashtag', hashtag);
    commit('post_links', {
      Links: [{ Base: anchorHash, Link: key, Tag: 'post' }]
    });
  });

  //debug(key);
  return key; // Returns the hash key of the new post to the calling function
}

function postMod(params) {
  // debug(params.post);
  var key = update('post', params.post, params.hash);
  // commit('post_links',
  //   {Links:[
  //      {Base: App.Key.Hash, Link: oldKey, Tag: 'handle', LinkAction: HC.LinkAction.Del},
  //      {Base: App.Key.Hash, Link: key, Tag: 'handle'}
  //   ]})
  return key;
}

// TODO add "last 10" or "since timestamp" when query info is supported
function getPostsBy(handles) {
  debug(handles);
  // From the DHT, gets all "post" metadata entries linked from this userAddress
  var posts = [];
  for (var i = 0; i < handles.length; i++) {
    var author = anchor('handle', handles[i]);
    var authorPosts = doGetLinkLoad(author, 'post');
    // add in the author
    for (var j = 0; j < authorPosts.length; j++) {
      var post = authorPosts[j];
      post.author = handles[i];
      posts.push(post);
    }
  }
  return posts;
}

function getPostsWithHashtag(input) {
  var hashtag = input;
  var targets = getLinks(anchor('hashtag', '#' + hashtag), 'post');

  var posts = [];
  targets.forEach(function(target) {
    posts.push(getPost({ postHash: target.Hash }));
  });

  return posts;
}

function getPost(params) {
  var post,
    rawPost = get(params.postHash, { GetMask: HC.GetMask.All });
  if (rawPost === null) {
    return null;
  } else {
    post = {
      post: rawPost.Entry,
      author: getHandle(rawPost.Sources[0]),
      H: params.postHash
    };
    return post;
  }
}

// helper function to do getLinks call, handle the no-link error case, and copy the returned entry values into a nicer array
function doGetLinkLoad(base, tag) {
  // get the tag from the base in the DHT
  var links = getLinks(base, tag, { Load: true });
  var links_filled = [];
  for (var i = 0; i < links.length; i++) {
    var link = { H: links[i].Hash };
    link[tag] = links[i].Entry;
    links_filled.push(link);
  }
  return links_filled;
}

// helper function to call getLinks, handle the no links entry error, and build a simpler links array.
function doGetLink(base, tag) {
  // get the tag from the base in the DHT
  var links = getLinks(base, tag, { Load: false });
  // debug("Links:"+JSON.stringify(links));
  var links_filled = [];
  for (var i = 0; i < links.length; i++) {
    links_filled.push(links[i].Hash);
  }
  return links_filled;
}

// returns a list of unique hashtags in the message string
function getHashtags(message) {
  var tags = message.match(/\B#\w*[a-zA-Z]+\w*/g);
  if (tags) {
    var uniqueTags = tags.filter(function(value, index, self) {
      return self.indexOf(value) === index;
    }); //remove duplicates
    return uniqueTags;
  } else {
    return [];
  }
}

function anchor(anchorType, anchorText) {
  return call('anchors', 'anchor', {
    anchorType: anchorType,
    anchorText: anchorText
  }).replace(/"/g, '');
}

function handleHash(appKeyHash) {
  // debug('appKeyHash ' + appKeyHash)
  if (appKeyHash === undefined) {
    appKeyHash = App.Key.Hash;
  }
  return getLinks(appKeyHash, 'handle', { Load: true })[0].Entry.replace(
    /"/g,
    ''
  );
}

function anchorExists(anchorType, anchorText) {
  return call('anchors', 'exists', {
    anchorType: anchorType,
    anchorText: anchorText
  });
}

// GENESIS - Called only when your source chain is generated:'hc gen chain <name>'
// ===============================================================================
function genesis() {
  // 'hc gen chain' calls the genesis function in every zome file for the app

  return true;
}

// ===============================================================================
//   VALIDATION functions for *EVERY* change made to DHT entry -
//     Every DHT node uses their own copy of these functions to validate
//     any and all changes requested before accepting. put / mod / del & metas
// ===============================================================================

function validateCommit(entry_type, entry, header, pkg, sources) {
  // debug("Clutter validate commit: "+ JSON.stringify(pkg));
  return validate(entry_type, entry, header, sources);
}

function validatePut(entry_type, entry, header, pkg, sources) {
  // debug("Clutter validate put: "+ JSON.stringify(pkg));
  return validate(entry_type, entry, header, sources);
}

function validate(entry_type, entry, header, sources) {
  if (entry_type == 'post') {
    var l = entry.message.length;
    if (l > 0 && l < 256) {
      return true;
    }
    return false;
  }
  if (entry_type == 'handle') {
    return true;
  }
  if (entry_type == 'follow') {
    return true;
  }
  return true;
}

// Are there types of tags that you need special permission to add links?
// Examples:
//   - Only Bob should be able to make Bob a "follower" of Alice
//   - Only Bob should be able to list Alice in his people he is "following"
function validateLink(linkEntryType, baseHash, links, pkg, sources) {
  // debug("Clutter validate link: " + sources);
  // if (linkEntryType=="handle_links") {
  //     var length = links.length;
  //     // a valid handle is when:
  //
  //     // there should just be one or two links only
  //     if (length==2) {
  //         // if this is a modify it will have two links the first of which
  //         // will be the del and the second the new link.
  //         if (links[0].LinkAction != HC.LinkAction.Del) return false;
  //         if (links[1].LinkAction != HC.LinkAction.Add) return false;
  //     } else if (length==1) {
  //         // if this is a new handle, there will just be one Add link
  //         if (links[0].LinkAction != HC.LinkAction.Add) return false;
  //     } else {return false;}
  //
  //     for (var i=0;i<length;i++) {
  //         var link = links[i];
  //         // the base must be this base
  //         if (link.Base != baseHash) return false;
  //         // the base must be the source
  //         if (link.Base != sources[0]) return false;
  //         // The tag name should be "handle"
  //         if (link.Tag != "handle") return false;
  //         //TODO check something about the link, i.e. get it and check it's type?
  //     }
  //     return true;
  // }
  return true;
}
function validateMod(entry_type, entry, header, replaces, pkg, sources) {
  // debug("Clutter validate mod: "+entry_type+" header:"+JSON.stringify(header)+" replaces:"+JSON.stringify(replaces));
  if (entry_type == 'handle') {
    // check that the source is the same as the creator
    // TODO we could also check that the previous link in the type-chain is the replaces hash.
    var orig_sources = get(replaces, { GetMask: HC.GetMask.Sources });
    if (
      isErr(orig_sources) ||
      orig_sources == undefined ||
      orig_sources.length != 1 ||
      orig_sources[0] != sources[0]
    ) {
      return false;
    }
  } else if (entry_type == 'post') {
    // there must actually be a message
    if (entry.message == '') return false;
    var orig = get(replaces, {
      GetMask: HC.GetMask.Sources + HC.GetMask.Entry
    });

    // check that source is same as creator
    if (orig.Sources.length != 1 || orig.Sources[0] != sources[0]) {
      return false;
    }

    var orig_message = orig.Entry.message;
    // message must actually be different
    return orig_message != entry.message;
  }
  return true;
}
function validateDel(entry_type, hash, pkg, sources) {
  // debug('Clutter validateDel:' + sources)
  return true;
}
function validatePutPkg(entry_type) {
  debug('Clutter validatePutPkg: ' + App.Agent.String);
  var req = {};
  req[HC.PkgReq.Chain] = HC.PkgReq.ChainOpt.Full;
  return req;
}
function validateModPkg(entry_type) {
  // debug('Clutter validateModPkg')
  return null;
}
function validateDelPkg(entry_type) {
  // debug('Clutter validateDelPkg')
  return null;
}
function validateLinkPkg(entry_type) {
  // debug('Clutter validateLinkPkg')
  return null;
}
