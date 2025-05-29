const { Namer } = require('@parcel/plugin');
const path = require('path');

module.exports = new Namer({
  async name({ bundle }) { // Made this async
    const mainEntry = bundle.getMainEntry();
    if (mainEntry) {
      const entryFilePath = mainEntry.filePath;
      const sourceFileName = path.basename(entryFilePath);

      if (sourceFileName === 'content.tsx' && bundle.type === 'js') {
        return 'content.js';
      }

      if (sourceFileName === 'content.css' && bundle.type === 'css') {
        return 'content.css';
      }
    }
    return null;
  }
});
