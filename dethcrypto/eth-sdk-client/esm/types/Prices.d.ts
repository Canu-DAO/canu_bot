import { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PopulatedTransaction, Signer, utils } from "ethers";
import { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";
export interface PricesInterface extends utils.Interface {
    functions: {
        "addFeed(address,uint256)": FunctionFragment;
        "feedDecimalAdjuster(uint256)": FunctionFragment;
        "feedFor(uint256)": FunctionFragment;
        "getETHPriceFor(uint256)": FunctionFragment;
        "owner()": FunctionFragment;
        "renounceOwnership()": FunctionFragment;
        "targetDecimals()": FunctionFragment;
        "transferOwnership(address)": FunctionFragment;
    };
    encodeFunctionData(functionFragment: "addFeed", values: [string, BigNumberish]): string;
    encodeFunctionData(functionFragment: "feedDecimalAdjuster", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "feedFor", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "getETHPriceFor", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "owner", values?: undefined): string;
    encodeFunctionData(functionFragment: "renounceOwnership", values?: undefined): string;
    encodeFunctionData(functionFragment: "targetDecimals", values?: undefined): string;
    encodeFunctionData(functionFragment: "transferOwnership", values: [string]): string;
    decodeFunctionResult(functionFragment: "addFeed", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "feedDecimalAdjuster", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "feedFor", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getETHPriceFor", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "renounceOwnership", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "targetDecimals", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "transferOwnership", data: BytesLike): Result;
    events: {
        "AddFeed(uint256,address)": EventFragment;
        "OwnershipTransferred(address,address)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "AddFeed"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
}
export declare type AddFeedEvent = TypedEvent<[
    BigNumber,
    string
], {
    currency: BigNumber;
    feed: string;
}>;
export declare type AddFeedEventFilter = TypedEventFilter<AddFeedEvent>;
export declare type OwnershipTransferredEvent = TypedEvent<[
    string,
    string
], {
    previousOwner: string;
    newOwner: string;
}>;
export declare type OwnershipTransferredEventFilter = TypedEventFilter<OwnershipTransferredEvent>;
export interface Prices extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: PricesInterface;
    queryFilter<TEvent extends TypedEvent>(event: TypedEventFilter<TEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TEvent>>;
    listeners<TEvent extends TypedEvent>(eventFilter?: TypedEventFilter<TEvent>): Array<TypedListener<TEvent>>;
    listeners(eventName?: string): Array<Listener>;
    removeAllListeners<TEvent extends TypedEvent>(eventFilter: TypedEventFilter<TEvent>): this;
    removeAllListeners(eventName?: string): this;
    off: OnEvent<this>;
    on: OnEvent<this>;
    once: OnEvent<this>;
    removeListener: OnEvent<this>;
    functions: {
        addFeed(_feed: string, _currency: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        feedDecimalAdjuster(arg0: BigNumberish, overrides?: CallOverrides): Promise<[BigNumber]>;
        feedFor(arg0: BigNumberish, overrides?: CallOverrides): Promise<[string]>;
        getETHPriceFor(_currency: BigNumberish, overrides?: CallOverrides): Promise<[BigNumber]>;
        owner(overrides?: CallOverrides): Promise<[string]>;
        renounceOwnership(overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        targetDecimals(overrides?: CallOverrides): Promise<[BigNumber]>;
        transferOwnership(newOwner: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
    };
    addFeed(_feed: string, _currency: BigNumberish, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    feedDecimalAdjuster(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
    feedFor(arg0: BigNumberish, overrides?: CallOverrides): Promise<string>;
    getETHPriceFor(_currency: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
    owner(overrides?: CallOverrides): Promise<string>;
    renounceOwnership(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    targetDecimals(overrides?: CallOverrides): Promise<BigNumber>;
    transferOwnership(newOwner: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    callStatic: {
        addFeed(_feed: string, _currency: BigNumberish, overrides?: CallOverrides): Promise<void>;
        feedDecimalAdjuster(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        feedFor(arg0: BigNumberish, overrides?: CallOverrides): Promise<string>;
        getETHPriceFor(_currency: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        owner(overrides?: CallOverrides): Promise<string>;
        renounceOwnership(overrides?: CallOverrides): Promise<void>;
        targetDecimals(overrides?: CallOverrides): Promise<BigNumber>;
        transferOwnership(newOwner: string, overrides?: CallOverrides): Promise<void>;
    };
    filters: {
        "AddFeed(uint256,address)"(currency?: BigNumberish | null, feed?: string | null): AddFeedEventFilter;
        AddFeed(currency?: BigNumberish | null, feed?: string | null): AddFeedEventFilter;
        "OwnershipTransferred(address,address)"(previousOwner?: string | null, newOwner?: string | null): OwnershipTransferredEventFilter;
        OwnershipTransferred(previousOwner?: string | null, newOwner?: string | null): OwnershipTransferredEventFilter;
    };
    estimateGas: {
        addFeed(_feed: string, _currency: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        feedDecimalAdjuster(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        feedFor(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        getETHPriceFor(_currency: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        owner(overrides?: CallOverrides): Promise<BigNumber>;
        renounceOwnership(overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        targetDecimals(overrides?: CallOverrides): Promise<BigNumber>;
        transferOwnership(newOwner: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
    };
    populateTransaction: {
        addFeed(_feed: string, _currency: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        feedDecimalAdjuster(arg0: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        feedFor(arg0: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getETHPriceFor(_currency: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        renounceOwnership(overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        targetDecimals(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        transferOwnership(newOwner: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
    };
}
