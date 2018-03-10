function anchor(anchor){
  var anchorType = {anchorType: anchor.anchorType, anchorText: ''};
  var rootAnchortype =  {anchorType: 'anchorTypes', anchorText: ''};
  var anchorHash = makeHash('anchor', anchor);
  var anchorGet = get(anchorHash);
  debug('<mermaid>' + App.Agent.String + '->>DHT:Check to see if ' + anchor.anchorText + ' is already taken</mermaid>');
  debug('anchorGet ' + JSON.stringify(anchorGet));
  if(anchorGet === null){
    var anchorType = {anchorType: anchor.anchorType, anchorText: ''};
    var rootAnchortype =  {anchorType: 'anchorTypes', anchorText: ''};
    var anchorTypeGet = get(makeHash('anchor', anchorType));
    debug('anchorTypeGet ' + JSON.stringify(anchorTypeGet));
    debug('<mermaid>' + App.Agent.String + '-->>DHT:Check to see if ' + anchor.anchorType + ' has been setup</mermaid>');
    if(anchorTypeGet === null){
      var rootAnchorTypeHash = get(makeHash('anchor', rootAnchortype));
      debug('<mermaid>' + App.Agent.String + '-->>DHT:Check to see if the Root of all anchors has been setup</mermaid>');
      if (rootAnchorTypeHash === null){
        rootAnchorTypeHash = commit('anchor', rootAnchortype);
        debug('<mermaid>' + App.Agent.String + '->>' + App.Agent.String + ':commit Root of all anchors to local chain</mermaid>');
        debug('<mermaid>' + App.Agent.String + '->>DHT:Publish Root of all anchors</mermaid>');
        // debug('Root Anchor Type Created: ' + rootAnchorTypeHash)
      }
      debug('<mermaid>DHT-->>' + App.Agent.String + ':Return the Root Anchor Type</mermaid>');
      var anchorTypeHash = commit('anchor', anchorType);
      debug('<mermaid>' + App.Agent.String + '->>' + App.Agent.String + ':commit ' + anchor.anchorType + ' to local chain</mermaid>');
      debug('<mermaid>' + App.Agent.String + '->>DHT:Publish ' + anchor.anchorType + '</mermaid>');
      // debug('Anchor Type Created: ' + anchorTypeHash)
      commit('anchor_link', { Links:[{Base: rootAnchorTypeHash, Link: anchorTypeHash, Tag: anchorType.anchorType}]});
      debug('<mermaid>' + App.Agent.String + '->>DHT:Link ' + anchor.anchorType + ' to Root of all anchors</mermaid>');

    } else {
      anchorTypeHash = makeHash('anchor', anchorType);
      debug('<mermaid>DHT-->>' + App.Agent.String + ':Return the anchorType ' + anchor.anchorType + '</mermaid>');
    }
    anchorHash = commit('anchor', anchor);
    debug('<mermaid>' + App.Agent.String + '->>' + App.Agent.String + ':commit ' + anchor.anchorText + ' has been setup</mermaid>');
    debug('<mermaid>' + App.Agent.String + '->>DHT:Publish ' + anchor.anchorText + '</mermaid>');
    // debug('Anchor Created ' + anchorHash)
    commit('anchor_link',  { Links:[{Base: anchorTypeHash, Link: anchorHash, Tag: anchor.anchorText}]});
    debug('<mermaid>' + App.Agent.String + '->>DHT:Link ' + anchor.anchorText + ' to ' + anchorType.anchorType + '</mermaid>');
  }
  debug('<mermaid>DHT-->>' + App.Agent.String + ':Return the anchor for ' + anchor.anchorText + '</mermaid>');
  return anchorHash;
}

function exists(anchor){
  var key = get(makeHash('anchor', anchor));
  debug('<mermaid>' + App.Agent.String + '-->>DHT:Check to see if ' + anchor.anchorText + ' exists</mermaid>');

  debug(key);
  if(key !== null){
    debug('<mermaid>DHT-->>' + App.Agent.String + ':' + anchor.anchorText + ' exists</mermaid>');
    return true;
  }
  debug('<mermaid>DHT-->>' + App.Agent.String + ':' + anchor.anchorText + ' does not exist</mermaid>');
  return false;
}

function anchors(type){
  var links = getLinks(makeHash('anchor', {anchorType: type, anchorText: ''}), '');
  // debug(links)
  return links;
}

function genesis() {
  return true;
}

function validatePut(entry_type,entry,header,pkg,sources) {
  // debug('Anchors validatePut:' + sources)
  return validateCommit(entry_type,entry,header,pkg,sources);
}
function validateCommit(entry_type,entry,header,pkg,sources) {
  // debug('Anchors validatePut:' + sources)
    if (entry_type == 'anchor') {
        return true;
    }
    if (entry_type == 'anchor_link') {
        return true;
    }
    return true;
}



function validateLink(linkingEntryType,baseHash,linkHash,pkg,sources){
  // debug('Anchors validateLink:' + sources)
  return true;
}
function validateMod(entry_type,hash,newHash,pkg,sources){
  // debug('Anchors validateMod:' + sources)
  return true;
}
function validateDel(entry_type,hash,pkg,sources) {
  // debug('Anchors validateDel:' + sources)
  return true;
}
function validatePutPkg(entry_type) {
  // debug('Anchors validatePutPkg')
  return null;
}
function validateModPkg(entry_type) {
  // debug('Anchors validateModPkg')
  return null;
}
function validateDelPkg(entry_type) {
  // debug('Anchors validateDelPkg')
  return null;
}
function validateLinkPkg(entry_type) {
  // debug('Anchors validateLinkPkg')
  return null;
}
