'use strict';


var userModel = require('../models/user.model.js');


var user = {
	find: ( options, callback) => {
		var query = {};

		if ( options.user ) { query.user = options.user};
		if ( options.password ) { query.password = options.password};
		

		userModel.find(query)
				 .exec(function (err, users) {
					    callback(err, users);
				 });

	},
}


module.exports = user;