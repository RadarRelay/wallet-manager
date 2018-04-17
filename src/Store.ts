import * as lightwallet from 'eth-lightwallet';
import { keystore, signing } from 'eth-lightwallet';
import { CoreWallet } from './wallets/CoreWallet';

export class Store {

 /**
  * Check if local storage is supported
  *
  *
  */
  public isLocalStorageSupported() {
    const lsSupportTest = 'lsSupportTest';

    try {
      localStorage.setItem(lsSupportTest, lsSupportTest);
      localStorage.removeItem(lsSupportTest);
      return true;
    } catch(err) {
      return false;
    }
  }

 /**
  * Save the encrypted wallet in local storage
  *
  * @param wallet The wallet to save
  * @param keyName The key identifier
  */
  public saveCoreWallet(wallet: CoreWallet, keyName: string = 'radar-core-wallet') {
    localStorage.setItem(keyName, wallet.serialize());

    return true;
  }

 /**
  * Load the encrypted wallet from local storage
  *
  * @param keyName The key identifier
  */
  public loadCoreWallet(keyName: string = 'radar-core-wallet') {
    let keystore = null;
    const serializedKeystore = localStorage.getItem(keyName);

    if (serializedKeystore) {
      keystore = lightwallet.keystore.deserialize(serializedKeystore);
    }

    return keystore;
  }
}
