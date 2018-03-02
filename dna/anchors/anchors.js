function anchor(anchor){
  var anchorType = {anchorType: anchor.anchorType, anchorText: ''}
  var rootAnchortype =  {anchorType: 'anchorTypes', anchorText: ''}
  var anchorHash = makeHash('anchor', anchor)
  var anchorGet = get(anchorHash)
  if(anchorGet.message === 'hash not found'){
    var anchorType = {anchorType: anchor.anchorType, anchorText: ''}
    var rootAnchortype =  {anchorType: 'anchorTypes', anchorText: ''}
    var anchorTypeGet = get(makeHash('anchor', anchorType))
    if(anchorTypeGet.message === 'hash not found'){
      var rootAnchorTypeHash = get(makeHash('anchor', rootAnchortype))
      if (rootAnchorTypeHash.message === 'hash not found'){
        rootAnchorTypeHash = commit('anchor', rootAnchortype)
        debug('Root Anchor Type Created: ' + rootAnchorTypeHash)
      }
      var anchorTypeHash = commit('anchor', anchorType)
      debug('Anchor Type Created: ' + anchorTypeHash)
      commit('anchor_link', { Links:[{Base: rootAnchorTypeHash, Link: anchorTypeHash, Tag: anchorType.anchorType}]})
    } else {
      anchorTypeHash = makeHash('anchor', anchorType)
    }
    anchorHash = commit('anchor', anchor)
    debug('Anchor Created ' + anchorHash)
    var links = { Links:[{Base: anchorTypeHash, Link: anchorHash, Tag: anchor.anchorText}]}
    debug(links)
    commit('anchor_link',  links)
  }
  return anchorHash
}

function exists(anchor){
  if(get(makeHash('anchor', anchor)).message === 'hash not found'){
    return false
  }
  return true
}

function anchors(type){
  var links = getLinks(makeHash('anchor', {anchorType: type, anchorText: ''}), '')
  debug(links)
  return links
}

function genesis() {
  return true;
}

function validatePut(entry_type,entry,header,pkg,sources) {
  debug('validatePut')
    return validateCommit(entry_type,entry,header,pkg,sources)
}
function validateCommit(entry_type,entry,header,pkg,sources) {
    // // registrations all must happen on the DNA
    // if (entry_type == 'anchor') {
    //     return true
    // }
    // // registrations all must happen on the DNA
    // if (entry_type == 'anchor_link') {
    //     return true
    // }
    return true
}



function validateLink(linkingEntryType,baseHash,linkHash,pkg,sources){
  return true
}
function validateMod(entry_type,hash,newHash,pkg,sources) {return true;}
function validateDel(entry_type,hash,pkg,sources) {return true;}
function validatePutPkg(entry_type) {
  debug('validatePutPkg')
  return null
}
function validateModPkg(entry_type) { return null}
function validateDelPkg(entry_type) { return null}
function validateLinkPkg(entry_type) { return null}
