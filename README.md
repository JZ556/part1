# LTU Moodle HTML Generator

A Next.js web application that generates HTML5 code with inline CSS for Moodle LMS deployment.

## Project Overview

This project uses **Next.js** and **Bootstrap** to create a web application with:

- **Header** - Project title and student information
- **Navigation Bar** - Menu with dark/light mode toggle
- **Body** - Main content area with tabs management
- **Footer** - Copyright and student details

## Main Features

### Tabs Page

- **Add/Remove Tabs** - Create and manage multiple tabs
- **Generate HTML Code** - Output clean HTML with inline CSS
- **Editable Code Area** - Modify generated code as needed
- **Copy Functionality** - Easy copy/paste for Moodle deployment

### Theme Support

- **Dark Mode/Light Mode** - Toggle between themes
- **Persistent Settings** - Theme and tabs saved in localStorage

## Technology Stack

- **Next.js** - React framework
- **Bootstrap 5** - CSS framework for styling
- **Font Awesome** - Icons
- **localStorage** - Data persistence

## How to Run

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Start development server:**

   ```bash
   npm run dev
   ```

3. **Open in browser:**
   ```
   http://localhost:3000
   ```

## Usage

1. **Add Tabs** - Enter tab names and click "Add Tab"
2. **Generate Code** - Click "Generate Code" button
3. **Copy HTML** - Copy the generated code from the textarea
4. **Deploy to Moodle** - Paste the HTML code into Moodle LMS

## Student Information

- **Student Name:** Shengzhe Zhou
- **Student Number:** 22065684
- **Course:** Web Development Assignment

## File Structure

```
part1/
├── src/
│   ├── app/
│   │   ├── layout.js          # Main layout with header/footer
│   │   ├── page.js            # Homepage with tabs functionality
│   │   ├── about/page.js      # About page
│   │   └── globals.css        # Global styles including dark mode
│   └── components/
│       └── Navbar.js          # Navigation component
├── public/                    # Static assets
└── README.md                  # This file
```

---

_Generated HTML code is compatible with Moodle LMS and uses inline CSS only._
