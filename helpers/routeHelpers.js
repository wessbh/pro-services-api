const joi = require('joi');

module.exports = {
    validateBody: (schema) => {
        return (req, res, next) => {
            const result = joi.validate(req.body, schema);
            if(result.error){
                return res.status(400).json(result.error);
            }
            if(!req.value){ req.value = {};}
            req.value['body'] = result.value;

            next();
        }
    },
    schemas: {
        loginSchema : joi.object().keys({
            email: joi.string().email().required(),
            password: joi.string().min(4).required()
        }),
        authSchemaAdmin : joi.object().keys({
            user_type: joi.string().required(),
            email: joi.string().email().required(),
            password: joi.string().min(4).required()
        }),
        authSchemaClient : joi.object().keys({
            user_type: joi.string().required(),
            email: joi.string().email().required(),
            password: joi.string().min(4).required(),
            nom: joi.string().min(4).required(),
            prenom: joi.string().min(4).required(),
            num_portable: joi.number().min(4).required(),
            num_fixe: joi.number().min(4).required(),
            image: joi.string().min(4).required()
        }),
        authSchemaPro : joi.object().keys({
            user_type: joi.string().required(),
            email: joi.string().email().required(),
            password: joi.string().min(4).required(),
            nom: joi.string().min(4).required(),
            prenom: joi.string().min(4).required(),
            num_portable: joi.number().min(4).required(),
            num_fixe: joi.number().min(4).required(),
            image: joi.string().required(),
            matricule_fiscale: joi.string().required()
            
        }),
        card_schema : joi.object().keys({
            id_user: joi.string().required(),
            card_type: joi.string().required(),
            card_number: joi.number().required(),
            expiration_date: joi.date(),
            cvv: joi.number(),
            password: joi.number().min(8).max(8)
        })
    }
}