// Main program

// Let's load the Messages manager, mysql wrapper and the new arrivals module.
const Messages = require("./commands/main.js");
const mysql = require("./db/main.js");
const Arrivals = require("./arrivals.js")

// test the connection (just to be sure everything is fine on launching)
mysql.test();

// Load the discrod.js API and create a client
const Discord = require("discord.js");
const client = new Discord.Client();

// Load the config file
const config = require("./config.json");

// Initiate a global variable to 0
devMode = 0;

// When client is ready, we print a message and set his game to something
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setGame(`Salut c'est cool`);
});

// When someone join the server
client.on('guildMemberAdd', member => {
    Arrivals.Init(member);
});

// When someone start typing
client.on("typingStart", function(channel, member){
    if (devMode == 1){
        channel.send(member.tag +" est en train d'écrire");
        mysql.createUser(member)
    }
})

// Same as before but for stop
client.on("typingStop", function(channel, member){
    if (devMode == 1){
        channel.send(member.tag +" a fini d'écrire");
    }
})

// When someone wrote something
client.on("message", async message => {
    // Call the Manager! "/commands/main.js"
    Messages.ManageMessage(message, config.prefix);
});

// Log in our bot!
client.login(config.token);