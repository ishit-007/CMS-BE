const { getContentTypesHandler, createContentTypeHandler, addAttributeToContentTypeHandler, createEntryHandler, fetchEntriesHandler, deleteAttributeHandler } = require('../../src/controllers/contentTypesController');
const { getContentTypesService, createContentTypeService, addAttributeToContentTypeService, createEntryService, fetchEntriesService, deleteAttributeService } = require('../../src/services/contentTypesServices');

jest.mock('../../src/services/contentTypesServices');


describe('getContentTypesHandler', () => {
  it('should return content types', async () => {
    const mockRes = () => {
      const res = {};
      res.send = jest.fn().mockReturnValue(res);
      return res;
    };
    const mockReq = {};
    const mockContentTypes = [
      {
        id: '1',
        name: 'content type 1'
      },
      {
        id: '2',
        name: 'content type 2'
      }
    ];

    getContentTypesService.mockResolvedValue(mockContentTypes);
    const res = mockRes();

    await getContentTypesHandler(mockReq, res);

    expect(res.send).toHaveBeenCalledWith(mockContentTypes);
  });
});

describe('createContentTypeHandler', () => {
  it('should create content type and return it', async () => {
    const req = { body: { contentTypeName: 'exampleContentType' } };
    const res = { send: jest.fn() };

    const contentType = { name: 'exampleContentType' };

    createContentTypeService.mockResolvedValue(contentType);

    await createContentTypeHandler(req, res);
    expect(res.send).toHaveBeenCalledWith(contentType);
  });
});

describe('addAttributeToContentTypeHandler', () => {
  it('should add attribute to content type and return the response', async () => {

    const req = {
      body: {
        attribute: { name: 'exampleAttribute', type: 'Text' },
        contentTypeName: 'exampleContentType'
      }
    };
    const sendMock = jest.fn();
    const res = { send: sendMock };

    await addAttributeToContentTypeHandler(req, res);
    expect(addAttributeToContentTypeService).toHaveBeenCalledWith('exampleContentType', { name: 'exampleAttribute', type: 'Text' });
  });
});

describe('createEntryHandler', () => {
  it('should create entry and return the response', async () => {
    const req = {
      body: {
        contentTypeId: 'exampleContentTypeId',
        values: { title: 'Example Title', body: 'Example Body' }
      }
    };
    const sendMock = jest.fn();
    const res = { send: sendMock };

    await createEntryHandler(req, res);
    expect(createEntryService).toHaveBeenCalledWith('exampleContentTypeId', { title: 'Example Title', body: 'Example Body' });
  });
});

describe('fetchEntriesHandler', () => {
  it('should fetch entries and return the response', async () => {
    const req = {
      params: {
        contentTypeId: 'exampleContentTypeId'
      }
    };
    const sendMock = jest.fn();
    const res = { send: sendMock };

    await fetchEntriesHandler(req, res);
    expect(fetchEntriesService).toHaveBeenCalledWith('exampleContentTypeId');
  });
});

describe('deleteAttributeHandler', () => {
  it('should call deleteAttributeService with the correct arguments', async () => {
    const req = { params: { contentTypeId: '123', attributeName: 'name' } };
    const res = { send: jest.fn() };
    const expectedResponse = { message: 'Attribute deleted successfully' };

    await deleteAttributeHandler(req, res);

    expect(deleteAttributeService).toHaveBeenCalledWith('123', 'name');

    expect(res.send).toHaveBeenCalledTimes(1);
  });
});

