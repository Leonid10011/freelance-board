# Freelance Kanban Board

A minimalism Kanban Board for managing freelancing projects with minimum interaction.

## 💿 Live Demo

[![Live Demo](https://img.shields.io/badge/Live%20Demo-online-brightgreen?style=for-the-badge)](https://freelance-board-ufup.vercel.app/)

## 🚀 Features

- Manage projects using a minimalist Kanban board
- Toggle project statuses to filter visible columns
- Show or hide project details via a global sidebar
- Local storage persistence for demo mode
- Full CRUD operations with Supabase for authenticated users

## 🖼️ Screenshots

### Board Overview

<img src="./public/screenshots/board-full.jpg" alt="Board Overview" width="900"/>

Minimal Kanban board with multiple columns and task cards.

---

### Create and Edit Projects

<p align="center">
  <img src="./public/screenshots/project-create.jpg" alt="Create Project" width="350"/>
  <img src="./public/screenshots/project-edit.jpg" alt="Edit Project" width="350"/>
</p>

Create new projects and edit existing ones via a modal form.

---

### Workflow Interaction

<p align="center">
  <img src="./public/screenshots/project-status-change.jpg" alt="Status Change" width="350"/>
  <img src="./public/screenshots/view-card-fields.jpg" alt="Toggle Fields" width="350"/>
</p>

Quickly change project status or toggle visible card fields.

## 🛠️ Tech Stack

[![Next.js](https://img.shields.io/badge/Next.js-000?logo=nextdotjs&logoColor=white&style=for-the-badge)](https://nextjs.org)

[![TypeScript](https://img.shields.io/badge/TypeScript-3178c6?logo=typescript&logoColor=white&style=for-the-badge)](https://www.typescriptlang.org)

[![Supabase](https://img.shields.io/badge/Supabase-3ecf8e?logo=supabase&logoColor=white&style=for-the-badge)](https://supabase.com)

[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-38bdf8?logo=tailwindcss&logoColor=white&style=for-the-badge)](https://tailwindcss.com)

## 🏗️ Architecture

<p align="center">
  <img src="./public/screenshots/mermaid-diagram.png" 
       alt="Architecture Diagram" 
       width="150">
</p>

The project follows a layered architecture separating UI logic, domain models and data access.

### Layers

**UI Layer**

- React components and user interaction

**Domain Layer**

- Core application models independent from the database

**Validation Layer**

- Ensures valid domain data before persistence

**Repository Layer**

- Abstraction between UI and external APIs

**Database Layer**

- Handles Supabase communication

## 💡 Motivation

I built this project to deepen my skills in Next.js. I chose a freelance Kanban board because I often encountered issues with tools like Notion, where boards quickly become overloaded with nested information. My goal was to provide a minimalistic information dashboard that remains easy to scan and highlights only the most critical details.

## 📫 Contact

- E-Mail: leonid.budkov@gmail.com
