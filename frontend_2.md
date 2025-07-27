# How the Leetbrawl Frontend Works (Detailed Walkthrough)

## 1. The Layout File (`app/layout.tsx`)

**Purpose:**  
This file wraps every page of your website. It sets up global styles and fonts.

**Major Parts:**
- **Imports:**  
  - Imports Google fonts (Geist and Geist Mono) for a modern look.
  - Imports `globals.css` for global styles (Tailwind, custom CSS).
- **Font Setup:**  
  - Sets up font variables so you can use them in your CSS.
- **Metadata:**  
  - Sets the website title and description for browsers/search engines.
- **RootLayout Component:**  
  - Returns the basic HTML structure:  
    - `<html lang="en">` sets the language.
    - `<body>` applies the font classes and wraps all page content (`{children}`).

**How it fits in:**  
Every page you visit is wrapped in this layout, so global styles and fonts are always applied.

---

## 2. The Homepage (`app/page.tsx`)

**Purpose:**  
This is the main landing page. It introduces the site, shows features, a leaderboard, and lets users start playing.

**Major Parts:**
- **Imports:**  
  - Imports UI components (Button, Card, Badge, Avatar, etc.) and icons.
  - Uses `useRouter` from Next.js for navigation.
- **HomePage Component:**  
  - **Router:**  
    - Lets you navigate to other pages (like practice modes) without reloading.
  - **Handlers:**  
    - `handleStartMatch` and `handleTryDemo` change the page when you click buttons.
  - **Features Array:**  
    - Lists the main features (real-time battles, ranking, etc.) with icons and descriptions.
  - **Leaderboard Array:**  
    - Shows top players with their rank, username, rating, and avatar.
  - **Return (JSX):**  
    - **Header:**  
      - Shows the site name and navigation links.
    - **Hero Section:**  
      - Big title, description, and buttons to start a match or try a demo.
      - Shows a mockup of a live battle.
    - **Features Section:**  
      - Shows cards for each feature.
    - **Leaderboard Section:**  
      - Shows top players in a styled card.
    - **Call-to-Action Section:**  
      - Encourages users to start competing.
    - **Footer:**  
      - Shows links and copyright.

**How it fits in:**  
This is the first thing users see. It uses components and navigation to connect to the rest of the site.

---

## 3. Practice Page Example (`app/practice/ranked/page.tsx`)

**Purpose:**  
This page lets users practice coding problems in ranked mode.

**Major Parts:**
- **Imports:**  
  - Imports React hooks, components for the problem statement and code editor, UI elements, and icons.
- **Sample Problem:**  
  - Contains a sample coding problem (title, description, examples, constraints, test cases).
- **RankedPage Component:**  
  - **State:**  
    - Manages the width of the problem/code editor panels, dragging state, submission state, and rating.
  - **Handlers:**  
    - `handleMouseDown`, `handleMouseMove`, `handleMouseUp`:  
      - Allow you to resize the problem/code editor panels by dragging.
    - `handleRunTests`:  
      - Simulates running your code against test cases.
    - `handleSubmit`:  
      - Simulates submitting your code and updates your rating.
    - `handleViewSolution`:  
      - Placeholder for viewing the solution.
    - `handleRematch`:  
      - Resets the state for another attempt.
  - **Return (JSX):**  
    - **Header:**  
      - Shows navigation, current rating, and rematch button.
    - **Main Content:**  
      - **Problem Statement:**  
        - Shows the coding problem using the `ProblemStatement` component.
      - **Resizable Divider:**  
        - Lets you drag to resize the panels.
      - **Code Editor:**  
        - Where you write and test your code using the `CodeEditor` component.

**How it fits in:**  
This page is a core part of the site, letting users solve problems and see their progress.

---

## 4. Problem Statement Component (`components/problem-statement.tsx`)

**Purpose:**  
Displays the coding problem, examples, constraints, and test cases.

**Major Parts:**
- **Props:**  
  - Receives a `problem` object (with title, description, examples, etc.), and flags for submission state.
- **State:**  
  - `showAllTestCases`: Whether to show all or just a few test cases.
- **Helper Functions:**  
  - `getDifficultyColor`: Returns a color based on the problem's difficulty.
- **Return (JSX):**  
  - **Card Layout:**  
    - **Header:**  
      - Shows the problem title and difficulty badge.
      - If submitted, shows a button to view the solution.
    - **Content:**  
      - **Description:**  
        - Shows the problem description, with code formatting.
      - **Examples:**  
        - Shows sample inputs/outputs and explanations.
      - **Constraints:**  
        - Lists the rules for valid solutions.
      - **Test Cases:**  
        - Shows test cases, with a button to show all if there are many.

**How it fits in:**  
Used on practice and match pages to show users what problem they need to solve.

---

## 5. Code Editor Component (`components/code-editor.tsx`)

**Purpose:**  
Lets users write, test, and submit code in different languages.

**Major Parts:**
- **Props:**  
  - Functions for running tests and submitting code, initial code/language.
- **State:**  
  - Manages the selected language, code content, running/submitting state, test results, and submission result.
- **Language Templates:**  
  - Provides starter code for each language.
- **Handlers:**  
  - `handleRunTests`: Runs the code against test cases.
  - `handleSubmit`: Submits the code for scoring.
  - `handleKeyDown`: Handles tab key for indentation.
- **Return (JSX):**  
  - **Header:**  
    - Language selector and buttons to run tests or submit.
  - **Editor Area:**  
    - Shows line numbers and a textarea for code.
  - **Results Panel:**  
    - Shows test results and submission feedback, slides up from the bottom.

**How it fits in:**  
Central to the coding experience, used on all problem-solving pages.

---

## 6. How it all comes together

- **Next.js** uses the `app/` directory to map files to URLs (routes).
- When you visit a page (like `/practice/ranked`), Next.js loads the corresponding file (`app/practice/ranked/page.tsx`).
- The `layout.tsx` file wraps every page, applying global styles and fonts.
- Each page uses **components** (like `ProblemStatement` and `CodeEditor`) to build up the UI.
- **State** and **handlers** in each page/component manage user interactions (like resizing panels, running code, submitting solutions).
- **Navigation** is handled by Next.js and the `useRouter` hook, so moving between pages is fast and smooth.
- **Styling** is handled by Tailwind CSS, using utility classes right in the JSX.

---

Would you like even more detail (like for every component or more about the UI library)? Just ask! 