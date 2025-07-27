# How the Leetbrawl Frontend Works (Beginner Guide)

## 1. What is this project?

This is a **web app** built with [Next.js](https://nextjs.org/) and [React](https://react.dev/).  
It lets users compete in real-time coding battles, practice problems, and challenge friends.

---

## 2. How does a modern website like this work?

- **HTML** is the basic structure.
- **CSS** (with [Tailwind CSS](https://tailwindcss.com/)) is used for styling.
- **JavaScript/TypeScript** (with React) is used to make the site interactive.
- **Next.js** helps organize the site into pages and handles navigation (moving between pages) without reloading the whole site.

---

## 3. Project Structure

- `app/` — Main folder for all the website's pages and layouts.
- `components/` — Reusable building blocks (like buttons, cards, code editor, etc).
- `public/` — Static files (like images and icons).
- `lib/` — Utility/helper functions.
- `package.json` — Lists the tools and libraries used.
- `globals.css` — Global styles for the whole site.

---

## 4. How does navigation work?

- Each file in `app/` (like `page.tsx`) is a **page** on the website.
- Folders inside `app/` (like `practice/`, `match/`) are **routes** (URLs).
- Special files like `[matchId]/page.tsx` mean the page can show different content depending on the URL (for example, `/match/123` and `/match/456`).

---

## 5. Main Pages

- **Homepage (`app/page.tsx`)**  
  Shows the main features, a leaderboard, and buttons to start playing or try a demo.

- **Practice Modes (`app/practice/`)**
  - `free/page.tsx` — Practice problems at your own pace.
  - `ranked/page.tsx` — Compete for a ranking.
  - `friend/page.tsx` — Challenge a friend.

- **Match Page (`app/match/[matchId]/page.tsx`)**  
  Shows a live coding battle between you and another user.

---

## 6. Main Components

- **ProblemStatement** — Shows the coding problem, examples, and constraints.
- **CodeEditor** — Where you write and test your code.
- **OpponentCodeModal** — Lets you view your opponent's code.
- **MatchCard** — Shows info about a match.
- **UI Components** (in `components/ui/`) — Buttons, cards, badges, dialogs, etc.

---

## 7. How does a page work?

Each page is a **React component** (a function that returns what should be shown on the screen).  
Example:  
- The homepage (`app/page.tsx`) shows a header, hero section, features, leaderboard, and footer.
- The ranked practice page (`app/practice/ranked/page.tsx`) shows a problem, a code editor, and lets you run tests or submit your solution.

---

## 8. How does the code editor work?

- You can select a programming language.
- Write your code in the editor.
- Click "Run Tests" to check your solution against sample inputs.
- Click "Submit" to submit your solution for scoring.

---

## 9. How does styling work?

- The site uses **Tailwind CSS** for styling.  
  Instead of writing regular CSS, you use special class names like `bg-slate-900` or `text-white` right in your HTML/JSX.

---

## 10. How do I run the site?

1. Open a terminal in the `frontend/leetbrawl` folder.
2. Run `npm install` to install dependencies.
3. Run `npm run dev` to start the development server.
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 11. What tools and libraries are used?

- **Next.js** — Organizes pages and handles navigation.
- **React** — Builds interactive user interfaces.
- **Tailwind CSS** — For styling.
- **Radix UI** — For accessible UI components (like dialogs, avatars).
- **Lucide React** — For icons.
- **TypeScript** — Adds type safety to JavaScript.

---

## 12. Where do I start if I want to change something?

- To change the homepage: edit `app/page.tsx`.
- To change a practice mode: edit the relevant file in `app/practice/`.
- To change a component (like the code editor): edit files in `components/`.

---

## 13. Where can I learn more?

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev/learn)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

---

**This guide is for beginners! If you have questions, just look at the file names and folder structure, and try changing something small to see what happens.** 