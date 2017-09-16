// Load MySQL npm package and the config.
var mysql      = require('mysql');
var config     = require("../config.json");

var local = 1;

// To use differents database (when working on local usually)
if (local == 1){
	var dbConfig = config.dbIzio;
}else{
	var dbConfig = config.dbLive;
}

// Create a connection at the begining.
var connection = mysql.createConnection(dbConfig);

// Let's create an export module for the other files
module.exports = {
	// Test the connection
	test : function(){
		connection.query('SELECT 1', function (error, results, fields) {
			if (error) throw error;
			console.log("Connected to the Database succesfully.")
		});
	},
	// Create an user
	createUser : function(member){
		var newUser = {id: member.id, tag: member.tag}
		connection.query('INSERT INTO users SET ?', newUser, function (error, results, fields) {
			if (error) throw error;
			console.log("Created new user!")
		});
	},
	// Update the lang choice
	updateUserLang : function(member, lang){
		connection.query('UPDATE users SET lang = ? WHERE id = ?', [lang, member.user.id] , function (error, results, fields) {
			if (error) throw error;
		});
	},
	// Is the user new (mayube useless since we have a getGroup)
	isNew : function(member){
		connection.query('SELECT * FROM users WHERE id = ?', [member.id] , function (error, results, fields) {
			if (error) throw error;
			console.log("User group = " + results[0].group)
			if (results[0].group == "new"){
				return true;
			}else {
				return false;
			}
		});
	},
	// Get the user group
	getGroup :function(member, cb){
		connection.query('SELECT * FROM users WHERE id = ?', [member.id] , function (error, results, fields) {

			if (error) throw error;

			if (results.length != 0 ){
				cb(results[0].group);
			}else {
				var newUser = {id: member.user.id, tag: member.user.tag}
				connection.query('INSERT INTO users SET ?', newUser, function (error, results, fields) {
					if (error) throw error;
					cb('new')
				});
			}

		})
	}
}