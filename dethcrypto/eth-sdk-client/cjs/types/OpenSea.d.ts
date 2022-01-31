import { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PayableOverrides, PopulatedTransaction, Signer, utils } from "ethers";
import { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";
export interface OpenSeaInterface extends utils.Interface {
    functions: {
        "name()": FunctionFragment;
        "tokenTransferProxy()": FunctionFragment;
        "staticCall(address,bytes,bytes)": FunctionFragment;
        "changeMinimumMakerProtocolFee(uint256)": FunctionFragment;
        "changeMinimumTakerProtocolFee(uint256)": FunctionFragment;
        "guardedArrayReplace(bytes,bytes,bytes)": FunctionFragment;
        "minimumTakerProtocolFee()": FunctionFragment;
        "codename()": FunctionFragment;
        "testCopyAddress(address)": FunctionFragment;
        "testCopy(bytes)": FunctionFragment;
        "calculateCurrentPrice_(address[7],uint256[9],uint8,uint8,uint8,uint8,bytes,bytes,bytes)": FunctionFragment;
        "changeProtocolFeeRecipient(address)": FunctionFragment;
        "version()": FunctionFragment;
        "orderCalldataCanMatch(bytes,bytes,bytes,bytes)": FunctionFragment;
        "validateOrder_(address[7],uint256[9],uint8,uint8,uint8,uint8,bytes,bytes,bytes,uint8,bytes32,bytes32)": FunctionFragment;
        "calculateFinalPrice(uint8,uint8,uint256,uint256,uint256,uint256)": FunctionFragment;
        "protocolFeeRecipient()": FunctionFragment;
        "renounceOwnership()": FunctionFragment;
        "hashOrder_(address[7],uint256[9],uint8,uint8,uint8,uint8,bytes,bytes,bytes)": FunctionFragment;
        "ordersCanMatch_(address[14],uint256[18],uint8[8],bytes,bytes,bytes,bytes,bytes,bytes)": FunctionFragment;
        "approveOrder_(address[7],uint256[9],uint8,uint8,uint8,uint8,bytes,bytes,bytes,bool)": FunctionFragment;
        "registry()": FunctionFragment;
        "minimumMakerProtocolFee()": FunctionFragment;
        "hashToSign_(address[7],uint256[9],uint8,uint8,uint8,uint8,bytes,bytes,bytes)": FunctionFragment;
        "cancelledOrFinalized(bytes32)": FunctionFragment;
        "owner()": FunctionFragment;
        "exchangeToken()": FunctionFragment;
        "cancelOrder_(address[7],uint256[9],uint8,uint8,uint8,uint8,bytes,bytes,bytes,uint8,bytes32,bytes32)": FunctionFragment;
        "atomicMatch_(address[14],uint256[18],uint8[8],bytes,bytes,bytes,bytes,bytes,bytes,uint8[2],bytes32[5])": FunctionFragment;
        "validateOrderParameters_(address[7],uint256[9],uint8,uint8,uint8,uint8,bytes,bytes,bytes)": FunctionFragment;
        "INVERSE_BASIS_POINT()": FunctionFragment;
        "calculateMatchPrice_(address[14],uint256[18],uint8[8],bytes,bytes,bytes,bytes,bytes,bytes)": FunctionFragment;
        "approvedOrders(bytes32)": FunctionFragment;
        "transferOwnership(address)": FunctionFragment;
    };
    encodeFunctionData(functionFragment: "name", values?: undefined): string;
    encodeFunctionData(functionFragment: "tokenTransferProxy", values?: undefined): string;
    encodeFunctionData(functionFragment: "staticCall", values: [string, BytesLike, BytesLike]): string;
    encodeFunctionData(functionFragment: "changeMinimumMakerProtocolFee", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "changeMinimumTakerProtocolFee", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "guardedArrayReplace", values: [BytesLike, BytesLike, BytesLike]): string;
    encodeFunctionData(functionFragment: "minimumTakerProtocolFee", values?: undefined): string;
    encodeFunctionData(functionFragment: "codename", values?: undefined): string;
    encodeFunctionData(functionFragment: "testCopyAddress", values: [string]): string;
    encodeFunctionData(functionFragment: "testCopy", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "calculateCurrentPrice_", values: [
        string[],
        BigNumberish[],
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BytesLike,
        BytesLike,
        BytesLike
    ]): string;
    encodeFunctionData(functionFragment: "changeProtocolFeeRecipient", values: [string]): string;
    encodeFunctionData(functionFragment: "version", values?: undefined): string;
    encodeFunctionData(functionFragment: "orderCalldataCanMatch", values: [BytesLike, BytesLike, BytesLike, BytesLike]): string;
    encodeFunctionData(functionFragment: "validateOrder_", values: [
        string[],
        BigNumberish[],
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BytesLike,
        BytesLike,
        BytesLike,
        BigNumberish,
        BytesLike,
        BytesLike
    ]): string;
    encodeFunctionData(functionFragment: "calculateFinalPrice", values: [
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish
    ]): string;
    encodeFunctionData(functionFragment: "protocolFeeRecipient", values?: undefined): string;
    encodeFunctionData(functionFragment: "renounceOwnership", values?: undefined): string;
    encodeFunctionData(functionFragment: "hashOrder_", values: [
        string[],
        BigNumberish[],
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BytesLike,
        BytesLike,
        BytesLike
    ]): string;
    encodeFunctionData(functionFragment: "ordersCanMatch_", values: [
        string[],
        BigNumberish[],
        BigNumberish[],
        BytesLike,
        BytesLike,
        BytesLike,
        BytesLike,
        BytesLike,
        BytesLike
    ]): string;
    encodeFunctionData(functionFragment: "approveOrder_", values: [
        string[],
        BigNumberish[],
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BytesLike,
        BytesLike,
        BytesLike,
        boolean
    ]): string;
    encodeFunctionData(functionFragment: "registry", values?: undefined): string;
    encodeFunctionData(functionFragment: "minimumMakerProtocolFee", values?: undefined): string;
    encodeFunctionData(functionFragment: "hashToSign_", values: [
        string[],
        BigNumberish[],
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BytesLike,
        BytesLike,
        BytesLike
    ]): string;
    encodeFunctionData(functionFragment: "cancelledOrFinalized", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "owner", values?: undefined): string;
    encodeFunctionData(functionFragment: "exchangeToken", values?: undefined): string;
    encodeFunctionData(functionFragment: "cancelOrder_", values: [
        string[],
        BigNumberish[],
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BytesLike,
        BytesLike,
        BytesLike,
        BigNumberish,
        BytesLike,
        BytesLike
    ]): string;
    encodeFunctionData(functionFragment: "atomicMatch_", values: [
        string[],
        BigNumberish[],
        BigNumberish[],
        BytesLike,
        BytesLike,
        BytesLike,
        BytesLike,
        BytesLike,
        BytesLike,
        [
            BigNumberish,
            BigNumberish
        ],
        [
            BytesLike,
            BytesLike,
            BytesLike,
            BytesLike,
            BytesLike
        ]
    ]): string;
    encodeFunctionData(functionFragment: "validateOrderParameters_", values: [
        string[],
        BigNumberish[],
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BytesLike,
        BytesLike,
        BytesLike
    ]): string;
    encodeFunctionData(functionFragment: "INVERSE_BASIS_POINT", values?: undefined): string;
    encodeFunctionData(functionFragment: "calculateMatchPrice_", values: [
        string[],
        BigNumberish[],
        BigNumberish[],
        BytesLike,
        BytesLike,
        BytesLike,
        BytesLike,
        BytesLike,
        BytesLike
    ]): string;
    encodeFunctionData(functionFragment: "approvedOrders", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "transferOwnership", values: [string]): string;
    decodeFunctionResult(functionFragment: "name", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "tokenTransferProxy", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "staticCall", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "changeMinimumMakerProtocolFee", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "changeMinimumTakerProtocolFee", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "guardedArrayReplace", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "minimumTakerProtocolFee", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "codename", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "testCopyAddress", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "testCopy", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "calculateCurrentPrice_", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "changeProtocolFeeRecipient", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "version", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "orderCalldataCanMatch", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "validateOrder_", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "calculateFinalPrice", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "protocolFeeRecipient", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "renounceOwnership", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "hashOrder_", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "ordersCanMatch_", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "approveOrder_", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "registry", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "minimumMakerProtocolFee", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "hashToSign_", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "cancelledOrFinalized", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "exchangeToken", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "cancelOrder_", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "atomicMatch_", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "validateOrderParameters_", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "INVERSE_BASIS_POINT", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "calculateMatchPrice_", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "approvedOrders", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "transferOwnership", data: BytesLike): Result;
    events: {
        "OrderApprovedPartOne(bytes32,address,address,address,uint256,uint256,uint256,uint256,address,uint8,uint8,uint8,address)": EventFragment;
        "OrderApprovedPartTwo(bytes32,uint8,bytes,bytes,address,bytes,address,uint256,uint256,uint256,uint256,uint256,bool)": EventFragment;
        "OrderCancelled(bytes32)": EventFragment;
        "OrdersMatched(bytes32,bytes32,address,address,uint256,bytes32)": EventFragment;
        "OwnershipRenounced(address)": EventFragment;
        "OwnershipTransferred(address,address)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "OrderApprovedPartOne"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "OrderApprovedPartTwo"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "OrderCancelled"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "OrdersMatched"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "OwnershipRenounced"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
}
export declare type OrderApprovedPartOneEvent = TypedEvent<[
    string,
    string,
    string,
    string,
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber,
    string,
    number,
    number,
    number,
    string
], {
    hash: string;
    exchange: string;
    maker: string;
    taker: string;
    makerRelayerFee: BigNumber;
    takerRelayerFee: BigNumber;
    makerProtocolFee: BigNumber;
    takerProtocolFee: BigNumber;
    feeRecipient: string;
    feeMethod: number;
    side: number;
    saleKind: number;
    target: string;
}>;
export declare type OrderApprovedPartOneEventFilter = TypedEventFilter<OrderApprovedPartOneEvent>;
export declare type OrderApprovedPartTwoEvent = TypedEvent<[
    string,
    number,
    string,
    string,
    string,
    string,
    string,
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber,
    boolean
], {
    hash: string;
    howToCall: number;
    calldata: string;
    replacementPattern: string;
    staticTarget: string;
    staticExtradata: string;
    paymentToken: string;
    basePrice: BigNumber;
    extra: BigNumber;
    listingTime: BigNumber;
    expirationTime: BigNumber;
    salt: BigNumber;
    orderbookInclusionDesired: boolean;
}>;
export declare type OrderApprovedPartTwoEventFilter = TypedEventFilter<OrderApprovedPartTwoEvent>;
export declare type OrderCancelledEvent = TypedEvent<[string], {
    hash: string;
}>;
export declare type OrderCancelledEventFilter = TypedEventFilter<OrderCancelledEvent>;
export declare type OrdersMatchedEvent = TypedEvent<[
    string,
    string,
    string,
    string,
    BigNumber,
    string
], {
    buyHash: string;
    sellHash: string;
    maker: string;
    taker: string;
    price: BigNumber;
    metadata: string;
}>;
export declare type OrdersMatchedEventFilter = TypedEventFilter<OrdersMatchedEvent>;
export declare type OwnershipRenouncedEvent = TypedEvent<[
    string
], {
    previousOwner: string;
}>;
export declare type OwnershipRenouncedEventFilter = TypedEventFilter<OwnershipRenouncedEvent>;
export declare type OwnershipTransferredEvent = TypedEvent<[
    string,
    string
], {
    previousOwner: string;
    newOwner: string;
}>;
export declare type OwnershipTransferredEventFilter = TypedEventFilter<OwnershipTransferredEvent>;
export interface OpenSea extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: OpenSeaInterface;
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
        name(overrides?: CallOverrides): Promise<[string]>;
        tokenTransferProxy(overrides?: CallOverrides): Promise<[string]>;
        staticCall(target: string, calldata: BytesLike, extradata: BytesLike, overrides?: CallOverrides): Promise<[boolean] & {
            result: boolean;
        }>;
        changeMinimumMakerProtocolFee(newMinimumMakerProtocolFee: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        changeMinimumTakerProtocolFee(newMinimumTakerProtocolFee: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        guardedArrayReplace(array: BytesLike, desired: BytesLike, mask: BytesLike, overrides?: CallOverrides): Promise<[string]>;
        minimumTakerProtocolFee(overrides?: CallOverrides): Promise<[BigNumber]>;
        codename(overrides?: CallOverrides): Promise<[string]>;
        testCopyAddress(addr: string, overrides?: CallOverrides): Promise<[string]>;
        testCopy(arrToCopy: BytesLike, overrides?: CallOverrides): Promise<[string]>;
        calculateCurrentPrice_(addrs: string[], uints: BigNumberish[], feeMethod: BigNumberish, side: BigNumberish, saleKind: BigNumberish, howToCall: BigNumberish, calldata: BytesLike, replacementPattern: BytesLike, staticExtradata: BytesLike, overrides?: CallOverrides): Promise<[BigNumber]>;
        changeProtocolFeeRecipient(newProtocolFeeRecipient: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        version(overrides?: CallOverrides): Promise<[string]>;
        orderCalldataCanMatch(buyCalldata: BytesLike, buyReplacementPattern: BytesLike, sellCalldata: BytesLike, sellReplacementPattern: BytesLike, overrides?: CallOverrides): Promise<[boolean]>;
        validateOrder_(addrs: string[], uints: BigNumberish[], feeMethod: BigNumberish, side: BigNumberish, saleKind: BigNumberish, howToCall: BigNumberish, calldata: BytesLike, replacementPattern: BytesLike, staticExtradata: BytesLike, v: BigNumberish, r: BytesLike, s: BytesLike, overrides?: CallOverrides): Promise<[boolean]>;
        calculateFinalPrice(side: BigNumberish, saleKind: BigNumberish, basePrice: BigNumberish, extra: BigNumberish, listingTime: BigNumberish, expirationTime: BigNumberish, overrides?: CallOverrides): Promise<[BigNumber]>;
        protocolFeeRecipient(overrides?: CallOverrides): Promise<[string]>;
        renounceOwnership(overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        hashOrder_(addrs: string[], uints: BigNumberish[], feeMethod: BigNumberish, side: BigNumberish, saleKind: BigNumberish, howToCall: BigNumberish, calldata: BytesLike, replacementPattern: BytesLike, staticExtradata: BytesLike, overrides?: CallOverrides): Promise<[string]>;
        ordersCanMatch_(addrs: string[], uints: BigNumberish[], feeMethodsSidesKindsHowToCalls: BigNumberish[], calldataBuy: BytesLike, calldataSell: BytesLike, replacementPatternBuy: BytesLike, replacementPatternSell: BytesLike, staticExtradataBuy: BytesLike, staticExtradataSell: BytesLike, overrides?: CallOverrides): Promise<[boolean]>;
        approveOrder_(addrs: string[], uints: BigNumberish[], feeMethod: BigNumberish, side: BigNumberish, saleKind: BigNumberish, howToCall: BigNumberish, calldata: BytesLike, replacementPattern: BytesLike, staticExtradata: BytesLike, orderbookInclusionDesired: boolean, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        registry(overrides?: CallOverrides): Promise<[string]>;
        minimumMakerProtocolFee(overrides?: CallOverrides): Promise<[BigNumber]>;
        hashToSign_(addrs: string[], uints: BigNumberish[], feeMethod: BigNumberish, side: BigNumberish, saleKind: BigNumberish, howToCall: BigNumberish, calldata: BytesLike, replacementPattern: BytesLike, staticExtradata: BytesLike, overrides?: CallOverrides): Promise<[string]>;
        cancelledOrFinalized(arg0: BytesLike, overrides?: CallOverrides): Promise<[boolean]>;
        owner(overrides?: CallOverrides): Promise<[string]>;
        exchangeToken(overrides?: CallOverrides): Promise<[string]>;
        cancelOrder_(addrs: string[], uints: BigNumberish[], feeMethod: BigNumberish, side: BigNumberish, saleKind: BigNumberish, howToCall: BigNumberish, calldata: BytesLike, replacementPattern: BytesLike, staticExtradata: BytesLike, v: BigNumberish, r: BytesLike, s: BytesLike, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        atomicMatch_(addrs: string[], uints: BigNumberish[], feeMethodsSidesKindsHowToCalls: BigNumberish[], calldataBuy: BytesLike, calldataSell: BytesLike, replacementPatternBuy: BytesLike, replacementPatternSell: BytesLike, staticExtradataBuy: BytesLike, staticExtradataSell: BytesLike, vs: [BigNumberish, BigNumberish], rssMetadata: [BytesLike, BytesLike, BytesLike, BytesLike, BytesLike], overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        validateOrderParameters_(addrs: string[], uints: BigNumberish[], feeMethod: BigNumberish, side: BigNumberish, saleKind: BigNumberish, howToCall: BigNumberish, calldata: BytesLike, replacementPattern: BytesLike, staticExtradata: BytesLike, overrides?: CallOverrides): Promise<[boolean]>;
        INVERSE_BASIS_POINT(overrides?: CallOverrides): Promise<[BigNumber]>;
        calculateMatchPrice_(addrs: string[], uints: BigNumberish[], feeMethodsSidesKindsHowToCalls: BigNumberish[], calldataBuy: BytesLike, calldataSell: BytesLike, replacementPatternBuy: BytesLike, replacementPatternSell: BytesLike, staticExtradataBuy: BytesLike, staticExtradataSell: BytesLike, overrides?: CallOverrides): Promise<[BigNumber]>;
        approvedOrders(arg0: BytesLike, overrides?: CallOverrides): Promise<[boolean]>;
        transferOwnership(newOwner: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
    };
    name(overrides?: CallOverrides): Promise<string>;
    tokenTransferProxy(overrides?: CallOverrides): Promise<string>;
    staticCall(target: string, calldata: BytesLike, extradata: BytesLike, overrides?: CallOverrides): Promise<boolean>;
    changeMinimumMakerProtocolFee(newMinimumMakerProtocolFee: BigNumberish, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    changeMinimumTakerProtocolFee(newMinimumTakerProtocolFee: BigNumberish, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    guardedArrayReplace(array: BytesLike, desired: BytesLike, mask: BytesLike, overrides?: CallOverrides): Promise<string>;
    minimumTakerProtocolFee(overrides?: CallOverrides): Promise<BigNumber>;
    codename(overrides?: CallOverrides): Promise<string>;
    testCopyAddress(addr: string, overrides?: CallOverrides): Promise<string>;
    testCopy(arrToCopy: BytesLike, overrides?: CallOverrides): Promise<string>;
    calculateCurrentPrice_(addrs: string[], uints: BigNumberish[], feeMethod: BigNumberish, side: BigNumberish, saleKind: BigNumberish, howToCall: BigNumberish, calldata: BytesLike, replacementPattern: BytesLike, staticExtradata: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;
    changeProtocolFeeRecipient(newProtocolFeeRecipient: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    version(overrides?: CallOverrides): Promise<string>;
    orderCalldataCanMatch(buyCalldata: BytesLike, buyReplacementPattern: BytesLike, sellCalldata: BytesLike, sellReplacementPattern: BytesLike, overrides?: CallOverrides): Promise<boolean>;
    validateOrder_(addrs: string[], uints: BigNumberish[], feeMethod: BigNumberish, side: BigNumberish, saleKind: BigNumberish, howToCall: BigNumberish, calldata: BytesLike, replacementPattern: BytesLike, staticExtradata: BytesLike, v: BigNumberish, r: BytesLike, s: BytesLike, overrides?: CallOverrides): Promise<boolean>;
    calculateFinalPrice(side: BigNumberish, saleKind: BigNumberish, basePrice: BigNumberish, extra: BigNumberish, listingTime: BigNumberish, expirationTime: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
    protocolFeeRecipient(overrides?: CallOverrides): Promise<string>;
    renounceOwnership(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    hashOrder_(addrs: string[], uints: BigNumberish[], feeMethod: BigNumberish, side: BigNumberish, saleKind: BigNumberish, howToCall: BigNumberish, calldata: BytesLike, replacementPattern: BytesLike, staticExtradata: BytesLike, overrides?: CallOverrides): Promise<string>;
    ordersCanMatch_(addrs: string[], uints: BigNumberish[], feeMethodsSidesKindsHowToCalls: BigNumberish[], calldataBuy: BytesLike, calldataSell: BytesLike, replacementPatternBuy: BytesLike, replacementPatternSell: BytesLike, staticExtradataBuy: BytesLike, staticExtradataSell: BytesLike, overrides?: CallOverrides): Promise<boolean>;
    approveOrder_(addrs: string[], uints: BigNumberish[], feeMethod: BigNumberish, side: BigNumberish, saleKind: BigNumberish, howToCall: BigNumberish, calldata: BytesLike, replacementPattern: BytesLike, staticExtradata: BytesLike, orderbookInclusionDesired: boolean, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    registry(overrides?: CallOverrides): Promise<string>;
    minimumMakerProtocolFee(overrides?: CallOverrides): Promise<BigNumber>;
    hashToSign_(addrs: string[], uints: BigNumberish[], feeMethod: BigNumberish, side: BigNumberish, saleKind: BigNumberish, howToCall: BigNumberish, calldata: BytesLike, replacementPattern: BytesLike, staticExtradata: BytesLike, overrides?: CallOverrides): Promise<string>;
    cancelledOrFinalized(arg0: BytesLike, overrides?: CallOverrides): Promise<boolean>;
    owner(overrides?: CallOverrides): Promise<string>;
    exchangeToken(overrides?: CallOverrides): Promise<string>;
    cancelOrder_(addrs: string[], uints: BigNumberish[], feeMethod: BigNumberish, side: BigNumberish, saleKind: BigNumberish, howToCall: BigNumberish, calldata: BytesLike, replacementPattern: BytesLike, staticExtradata: BytesLike, v: BigNumberish, r: BytesLike, s: BytesLike, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    atomicMatch_(addrs: string[], uints: BigNumberish[], feeMethodsSidesKindsHowToCalls: BigNumberish[], calldataBuy: BytesLike, calldataSell: BytesLike, replacementPatternBuy: BytesLike, replacementPatternSell: BytesLike, staticExtradataBuy: BytesLike, staticExtradataSell: BytesLike, vs: [BigNumberish, BigNumberish], rssMetadata: [BytesLike, BytesLike, BytesLike, BytesLike, BytesLike], overrides?: PayableOverrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    validateOrderParameters_(addrs: string[], uints: BigNumberish[], feeMethod: BigNumberish, side: BigNumberish, saleKind: BigNumberish, howToCall: BigNumberish, calldata: BytesLike, replacementPattern: BytesLike, staticExtradata: BytesLike, overrides?: CallOverrides): Promise<boolean>;
    INVERSE_BASIS_POINT(overrides?: CallOverrides): Promise<BigNumber>;
    calculateMatchPrice_(addrs: string[], uints: BigNumberish[], feeMethodsSidesKindsHowToCalls: BigNumberish[], calldataBuy: BytesLike, calldataSell: BytesLike, replacementPatternBuy: BytesLike, replacementPatternSell: BytesLike, staticExtradataBuy: BytesLike, staticExtradataSell: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;
    approvedOrders(arg0: BytesLike, overrides?: CallOverrides): Promise<boolean>;
    transferOwnership(newOwner: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    callStatic: {
        name(overrides?: CallOverrides): Promise<string>;
        tokenTransferProxy(overrides?: CallOverrides): Promise<string>;
        staticCall(target: string, calldata: BytesLike, extradata: BytesLike, overrides?: CallOverrides): Promise<boolean>;
        changeMinimumMakerProtocolFee(newMinimumMakerProtocolFee: BigNumberish, overrides?: CallOverrides): Promise<void>;
        changeMinimumTakerProtocolFee(newMinimumTakerProtocolFee: BigNumberish, overrides?: CallOverrides): Promise<void>;
        guardedArrayReplace(array: BytesLike, desired: BytesLike, mask: BytesLike, overrides?: CallOverrides): Promise<string>;
        minimumTakerProtocolFee(overrides?: CallOverrides): Promise<BigNumber>;
        codename(overrides?: CallOverrides): Promise<string>;
        testCopyAddress(addr: string, overrides?: CallOverrides): Promise<string>;
        testCopy(arrToCopy: BytesLike, overrides?: CallOverrides): Promise<string>;
        calculateCurrentPrice_(addrs: string[], uints: BigNumberish[], feeMethod: BigNumberish, side: BigNumberish, saleKind: BigNumberish, howToCall: BigNumberish, calldata: BytesLike, replacementPattern: BytesLike, staticExtradata: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;
        changeProtocolFeeRecipient(newProtocolFeeRecipient: string, overrides?: CallOverrides): Promise<void>;
        version(overrides?: CallOverrides): Promise<string>;
        orderCalldataCanMatch(buyCalldata: BytesLike, buyReplacementPattern: BytesLike, sellCalldata: BytesLike, sellReplacementPattern: BytesLike, overrides?: CallOverrides): Promise<boolean>;
        validateOrder_(addrs: string[], uints: BigNumberish[], feeMethod: BigNumberish, side: BigNumberish, saleKind: BigNumberish, howToCall: BigNumberish, calldata: BytesLike, replacementPattern: BytesLike, staticExtradata: BytesLike, v: BigNumberish, r: BytesLike, s: BytesLike, overrides?: CallOverrides): Promise<boolean>;
        calculateFinalPrice(side: BigNumberish, saleKind: BigNumberish, basePrice: BigNumberish, extra: BigNumberish, listingTime: BigNumberish, expirationTime: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        protocolFeeRecipient(overrides?: CallOverrides): Promise<string>;
        renounceOwnership(overrides?: CallOverrides): Promise<void>;
        hashOrder_(addrs: string[], uints: BigNumberish[], feeMethod: BigNumberish, side: BigNumberish, saleKind: BigNumberish, howToCall: BigNumberish, calldata: BytesLike, replacementPattern: BytesLike, staticExtradata: BytesLike, overrides?: CallOverrides): Promise<string>;
        ordersCanMatch_(addrs: string[], uints: BigNumberish[], feeMethodsSidesKindsHowToCalls: BigNumberish[], calldataBuy: BytesLike, calldataSell: BytesLike, replacementPatternBuy: BytesLike, replacementPatternSell: BytesLike, staticExtradataBuy: BytesLike, staticExtradataSell: BytesLike, overrides?: CallOverrides): Promise<boolean>;
        approveOrder_(addrs: string[], uints: BigNumberish[], feeMethod: BigNumberish, side: BigNumberish, saleKind: BigNumberish, howToCall: BigNumberish, calldata: BytesLike, replacementPattern: BytesLike, staticExtradata: BytesLike, orderbookInclusionDesired: boolean, overrides?: CallOverrides): Promise<void>;
        registry(overrides?: CallOverrides): Promise<string>;
        minimumMakerProtocolFee(overrides?: CallOverrides): Promise<BigNumber>;
        hashToSign_(addrs: string[], uints: BigNumberish[], feeMethod: BigNumberish, side: BigNumberish, saleKind: BigNumberish, howToCall: BigNumberish, calldata: BytesLike, replacementPattern: BytesLike, staticExtradata: BytesLike, overrides?: CallOverrides): Promise<string>;
        cancelledOrFinalized(arg0: BytesLike, overrides?: CallOverrides): Promise<boolean>;
        owner(overrides?: CallOverrides): Promise<string>;
        exchangeToken(overrides?: CallOverrides): Promise<string>;
        cancelOrder_(addrs: string[], uints: BigNumberish[], feeMethod: BigNumberish, side: BigNumberish, saleKind: BigNumberish, howToCall: BigNumberish, calldata: BytesLike, replacementPattern: BytesLike, staticExtradata: BytesLike, v: BigNumberish, r: BytesLike, s: BytesLike, overrides?: CallOverrides): Promise<void>;
        atomicMatch_(addrs: string[], uints: BigNumberish[], feeMethodsSidesKindsHowToCalls: BigNumberish[], calldataBuy: BytesLike, calldataSell: BytesLike, replacementPatternBuy: BytesLike, replacementPatternSell: BytesLike, staticExtradataBuy: BytesLike, staticExtradataSell: BytesLike, vs: [BigNumberish, BigNumberish], rssMetadata: [BytesLike, BytesLike, BytesLike, BytesLike, BytesLike], overrides?: CallOverrides): Promise<void>;
        validateOrderParameters_(addrs: string[], uints: BigNumberish[], feeMethod: BigNumberish, side: BigNumberish, saleKind: BigNumberish, howToCall: BigNumberish, calldata: BytesLike, replacementPattern: BytesLike, staticExtradata: BytesLike, overrides?: CallOverrides): Promise<boolean>;
        INVERSE_BASIS_POINT(overrides?: CallOverrides): Promise<BigNumber>;
        calculateMatchPrice_(addrs: string[], uints: BigNumberish[], feeMethodsSidesKindsHowToCalls: BigNumberish[], calldataBuy: BytesLike, calldataSell: BytesLike, replacementPatternBuy: BytesLike, replacementPatternSell: BytesLike, staticExtradataBuy: BytesLike, staticExtradataSell: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;
        approvedOrders(arg0: BytesLike, overrides?: CallOverrides): Promise<boolean>;
        transferOwnership(newOwner: string, overrides?: CallOverrides): Promise<void>;
    };
    filters: {
        "OrderApprovedPartOne(bytes32,address,address,address,uint256,uint256,uint256,uint256,address,uint8,uint8,uint8,address)"(hash?: BytesLike | null, exchange?: null, maker?: string | null, taker?: null, makerRelayerFee?: null, takerRelayerFee?: null, makerProtocolFee?: null, takerProtocolFee?: null, feeRecipient?: string | null, feeMethod?: null, side?: null, saleKind?: null, target?: null): OrderApprovedPartOneEventFilter;
        OrderApprovedPartOne(hash?: BytesLike | null, exchange?: null, maker?: string | null, taker?: null, makerRelayerFee?: null, takerRelayerFee?: null, makerProtocolFee?: null, takerProtocolFee?: null, feeRecipient?: string | null, feeMethod?: null, side?: null, saleKind?: null, target?: null): OrderApprovedPartOneEventFilter;
        "OrderApprovedPartTwo(bytes32,uint8,bytes,bytes,address,bytes,address,uint256,uint256,uint256,uint256,uint256,bool)"(hash?: BytesLike | null, howToCall?: null, calldata?: null, replacementPattern?: null, staticTarget?: null, staticExtradata?: null, paymentToken?: null, basePrice?: null, extra?: null, listingTime?: null, expirationTime?: null, salt?: null, orderbookInclusionDesired?: null): OrderApprovedPartTwoEventFilter;
        OrderApprovedPartTwo(hash?: BytesLike | null, howToCall?: null, calldata?: null, replacementPattern?: null, staticTarget?: null, staticExtradata?: null, paymentToken?: null, basePrice?: null, extra?: null, listingTime?: null, expirationTime?: null, salt?: null, orderbookInclusionDesired?: null): OrderApprovedPartTwoEventFilter;
        "OrderCancelled(bytes32)"(hash?: BytesLike | null): OrderCancelledEventFilter;
        OrderCancelled(hash?: BytesLike | null): OrderCancelledEventFilter;
        "OrdersMatched(bytes32,bytes32,address,address,uint256,bytes32)"(buyHash?: null, sellHash?: null, maker?: string | null, taker?: string | null, price?: null, metadata?: BytesLike | null): OrdersMatchedEventFilter;
        OrdersMatched(buyHash?: null, sellHash?: null, maker?: string | null, taker?: string | null, price?: null, metadata?: BytesLike | null): OrdersMatchedEventFilter;
        "OwnershipRenounced(address)"(previousOwner?: string | null): OwnershipRenouncedEventFilter;
        OwnershipRenounced(previousOwner?: string | null): OwnershipRenouncedEventFilter;
        "OwnershipTransferred(address,address)"(previousOwner?: string | null, newOwner?: string | null): OwnershipTransferredEventFilter;
        OwnershipTransferred(previousOwner?: string | null, newOwner?: string | null): OwnershipTransferredEventFilter;
    };
    estimateGas: {
        name(overrides?: CallOverrides): Promise<BigNumber>;
        tokenTransferProxy(overrides?: CallOverrides): Promise<BigNumber>;
        staticCall(target: string, calldata: BytesLike, extradata: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;
        changeMinimumMakerProtocolFee(newMinimumMakerProtocolFee: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        changeMinimumTakerProtocolFee(newMinimumTakerProtocolFee: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        guardedArrayReplace(array: BytesLike, desired: BytesLike, mask: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;
        minimumTakerProtocolFee(overrides?: CallOverrides): Promise<BigNumber>;
        codename(overrides?: CallOverrides): Promise<BigNumber>;
        testCopyAddress(addr: string, overrides?: CallOverrides): Promise<BigNumber>;
        testCopy(arrToCopy: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;
        calculateCurrentPrice_(addrs: string[], uints: BigNumberish[], feeMethod: BigNumberish, side: BigNumberish, saleKind: BigNumberish, howToCall: BigNumberish, calldata: BytesLike, replacementPattern: BytesLike, staticExtradata: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;
        changeProtocolFeeRecipient(newProtocolFeeRecipient: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        version(overrides?: CallOverrides): Promise<BigNumber>;
        orderCalldataCanMatch(buyCalldata: BytesLike, buyReplacementPattern: BytesLike, sellCalldata: BytesLike, sellReplacementPattern: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;
        validateOrder_(addrs: string[], uints: BigNumberish[], feeMethod: BigNumberish, side: BigNumberish, saleKind: BigNumberish, howToCall: BigNumberish, calldata: BytesLike, replacementPattern: BytesLike, staticExtradata: BytesLike, v: BigNumberish, r: BytesLike, s: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;
        calculateFinalPrice(side: BigNumberish, saleKind: BigNumberish, basePrice: BigNumberish, extra: BigNumberish, listingTime: BigNumberish, expirationTime: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        protocolFeeRecipient(overrides?: CallOverrides): Promise<BigNumber>;
        renounceOwnership(overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        hashOrder_(addrs: string[], uints: BigNumberish[], feeMethod: BigNumberish, side: BigNumberish, saleKind: BigNumberish, howToCall: BigNumberish, calldata: BytesLike, replacementPattern: BytesLike, staticExtradata: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;
        ordersCanMatch_(addrs: string[], uints: BigNumberish[], feeMethodsSidesKindsHowToCalls: BigNumberish[], calldataBuy: BytesLike, calldataSell: BytesLike, replacementPatternBuy: BytesLike, replacementPatternSell: BytesLike, staticExtradataBuy: BytesLike, staticExtradataSell: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;
        approveOrder_(addrs: string[], uints: BigNumberish[], feeMethod: BigNumberish, side: BigNumberish, saleKind: BigNumberish, howToCall: BigNumberish, calldata: BytesLike, replacementPattern: BytesLike, staticExtradata: BytesLike, orderbookInclusionDesired: boolean, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        registry(overrides?: CallOverrides): Promise<BigNumber>;
        minimumMakerProtocolFee(overrides?: CallOverrides): Promise<BigNumber>;
        hashToSign_(addrs: string[], uints: BigNumberish[], feeMethod: BigNumberish, side: BigNumberish, saleKind: BigNumberish, howToCall: BigNumberish, calldata: BytesLike, replacementPattern: BytesLike, staticExtradata: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;
        cancelledOrFinalized(arg0: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;
        owner(overrides?: CallOverrides): Promise<BigNumber>;
        exchangeToken(overrides?: CallOverrides): Promise<BigNumber>;
        cancelOrder_(addrs: string[], uints: BigNumberish[], feeMethod: BigNumberish, side: BigNumberish, saleKind: BigNumberish, howToCall: BigNumberish, calldata: BytesLike, replacementPattern: BytesLike, staticExtradata: BytesLike, v: BigNumberish, r: BytesLike, s: BytesLike, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        atomicMatch_(addrs: string[], uints: BigNumberish[], feeMethodsSidesKindsHowToCalls: BigNumberish[], calldataBuy: BytesLike, calldataSell: BytesLike, replacementPatternBuy: BytesLike, replacementPatternSell: BytesLike, staticExtradataBuy: BytesLike, staticExtradataSell: BytesLike, vs: [BigNumberish, BigNumberish], rssMetadata: [BytesLike, BytesLike, BytesLike, BytesLike, BytesLike], overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        validateOrderParameters_(addrs: string[], uints: BigNumberish[], feeMethod: BigNumberish, side: BigNumberish, saleKind: BigNumberish, howToCall: BigNumberish, calldata: BytesLike, replacementPattern: BytesLike, staticExtradata: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;
        INVERSE_BASIS_POINT(overrides?: CallOverrides): Promise<BigNumber>;
        calculateMatchPrice_(addrs: string[], uints: BigNumberish[], feeMethodsSidesKindsHowToCalls: BigNumberish[], calldataBuy: BytesLike, calldataSell: BytesLike, replacementPatternBuy: BytesLike, replacementPatternSell: BytesLike, staticExtradataBuy: BytesLike, staticExtradataSell: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;
        approvedOrders(arg0: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;
        transferOwnership(newOwner: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
    };
    populateTransaction: {
        name(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        tokenTransferProxy(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        staticCall(target: string, calldata: BytesLike, extradata: BytesLike, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        changeMinimumMakerProtocolFee(newMinimumMakerProtocolFee: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        changeMinimumTakerProtocolFee(newMinimumTakerProtocolFee: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        guardedArrayReplace(array: BytesLike, desired: BytesLike, mask: BytesLike, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        minimumTakerProtocolFee(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        codename(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        testCopyAddress(addr: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        testCopy(arrToCopy: BytesLike, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        calculateCurrentPrice_(addrs: string[], uints: BigNumberish[], feeMethod: BigNumberish, side: BigNumberish, saleKind: BigNumberish, howToCall: BigNumberish, calldata: BytesLike, replacementPattern: BytesLike, staticExtradata: BytesLike, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        changeProtocolFeeRecipient(newProtocolFeeRecipient: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        version(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        orderCalldataCanMatch(buyCalldata: BytesLike, buyReplacementPattern: BytesLike, sellCalldata: BytesLike, sellReplacementPattern: BytesLike, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        validateOrder_(addrs: string[], uints: BigNumberish[], feeMethod: BigNumberish, side: BigNumberish, saleKind: BigNumberish, howToCall: BigNumberish, calldata: BytesLike, replacementPattern: BytesLike, staticExtradata: BytesLike, v: BigNumberish, r: BytesLike, s: BytesLike, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        calculateFinalPrice(side: BigNumberish, saleKind: BigNumberish, basePrice: BigNumberish, extra: BigNumberish, listingTime: BigNumberish, expirationTime: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        protocolFeeRecipient(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        renounceOwnership(overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        hashOrder_(addrs: string[], uints: BigNumberish[], feeMethod: BigNumberish, side: BigNumberish, saleKind: BigNumberish, howToCall: BigNumberish, calldata: BytesLike, replacementPattern: BytesLike, staticExtradata: BytesLike, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        ordersCanMatch_(addrs: string[], uints: BigNumberish[], feeMethodsSidesKindsHowToCalls: BigNumberish[], calldataBuy: BytesLike, calldataSell: BytesLike, replacementPatternBuy: BytesLike, replacementPatternSell: BytesLike, staticExtradataBuy: BytesLike, staticExtradataSell: BytesLike, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        approveOrder_(addrs: string[], uints: BigNumberish[], feeMethod: BigNumberish, side: BigNumberish, saleKind: BigNumberish, howToCall: BigNumberish, calldata: BytesLike, replacementPattern: BytesLike, staticExtradata: BytesLike, orderbookInclusionDesired: boolean, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        registry(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        minimumMakerProtocolFee(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        hashToSign_(addrs: string[], uints: BigNumberish[], feeMethod: BigNumberish, side: BigNumberish, saleKind: BigNumberish, howToCall: BigNumberish, calldata: BytesLike, replacementPattern: BytesLike, staticExtradata: BytesLike, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        cancelledOrFinalized(arg0: BytesLike, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        exchangeToken(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        cancelOrder_(addrs: string[], uints: BigNumberish[], feeMethod: BigNumberish, side: BigNumberish, saleKind: BigNumberish, howToCall: BigNumberish, calldata: BytesLike, replacementPattern: BytesLike, staticExtradata: BytesLike, v: BigNumberish, r: BytesLike, s: BytesLike, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        atomicMatch_(addrs: string[], uints: BigNumberish[], feeMethodsSidesKindsHowToCalls: BigNumberish[], calldataBuy: BytesLike, calldataSell: BytesLike, replacementPatternBuy: BytesLike, replacementPatternSell: BytesLike, staticExtradataBuy: BytesLike, staticExtradataSell: BytesLike, vs: [BigNumberish, BigNumberish], rssMetadata: [BytesLike, BytesLike, BytesLike, BytesLike, BytesLike], overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        validateOrderParameters_(addrs: string[], uints: BigNumberish[], feeMethod: BigNumberish, side: BigNumberish, saleKind: BigNumberish, howToCall: BigNumberish, calldata: BytesLike, replacementPattern: BytesLike, staticExtradata: BytesLike, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        INVERSE_BASIS_POINT(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        calculateMatchPrice_(addrs: string[], uints: BigNumberish[], feeMethodsSidesKindsHowToCalls: BigNumberish[], calldataBuy: BytesLike, calldataSell: BytesLike, replacementPatternBuy: BytesLike, replacementPatternSell: BytesLike, staticExtradataBuy: BytesLike, staticExtradataSell: BytesLike, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        approvedOrders(arg0: BytesLike, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        transferOwnership(newOwner: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
    };
}
