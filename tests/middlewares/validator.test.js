const axios = require('axios');
const { tokenValidator, createContentTypeValidator, attributeAddValidator, entryAddValidator, entrySchema } = require('../../src/middlewares/validator');
const { HttpError } = require('../../src/errors/HttpError');

jest.mock('axios');

describe('tokenValidator', () => {
  const req = {
    headers: {},
  };
  const res = {
    status: jest.fn(() => res),
    json: jest.fn(),
  };
  const next = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should call axios.post with correct arguments', async () => {
    const token = 'valid-token';
    req.headers.token = token;
    axios.post.mockResolvedValueOnce({ data: true });

    await tokenValidator(req, res, next);

    expect(axios.post).toHaveBeenCalledWith('http://localhost:4000/token/validate', { token });
  });

  test('should call next() when token is valid', async () => {
    const token = 'valid-token';
    req.headers.token = token;
    axios.post.mockResolvedValueOnce({ data: true });

    await tokenValidator(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });

  test('should return 401 unauthorized error when token is invalid', async () => {
    const token = 'invalid-token';
    req.headers.token = token;
    axios.post.mockResolvedValueOnce({ data: false });

    await tokenValidator(req, res, next);

    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Unauthorized' });
  });
});


describe('createContentTypeValidator', () => {
  test('should call next if validation passes', () => {
    const req = {
      body: {
        contentName: 'valid content name',
      },
    };
    const res = {};
    const next = jest.fn();

    createContentTypeValidator(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
  });

  test('should throw a HttpError if validation fails', () => {
    const req = {
      body: {
        contentName: '',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    createContentTypeValidator(req, res, next);

    expect(next).not.toHaveBeenCalled();
  });
});

describe('attributeAddValidator', () => {
  test('should call next if validation passes', () => {
    const req = {
      body: {
        name: 'valid name',
        value: 'valid value',
      },
    };
    const res = {};
    const next = jest.fn();

    attributeAddValidator(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
  });

  test('should throw a HttpError if validation fails', () => {
    const req = {
      body: {
        name: '',
        value: 'valid value',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    attributeAddValidator(req, res, next);

    expect(next).not.toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith({
      message: expect.any(String),
    });
  });
});

describe('entryAddValidator middleware', () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      body: {
        
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('calls next if request body is valid', () => {
    entryAddValidator(req, res, next);
    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });

  test('throws a 400 HttpError if request body is invalid', () => {
    const error = new Error('Invalid request body');
    error.statusCode = 400;
    entrySchema.validate.mockReturnValueOnce({ error });
    entryAddValidator(req, res, next);
    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
  });

  test('handles HttpError thrown by entryAddValidator', () => {
    const error = new HttpError('Invalid request body', 400);
    entryAddValidator.mockImplementationOnce(() => {
      throw error;
    });
    entryAddValidator(req, res, next);
    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
  });
});




