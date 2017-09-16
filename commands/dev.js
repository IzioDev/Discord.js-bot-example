// To be commented.

module.exports = {
	init : {
		permissionLevel : 0,
		group : null,
		delete : true,
		dev : null,
		channel : null,
		execute : function(message, args){

			const mode = parseInt(args[0], 2);

			if(mode != 1 && mode != 0){
				message.reply("[HELP] - /dev [0/1].");
				return;
			}

			var previous = devMode;
			devMode = mode;

			if (previous == mode){

				message.reply("Le mode developpeur était déjà à " + previous + ".");
			}else{

				message.reply("Tu viens de changer le mode developpeur de " + previous + " à " + devMode + ".");
			}
		}
	}
}