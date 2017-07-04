function genesis() {
  addAnchor();
  return true;
}
function addAnchor()
{
  var dna = App.DNA.Hash;
  var anchor = (Anchor_Type:"Anchor_Type",Anchor_Text:"")
  var key=commit("anchor",anchor);
  commit("directory_links", {Links:[{Base:dna,Link:key,Tag:"Anchor"}]});
  return anchor;
}
