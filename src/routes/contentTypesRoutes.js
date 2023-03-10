const express = require('express');
const router = express.Router();

const { getContentTypesHandler, createContentTypeHandler, addAttributeToContentTypeHandler, createEntryHandler, fetchEntriesHandler, deleteAttributeHandler, deleteEntryHandler } = require('../controllers/contentTypesController');

router.get('/contentTypes/all', getContentTypesHandler);
router.post('/contentTypes/create', createContentTypeHandler);
router.patch('/attributes/create', addAttributeToContentTypeHandler);

router.post('/entry/create', createEntryHandler);
router.get('/entries/contentType/:contentTypeId', fetchEntriesHandler);
router.delete('/attributes/delete/:contentTypeId/:attributeName', deleteAttributeHandler);

router.delete('/entry/delete/:entryId', deleteEntryHandler);

// const contentTypeId = req.params.contentTypeId;
// const attributeName = req.params.attributeName;
module.exports = router;