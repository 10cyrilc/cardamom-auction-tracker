# Cardamom Auction Tracker

![Cardamom Auction Tracker Banner](https://auction-tracker.10cyrilc.in/images/cardamom-auction-tracker.png)

A React TypeScript application to track cardamom auction prices in real-time, view auction details, and stay updated with market trends.

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)

## Features
- View cardamom auction prices with real-time data.
- Select auctions by date and view detailed information.
- Card-based UI for auction details and selection.
- Responsive design for mobile and desktop.
- Accessible and user-friendly interface.

## Installation

### Prerequisites
- [Node.js](https://nodejs.org/) (v22 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/10cyrilc/cardamom-auction-tracker.git
   cd cardamom-auction-tracker
   ```

2. Install dependencies:
   ```bash
   npm install
   ```
   or
   ```bash
   yarn install
   ```

3. Start the development server:
   ```bash
   npm start
   ```
   or
   ```bash
   yarn start
   ```

   The app will be available at `http://localhost:5173`.

## Usage
1. Open the app in your browser.
2. Select an auction date from the dropdown.
3. Choose an auction from the list to view details.
4. View detailed auction information, including lots, total arrivals, quantity sold, maximum price, and average price.

## Project Structure
```
cardamom-tracker/
├── public/                  # Static assets
│   ├── images/              # Public Images
│   ├── sitemap.xml          # Sitemap for SEO
│   ├── robots.txt           # Robots file for crawlers
│   └── favicon.ico          # Favicon
├── src/                     # Source code
│   ├── components/          # Reusable components (e.g., Navbar, Footer)
│   │   └── Navigation/
│   ├── pages/               # Page components (e.g., PriceTracker)
│   ├── types/               # TypeScript type definitions
│   ├── utils/               # Utility functions (e.g., date formatting)
│   ├── App.tsx              # Main app component
│   ├── index.tsx            # Entry point
│   └── App.css              # Global styles
├── .gitignore               # Ignore files
├── eslint.cofig.js          # ESLint configuration
├── index.html               # Main HTML file
├── LICENSE                  # License file
├── package.json             # Dependencies and scripts
├── package-lock.json        # Lock file for dependencies
├── README.md                # Project documentation
├── tsconfig.app.json        # TypeScript configuration for the app
└── tsconfig.json            # TypeScript configuration
└── tsconfig.node.json       # TypeScript configuration for Node.js
└── vite.config.ts           # Vite configuration file
```

## Contributing
Contributions are welcome! Follow these steps:
1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature-name`.
3. Make your changes and commit: `git commit -m "Add your feature"`.
4. Push to your branch: `git push origin feature/your-feature-name`.
5. Open a pull request.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments
- A special thanks to [Tibin Sunny](https://github.com/Tibinsunny) for providing the API that powers the cardamom auction data in this application.

---

Built with ❤️ by [Cyril C Thomas](https://10cyrilc.in)