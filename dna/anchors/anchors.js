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
  var key = get(makeHash('anchor', anchor))
  debug('exists: ' + key)
  if(key.message === 'hash not found'){
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
  debug('validatePut:' + sources)
  return validateCommit(entry_type,entry,header,pkg,sources)
}
function validateCommit(entry_type,entry,header,pkg,sources) {
  debug('validatePut:' + sources)
    if (entry_type == 'anchor') {
        return true
    }
    if (entry_type == 'anchor_link') {
        return true
    }
    return true
}



function validateLink(linkingEntryType,baseHash,linkHash,pkg,sources){
  debug('validateLink:' + sources)
  return true
}
function validateMod(entry_type,hash,newHash,pkg,sources){
  debug('validateMod:' + sources)
  return true
}
function validateDel(entry_type,hash,pkg,sources) {
  debug('validateDel:' + sources)
  return true
}
function validatePutPkg(entry_type) {
  debug('validatePutPkg')
  return null
}
function validateModPkg(entry_type) {
  debug('validateModPkg')
  return null
}
function validateDelPkg(entry_type) {
  debug('validateDelPkg')
  return null
}
function validateLinkPkg(entry_type) {
  debug('validateLinkPkg')
  return null
}
