# Protein Tracker

**Track every high-protein product at your local stores so you don't have to guess.**

Compare protein per dollar/euro/franc, taste ratings, and calories — all in one place. No signup, no ads, no backend. Your data stays on your device.

[**Try it live**](https://protein.doruk.ch) | [Report Bug](https://github.com/peaktwilight/protein/issues) | [Request Feature](https://github.com/peaktwilight/protein/issues)

<!-- Add a screenshot/gif here: ![Screenshot](screenshot.png) -->

---

## Why this exists

I'm a student trying to hit 140g protein daily without protein powder and on a budget. I got tired of checking every product at the store, so I built this for myself. Now it's free for everyone.

## Features

- **Smart scoring** — Products ranked by protein-per-price, taste, and calorie efficiency
- **Daily tracker** — Set your protein goal and log what you eat throughout the day
- **Works with any store** — Comes with sample data from Swiss stores, but add products from anywhere
- **Import/Export** — Share your product lists with friends or back them up as JSON
- **Mobile-first** — Designed for checking prices while you're at the store
- **100% local** — No account needed, all data saved in your browser
- **Open source** — MIT licensed, fork it, modify it, make it yours

## Quick start

```bash
git clone https://github.com/peaktwilight/protein.git
cd protein
npm install
npm run dev
```

## How scoring works

Each product gets a score based on:

| Factor | Weight | Why |
|--------|--------|-----|
| Protein per price | High | More protein per dollar = better value |
| Taste rating | Medium | No point eating something you hate |
| Calories per 100g | Negative | Penalizes calorie-dense options |

**Formula:** `(protein/price * 10) + (taste * 3) - (calories_per_100g * 0.1)`

## Sample data

The app comes with 28 pre-loaded products from Swiss supermarkets (Migros, Coop, Lidl, Aldi). You can start with this data or begin fresh with your own products.

Want to contribute products from your country? See [CONTRIBUTING.md](CONTRIBUTING.md).

## Tech stack

- React 18 + Vite
- Tailwind CSS
- Zustand (state management)
- Local Storage (persistence)
- Zero backend, zero dependencies on external services

## Contributing

We'd love contributions — especially product data from different countries! See [CONTRIBUTING.md](CONTRIBUTING.md) for details.

## License

[MIT](LICENSE) — use it however you want.

---

Built by [Doruk](https://doruk.ch) — a student who just wanted cheap protein.
