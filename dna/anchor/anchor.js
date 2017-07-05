function genesis() {
  addAnchor();
  return true;
}

//USED IN GENESIS TO AN THE INITIAL ANCHOR
function addAnchor()
{
  var dna = App.DNA.Hash;
  var anchor_main = {Anchor_Type:"Anchor_Type",Anchor_Text:""};
  var key=commit("anchor",anchor_main);
  commit("directory_links", {Links:[{Base:dna,Link:key,Tag:"Anchor"}]});
  return anchor;
}
//Can be used to retrive the hash of the main anchor
function getMainAchorHash()
{
  var anchorMain = {Anchor_Type:"Anchor_Type",Anchor_Text:""};
  var hashAnchorMain = makeHash(anchorMain);
  return hashAnchorMain;
}

//USED TO CREATE A NEW Anchor_Type
function anchor_type_create(anchor_type)
{
  var anchor_main_hash=getMainAchorHash();
  var new_anchorType= {Anchor_Type:anchor_type,Anchor_Text:""};
  var key=commit("anchor",new_anchorType);
  commit("anchor_links",{Links:[{Base:anchor_main_hash,Link:key,Tag:"Anchor_Type"}]});
}

//List all the anchor types linked to from "AnchorType" created in genesis
function anchor_type_list(anchor_type)
{
  var anchor_type_list=[];
  anchor_main_hash=getMainAchorHash();
  var anchor_type=doGetLinkLoad(anchor_main_hash,"");

  for(var j=0;j<anchor_type.length;j++){
    anchor_type_list=push(anchor_type[j]);
  }
return anchor_type_list;
}

function anchor_create(anchor_type,anchor_text)
{

}


/*****
Methords used to get whatever is needed
*****/
function doGetLinkLoad(base, tag) {
    // get the tag from the base in the DHT
    var links = getLink(base, tag,{Load:true});
    if (isErr(links)) {
      debug("isErr");
        links = [];
    } else {

       links = links.Links;
    }
    var links_filled = [];
    for (var i=0;i <links.length;i++) {
        var link = {H:links[i].H};
        link[tag] = links[i].E;
        links_filled.push(link);
    }
    debug("Links Filled:"+JSON.stringify(links_filled));
    return links_filled;
}
function isErr(result) {
    return ((typeof result === 'object') && result.name == "HolochainError");
}
