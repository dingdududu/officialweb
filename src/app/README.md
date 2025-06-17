# Homepage Project

This project is a simple homepage built with Next.js and TypeScript. It is structured to separate the navigation bar, body content, and footer into distinct components for better organization and maintainability.

## Project Structure

```
homepage-project
├── src
│   ├── app
│   │   ├── page.tsx          # Main entry point of the application
│   │   ├── components
│   │   │   ├── Navbar.tsx    # Navigation bar component
│   │   │   ├── Body.tsx      # Main content component
│   │   │   └── Footer.tsx    # Footer component
│   │   └── types
│   │       └── index.ts      # TypeScript types and interfaces
├── package.json               # npm configuration file
├── tsconfig.json              # TypeScript configuration file
└── README.md                  # Project documentation
```

## Getting Started

To get started with this project, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd homepage-project
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser and navigate to:**
   ```
   http://localhost:3000
   ```

## Components

- **Navbar:** Contains links to navigate through the website.
- **Body:** Displays the main content of the homepage.
- **Footer:** Includes copyright information and additional links.

## Contributing

If you would like to contribute to this project, please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.