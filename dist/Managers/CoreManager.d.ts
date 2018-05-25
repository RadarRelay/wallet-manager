import { CoreWalletOptions } from '../types';
import { CoreWallet } from '../wallets/CoreWallet';
import { CoreBase } from '../shared/CoreBase';
export declare class CoreManager extends CoreBase {
    /**
     * Creates a new core wallet and saves it in local storage
     *
     * @param options CoreWallet initialization options
     */
    createWalletAsync(options: CoreWalletOptions): Promise<CoreWallet>;
    /**
     * Save the wallet
     *
     * @param {CoreWallet} wallet The wallet instance
     */
    saveWallet(wallet: CoreWallet): void;
    /**
     * Loads a wallet from local storage
     *
     * @param {string} password The plaintext password
     */
    loadWalletAsync(password: string): Promise<CoreWallet>;
    /**
     * Initializes a new eth-lightwallet keystore
     *
     * @param {CoreWalletOptions} options CoreWallet initialization options
     */
    private initializeKeystoreAsync(options);
    /**
     * Populate the missing wallet options
     *
     * @param {CoreWalletOptions} options CoreWallet initialization options
     */
    private populateMissingOptions(options);
    /**
     * Throw the appropriate exception on error
     *
     * @param {WalletError[]} errors An array of possible WalletErrors
     */
    private throwOnError(...errors);
    /**
     * Validate the seed or throw an InvalidSeed exception
     *
     * @param {string} seed The seed to validate
     */
    private validateSeedPhraseOrThrow(seed);
}
