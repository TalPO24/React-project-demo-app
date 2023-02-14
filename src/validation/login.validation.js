import Joi from "joi-browser";

const loginSchema = {
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .min(6)
        .max(100)
        .required(),
    password: Joi.string().min(6).max(100).required(),
};

export default loginSchema;