
function getProperty(name) {            // The definition of the function you intend to expose
    return property(name);              // Retrieves a property of the holochain from the DNA (e.g., Name, Language
}
function appProperty(name) {            // The definition of the function you intend to expose
    if (name == "App_Agent_Hash") {return App.Agent.Hash;}
    if (name == "App_Agent_String")  {return App.Agent.String;}
    if (name == "App_Key_Hash")   {return   App.Key.Hash;}
    if (name == "App_DNA_Hash")   {return   App.DNA.Hash;}
    return "Error: No App Property with name: " + name;
}

function newHandle(handle){
  var handles = getLinks(App.Key.Hash, 'handle')
  debug(handles)
  if (handles.length > 0) {
    var oldKey = handles[0]
    var key = update('handle', anchor('handle', handle), oldKey)
    commit('handle_links',
      {Links:[
         {Base: App.Key.Hash, Link: oldKey, Tag: 'handle', LinkAction: HC.LinkAction.Del},
         {Base: App.Key.Hash, Link: key, Tag: 'handle'}
      ]})
    commit('directory_links',
      {Links:[
         {Base: App.DNA.Hash, Link: oldKey, Tag: 'handle', LinkAction: HC.LinkAction.Del},
         {Base: App.DNA.Hash, Link: key, Tag: 'handle'}
      ]})
    return key
  }
  debug('anchor exists ' + anchorExists('handle', handle))
  if(anchorExists('handle', handle) === 'false'){
    var newHandleKey = commit('handle', anchor('handle', handle))
    commit('handle_links', {Links: [{Base: App.Key.Hash, Link: newHandleKey, Tag: 'handle'}]})
    commit('directory_links', {Links: [{Base: App.DNA.Hash, Link: newHandleKey, Tag: 'directory'}]})
    return newHandleKey
  } else {
    debug('HandleInUse')
    return 'HandleInUse'
  }
}

