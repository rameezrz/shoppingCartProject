var express = require('express');
var router = express.Router();
var productHelper = require('../helpers/product-helpers');
const productHelpers = require('../helpers/product-helpers');

/* GET users listing. */
router.get('/', function(req, res, next) {
	let products = [{
		name: "Iphone 11",
		category: "Mobile",
		description: "This is a good phone",
		image: "data:image/jpeg;base64,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"
	}, {
		name: "Oneplus 7T",
		category: "Mobile",
		description: "This is a good phone",
		image: "data:image/jpeg;base64,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"
	}, {
		name: "Oppo 10X",
		category: "Mobile",
		description: "This is a good phone",
		image: "data:image/jpeg;base64,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"
	}, {
		name: "MI Note 9 Pro",
		category: "Mobile",
		description: "This is a good phone",
		image: "data:image/jpeg;base64,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"
	}]
	res.render('admin/view-products', {
		admin: true,
		products
	})
});
router.get('/add-product', function(req, res) {
	res.render('admin/add-product')
})
router.post('/add-product', (req, res)=>{
	console.log(req.body);
	console.log(req.files.Image);
	productHelpers.addProduct(req.body,(id)=>{
		let image=req.files.Image
		console.log(id);
		
		image.mv('./public/product-images/'+id+'.jpg',(err,done)=>{
			if(!err){
				res.render('admin/add-product')
			}else{
				console.log(err);
				
			}
		})
		
	})
})
module.exports = router;