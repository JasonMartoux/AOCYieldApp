# Yield App

**Investissez simplement, sans jargon crypto.**

Une application mobile-first qui permet d'investir en DeFi avec une interface ultra-simplifiée (3 boutons).

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│  Web App Mobile-First (3 boutons)                           │
│  • Login email/mdp • On-ramp ZKP2P • Dashboard             │
└─────────────────────────┬───────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│  Backend API (orchestration, users, notifications)        │
└─────────────────────────┬───────────────────────────────────┘
                          │
      ┌───────────────────┼───────────────────┐
      ▼                   ▼                   ▼
┌────────────┐     ┌────────────┐     ┌────────────┐
│   Zyfi     │     │   ZKP2P    │     │   Bankr    │
│ (Wallet)   │     │ (On-ramp)  │     │  (Swap)    │
│ Safe cust. │     │ Fiat→USDC  │     │  Optionnel │
└─────┬──────┘     └────────────┘     └────────────┘
      │
      ▼
┌────────────┐
│   Zyfi     │
│  (Yield)   │
│ Strategies │
└────────────┘
```

## 🎯 Stack Technique

| Layer | Technology |
|-------|------------|
| **Frontend** | Next.js 15 + React 19 + Tailwind CSS |
| **State** | TanStack Query + React Context |
| **Wallet** | Bankr (Account Abstraction) |
| **On-ramp** | ZKP2P (Fiat → USDC avec ZK Proofs) |
| **Yield** | Zyfi SDK (Aave, Compound, Morpho, Aerodrome) |

## 📁 Structure du Projet

```
yield-app/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout avec Providers
│   │   ├── page.tsx            # Page principale (3 boutons)
│   │   └── globals.css         # Styles globaux
│   ├── components/ui/          # Composants UI réutilisables
│   │   ├── Button.tsx
│   │   └── Card.tsx
│   ├── features/
│   │   ├── wallet/             # Intégration Bankr
│   │   │   ├── WalletContext.tsx
│   │   │   └── useBankr.ts
│   │   ├── zk2p2p/             # On-ramp ZKP2P
│   │   │   └── useZK2P2P.ts
│   │   └── dashboard/          # Dashboard Yield
│   │       ├── Dashboard.tsx
│   │       └── mockData.ts
│   ├── lib/
│   │   ├── utils.ts            # cn() utility
│   │   ├── format.ts            # Formatage currency/%
│   │   └── bankr.ts             # Types Bankr
│   └── providers.tsx           # React Query Provider
├── .env.example                 # Variables d'environnement
├── package.json
└── README.md
```

## 🚀 Démarrer

```bash
# Installer les dépendances
cd yield-app
npm install

# Configurer les variables d'environnement
cp .env.example .env.local
# Éditer .env.local avec vos clés API

# Lancer le serveur de dev
npm run dev
```

## 📋 Variables d'Environnement

```env
# Bankr (Wallet Management)
NEXT_PUBLIC_BANKR_API_KEY=xxx
NEXT_PUBLIC_BANKR_BASE_URL=https://api.bankr.io

# ZKP2P (On-ramp Fiat → Crypto)
NEXT_PUBLIC_ZK2P2P_API_KEY=xxx
NEXT_PUBLIC_ZK2P2P_BASE_URL=https://api.zkp2p.io

# Zyfi (Yield Strategies)
NEXT_PUBLIC_ZYFI_API_KEY=xxx
```

## 🎨 UX Guidelines

- **Zéro jargon crypto** → "Votre épargne travaille" pas "deposit into yield-bearing vault"
- **On-ramp simple** → Carte bancaire ou virement, pas MetaMask
- **3 boutons** → "Investir", "Mes gains", "Retirer"
- **Frais transparents** → Pas de surprise gas fees

## 📊 Profils de Risque

| Profil | APY | Protocoles |
|--------|-----|------------|
| **Prudent** | 4-6% | Aave, Compound |
| **Dynamique** | 8-15% | Morpho, Aerodrome |

## 🔐 Sécurité

- Wallet géré par **Bankr** (Account Abstraction)
- On-ramp via **ZKP2P** (ZK Proofs pour trustlessness)
- **Zyfi SDK** pour les stratégies yield

## 📱 Flux Utilisateur

```
1. Inscription (email/mdp)
2. Déposer par carte/virement (fiat → USDC via ZKP2P)
3. Choisir "Profil prudent" ou "Profil dynamique"
4. Voir ses gains en temps réel
5. Retirer quand veut
```

---

## 📚 Documentation

- [Bankr API](https://docs.bankr.io)
- [ZKP2P Docs](https://docs.zkp2p.io)
- [Zyfi SDK](https://docs.zyf.ai)
