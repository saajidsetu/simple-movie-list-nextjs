This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
Yarn dev
# or
npm run dev
```
Craete .env file and  set mongodb please use  your mongodb link
for example : 
PORT=5000
DATABASE_URL=mongodb+srv://username:password@movie-list.smdut.mongodb.net/?retryWrites=true&w=majority
SERVER_ADDRESS=http://localhost:5000
NEXT_PUBLIC_API_BASE=http://localhost:5000/api

Open [http://localhost:5000](http://localhost:5000) with your browser to see the result.

http://localhost:5000/auth/login
Email: admin@sflix.com
Password: 123456
Functionality
-> auth
-> login
-> route protection
-> admin site
-> public site
-> Add Movie 
-> Edit Movie
-> Delete Movie
-> List Movie
-> Search Movie


You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
# simple-movie-list-nextjs
