import * as Joi from 'joi';

export const loginSchema = Joi.object().keys({
    idNumber: Joi.number().integer().required(),
    password: Joi.string().required()
})
export const signUpSchema = Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    idNumber: Joi.number().integer().required(),
    password: Joi.string().min(3).max(15).required(),
    password_confirmation: Joi.any().valid(Joi.ref('password')).required().options({language: {any: {allowOnly: 'must match password'}}})
})
export const addPartyScheme = Joi.object().keys({
    name: Joi.string().required(),
    urlLogo: Joi.string().uri().required()
})
export const removePartyScheme = Joi.object().keys({
    name: Joi.string().required(),
})
export const chooserScheme = Joi.object().keys({
    idNumber: Joi.number().integer().required(),
    party: Joi.string().required()
})