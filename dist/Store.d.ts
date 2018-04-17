import { CoreWallet } from './wallets/CoreWallet';
export declare class Store {
    /**
     * Check if local storage is supported
     *
     *
     */
    isLocalStorageSupported(): boolean;
    /**
     * Save the encrypted wallet in local storage
     *
     * @param wallet The wallet to save
     * @param keyName The key identifier
     */
    saveCoreWallet(wallet: CoreWallet, keyName?: string): boolean;
    /**
     * Load the encrypted wallet from local storage
     *
     * @param keyName The key identifier
     */
    loadCoreWallet(keyName?: string): any;
}
