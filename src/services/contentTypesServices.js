const db = require('../../database/models');

const getContentTypesService = async () => {
  const contentTypes = await db.contentTypes.findAll();
  return contentTypes;
};

const createContentTypeService = async (contentTypeName) => {
  const contentTypeExists = await db.contentTypes.findOne({
    where: {
      name: contentTypeName,
    }
  });
  try {
    if (!contentTypeExists) {
      const contentType = await db.contentTypes.create({ name: contentTypeName, attributes: [] });
      return contentType;
    }
    else {
      throw new Error('Content Type Already Exists');
    }
  }
  catch (err) {
    return err.message;
  }

};

const addAttributeToContentTypeService = async (contentTypeName, attributeName) => {
  const contentType = await db.contentTypes.findOne({
    where: {
      name: contentTypeName,
    }
  });
  if (!contentType) {
    throw new Error('Content Type Not Found');
  }
  else {
    const attributes = contentType.attributes;
    attributes.push(attributeName);
    const updatedContentType = await db.contentTypes.update({ attributes: attributes }, {
      where: {
        name: contentTypeName,
      }
    });
    const contentTypeId = contentType.dataValues.id;

    console.log('contentTypeId: ', contentTypeId);

    const matchingEntries = await db.contentTypeEntries.findAll({
      where: {
        contentTypeId: contentTypeId,
      }
    });

    for (let i = 0; i < matchingEntries.length; i++) {
      const entry = matchingEntries[i];
      const values = JSON.parse(entry.dataValues.values);
      values[attributeName] = null;
      await db.contentTypeEntries.update({ values: JSON.stringify(values) }, {
        where: {
          id: entry.dataValues.id,
        }
      });
    }

    console.log('matchingEntries: ', matchingEntries);
    return updatedContentType;
  }
};

const createEntryService = async (contentTypeId, values) => {
  const contentType = await db.contentTypes.findOne({
    where: {
      id: contentTypeId,
    }
  });
  try {
    if (!contentType) {
      throw new Error('Content Type Not Found');
    }
    else {
      const entry = await db.contentTypeEntries.create({ contentTypeId: contentTypeId, values: JSON.stringify(values) });
      return entry;
    }
  }
  catch (err) {
    return err.message;
  }
};

const fetchEntriesService = async (contentTypeId) => {
  const contentType = await db.contentTypes.findOne({
    where: {
      id: contentTypeId,
    }
  });
  try {
    if (!contentType) {
      throw new Error('Content Type Not Found');
    }
    else {
      const entries = await db.contentTypeEntries.findAll({
        where: {
          contentTypeId: contentTypeId,
        }
      });
      return entries;
    }
  }
  catch (err) {
    return err.message;
  }
};

const deleteAttributeService = async (contentTypeId, attributeName) => {
  console.log(contentTypeId, attributeName);

  const contentType = await db.contentTypes.findOne({
    where: {
      id: contentTypeId,
    }
  });

  if (!contentType) {
    throw new Error('Content Type Not Found');
  }
  else {
    const attributes = contentType.attributes;
    const index = attributes.indexOf(attributeName);
    if (index > -1) {
      attributes.splice(index, 1);
    }
    const updatedContentType = await db.contentTypes.update({ attributes: attributes }, {
      where: {
        id: contentTypeId,
      }
    });
    const matchingEntries = await db.contentTypeEntries.findAll({
      where: {
        contentTypeId: contentTypeId,
      }
    });
    for (let i = 0; i < matchingEntries.length; i++) {
      const entry = matchingEntries[i];
      const values = JSON.parse(entry.dataValues.values);
      delete values[attributeName];
      await db.contentTypeEntries.update({ values: JSON.stringify(values) }, {
        where: {
          id: entry.dataValues.id,
        }
      });
    }
    return updatedContentType;
  }
};

const deleteEntryService = async (entryId) => {
  try {
    const deletedEntry = await db.contentTypeEntries.destroy({
      where: {
        id: entryId,
      }
    });
    return deletedEntry;
  }
  catch (err) {
    console.log('error aaya');
    return err.message;
  }

};
module.exports = {
  getContentTypesService,
  createContentTypeService,
  addAttributeToContentTypeService,
  createEntryService,
  fetchEntriesService,
  deleteAttributeService,
  deleteEntryService
};
