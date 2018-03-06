function anchor(anchor){
  var anchorType = {anchorType: anchor.anchorType, anchorText: ''}
  var rootAnchortype =  {anchorType: 'anchorTypes', anchorText: ''}
  var anchorHash = makeHash('anchor', anchor)
  var anchorGet = get(anchorHash)
  debug('anchorGet ' + anchorGet)
  if(anchorGet.anchorType === undefined){
    var anchorType = {anchorType: anchor.anchorType, anchorText: ''}
    var rootAnchortype =  {anchorType: 'anchorTypes', anchorText: ''}
    var anchorTypeGet = get(makeHash('anchor', anchorType))
    if(anchorTypeGet.anchorType === undefined){
      var rootAnchorTypeHash = get(makeHash('anchor', rootAnchortype))
      if (rootAnchorTypeHash.anchorType === undefined){
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
  debug(key)
  if(key.anchorType !== undefined){
    return true
  }
  return false
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
  debug('Anchors validatePut:' + sources)
  return validateCommit(entry_type,entry,header,pkg,sources)
}
function validateCommit(entry_type,entry,header,pkg,sources) {
  debug('Anchors validatePut:' + sources)
    if (entry_type == 'anchor') {
        return true
    }
    if (entry_type == 'anchor_link') {
        return true
    }
    return true
}



function validateLink(linkingEntryType,baseHash,linkHash,pkg,sources){
  debug('Anchors validateLink:' + sources)
  return true
}
function validateMod(entry_type,hash,newHash,pkg,sources){
  debug('Anchors validateMod:' + sources)
  return true
}
function validateDel(entry_type,hash,pkg,sources) {
  debug('Anchors validateDel:' + sources)
  return true
}
function validatePutPkg(entry_type) {
  debug('Anchors validatePutPkg')
  return null
}
function validateModPkg(entry_type) {
  debug('Anchors validateModPkg')
  return null
}
function validateDelPkg(entry_type) {
  debug('Anchors validateDelPkg')
  return null
}
function validateLinkPkg(entry_type) {
  debug('Anchors validateLinkPkg')
  return null
}
