/// <reference types="node" />
export interface CoreWalletOptions {
    password: string;
    seedPhrase?: string;
    salt?: string;
    hdPathString?: string;
}
export interface ECSignatureBuffer {
    v: number;
    r: Buffer;
    s: Buffer;
}
export interface PartialTxParams {
    nonce: string;
    gasPrice?: string;
    gas: string;
    to: string;
    from?: string;
    value?: string;
    data?: string;
    chainId: number;
}
export interface MsgParams {
    from: string;
    data: string;
}
export interface UnsignedPayload {
    type: PayloadType;
    params: PartialTxParams | MsgParams;
}
export interface JSONRPCPayload {
    params: any[];
    method: string;
}
export interface Signer {
    signPersonalMessageAsync(address: string, message: string): Promise<string>;
    signTransactionAsync(txParams: PartialTxParams): Promise<string>;
}
export interface Wallet {
    type: WalletType;
    signer: Signer;
}
export interface TransactionManager {
    signTransactionAsync(unsignedTx: UnsignedPayload): Promise<any>;
    signMessageAsync(unsignedMsg: UnsignedPayload): Promise<any>;
}
export declare enum PayloadType {
    Tx = 0,
    Msg = 1,
    PersonalMsg = 2,
}
export declare enum WalletError {
    LocalStorageDisabled = "LOCAL_STORAGE_DISABLED",
    NoWalletFound = "NO_WALLET_FOUND",
    InvalidSeed = "INVALID_SEED",
    InvalidPassword = "INVALID_PASSWORD",
}
export declare enum SigningError {
    UserDeclined = "USER_DECLINED",
}
export declare enum WalletType {
    Core = 0,
    Ledger = 1,
}
export declare enum InfuraNetwork {
    Mainnet = "mainnet",
    Kovan = "kovan",
    Rinkeby = "rinkeby",
    Ropsten = "ropsten",
}
export declare type RpcConnection = string | InfuraNetwork;
