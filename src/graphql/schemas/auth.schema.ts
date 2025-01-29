import Joi from "joi";

export const loginSchema = Joi.object({
    email: Joi.string().email({ tlds: { allow: false } }).required(),
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).min(4),
})

export const RegisterSchema = Joi.object({
    email: Joi.string().email({ tlds: { allow: false } }).required(),
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).min(4).required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    middleName: Joi.string(),
})