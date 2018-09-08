//https://developer.twitter.com/en/docs/api-reference-index AAAAHAHAHAHAHAH
//https://developer.twitter.com/en/docs/tweets/search/api-reference/get-search-tweets
//https://developer.twitter.com/en/docs/tweets/data-dictionary/overview/tweet-object
//https://developer.twitter.com/en/docs/tweets/post-and-engage/api-reference/post-statuses-retweet-id
//https://www.npmjs.com/package/node-twitterbot <<do I need this package? figure it out later loolololloolololpoasfokasfoksadofkasdkfadkjfgnkjNKJA 
//https://www.npmjs.com/package/twit-old



/*//////////////////////Special thanks to - Dylan Ogle (Volunteer)/////////////////////////////////////
 █████╗ ████████╗██╗  ██╗███████╗███╗   ██╗███████╗     ██████╗ ███╗   ██╗██╗     ██╗███╗   ██╗███████╗
██╔══██╗╚══██╔══╝██║  ██║██╔════╝████╗  ██║██╔════╝    ██╔═══██╗████╗  ██║██║     ██║████╗  ██║██╔════╝
███████║   ██║   ███████║█████╗  ██╔██╗ ██║███████╗    ██║   ██║██╔██╗ ██║██║     ██║██╔██╗ ██║█████╗  
██╔══██║   ██║   ██╔══██║██╔══╝  ██║╚██╗██║╚════██║    ██║   ██║██║╚██╗██║██║     ██║██║╚██╗██║██╔══╝  
██║  ██║   ██║   ██║  ██║███████╗██║ ╚████║███████║    ╚██████╔╝██║ ╚████║███████╗██║██║ ╚████║███████╗
╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝╚══════╝╚═╝  ╚═══╝╚══════╝     ╚═════╝ ╚═╝  ╚═══╝╚══════╝╚═╝╚═╝  ╚═══╝╚══════╝
////////////////////////////////////////I MADE THIS BOT//////////////////////////////////////////////*/

var twit = require('twit');
//var TwitterBot=require("node-twitterbot").TwitterBot;

var T = new twit({
	consumer_key: '57WKHlzFUSuvE72thbvOa4NXH',
	consumer_secret: 'jxlDMPl9Xm7JgyKfKxIL6yb57bSgb1RNnmsptomX2vWaTVSdgT',
	access_token: '962120311394242560-ZqOiaaREGNXMXEKetLTeFqsGtitkk00',
	access_token_secret: '3h03VEYirIedWq8vefG6SQwpZ8blZssrCLe6lLpalOMpJ'
});
//add who are our sponsors to an answerable question


//do I need oauth? probably not
//hopefully not
function retweet(){
var params={
	q:'#AthensOnline, #athensonline, #Athensonline', //why only 2 q? Is problem the _ ? yes it was
	result_type: 'recent' //popular
	//how to set until
}

T.get('search/tweets', params,function(err,data){ //could I integrate this with?
	// if no error
	if(!err){
		//need "id:" to retweet stuff.
		//how to get id? store it in variable(probably will have to store it as var)
		var rtid = data.statuses[0].id_str; //status, get id and turn it into string
		T.post('statuses/retweet/:id',{ id:rtid } ,function(err,reply){ //rtid is possible? or https://www.npmjs.com/package/twit-old
			//trim_user optional
			if(reply){
				console.log('retweeted what i could find');
			}
			else if(err){
				console.log('dude fix this- \'statuses/retweet:id\'');
			}
		});//post
	}//if
	else if(err){
		console.log('dude fix this - \'search/tweets\'');
	}
});//search

}//retweet

                                                                                                 

var stream = T.stream('user');
stream.on('tweet', gotTweeted);

function tweetBack(reply){
	T.post('statuses/update',{status: reply});
}

