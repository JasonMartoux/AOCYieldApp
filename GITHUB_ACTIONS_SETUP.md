# Configuration GitHub Actions + Coolify

## 1. Activer les permissions GitHub Container Registry

1. Allez sur votre repo GitHub
2. **Settings** → **Actions** → **General**
3. Scroll jusqu'à **Workflow permissions**
4. Sélectionnez **Read and write permissions**
5. Cochez **Allow GitHub Actions to create and approve pull requests**
6. Cliquez sur **Save**

## 2. Ajouter les secrets GitHub

1. Allez dans **Settings** → **Secrets and variables** → **Actions**
2. Cliquez sur **New repository secret** et ajoutez :

```
VITE_PARA_API_KEY=<votre_clé>
VITE_ZYFAI_API_KEY=<votre_clé>
VITE_ZYFAI_ENVIRONMENT=production
```

## 3. Rendre le package public (important!)

1. Allez sur la page de votre repo
2. Cliquez sur **Packages** (dans le menu de droite)
3. Sélectionnez votre image Docker
4. **Package settings** → **Change visibility** → **Public**

OU pour un package privé, créez un Personal Access Token (PAT):
- **Settings** → **Developer settings** → **Personal access tokens** → **Tokens (classic)**
- Générez un token avec les scopes: `read:packages`, `write:packages`

## 4. Modifier Coolify pour utiliser l'image pré-buildée

Au lieu de builder sur le serveur, modifiez votre configuration Coolify :

### Option A : Image publique (plus simple)
Dans Coolify, changez le **Build Pack** de "Dockerfile" vers "Docker Image" et utilisez :
```
ghcr.io/jasonmartoux/aocyieldapp:latest
```

### Option B : Image privée
Si vous gardez l'image privée, ajoutez un **Registry** dans Coolify :
- Type: GitHub Container Registry
- URL: ghcr.io
- Username: votre username GitHub
- Password: votre Personal Access Token (PAT)

## 5. Workflow automatique

Maintenant, à chaque push sur `main` ou `redesign/better-ux` :
1. ✅ GitHub Actions build l'image (avec 7GB RAM)
2. ✅ L'image est pushée sur ghcr.io
3. ✅ Coolify pull simplement l'image (pas de build!)
4. ✅ Déploiement ultra-rapide

## Tags disponibles

Le workflow crée plusieurs tags :
- `latest` : dernière version de la branche main
- `main` ou `redesign-better-ux` : dernière version de la branche
- `main-<sha>` : version spécifique avec le commit SHA

## Avantages https://yield.lowfey.com

- 🚀 Build rapide (7GB RAM sur GitHub)
- 💰 Gratuit pour repos publics
- ⚡ Déploiement rapide sur Coolify (juste un pull)
- 🔄 Cache Docker entre les builds
- 📦 Historique des images

## Test

1. Commitez le workflow :
```bash
git add .github/workflows/docker-build.yml
git commit -m "Add GitHub Actions Docker build"
git push
```

2. Allez dans l'onglet **Actions** de votre repo pour voir le build en cours

3. Une fois terminé, l'image sera disponible à `https://ghcr.io/jasonmartoux/aocyieldapp:latest`
