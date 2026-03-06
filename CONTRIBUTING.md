# Contributing to Protein Tracker

Thanks for wanting to contribute! This project is community-driven and we welcome all help.

## How to contribute

### Add products from your local stores
The easiest way to contribute is to add protein products from stores in your country. You can:
1. Use the app to add products and export your list as JSON
2. Open a PR adding your products to the sample data in `src/store.js`
3. Open an issue with product data and we'll add it

### Report bugs or suggest features
- Open an [issue](https://github.com/peaktwilight/protein/issues) describing the bug or feature
- Include screenshots if relevant

### Code contributions
1. Fork the repo
2. Create a branch (`git checkout -b feature/my-feature`)
3. Make your changes
4. Run `npm run build` to make sure everything compiles
5. Open a PR with a clear description

## Development setup

```bash
npm install
npm run dev
```

## Guidelines
- Keep it simple — this is a lightweight tool, not an enterprise app
- Mobile-first — most users are on phones
- No accounts, no backend — everything stays local
- Accessible and fast

## Adding store data for your country
We'd love to have sample datasets for different countries! If you want to add one:
1. Create a data array following the format in `src/store.js`
2. Include at least 10-15 products with accurate nutritional info
3. Open a PR and we'll add it as a starter dataset option
