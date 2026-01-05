# Plan de Refonte Complète - AOC Yield App
## Redesign selon les principes de BetterCryptoFuckingWebsite.com

---

## 🎯 OBJECTIF DE LA REFONTE

Transformer l'application AOC Yield d'une plateforme crypto traditionnelle (avec friction d'onboarding et manque de transparence) vers une **application web moderne, honnête et accessible** qui respecte les principes de https://bettercryptofuckingwebsite.com/.

### Principes Directeurs

1. **"Wallet Comes Later"** - Permettre l'exploration sans connexion obligatoire
2. **Transparence Totale** - Afficher tous les frais, risques et mécaniques clairement
3. **Design Sobre** - Esthétique "boring finance" professionnelle, pas de gradients excessifs
4. **Langage Clair** - Éliminer le jargon crypto, utiliser un langage humain
5. **Respect de l'Utilisateur** - Pas de friction inutile, pas de signatures forcées

---

## 📊 ANALYSE DE L'EXISTANT

### Ce qui fonctionne bien ✅
- Design system cohérent (Emerald + Grayscale)
- Typographie lisible (IBM Plex Sans + JetBrains Mono)
- Esthétique déjà sobre et professionnelle
- Formatage des montants clair
- Architecture composants bien structurée

### Problèmes critiques identifiés ❌

**1. ONBOARDING BLOQUANT**
- Aucun contenu visible sans wallet connecté
- Auto-signature Zyfai forcée immédiatement après connexion Para
- Workflow linéaire obligatoire (6 étapes séquentielles)
- Pas de mode "exploration"

**2. MANQUE DE TRANSPARENCE**
- ZÉRO mention des frais (deposit, withdrawal, performance, gas)
- Revendications "gasless" trompeuses
- Aucune divulgation des risques DeFi
- APY "optimisé par IA" sans explication de la méthode

**3. JARGON TECHNIQUE**
- Termes non expliqués: APY, TVL, Pool, Protocol, Safe, Session Key, DYOR
- Pas de glossaire
- Pas de tooltips éducatifs

**4. FRICTION INUTILE**
- Signature SIWE automatique et surprenante
- Déploiement Smart Wallet obligatoire avant de voir les opportunités
- Attente 5-15min pour optimisation sans visibilité

---

## 🎨 NOUVELLE ARCHITECTURE PROPOSÉE

### 1. MODE EXPLORATION (Sans Wallet)

**Nouvelle page d'accueil accessible à tous:**

```
┌─────────────────────────────────────────────┐
│  HEADER                                     │
│  Logo | Yield Strategies | How It Works |  │
│                        [Explore] [Connect]  │
├─────────────────────────────────────────────┤
│  HERO SECTION                               │
│  "Earn More on Your Stablecoins"           │
│  Simple. Transparent. Actually Safe.        │
│                                             │
│  📊 Current Best APY: 11.96% (Live)        │
│      Base APY: 8.26% + Rewards: 3.70%      │
│                                             │
│      [Start Earning →]                      │
├─────────────────────────────────────────────┤
│  YIELD STRATEGIES (Interactive)             │
│  ┌──────────────┐  ┌──────────────┐        │
│  │ 🛡️ SAFE      │  │ ⚡ DEGEN     │        │
│  │ 8.2% APY     │  │ 15.4% APY    │        │
│  │ Low Risk     │  │ High Risk    │        │
│  │              │  │              │        │
│  │ [Learn More] │  │ [Learn More] │        │
│  └──────────────┘  └──────────────┘        │
├─────────────────────────────────────────────┤
│  PROTOCOL BREAKDOWN                         │
│  See exactly where your money goes          │
│  ┌─────────────────────────────────────┐   │
│  │ Protocol  | APY  | TVL     | Risk   │   │
│  ├─────────────────────────────────────┤   │
│  │ Morpho    | 8.2% | $124M   | Low    │   │
│  │ Aave      | 7.8% | $2.1B   | Low    │   │
│  │ Compound  | 7.5% | $980M   | Low    │   │
│  └─────────────────────────────────────┘   │
├─────────────────────────────────────────────┤
│  TRANSPARENT FEES                           │
│  ┌─────────────────────────────────────┐   │
│  │ What You'll Pay (The Truth)         │   │
│  │                                      │   │
│  │ • Deposits: FREE                     │   │
│  │ • Withdrawals: FREE                  │   │
│  │ • Performance Fee: 10% of earnings   │   │
│  │ • Gas Costs: ~$2-5 (one-time setup) │   │
│  │                                      │   │
│  │ Example: Earn $100 → Keep $90        │   │
│  └─────────────────────────────────────┘   │
├─────────────────────────────────────────────┤
│  RISKS (Honest Disclosure)                  │
│  ┌─────────────────────────────────────┐   │
│  │ What Could Go Wrong                  │   │
│  │                                      │   │
│  │ ⚠️ Smart Contract Risk               │   │
│  │    Protocols could be exploited      │   │
│  │                                      │   │
│  │ ⚠️ APY Variability                   │   │
│  │    Rates change daily                │   │
│  │                                      │   │
│  │ ⚠️ Withdrawal Delays                 │   │
│  │    May take hours during congestion │   │
│  │                                      │   │
│  │ [Full Risk Disclosure →]             │   │
│  └─────────────────────────────────────┘   │
├─────────────────────────────────────────────┤
│  HOW IT WORKS (Step-by-Step)               │
│  Plain language explanation of process      │
└─────────────────────────────────────────────┘
```

**Fichiers à créer:**
- `src/pages/ExploreMode.tsx` - Page d'accueil publique
- `src/components/explore/HeroSection.tsx`
- `src/components/explore/StrategyComparison.tsx`
- `src/components/explore/ProtocolBreakdown.tsx`
- `src/components/explore/FeeDisclosure.tsx`
- `src/components/explore/RiskWarnings.tsx`
- `src/components/explore/HowItWorks.tsx`

### 2. CONNEXION WALLET OPTIONNELLE

**Nouveau flux:**

```
Mode Exploration
     ↓
User clicks "Start Earning"
     ↓
Modal: "Ready to Earn?"
┌─────────────────────────────────────┐
│ You'll need to:                     │
│ 1. Connect your wallet              │
│ 2. Deploy a Smart Wallet (~$3 gas)  │
│ 3. Deposit stablecoins              │
│                                     │
│ [Connect Wallet] [Not Yet]          │
└─────────────────────────────────────┘
     ↓
Para SDK Modal (Email/Social/Wallet)
     ↓
Wallet Connected
     ↓
Dashboard with "Deploy Smart Wallet" option
(Can view data but can't deposit until deployed)
```

**Changements nécessaires:**
- Supprimer auto-connexion Zyfai dans `ZyfaiContext.tsx` (ligne 220-226)
- Modifier `App.tsx` pour montrer ExploreMode par défaut
- Créer `ConnectPrompt.tsx` modal explicatif
- Rendre déploiement Safe optionnel jusqu'au premier dépôt

### 3. DASHBOARD TRANSPARENT

**Nouvelle structure du dashboard (après connexion):**

```
┌─────────────────────────────────────────────┐
│  PORTFOLIO OVERVIEW                         │
│  ┌──────────────┐  ┌──────────────┐        │
│  │ Total Value  │  │ Total Earned │        │
│  │ $1,234.56    │  │ $34.12       │        │
│  │              │  │ (After fees) │        │
│  └──────────────┘  └──────────────┘        │
├─────────────────────────────────────────────┤
│  EARNINGS BREAKDOWN                         │
│  ┌─────────────────────────────────────┐   │
│  │ Gross Earnings:        $38.00       │   │
│  │ Performance Fee (10%): -$3.80       │   │
│  │ Net Earnings:          $34.20       │   │
│  └─────────────────────────────────────┘   │
├─────────────────────────────────────────────┤
│  ACTIVE POSITIONS                           │
│  ┌─────────────────────────────────────┐   │
│  │ Protocol      | Amount | APY | Risk │   │
│  ├─────────────────────────────────────┤   │
│  │ Morpho USDC   | $500   | 8.2%| Low  │   │
│  │ Compound USDC | $300   | 7.5%| Low  │   │
│  │                                      │   │
│  │ Weighted Average APY: 7.94%          │   │
│  └─────────────────────────────────────┘   │
└─────────────────────────────────────────────┘
```

**Modifications:**
- Ajouter composant `FeeBreakdown.tsx`
- Modifier `YieldDashboard.tsx` pour montrer "Net Earnings" (après frais)
- Ajouter tooltip "What's this?" sur chaque métrique
- Remplacer termes techniques par langage clair

### 4. GLOSSAIRE & TOOLTIPS

**Système de tooltips contextuels:**

```tsx
<TooltipTerm term="APY">
  Annual Percentage Yield - How much you'll earn
  in a year if rates stay the same. Rates change
  daily, so this is an estimate.
</TooltipTerm>
```

**Fichiers à créer:**
- `src/components/ui/TooltipTerm.tsx`
- `src/utils/glossary.ts` - Définitions centralisées
- `src/pages/Glossary.tsx` - Page glossaire complète

**Termes à expliquer:**
- APY / Annual Percentage Yield
- TVL / Total Value Locked
- Pool / Liquidity Pool
- Protocol / DeFi Protocol
- Smart Wallet / Safe
- Session Key
- Gas Fees
- Performance Fee
- USDC / USDT
- Rebalance

---

## 🔧 CHANGEMENTS TECHNIQUES DÉTAILLÉS

### Phase 1: Structure de Navigation

**Créer un router simple:**

```
/                    → ExploreMode (public)
/dashboard           → Dashboard (requires wallet)
/glossary            → Glossary (public)
/risks               → Risk Disclosure (public)
/fees                → Fee Structure (public)
/how-it-works        → Educational content (public)
```

**Fichiers:**
- Installer `react-router-dom`
- `src/router.tsx` - Configuration des routes
- `src/layouts/PublicLayout.tsx` - Layout pour pages publiques
- `src/layouts/DashboardLayout.tsx` - Layout pour dashboard

### Phase 2: Séparation Connexion Para / Zyfai

**Actuellement:** Auto-connexion Zyfai dès connexion Para

**Nouveau:**
```tsx
// ZyfaiContext.tsx
// SUPPRIMER auto-effect (lignes 220-226)

// AJOUTER méthode manuelle
const connectZyfaiManually = async () => {
  if (!account.isConnected) {
    throw new Error('Connect Para wallet first');
  }
  await connectZyfai();
};
```

**Utilisation:**
```tsx
// Dashboard.tsx
{!isZyfaiConnected && (
  <InfoBox>
    To deposit funds, you need to set up your Smart Wallet.
    This is a one-time setup that costs ~$3 in gas fees.

    <Button onClick={connectZyfaiManually}>
      Set Up Smart Wallet
    </Button>
  </InfoBox>
)}
```

### Phase 3: Composants de Transparence

**1. FeeDisclosure.tsx**
```tsx
interface FeeStructure {
  depositFee: number;        // 0%
  withdrawalFee: number;      // 0%
  performanceFee: number;     // 10%
  estimatedGasSetup: string;  // "$2-5"
  estimatedGasPerTx: string;  // "Free (gasless)"
}

export function FeeDisclosure() {
  return (
    <Card>
      <h3>What You'll Pay</h3>

      <FeeRow
        label="Deposit Fee"
        value="FREE"
        tooltip="No charge to add funds"
      />

      <FeeRow
        label="Withdrawal Fee"
        value="FREE"
        tooltip="No charge to remove funds"
      />

      <FeeRow
        label="Performance Fee"
        value="10% of earnings"
        tooltip="We only earn when you earn. If you make $100 profit, we take $10."
      />

      <FeeRow
        label="One-Time Setup"
        value="~$3-5 gas"
        tooltip="Smart Wallet deployment on Base network"
      />

      <Divider />

      <Example>
        <strong>Example:</strong><br/>
        Deposit: $1,000<br/>
        Earn: $100 (10% APY)<br/>
        Our fee: $10<br/>
        <strong>You keep: $1,090</strong>
      </Example>
    </Card>
  );
}
```

**2. RiskDisclosure.tsx**
```tsx
export function RiskDisclosure() {
  return (
    <Card variant="warning">
      <h3>What Could Go Wrong</h3>

      <RiskItem
        severity="high"
        title="Smart Contract Risk"
        description="The protocols we use could have bugs or be exploited by hackers. While they're audited, no code is 100% safe."
      />

      <RiskItem
        severity="medium"
        title="APY Changes Daily"
        description="The yield rates you see today will change. They could go up or down. Past performance doesn't predict future returns."
      />

      <RiskItem
        severity="medium"
        title="Withdrawal Delays"
        description="During high network congestion, withdrawals might take several hours or cost more in gas fees."
      />

      <RiskItem
        severity="low"
        title="Stablecoin De-pegging"
        description="USDC/USDT could lose their $1 peg during extreme market events."
      />

      <Disclaimer>
        <strong>Important:</strong> Only deposit money you can afford to lose.
        This is not financial advice. Do your own research.
      </Disclaimer>
    </Card>
  );
}
```

### Phase 4: Refonte Visuelle

**Changements esthétiques:**

1. **Supprimer gradients excessifs**
   - Garder: Background gradients subtils
   - Supprimer: Gradients sur badges/buttons sauf CTA primaire

2. **Améliorer contraste**
   - Text principal: `#0A0A0A` → `#000000`
   - Text secondaire: `#737373` → `#666666`
   - Vérifier ratio WCAG AA (4.5:1 minimum)

3. **Simplifier badges**
   - Bordures solides plutôt que gradients
   - Couleurs plates (emerald-600, blue-600, amber-600)

4. **Espacement cohérent**
   - Padding sections: 2rem (32px)
   - Gap entre cards: 1.5rem (24px)
   - Margin bottom titles: 1rem (16px)

**Fichier App.css à modifier:**
```css
/* Améliorer lisibilité */
:root {
  --text-primary: #000000;
  --text-secondary: #666666;
  --text-tertiary: #999999;

  --bg-primary: #FFFFFF;
  --bg-secondary: #FAFAFA;

  --border-light: #E0E0E0;
  --border-medium: #D0D0D0;

  /* Ratios de contraste WCAG AA */
  --accent-green: #047857; /* Plus foncé pour meilleur contraste */
}

/* Typographie améliorée */
body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-feature-settings: "kern" 1, "liga" 1;
}

/* Supprimer animations excessives */
.fade-in {
  animation: none; /* Optionnel selon préférence */
}
```

---

## 📝 PLAN D'IMPLÉMENTATION PAR ÉTAPES

### ÉTAPE 1: Infrastructure de Routing ⏱️ 2h

**Objectif:** Créer structure multi-pages

1. Installer react-router-dom: `npm install react-router-dom`
2. Créer `src/router.tsx`
3. Créer `src/layouts/PublicLayout.tsx`
4. Créer `src/layouts/DashboardLayout.tsx`
5. Modifier `src/main.tsx` pour wrapper avec Router
6. Créer pages placeholders:
   - `src/pages/ExploreMode.tsx`
   - `src/pages/Dashboard.tsx`
   - `src/pages/Glossary.tsx`
   - `src/pages/Risks.tsx`
   - `src/pages/Fees.tsx`

**Fichiers modifiés:**
- `src/main.tsx`
- `src/App.tsx` (devient shell de routing)

**Nouveaux fichiers:**
- `src/router.tsx`
- `src/layouts/PublicLayout.tsx`
- `src/layouts/DashboardLayout.tsx`
- `src/pages/ExploreMode.tsx`
- `src/pages/Dashboard.tsx`
- `src/pages/Glossary.tsx`
- `src/pages/Risks.tsx`
- `src/pages/Fees.tsx`

### ÉTAPE 2: Mode Exploration Public ⏱️ 4h

**Objectif:** Créer page d'accueil accessible sans wallet

1. **Hero Section**
   - Fetch live APY data (useGetApyHistory sans auth)
   - Afficher "Current Best APY"
   - CTA "Start Earning"

2. **Strategy Comparison**
   - Fetch Safe vs Degen opportunities
   - Cards interactives avec "Learn More"
   - Modal détails par stratégie

3. **Protocol Breakdown**
   - Table des protocoles disponibles
   - APY, TVL, Risk rating
   - Liens vers audits

4. **Fee Disclosure**
   - Composant FeeDisclosure.tsx
   - Exemples calculés

5. **Risk Warnings**
   - Composant RiskDisclosure.tsx
   - Disclaimers honnêtes

**Fichiers créés:**
- `src/components/explore/HeroSection.tsx`
- `src/components/explore/StrategyComparison.tsx`
- `src/components/explore/ProtocolBreakdown.tsx`
- `src/components/explore/FeeDisclosure.tsx`
- `src/components/explore/RiskWarnings.tsx`
- `src/components/explore/HowItWorks.tsx`

### ÉTAPE 3: Séparation Para / Zyfai ⏱️ 2h

**Objectif:** Connexion Zyfai optionnelle

1. Modifier `ZyfaiContext.tsx`:
   - Supprimer useEffect auto-connexion (lignes 220-226)
   - Exposer `connectZyfaiManually()` method
   - Ajouter état `isZyfaiConnecting`

2. Créer `ConnectPrompt.tsx`:
   - Modal explicatif avant connexion Zyfai
   - Liste ce qui sera requis (signature, gas fees)
   - Boutons "Continue" / "Not Yet"

3. Modifier Dashboard:
   - Afficher données générales même sans Zyfai
   - Bloquer deposit/withdraw sans Smart Wallet
   - CTA "Set Up Smart Wallet" visible

**Fichiers modifiés:**
- `src/contexts/ZyfaiContext.tsx`
- `src/pages/Dashboard.tsx`

**Nouveaux fichiers:**
- `src/components/ui/ConnectPrompt.tsx`

### ÉTAPE 4: Système de Tooltips ⏱️ 3h

**Objectif:** Expliquer tous les termes techniques

1. Créer `TooltipTerm.tsx`:
   - Composant avec hover trigger
   - Intégration Headless UI (Popover)
   - Styling cohérent

2. Créer `glossary.ts`:
   - Définitions centralisées
   - Export termes + descriptions

3. Remplacer termes dans composants:
   - YieldDashboard: APY, TVL, Pool
   - DepositWithdraw: Gas, Session Key
   - SmartWalletInfo: Safe, Smart Wallet

4. Page Glossaire:
   - Liste alphabétique
   - Search/filter
   - Liens depuis tooltips

**Fichiers créés:**
- `src/components/ui/TooltipTerm.tsx`
- `src/utils/glossary.ts`
- `src/pages/Glossary.tsx`

**Fichiers modifiés:**
- `src/components/ui/YieldDashboard.tsx`
- `src/components/ui/DepositWithdraw.tsx`
- `src/components/ui/SmartWalletInfo.tsx`
- `src/components/ui/OpportunitiesPanel.tsx`

### ÉTAPE 5: Transparence des Frais ⏱️ 2h

**Objectif:** Afficher tous les coûts

1. Créer types de frais:
   ```ts
   interface FeeStructure {
     depositFee: number;
     withdrawalFee: number;
     performanceFee: number;
     gasEstimate: {
       setup: string;
       perTransaction: string;
     };
   }
   ```

2. Créer `FeeBreakdown.tsx`:
   - Affichage détaillé des frais
   - Calculateur "You earn X, we take Y"
   - Liens vers documentation

3. Modifier Dashboard:
   - Ajouter section "Earnings After Fees"
   - Distinguer Gross vs Net earnings
   - Tooltip sur chaque ligne

4. Modifier DepositWithdraw:
   - Afficher gas estimate avant transaction
   - Warning si frais élevés

**Fichiers créés:**
- `src/components/ui/FeeBreakdown.tsx`
- `src/types/fees.ts`

**Fichiers modifiés:**
- `src/components/ui/YieldDashboard.tsx`
- `src/components/ui/DepositWithdraw.tsx`

### ÉTAPE 6: Divulgation des Risques ⏱️ 2h

**Objectif:** Avertir honnêtement des risques

1. Créer `RiskWarning.tsx`:
   - Composant réutilisable
   - Niveaux de sévérité (high/medium/low)
   - Icônes appropriées

2. Créer page Risks:
   - Liste exhaustive des risques
   - Explications en langage clair
   - Ressources pour en savoir plus

3. Ajouter warnings contextuels:
   - OpportunitiesPanel: Risk pour Degen strategies
   - DepositWithdraw: Warning avant premier dépôt
   - YieldDashboard: APY variability notice

**Fichiers créés:**
- `src/components/ui/RiskWarning.tsx`
- `src/pages/Risks.tsx`

**Fichiers modifiés:**
- `src/components/ui/OpportunitiesPanel.tsx`
- `src/components/ui/DepositWithdraw.tsx`
- `src/components/ui/YieldDashboard.tsx`

### ÉTAPE 7: Polish Visuel ⏱️ 2h

**Objectif:** Finaliser l'esthétique "boring finance"

1. Modifier `App.css`:
   - Améliorer contraste (WCAG AA)
   - Simplifier palette de couleurs
   - Optimiser typographie

2. Audit composants:
   - Supprimer gradients excessifs
   - Uniformiser borders/shadows
   - Vérifier responsive

3. Accessibilité:
   - Ajouter aria-labels
   - Vérifier navigation clavier
   - Tester screen readers

**Fichiers modifiés:**
- `src/App.css`
- Tous les composants UI (audit visuel)

### ÉTAPE 8: Tests & Documentation ⏱️ 2h

**Objectif:** Vérifier que tout fonctionne

1. Tests manuels:
   - Mode exploration (sans wallet)
   - Connexion Para
   - Connexion Zyfai optionnelle
   - Deposit/Withdraw flow
   - Navigation entre pages

2. Documentation:
   - README mis à jour
   - Screenshots avant/après
   - Guide d'utilisation

3. Performance:
   - Lazy loading des routes
   - Optimisation bundle size
   - Vérifier Core Web Vitals

**Fichiers créés:**
- `docs/REDESIGN.md` - Documentation de la refonte

---

## 📁 FICHIERS CRITIQUES À MODIFIER/CRÉER

### À Modifier

1. **src/main.tsx** - Wrapper avec Router
2. **src/App.tsx** - Devient routing shell
3. **src/contexts/ZyfaiContext.tsx** - Connexion manuelle
4. **src/components/ui/YieldDashboard.tsx** - Frais, tooltips, clarté
5. **src/components/ui/DepositWithdraw.tsx** - Gas estimates, warnings
6. **src/components/ui/OpportunitiesPanel.tsx** - Risk warnings
7. **src/components/ui/SmartWalletInfo.tsx** - Explications claires
8. **src/App.css** - Contraste, palette

### À Créer (Nouveaux)

**Routing & Layouts:**
- `src/router.tsx`
- `src/layouts/PublicLayout.tsx`
- `src/layouts/DashboardLayout.tsx`

**Pages:**
- `src/pages/ExploreMode.tsx`
- `src/pages/Dashboard.tsx`
- `src/pages/Glossary.tsx`
- `src/pages/Risks.tsx`
- `src/pages/Fees.tsx`

**Composants Exploration:**
- `src/components/explore/HeroSection.tsx`
- `src/components/explore/StrategyComparison.tsx`
- `src/components/explore/ProtocolBreakdown.tsx`
- `src/components/explore/FeeDisclosure.tsx`
- `src/components/explore/RiskWarnings.tsx`
- `src/components/explore/HowItWorks.tsx`

**Composants UI:**
- `src/components/ui/TooltipTerm.tsx`
- `src/components/ui/FeeBreakdown.tsx`
- `src/components/ui/RiskWarning.tsx`
- `src/components/ui/ConnectPrompt.tsx`

**Utils & Types:**
- `src/utils/glossary.ts`
- `src/types/fees.ts`

---

## ⏱️ ESTIMATION TOTALE

**Temps total estimé:** 19 heures

**Répartition:**
- Infrastructure (routing): 2h
- Mode exploration: 4h
- Séparation Para/Zyfai: 2h
- Système tooltips: 3h
- Transparence frais: 2h
- Divulgation risques: 2h
- Polish visuel: 2h
- Tests & doc: 2h

**Découpage en sprints:**
- Sprint 1 (6h): Étapes 1-3 (Infrastructure + Exploration)
- Sprint 2 (7h): Étapes 4-5 (Tooltips + Frais)
- Sprint 3 (6h): Étapes 6-8 (Risques + Polish + Tests)

---

## ✅ CRITÈRES DE SUCCÈS

La refonte sera réussie si:

1. ✅ Un utilisateur peut explorer les stratégies SANS connexion wallet
2. ✅ Tous les frais sont clairement affichés AVANT toute action
3. ✅ Tous les risques majeurs sont divulgués honnêtement
4. ✅ Aucun jargon crypto sans explication (tooltip ou glossaire)
5. ✅ La connexion Zyfai n'est PAS automatique
6. ✅ Le design est sobre, professionnel, lisible (WCAG AA)
7. ✅ Les revendications "gasless" sont clarifiées (coûts one-time)
8. ✅ L'utilisateur comprend exactement ce qu'il paie et pourquoi

---

## 🚀 PROCHAINES ÉTAPES

1. **Review de ce plan** avec l'utilisateur
2. **Validation de l'approche** (mode exploration, frais, risques)
3. **Début implémentation** Sprint 1
4. **Itérations** basées sur feedback

---

## 📚 RESSOURCES & RÉFÉRENCES

- **Principes**: https://www.bettercryptofuckingwebsite.com/
- **Doc Zyfai**: `/home/jason/Projets/web3/AOCYieldApp/doc/SDK_ZYFAI_DOC_SUMMAY.md`
- **Doc Para**: Context7 via MCP
- **Design System**: Tailwind CSS + IBM Plex Sans
- **Accessibilité**: WCAG 2.1 Level AA

---

*Plan créé le: 2026-01-05*
*Branche: `redesign/better-ux`*