function gotTweeted(someTweet){
		//if @ me, look through the tweet, parse and if it has a certain set, do it.
		//convert thing to string
		// need to stringify? JSON parse and stringify instead of search?
		//undefined property asdfasdfasd gfasjf brgoirhjrnezm gzmmef owen fg8zejwfowjeofhsgvn s.fhverhgkejhgkjeabvkdzfzm. ,jmsfllnkzfsdjuuoifejjoiuzfsdmjuoizfsd
		//someTweet seems undefined, why?
		//Where is the bathroom?
		
		var stringTweet = someTweet.text;
		var atMe = someTweet.in_reply_to_screen_name; //me!
		var whoPosted = someTweet.user.screen_name; //who @ me?

		var posHelp = stringTweet.toUpperCase().search("HELP");
		var posWeb = stringTweet.toUpperCase().search("WEB");
		var posLink = stringTweet.toUpperCase().search("LINK");
		var posWho = stringTweet.toUpperCase().search("WHO"); //who are your sponsors?
		var posSponsor = stringTweet.toUpperCase().search("SPONSOR"); //who are your sponsors? (combine)
		var posWhen = stringTweet.toUpperCase().search("WHEN"); //when is Athens Online?
		var posWhat = stringTweet.toUpperCase().search("WHAT"); //what are the prizes?
		var posPrize = stringTweet.toUpperCase().search("PRIZE"); //prize (combine);
		var posWhere = stringTweet.toUpperCase().search("WHERE"); //where is the event held?

		var talkHelp = "Take a look at the description for some ideas for questions! @"+whoPosted; //problem because if i write key words here it picks up on it too.
		var talkWho = " Our current Sponsors are @msiUSA @nvidia , @soylent , @superleaguemc , @EBlueGaming , and @GIGABYTEUSA ! " + '@'+whoPosted;
		var talkWhen =  " Athens Online will be held on March 3rd - 4th! Thats the first weekend of March! " + '@' + whoPosted;
		var talkPrize = " Shhh... its a secret ;) \n I can tell you for sure its better than last year so stay hyped! " + '@'+whoPosted;
		var talkWhere = " Come to\n 300 N.Thomas St.\n Athens, GA 30601. \n Classics Center for short. " + '@'+whoPosted;
		var talkWeb = " Our website is https://www.athens-online.org/ " + '@'+whoPosted;
		//if doesn't exist, will return '-1'

		if(atMe=='bothensonline' && posHelp != -1){
			console.log('@'+whoPosted+ " needs help!");
			tweetBack(talkHelp);
		}
		if(atMe=='bothensonline' && posWho!= -1 && posSponsor != -1){
			console.log('@' + atMe+' has been mentioned by @' + whoPosted);
			tweetBack(talkWho);			
		}
		if(atMe=='bothensonline' && posWhen!= -1){
			console.log('@' + atMe+' has been mentioned by @' + whoPosted);
			tweetBack(talkWhen);			
		}
		if(atMe=='bothensonline' && posWhat!= -1&& posPrize != -1){
			console.log('@' + atMe+' has been mentioned by @' + whoPosted);
			tweetBack(talkPrize);			
		}
		if(atMe =='bothensonline' &&posWhere != -1){
			console.log('@' + atMe + ' has been mentioned by @' +whoPosted);
			tweetBack(talkWhere);
		}
		if(atMe=='bothensonline' && posLink != -1 || posWeb != -1){
			console.log('@' + atMe + ' has been mentioned by @' +whoPosted);
			tweetBack(talkWeb);
		}
};


setInterval(retweet, 10*1000); //checks for tweets every 10 mins

/*
T.stream('statuses/sample',function(err,reply){ //SyntaxError: Unexpected token u in JSON at position 0 but I'm not using JSON :(
	if(!err){
		stream.on('tweet', gotTweeted);
	}
	else if(err){
		console.log('dude fix this - \'T.stream\'');
	}
});
*/

//retweet();
/*
var test = {
	text: "Test Text"
}
gotTweeted(test);
*/
//set interval to 10 seconds - avoid clogging (I can hope ok)


