# Project Hub & Roadmap

Hey team! This is the main spot for tracking our project's guidelines and to-do list. Let's keep it updated so we're all on the same page.

> **Heads-Up:** If you need the environment variables (`.env` file) to get set up, just ping **Bhuvnesh**. He'll get you sorted.

---

## The Ground Rules

Just a few guidelines to keep things consistent and clean:

- **Look & Feel:** We're going with a **white theme** for the entire project. Let's stick to that to keep the UI uniform.
- **Coding Style:** Please make sure you're writing code in **components**. It'll make our lives so much easier for debugging and reusing things down the line.
- **Assets Needed:** We still need to finalize the standard designs for the **email template, logo, banners, and the footer**.
- **Backend & DB:** For now, we're using **Supabase** to handle our backend, database, and authentication.

---

## How Users Get In (The Auth System)

So we're all clear, the current authentication flow for a new user is pretty straightforward:

1.  **Sign Up:** A new user creates their account.
2.  **Sign Up Success:** They land on a page confirming their registration was successful.
3.  **Mail Confirmation:** They have to check their email and click a link to verify their account.
4.  **Login:** They can now log in with their shiny new credentials.
5.  **Protected Content:** Once logged in, they can finally access all the protected areas of the app.

---

## What We're Building (Core Features)

These are the main features that need to be implemented or fleshed out:

- **Admin Access:** We need a way to grant special permissions to administrators.
- **Admin Dashboard:** A dedicated dashboard for admins to manage users, content, and other things.
- **Quiz Calculation:** We need to figure out the exact logic for how we'll **calculate a user's score** and track their `quiz_attempts`.

---

## The To-Do List

Here's what we need to tackle next. Let's start chipping away at this!

- [ ] **The Result UI:** The page a user sees after finishing a quiz needs a serious facelift.
- [ ] **The Quiz UI:** The main quiz-taking experience could be much more intuitive and look better.
- [ ] **The Landing Page:** This is a **high priority**. We need a proper landing page to attract users.
- [ ] **Mobile Responsiveness:** We have to make sure the entire site works and looks good on phones.
