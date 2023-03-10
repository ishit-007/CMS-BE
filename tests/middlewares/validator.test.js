const axios = require('axios');
const { tokenValidator, } = require('../../src/middlewares/validator');

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