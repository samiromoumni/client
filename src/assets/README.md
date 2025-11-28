# Assets - Reliqua Travel

## Logo

Le logo de Reliqua Travel se trouve dans `logo.svg`. Il représente:
- Un globe bleu avec les continents
- Un avion bleu métallique traversant le globe
- Le texte "Reliqua Travel" et "Agence de voyage"

## Utilisation

Le logo est utilisé via le composant `<Logo />` qui peut être configuré avec:
- `showText`: Afficher ou masquer le texte (défaut: true)
- `size`: 'sm', 'md', ou 'lg' (défaut: 'md')
- `variant`: 'light' ou 'dark' pour adapter les couleurs du texte (défaut: 'dark')

## Exemple

```tsx
import Logo from './components/Logo'

// Logo complet
<Logo />

// Logo sans texte
<Logo showText={false} />

// Logo grand
<Logo size="lg" />

// Logo clair (pour fond sombre)
<Logo variant="light" />
```

## Remplacement du logo

Pour utiliser votre propre fichier logo:
1. Remplacez `logo.svg` par votre fichier
2. Ou modifiez l'import dans `Logo.tsx` pour pointer vers votre fichier


