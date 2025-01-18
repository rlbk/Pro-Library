# Pro Library

Built with Next.js, TypeScript, and Postgres, Pro Library Management System is a production-grade platform featuring a public-facing app and an admin interface. It offers advanced functionalities like seamless book borrowing with robust user management, automated workflows, and a modern, optimized tech stack for real-world scalability.

## <a name="tech-stack">⚙️ Tech Stack</a>

- Next.js
- PostgreSQL
- Upstash
- ImageKit
- TypeScript
- Resend
- Tailwind CSS

## <a name="features">🔋 Features</a>

### Features of the Pro Library Management System Project

👉 **Open-source Authentication**: Personalized onboarding flow with email notifications.

👉 **Home Page**: Highlighted books and newly added books with 3D effects.

👉 **Book Detail Pages**: Availability tracking, book summaries, videos, and suggestions for similar books.

👉 **Profile Page**: Manage accounts, track borrowed books.

👉 **Onboarding Workflows**: Automated welcome emails when users sign up, with follow-ups based on inactivity or activity dates.

👉 **Book Management Forms**: Add new books and edit existing entries.

👉 **Book Details Page**: Detailed book information for administrators.

👉 **Advanced Functionalities**: Caching, rate-limiting, DDoS protection.

👉 **Database Management**: Postgres with Neon for scalable and collaborative database handling.

👉 **Real-time Media Processing**: ImageKit for image and video optimization and transformations.

👉 **Efficient Caching**: Upstash Redis for caching, workflows, and triggers.

👉 **Database ORM**: Drizzle ORM for simplified and efficient database interactions.

👉 **Modern UI/UX**: Built with TailwindCSS, ShadCN, and other cutting-edge tools.

👉 **Technology Stack**: Next.js with TypeScript for scalable development, and NextAuth for robust authentication.

👉 **Seamless Email Handling**: Resend for automated email communications, including notifications and updates.

## <a name="quick-start">🤸 Quick Start</a>

Follow these steps to set up the project locally on your machine.

**Prerequisites**

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)

**Cloning the Repository**

```bash
git clone https://github.com/rlbk/Pro-Library.git
cd pro-library
```

**Installation**

Install the project dependencies using npm:

```bash
npm install
```

**Set Up Environment Variables**

Create a new file named `.env` in the root of your project and add the following content:

```env
NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY=
IMAGEKIT_PRIVATE_KEY=
NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT=

NEXT_PUBLIC_API_ENDPOINT=
NEXT_PUBLIC_PROD_API_ENDPOINT=

DATABASE_URL=

UPSTASH_REDIS_URL=
UPSTASH_REDIS_TOKEN=

AUTH_SECRET=

# Required for workflow
QSTASH_URL=
QSTASH_TOKEN=

# RESEND_TOKEN=
RESEND_TOKEN=
```

Replace the placeholder values with your actual ImageKit, NeonDB, Upstash, and Resend credentials. You can obtain these credentials by signing up on the [ImageKit](https://imagekit.io/registration?code=gzhp5611), [NeonDB](https://fyi.neon.tech/), [Upstash](https://upstash.com/), and [Resend](https://resend.com/).

**Running the Project**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the project.

## 🌐 Live Demo

Check out the live demo here: [Live Demo](https://pro-library.vercel.app/)
