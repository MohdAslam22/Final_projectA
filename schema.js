

const Joi = require("joi");

const listingSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(), // also fixed spelling
  price: Joi.number().min(0).required(),
  country: Joi.string().required(),
  image: Joi.string().allow("", null),
  location: Joi.string().required(),
});

module.exports = listingSchema;


module.exports.reviewSchema =Joi.object({
 review:Joi.object({
 rating:Joi.number().required(),
 comment:Joi.string().required(),
 }).required()
});