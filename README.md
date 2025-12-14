# Axamise: Online Assessment Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](https://github.com)
[![React Version](https://img.shields.io/badge/react-^18.2.0-blue)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/vite-^5.0.0-purple)](https://vitejs.dev/)


**Axamise** is a modern, full-featured web application designed to streamline the creation, management, and execution of online assessments. It provides a seamless experience for both administrators and students, featuring role-based access, real-time code evaluation, and a comprehensive event and question management system.

---

## Table of Contents

1.  [**Overall Project Structure**](#overall-project-structure)
2.  [**Core Concepts**](#core-concepts)
    -   [High-Level Architecture](#high-level-architecture)
    -   [Design Patterns](#design-patterns)
3.  [**Module Breakdown**](#module-breakdown)
    -   [State Management](#state-management)
    -   [Authentication Module](#authentication-module)
    -   [Event Management Module](#event-management-module)
    -   [Question & Solving Module](#question--solving-module)
    -   [Admin Approval Module](#admin-approval-module)
    -   [User-Facing Modules](#user-facing-modules)
    -   [AI Integration](#ai-integration)
4.  [**Detailed File Reference**](#detailed-file-reference)
    -   [Root `src` Files](#root-src-files)
    -   [Components (`src/Components/`)](#components-srccomponents)
    -   [Controllers (`src/controller/`)](#controllers-srccontroller)
    -   [Models (`src/models/`)](#models-srcmodels)
    -   [Pages (`src/pages/`)](#pages-srcpages)
    -   [Services (`src/services/`)](#services-srcservices)
5.  [**Key UI Components**](#key-ui-components)
    -   [`Particels.jsx`](#particelsjsx)
    -   [`FlowingMenu.jsx`](#flowingmenujsex)
6.  [**Code Quality & Performance**](#code-quality--performance)
    -   [Linting & Standards](#linting--standards)
    -   [Static Analysis](#static-analysis)
    -   [Performance Considerations](#performance-considerations)
7.  [**Installation & Setup**](#installation--setup)
8.  [**License**](#license)
9.  [**Contact**](#contact)

---

## Overall Project Structure

```
Axamise/
├── .github/                    # GitHub Actions workflows (e.g., Qodana)
├── Documentation/              # Feature documentation
├── src/
│   ├── asset/                  # Static assets (images, videos)
│   ├── Components/             # Reusable and page-level UI components
│   ├── controller/             # Business logic layer (MVC-style controllers)
│   ├── Gemini/                 # AI integration module
│   ├── models/                 # Data structure definitions (ES6 classes)
│   ├── pages/                  # Top-level page components (Views)
│   ├── services/               # Backend communication layer (Firebase, APIs)
│   ├── DataUpload.js           # Data upload utility
│   ├── EventContext.jsx        # Context for event-specific state
│   ├── firebase.js             # Firebase configuration and initialization
│   ├── GlobalContext.jsx       # Global application state management
│   ├── localCache.js           # Local caching utility
│   ├── main.jsx                # Application entry point and routing
│   └── Utilities.ts            # Shared constants, enums, and types
├── test/                       # Unit and integration tests
├── .gitignore
├── eslint.config.js            # ESLint configuration
├── index.html                  # Main HTML entry point for Vite
├── package.json                # Project dependencies and scripts
├── qodana.yaml                 # Qodana configuration for code quality
├── tailwind.config.js          # Tailwind CSS configuration
└── vite.config.js              # Vite build configuration
```

---

## Core Concepts

### High-Level Architecture

The project follows a scalable architecture inspired by **MVC (Model-View-Controller)**, promoting a clear separation of concerns.

-   **Views (`src/pages/` & `src/Components/`)**: React components responsible for rendering the UI. They capture user input and delegate logic to controllers.
-   **Controllers (`src/controller/`)**: Act as the "brain" for each feature. They orchestrate the data flow, process user actions, and communicate between the Views and Services.
-   **Models (`src/models/`)**: ES6 classes and TypeScript types that define the shape and default values of our data entities (e.g., `User`, `Event`, `Question`). This ensures data consistency throughout the app.
-   **Services (`src/services/`)**: This layer encapsulates all external interactions, primarily with **Firebase**. It handles all Firestore queries, Firebase Authentication calls, and any other external API interactions (like the Piston API for code execution). This abstraction prevents backend-specific logic from leaking into the rest of the application.

### Design Patterns

#### Factory Design Pattern

The `services` directory makes extensive use of the **Factory Pattern** to decouple controllers from concrete service implementations. This is a cornerstone of the architecture, making it highly modular.

-   **Location**: `src/services/Authentication/_factory.Authentication.service.ts`, `src/services/Events/_repositories/_factory.event.service.ts`, etc.
-   **How it Works**: A static `create` method in a factory class determines which concrete service to instantiate based on a `serviceType` string. This allows a controller to request a service (e.g., `LOGIN`) without knowing the specific class that implements it.

**Example:** A controller can request a `LOGIN` service from the `AuthenticationService` factory, which returns a `LoginService` instance ready to handle the authentication logic. This allows for easy extension, such as adding an `OAuthService` without changing the controller.

#### Repository Design Pattern

In some modules, the **Repository Pattern** is used to further abstract data access logic. This pattern provides a more structured and scalable way to manage communication with Firebase, making the codebase more reliable and easier to debug.

-   **Location**: `src/services/Events/_repositories/_IEventRepository.ts`, `src/services/users/repository.ts`
-   **How it Works**: An interface (like `IEventRepository`) defines the data operations (e.g., `getEventById`, `createEvent`). Concrete repository classes implement this interface, providing the specific Firebase/Firestore query logic. Services then use these repositories to interact with the database.

---

## Module Breakdown

### State Management

-   **`GlobalContext.jsx`**: A React Context for managing app-wide state, such as the current user's information (`user_uid`, `currentName`) and admin status.
-   **`EventContext.jsx`**: A more focused context for managing state within a specific assessment event, such as the current question or timer.

### Authentication Module

-   **Description**: Handles all user and admin authentication, including login, signup, and role-based access control.
-   **Key Files**: `src/pages/Authentication/`, `src/controller/Authentication/`, `src/services/Authentication/`
-   **Features**: Secure login/signup for students, a separate login flow for admins, and admin tools for user management. It leverages the Factory Pattern to provide different authentication services.

### Event Management Module

-   **Description**: Allows users to create, view, and manage assessment events. An "event" acts as a container for a set of questions.
-   **Key Files**: `src/pages/Events/`, `src/controller/Events/`, `src/services/Events/`
-   **Flow**: Users create events through a form, and the data is saved to Firestore via the `event_create.controller.js` and associated services. Users can also view their created events.

### Question & Solving Module

-   **Description**: The core of the assessment experience. It handles question creation, listing questions within an event, and the interactive code-solving environment.
-   **Key Files**: `src/pages/Questions/`, `src/controller/Questions/`, `src/services/Questions/`
-   **Code Execution**: The `Solving_Section.jsx` page provides a Monaco Editor for writing C++ code. The code is sent to the **Piston API** for execution, and the output is displayed to the user. Successful solutions are saved to Firestore.

### Admin Approval Module

-   **Description**: Provides dashboards for administrators to moderate user-created content. Events and questions remain in a "pending" state until an admin approves or rejects them.
-   **Key Files**: `src/pages/Admin/`, `src/controller/Admin/`, `src/services/Admin/`
-   **Flow**: Admins can view pending content, approve it (which moves it to a public collection), or reject it (which triggers a notification to the creator).

### User-Facing Modules

-   **Description**: These modules provide the main user experience outside of assessments.
-   **Key Files**:
    -   `src/pages/users/Feed.jsx`: A dashboard or feed for users.
    -   `src/pages/users/Profile.jsx`: The user's profile page.
    -   `src/pages/users/Notifications.jsx`: A page to display notifications related to their content.

### AI Integration

-   **Description**: This module integrates AI capabilities into the application.
-   **Key Files**: `src/Gemini/ai.js`
-   **Purpose**: While the exact functionality is evolving, this module is intended to leverage large language models (like Google's Gemini) for features such as automated question generation, code analysis, or providing hints to students.

---

## Detailed File Reference

This section provides a high-level overview of the key directories.

### Root `src` Files
-   **`main.jsx`**: The application's entry point. Renders the React app, sets up context providers, and defines routes using `react-router-dom`.
-   **`firebase.js`**: Initializes and configures the Firebase app, exporting instances of Firestore, Auth, and Storage.
-   **`GlobalContext.jsx` & `EventContext.jsx`**: Implement React Context for state management.
-   **`Utilities.ts`**: Contains shared constants, enums (`SERVICE`, `Database`), and type definitions.

### Components (`src/Components/`)
This directory contains all reusable React components.
-   **Page-Specific Components**: Prefixed with double underscores (e.g., `__Question_List.jsx`). These are composite components used to build a specific page.
-   **Custom Components**: Located in `src/Components/Custom/`, these are highly stylized, reusable widgets like `FlowingMenu.jsx` and `Particels.jsx`.
-   **Common Components**: `__Common.jsx` provides shared MUI prop configurations to ensure consistent styling.

### Controllers (`src/controller/`)
This directory contains the business logic for different features. Controllers are responsible for validating data, calling services, and preparing data for the views. The structure mirrors the `pages` and `services` directories.

### Models (`src/models/`)
This directory contains data models that define the structure of objects used throughout the application, ensuring consistency.
-   **`User_Model.js` / `Student_Model.js` / `AdminInfo_Model.js`**: Define different user types.
-   **`Event_Model.js` / `Question_Model.js`**: Define the core assessment entities.
-   **`Solve_Model.ts` / `Event_ParticipationModel.js`**: Track user progress and submissions.
-   **`Notification_Model.js`**: Defines the structure for user notifications.
-   *(For a detailed breakdown of each model, see the previous section on Models)*.

### Pages (`src/pages/`)
This directory contains the top-level components for each route in the application (e.g., `Login.jsx`, `Event_Create.jsx`). They compose smaller components from `src/Components/` to build the full page view.

### Services (`src/services/`)
This directory is responsible for all external communication.
-   It's organized by feature (e.g., `Authentication`, `Events`, `Questions`).
-   Services encapsulate all Firebase and external API calls.
-   They make heavy use of the Factory and Repository patterns to decouple the application logic from the specific implementation of data sources.

---

## Key UI Components

The application uses several custom, high-impact components to create a dynamic user experience.

### `Particels.jsx`

-   **Description**: A stunning, animated particle background that responds to mouse movement.
-   **Technology**: Built with `ogl`, a lightweight WebGL library. It creates a `Geometry` of thousands of points and animates their position in a GLSL vertex shader, offering excellent performance by offloading work to the GPU.

### `FlowingMenu.jsx`

-   **Description**: A full-screen, animated navigation menu where each item reveals a scrolling marquee on hover.
-   **Technology**: Uses `gsap` (GreenSock Animation Platform) for fluid animations. The hover effect is triggered by detecting the closest edge of the menu item to the mouse cursor, creating a unique directional animation.

---

## Code Quality & Performance

### Linting & Standards

-   **ESLint**: The project is configured with ESLint (`eslint.config.js`) to enforce a consistent code style and catch common errors, using recommended rules for JavaScript, React Hooks, and React Refresh.

### Static Analysis

-   **Qodana**: The project uses [JetBrains Qodana](https://www.jetbrains.com/qodana/) for static analysis to find bugs, security vulnerabilities, and style issues. The analysis is run automatically via a GitHub Actions workflow defined in `.github/workflows/qodana_code_quality.yml`.

### Performance Considerations

-   **Asynchronous Operations**: All I/O operations (Firebase calls, API requests) are handled asynchronously using `async/await` to keep the UI responsive.
-   **Bundle Size**: Vite provides excellent tree-shaking and code-splitting out of the box.
-   **Animation Performance**: Animations are offloaded to the GPU where possible, using performant libraries like `ogl` and `gsap`.

---

## Installation & Setup

To get the project up and running locally, follow these steps:

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/Sadi-/Axamise.git
    cd Axamise
    ```

2.  **Install dependencies:**
    Make sure you have Node.js (v18 or later) installed. Then, run:
    ```sh
    npm install
    ```

3.  **Set up Firebase:**
    -   Create a Firebase project at [firebase.google.com](https://firebase.google.com/).
    -   Enable **Firestore Database** and **Firebase Authentication** (with the Email/Password provider).
    -   In your Firebase project settings, create a new Web App.
    -   Copy the `firebaseConfig` object and paste it into `src/firebase.js`.

4.  **Run the development server:**
    ```sh
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.

---

## License

This project is licensed under the **MIT License**.

---

## Contact

Project maintained by **Sadi** - [AXAMISS.com](https://AXAMISS.com/)

For any inquiries or feedback, please open an issue on GitHub.