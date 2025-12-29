import { useState } from 'react'
import { useModal, useAccount, useClient } from "@getpara/react-sdk";
import { useSignHelloWorld } from "./hooks/useSignHelloWorld";
import { ConnectCard } from "./components/ui/ConnectCard";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { WalletInfo } from './components/ui/WalletInfo';
import { SignMessage } from './components/ui/SignMessage';

function App() {
  const [count, setCount] = useState(0)
  // Para SDK hooks
  const { openModal } = useModal();
  const { isConnected } = useAccount();
  //const para = useClient();

    // Sign message hook
  const { sign, message, isPending, error, signature } = useSignHelloWorld();

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <div>
        {!isConnected ? (
          <ConnectCard onConnect={openModal} />
        ) : (
          <div className="max-w-xl mx-auto">
            <WalletInfo />
            <SignMessage
              message={message}
              onSign={sign}
              isPending={isPending}
              error={error}
              signature={signature}
            />
          </div>
        )}
      </div>
    </>
  )
}

export default App
