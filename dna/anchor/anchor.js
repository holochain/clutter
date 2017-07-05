function genesis() {
  addAnchor();
  return true;
}

//USED IN GENESIS TO AN THE INITIAL ANCHOR
function addAnchor()
{
  var dna = App.DNA.Hash;
  var anchor_main = {Anchor_Type:"Anchor_Type",Anchor_Text:""}
  var key=commit("anchor",anchor_main);
  commit("directory_links", {Links:[{Base:dna,Link:key,Tag:"Anchor"}]});
  return anchor;
}

//USED TO CREATE A NEW Anchor_Type
function anchor_type_create(anchor_type)
{
  var anchor_main = {Anchor_Type:"Anchor_Type",Anchor_Text:""};
  var anchor_main_hash=makeHash(anchor_main);
  var _anchor_type_="_anchor_type_"+anchor_type;
  var new_anchor= {Anchor_Type:_anchor_type_,Anchor_Text:anchor_type};
  var key=commit("anchor",new_anchor);
  commit("anchor_Links",{Links:[{Base:anchor_main_hash,Link:key,Tag:"Anchor_Type"}]});
}
