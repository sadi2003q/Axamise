# Axamise: Deep Dive into the Online Assessment Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](https://github.com)
[![React Version](https://img.shields.io/badge/react-^19.1.1-blue)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/vite-^7.1.2-purple)](https://vitejs.dev/)

**Axamise** is a modern, full-featured web application designed to streamline the creation, management, and execution of online assessments. It provides a seamless experience for both administrators and students, featuring role-based access, real-time code evaluation, and a comprehensive event and question management system.

---

## Table of Contents

1.  [**Overall Project Structure**](#overall-project-structure)
2.  [**Core Concepts**](#core-concepts)
    -   [High-Level Architecture](#high-level-architecture)
    -   [Design Patterns](#design-patterns)
3.  [**Module Breakdown**](#module-breakdown)
    -   [State Management (`GlobalContext.jsx`)](#state-management-globalcontextjsx)
    -   [Authentication Module (`Authentication`)](#authentication-module-servicesauthentication)
    -   [Event Management Module (`Events`)](#event-management-module-pagesevents)
    -   [Question & Solving Module (`Questions`)](#question--solving-module-pagesquestions)
    -   [Admin Approval Module (`Admin`)](#admin-approval-module-pagesadmin)
    -   [Others Module(`Others`)]()
4.  [**Detailed File Reference**](#detailed-file-reference)
    -   [Root `src` Files](#root-src-files)
    -   [Components (`src/Components/`)](#components-srccomponents)
    -   [Controllers (`src/controller/`)](#controllers-srccontroller)
    -   [Models (`src/models/`)](#models-srcmodels)
    -   [Pages (`src/pages/`)](#pages-srcpages)
    -   [Services (`src/services/`)](#services-srcservices)
5.  [**Key UI Components**](#key-ui-components)
    -   [`Particels.jsx`](#particelsjsx)
    -   [`FlowingMenu.jsx`](#flowingmenjsx)
    -   [`RotatingText.jsx`](#rotatingtextjsx)
6.  [**Code Quality & Performance**](#code-quality--performance)
    -   [Linting & Standards](#linting--standards)
    -   [Performance Considerations](#performance-considerations)
7.  [**Installation & Setup**](#installation--setup)
8.  [**License**](#license)
9.  [**Contact**](#contact)

---

## Overall Project Structure

```
Axamise/
├── Documentation/                    # Feature docs (Authentication, etc.)
├── src/
│   ├── asset/                        # Static assets (images, video, docs)
│   │   ├── background_video.mp4
│   │   ├── component.md
│   │   └── logo.jpg
│   ├── Components/                   # Reusable and page-level components
│   │   ├── Custom/
│   │   │   ├── FlowingMenu.jsx
│   │   │   └── Particels.jsx
│   │   ├── __Admin_Approval.jsx
│   │   ├── __Admin_Approval_Events.jsx
│   │   ├── __Admin_Login.jsx
│   │   ├── __Admin_SetUser.jsx
│   │   ├── __Animation.jsx
│   │   ├── __Common.jsx
│   │   ├── __Event_Create.jsx
│   │   ├── __Event_Show.jsx
│   │   ├── __Feed.jsx
│   │   ├── __LogIn.jsx
│   │   ├── __Profile.jsx
│   │   ├── __Question_Create.jsx
│   │   ├── __Question_List.jsx
│   │   ├── __SignUp.jsx
│   │   └── __Solving_Section.jsx
│   ├── controller/
│   │   ├── Admin/
│   │   │   ├── admin.approve.controller.js
│   │   │   └── admin.approve.event.controller.js
│   │   ├── Authentication/
│   │   │   ├── admin.login.controller.js
│   │   │   ├── admin.setUser.controller.js
│   │   │   ├── login.controller.js
│   │   │   └── signup.controller.js
│   │   ├── Events/
│   │   │   ├── event_create.controller.js
│   │   │   └── event_show.controller.js
│   │   └── Questions/
│   │       ├── question_create.controller.js
│   │       ├── question_list.controller.js
│   │       └── solving_section.controller.js
│   ├── models/
│   │   ├── AdminApproval_Model.js
│   │   ├── AdminInfo_Model.js
│   │   ├── Base_Model.js
│   │   ├── Event_Model.js
│   │   ├── Notification_Model.js
│   │   ├── Question_Model.js
│   │   ├── Solve_Model.ts
│   │   ├── Student_Model.js
│   │   ├── User_Model.js
│   │   └── Validaiton_Model.js
│   ├── pages/
│   │   ├── Admin/
│   │   │   ├── Admin_Approval.jsx
│   │   │   └── Admin_ApprovalEvent.jsx
│   │   ├── Authentication/
│   │   │   ├── Admin_login.jsx
│   │   │   ├── Admin_SetUser.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Signup.jsx
│   │   ├── Events/
│   │   │   ├── Event_Create.jsx
│   │   │   └── Event_Show.jsx
│   │   ├── Questions/
│   │   │   ├── Question_Create.jsx
│   │   │   ├── Question_List.jsx
│   │   │   └── Solving_Section.jsx
│   │   ├── users/
│   │   │   ├── Feed.jsx
│   │   │   └── Profile.jsx
│   │   └── test.jsx
│   ├── services/
│   │   ├── Admin/
│   │   │   ├── _admin.approve.event.service.ts
│   │   │   └── _admin.approver.service.ts
│   │   ├── Authentication/
│   │   │   ├── README.md
│   │   │   ├── _admin.login.service.ts
│   │   │   ├── _admin.setUser.service.ts
│   │   │   ├── _factory.Authentication.service.ts
│   │   │   ├── _login.service.ts
│   │   │   └── _signup.service.ts
│   │   ├── Events/
│   │   ├── Others/
│   │   └── Questions/
│   ├── ViewModel/
│   │   └── Profile_ViewModel.js
│   ├── GlobalContext.jsx
│   ├── Utilities.ts
│   ├── firebase.js
│   └── main.jsx
├── test/
│   ├── admin.login.controller.test.js
│   ├── login.controller.test.js
│   └── signup.controller.test.js
├── index.html
├── style.css
├── tailwind.config.js
├── vite.config.js
├── eslint.config.js
└── package.json
```

---

## Core Concepts

### High-Level Architecture

The project follows a scalable architecture inspired by **MVC (Model-View-Controller)**, promoting a clear separation of concerns.

-   **Views (`src/pages/` & `src/Components/`)**: React components responsible for rendering the UI. They capture user input and delegate logic to controllers.
-   **Controllers (`src/controller/`)**: Act as the "brain" for each feature. They orchestrate the data flow, process user actions, and communicate between the Views and Services.
-   **Models (`src/models/`)**: ES6 classes that define the shape and default values of our data entities (e.g., `User`, `Event`, `Question`). This ensures data consistency throughout the app.
-   **Services (`src/services/`)**: This layer encapsulates all external interactions, primarily with **Firebase**. It handles all Firestore queries, Firebase Authentication calls, and any other external API interactions. This abstraction prevents Firebase logic from leaking into the rest of the application.

### Design Patterns

#### Factory Design Pattern

The `services` directory makes extensive use of the **Factory Pattern** to decouple controllers from concrete service implementations. This is the cornerstone of the backend-for-frontend architecture, making it highly modular.

-   **Location**: `src/services/Authentication/_factory.Authentication.service.ts`, `src/services/Events/_repositories/_factory.event.service.ts`, etc.
-   **How it Works**: A static `create` method in the factory class (`AuthenticationService`, `EventService`) determines which concrete service to instantiate based on a `serviceType` string.

**Data Flow Example (Login):**
1.  **View (`Login.jsx`)**: Captures email/password and calls the controller.
2.  **Controller (`LoginController.js`)**: Instantiates the service via the factory.
    ```javascript
    import { AuthenticationService } from "../services/Authentication/_factory.Authentication.service.ts";
    import { SERVICE } from "../Utilities.ts";

    // The controller asks the factory for a 'LOGIN' service
    this.service = AuthenticationService.create(user, SERVICE.LOGIN);
    const result = await this.service.login(); // Calls the method on the returned instance
    ```
3.  **Factory (`_factory.Authentication.service.ts`)**: Returns a new `LoginService` instance.
    ```typescript
    export class AuthenticationService {
        static create(user, serviceType) {
            switch (serviceType) {
                case SERVICE.LOGIN:
                    return new LoginService(user); // Instantiates the concrete class
                // ... other cases
            }
        }
    }
    ```
4.  **Service (`_login.service.ts`)**: The `LoginService` instance performs the actual Firebase call.

This pattern allows us to easily swap or add new authentication methods (e.g., SAML, OAuth) without changing any controller logic.

---

## Module Breakdown

### State Management (`GlobalContext.jsx`)

-   **Description**: A simple, app-wide state management solution using React's Context API. It avoids the need for a heavier library like Redux for the current scope.
-   **Data Stored**: Holds globally accessible state such as the current user's UID (`user_uid`), name (`currentName`), and the logged-in admin's email (`adminEmail`).
-   **Usage**:
    ```javascript
    import { useGlobal } from "./GlobalContext";

    const { user_uid, setCurrentName } = useGlobal();
    ```

### Authentication Module (`services/Authentication`)

The **Authentication Module** (`services/Authentication`) is a robust, modular component within the Axamise application, dedicated to handling secure user and admin authentication workflows. It supports login, signup, admin-specific access, and user management (CRUD operations), ensuring role-based security and seamless integration with Firebase Authentication and Firestore.

Key features:
- **User Flows**: Secure login and signup for students/users with email/password validation.
- **Admin Flows**: Dedicated admin login and tools for managing users (e.g., creating new admins).
- **Security**: Password hashing, JWT-like session management via Firebase, and role checks.
- **Extensibility**: Factory-based design for easy addition of providers (e.g., Google OAuth).

This module adheres to the **Factory Pattern** for service creation, enabling flexible, testable authentication logic. It leverages React for UI, TypeScript for services, and abstracts Firebase interactions.

For the full Axamise project overview, see the [root README](../README.md).

---

## Table of Contents

1.  [**Module Overview**](#module-overview)
2.  [**Core Concepts**](#core-concepts)
    -   [Architecture](#architecture)
    -   [Design Patterns](#design-patterns)
3.  [**File Structure**](#file-structure)
4.  [**Detailed Component Breakdown**](#detailed-component-breakdown)
    -   [UI Components (`src/components/`)](#ui-components-srccomponents)
    -   [Data Models (`src/models/`)](#data-models-srcmodels)
    -   [Pages (`src/pages/Authentication/`)](#pages-srcpagesauthentication)
    -   [Controllers (`src/controller/Authentication/`)](#controllers-srccontrollerauthentication)
    -   [Services (`src/services/Authentication/`)](#services-srcservicesauthentication)
5.  [**Data Flow Examples**](#data-flow-examples)
    -   [User Login Flow](#user-login-flow)
    -   [Admin User Management Flow](#admin-user-management-flow)
6.  [**Usage & Integration**](#usage--integration)
7.  [**Development Notes**](#development-notes)
    -   [Testing](#testing)
    -   [Performance & Security](#performance--security)
8.  [**License**](#license)
9.  [**Contact**](#contact)

---

## Module Overview

The Authentication Module centralizes all access control in Axamise, from initial user onboarding to admin oversight. It processes credentials against Firebase Auth, stores user profiles in Firestore, and enforces roles (e.g., `student` vs. `admin`). This ensures protected routes (e.g., event creation) are only accessible post-authentication.

**Tech Stack**:
- **Frontend**: React (JSX) for interactive forms.
- **Backend Logic**: TypeScript services with Firebase integration.
- **Validation**: Custom models for input sanitization.

**Dependencies**: `firebase/auth`, `firebase/firestore`, `bcryptjs` (for local hashing), `react-hook-form` (for form handling).

---

## Core Concepts

#### Architecture

This module follows an **MVC-inspired structure** tailored for frontend-heavy apps:
- **Views**: React pages and components for form rendering and feedback (e.g., success modals).
- **Controllers**: JavaScript logic that validates inputs, orchestrates services, and updates global state via `GlobalContext`.
- **Models**: JS classes defining data schemas (e.g., `UserModel` with `email`, `role`).
- **Services**: TS classes abstracting Firebase ops, using factories for instantiation.

Data persists in Firestore collections: `users` (profiles), `admins` (elevated users).












## Design Patterns

### File Structure

Organized under `frontend/src/` for modularity. Here's the tree:
text
```
Axamise/
├── frontend/
│   └── src/
│       ├── components/                 # Reusable UI elements
│       │   ├── _Login.jsx              # Login form components
│       │   ├── _Signup.jsx             # Signup form components
│       │   └── _AdminLogin.jsx         # Admin login components
│       ├── models/                     # Data schemas
│       │   └── UserModel.js            # User entity model
│       ├── pages/Authentication/       # Top-level views
│       │   ├── Login.jsx               # User login page
│       │   ├── Signup.jsx              # User signup page
│       │   ├── AdminLogin.jsx          # Admin login page
│       │   └── AdminSetUser.jsx        # Admin user CRUD page
│       ├── controller/Authentication/  # Business logic
│       │   ├── adminLogin.controller.js
│       │   ├── adminSetUser.controller.js
│       │   ├── login.controller.js
│       │   └── signup.controller.js
│       └── services/Authentication/    # Firebase abstractions
│           ├── _base/                  # Abstract bases
│           │   ├── _baseLogin.service.ts
│           │   └── _baseSignup.service.ts
│           ├── _adminLogin.service.ts
│           ├── _adminSetUser.service.ts
│           ├── _factoryAuthentication.service.ts  # Factory core
│           ├── _login.service.ts
│           └── _signup.service.ts
```

### Data Models (`src/models/`)

ES6 classes for data integrity.

- **`UserModel.js`**: Core entity.
  ```javascript
  export class UserModel {
    constructor({ id, email, password, role = 'student', createdAt = new Date() }) {
      this.id = id;
      this.email = email;
      this.password = password; // Hashed in service
      this.role = role;
      this.createdAt = createdAt;
    }
    validate() { /* Email regex, etc. */ }
  }


### Pages (`src/pages/Authentication/`)

Orchestrate full UI flows with routing.

- **`Login.jsx`**: Renders `_Login.jsx`, submits to `login.controller.js`; redirects via `useNavigate` on success.
- **`Signup.jsx`**: Similar to Login; handles duplicate email checks via service.
- **`AdminLogin.jsx`**: Role-gated; updates `GlobalContext.adminEmail` on auth.
- **`AdminSetUser.jsx`**: CRUD table for users; includes search/filter.

### Controllers (`src/controller/Authentication/`)

Bridge UI to services; handle errors/states.

- **`login.controller.js`**: `async login(userData) { validate(userData); return factory.create(SERVICE.LOGIN_USER, userData).authenticate(); }`
- **`signup.controller.js`**: Checks existence, hashes password, creates Firestore doc.
- **`adminLogin.controller.js`**: Adds role verification.
- **`adminSetUser.controller.js`**: CRUD wrappers (e.g., `createAdminUser`).

### Services (`src/services/Authentication/`)

TS classes for Firebase ops.

- **`_baseLogin.service.ts & _baseSignup.service.ts`**: Abstracts `authenticate()`, `hashPassword()`.
- **`_login.service.ts & _signup.service.ts`**: User impls; `login()` calls `signInWithEmailAndPassword`.
- **`_adminLogin.service.ts & _adminSetUser.service.ts`**: Admin impls; queries `admins` collection.
- **`_factoryAuthentication.service.ts`**: See Design Patterns.

## Data Flow Examples

### User Login Flow

1. User enters credentials in `Login.jsx` → `_Login.jsx` validates locally.
2. Submits to `login.controller.js` → Factory creates `LoginService`.
3. Service: `firebase.auth().signInWithEmailAndPassword()` → Updates `GlobalContext.user_uid`.
4. On success: Redirect to `/events`; on error: Display toast.

### Admin User Management Flow

1. Admin logs in via `AdminLogin.jsx`.
2. Navigates to `AdminSetUser.jsx` → Fetches users via `adminSetUser.controller.js`.
3. Controller: Factory → `AdminSetUserService.getAllUsers()`.
4. CRUD actions update Firestore `users` collection.
## Development Notes

### Testing

- **Unit Tests**: Jest for controllers/services (e.g., mock Firebase, test factory returns).
- **Integration**: Cypress for end-to-end flows (login → dashboard).
- **Example**: `test/admin.login.controller.test.js` covers edge cases like invalid creds.

### Performance & Security

- **Perf**: Lazy-load services; debounce form inputs.
- **Sec**: Never store plain passwords; use Firebase rules for role enforcement.
- **Improvements**: Add 2FA via Firebase extensions; OAuth via factory.































### UI Components (`src/components/`)

Reusable JSX elements for forms and interactions.

- **`_Login.jsx`**: Form with email/password fields, validation hooks, and loading spinner. Uses `react-hook-form` for state.
- **`_Signup.jsx`**: Extended form adding name/role fields; includes password strength indicator.
- **`_AdminLogin.jsx`**: Simplified form with admin-only role checkbox; integrates particle background for branding.****







#### Factory Pattern
Central to services: `_factory.Authentication.service.ts` dynamically creates instances (e.g., `LoginService` for users, `AdminLoginService` for admins) based on `serviceType` (e.g., `LOGIN_USER`).

**Benefits**:
- Decouples controllers from implementations.
- Enables mocking for tests.
- Supports future extensions (e.g., `OAuthService`).

**Example Snippet**:
```typescript
// In factory
export class AuthenticationService {
  static create(type: string, userData: UserModel) {
    switch (type) {
      case SERVICE.LOGIN_USER: return new LoginService(userData);
      case SERVICE.ADMIN_LOGIN: return new AdminLoginService(userData);
      // ...
    }
  }
}

### Event Management Module (`pages/Events`)

-   **Description**: Allows users to create events and admins to manage them. An "event" acts as a container for a set of questions in an assessment.
-   **Key Files**:
    -   `Event_Create.jsx`: A form for creating or updating an event's details (title, date, duration).
    -   `Event_Show.jsx`: A page that displays all events created by the logged-in user in an accordion view.
    -   `event_create.controller.js`: Handles the logic for validating and saving event data to Firestore via the `EventCreateService`.
-   **Data Flow (Event Creation)**:
    1.  User fills the form in `Event_Create.jsx`.
    2.  On submit, `EventCreateServiceController` is invoked.
    3.  The controller calls `_Upload_Event` or `_Update_Event` in `EventCreateService`.
    4.  The service uses the `FirebaseEventRepository` to write the data to the `Events` collection in Firestore.

### Question & Solving Module (`pages/Questions`)

-   **Description**: This is the core of the assessment experience. It handles question creation, listing, and the interactive solving environment.
-   **Key Files**:
    -   `Question_Create.jsx`: A form for users to create new questions, specifying title, description, difficulty, mark, and associating it with an event.
    -   `Question_List.jsx`: Displays all created questions and allows users to select one to view its details.
    -   `Solving_Section.jsx`: The interactive coding environment. It displays the selected question's description and provides a **Monaco Editor** for writing C++ code.
-   **Code Execution**:
    -   The `SolvingSectionController` handles the code execution logic.
    -   When the user clicks "Run", the code from the editor is sent to the **Piston API** (`https://emkc.org/api/v2/piston/execute`) via the `runCode` method in `_solving_section.service.ts`.
    -   The API compiles and runs the code, and the `stdout` or `stderr` is returned and displayed to the user.
    -   On successful runs, the solution is saved to the `Solves` collection in Firestore.

### Admin Approval Module (`pages/Admin`)

-   **Description**: Provides dashboards for administrators to moderate content. Events and questions created by standard users are held in a pending state until an admin acts on them.
-   **Key Files**:
    -   `Admin_Approval.jsx`: Dashboard for approving or rejecting questions.
    -   `Admin_ApprovalEvent.jsx`: Dashboard for approving or rejecting events.
-   **Data Flow (Question Approval)**:
    1.  `Admin_ApproveController` fetches all questions with `status: "pending"` from the `questions` collection.
    2.  The admin reviews a question in the `Admin_Approval.jsx` view.
    3.  **On Approve**: The controller calls the `Admin_ApproveService`. The service copies the question data to the `ApprovedQuestions` collection and deletes the original from `questions`. It also allows the admin to define the C++ function signature and boilerplate code.
    4.  **On Reject/Modify**: The controller uses the `NotificationService` to create a notification for the user, explaining the reason for rejection or the required changes. The original question may be deleted or its status updated.




### Others Module
-   **Description**: Provide the interface for Notificaitons Which Notify the Status reguarding the Problem/Event Status Requested by the User.
    **Key Files**
    -   `Notification`

### Assets Module (`src/asset/`)
-   **Description**: Static and content assets for the app (media, docs). Keep large media here and reference via import/URL. The `component.md` provides internal notes or component documentation.
-   **Key Files**: `background_video.mp4`, `logo.jpg`, `component.md`

### ViewModel Layer (`src/ViewModel/`)
-   **Description**: Prepares and shapes data for specific views without UI concerns. Helps keep pages lean.
-   **Key Files**: `Profile_ViewModel.js` – orchestrates profile data fetch and transform.

### Utilities (`src/Utilities.ts`)
-   **Description**: Centralized enums, constants, and types used across modules, e.g., `SERVICE`, `Database`, `routes`, `Firebase_Response` typings.
-   **Used By**: Controllers, Services, and UI for consistent references.

### Firebase Bootstrapping (`src/firebase.js`)
-   **Description**: Initializes Firebase app, exports Firestore/Auth/Storage instances. Single source of truth for Firebase config.

### Services: Admin (`src/services/Admin/`)
-   **Description**: Admin-only operations for approving questions and events.
-   **Key Files**:
    - `_admin.approver.service.ts`: Approve/reject questions; moves items between collections and triggers notifications.
    - `_admin.approve.event.service.ts`: Approve/reject events; updates event status and notifies creators.

### Services: Authentication (`src/services/Authentication/`)
-   **Description**: All auth flows using Factory Pattern.
-   **Docs**: See `src/services/Authentication/README.md` for deep-dive.
-   **Key Files**: `_factory.Authentication.service.ts`, `_login.service.ts`, `_signup.service.ts`, `_admin.login.service.ts`, `_admin.setUser.service.ts`, `_base/*`.

### Services: Events (`src/services/Events/`)
-   **Description**: CRUD operations for Events collection; factory-ready design mirroring Authentication for consistency.
-   **Typical Methods**: createEvent, updateEvent, listEventsByUser, getEventById, deleteEvent.
-   **Used By**: `event_create.controller.js`, `event_show.controller.js` and `pages/Events/*`.

### Services: Questions (`src/services/Questions/`)
-   **Description**: Question authoring, listing, approval move, and code execution via Piston API.
-   **Typical Methods**: createQuestion, listQuestions, getQuestionDetails, submitSolution, runCode (Piston).
-   **Integration**: Used by `question_*` controllers and `Solving_Section` page.

### Services: Others (`src/services/Others/`)
-   **Description**: Cross-cutting utilities such as Notifications.
-   **Key Files**: `_Notification.service.js` – create user notifications for approvals, rejections, and updates.



---

## Detailed File Reference

This section provides a file-by-file breakdown of the `src` directory.

### Root `src` Files
-   **`main.jsx`**: The application's main entry point. It renders the React application, sets up the `GlobalProvider` for context, and defines all application routes using `react-router-dom`.
-   **`firebase.js`**: Initializes and configures the Firebase app, and exports instances of Firestore, Firebase Storage, and Firebase Authentication for use throughout the application.
-   **`GlobalContext.jsx`**: Implements a React Context for managing global state, such as the current user's UID, name, and admin email.
-   **`Utilities.ts`**: A TypeScript file containing shared constants, enums (`SERVICE`, `Database`, `routes`), and type definitions (`Firebase_Response`).
-   **`ViewModel/Profile_ViewModel.js`**: Contains functions for fetching and preparing data specifically for the user profile view.

### Components (`src/Components/`)
-   **`__Admin_Approval.jsx`**: UI components for the admin approval panel, including the editable approval form and the rejection/modification reason fields.
-   **`__Admin_Approval_Events.jsx`**: UI components for displaying event details within the admin approval workflow.
-   **`__Admin_Login.jsx`**: Components for the admin login page, such as the header and the animated particle background.
-   **`__Admin_SetUser.jsx`**: Fine-grained components for the "Set Admin" form (e.g., `NameField`, `EmailField`, `ProfilePictureField`).
-   **`__Animation.jsx`**: Contains the `RotatingText` component for animated text effects.
-   **`__Common.jsx`**: Provides common MUI prop configurations (`GetCommonProps`) to ensure consistent styling for `TextField` components.
-   **`__Event_Create.jsx`**: UI components for the event creation form.
-   **`__Event_Show.jsx`**: Components for displaying the list of events, including the accordion view and search bar.
-   **`__Feed.jsx`**: A collection of components for the user feed/dashboard, such as `ContentTimeline` and `ExpandableList`.
-   **`__LogIn.jsx`**: UI components for the student login page.
-   **`__Profile.jsx`**: Components for the user profile page, including the animated starfield background.
-   **`__Question_Create.jsx`**: UI components for the question creation form.
-   **`__Question_List.jsx`**: Components for the question list page, including the list itself and the detailed description view.
-   **`__SignUp.jsx`**: UI components for the student signup form.
-   **`__Solving_Section.jsx`**: UI components for the code solving page layout.
-   **`Custom/FlowingMenu.jsx`**: A highly stylized, animated menu component using GSAP.
-   **`Custom/Particels.jsx`**: The reusable WebGL particle background component using OGL.

#### Component Conventions
- Page-specific composites are prefixed with double underscores (e.g., `__Question_List.jsx`).
- Low-level reusable widgets live under `Custom/`.
- Common styling props and helpers are centralized in `__Common.jsx` to ensure consistency.

### Controllers (`src/controller/`)
-   **`Admin/admin.approve.controller.js`**: Logic for fetching pending questions, handling approvals, rejections, and modification requests.
-   **`Admin/admin.approve.event.controller.js`**: Logic for the event approval workflow.
-   **`Authentication/`**: Controllers for all authentication-related actions (admin login, user management, student login/signup).
-   **`Events/`**: Controllers for creating, showing, and managing events.
-   **`Questions/`**: Controllers for creating, listing, and the code solving section.

#### Controller Responsibilities
- Validate incoming form/page data against Models
- Call appropriate Services via factories
- Map service responses to view-ready shapes (or delegate to ViewModels)

### Models (`src/models/`)
-   **`AdminApproval_Model.js`**: Extends the `Question` model to include approval-specific fields like `approvedBy`, `functionName`.
-   **`AdminInfo_Model.js`**: Defines the structure for an administrator user.
-   **`Base_Model.js`**: A base class with common fields like `createdBy` and `createdAt`.
-   **`Event_Model.js`**: Defines the structure for an event.
-   **`Notification_Model.js`**: Defines the structure for a notification.
-   **`Question_Model.js`**: Defines the structure for a question.
-   **`Solve_Model.ts`**: Defines the structure for a submitted code solution.
-   **`Student_Model.js`**: Defines the structure for a student user.
-   **`User_Model.js`**: A simple model for login credentials (email/password).
-   **`Validaiton_Model.js`**: A simple model for validation state.

#### Modeling Notes
- Use models to standardize Firestore documents and app data shapes.
- Prefer constructors that set sensible defaults (`createdAt`, `status`).
- `Solve_Model.ts` leverages TypeScript for stricter typing of submissions.

### Pages (`src/pages/`)
-   **`Admin/`**: Admin-only pages for approval workflows.
-   **`Authentication/`**: Pages for login and signup for both admins and students.
-   **`Events/`**: Pages for creating and viewing events.
-   **`Questions/`**: Pages for creating, listing, and solving questions.
-   **`users/`**: Pages for the student dashboard/feed and profile.
-   **`test.jsx`**: A test page for debugging `GlobalContext`.

#### Routing Notes
- `main.jsx` wires routes using `react-router-dom`.
- Pages compose feature-specific Components and bind to Controllers.

### Services (`src/services/`)
-   **`Admin/`**: Services for the admin approval process, interacting with `questions` and `approvedQuestions` collections.
-   **`Authentication/`**: Services for Firebase Auth operations and user data management. Contains the `AuthenticationService` factory.
-   **`Events/`**: Services for CRUD operations on the `Events` collection. Contains the `EventService` factory.
-   **`Others/`**: Miscellaneous services, like `_Notification.service.js`.
-   **`Questions/`**: Services for CRUD operations on questions and interacting with the Piston API. Contains the `QuestionService` factory.

#### Service Standards
- Keep Firebase queries and external API calls inside services only.
- Use factories to select concrete implementations by intent (e.g., LOGIN, SIGNUP).
- Return normalized responses, e.g., `{ success, data, error }` following `Firebase_Response` typing.

---

## Key UI Components

The application uses several custom, high-impact components to create a dynamic user experience.

### `Particels.jsx`

-   **Description**: A stunning, animated particle background that responds to mouse movement.
-   **Technology**: Built with `ogl`, a lightweight WebGL library. It creates a `Geometry` of thousands of points and animates their position in a GLSL vertex shader, offering excellent performance by offloading work to the GPU.
-   **Quality**: The component is highly configurable via props (`particleCount`, `speed`, `particleColors`, etc.), making it reusable in different contexts.

### `FlowingMenu.jsx`

-   **Description**: A full-screen, animated navigation menu where each item reveals a scrolling marquee on hover.
-   **Technology**: Uses `gsap` (GreenSock Animation Platform) for the reveal and hide animations. The hover effect is triggered by detecting the closest edge (top or bottom) of the menu item to the mouse cursor, creating a fluid, directional animation.

### `RotatingText.jsx`

-   **Description**: An animation component that cycles through a list of strings with a character-level stagger effect.
-   **Technology**: Built with `motion/react` (from Framer Motion). It splits text into characters, words, or lines and uses `AnimatePresence` to orchestrate the enter/exit animations for each character with a calculated delay.

---

## Code Quality & Performance

### Linting & Standards

-   **ESLint**: The project is configured with ESLint (`eslint.config.js`) to enforce a consistent code style and catch common errors.
-   **Configuration**: It uses `@eslint/js` recommended rules, along with plugins for React Hooks (`eslint-plugin-react-hooks`) and React Refresh. This ensures code is modern, clean, and less prone to bugs.

### Performance Considerations

-   **Asynchronous Operations**: All I/O operations (Firebase calls, API requests) are handled asynchronously using `async/await`, ensuring the UI remains responsive.
-   **Bundle Size**: Vite provides excellent tree-shaking and code-splitting out of the box, which helps keep the initial bundle size small.
-   **Animation Performance**: Animations that could be performance-intensive (like the particle system) are offloaded to the GPU using WebGL (`ogl`) and `gsap`, which are highly optimized for performance.

---

## Installation & Setup

To get the project up and running locally, follow these steps:

1.  **Clone the repository:**
    ```sh
    git clone <your-repository-url>
    cd Axamise
    ```

2.  **Install dependencies:**
    Make sure you have Node.js installed. Then, run:
    ```sh
    npm install
    ```

3.  **Set up Firebase:**
    -   Create a Firebase project at [firebase.google.com](https://firebase.google.com/).
    -   Enable **Firestore Database** and **Firebase Authentication** (with Email/Password and Google providers).
    -   Go to Project Settings, and under "Your apps," create a new Web App.
    -   Copy the `firebaseConfig` object and paste it into `src/firebase.js`.

4.  **Run the development server:**
    ```sh
    npm run dev
    ```
    The application will be available at `http://localhost:5173` (or another port if 5173 is in use).

5.  **Quick check:**
    - Open `http://localhost:5173` and navigate through Authentication → Events → Questions.
    - Try creating an event and a question, then run a sample C++ snippet in Solving Section to verify Piston execution.

---

## License

This project is licensed under the **MIT License**.

---

## Contact

Project maintained by **Sadi** - [adnansadi.com](https://adnansadi.com/)

For any inquiries or feedback, please open an issue or contact the project maintainer.
