var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bCrypt = require('bcrypt-nodejs');
var User = mongoose.model('User');

router.use(function(req, res, next){

	if(req.method === "GET"){
		return next();
	}
	
	return next();
})

/* GET home page. */
router.route('/users')

	.get(function(req, res){
		User.find(function(err, data){
			if(err){
				return res.send(500, err);
			}
			return res.send(200, data);
		})

	})

	.post(function(req, res){
		User.findOne({username: req.body.username}, function (err, user){

			var ori_password_from_user = req.body.ori_password;
			var ori_password = user.password;

			if (compareHash(ori_password_from_user, ori_password)){
				user.password = createHash(req.body.password);
				user.save(function(err, user){
					if (err){
						return res.send(500, err);
					}
					return res.send(200, {"message": "Edit Successfully"});
				});
			}else{
				return res.send(200, {"message": "Wrong Original Password"});
			}
		})
	})


	var createHash = function(password){
		return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
	};

	var compareHash = function(password1, password2){
		return bCrypt.compareSync(password1, password2);
	}


module.exports = router;
