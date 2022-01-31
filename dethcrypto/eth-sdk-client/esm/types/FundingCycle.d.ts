import { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PopulatedTransaction, Signer, utils } from "ethers";
import { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";
export declare type FundingCyclePropertiesStruct = {
    target: BigNumberish;
    currency: BigNumberish;
    duration: BigNumberish;
    cycleLimit: BigNumberish;
    discountRate: BigNumberish;
    ballot: string;
};
export declare type FundingCyclePropertiesStructOutput = [
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber,
    string
] & {
    target: BigNumber;
    currency: BigNumber;
    duration: BigNumber;
    cycleLimit: BigNumber;
    discountRate: BigNumber;
    ballot: string;
};
export declare type FundingCycleStruct = {
    id: BigNumberish;
    projectId: BigNumberish;
    number: BigNumberish;
    basedOn: BigNumberish;
    configured: BigNumberish;
    cycleLimit: BigNumberish;
    weight: BigNumberish;
    ballot: string;
    start: BigNumberish;
    duration: BigNumberish;
    target: BigNumberish;
    currency: BigNumberish;
    fee: BigNumberish;
    discountRate: BigNumberish;
    tapped: BigNumberish;
    metadata: BigNumberish;
};
export declare type FundingCycleStructOutput = [
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber,
    string,
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber
] & {
    id: BigNumber;
    projectId: BigNumber;
    number: BigNumber;
    basedOn: BigNumber;
    configured: BigNumber;
    cycleLimit: BigNumber;
    weight: BigNumber;
    ballot: string;
    start: BigNumber;
    duration: BigNumber;
    target: BigNumber;
    currency: BigNumber;
    fee: BigNumber;
    discountRate: BigNumber;
    tapped: BigNumber;
    metadata: BigNumber;
};
export interface FundingCycleInterface extends utils.Interface {
    functions: {
        "BASE_WEIGHT()": FunctionFragment;
        "MAX_CYCLE_LIMIT()": FunctionFragment;
        "configure(uint256,(uint256,uint256,uint256,uint256,uint256,address),uint256,uint256,bool)": FunctionFragment;
        "count()": FunctionFragment;
        "currentBallotStateOf(uint256)": FunctionFragment;
        "currentOf(uint256)": FunctionFragment;
        "get(uint256)": FunctionFragment;
        "latestIdOf(uint256)": FunctionFragment;
        "queuedOf(uint256)": FunctionFragment;
        "tap(uint256,uint256)": FunctionFragment;
        "terminalDirectory()": FunctionFragment;
    };
    encodeFunctionData(functionFragment: "BASE_WEIGHT", values?: undefined): string;
    encodeFunctionData(functionFragment: "MAX_CYCLE_LIMIT", values?: undefined): string;
    encodeFunctionData(functionFragment: "configure", values: [
        BigNumberish,
        FundingCyclePropertiesStruct,
        BigNumberish,
        BigNumberish,
        boolean
    ]): string;
    encodeFunctionData(functionFragment: "count", values?: undefined): string;
    encodeFunctionData(functionFragment: "currentBallotStateOf", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "currentOf", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "get", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "latestIdOf", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "queuedOf", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "tap", values: [BigNumberish, BigNumberish]): string;
    encodeFunctionData(functionFragment: "terminalDirectory", values?: undefined): string;
    decodeFunctionResult(functionFragment: "BASE_WEIGHT", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "MAX_CYCLE_LIMIT", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "configure", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "count", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "currentBallotStateOf", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "currentOf", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "get", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "latestIdOf", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "queuedOf", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "tap", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "terminalDirectory", data: BytesLike): Result;
    events: {
        "Configure(uint256,uint256,uint256,tuple,uint256,address)": EventFragment;
        "Init(uint256,uint256,uint256,uint256,uint256,uint256)": EventFragment;
        "Tap(uint256,uint256,uint256,uint256,address)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "Configure"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "Init"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "Tap"): EventFragment;
}
export declare type ConfigureEvent = TypedEvent<[
    BigNumber,
    BigNumber,
    BigNumber,
    FundingCyclePropertiesStructOutput,
    BigNumber,
    string
], {
    fundingCycleId: BigNumber;
    projectId: BigNumber;
    reconfigured: BigNumber;
    _properties: FundingCyclePropertiesStructOutput;
    metadata: BigNumber;
    caller: string;
}>;
export declare type ConfigureEventFilter = TypedEventFilter<ConfigureEvent>;
export declare type InitEvent = TypedEvent<[
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber
], {
    fundingCycleId: BigNumber;
    projectId: BigNumber;
    number: BigNumber;
    previous: BigNumber;
    weight: BigNumber;
    start: BigNumber;
}>;
export declare type InitEventFilter = TypedEventFilter<InitEvent>;
export declare type TapEvent = TypedEvent<[
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber,
    string
], {
    fundingCycleId: BigNumber;
    projectId: BigNumber;
    amount: BigNumber;
    newTappedAmount: BigNumber;
    caller: string;
}>;
export declare type TapEventFilter = TypedEventFilter<TapEvent>;
export interface FundingCycle extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: FundingCycleInterface;
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
        BASE_WEIGHT(overrides?: CallOverrides): Promise<[BigNumber]>;
        MAX_CYCLE_LIMIT(overrides?: CallOverrides): Promise<[BigNumber]>;
        configure(_projectId: BigNumberish, _properties: FundingCyclePropertiesStruct, _metadata: BigNumberish, _fee: BigNumberish, _configureActiveFundingCycle: boolean, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        count(overrides?: CallOverrides): Promise<[BigNumber]>;
        currentBallotStateOf(_projectId: BigNumberish, overrides?: CallOverrides): Promise<[number]>;
        currentOf(_projectId: BigNumberish, overrides?: CallOverrides): Promise<[
            FundingCycleStructOutput
        ] & {
            fundingCycle: FundingCycleStructOutput;
        }>;
        get(_fundingCycleId: BigNumberish, overrides?: CallOverrides): Promise<[FundingCycleStructOutput]>;
        latestIdOf(arg0: BigNumberish, overrides?: CallOverrides): Promise<[BigNumber]>;
        queuedOf(_projectId: BigNumberish, overrides?: CallOverrides): Promise<[FundingCycleStructOutput]>;
        tap(_projectId: BigNumberish, _amount: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        terminalDirectory(overrides?: CallOverrides): Promise<[string]>;
    };
    BASE_WEIGHT(overrides?: CallOverrides): Promise<BigNumber>;
    MAX_CYCLE_LIMIT(overrides?: CallOverrides): Promise<BigNumber>;
    configure(_projectId: BigNumberish, _properties: FundingCyclePropertiesStruct, _metadata: BigNumberish, _fee: BigNumberish, _configureActiveFundingCycle: boolean, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    count(overrides?: CallOverrides): Promise<BigNumber>;
    currentBallotStateOf(_projectId: BigNumberish, overrides?: CallOverrides): Promise<number>;
    currentOf(_projectId: BigNumberish, overrides?: CallOverrides): Promise<FundingCycleStructOutput>;
    get(_fundingCycleId: BigNumberish, overrides?: CallOverrides): Promise<FundingCycleStructOutput>;
    latestIdOf(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
    queuedOf(_projectId: BigNumberish, overrides?: CallOverrides): Promise<FundingCycleStructOutput>;
    tap(_projectId: BigNumberish, _amount: BigNumberish, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    terminalDirectory(overrides?: CallOverrides): Promise<string>;
    callStatic: {
        BASE_WEIGHT(overrides?: CallOverrides): Promise<BigNumber>;
        MAX_CYCLE_LIMIT(overrides?: CallOverrides): Promise<BigNumber>;
        configure(_projectId: BigNumberish, _properties: FundingCyclePropertiesStruct, _metadata: BigNumberish, _fee: BigNumberish, _configureActiveFundingCycle: boolean, overrides?: CallOverrides): Promise<FundingCycleStructOutput>;
        count(overrides?: CallOverrides): Promise<BigNumber>;
        currentBallotStateOf(_projectId: BigNumberish, overrides?: CallOverrides): Promise<number>;
        currentOf(_projectId: BigNumberish, overrides?: CallOverrides): Promise<FundingCycleStructOutput>;
        get(_fundingCycleId: BigNumberish, overrides?: CallOverrides): Promise<FundingCycleStructOutput>;
        latestIdOf(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        queuedOf(_projectId: BigNumberish, overrides?: CallOverrides): Promise<FundingCycleStructOutput>;
        tap(_projectId: BigNumberish, _amount: BigNumberish, overrides?: CallOverrides): Promise<FundingCycleStructOutput>;
        terminalDirectory(overrides?: CallOverrides): Promise<string>;
    };
    filters: {
        "Configure(uint256,uint256,uint256,tuple,uint256,address)"(fundingCycleId?: BigNumberish | null, projectId?: BigNumberish | null, reconfigured?: null, _properties?: null, metadata?: null, caller?: null): ConfigureEventFilter;
        Configure(fundingCycleId?: BigNumberish | null, projectId?: BigNumberish | null, reconfigured?: null, _properties?: null, metadata?: null, caller?: null): ConfigureEventFilter;
        "Init(uint256,uint256,uint256,uint256,uint256,uint256)"(fundingCycleId?: BigNumberish | null, projectId?: BigNumberish | null, number?: null, previous?: null, weight?: null, start?: null): InitEventFilter;
        Init(fundingCycleId?: BigNumberish | null, projectId?: BigNumberish | null, number?: null, previous?: null, weight?: null, start?: null): InitEventFilter;
        "Tap(uint256,uint256,uint256,uint256,address)"(fundingCycleId?: BigNumberish | null, projectId?: BigNumberish | null, amount?: null, newTappedAmount?: null, caller?: null): TapEventFilter;
        Tap(fundingCycleId?: BigNumberish | null, projectId?: BigNumberish | null, amount?: null, newTappedAmount?: null, caller?: null): TapEventFilter;
    };
    estimateGas: {
        BASE_WEIGHT(overrides?: CallOverrides): Promise<BigNumber>;
        MAX_CYCLE_LIMIT(overrides?: CallOverrides): Promise<BigNumber>;
        configure(_projectId: BigNumberish, _properties: FundingCyclePropertiesStruct, _metadata: BigNumberish, _fee: BigNumberish, _configureActiveFundingCycle: boolean, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        count(overrides?: CallOverrides): Promise<BigNumber>;
        currentBallotStateOf(_projectId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        currentOf(_projectId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        get(_fundingCycleId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        latestIdOf(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        queuedOf(_projectId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        tap(_projectId: BigNumberish, _amount: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        terminalDirectory(overrides?: CallOverrides): Promise<BigNumber>;
    };
    populateTransaction: {
        BASE_WEIGHT(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        MAX_CYCLE_LIMIT(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        configure(_projectId: BigNumberish, _properties: FundingCyclePropertiesStruct, _metadata: BigNumberish, _fee: BigNumberish, _configureActiveFundingCycle: boolean, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        count(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        currentBallotStateOf(_projectId: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        currentOf(_projectId: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        get(_fundingCycleId: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        latestIdOf(arg0: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        queuedOf(_projectId: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        tap(_projectId: BigNumberish, _amount: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        terminalDirectory(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    };
}
