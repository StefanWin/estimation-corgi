# Estimation Corgi 🐕

> Properly estimate your tasks with the help of a corgi

A fun web app that provides random time estimates for your tasks, accompanied by adorable corgi images. Because sometimes you need a corgi to tell you how long something will take.

## Features

- 🎲 Random time estimates (1-40 hours)
- 🐶 Rotating collection of cute corgi images
- 💬 Community-suggested estimation messages
- 🌓 Light/dark mode toggle
- 📱 Fully responsive design
- ✨ Modern UI with smooth animations

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Backend**: [Convex](https://www.convex.dev/)
- **Styling**: CSS Modules
- **Deployment**: [Vercel](https://vercel.com)
- **Fonts**: Geist Sans & Geist Mono

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/StefanWin/estimation-corgi.git
cd estimation-corgi
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up Convex:
```bash
pnpm convex dev
```

4. Set up environment variables:
Create a `.env.local` file with:
```env
NEXT_PUBLIC_CONVEX_URL=your_convex_url
NEXT_PUBLIC_TURNSTILE_SITE_KEY=your_turnstile_key
TURNSTILE_SECRET_KEY=your_turnstile_secret
```

5. Run the development server:
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## Project Structure

```
estimation-corgi/
├── src/
│   ├── app/              # Next.js app router pages
│   ├── components/       # React components
│   ├── constants.ts      # App constants (images, etc.)
│   └── util.ts          # Utility functions
├── convex/              # Convex backend functions
├── public/              # Static assets (corgi images)
└── package.json
```

## Contributing

Contributions are welcome! Feel free to:

- Submit new corgi images (with proper attribution)
- Suggest new estimation messages
- Report bugs or request features
- Improve documentation

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Credits

- Corgi images sourced from various contributors (see attributions on the /meta page)
- Built with love by [stefanwintergerst.com](https://stefanwintergerst.com)

## Links

- 🌐 Live site: [estimation-corgi.com](https://estimation-corgi.com)
- 📝 Privacy Policy: [estimation-corgi.com/privacy](https://estimation-corgi.com/privacy)
