// To be commented.

module.exports = {
	init : {
		permissionLevel : 0,
		group : null,
		delete : true,
		dev : null,
		channel : null,
		execute : async function(message, args){

			const deleteCount = parseInt(args[0], 10);
	    
	    	if(!deleteCount || deleteCount < 2 || deleteCount > 100)
	    		return message.reply("Pas moins que 2, pas plus de 100!");
	    		var pinnedArray = await message.channel.fetchPinnedMessages();
	    		pinnedArray = pinnedArray.array();
	
	    	if (  ( pinnedArray.length == 0 || pinnedArray[0].id == undefined ) ){
	    		await message.channel.fetchMessages({limit: deleteCount}).then( messages => message.channel.bulkDelete(messages)) // need to change that. TODO
	    		.catch(console.error);
	    	}else {
	    		var fetched = await message.channel.fetchMessages({limit: deleteCount + 1})
	    		fetched = fetched.array();
	
	    		for (var i = 0; i < pinnedArray.length; i++) {
	    			var thisId = pinnedArray[i].id
	    			for (var j = 0; j < fetched.length; j++) {
	    				if (thisId == fetched[j].id){
	    					fetched.splice(j, 1);
	    				}
					}
				}

				if (fetched.length >= 2){
					message.channel.bulkDelete(fetched);
				}
	    	}
		}
	}
}