
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

function anchor(anchorType, anchorText){
  return call('anchors', 'anchor', {anchorType: anchorType, anchorText: anchorText})
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
    debug("validate commit: "+entry_type);
    return validate(entry_type,entry,header,sources);
}

function validatePut(entry_type,entry,header,pkg,sources) {
    debug("validate put: "+entry_type);
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
   debug("validate link: " + linkEntryType);
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
    debug("validate mod: "+entry_type+" header:"+JSON.stringify(header)+" replaces:"+JSON.stringify(replaces));
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
    debug("validate del: "+entry_type);
    return true;
}

// ===============================================================================
//   PACKAGING functions for *EVERY* validation call for DHT entry
//     What data needs to be sent for each above validation function?
//     Default: send and sign the chain entry that matches requested HASH
// ===============================================================================

function validatePutPkg(entry_type) {return null;}
function validateModPkg(entry_type) { return null;}
function validateDelPkg(entry_type) { return null;}
function validateLinkPkg(entry_type) { return null;}
