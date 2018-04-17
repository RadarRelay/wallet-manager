import * as lightwallet from 'eth-lightwallet';
import * as _ from 'lodash';
import { keystore } from 'eth-lightwallet';
import { Store } from './Store';
import { CoreWalletOptions, WalletError, Wallet, WalletType } from './types';
import { DEFAULT_DERIVATION_PATH } from './constants';
import { Web3Builder } from './Web3Builder';
import { CoreWallet } from './wallets/CoreWallet';
import { CoreManager } from './managers/CoreManager';

export class WalletManager {
  public core: CoreManager;

  constructor() {
    this.core = new CoreManager();
  }
}
