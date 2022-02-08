import { Signer } from 'ethers';
import * as types from './types';
export declare function getContract(address: string, abi: object, defaultSigner: Signer): any;
export declare type MainnetSdk = ReturnType<typeof getMainnetSdk>;
export declare function getMainnetSdk(defaultSigner: Signer): {
    FundingCycle: types.FundingCycle;
    Prices: types.Prices;
    Projects: types.Projects;
    TerminalV1: types.TerminalV1;
    TerminalV1_1: types.TerminalV11;
    OpenSea: types.OpenSea;
};
