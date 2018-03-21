import * as _ from 'lodash';
import * as Web3 from 'web3';
import * as EthereumTx from 'ethereumjs-tx';
import * as lightwallet from 'eth-lightwallet';
import * as promisify from 'es6-promisify';
import Semaphore from 'semaphore-async-await';
import { assert } from '@0xproject/assert';
import { ECSignatureBuffer, PartialTxParams, JSONRPCPayload, Signer } from '../types';

export class CoreSigner implements Signer {
  private _keystore: any;
  private _signing: any;
  private _pwDerivedKey: Uint8Array;

  constructor(keystore: lightwallet.keystore, signing: lightwallet.signing, pwDerivedKey: Uint8Array) {
    this._keystore = keystore;
    this._signing = signing;
    this._pwDerivedKey = pwDerivedKey;
  }

 /**
  * Sign a personal message
  * 
  * @param address The address to sign with
  * @param message The message to sign
  */
  public async signPersonalMessageAsync(address: string, message: string): Promise<string> {
    try {
      const result: ECSignatureBuffer = await this._signing.signMsg(
        this._keystore, this._pwDerivedKey, message, address, this._keystore.hdPathString);

      const signature = this._signing.concatSig(result);

      return signature;
    } catch (err) {
      throw err;
    }
  }

 /**
  * Sign a transaction
  * 
  * @param txParams The transaction parameters
  */
  public async signTransactionAsync(txParams: PartialTxParams): Promise<string> {
    try {
      const tx = new EthereumTx(txParams);
      const txHex = tx.serialize().toString('hex');
      let signedTxHex: string = this._signing.signTx(
        this._keystore, this._pwDerivedKey, txHex, txParams.from, this._keystore.hdPathString);
        
      signedTxHex = `0x${signedTxHex}`;
      
      return signedTxHex;
    } catch (err) {
      throw err;
    }
  }
}