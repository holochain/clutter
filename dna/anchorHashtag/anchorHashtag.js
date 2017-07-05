function detectHashtags(postString)
{
  debug("STARING");

  debug("regexp");
  var regexp = /\B\#\w\w+\b/g;
  hashtag = String(postString).match(regexp);
  debug("RETURNING hash tag");
  a=hashtag;
  debug("CHECKING THIS");
  debug(typeof hashtag);
  if (hashtag != null)
  {
    debug("hashtag");
    return hashtag;
  }
  else
  {
    debug("NULL");
    return null;
  }

  return hashtag;
}

function createHashTag(hashtag,post)
{
	var hashtag_hash= commit("hashtag",hashtag);
	var me = getMe();
	var directory = App.DNA.Hash;

	commit("hashtag_links",{Links:[{Base:me,Link:hashtag_hash,Tag:"hashtag"}]});
  commit("hashtagPost_links",{Links:[{Base:hashtag_hash,Link:post,Tag:"post"}]});
	commit("directory_links",{Links:[{Base:directory,Link:hashtag_hash,Tag:"hashtag"}]});

	debug(hashtag+" added with hash : "+hashtag_hash+"======================================");
  return hashtag_hash;
}

function LinkorCreateHT(hashtag,post)
{

	var hash = getHashtag(hashtag);
  var hashtagHash = makeHash(hashtag);
	if(hash == "")
	{
		debug("creating..");
		var createdHT=createHashTag(hashtag,post);
    return createdHT;
	}
	else
	{
		debug("Hashtag Already Exisits !!!!!!!!!!!!!!!!!!!!!!!! Creating link for :"+hashtag);
		commit("hashtagPost_links",{Links:[{Base:hashtagHash,Link:post,Tag:"post"}]});
    gethashtagPosts(hashtagHash);
    return hashtagHash;
  }
}

function gethashtagPosts(hashtagHash)
{
  var me = getMe();

  var HTLink = doGetLinkLoad(me,"hashtag");
  debug("Printing HTLink length : "+HTLink.length);

  for(i=0;i<HTLink.length;i++)
  {
    var ht = HTLink[i];
    debug("Comparing Value with ht hash : "+ht.H+" -> "+hashtagHash);
    if(ht.H == hashtagHash)
    {
      debug("Inside IF....")
      var relatedPosts = doGetLinkLoad(ht.H,"post");
      debug("Related posts of hashtag : "+ht.hashtag+" are : ");
      for(var j=0;j<relatedPosts.length;j++)
      {
        var p = relatedPosts[j];
        debug(p.post);
        //var checkP = get(p.H,{GetMask:HC.GetMask.Entry});
        //debug(property(checkP));
      }
      break;
    }

  }

}
