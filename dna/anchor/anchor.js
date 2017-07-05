function genesis() {
  addAnchor();
  return true;
}

//USED IN GENESIS TO AN THE INITIAL ANCHOR

function getMainAchorHash()
{
  var anchorMain = {Anchor_Type:"Anchor_Type",Anchor_Text:""};
  var hashAnchorMain = makeHash(anchorMain);
  return hashAnchorMain;
}
function addAnchor()
{
  var dna = App.DNA.Hash;
  var anchor_main = {Anchor_Type:"Anchor_Type",Anchor_Text:""};
  var key=commit("anchor",anchor_main);
  commit("directory_links", {Links:[{Base:dna,Link:key,Tag:"Anchor"}]});
  return anchor;
}

//USED TO CREATE A NEW Anchor_Type
function anchor_type_create(anchor_type)
{
  var anchor_main_hash=getMainAchorHash();
  var new_anchor= {Anchor_Type:anchor_type,Anchor_Text:""};
  var key=commit("anchor",new_anchor);
  commit("anchor_Links",{Links:[{Base:anchor_main_hash,Link:key,Tag:"Anchor_Type"}]});
}

function anchor_create(anchor_type,anchor_text)
{

}
