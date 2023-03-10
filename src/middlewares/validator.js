const Joi = require('joi');
const { HttpError } = require('../errors/HttpError');
const axios = require('axios');

const tokenValidator = async (req, res, next) => {
  const token = req.headers.token;
  const tokenValidationResp = (await axios.post('http://localhost:4000/token/validate', { token })).data;
  if (tokenValidationResp) {
    next();
  }
  else {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

const contentNameSchema = Joi.object(
  {
    contentTypeName: Joi.string().required()
  }
);

const entryFetchSchema = Joi.object(
  {
    contentTypeId: Joi.number().required()
  }
);


const attributeAddSchema = Joi.object(
  {
    attribute: Joi.string().required(),
    contentTypeName: Joi.string().required()
  }
);

const entrySchema = Joi.object(
  {
    contentTypeId: Joi.number().required(),
    values: Joi.object().required()
  }
);

const entryDeleteSchema = Joi.object(
  {
    entryId: Joi.number().required()
  }
);

const attributeDeleteSchema = Joi.object(
  {
    contentTypeId: Joi.number().required(),
    attributeName: Joi.string().required()
  }
);

const createContentTypeValidator = (req, res, next) => {
  try {
    const { error } = contentNameSchema.validate(req.body);
    if (error) {
      throw new HttpError(error.message, 400);
    }
    next();
  }
  catch (error) {
    if (error instanceof Joi.ValidationError) {
      res.status(error.statusCode).json({ message: error.message });
    }
  }
};

const attributeAddValidator = (req, res, next) => {
  try {
    const { error } = attributeAddSchema.validate(req.body);
    if (error) {
      throw new HttpError(error.message, 400);
    }
    next();
  }
  catch (error) {
    if (error instanceof HttpError) {
      res.status(error.statusCode).json({ message: error.message });
    }
  }
};

const entryAddValidator = (req, res, next) => {
  try {
    const { error } = entrySchema.validate(req.body);
    if (error) {
      throw new HttpError(error.message, 400);
    }
    next();
  }
  catch (error) {
    if (error instanceof HttpError) {
      res.status(error.statusCode).json({ message: error.message });
    }
  }
};


const entryDeleteValidator = (req, res, next) => {
  try {
    const { error } = entryDeleteSchema.validate(req.params);
    if (error) {
      throw new HttpError(error.message, 400);
    }
    next();
  }
  catch (error) {
    if (error instanceof HttpError) {
      res.status(error.statusCode).json({ message: error.message });
    }
  }
};

const attributeDeleteValidator = (req, res, next) => {
  try {
    const { error } = attributeDeleteSchema.validate(req.params);
    if (error) {
      throw new HttpError(error.message, 400);
    }
    next();
  }
  catch (error) {
    if (error instanceof HttpError) {
      res.status(error.statusCode).json({ message: error.message });
    }
  }
};

const entryFetchValidator = (req, res, next) => {
  try {
    const { error } = entryFetchSchema.validate(req.params);
    if (error) {
      throw new HttpError(error.message, 400);
    }
    next();
  }
  catch (error) {
    if (error instanceof HttpError) {
      res.status(error.statusCode).json({ message: error.message });
    }
  }
};


module.exports = {
  createContentTypeValidator,
  attributeAddValidator,
  entryAddValidator,
  entryDeleteValidator,
  attributeDeleteValidator,
  entryFetchValidator,
  tokenValidator
};

