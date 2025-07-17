# LeetBrawl Frontend - Complete Beginner's Guide

## Table of Contents
1. [What is a Frontend?](#what-is-a-frontend)
2. [Project Structure Explained](#project-structure-explained)
3. [How Next.js Works](#how-nextjs-works)
4. [Understanding the File Structure](#understanding-the-file-structure)
5. [How Components Work](#how-components-work)
6. [Styling with Tailwind CSS](#styling-with-tailwind-css)
7. [TypeScript Basics](#typescript-basics)
8. [How the App Works](#how-the-app-works)
9. [Development Workflow](#development-workflow)
10. [Common Commands](#common-commands)
11. [Troubleshooting](#troubleshooting)

---

## What is a Frontend?

Think of a website like a restaurant:
- **Backend** = Kitchen (where food is prepared, data is processed)
- **Frontend** = Dining room (what customers see and interact with)

The **frontend** is everything users see in their browser:
- The website layout
- Buttons, forms, and interactive elements
- Colors, fonts, and styling
- Animations and transitions

In LeetBrawl, the frontend is what users see when they:
- Visit the homepage to see available matches
- Join a match and see the problem statement
- Write code in the editor
- View their opponent's code
- Submit solutions

---

## Project Structure Explained

Your LeetBrawl project is organized like this:

```
leetbrawl/                    # Main project folder
├── frontend/                 # Everything users see in browser
│   ├── app/                  # Pages (homepage, match page, etc.)
│   ├── components/           # Reusable UI pieces
│   ├── lib/                  # Helper functions and utilities
│   ├── public/               # Images, icons, static files
│   ├── package.json          # List of software packages used
│   └── tsconfig.json         # TypeScript configuration
├── backend/                  # Server that handles data and logic
├── prisma/                   # Database management
└── leetbrawl/               # Docker setup for local development
```

**Why this structure?**
- **Separation of concerns**: Each part has a specific job
- **Team collaboration**: Different people can work on different parts
- **Maintenance**: Easy to find and fix problems
- **Scalability**: Easy to add new features

---

## How Next.js Works

**Next.js** is a framework that makes building websites easier. Think of it like a smart template system:

### What Next.js Does:
1. **Creates pages automatically** from files in the `app/` folder
2. **Handles routing** (when you click a link, it shows the right page)
3. **Optimizes performance** (makes your website load faster)
4. **Provides development tools** (hot reload, error messages)

### File-Based Routing:
```
app/
├── page.tsx              # Homepage (http://localhost:3000/)
├── match/
│   └── [matchId]/
│       └── page.tsx      # Match page (http://localhost:3000/match/123)
└── user/
    └── [userId]/
        └── page.tsx      # User profile (http://localhost:3000/user/456)
```

**How it works:**
- `page.tsx` = the main content of that page
- `[matchId]` = a dynamic route (can be any match ID)
- Next.js automatically creates the URL structure

---

## Understanding the File Structure

Let's go through each important file and folder:

### `/frontend/app/` - Pages
```
app/
├── page.tsx              # Homepage (currently shows Next.js default)
├── layout.tsx            # Template that wraps all pages
├── globals.css           # Global styles (colors, fonts, etc.)
├── match-page.tsx        # Your match interface (needs to be moved)
├── practice/             # Practice mode pages
└── match/                # Match-related pages
```

**What each file does:**
- `page.tsx` = The main content of the homepage
- `layout.tsx` = The template (header, footer, navigation)
- `globals.css` = Global styling rules
- `match-page.tsx` = Your v0.dev generated match interface

### `/frontend/components/` - Reusable UI Pieces
```
components/
├── ui/                   # Basic UI components (buttons, cards, etc.)
│   ├── button.tsx        # Button component
│   ├── card.tsx          # Card component
│   ├── badge.tsx         # Badge component
│   └── ...
├── code-editor.tsx       # Code editing interface
├── problem-statement.tsx # Problem display
├── opponent-code-modal.tsx # Opponent code preview
└── match-card.tsx        # Match listing cards
```

**Why components?**
- **Reusability**: Use the same button everywhere
- **Consistency**: All buttons look the same
- **Maintenance**: Change button style in one place
- **Organization**: Keep related code together

### `/frontend/lib/` - Helper Functions
```
lib/
├── api.ts               # Functions to talk to backend
├── socket.ts            # Real-time communication
└── utils.ts             # General helper functions
```

**What these do:**
- `api.ts` = Functions to send/receive data from your server
- `socket.ts` = Real-time updates (opponent typing, match status)
- `utils.ts` = Common functions used throughout the app

### `/frontend/public/` - Static Files
```
public/
├── favicon.ico          # Website icon
├── next.svg             # Next.js logo
└── ...                  # Other images, icons, files
```

**Static files** = Files that don't change (images, icons, fonts)

---

## How Components Work

A **component** is like a LEGO block - a reusable piece of UI. Let's look at a simple example:

### Simple Button Component:
```tsx
// components/ui/button.tsx
import React from 'react'

interface ButtonProps {
  children: React.ReactNode  // What goes inside the button
  onClick?: () => void       // What happens when clicked
  variant?: 'primary' | 'secondary'  // Button style
}

export function Button({ children, onClick, variant = 'primary' }: ButtonProps) {
  return (
    <button 
      onClick={onClick}
      className={`px-4 py-2 rounded ${
        variant === 'primary' 
          ? 'bg-blue-500 text-white' 
          : 'bg-gray-200 text-black'
      }`}
    >
      {children}
    </button>
  )
}
```

### Using the Button:
```tsx
// In any page or component
import { Button } from '@/components/ui/button'

export default function HomePage() {
  return (
    <div>
      <h1>Welcome to LeetBrawl</h1>
      <Button onClick={() => alert('Hello!')}>
        Create Match
      </Button>
    </div>
  )
}
```

**How it works:**
1. **Define** the component (what it looks like, what it accepts)
2. **Import** it where you want to use it
3. **Use** it with different props (data you pass to it)

---

## Styling with Tailwind CSS

**Tailwind CSS** is a utility-first CSS framework. Instead of writing custom CSS, you use pre-built classes:

### Traditional CSS vs Tailwind:
```css
/* Traditional CSS */
.my-button {
  background-color: blue;
  color: white;
  padding: 8px 16px;
  border-radius: 4px;
  font-weight: bold;
}
```

```tsx
// Tailwind CSS (in your component)
<button className="bg-blue-500 text-white px-4 py-2 rounded font-bold">
  Click me
</button>
```

### Common Tailwind Classes:
- `bg-blue-500` = Blue background
- `text-white` = White text
- `px-4` = Horizontal padding (left/right)
- `py-2` = Vertical padding (top/bottom)
- `rounded` = Rounded corners
- `font-bold` = Bold text
- `hover:bg-blue-600` = Darker blue on hover
- `flex` = Flexbox layout
- `justify-center` = Center horizontally
- `items-center` = Center vertically

### Dark Mode:
```tsx
<div className="bg-white dark:bg-gray-900 text-black dark:text-white">
  This adapts to light/dark mode
</div>
```

---

## TypeScript Basics

**TypeScript** is JavaScript with extra safety features. It helps catch errors before your code runs:

### Basic Types:
```tsx
// String
const name: string = "John"

// Number
const age: number = 25

// Boolean
const isActive: boolean = true

// Array
const languages: string[] = ["JavaScript", "Python", "C++"]

// Object
interface User {
  id: string
  name: string
  email: string
  rating: number
}

const user: User = {
  id: "123",
  name: "John",
  email: "john@example.com",
  rating: 1500
}
```

### Function Types:
```tsx
// Function that takes a string and returns a number
function calculateRating(username: string): number {
  return username.length * 100
}

// Function with optional parameter
function createMatch(problemId?: string) {
  if (problemId) {
    console.log(`Creating match with problem ${problemId}`)
  } else {
    console.log("Creating match with random problem")
  }
}
```

### Why TypeScript?
- **Catches errors** before running code
- **Better IDE support** (autocomplete, suggestions)
- **Self-documenting** code
- **Easier refactoring**

---

## How the App Works

Let's trace through how a user interacts with LeetBrawl:

### 1. User visits homepage:
```
User types: http://localhost:3000/
↓
Next.js loads: app/page.tsx
↓
Shows: Homepage with match listings
```

### 2. User clicks "Join Match":
```
User clicks: "Join Match" button
↓
Next.js navigates to: /match/123
↓
Loads: app/match/[matchId]/page.tsx
↓
Shows: Match interface with problem and editor
```

### 3. User writes code:
```
User types: in the code editor
↓
Component: code-editor.tsx updates
↓
WebSocket: Sends code to opponent (real-time)
↓
Backend: Receives and processes code
```

### 4. User submits solution:
```
User clicks: "Submit" button
↓
API call: POST /api/matches/123/submit
↓
Backend: Runs code against test cases
↓
WebSocket: Sends result back to user
↓
UI updates: Shows success/error message
```

---

## Development Workflow

### Starting Development:
```bash
# 1. Navigate to frontend directory
cd frontend

# 2. Install dependencies (if first time)
npm install

# 3. Start development server
npm run dev
```

### Making Changes:
1. **Edit files** in your code editor
2. **Save the file**
3. **Browser automatically updates** (hot reload)
4. **See changes immediately**

### Adding New Features:
1. **Create new component** in `components/`
2. **Add new page** in `app/`
3. **Update routing** if needed
4. **Test in browser**

### Installing New Packages:
```bash
# Add a new package
npm install package-name

# Add development package
npm install --save-dev package-name

# Add shadcn/ui component
npx shadcn@latest add component-name
```

---

## Common Commands

### Development:
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Check for code errors
```

### Package Management:
```bash
npm install          # Install all dependencies
npm install package  # Install specific package
npm uninstall package # Remove package
npm update           # Update packages
```

### shadcn/ui:
```bash
npx shadcn@latest add button    # Add button component
npx shadcn@latest add card      # Add card component
npx shadcn@latest add dialog    # Add dialog component
```

### Git:
```bash
git add .            # Stage all changes
git commit -m "message"  # Commit changes
git push             # Upload to GitHub
git pull             # Download from GitHub
```

---

## Troubleshooting

### Common Issues:

**1. "Module not found" error:**
```bash
# Solution: Install missing package
npm install package-name
```

**2. "Port 3000 is already in use":**
```bash
# Solution: Kill the process or use different port
npm run dev -- -p 3001
```

**3. "TypeScript errors":**
```bash
# Solution: Check your types
npm run lint
```

**4. "Page not found":**
- Check if file exists in `app/` folder
- Check file name (must be `page.tsx`)
- Check folder structure

**5. "Component not working":**
- Check imports (case-sensitive)
- Check if component is exported
- Check browser console for errors

### Debugging Tips:

**1. Browser Developer Tools:**
- Press F12 to open
- Check Console tab for errors
- Check Network tab for API calls
- Check Elements tab for HTML structure

**2. Console Logging:**
```tsx
console.log("Debug info:", someVariable)
console.error("Error occurred:", error)
```

**3. React Developer Tools:**
- Install browser extension
- Inspect component props and state
- See component hierarchy

---

## Next Steps

Now that you understand the basics:

1. **Explore the code**: Look at existing components
2. **Make small changes**: Try changing colors or text
3. **Add new features**: Create simple components
4. **Learn more**: Read Next.js and React documentation
5. **Practice**: Build small projects to reinforce concepts

Remember: **Web development is learned by doing**. Don't worry if you don't understand everything at first - it will make sense as you work with the code!

---

## Quick Reference

### File Locations:
- **Pages**: `frontend/app/`
- **Components**: `frontend/components/`
- **Styles**: `frontend/app/globals.css`
- **Configuration**: `frontend/package.json`

### Key Technologies:
- **Next.js**: Framework for building the app
- **React**: Library for creating components
- **TypeScript**: JavaScript with type safety
- **Tailwind CSS**: Utility-first styling
- **shadcn/ui**: Pre-built UI components

### Development Server:
- **URL**: http://localhost:3000
- **Command**: `npm run dev`
- **Hot Reload**: Automatic updates when you save

### Important Files:
- `app/page.tsx` = Homepage
- `app/layout.tsx` = Page template
- `components/ui/` = Basic UI components
- `package.json` = Dependencies and scripts 