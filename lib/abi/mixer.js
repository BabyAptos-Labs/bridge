module.exports = [
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_id",
                type: "uint256",
            },
            {
                internalType: "string",
                name: "_discount",
                type: "string",
            },
        ],
        name: "bbmDeposit",
        outputs: [],
        stateMutability: "payable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address[]",
                name: "_to",
                type: "address[]",
            },
            {
                internalType: "uint256",
                name: "_amount",
                type: "uint256",
            },
        ],
        name: "bbmMultiWithraw",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address payable",
                name: "_to",
                type: "address",
            },
        ],
        name: "bbmWithraw",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        stateMutability: "nonpayable",
        type: "constructor",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "uint256",
                name: "_id",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "_amount",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "string",
                name: "_discount",
                type: "string",
            },
        ],
        name: "Deposit",
        type: "event",
    },
    {
        inputs: [
            {
                internalType: "bool",
                name: "_bool",
                type: "bool",
            },
        ],
        name: "enableBuyback",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
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
        inputs: [],
        name: "refWithdraw",
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
                internalType: "uint256",
                name: "_baseFee",
                type: "uint256",
            },
        ],
        name: "setBaseFee",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_buybackShare",
                type: "uint256",
            },
            {
                internalType: "address",
                name: "_buybackAddress",
                type: "address",
            },
        ],
        name: "setBuyback",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "string",
                name: "_code",
                type: "string",
            },
            {
                internalType: "uint256",
                name: "_percent",
                type: "uint256",
            },
            {
                internalType: "address",
                name: "_referral",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "_usageLimit",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "_volumeLimit",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "_timeLimit",
                type: "uint256",
            },
        ],
        name: "setDiscounts",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_address",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "_share",
                type: "uint256",
            },
        ],
        name: "setReferrals",
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
        name: "baseFee",
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
        name: "buyback",
        outputs: [
            {
                internalType: "uint256",
                name: "share",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "balance",
                type: "uint256",
            },
            {
                internalType: "address",
                name: "buyer",
                type: "address",
            },
            {
                internalType: "bool",
                name: "enabled",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "string",
                name: "_code",
                type: "string",
            },
        ],
        name: "getDiscount",
        outputs: [
            {
                internalType: "uint256",
                name: "percent",
                type: "uint256",
            },
            {
                internalType: "address",
                name: "referral",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "usageLimit",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "volumeLimit",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "timeLimit",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_address",
                type: "address",
            },
        ],
        name: "getReferral",
        outputs: [
            {
                internalType: "uint256",
                name: "share",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "balance",
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
        name: "totalReferralBalance",
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
];
