import path from 'path';
import StreamZip from 'node-stream-zip';

let lastNames;
let firstNames;

const namesDataset = {
  async load(filePath = '', internalPath = '') {
    const curPath = path.resolve(__dirname);
    const file = path.resolve(curPath, filePath);
    console.log(file);
    const zip = new StreamZip({
      file,
      storeEntries: true,
    });

    zip.on('ready', () => {
      // Take a look at the files
      console.log(`Entries read: ${zip.entriesCount}`);
      // Read a file in memory
      const zipContent = zip.entryDataSync(internalPath).toString('utf8');
      console.log('Parsing JSON ...');
      const parsedZipContent = JSON.parse(zipContent);
      zip.close();
      return parsedZipContent;
    });
  },
  /**
   * Initialize last names data
   */
  async initLastNames() {
    lastNames = await this.load('../data/last_names.zip', 'last_names.json');
  },
  /**
   * Initialize first names data
   */
  async initFirstNames() {
    firstNames = await this.load('../data/first_names.zip', 'first_names.json');
  },
  lastNames: {
    check() {
      if (!lastNames) throw new Error('Last names data not loaded. Pls init last names.');
    },
  },
  firstNames: {
    check() {
      if (!firstNames) throw new Error('First names data not loaded. Pls init first names.');
    },
  },
};

export default namesDataset;