// returns the handle of an agent by looking it up on the user's DHT entry, the last handle will be the current one?
function getHandle(userHash) {
    var anchorHash = getLinks(userHash, 'handle', {Load: true})[0].Entry.replace(/"/g, '')
    return get(anchorHash).anchorText
}

function getAgent(handle) {
  if(anchorExists('handle', handle) === 'false'){
    return ""
  } else {
    return get(anchor('handle', handle), {GetMask: HC.GetMask.Sources})[0]
  }
}

function getHandles() {
    if (property("enableDirectoryAccess") != "true") {
        return undefined;
    }
    var links = getLinks(App.DNA.Hash, "directory",{Load:true});
    if (isErr(links)) {
        links = [];
    } else {
        links = links;
    }
    var handles = {};
    for (var i=0;i <links.length;i++) {
        handles[links[i].Source] = links[i].Entry;
    }
    return handles;
}

function follow(userAddress) {
  // Expects a userAddress hash of the person you want to follow


   // Commits a new follow entry to my source chain
   // On the DHT, puts a link on their hash to my hash as a "follower"
   // On the DHT, puts a link on my hash to their hash as a "following"
    return commit("follow",
                  {Links:[
                      {Base:userAddress,Link:anchorHash(),Tag:"followers"},
                      {Base:anchorHash(),Link:userAddress,Tag:"following"}
                  ]});
}

// get a list of all the people from the DHT a user is following or follows
function getFollow(params) {
    var type = params.type;
    var  base = params.from;
    var result = {};
    if ((type == "followers") || (type == "following")) {
        result["result"] = doGetLink(base,type);
    }
    else {
        result["error"] = "bad type: "+type;
    }
    return result;
}

function post(post) {
    var key = commit('post', post);        // Commits the post block to my source chain, assigns resulting hash to 'key'
    debug(anchorHash())
    // On the DHT, puts a link on my anchor to the new post
    commit("post_links",{Links:[{Base: anchorHash(), Link: key, Tag: "post"}]})
    debug(key);
    return key;                                  // Returns the hash key of the new post to the calling function
}

function postMod(params) {
    var key = update('post', params.post, params.hash)
    // commit('post_links',
    //   {Links:[
    //      {Base: App.Key.Hash, Link: oldKey, Tag: 'handle', LinkAction: HC.LinkAction.Del},
    //      {Base: App.Key.Hash, Link: key, Tag: 'handle'}
    //   ]})
    return key
}

// TODO add "last 10" or "since timestamp" when query info is supported
function getPostsBy(userAddresses) {
    // From the DHT, gets all "post" metadata entries linked from this userAddress
    var posts = [];
    for (var i=0;i<userAddresses.length;i++) {
        var author = userAddresses[i];
        var authorPosts = doGetLinkLoad(author,"post");
        // add in the author
        for(var j=0;j<authorPosts.length;j++) {
            var post = authorPosts[j];
            post.author = author;
            posts.push(post);
        }
    }
    return posts;
}

function getPost(params) {
  var post, rawPost = get(params.postHash,{GetMask:HC.GetMask.All});
  if (isErr(rawPost)) {
    return rawPost;
  } else {
    post = {
      post: rawPost.Entry,
      author: rawPost.Sources[0],
      H: params.postHash
    };
    return post;
  }
}

// helper function to do getLinks call, handle the no-link error case, and copy the returned entry values into a nicer array
function doGetLinkLoad(base, tag) {
    // get the tag from the base in the DHT
    var links = getLinks(base, tag,{Load:true});
    if (isErr(links)) {
        links = [];
    } else {
        links = links;
    }
    var links_filled = [];
    for (var i=0;i <links.length;i++) {
        var link = {H:links[i].Hash};
        link[tag] = links[i].Entry;
        links_filled.push(link);
    }
    return links_filled;
}

// helper function to call getLinks, handle the no links entry error, and build a simpler links array.
function doGetLink(base,tag) {
    // get the tag from the base in the DHT
    var links = getLinks(base, tag,{Load:false});
    if (isErr(links)) {
        links = [];
    }
     else {
        links = links;
    }
    debug("Links:"+JSON.stringify(links));
    var links_filled = [];
    for (var i=0;i <links.length;i++) {
        links_filled.push(links[i].Hash);
    }
    return links_filled;
}

function anchor(anchorType, anchorText){
  return call('anchors', 'anchor', {anchorType: anchorType, anchorText: anchorText}).replace(/"/g, '')
}

function anchorHash(){
  return getLinks(App.Key.Hash, 'handle', {Load: true})[0].Entry.replace(/"/g, '')
}

function anchorExists(anchorType, anchorText){
  return call('anchors', 'exists', {anchorType: anchorType, anchorText: anchorText})
}

// GENESIS - Called only when your source chain is generated:'hc gen chain <name>'
// ===============================================================================
function genesis() {                            // 'hc gen chain' calls the genesis function in every zome file for the app
    return true;
}

// ===============================================================================
//   VALIDATION functions for *EVERY* change made to DHT entry -
//     Every DHT node uses their own copy of these functions to validate
//     any and all changes requested before accepting. put / mod / del & metas
// ===============================================================================

function validateCommit(entry_type,entry,header,pkg,sources) {
    debug("Clutter validate commit: "+entry_type);
    return validate(entry_type,entry,header,sources);
}

function validatePut(entry_type,entry,header,pkg,sources) {
    debug("Clutter validate put: "+entry_type);
    return validate(entry_type,entry,header,sources);
}

function validate(entry_type,entry,header,sources) {
    if (entry_type=="post") {
        var l = entry.message.length;
        if (l>0 && l<256) {return true;}
        return false;
    }
    if (entry_type=="handle") {
        return true;
    }
    if (entry_type=="follow") {
        return true;
    }
    return true;
}

// Are there types of tags that you need special permission to add links?
// Examples:
//   - Only Bob should be able to make Bob a "follower" of Alice
//   - Only Bob should be able to list Alice in his people he is "following"
function validateLink(linkEntryType,baseHash,links,pkg,sources){
   debug("Clutter validate link: " + sources);
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
function validateMod(entry_type,entry,header,replaces,pkg,sources) {
    debug("Clutter validate mod: "+entry_type+" header:"+JSON.stringify(header)+" replaces:"+JSON.stringify(replaces));
    if (entry_type == "handle") {
        // check that the source is the same as the creator
        // TODO we could also check that the previous link in the type-chain is the replaces hash.
        var orig_sources = get(replaces,{GetMask:HC.GetMask.Sources});
        if (isErr(orig_sources) || orig_sources == undefined || orig_sources.length !=1 || orig_sources[0] != sources[0]) {return false;}

    } else if (entry_type == "post") {
        // there must actually be a message
        if (entry.message == "") return false;
        var orig = get(replaces,{GetMask:HC.GetMask.Sources+HC.GetMask.Entry});

        // check that source is same as creator
        if (orig.Sources.length !=1 || orig.Sources[0] != sources[0]) {return false;}

        var orig_message = orig.Entry.message;
        // message must actually be different
        return orig_message != entry.message;
    }
    return true;
}
function validateDel(entry_type,hash,pkg,sources) {
  debug('Clutter validateDel:' + sources)
  return true
}
function validatePutPkg(entry_type) {
  debug('Clutter validatePutPkg')
  return null
}
function validateModPkg(entry_type) {
  debug('Clutter validateModPkg')
  return null
}
function validateDelPkg(entry_type) {
  debug('Clutter validateDelPkg')
  return null
}
function validateLinkPkg(entry_type) {
  debug('Clutter validateLinkPkg')
  return null
}
