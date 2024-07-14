import Joi from "joi";

export function validateUser(user) {
  const schema = Joi.object({
    email: Joi.string().email().min(5).max(50).required(),
    password: Joi.string().min(5).max(1024).required(),
  });

  return schema.validate(user);
}

export function validateNewUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(20).required(),
    email: Joi.string().email().min(5).max(50).required(),
    password: Joi.string().min(5).max(1024).required(),
    day: Joi.string().required(),
    month: Joi.string().required(),
    year: Joi.string().required(),
    gender: Joi.string().required(),
  });

  return schema.validate(user);
}
