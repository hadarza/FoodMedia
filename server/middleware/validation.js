const Joi = require('joi')

const RegisterValidation = (data) => {
    /*At least one upper case English letter, (?=.*?[A-Z])
    At least one digit, (?=.*?[0-9])
    At least one special character, (?=.*?[#?!@$%^&*-]) 
    Minimum eight in length .{8,}*/

    const schema = Joi.object({
    phone: Joi.string().required().pattern(/^([+]\d*)?$/),
    passwordUser: Joi.string().required().pattern(/^(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
    isGluten: Joi.boolean().required().default(false),
    isVegan: Joi.boolean().default(false),
    isVegetarian: Joi.boolean().default(false),
    isNutAllergy: Joi.boolean().default(false),
    isSeafood : Joi.boolean().default(false),
    isLowsugar : Joi.boolean().default(false),
    isKosher: Joi.boolean().default(false)
    });
    return schema.validate(data);
  };


  const LoginValidation = (data) => {
    const schema = Joi.object({
        phone: Joi.string().required().pattern(/^([+]\d*)?$/),
        passwordUser: Joi.string().required(),
    });
    return schema.validate(data);
  };
module.exports.LoginValidation = LoginValidation;
module.exports.RegisterValidation = RegisterValidation;
