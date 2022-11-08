import path from 'path';
import StreamZip from 'node-stream-zip';

let lastNames;
let firstNames;

const namesDataset = {
  async load(filePath = '', internalPath = '') {
    const curPath = path.resolve(__dirname);
    const file = path.resolve(curPath, filePath);

    const zip = new StreamZip({
      file,
      storeEntries: true,
    });

    return new Promise((resolve, reject) => {
      zip.on('ready', () => {
        // Take a look at the files
        console.log(`Entries read: ${zip.entriesCount}`);
        // Read a file in memory
        const zipContent = zip.entryDataSync(internalPath).toString('utf8');
        console.log('Parsing JSON ...');
        const parsedZipContent = JSON.parse(zipContent);
        zip.close();
        resolve(parsedZipContent);
      });
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
    search(name = '') {
      this.check();
      return lastNames[name];
    },
  },
  firstNames: {
    check() {
      if (!firstNames) throw new Error('First names data not loaded. Pls init first names.');
    },
    search(name = '') {
      this.check();
      return firstNames[name];
    },
  },
};

export default namesDataset;
