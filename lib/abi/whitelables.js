module.exports = [
    {
        inputs: [],
        name: "claimRevenue",
        outputs: [],
        stateMutability: "payable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "string",
                name: "_discountCode",
                type: "string",
            },
        ],
        name: "disableDiscount",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "renounceOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "string",
                name: "_discountCode",
                type: "string",
            },
            {
                internalType: "address",
                name: "_beneficiary",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "_plan",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "_feeDiscount",
                type: "uint256",
            },
        ],
        name: "setDiscount",
        outputs: [],
        stateMutability: "payable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_rewardToken",
                type: "address",
            },
            {
                internalType: "address",
                name: "_relayer",
                type: "address",
            },
        ],
        stateMutability: "nonpayable",
        type: "constructor",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "previousOwner",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "newOwner",
                type: "address",
            },
        ],
        name: "OwnershipTransferred",
        type: "event",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_index",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "_price",
                type: "uint256",
            },
        ],
        name: "setPlan",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_relayer",
                type: "address",
            },
        ],
        name: "setRelayer",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_to",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "_revenue",
                type: "uint256",
            },
        ],
        name: "setRevenue",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "contract IERC20",
                name: "_token",
                type: "address",
            },
        ],
        name: "setRewardToken",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "newOwner",
                type: "address",
            },
        ],
        name: "transferOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "withdrawBNB",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "withdrawTokens",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        name: "codeByIndex",
        outputs: [
            {
                internalType: "string",
                name: "",
                type: "string",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_beneficiary",
                type: "address",
            },
        ],
        name: "getBeneficiary",
        outputs: [
            {
                internalType: "uint256",
                name: "plan",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "codeIndex",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "share",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "claimed",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "toClaim",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "string",
                name: "_discountCode",
                type: "string",
            },
        ],
        name: "getDiscount",
        outputs: [
            {
                internalType: "bool",
                name: "active",
                type: "bool",
            },
            {
                internalType: "uint256",
                name: "feeDiscount",
                type: "uint256",
            },
            {
                internalType: "address",
                name: "beneficiary",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "share",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_num",
                type: "uint256",
            },
        ],
        name: "getPlan",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "getTotalCodes",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "owner",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "relayer",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
];
