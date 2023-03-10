/* eslint-disable no-unused-vars */
const express = require('express');
const router = express.Router();

const { getContentTypesHandler, createContentTypeHandler, addAttributeToContentTypeHandler, createEntryHandler, fetchEntriesHandler, deleteAttributeHandler, deleteEntryHandler } = require('../controllers/contentTypesController');

const { createContentTypeValidator,
  attributeAddValidator,
  entryAddValidator,
  entryDeleteValidator,
  attributeDeleteValidator,
  entryFetchValidator, tokenValidator } = require('../middlewares/validator');

router.get('/contentTypes/all', getContentTypesHandler);
router.post('/contentTypes/create', createContentTypeValidator, createContentTypeHandler);
router.patch('/attributes/create', attributeAddValidator, addAttributeToContentTypeHandler);

router.post('/entry/create', entryAddValidator, createEntryHandler);
router.get('/entries/contentType/:contentTypeId', entryFetchValidator, fetchEntriesHandler);
router.delete('/attributes/delete/:contentTypeId/:attributeName', attributeDeleteValidator, deleteAttributeHandler);

router.delete('/entry/delete/:entryId', entryDeleteValidator, deleteEntryHandler);

// const contentTypeId = req.params.contentTypeId;
// const attributeName = req.params.attributeName;
module.exports = router;