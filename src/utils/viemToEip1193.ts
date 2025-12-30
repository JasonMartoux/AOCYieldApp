/**
 * EIP-1193 Provider Adapter for Viem WalletClient
 *
 * Converts a Viem WalletClient (from Para SDK) into an EIP-1193 compatible provider
 * that can be used with libraries like Zyfai SDK that expect a standard Ethereum provider.
 *
 * This enables embedded wallets (email, social login) to work with external SDKs.
 */

import type { WalletClient } from 'viem';
import { type Hash, toHex } from 'viem';

/**
 * EIP-1193 Provider interface
 * https://eips.ethereum.org/EIPS/eip-1193
 */
export interface EIP1193Provider {
  request(args: { method: string; params?: Array<any> }): Promise<any>;
  on?(eventName: string, listener: (...args: any[]) => void): void;
  removeListener?(eventName: string, listener: (...args: any[]) => void): void;
}

/**
 * Creates an EIP-1193 compatible provider from a Viem WalletClient
 *
 * @param walletClient - The Viem WalletClient from Para SDK (useWalletClient hook)
 * @returns An EIP-1193 compatible provider
 *
 * @example
 * ```typescript
 * const { data: walletClient } = useWalletClient();
 * const provider = createEIP1193Provider(walletClient);
 * await sdk.connectAccount(provider, chainId);
 * ```
 */
export function createEIP1193Provider(walletClient: WalletClient): EIP1193Provider {
  if (!walletClient) {
    throw new Error('WalletClient is required to create EIP-1193 provider');
  }

  const provider: EIP1193Provider = {
    async request({ method, params = [] }) {
      try {
        switch (method) {
          // Chain ID
          case 'eth_chainId': {
            const chainId = walletClient.chain?.id;
            if (!chainId) throw new Error('Chain ID not available');
            return toHex(chainId);
          }

          // Account address
          case 'eth_accounts':
          case 'eth_requestAccounts': {
            const address = walletClient.account?.address;
            if (!address) throw new Error('Account not available');
            return [address];
          }

          // Personal sign (for messages)
          case 'personal_sign': {
            const [message] = params;
            if (!walletClient.account) throw new Error('Account not available');

            // Viem expects the message as a string or hex
            const signature = await walletClient.signMessage({
              account: walletClient.account,
              message: typeof message === 'string' && message.startsWith('0x')
                ? { raw: message as Hash }
                : message,
            });
            return signature;
          }

          // Sign typed data (EIP-712) - used for SIWE
          case 'eth_signTypedData':
          case 'eth_signTypedData_v3':
          case 'eth_signTypedData_v4': {
            const [, typedData] = params;
            if (!walletClient.account) throw new Error('Account not available');

            const parsedData = typeof typedData === 'string'
              ? JSON.parse(typedData)
              : typedData;

            const signature = await walletClient.signTypedData({
              account: walletClient.account,
              domain: parsedData.domain,
              types: parsedData.types,
              primaryType: parsedData.primaryType,
              message: parsedData.message,
            });
            return signature;
          }

          // Send transaction
          case 'eth_sendTransaction': {
            const [transaction] = params;
            if (!walletClient.account) throw new Error('Account not available');

            // Build transaction parameters based on type (EIP-1559 vs legacy)
            const txParams: any = {
              account: walletClient.account,
              to: transaction.to,
              value: transaction.value ? BigInt(transaction.value) : undefined,
              data: transaction.data,
              gas: transaction.gas ? BigInt(transaction.gas) : undefined,
              nonce: transaction.nonce ? Number(transaction.nonce) : undefined,
            };

            // Use EIP-1559 if maxFeePerGas is provided, otherwise legacy
            if (transaction.maxFeePerGas || transaction.maxPriorityFeePerGas) {
              txParams.maxFeePerGas = transaction.maxFeePerGas ? BigInt(transaction.maxFeePerGas) : undefined;
              txParams.maxPriorityFeePerGas = transaction.maxPriorityFeePerGas ? BigInt(transaction.maxPriorityFeePerGas) : undefined;
            } else if (transaction.gasPrice) {
              txParams.gasPrice = BigInt(transaction.gasPrice);
            }

            const hash = await walletClient.sendTransaction(txParams);
            return hash;
          }

          // Get balance
          case 'eth_getBalance': {
            // Note: walletClient doesn't have getBalance, would need a public client
            // This is a limitation - consider using window.ethereum for this if available
            throw new Error('eth_getBalance not supported by wallet client adapter. Use a public client instead.');
          }

          // Network version
          case 'net_version': {
            const chainId = walletClient.chain?.id;
            if (!chainId) throw new Error('Chain ID not available');
            return String(chainId);
          }

          // Default: method not supported
          default:
            throw new Error(`Method ${method} not supported by EIP-1193 adapter`);
        }
      } catch (error) {
        console.error(`Error in EIP-1193 provider.request(${method}):`, error);
        throw error;
      }
    },

    // Event listeners (optional but some libraries expect them)
    on(eventName: string) {
      // Basic implementation - could be enhanced with actual event handling
      console.warn(`EIP-1193 adapter: event listener for '${eventName}' registered but not fully implemented`);
    },

    removeListener(eventName: string) {
      // Basic implementation
      console.warn(`EIP-1193 adapter: event listener for '${eventName}' removed`);
    },
  };

  return provider;
}

/**
 * Type guard to check if a provider is EIP-1193 compatible
 */
export function isEIP1193Provider(provider: any): provider is EIP1193Provider {
  return provider && typeof provider.request === 'function';
}
