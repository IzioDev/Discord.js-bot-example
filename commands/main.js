// To be commented.

mysqlUser = require('../db/main.js');
const fs  = require('fs');

var allCommands = new Map();

fs.readdir("./commands", (err, files) => {
  files.forEach(file => {

  	if (file == 'main.js'){return;}

	var commandName = file.split(".")[0]
	var importedCommandsParams = require("./" + file )
    allCommands.set(commandName, importedCommandsParams.init )
  });
})

function DeleteDesignedMessage(test){
  test.delete().catch(console.error);
}

var testFolder = null;

module.exports = {
	ManageMessage : async function(message, prefix){
		if(message.author.bot) return;

	 	if(message.content.indexOf(prefix) !== 0) return;

	 	const args = message.content.slice(prefix.length).trim().split(/ +/g);
	 	const command = args.shift().toLowerCase();

	 	allCommands.forEach(async function(v, k, m){
	 		if (k == command){

	 			if (v.channel != null){
	 				if (message.channel.name == v.channel){
	 					// nothing for now
	 				}else{
	 					return;
	 				}
	 			}

	 			if (v.group != null){

					mysqlUser.getGroup(message.member, function(group){

	 					if ( group == v.group ){
	 						// nothing for now
	 					}else{
	 						message.reply("Tu n'as pas la permission de faire cela.")
	 						return;
	 					}
					})
	 			}

	 			if (v.dev != null){
	 				if (devMode == 1){
						// nothing for now
	 				}else{
	 					message.reply("Le mode developpeur n'est pas activé! (/dev 1).")
	 					return;
	 				}
	 			}

	 			v.execute(message, args);
	 		
	 			if (v.delete){
	 				DeleteDesignedMessage(message);
	 			}
	 		}
	 	});
	}
}