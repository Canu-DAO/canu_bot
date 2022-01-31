import { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PayableOverrides, PopulatedTransaction, Signer, utils } from "ethers";
import { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";
export declare type PayoutModStruct = {
    preferUnstaked: boolean;
    percent: BigNumberish;
    lockedUntil: BigNumberish;
    beneficiary: string;
    allocator: string;
    projectId: BigNumberish;
};
export declare type PayoutModStructOutput = [
    boolean,
    number,
    number,
    string,
    string,
    BigNumber
] & {
    preferUnstaked: boolean;
    percent: number;
    lockedUntil: number;
    beneficiary: string;
    allocator: string;
    projectId: BigNumber;
};
export declare type TicketModStruct = {
    preferUnstaked: boolean;
    percent: BigNumberish;
    lockedUntil: BigNumberish;
    beneficiary: string;
};
export declare type TicketModStructOutput = [boolean, number, number, string] & {
    preferUnstaked: boolean;
    percent: number;
    lockedUntil: number;
    beneficiary: string;
};
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
export declare type FundingCycleMetadataStruct = {
    reservedRate: BigNumberish;
    bondingCurveRate: BigNumberish;
    reconfigurationBondingCurveRate: BigNumberish;
};
export declare type FundingCycleMetadataStructOutput = [
    BigNumber,
    BigNumber,
    BigNumber
] & {
    reservedRate: BigNumber;
    bondingCurveRate: BigNumber;
    reconfigurationBondingCurveRate: BigNumber;
};
export interface TerminalV1Interface extends utils.Interface {
    functions: {
        "acceptGovernance()": FunctionFragment;
        "addToBalance(uint256)": FunctionFragment;
        "allowMigration(address)": FunctionFragment;
        "appointGovernance(address)": FunctionFragment;
        "balanceOf(uint256)": FunctionFragment;
        "canPrintPreminedTickets(uint256)": FunctionFragment;
        "claimableOverflowOf(address,uint256,uint256)": FunctionFragment;
        "configure(uint256,(uint256,uint256,uint256,uint256,uint256,address),(uint256,uint256,uint256),(bool,uint16,uint48,address,address,uint56)[],(bool,uint16,uint48,address)[])": FunctionFragment;
        "currentOverflowOf(uint256)": FunctionFragment;
        "deploy(address,bytes32,string,(uint256,uint256,uint256,uint256,uint256,address),(uint256,uint256,uint256),(bool,uint16,uint48,address,address,uint56)[],(bool,uint16,uint48,address)[])": FunctionFragment;
        "fee()": FunctionFragment;
        "fundingCycles()": FunctionFragment;
        "governance()": FunctionFragment;
        "migrate(uint256,address)": FunctionFragment;
        "migrationIsAllowed(address)": FunctionFragment;
        "modStore()": FunctionFragment;
        "operatorStore()": FunctionFragment;
        "pay(uint256,address,string,bool)": FunctionFragment;
        "pendingGovernance()": FunctionFragment;
        "prices()": FunctionFragment;
        "printPreminedTickets(uint256,uint256,uint256,address,string,bool)": FunctionFragment;
        "printReservedTickets(uint256)": FunctionFragment;
        "projects()": FunctionFragment;
        "redeem(address,uint256,uint256,uint256,address,bool)": FunctionFragment;
        "reservedTicketBalanceOf(uint256,uint256)": FunctionFragment;
        "setFee(uint256)": FunctionFragment;
        "tap(uint256,uint256,uint256,uint256)": FunctionFragment;
        "terminalDirectory()": FunctionFragment;
        "ticketBooth()": FunctionFragment;
    };
    encodeFunctionData(functionFragment: "acceptGovernance", values?: undefined): string;
    encodeFunctionData(functionFragment: "addToBalance", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "allowMigration", values: [string]): string;
    encodeFunctionData(functionFragment: "appointGovernance", values: [string]): string;
    encodeFunctionData(functionFragment: "balanceOf", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "canPrintPreminedTickets", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "claimableOverflowOf", values: [string, BigNumberish, BigNumberish]): string;
    encodeFunctionData(functionFragment: "configure", values: [
        BigNumberish,
        FundingCyclePropertiesStruct,
        FundingCycleMetadataStruct,
        PayoutModStruct[],
        TicketModStruct[]
    ]): string;
    encodeFunctionData(functionFragment: "currentOverflowOf", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "deploy", values: [
        string,
        BytesLike,
        string,
        FundingCyclePropertiesStruct,
        FundingCycleMetadataStruct,
        PayoutModStruct[],
        TicketModStruct[]
    ]): string;
    encodeFunctionData(functionFragment: "fee", values?: undefined): string;
    encodeFunctionData(functionFragment: "fundingCycles", values?: undefined): string;
    encodeFunctionData(functionFragment: "governance", values?: undefined): string;
    encodeFunctionData(functionFragment: "migrate", values: [BigNumberish, string]): string;
    encodeFunctionData(functionFragment: "migrationIsAllowed", values: [string]): string;
    encodeFunctionData(functionFragment: "modStore", values?: undefined): string;
    encodeFunctionData(functionFragment: "operatorStore", values?: undefined): string;
    encodeFunctionData(functionFragment: "pay", values: [BigNumberish, string, string, boolean]): string;
    encodeFunctionData(functionFragment: "pendingGovernance", values?: undefined): string;
    encodeFunctionData(functionFragment: "prices", values?: undefined): string;
    encodeFunctionData(functionFragment: "printPreminedTickets", values: [BigNumberish, BigNumberish, BigNumberish, string, string, boolean]): string;
    encodeFunctionData(functionFragment: "printReservedTickets", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "projects", values?: undefined): string;
    encodeFunctionData(functionFragment: "redeem", values: [string, BigNumberish, BigNumberish, BigNumberish, string, boolean]): string;
    encodeFunctionData(functionFragment: "reservedTicketBalanceOf", values: [BigNumberish, BigNumberish]): string;
    encodeFunctionData(functionFragment: "setFee", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "tap", values: [BigNumberish, BigNumberish, BigNumberish, BigNumberish]): string;
    encodeFunctionData(functionFragment: "terminalDirectory", values?: undefined): string;
    encodeFunctionData(functionFragment: "ticketBooth", values?: undefined): string;
    decodeFunctionResult(functionFragment: "acceptGovernance", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "addToBalance", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "allowMigration", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "appointGovernance", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "balanceOf", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "canPrintPreminedTickets", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "claimableOverflowOf", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "configure", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "currentOverflowOf", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "deploy", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "fee", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "fundingCycles", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "governance", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "migrate", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "migrationIsAllowed", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "modStore", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "operatorStore", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "pay", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "pendingGovernance", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "prices", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "printPreminedTickets", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "printReservedTickets", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "projects", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "redeem", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "reservedTicketBalanceOf", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setFee", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "tap", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "terminalDirectory", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "ticketBooth", data: BytesLike): Result;
    events: {
        "AcceptGovernance(address)": EventFragment;
        "AddToBalance(uint256,uint256,address)": EventFragment;
        "AllowMigration(address)": EventFragment;
        "AppointGovernance(address)": EventFragment;
        "Configure(uint256,uint256,address)": EventFragment;
        "Deposit(uint256)": EventFragment;
        "DistributeToPayoutMod(uint256,uint256,tuple,uint256,address)": EventFragment;
        "DistributeToTicketMod(uint256,uint256,tuple,uint256,address)": EventFragment;
        "EnsureTargetLocalWei(uint256)": EventFragment;
        "Migrate(uint256,address,uint256,address)": EventFragment;
        "Pay(uint256,uint256,address,uint256,string,address)": EventFragment;
        "PrintPreminedTickets(uint256,address,uint256,uint256,string,address)": EventFragment;
        "PrintReserveTickets(uint256,uint256,address,uint256,uint256,address)": EventFragment;
        "Redeem(address,address,uint256,uint256,uint256,address)": EventFragment;
        "SetFee(uint256)": EventFragment;
        "SetTargetLocalWei(uint256)": EventFragment;
        "SetYielder(address)": EventFragment;
        "Tap(uint256,uint256,address,uint256,uint256,uint256,uint256,uint256,address)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "AcceptGovernance"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "AddToBalance"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "AllowMigration"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "AppointGovernance"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "Configure"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "Deposit"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "DistributeToPayoutMod"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "DistributeToTicketMod"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "EnsureTargetLocalWei"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "Migrate"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "Pay"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "PrintPreminedTickets"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "PrintReserveTickets"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "Redeem"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "SetFee"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "SetTargetLocalWei"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "SetYielder"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "Tap"): EventFragment;
}
export declare type AcceptGovernanceEvent = TypedEvent<[
    string
], {
    governance: string;
}>;
export declare type AcceptGovernanceEventFilter = TypedEventFilter<AcceptGovernanceEvent>;
export declare type AddToBalanceEvent = TypedEvent<[
    BigNumber,
    BigNumber,
    string
], {
    projectId: BigNumber;
    value: BigNumber;
    caller: string;
}>;
export declare type AddToBalanceEventFilter = TypedEventFilter<AddToBalanceEvent>;
export declare type AllowMigrationEvent = TypedEvent<[string], {
    allowed: string;
}>;
export declare type AllowMigrationEventFilter = TypedEventFilter<AllowMigrationEvent>;
export declare type AppointGovernanceEvent = TypedEvent<[
    string
], {
    governance: string;
}>;
export declare type AppointGovernanceEventFilter = TypedEventFilter<AppointGovernanceEvent>;
export declare type ConfigureEvent = TypedEvent<[
    BigNumber,
    BigNumber,
    string
], {
    fundingCycleId: BigNumber;
    projectId: BigNumber;
    caller: string;
}>;
export declare type ConfigureEventFilter = TypedEventFilter<ConfigureEvent>;
export declare type DepositEvent = TypedEvent<[BigNumber], {
    amount: BigNumber;
}>;
export declare type DepositEventFilter = TypedEventFilter<DepositEvent>;
export declare type DistributeToPayoutModEvent = TypedEvent<[
    BigNumber,
    BigNumber,
    PayoutModStructOutput,
    BigNumber,
    string
], {
    fundingCycleId: BigNumber;
    projectId: BigNumber;
    mod: PayoutModStructOutput;
    modCut: BigNumber;
    caller: string;
}>;
export declare type DistributeToPayoutModEventFilter = TypedEventFilter<DistributeToPayoutModEvent>;
export declare type DistributeToTicketModEvent = TypedEvent<[
    BigNumber,
    BigNumber,
    TicketModStructOutput,
    BigNumber,
    string
], {
    fundingCycleId: BigNumber;
    projectId: BigNumber;
    mod: TicketModStructOutput;
    modCut: BigNumber;
    caller: string;
}>;
export declare type DistributeToTicketModEventFilter = TypedEventFilter<DistributeToTicketModEvent>;
export declare type EnsureTargetLocalWeiEvent = TypedEvent<[
    BigNumber
], {
    target: BigNumber;
}>;
export declare type EnsureTargetLocalWeiEventFilter = TypedEventFilter<EnsureTargetLocalWeiEvent>;
export declare type MigrateEvent = TypedEvent<[
    BigNumber,
    string,
    BigNumber,
    string
], {
    projectId: BigNumber;
    to: string;
    _amount: BigNumber;
    caller: string;
}>;
export declare type MigrateEventFilter = TypedEventFilter<MigrateEvent>;
export declare type PayEvent = TypedEvent<[
    BigNumber,
    BigNumber,
    string,
    BigNumber,
    string,
    string
], {
    fundingCycleId: BigNumber;
    projectId: BigNumber;
    beneficiary: string;
    amount: BigNumber;
    note: string;
    caller: string;
}>;
export declare type PayEventFilter = TypedEventFilter<PayEvent>;
export declare type PrintPreminedTicketsEvent = TypedEvent<[
    BigNumber,
    string,
    BigNumber,
    BigNumber,
    string,
    string
], {
    projectId: BigNumber;
    beneficiary: string;
    amount: BigNumber;
    currency: BigNumber;
    memo: string;
    caller: string;
}>;
export declare type PrintPreminedTicketsEventFilter = TypedEventFilter<PrintPreminedTicketsEvent>;
export declare type PrintReserveTicketsEvent = TypedEvent<[
    BigNumber,
    BigNumber,
    string,
    BigNumber,
    BigNumber,
    string
], {
    fundingCycleId: BigNumber;
    projectId: BigNumber;
    beneficiary: string;
    count: BigNumber;
    beneficiaryTicketAmount: BigNumber;
    caller: string;
}>;
export declare type PrintReserveTicketsEventFilter = TypedEventFilter<PrintReserveTicketsEvent>;
export declare type RedeemEvent = TypedEvent<[
    string,
    string,
    BigNumber,
    BigNumber,
    BigNumber,
    string
], {
    holder: string;
    beneficiary: string;
    _projectId: BigNumber;
    amount: BigNumber;
    returnAmount: BigNumber;
    caller: string;
}>;
export declare type RedeemEventFilter = TypedEventFilter<RedeemEvent>;
export declare type SetFeeEvent = TypedEvent<[BigNumber], {
    _amount: BigNumber;
}>;
export declare type SetFeeEventFilter = TypedEventFilter<SetFeeEvent>;
export declare type SetTargetLocalWeiEvent = TypedEvent<[
    BigNumber
], {
    amount: BigNumber;
}>;
export declare type SetTargetLocalWeiEventFilter = TypedEventFilter<SetTargetLocalWeiEvent>;
export declare type SetYielderEvent = TypedEvent<[string], {
    newYielder: string;
}>;
export declare type SetYielderEventFilter = TypedEventFilter<SetYielderEvent>;
export declare type TapEvent = TypedEvent<[
    BigNumber,
    BigNumber,
    string,
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber,
    string
], {
    fundingCycleId: BigNumber;
    projectId: BigNumber;
    beneficiary: string;
    amount: BigNumber;
    currency: BigNumber;
    netTransferAmount: BigNumber;
    beneficiaryTransferAmount: BigNumber;
    govFeeAmount: BigNumber;
    caller: string;
}>;
export declare type TapEventFilter = TypedEventFilter<TapEvent>;
export interface TerminalV1 extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: TerminalV1Interface;
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
        acceptGovernance(overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        addToBalance(_projectId: BigNumberish, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        allowMigration(_contract: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        appointGovernance(_pendingGovernance: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        balanceOf(arg0: BigNumberish, overrides?: CallOverrides): Promise<[BigNumber]>;
        canPrintPreminedTickets(_projectId: BigNumberish, overrides?: CallOverrides): Promise<[boolean]>;
        claimableOverflowOf(_account: string, _projectId: BigNumberish, _count: BigNumberish, overrides?: CallOverrides): Promise<[BigNumber]>;
        configure(_projectId: BigNumberish, _properties: FundingCyclePropertiesStruct, _metadata: FundingCycleMetadataStruct, _payoutMods: PayoutModStruct[], _ticketMods: TicketModStruct[], overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        currentOverflowOf(_projectId: BigNumberish, overrides?: CallOverrides): Promise<[BigNumber] & {
            overflow: BigNumber;
        }>;
        deploy(_owner: string, _handle: BytesLike, _uri: string, _properties: FundingCyclePropertiesStruct, _metadata: FundingCycleMetadataStruct, _payoutMods: PayoutModStruct[], _ticketMods: TicketModStruct[], overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        fee(overrides?: CallOverrides): Promise<[BigNumber]>;
        fundingCycles(overrides?: CallOverrides): Promise<[string]>;
        governance(overrides?: CallOverrides): Promise<[string]>;
        migrate(_projectId: BigNumberish, _to: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        migrationIsAllowed(arg0: string, overrides?: CallOverrides): Promise<[boolean]>;
        modStore(overrides?: CallOverrides): Promise<[string]>;
        operatorStore(overrides?: CallOverrides): Promise<[string]>;
        pay(_projectId: BigNumberish, _beneficiary: string, _memo: string, _preferUnstakedTickets: boolean, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        pendingGovernance(overrides?: CallOverrides): Promise<[string]>;
        prices(overrides?: CallOverrides): Promise<[string]>;
        printPreminedTickets(_projectId: BigNumberish, _amount: BigNumberish, _currency: BigNumberish, _beneficiary: string, _memo: string, _preferUnstakedTickets: boolean, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        printReservedTickets(_projectId: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        projects(overrides?: CallOverrides): Promise<[string]>;
        redeem(_account: string, _projectId: BigNumberish, _count: BigNumberish, _minReturnedWei: BigNumberish, _beneficiary: string, _preferUnstaked: boolean, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        reservedTicketBalanceOf(_projectId: BigNumberish, _reservedRate: BigNumberish, overrides?: CallOverrides): Promise<[BigNumber]>;
        setFee(_fee: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        tap(_projectId: BigNumberish, _amount: BigNumberish, _currency: BigNumberish, _minReturnedWei: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        terminalDirectory(overrides?: CallOverrides): Promise<[string]>;
        ticketBooth(overrides?: CallOverrides): Promise<[string]>;
    };
    acceptGovernance(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    addToBalance(_projectId: BigNumberish, overrides?: PayableOverrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    allowMigration(_contract: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    appointGovernance(_pendingGovernance: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    balanceOf(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
    canPrintPreminedTickets(_projectId: BigNumberish, overrides?: CallOverrides): Promise<boolean>;
    claimableOverflowOf(_account: string, _projectId: BigNumberish, _count: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
    configure(_projectId: BigNumberish, _properties: FundingCyclePropertiesStruct, _metadata: FundingCycleMetadataStruct, _payoutMods: PayoutModStruct[], _ticketMods: TicketModStruct[], overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    currentOverflowOf(_projectId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
    deploy(_owner: string, _handle: BytesLike, _uri: string, _properties: FundingCyclePropertiesStruct, _metadata: FundingCycleMetadataStruct, _payoutMods: PayoutModStruct[], _ticketMods: TicketModStruct[], overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    fee(overrides?: CallOverrides): Promise<BigNumber>;
    fundingCycles(overrides?: CallOverrides): Promise<string>;
    governance(overrides?: CallOverrides): Promise<string>;
    migrate(_projectId: BigNumberish, _to: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    migrationIsAllowed(arg0: string, overrides?: CallOverrides): Promise<boolean>;
    modStore(overrides?: CallOverrides): Promise<string>;
    operatorStore(overrides?: CallOverrides): Promise<string>;
    pay(_projectId: BigNumberish, _beneficiary: string, _memo: string, _preferUnstakedTickets: boolean, overrides?: PayableOverrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    pendingGovernance(overrides?: CallOverrides): Promise<string>;
    prices(overrides?: CallOverrides): Promise<string>;
    printPreminedTickets(_projectId: BigNumberish, _amount: BigNumberish, _currency: BigNumberish, _beneficiary: string, _memo: string, _preferUnstakedTickets: boolean, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    printReservedTickets(_projectId: BigNumberish, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    projects(overrides?: CallOverrides): Promise<string>;
    redeem(_account: string, _projectId: BigNumberish, _count: BigNumberish, _minReturnedWei: BigNumberish, _beneficiary: string, _preferUnstaked: boolean, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    reservedTicketBalanceOf(_projectId: BigNumberish, _reservedRate: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
    setFee(_fee: BigNumberish, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    tap(_projectId: BigNumberish, _amount: BigNumberish, _currency: BigNumberish, _minReturnedWei: BigNumberish, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    terminalDirectory(overrides?: CallOverrides): Promise<string>;
    ticketBooth(overrides?: CallOverrides): Promise<string>;
    callStatic: {
        acceptGovernance(overrides?: CallOverrides): Promise<void>;
        addToBalance(_projectId: BigNumberish, overrides?: CallOverrides): Promise<void>;
        allowMigration(_contract: string, overrides?: CallOverrides): Promise<void>;
        appointGovernance(_pendingGovernance: string, overrides?: CallOverrides): Promise<void>;
        balanceOf(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        canPrintPreminedTickets(_projectId: BigNumberish, overrides?: CallOverrides): Promise<boolean>;
        claimableOverflowOf(_account: string, _projectId: BigNumberish, _count: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        configure(_projectId: BigNumberish, _properties: FundingCyclePropertiesStruct, _metadata: FundingCycleMetadataStruct, _payoutMods: PayoutModStruct[], _ticketMods: TicketModStruct[], overrides?: CallOverrides): Promise<BigNumber>;
        currentOverflowOf(_projectId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        deploy(_owner: string, _handle: BytesLike, _uri: string, _properties: FundingCyclePropertiesStruct, _metadata: FundingCycleMetadataStruct, _payoutMods: PayoutModStruct[], _ticketMods: TicketModStruct[], overrides?: CallOverrides): Promise<void>;
        fee(overrides?: CallOverrides): Promise<BigNumber>;
        fundingCycles(overrides?: CallOverrides): Promise<string>;
        governance(overrides?: CallOverrides): Promise<string>;
        migrate(_projectId: BigNumberish, _to: string, overrides?: CallOverrides): Promise<void>;
        migrationIsAllowed(arg0: string, overrides?: CallOverrides): Promise<boolean>;
        modStore(overrides?: CallOverrides): Promise<string>;
        operatorStore(overrides?: CallOverrides): Promise<string>;
        pay(_projectId: BigNumberish, _beneficiary: string, _memo: string, _preferUnstakedTickets: boolean, overrides?: CallOverrides): Promise<BigNumber>;
        pendingGovernance(overrides?: CallOverrides): Promise<string>;
        prices(overrides?: CallOverrides): Promise<string>;
        printPreminedTickets(_projectId: BigNumberish, _amount: BigNumberish, _currency: BigNumberish, _beneficiary: string, _memo: string, _preferUnstakedTickets: boolean, overrides?: CallOverrides): Promise<void>;
        printReservedTickets(_projectId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        projects(overrides?: CallOverrides): Promise<string>;
        redeem(_account: string, _projectId: BigNumberish, _count: BigNumberish, _minReturnedWei: BigNumberish, _beneficiary: string, _preferUnstaked: boolean, overrides?: CallOverrides): Promise<BigNumber>;
        reservedTicketBalanceOf(_projectId: BigNumberish, _reservedRate: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        setFee(_fee: BigNumberish, overrides?: CallOverrides): Promise<void>;
        tap(_projectId: BigNumberish, _amount: BigNumberish, _currency: BigNumberish, _minReturnedWei: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        terminalDirectory(overrides?: CallOverrides): Promise<string>;
        ticketBooth(overrides?: CallOverrides): Promise<string>;
    };
    filters: {
        "AcceptGovernance(address)"(governance?: null): AcceptGovernanceEventFilter;
        AcceptGovernance(governance?: null): AcceptGovernanceEventFilter;
        "AddToBalance(uint256,uint256,address)"(projectId?: BigNumberish | null, value?: null, caller?: null): AddToBalanceEventFilter;
        AddToBalance(projectId?: BigNumberish | null, value?: null, caller?: null): AddToBalanceEventFilter;
        "AllowMigration(address)"(allowed?: null): AllowMigrationEventFilter;
        AllowMigration(allowed?: null): AllowMigrationEventFilter;
        "AppointGovernance(address)"(governance?: null): AppointGovernanceEventFilter;
        AppointGovernance(governance?: null): AppointGovernanceEventFilter;
        "Configure(uint256,uint256,address)"(fundingCycleId?: BigNumberish | null, projectId?: BigNumberish | null, caller?: null): ConfigureEventFilter;
        Configure(fundingCycleId?: BigNumberish | null, projectId?: BigNumberish | null, caller?: null): ConfigureEventFilter;
        "Deposit(uint256)"(amount?: null): DepositEventFilter;
        Deposit(amount?: null): DepositEventFilter;
        "DistributeToPayoutMod(uint256,uint256,tuple,uint256,address)"(fundingCycleId?: BigNumberish | null, projectId?: BigNumberish | null, mod?: null, modCut?: null, caller?: null): DistributeToPayoutModEventFilter;
        DistributeToPayoutMod(fundingCycleId?: BigNumberish | null, projectId?: BigNumberish | null, mod?: null, modCut?: null, caller?: null): DistributeToPayoutModEventFilter;
        "DistributeToTicketMod(uint256,uint256,tuple,uint256,address)"(fundingCycleId?: BigNumberish | null, projectId?: BigNumberish | null, mod?: null, modCut?: null, caller?: null): DistributeToTicketModEventFilter;
        DistributeToTicketMod(fundingCycleId?: BigNumberish | null, projectId?: BigNumberish | null, mod?: null, modCut?: null, caller?: null): DistributeToTicketModEventFilter;
        "EnsureTargetLocalWei(uint256)"(target?: null): EnsureTargetLocalWeiEventFilter;
        EnsureTargetLocalWei(target?: null): EnsureTargetLocalWeiEventFilter;
        "Migrate(uint256,address,uint256,address)"(projectId?: BigNumberish | null, to?: string | null, _amount?: null, caller?: null): MigrateEventFilter;
        Migrate(projectId?: BigNumberish | null, to?: string | null, _amount?: null, caller?: null): MigrateEventFilter;
        "Pay(uint256,uint256,address,uint256,string,address)"(fundingCycleId?: BigNumberish | null, projectId?: BigNumberish | null, beneficiary?: string | null, amount?: null, note?: null, caller?: null): PayEventFilter;
        Pay(fundingCycleId?: BigNumberish | null, projectId?: BigNumberish | null, beneficiary?: string | null, amount?: null, note?: null, caller?: null): PayEventFilter;
        "PrintPreminedTickets(uint256,address,uint256,uint256,string,address)"(projectId?: BigNumberish | null, beneficiary?: string | null, amount?: null, currency?: null, memo?: null, caller?: null): PrintPreminedTicketsEventFilter;
        PrintPreminedTickets(projectId?: BigNumberish | null, beneficiary?: string | null, amount?: null, currency?: null, memo?: null, caller?: null): PrintPreminedTicketsEventFilter;
        "PrintReserveTickets(uint256,uint256,address,uint256,uint256,address)"(fundingCycleId?: BigNumberish | null, projectId?: BigNumberish | null, beneficiary?: string | null, count?: null, beneficiaryTicketAmount?: null, caller?: null): PrintReserveTicketsEventFilter;
        PrintReserveTickets(fundingCycleId?: BigNumberish | null, projectId?: BigNumberish | null, beneficiary?: string | null, count?: null, beneficiaryTicketAmount?: null, caller?: null): PrintReserveTicketsEventFilter;
        "Redeem(address,address,uint256,uint256,uint256,address)"(holder?: string | null, beneficiary?: string | null, _projectId?: BigNumberish | null, amount?: null, returnAmount?: null, caller?: null): RedeemEventFilter;
        Redeem(holder?: string | null, beneficiary?: string | null, _projectId?: BigNumberish | null, amount?: null, returnAmount?: null, caller?: null): RedeemEventFilter;
        "SetFee(uint256)"(_amount?: null): SetFeeEventFilter;
        SetFee(_amount?: null): SetFeeEventFilter;
        "SetTargetLocalWei(uint256)"(amount?: null): SetTargetLocalWeiEventFilter;
        SetTargetLocalWei(amount?: null): SetTargetLocalWeiEventFilter;
        "SetYielder(address)"(newYielder?: null): SetYielderEventFilter;
        SetYielder(newYielder?: null): SetYielderEventFilter;
        "Tap(uint256,uint256,address,uint256,uint256,uint256,uint256,uint256,address)"(fundingCycleId?: BigNumberish | null, projectId?: BigNumberish | null, beneficiary?: string | null, amount?: null, currency?: null, netTransferAmount?: null, beneficiaryTransferAmount?: null, govFeeAmount?: null, caller?: null): TapEventFilter;
        Tap(fundingCycleId?: BigNumberish | null, projectId?: BigNumberish | null, beneficiary?: string | null, amount?: null, currency?: null, netTransferAmount?: null, beneficiaryTransferAmount?: null, govFeeAmount?: null, caller?: null): TapEventFilter;
    };
    estimateGas: {
        acceptGovernance(overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        addToBalance(_projectId: BigNumberish, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        allowMigration(_contract: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        appointGovernance(_pendingGovernance: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        balanceOf(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        canPrintPreminedTickets(_projectId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        claimableOverflowOf(_account: string, _projectId: BigNumberish, _count: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        configure(_projectId: BigNumberish, _properties: FundingCyclePropertiesStruct, _metadata: FundingCycleMetadataStruct, _payoutMods: PayoutModStruct[], _ticketMods: TicketModStruct[], overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        currentOverflowOf(_projectId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        deploy(_owner: string, _handle: BytesLike, _uri: string, _properties: FundingCyclePropertiesStruct, _metadata: FundingCycleMetadataStruct, _payoutMods: PayoutModStruct[], _ticketMods: TicketModStruct[], overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        fee(overrides?: CallOverrides): Promise<BigNumber>;
        fundingCycles(overrides?: CallOverrides): Promise<BigNumber>;
        governance(overrides?: CallOverrides): Promise<BigNumber>;
        migrate(_projectId: BigNumberish, _to: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        migrationIsAllowed(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;
        modStore(overrides?: CallOverrides): Promise<BigNumber>;
        operatorStore(overrides?: CallOverrides): Promise<BigNumber>;
        pay(_projectId: BigNumberish, _beneficiary: string, _memo: string, _preferUnstakedTickets: boolean, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        pendingGovernance(overrides?: CallOverrides): Promise<BigNumber>;
        prices(overrides?: CallOverrides): Promise<BigNumber>;
        printPreminedTickets(_projectId: BigNumberish, _amount: BigNumberish, _currency: BigNumberish, _beneficiary: string, _memo: string, _preferUnstakedTickets: boolean, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        printReservedTickets(_projectId: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        projects(overrides?: CallOverrides): Promise<BigNumber>;
        redeem(_account: string, _projectId: BigNumberish, _count: BigNumberish, _minReturnedWei: BigNumberish, _beneficiary: string, _preferUnstaked: boolean, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        reservedTicketBalanceOf(_projectId: BigNumberish, _reservedRate: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        setFee(_fee: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        tap(_projectId: BigNumberish, _amount: BigNumberish, _currency: BigNumberish, _minReturnedWei: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        terminalDirectory(overrides?: CallOverrides): Promise<BigNumber>;
        ticketBooth(overrides?: CallOverrides): Promise<BigNumber>;
    };
    populateTransaction: {
        acceptGovernance(overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        addToBalance(_projectId: BigNumberish, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        allowMigration(_contract: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        appointGovernance(_pendingGovernance: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        balanceOf(arg0: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        canPrintPreminedTickets(_projectId: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        claimableOverflowOf(_account: string, _projectId: BigNumberish, _count: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        configure(_projectId: BigNumberish, _properties: FundingCyclePropertiesStruct, _metadata: FundingCycleMetadataStruct, _payoutMods: PayoutModStruct[], _ticketMods: TicketModStruct[], overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        currentOverflowOf(_projectId: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        deploy(_owner: string, _handle: BytesLike, _uri: string, _properties: FundingCyclePropertiesStruct, _metadata: FundingCycleMetadataStruct, _payoutMods: PayoutModStruct[], _ticketMods: TicketModStruct[], overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        fee(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        fundingCycles(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        governance(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        migrate(_projectId: BigNumberish, _to: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        migrationIsAllowed(arg0: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        modStore(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        operatorStore(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        pay(_projectId: BigNumberish, _beneficiary: string, _memo: string, _preferUnstakedTickets: boolean, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        pendingGovernance(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        prices(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        printPreminedTickets(_projectId: BigNumberish, _amount: BigNumberish, _currency: BigNumberish, _beneficiary: string, _memo: string, _preferUnstakedTickets: boolean, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        printReservedTickets(_projectId: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        projects(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        redeem(_account: string, _projectId: BigNumberish, _count: BigNumberish, _minReturnedWei: BigNumberish, _beneficiary: string, _preferUnstaked: boolean, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        reservedTicketBalanceOf(_projectId: BigNumberish, _reservedRate: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        setFee(_fee: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        tap(_projectId: BigNumberish, _amount: BigNumberish, _currency: BigNumberish, _minReturnedWei: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        terminalDirectory(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        ticketBooth(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    };
}
