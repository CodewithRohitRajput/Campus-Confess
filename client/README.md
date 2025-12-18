# Campus Confess - Client

This is the frontend client for Campus Confess, built with Next.js.

## Tech Stack

- **Framework:** Next.js
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **State Management:** React Context/Hooks
- **Authentication:** NextAuth.js (or your auth solution)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
# or
yarn install
```

2. Create a `.env.local` file in the client directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
# Add other environment variables as needed
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
client/
├── app/              # Next.js app directory
├── components/       # React components
├── lib/             # Utility functions
├── public/          # Static assets
└── styles/          # Global styles
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Features

- Anonymous confession posting
- Real-time updates
- User authentication
- Responsive design
- Dark mode support

## Contributing

Please read the main repository's contributing guidelines before submitting pull requests.

## License

This project is part of Campus Confess. See the main repository for license information.