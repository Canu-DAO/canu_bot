import { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PopulatedTransaction, Signer, utils } from "ethers";
import { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";
export interface ProjectsInterface extends utils.Interface {
    functions: {
        "approve(address,uint256)": FunctionFragment;
        "balanceOf(address)": FunctionFragment;
        "challengeExpiryOf(bytes32)": FunctionFragment;
        "challengeHandle(bytes32)": FunctionFragment;
        "claimHandle(bytes32,address,uint256)": FunctionFragment;
        "count()": FunctionFragment;
        "create(address,bytes32,string,address)": FunctionFragment;
        "exists(uint256)": FunctionFragment;
        "getApproved(uint256)": FunctionFragment;
        "handleOf(uint256)": FunctionFragment;
        "isApprovedForAll(address,address)": FunctionFragment;
        "name()": FunctionFragment;
        "operatorStore()": FunctionFragment;
        "ownerOf(uint256)": FunctionFragment;
        "projectFor(bytes32)": FunctionFragment;
        "renewHandle(uint256)": FunctionFragment;
        "safeTransferFrom(address,address,uint256)": FunctionFragment;
        "setApprovalForAll(address,bool)": FunctionFragment;
        "setHandle(uint256,bytes32)": FunctionFragment;
        "setUri(uint256,string)": FunctionFragment;
        "supportsInterface(bytes4)": FunctionFragment;
        "symbol()": FunctionFragment;
        "tokenURI(uint256)": FunctionFragment;
        "transferAddressFor(bytes32)": FunctionFragment;
        "transferFrom(address,address,uint256)": FunctionFragment;
        "transferHandle(uint256,address,bytes32)": FunctionFragment;
        "uriOf(uint256)": FunctionFragment;
    };
    encodeFunctionData(functionFragment: "approve", values: [string, BigNumberish]): string;
    encodeFunctionData(functionFragment: "balanceOf", values: [string]): string;
    encodeFunctionData(functionFragment: "challengeExpiryOf", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "challengeHandle", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "claimHandle", values: [BytesLike, string, BigNumberish]): string;
    encodeFunctionData(functionFragment: "count", values?: undefined): string;
    encodeFunctionData(functionFragment: "create", values: [string, BytesLike, string, string]): string;
    encodeFunctionData(functionFragment: "exists", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "getApproved", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "handleOf", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "isApprovedForAll", values: [string, string]): string;
    encodeFunctionData(functionFragment: "name", values?: undefined): string;
    encodeFunctionData(functionFragment: "operatorStore", values?: undefined): string;
    encodeFunctionData(functionFragment: "ownerOf", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "projectFor", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "renewHandle", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "safeTransferFrom", values: [string, string, BigNumberish]): string;
    encodeFunctionData(functionFragment: "setApprovalForAll", values: [string, boolean]): string;
    encodeFunctionData(functionFragment: "setHandle", values: [BigNumberish, BytesLike]): string;
    encodeFunctionData(functionFragment: "setUri", values: [BigNumberish, string]): string;
    encodeFunctionData(functionFragment: "supportsInterface", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "symbol", values?: undefined): string;
    encodeFunctionData(functionFragment: "tokenURI", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "transferAddressFor", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "transferFrom", values: [string, string, BigNumberish]): string;
    encodeFunctionData(functionFragment: "transferHandle", values: [BigNumberish, string, BytesLike]): string;
    encodeFunctionData(functionFragment: "uriOf", values: [BigNumberish]): string;
    decodeFunctionResult(functionFragment: "approve", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "balanceOf", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "challengeExpiryOf", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "challengeHandle", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "claimHandle", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "count", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "create", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "exists", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getApproved", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "handleOf", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isApprovedForAll", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "name", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "operatorStore", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "ownerOf", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "projectFor", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "renewHandle", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "safeTransferFrom", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setApprovalForAll", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setHandle", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setUri", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "supportsInterface", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "symbol", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "tokenURI", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "transferAddressFor", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "transferFrom", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "transferHandle", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "uriOf", data: BytesLike): Result;
    events: {
        "Approval(address,address,uint256)": EventFragment;
        "ApprovalForAll(address,address,bool)": EventFragment;
        "ChallengeHandle(bytes32,uint256,address)": EventFragment;
        "ClaimHandle(address,uint256,bytes32,address)": EventFragment;
        "Create(uint256,address,bytes32,string,address,address)": EventFragment;
        "RenewHandle(bytes32,uint256,address)": EventFragment;
        "SetHandle(uint256,bytes32,address)": EventFragment;
        "SetUri(uint256,string,address)": EventFragment;
        "Transfer(address,address,uint256)": EventFragment;
        "TransferHandle(uint256,address,bytes32,bytes32,address)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "Approval"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "ApprovalForAll"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "ChallengeHandle"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "ClaimHandle"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "Create"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "RenewHandle"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "SetHandle"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "SetUri"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "Transfer"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "TransferHandle"): EventFragment;
}
export declare type ApprovalEvent = TypedEvent<[
    string,
    string,
    BigNumber
], {
    owner: string;
    approved: string;
    tokenId: BigNumber;
}>;
export declare type ApprovalEventFilter = TypedEventFilter<ApprovalEvent>;
export declare type ApprovalForAllEvent = TypedEvent<[
    string,
    string,
    boolean
], {
    owner: string;
    operator: string;
    approved: boolean;
}>;
export declare type ApprovalForAllEventFilter = TypedEventFilter<ApprovalForAllEvent>;
export declare type ChallengeHandleEvent = TypedEvent<[
    string,
    BigNumber,
    string
], {
    handle: string;
    challengeExpiry: BigNumber;
    caller: string;
}>;
export declare type ChallengeHandleEventFilter = TypedEventFilter<ChallengeHandleEvent>;
export declare type ClaimHandleEvent = TypedEvent<[
    string,
    BigNumber,
    string,
    string
], {
    account: string;
    projectId: BigNumber;
    handle: string;
    caller: string;
}>;
export declare type ClaimHandleEventFilter = TypedEventFilter<ClaimHandleEvent>;
export declare type CreateEvent = TypedEvent<[
    BigNumber,
    string,
    string,
    string,
    string,
    string
], {
    projectId: BigNumber;
    owner: string;
    handle: string;
    uri: string;
    terminal: string;
    caller: string;
}>;
export declare type CreateEventFilter = TypedEventFilter<CreateEvent>;
export declare type RenewHandleEvent = TypedEvent<[
    string,
    BigNumber,
    string
], {
    handle: string;
    projectId: BigNumber;
    caller: string;
}>;
export declare type RenewHandleEventFilter = TypedEventFilter<RenewHandleEvent>;
export declare type SetHandleEvent = TypedEvent<[
    BigNumber,
    string,
    string
], {
    projectId: BigNumber;
    handle: string;
    caller: string;
}>;
export declare type SetHandleEventFilter = TypedEventFilter<SetHandleEvent>;
export declare type SetUriEvent = TypedEvent<[
    BigNumber,
    string,
    string
], {
    projectId: BigNumber;
    uri: string;
    caller: string;
}>;
export declare type SetUriEventFilter = TypedEventFilter<SetUriEvent>;
export declare type TransferEvent = TypedEvent<[
    string,
    string,
    BigNumber
], {
    from: string;
    to: string;
    tokenId: BigNumber;
}>;
export declare type TransferEventFilter = TypedEventFilter<TransferEvent>;
export declare type TransferHandleEvent = TypedEvent<[
    BigNumber,
    string,
    string,
    string,
    string
], {
    projectId: BigNumber;
    to: string;
    handle: string;
    newHandle: string;
    caller: string;
}>;
export declare type TransferHandleEventFilter = TypedEventFilter<TransferHandleEvent>;
export interface Projects extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: ProjectsInterface;
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
        approve(to: string, tokenId: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        balanceOf(owner: string, overrides?: CallOverrides): Promise<[BigNumber]>;
        challengeExpiryOf(arg0: BytesLike, overrides?: CallOverrides): Promise<[BigNumber]>;
        challengeHandle(_handle: BytesLike, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        claimHandle(_handle: BytesLike, _for: string, _projectId: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        count(overrides?: CallOverrides): Promise<[BigNumber]>;
        create(_owner: string, _handle: BytesLike, _uri: string, _terminal: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        exists(_projectId: BigNumberish, overrides?: CallOverrides): Promise<[boolean]>;
        getApproved(tokenId: BigNumberish, overrides?: CallOverrides): Promise<[string]>;
        handleOf(arg0: BigNumberish, overrides?: CallOverrides): Promise<[string]>;
        isApprovedForAll(owner: string, operator: string, overrides?: CallOverrides): Promise<[boolean]>;
        name(overrides?: CallOverrides): Promise<[string]>;
        operatorStore(overrides?: CallOverrides): Promise<[string]>;
        ownerOf(tokenId: BigNumberish, overrides?: CallOverrides): Promise<[string]>;
        projectFor(arg0: BytesLike, overrides?: CallOverrides): Promise<[BigNumber]>;
        renewHandle(_projectId: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        "safeTransferFrom(address,address,uint256)"(from: string, to: string, tokenId: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        "safeTransferFrom(address,address,uint256,bytes)"(from: string, to: string, tokenId: BigNumberish, _data: BytesLike, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        setApprovalForAll(operator: string, approved: boolean, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        setHandle(_projectId: BigNumberish, _handle: BytesLike, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        setUri(_projectId: BigNumberish, _uri: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        supportsInterface(interfaceId: BytesLike, overrides?: CallOverrides): Promise<[boolean]>;
        symbol(overrides?: CallOverrides): Promise<[string]>;
        tokenURI(tokenId: BigNumberish, overrides?: CallOverrides): Promise<[string]>;
        transferAddressFor(arg0: BytesLike, overrides?: CallOverrides): Promise<[string]>;
        transferFrom(from: string, to: string, tokenId: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        transferHandle(_projectId: BigNumberish, _to: string, _newHandle: BytesLike, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        uriOf(arg0: BigNumberish, overrides?: CallOverrides): Promise<[string]>;
    };
    approve(to: string, tokenId: BigNumberish, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    balanceOf(owner: string, overrides?: CallOverrides): Promise<BigNumber>;
    challengeExpiryOf(arg0: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;
    challengeHandle(_handle: BytesLike, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    claimHandle(_handle: BytesLike, _for: string, _projectId: BigNumberish, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    count(overrides?: CallOverrides): Promise<BigNumber>;
    create(_owner: string, _handle: BytesLike, _uri: string, _terminal: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    exists(_projectId: BigNumberish, overrides?: CallOverrides): Promise<boolean>;
    getApproved(tokenId: BigNumberish, overrides?: CallOverrides): Promise<string>;
    handleOf(arg0: BigNumberish, overrides?: CallOverrides): Promise<string>;
    isApprovedForAll(owner: string, operator: string, overrides?: CallOverrides): Promise<boolean>;
    name(overrides?: CallOverrides): Promise<string>;
    operatorStore(overrides?: CallOverrides): Promise<string>;
    ownerOf(tokenId: BigNumberish, overrides?: CallOverrides): Promise<string>;
    projectFor(arg0: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;
    renewHandle(_projectId: BigNumberish, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    "safeTransferFrom(address,address,uint256)"(from: string, to: string, tokenId: BigNumberish, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    "safeTransferFrom(address,address,uint256,bytes)"(from: string, to: string, tokenId: BigNumberish, _data: BytesLike, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    setApprovalForAll(operator: string, approved: boolean, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    setHandle(_projectId: BigNumberish, _handle: BytesLike, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    setUri(_projectId: BigNumberish, _uri: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    supportsInterface(interfaceId: BytesLike, overrides?: CallOverrides): Promise<boolean>;
    symbol(overrides?: CallOverrides): Promise<string>;
    tokenURI(tokenId: BigNumberish, overrides?: CallOverrides): Promise<string>;
    transferAddressFor(arg0: BytesLike, overrides?: CallOverrides): Promise<string>;
    transferFrom(from: string, to: string, tokenId: BigNumberish, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    transferHandle(_projectId: BigNumberish, _to: string, _newHandle: BytesLike, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    uriOf(arg0: BigNumberish, overrides?: CallOverrides): Promise<string>;
    callStatic: {
        approve(to: string, tokenId: BigNumberish, overrides?: CallOverrides): Promise<void>;
        balanceOf(owner: string, overrides?: CallOverrides): Promise<BigNumber>;
        challengeExpiryOf(arg0: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;
        challengeHandle(_handle: BytesLike, overrides?: CallOverrides): Promise<void>;
        claimHandle(_handle: BytesLike, _for: string, _projectId: BigNumberish, overrides?: CallOverrides): Promise<void>;
        count(overrides?: CallOverrides): Promise<BigNumber>;
        create(_owner: string, _handle: BytesLike, _uri: string, _terminal: string, overrides?: CallOverrides): Promise<BigNumber>;
        exists(_projectId: BigNumberish, overrides?: CallOverrides): Promise<boolean>;
        getApproved(tokenId: BigNumberish, overrides?: CallOverrides): Promise<string>;
        handleOf(arg0: BigNumberish, overrides?: CallOverrides): Promise<string>;
        isApprovedForAll(owner: string, operator: string, overrides?: CallOverrides): Promise<boolean>;
        name(overrides?: CallOverrides): Promise<string>;
        operatorStore(overrides?: CallOverrides): Promise<string>;
        ownerOf(tokenId: BigNumberish, overrides?: CallOverrides): Promise<string>;
        projectFor(arg0: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;
        renewHandle(_projectId: BigNumberish, overrides?: CallOverrides): Promise<void>;
        "safeTransferFrom(address,address,uint256)"(from: string, to: string, tokenId: BigNumberish, overrides?: CallOverrides): Promise<void>;
        "safeTransferFrom(address,address,uint256,bytes)"(from: string, to: string, tokenId: BigNumberish, _data: BytesLike, overrides?: CallOverrides): Promise<void>;
        setApprovalForAll(operator: string, approved: boolean, overrides?: CallOverrides): Promise<void>;
        setHandle(_projectId: BigNumberish, _handle: BytesLike, overrides?: CallOverrides): Promise<void>;
        setUri(_projectId: BigNumberish, _uri: string, overrides?: CallOverrides): Promise<void>;
        supportsInterface(interfaceId: BytesLike, overrides?: CallOverrides): Promise<boolean>;
        symbol(overrides?: CallOverrides): Promise<string>;
        tokenURI(tokenId: BigNumberish, overrides?: CallOverrides): Promise<string>;
        transferAddressFor(arg0: BytesLike, overrides?: CallOverrides): Promise<string>;
        transferFrom(from: string, to: string, tokenId: BigNumberish, overrides?: CallOverrides): Promise<void>;
        transferHandle(_projectId: BigNumberish, _to: string, _newHandle: BytesLike, overrides?: CallOverrides): Promise<string>;
        uriOf(arg0: BigNumberish, overrides?: CallOverrides): Promise<string>;
    };
    filters: {
        "Approval(address,address,uint256)"(owner?: string | null, approved?: string | null, tokenId?: BigNumberish | null): ApprovalEventFilter;
        Approval(owner?: string | null, approved?: string | null, tokenId?: BigNumberish | null): ApprovalEventFilter;
        "ApprovalForAll(address,address,bool)"(owner?: string | null, operator?: string | null, approved?: null): ApprovalForAllEventFilter;
        ApprovalForAll(owner?: string | null, operator?: string | null, approved?: null): ApprovalForAllEventFilter;
        "ChallengeHandle(bytes32,uint256,address)"(handle?: BytesLike | null, challengeExpiry?: null, caller?: null): ChallengeHandleEventFilter;
        ChallengeHandle(handle?: BytesLike | null, challengeExpiry?: null, caller?: null): ChallengeHandleEventFilter;
        "ClaimHandle(address,uint256,bytes32,address)"(account?: string | null, projectId?: BigNumberish | null, handle?: BytesLike | null, caller?: null): ClaimHandleEventFilter;
        ClaimHandle(account?: string | null, projectId?: BigNumberish | null, handle?: BytesLike | null, caller?: null): ClaimHandleEventFilter;
        "Create(uint256,address,bytes32,string,address,address)"(projectId?: BigNumberish | null, owner?: string | null, handle?: BytesLike | null, uri?: null, terminal?: null, caller?: null): CreateEventFilter;
        Create(projectId?: BigNumberish | null, owner?: string | null, handle?: BytesLike | null, uri?: null, terminal?: null, caller?: null): CreateEventFilter;
        "RenewHandle(bytes32,uint256,address)"(handle?: BytesLike | null, projectId?: BigNumberish | null, caller?: null): RenewHandleEventFilter;
        RenewHandle(handle?: BytesLike | null, projectId?: BigNumberish | null, caller?: null): RenewHandleEventFilter;
        "SetHandle(uint256,bytes32,address)"(projectId?: BigNumberish | null, handle?: BytesLike | null, caller?: null): SetHandleEventFilter;
        SetHandle(projectId?: BigNumberish | null, handle?: BytesLike | null, caller?: null): SetHandleEventFilter;
        "SetUri(uint256,string,address)"(projectId?: BigNumberish | null, uri?: null, caller?: null): SetUriEventFilter;
        SetUri(projectId?: BigNumberish | null, uri?: null, caller?: null): SetUriEventFilter;
        "Transfer(address,address,uint256)"(from?: string | null, to?: string | null, tokenId?: BigNumberish | null): TransferEventFilter;
        Transfer(from?: string | null, to?: string | null, tokenId?: BigNumberish | null): TransferEventFilter;
        "TransferHandle(uint256,address,bytes32,bytes32,address)"(projectId?: BigNumberish | null, to?: string | null, handle?: BytesLike | null, newHandle?: null, caller?: null): TransferHandleEventFilter;
        TransferHandle(projectId?: BigNumberish | null, to?: string | null, handle?: BytesLike | null, newHandle?: null, caller?: null): TransferHandleEventFilter;
    };
    estimateGas: {
        approve(to: string, tokenId: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        balanceOf(owner: string, overrides?: CallOverrides): Promise<BigNumber>;
        challengeExpiryOf(arg0: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;
        challengeHandle(_handle: BytesLike, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        claimHandle(_handle: BytesLike, _for: string, _projectId: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        count(overrides?: CallOverrides): Promise<BigNumber>;
        create(_owner: string, _handle: BytesLike, _uri: string, _terminal: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        exists(_projectId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        getApproved(tokenId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        handleOf(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        isApprovedForAll(owner: string, operator: string, overrides?: CallOverrides): Promise<BigNumber>;
        name(overrides?: CallOverrides): Promise<BigNumber>;
        operatorStore(overrides?: CallOverrides): Promise<BigNumber>;
        ownerOf(tokenId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        projectFor(arg0: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;
        renewHandle(_projectId: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        "safeTransferFrom(address,address,uint256)"(from: string, to: string, tokenId: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        "safeTransferFrom(address,address,uint256,bytes)"(from: string, to: string, tokenId: BigNumberish, _data: BytesLike, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        setApprovalForAll(operator: string, approved: boolean, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        setHandle(_projectId: BigNumberish, _handle: BytesLike, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        setUri(_projectId: BigNumberish, _uri: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        supportsInterface(interfaceId: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;
        symbol(overrides?: CallOverrides): Promise<BigNumber>;
        tokenURI(tokenId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        transferAddressFor(arg0: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;
        transferFrom(from: string, to: string, tokenId: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        transferHandle(_projectId: BigNumberish, _to: string, _newHandle: BytesLike, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        uriOf(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
    };
    populateTransaction: {
        approve(to: string, tokenId: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        balanceOf(owner: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        challengeExpiryOf(arg0: BytesLike, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        challengeHandle(_handle: BytesLike, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        claimHandle(_handle: BytesLike, _for: string, _projectId: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        count(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        create(_owner: string, _handle: BytesLike, _uri: string, _terminal: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        exists(_projectId: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getApproved(tokenId: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        handleOf(arg0: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        isApprovedForAll(owner: string, operator: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        name(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        operatorStore(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        ownerOf(tokenId: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        projectFor(arg0: BytesLike, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        renewHandle(_projectId: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        "safeTransferFrom(address,address,uint256)"(from: string, to: string, tokenId: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        "safeTransferFrom(address,address,uint256,bytes)"(from: string, to: string, tokenId: BigNumberish, _data: BytesLike, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        setApprovalForAll(operator: string, approved: boolean, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        setHandle(_projectId: BigNumberish, _handle: BytesLike, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        setUri(_projectId: BigNumberish, _uri: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        supportsInterface(interfaceId: BytesLike, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        symbol(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        tokenURI(tokenId: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        transferAddressFor(arg0: BytesLike, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        transferFrom(from: string, to: string, tokenId: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        transferHandle(_projectId: BigNumberish, _to: string, _newHandle: BytesLike, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        uriOf(arg0: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
    };
}
