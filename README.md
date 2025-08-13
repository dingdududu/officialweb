# Apparel Stock Hub - Business Website

A modern business promotion website built with Next.js, featuring product showcases, contact forms, and comprehensive business information.

🌐 **Live Site**: [https://apparelstockhub.com](https://apparelstockhub.com)

## Features

- 📱 **Responsive Design** - Mobile-first approach with Tailwind CSS
- 🛍️ **Product Showcase** - Dynamic product pages with image galleries
- 📞 **Contact System** - Contact form with email notifications and database storage
- 🔍 **SEO Optimized** - Meta tags, sitemap, and structured data
- 📧 **Email Integration** - Automated email notifications via Nodemailer
- 🗄️ **Database** - Prisma ORM with SQLite for contact management
- ⚡ **Performance** - Optimized images and static generation

## Tech Stack

- **Framework**: Next.js 15.3.3 (App Router)
- **Styling**: Tailwind CSS
- **Database**: Prisma + SQLite
- **Email**: Nodemailer (QQ Mail service)
- **Icons**: React Icons
- **Image Carousel**: React Slick
- **Language**: TypeScript

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/dingdududu/officialweb.git
cd officialweb
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory:
```env
DATABASE_URL="file:./prisma/dev.db"
EMAIL_USER="your-email@qq.com"
EMAIL_PASS="your-email-password"
```

4. Set up the database:
```bash
npx prisma generate
npx prisma db push
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the result.

### Build for Production

```bash
npm run build
npm run start
```

## Project Structure

```
src/
├── app/                 # Next.js app directory
│   ├── components/      # Reusable components
│   ├── api/            # API routes
│   └── [pages]/        # Page components
├── data/               # Static data files
│   ├── metadata.json   # SEO metadata
│   ├── products.ts     # Product data
│   └── qaList.ts       # FAQ data
└── generated/          # Prisma generated files

prisma/
├── schema.prisma       # Database schema
└── migrations/         # Database migrations
```

## Deployment

This project is configured for deployment on Vercel:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your custom domain `apparelstockhub.com`
4. Set up environment variables in Vercel dashboard
5. Deploy!

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is private and proprietary.
