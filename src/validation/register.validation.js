import { Joi } from "joi-browser";

const registerSchema = {
    name: Joi.string().min(2).max(50).required(),
    email: Joi.string().email().min(6).max(20).required(),
    password: Joi.string().min(6).max(20).required(),
};

export default registerSchema;