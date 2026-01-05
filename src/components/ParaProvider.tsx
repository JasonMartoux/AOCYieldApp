import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Environment,
  ParaProvider as ParaSDKProvider,
} from "@getpara/react-sdk";
import type { TExternalWallet } from "@getpara/react-sdk";
import { base } from "wagmi/chains";

// Para API configuration - set these in your .env file
const API_KEY = import.meta.env.VITE_PARA_API_KEY;
const WALLET_CONNECT_PROJECT_ID = import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID;
const ENVIRONMENT = Environment.BETA;

if (!API_KEY) {
  throw new Error(
    "Para API key is not defined. Please:\n" +
    "1. Copy .env.example to .env\n" +
    "2. Set VITE_PARA_API_KEY in your .env file"
  );
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 2,
    },
  },
});

export function ParaProvider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ParaSDKProvider
        paraClientConfig={{
          apiKey: API_KEY,
          env: ENVIRONMENT,
        }}
        config={{ appName: "AOC Yield App" }}
        paraModalConfig={{
          disableEmailLogin: false,
          disablePhoneLogin: false,
          authLayout: ["AUTH:FULL", "EXTERNAL:FULL"],
          oAuthMethods: ["APPLE", "DISCORD", "FACEBOOK", "FARCASTER", "GOOGLE", "TWITTER"],
          onRampTestMode: true,
          theme: {
            foregroundColor: "#222222",
            backgroundColor: "#FFFFFF",
            accentColor: "#888888",
            darkForegroundColor: "#EEEEEE",
            darkBackgroundColor: "#111111",
            darkAccentColor: "#AAAAAA",
            mode: "light",
            borderRadius: "none",
            font: "Inter",
          },
          recoverySecretStepEnabled: true,
          twoFactorAuthEnabled: false,
        }}
        externalWalletConfig={{
          // Supported external wallets in order of appearance
          wallets: [
            'Metamask' as TExternalWallet,
          ],
          // EVM chains configuration - Using Base only (Zyfai primary chain)
          evmConnector: {
            config: {
              chains: [base], // Base (8453) - Primary Zyfai chain
            },
          },
          // WalletConnect configuration (optional but recommended)
          walletConnect: WALLET_CONNECT_PROJECT_ID
            ? { projectId: WALLET_CONNECT_PROJECT_ID }
            : undefined,
          // App URL for Solana mobile wallet adapter
          appUrl: typeof window !== "undefined"
            ? `${window.location.protocol}//${window.location.host}`
            : undefined,
        }}
      >
        {children}
      </ParaSDKProvider>
    </QueryClientProvider>
  );
}