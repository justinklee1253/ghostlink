# GhostLink - File Upload Application

GhostLink is a full-stack application built with Next.js (TypeScript) on the frontend and Flask on the backend. The app allows users to upload files, which are then processed and displayed with details such as file name, size, and type.

## Tech Stack

Frontend:
- Next.js
- TypeScript

Backend:
- Flask (Python)

## Project Structure

### Key Files

- `src/app/layout.tsx`: Defines the layout of the application. It wraps all pages within a consistent structure (e.g., header, footer) and provides a global structure to the app.
  
- `src/app/page.tsx`: Main page component of the Next.js application. This file corresponds to the root route (`/`) and imports and renders the `FileUpload` component.
  
- `src/app/components/FileUpload.tsx`: Handles the file upload functionality. It allows users to select a file, upload it, and displays the file details (name, size, type) after uploading.

### How It Works

#### Frontend (Next.js & TypeScript)

- Routing: Next.js uses file-based routing, so `page.tsx` corresponds to the root route (`/`).
- Rendering: When a user navigates to `http://localhost:3000`, the content in `page.tsx` is rendered, including the `FileUpload` component.
- Type Safety: TypeScript ensures that the props, state, and other variables in your components are correctly typed, reducing bugs and improving code quality.

#### Backend (Flask)

- Backend Server: Flask acts as the backend server that handles the file upload, processes the file, and returns the file details to the frontend.
  
- `app.py`: Contains the Flask server code. Defines the `/api/upload` endpoint, which handles `POST` requests for file uploads. It saves the uploaded file to the server and responds with the file's details (name, size, type).

## Setup Instructions

### 1. Setting Up the Virtual Environment for Flask

1. Create a virtual environment:
    ```bash
    python3 -m venv venv
    ```
   Note: Name your virtual environment `venv` so that `.gitignore` automatically excludes it from the main branch.

2. Activate the virtual environment:
    - On macOS/Linux:
        ```bash
        source venv/bin/activate
        ```
    - On Windows:
        ```bash
        venv\Scripts\activate
        ```

### 2. Running the Flask Backend

1. Navigate to the backend directory:
    ```bash
    cd ghostlink-backend
    ```

2. Install required dependencies:
    ```bash
    pip install -r requirements.txt
    ```

3. Start the Flask server (ensure your virtual environment is activated):
    ```bash
    python app.py
    ```
   The backend will be accessible at `http://127.0.0.1:8000`.

### 3. Running the Next.js Frontend

1. Install frontend dependencies:
    ```bash
    npm install
    ```

2. Start the development server:
    ```bash
    npm run dev
    ```
   The frontend will be accessible at `http://localhost:3000`.