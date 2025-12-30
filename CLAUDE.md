# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

AOC Yield App is a multichain Web3 application built with React, TypeScript, and Vite. The app integrates the Para SDK for wallet management across multiple blockchain ecosystems (EVM, Solana, Cosmos).

## Setup

### Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env
```

Required variables:
- `VITE_PARA_API_KEY` - Para SDK API key (beta or production)
- `VITE_WALLET_CONNECT_PROJECT_ID` - WalletConnect project ID (optional but recommended)
- `VITE_ZYFAI_API_KEY` - Zyfai SDK API key for yield optimization
- `VITE_ZYFAI_ENVIRONMENT` - Zyfai environment (staging or production)

## Development Commands

```bash
# Start development server with HMR
npm run dev

# Type-check and build for production
npm run build

# Lint the codebase
npm run lint

# Preview production build
npm run preview
```

## Architecture

### Provider Pattern

The app uses a nested provider architecture with three key providers:

1. **ParaProvider** (src/components/ParaProvider.tsx) - Main provider for wallet management
   - Configures Para SDK with API key and environment
   - Sets up QueryClient for react-query
   - Configures external wallet support (MetaMask, Phantom, Keplr, etc.)
   - Defines supported chains:
     - **EVM**: Base (8453) - Primary Zyfai chain for USDC yield optimization
     - **Solana**: Devnet
   - Configures OAuth methods: Apple, Discord, Facebook, Farcaster, Google, Twitter
   - Theme and modal configuration

2. **ZyfaiProvider** (src/contexts/ZyfaiContext.tsx) - Yield optimization and Smart Wallet management
   - Automatically connects when Para wallet is connected (supports all wallet types)
   - Uses Wagmi's `useWalletClient()` hook to access the connected wallet
   - **Supports multiple wallet types**:
     - ✅ Embedded wallets (email, phone, social login) via EIP-1193 adapter
     - ✅ External wallets (MetaMask, Coinbase Wallet, etc.) via window.ethereum
   - Uses custom EIP-1193 adapter (src/utils/viemToEip1193.ts) to convert Viem WalletClient to standard provider
   - Manages Safe Smart Wallet deployment
   - Provides hooks for DeFi operations (deposit, withdraw, positions, earnings)

### Multi-Chain Wallet Integration

The app supports multiple blockchain ecosystems through Para SDK's unified interface:

- **EVM chains**: Base mainnet (8453) - configured for Zyfai yield optimization
- **Solana**: Devnet (configured via WalletAdapterNetwork)
- **Cosmos**: Via Keplr and Leap wallet support

Wallet connections are handled through:
- External wallets (MetaMask, Phantom, Keplr, etc.)
- Embedded wallets created via Para SDK
- Linked embedded wallets for selected external wallets

### Component Structure

- **src/components/ParaProvider.tsx**: Main app provider with chain/wallet config
- **src/utils/viemToEip1193.ts**: EIP-1193 adapter to convert Viem WalletClient to standard Ethereum provider
- **src/components/ui/**: UI components
  - ConnectCard.tsx: Wallet connection UI
  - WalletInfo.tsx: Display connected wallet info
  - SignMessage.tsx: Message signing interface
  - SmartWalletInfo.tsx: Zyfai Smart Wallet status and deployment
  - DepositWithdraw.tsx: Fund management interface (deposit/withdraw USDC/USDT)
  - YieldDashboard.tsx: Active positions and earnings display
- **src/contexts/**: React contexts
  - ZyfaiContext.tsx: Zyfai SDK integration and state management
- **src/hooks/**: Custom React hooks
  - useSignHelloWorld.ts: Hook for signing messages with connected wallet
  - useZyfaiOperations.ts: Hooks for Zyfai operations (deploy, deposit, withdraw, positions, earnings)

### Key Dependencies

- **@getpara/react-sdk**: Unified multichain wallet SDK
- **@zyfai/sdk**: Yield optimization and Smart Wallet (Safe) deployment
- **wagmi**: EVM chain configuration (chains imported but wallet connection handled by Para)
- **@solana/wallet-adapter-base & @solana/web3.js**: Solana network configuration
- **@tanstack/react-query**: Async state management
- **@cosmjs/***: Cosmos chain support (Proto signing, Stargate, CosmWasm)

### Zyfai Integration

The app integrates Zyfai SDK for yield optimization across supported chains (Base, Arbitrum, Plasma):

**Smart Wallet Features:**
- Deploys ERC-4337/ERC-7579 compliant Safe Smart Wallets
- Deterministic address generation
- Automatic connection when Para wallet connects

**Yield Operations:**
- Deposit funds (USDC for Base/Arbitrum, USDT for Plasma)
- Withdraw funds (full or partial)
- View active DeFi positions across protocols
- Track onchain earnings

**Supported Chains:**
- Base (8453) - USDC
- Arbitrum (42161) - USDC
- Plasma (9745) - USDT

### Configuration

- **Para API**: Configured via `VITE_PARA_API_KEY` environment variable, uses Beta environment
- **WalletConnect**: Project ID configured via `VITE_WALLET_CONNECT_PROJECT_ID` environment variable
- **Vite config**: Uses SWC for Fast Refresh, node polyfills for Web3 libraries, allows all hosts for server (useful for mobile/network testing)

### State Management

- React Query (via @tanstack/react-query) handles async wallet operations and caching
- Para SDK hooks provide wallet connection state:
  - useAccount() - connection status and account info
  - useWallet() - wallet details
  - useModal() - control connection modal
  - useSignMessage() - message signing functionality

### Build Tooling

- **TypeScript**: Three configs (tsconfig.json, tsconfig.app.json, tsconfig.node.json)
- **ESLint**: Flat config with React hooks and React refresh plugins
- **Vite**: Using @vitejs/plugin-react-swc for fast builds
- **Node Polyfills**: vite-plugin-node-polyfills for browser compatibility with blockchain libraries
