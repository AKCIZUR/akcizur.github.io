# RUZICKA Jakub — Vue + Vite

Převod původního statického webu do přehledné Vue struktury se zachováním vzhledu.

## Spuštění

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## GitHub Pages

Projekt je připravený pro nasazení pod GitHub Pages i pro jiné subcesty.

### Lokální build pro Pages

```bash
VITE_BASE_PATH=/nazev-repozitare/ npm run build
```

### Build přes GitHub Actions

Workflow v `.github/workflows/deploy.yml` nastaví `VITE_BASE_PATH` automaticky z názvu repozitáře.

### Poznámka k base path

Pokud projekt neběží na rootu domény, musí být `base` ve Vite nastavený na správnou subcestu. V tomto projektu je podporovaný přes:

- `VITE_BASE_PATH`
- `mode = github-pages`
- `GITHUB_PAGES=true`

## Struktura

- `src/components` — rozdělené sekce webu
- `src/content` — texty a data
- `src/styles` — původní CSS rozdělené na hlavní, animace a mobilní úpravy
- `public/img` — SVG assety beze změny
