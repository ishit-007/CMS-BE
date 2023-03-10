/* eslint-disable no-unused-vars */
const db = require('../../database/models');
const { getContentTypesService,
  createContentTypeService,
  addAttributeToContentTypeService,
  createEntryService,
  fetchEntriesService,
  deleteAttributeService, } = require('../../src/services/contentTypesServices');

describe('getContentTypesService', () => {
  it('should return whatever is fetched from Database', async () => {
    const mockDbResponse = {
      id: '1',
      name: 'content type 1'
    };
    jest.spyOn(db.contentTypes, 'findAll').mockResolvedValue(mockDbResponse);
    const result = await getContentTypesService();
    expect(result).toEqual(mockDbResponse);
  });
});

describe('createContentTypeService', () => {
  const mockDbResponse = null;
  const mockDbResponse1 = {
    id: '1',
    name: 'content type 1'
  };
  it('should throw error if user content type already exists', async () => {
    jest.spyOn(db.contentTypes, 'findOne').mockResolvedValue(mockDbResponse1);
    const result = await createContentTypeService('content type 1');
    expect(result).toEqual('Content Type Already Exists');
  });
  it('should create new content type if it does not exist', async () => {
    jest.spyOn(db.contentTypes, 'findOne').mockResolvedValue(mockDbResponse);
    jest.spyOn(db.contentTypes, 'create').mockResolvedValue(mockDbResponse1);
    const result = await createContentTypeService('content type 1');
    expect(result).toEqual(mockDbResponse1);
  });
});

describe('createEntryService', () => {
  it('should send error message if content type does not exist', async () => {
    const mockContentId = 1;
    const mockValues = { name: 'exampleAttribute', type: 'Text' };
    jest.spyOn(db.contentTypes, 'findOne').mockResolvedValue(null);
    const result = await createEntryService(mockContentId, mockValues);
    expect(result).toEqual('Content Type Not Found');
  });
  it('should create entry if content type exists', async () => {
    const mockContentId = 1;
    const mockValues = { name: 'exampleAttribute', type: 'Text' };
    const mockContentType = {
      id: '1',
      name: 'content type 1'
    };
    const mockResp = {
      id: '1',
      contentTypeId: '1',
    };
    jest.spyOn(db.contentTypes, 'findOne').mockResolvedValue(mockContentType);
    jest.spyOn(db.contentTypeEntries, 'create').mockResolvedValue(mockResp);
    const result = await createEntryService(mockContentId, mockValues);
    expect(result).toEqual(mockResp);
  });
});

describe('fetchEntriesService', () => {
  it('should throw an error if content type is not found', async () => {
    const mockContentTypeId = 123;
    jest.spyOn(db.contentTypes, 'findOne').mockResolvedValue(null);
    const result = await fetchEntriesService(mockContentTypeId);
    expect(result).toEqual('Content Type Not Found');
  });
});

describe('addAttributesToContentTypeService', () => {
  it('should throw an error if content type is not found', async () => {});
});