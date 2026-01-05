export interface GlossaryTerm {
  term: string;
  full?: string;
  short: string;
  detailed: string;
}

export const glossary: Record<string, GlossaryTerm> = {
  apy: {
    term: 'APY',
    full: 'Annual Percentage Yield',
    short: 'How much you\'ll earn in a year if rates stay the same.',
    detailed: 'Annual Percentage Yield shows the rate of return over one year with compound interest. In DeFi, APY rates change daily based on market conditions, so this is always an estimate, not a guarantee.',
  },
  tvl: {
    term: 'TVL',
    full: 'Total Value Locked',
    short: 'The total amount of money in a protocol.',
    detailed: 'Total Value Locked represents the total dollar value of all assets deposited in a DeFi protocol. Higher TVL often indicates more trust, but it\'s not a guarantee of safety.',
  },
  'smart-wallet': {
    term: 'Smart Wallet',
    full: 'Smart Contract Wallet',
    short: 'A programmable wallet that can automate transactions.',
    detailed: 'A Smart Wallet (also called Smart Contract Wallet) is a wallet controlled by code rather than a private key. We use Safe (formerly Gnosis Safe) for security. It enables gasless transactions and automated yield optimization.',
  },
  safe: {
    term: 'Safe',
    full: 'Safe Smart Wallet',
    short: 'A secure smart wallet (formerly Gnosis Safe).',
    detailed: 'Safe is the most trusted smart contract wallet in DeFi, with billions of dollars secured. It allows for automated transactions while you maintain full control of your funds.',
  },
  'session-key': {
    term: 'Session Key',
    full: 'Session Key',
    short: 'A temporary permission for automated transactions.',
    detailed: 'A Session Key is like a limited power of attorney for your wallet. It allows specific actions (like yield optimization) without requiring your signature each time. You can revoke it anytime.',
  },
  'gas-fees': {
    term: 'Gas Fees',
    full: 'Gas Fees',
    short: 'The cost to process blockchain transactions.',
    detailed: 'Gas Fees are paid to network validators to process your transaction. You pay this to the blockchain, not to us. We cover ongoing gas fees through our performance fee.',
  },
  usdc: {
    term: 'USDC',
    full: 'USD Coin',
    short: 'A stablecoin pegged to $1 USD.',
    detailed: 'USDC (USD Coin) is a stablecoin issued by Circle. It\'s designed to always be worth $1 and is backed by cash and short-term US Treasury bonds. While stable, it can briefly de-peg during extreme market events.',
  },
  usdt: {
    term: 'USDT',
    full: 'Tether',
    short: 'A stablecoin pegged to $1 USD.',
    detailed: 'USDT (Tether) is one of the oldest stablecoins, designed to maintain a $1 value. It\'s backed by reserves held by Tether Limited. Like all stablecoins, it carries de-pegging risk.',
  },
  defi: {
    term: 'DeFi',
    full: 'Decentralized Finance',
    short: 'Financial services built on blockchain.',
    detailed: 'DeFi (Decentralized Finance) refers to financial services (lending, trading, earning interest) built on blockchain networks without traditional banks. It\'s transparent but comes with smart contract risks.',
  },
  protocol: {
    term: 'Protocol',
    full: 'DeFi Protocol',
    short: 'A set of smart contracts providing financial services.',
    detailed: 'A DeFi Protocol is a collection of smart contracts that provide financial services. Examples include Aave (lending), Uniswap (trading), and Morpho (yield optimization). Each protocol has its own risks and rewards.',
  },
  pool: {
    term: 'Pool',
    full: 'Liquidity Pool',
    short: 'A collection of funds used for DeFi activities.',
    detailed: 'A Liquidity Pool is funds locked in a smart contract, used for lending, trading, or other DeFi activities. Users who deposit into pools earn yield from protocol fees and interest.',
  },
  rebalance: {
    term: 'Rebalance',
    full: 'Rebalance',
    short: 'Moving funds between protocols to optimize yield.',
    detailed: 'Rebalancing means moving your funds from one protocol to another to maintain optimal returns as market conditions change. We automate this for you using your Session Key.',
  },
  'base-chain': {
    term: 'Base',
    full: 'Base Network',
    short: 'An Ethereum Layer 2 network by Coinbase.',
    detailed: 'Base is a Layer 2 blockchain built by Coinbase on Ethereum. It offers fast, cheap transactions while maintaining Ethereum\'s security. We use Base for lower gas fees and better user experience.',
  },
  'erc-4337': {
    term: 'ERC-4337',
    full: 'Account Abstraction Standard',
    short: 'A standard for smart wallets.',
    detailed: 'ERC-4337 is an Ethereum standard that enables smart wallets with features like gasless transactions, automated operations, and better security. It\'s the foundation of our Smart Wallet system.',
  },
  dyor: {
    term: 'DYOR',
    full: 'Do Your Own Research',
    short: 'Don\'t blindly trust anyone - verify yourself.',
    detailed: 'DYOR (Do Your Own Research) is a reminder that you should understand what you\'re investing in. Read documentation, check audits, understand risks. We provide transparency, but the decision is yours.',
  },
};

export function getTermDefinition(termKey: string): GlossaryTerm | undefined {
  return glossary[termKey.toLowerCase()];
}

export function getAllTerms(): GlossaryTerm[] {
  return Object.values(glossary).sort((a, b) => a.term.localeCompare(b.term));
}
