const { getContentTypesService, createContentTypeService, addAttributeToContentTypeService, createEntryService, fetchEntriesService, deleteAttributeService, deleteEntryService } = require('../services/contentTypesServices');

const getContentTypesHandler = async (req, res) => {
  const contentTypes = await getContentTypesService();
  res.send(contentTypes);
};
const createContentTypeHandler = async (req, res) => {
  const contentTypeName = req.body.contentTypeName;
  const contentType = await createContentTypeService(contentTypeName);
  res.send(contentType);
};
const addAttributeToContentTypeHandler = async (req, res) => {
  const attribute = req.body.attribute;
  const contentTypeName = req.body.contentTypeName;
  const addAttributeToContentTypeResp = await addAttributeToContentTypeService(contentTypeName, attribute);
  res.send(addAttributeToContentTypeResp);
};
const createEntryHandler = async (req, res) => {
  const contentTypeId = req.body.contentTypeId;
  const values = req.body.values;
  const createEntryResp = await createEntryService(contentTypeId, values);
  res.send(createEntryResp);
};

const fetchEntriesHandler = async (req, res) => {
  const contentTypeId = req.params.contentTypeId;
  const fetchEntriesResp = await fetchEntriesService(contentTypeId);
  res.send(fetchEntriesResp);
};

const deleteAttributeHandler = async (req, res) => {

  const contentTypeId = req.params.contentTypeId;
  const attributeName = req.params.attributeName;
  console.log(contentTypeId, attributeName);
  const deleteAttributeResp = await deleteAttributeService(contentTypeId, attributeName);
  res.send(deleteAttributeResp);
};

const deleteEntryHandler = async (req, res) => {
  const entryId = req.params.entryId;
  const deleteEntryResp = await deleteEntryService(entryId);
  res.send(String(deleteEntryResp));
};
module.exports = {
  getContentTypesHandler,
  createContentTypeHandler,
  addAttributeToContentTypeHandler,
  createEntryHandler,
  fetchEntriesHandler,
  deleteAttributeHandler,
  deleteEntryHandler
};
