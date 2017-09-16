const welcomeMessage = ` Welcome to ID's Scripts server, here you can find help with scripting, creating new modules, just ask to the dev.\r\n but first, please type .lang en if you are english or .lang fr if you are french. Thanks you. (in devlopment)`

module.exports = {
	Init : function(member){

		const channel = member.guild.channels.find('name', 'welcome');

    	if (!channel) return;

    	channel.send( "${member}" + welcomeMessage);

	}
}