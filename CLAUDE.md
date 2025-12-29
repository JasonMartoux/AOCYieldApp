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

The app uses a nested provider architecture with two key providers:

1. **ParaProvider** (src/components/ParaProvider.tsx) - Main provider wrapping the entire app in main.tsx
   - Configures Para SDK with API key and environment
   - Sets up QueryClient for react-query
   - Configures external wallet support (MetaMask, Phantom, Keplr, etc.)
   - Defines supported chains: Ethereum mainnet, Polygon, Sepolia, Celo (EVM) and Solana Devnet
   - Configures OAuth methods: Apple, Discord, Facebook, Farcaster, Google, Twitter
   - Theme and modal configuration

2. **Providers** (src/providers.tsx) - Legacy/duplicate provider (note: currently has duplicate QueryClient setup)

### Multi-Chain Wallet Integration

The app supports three blockchain ecosystems through Para SDK's unified interface:

- **EVM chains**: Ethereum mainnet, Polygon, Sepolia testnet, Celo
- **Solana**: Devnet (configured via WalletAdapterNetwork)
- **Cosmos**: Via Keplr and Leap wallet support

Wallet connections are handled through:
- External wallets (MetaMask, Phantom, Keplr, etc.)
- Embedded wallets created via Para SDK
- Linked embedded wallets for selected external wallets

### Component Structure

- **src/components/ParaProvider.tsx**: Main app provider with chain/wallet config
- **src/components/ui/**: UI components
  - ConnectCard.tsx: Wallet connection UI
  - WalletInfo.tsx: Display connected wallet info
  - SignMessage.tsx: Message signing interface
- **src/hooks/**: Custom React hooks
  - useSignHelloWorld.ts: Hook for signing messages with connected wallet

### Key Dependencies

- **@getpara/react-sdk**: Unified multichain wallet SDK
- **wagmi**: EVM chain configuration (chains imported but wallet connection handled by Para)
- **@solana/wallet-adapter-base & @solana/web3.js**: Solana network configuration
- **@tanstack/react-query**: Async state management
- **@cosmjs/***: Cosmos chain support (Proto signing, Stargate, CosmWasm)

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
