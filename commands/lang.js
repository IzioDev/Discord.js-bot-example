// To be commented.

module.exports = {
	init : {
		permissionLevel : 0,
		group : "new",
		delete : true,
		dev : null,
		channel : "welcome",
		execute :function(message, args){
			var language = args[0].split("", 2);
			language = language[0] + language[1];

			if (language == 'en' || language == 'fr'){
				mysqlUser.updateUserLang(message.member, language);
				if (language == 'fr'){
					message.reply("Bienvenue parmis nous ${message.member}! Tu as maintenant accès à des channels écrits et des channels vocaux. Bonne naviguation! :)");

				}else{
					message.reply("Welcome home ${message.member}! You now have access to voice&text channel, feel free to naviguation througt them! :)");
				}
				// Add Roles, and check he doesn't have one other between fr/en
			}else{
				message.reply("[HELP] - .lang [en/fr]");
			}
		}
	}
}