import { expect } from 'chai';
import { before } from 'mocha';
import NamesDataset from '../src/index';


describe('Returning a valid URL for (http://www.google.com)', () => {
  /*it('should not throw', async () => {
    await NamesDataset.firstNames.check();
  }); */
  it('should not throw', async () => {
    await NamesDataset.initLastNames();
    NamesDataset.lastNames.check();
    console.log(NamesDataset.lastNames.search('Smith'));
  }).timeout(0);
});
