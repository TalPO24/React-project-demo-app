import Joi from "joi-browser";

const registerValidate = (registerToValidate, schema) => {
    return Joi.validate(registerToValidate, schema, { abortEarly: false });
};

export default registerValidate;