# Admin Login Documentation

## Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Data Flow](#data-flow)
- [Components](#components)
  - [Admin_login.jsx](#admin_loginjsx)
  - [Admin_LoginController](#admin_logincontroller)
  - [User Model](#user-model)
  - [Admin_LoginService](#admin_loginservice)
- [Usage](#usage)
- [Notable Factors](#notable-factors)
- [Dependencies](#dependencies)

## Overview

This module provides a secure admin login system using React, Firebase Authentication, and Material-UI (MUI). It follows an MVC-like pattern: UI (View), business logic (Controller), data structure (Model), and Firebase integration (Service). Key features include form validation, error handling, and post-login navigation. The system initializes with default credentials for testing but relies on user input for production.

## Architecture

- **View**: Handles UI rendering and user input via React hooks.
- **Controller**: Orchestrates login flow, error mapping, and navigation.
- **Model**: Simple data holder for credentials, ensuring encapsulation.
- **Service**: Performs Firebase auth operations, abstracting external dependencies.

## Data Flow

Data movement follows a unidirectional pattern for predictability:

1. **Input Capture**: User types in the View (`Admin_login.jsx`), triggering `handleChange` to update local `user` state (e.g., `{ email: "input@email.com", password: "inputpass" }`).

2. **Validation**: On submit (`handleLogin`), check if `user.email` and `user.password` are non-empty. If invalid, set local `error` state; else, clear errors.

3. **Controller Invocation**: Pass `user` to `Admin_LoginController` constructor. Call `handleEmailLogin()`, which injects `user` into `Admin_LoginService`.

4. **Service Execution**: `loginWithEmailPassword` sends `user.email` and `user.password` to Firebase's `signInWithEmailAndPassword`. On success, returns `{ success: true, user: { uid: "..." }, id: "..." }`; on failure, `{ success: false, error: { code: "...", message: "..." } }`.

5. **Result Processing**: Controller's `processResult` receives the result. Success: Logs UID, optionally navigates. Failure: Maps error code (e.g., `auth/wrong-password` → "Incorrect password") and passes to View's `setLoginError`.

6. **Post-Success**: View sets global `adminEmail` via context and navigates (e.g., to `/admin/dashboard`).

This flow ensures separation of concerns: View manages UI/state, Controller handles logic, Service isolates API calls.

## Components

### Admin_login.jsx

React component for the login form.

- **Features**:
  - Email/password inputs with MUI `TextField` (label: "Admin ID"/"Password"), validation, and required attributes.
  - Error display in red text below fields.
  - Particle background (`Background_Particles`) and header (`LoginHeader` with "Admin Login").
  - Global context (`useGlobal`) for persisting `adminEmail`.

- **Key Methods**:
  - `handleLogin`: Prevents default form submit, validates, instantiates controller, calls `handleEmailLogin`, sets global email, navigates.
  - `handleChange`: Spreads `user` state, updates field, clears `loginError`.

- **State**:
  - `user`: Initialized with defaults (`new User("admin.adnan@gmail.com", "sadisadi112")`).
  - `error`: Local validation errors (e.g., "Both fields are required!").
  - `loginError`: Firebase-mapped errors from controller.

### Admin_LoginController

Manages login orchestration and error translation.

- **Constructor**: Takes `user`, `navigate`, `setFieldError`; initializes `service = new Admin_LoginService(user)`.

- **Methods**:
  - `handleEmailLogin`: Logs credentials, awaits service result, calls `processResult`.
  - `processResult`: If `success`, logs "✅ Successfully Login into Admin" and UID. Else, maps Firebase codes (e.g., `auth/invalid-email` → "Invalid email format.") to `setFieldError`.

### User Model

Basic ES6 class for credentials.

- **Constructor**: `new User(email = "", password = "")` – defaults empty, but View uses test values.
- **Properties**: Mutable `email` and `password` for reactive updates.

### Admin_LoginService

Firebase integration layer.

- **Constructor**: Binds `user` for reuse.
- **Methods**:
  - `loginWithEmailPassword`: Awaits Firebase `signInWithEmailAndPassword(auth, email, password)`. Returns credential on success (with `uid`) or error object.

## Usage

1. Import and render `<Admin_login />` in your route (e.g., via `react-router-dom`).
2. Ensure Firebase is configured in `../firebase` (exports `auth`).
3. On success, it sets global `adminEmail` and navigates (uncomment in controller for dashboard).
4. Test with defaults: Email "admin.adnan@gmail.com", Password "sadisadi112".

Example: Invalid login shows mapped error like "No account found with this email."

## Notable Factors

- **Security**: Uses Firebase Auth for serverless verification; passwords never stored in state beyond transit. Defaults are hardcoded – remove for production to avoid exposure.
- **Error Handling**: Comprehensive mapping covers common Firebase codes; fallback to raw message. UI clears errors on input change.
- **Performance**: Async/await for non-blocking login; no loading spinner (add via state if needed).
- **Accessibility**: MUI components ensure semantic HTML; required fields aid screen readers.
- **Extensibility**: Easy to add Google OAuth by extending controller/service.
- **Edge Cases**: Empty fields trigger local validation; network errors fall to default message.

## Dependencies

- React: `useState`, `useNavigate` (from `react-router-dom`).
- MUI: `Button`, `TextField`, `LoginIcon`.
- Firebase: `auth`, `signInWithEmailAndPassword`.
- Custom: `useGlobal` (GlobalContext), `Background_Particles`, `LoginHeader`, `GetCommonProps` (spreads MUI props).