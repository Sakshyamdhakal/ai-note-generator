# AI Note Generator

AI Note Generator is a full-stack web application that helps users turn their content into organized study notes and summaries.

The application uses the **Google Gemini API** to generate notes from user-provided content. Users can then review, edit, save, organize, and download their notes from a personal dashboard.

This project was built to practice full-stack development while working with a generative AI API in a real application.

## Features

* Generate notes and summaries using Google Gemini API
* Create, edit, and delete notes
* View previously generated notes
* Favorite important notes
* Search and filter notes
* Move notes to trash and restore them
* Download notes
* User authentication
* Responsive dashboard and interface

## Tech Stack

### Frontend

* React
* Inertia.js
* Tailwind CSS
* Vite

### Backend

* Laravel
* PHP
* MySQL

### AI Integration

* Google Gemini API

## How It Works

The basic flow of the application is:

1. The user provides the content they want to turn into notes.
2. The request is sent to the Laravel backend.
3. Laravel communicates with the Gemini API.
4. Gemini processes the content and returns the generated notes.
5. The generated notes are displayed in the React interface.
6. The user can edit, save, favorite, download, or delete the notes.
   

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/Sakshyamdhakal/ai-note-generator.git
cd ai-note-generator
```

### 2. Install dependencies

```bash
composer install
npm install
```

### 3. Configure environment

Create your `.env` file:

```bash
cp .env.example .env
```

Generate the Laravel application key:

```bash
php artisan key:generate
```

Configure your database and Gemini API credentials in the `.env` file.

### 4. Run migrations

```bash
php artisan migrate
```

### 5. Start the application

Run the Laravel server:

```bash
php artisan serve
```

In another terminal, run the frontend:

```bash
npm run dev
```

The application should now be available through the local Laravel development server.

## Environment Variables

The application requires the following configuration:

```env
APP_URL=

DB_DATABASE=
DB_USERNAME=
DB_PASSWORD=

GEMINI_API_KEY=
```

Use your own Gemini API key and database credentials.

## Project Structure

The project follows a Laravel + React architecture:

```text
ai-note-generator/
├── app/
│   ├── Http/
│   ├── Models/
│   └── ...
├── resources/
│   ├── js/
│   │   ├── Components/
│   │   ├── Layouts/
│   │   └── Pages/
│   └── ...
├── routes/
├── database/
├── public/
└── ...
```

The Laravel application handles the backend logic, database operations, authentication, and communication with the Gemini API, while React is used for the user interface.

## What I Learned

Through this project, I worked with:

* Building a full-stack application with Laravel and React
* Creating and consuming APIs
* Integrating a third-party generative AI API
* Managing application data with MySQL
* Implementing authentication and CRUD operations
* Connecting React with Laravel using Inertia.js
* Building reusable UI components with Tailwind CSS

## Author

**Sakshyam Dhakal**

BSc. CSIT Student & Full-Stack Developer

GitHub: [Sakshyamdhakal](https://github.com/Sakshyamdhakal)

