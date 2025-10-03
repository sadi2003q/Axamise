# Admin Set User Documentation

## Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Data Flow](#data-flow)
- [Components](#components)
  - [Admin_SetUsr.jsx](#admin_setusrjsx)
  - [Admin_Info Model](#admin_info-model)
  - [Admin_InfoController](#admin_infocontroller)
  - [AdminSetUserService](#adminsetuserservice)
- [Usage](#usage)
- [Notable Factors](#notable-factors)
- [Dependencies](#dependencies)

## Overview

This module enables creating, updating, deleting, and listing admins in a React application integrated with Firebase Authentication and Firestore. It uses an MVC-like pattern: UI (View) for form/list management, business logic (Controller) for orchestration, data structure (Model) for admin info, and Firebase operations (Service). Key features include form validation, image upload (base64), search/filtering, and real-time state updates. Defaults are provided for testing, but production requires input sanitization.

## Architecture

- **View**: Manages UI interactions, form state, and admin list rendering with search.
- **Controller**: Coordinates CRUD operations, processes results, and updates state.
- **Model**: Encapsulates admin data with defaults (e.g., password fallback).
- **Service**: Handles Firebase Auth (sign-up) and Firestore (CRUD/storage).

## Data Flow

Data follows a unidirectional, async pattern for maintainability:

1. **Input Capture**: User interacts with View (`Admin_SetUsr.jsx`) – e.g., types in fields (`handleChange` updates `adminInfo` state like `{ name: "New Admin", email: "new@admin.com" }`), selects image (`handleImageChange` reads file as base64 DataURL).

2. **List/Selection**: On load (`useEffect`), controller fetches admins via `getAllAdmins`, populating `admins` state. Search (`searchAdmins`) filters locally by name. Clicking list item (`handleListItemClick`) populates form with selected admin data, switches to "Update" mode.

3. **Submit/CRUD**: On form submit (`handleSubmit`):
   - **Add**: Calls controller's `handleEmailSignUp` → Service's `signup` (creates Auth user with email/password) → `storeUserInfo` (saves to Firestore `admins` collection with UID as doc ID, including profilePicture base64). Returns `{ success: true, id: uid }` or error.
   - **Update**: Calls `updateUser(id, adminInfo)` → Service merges fields to Firestore doc (e.g., updates `name`, `updatedAt`).
   - **Delete**: Calls `deleteUser(id)` → Service removes Firestore doc (Auth user deletion not handled – add if needed).
   Controller's `processResult` logs success/error; View appends/updates `admins` state optimistically.

4. **Result Feedback**: Success: Logs "Admin Added/Updated Successfully", refreshes list. Failure: Logs error (e.g., duplicate email from Firebase `auth/email-already-in-use`). No UI error display yet – add state for it.

5. **Reset**: "Add New Admin" button clears form, resets to add mode.

This ensures loose coupling: View handles UI/state, Controller routes calls, Service isolates Firebase, with async promises for non-blocking ops.

## Components

### Admin_SetUsr.jsx

React component for admin management UI.

- **Features**:
  - Split layout: Left form (fields via sub-components), right searchable list (`AdminList`).
  - Image upload (base64 preview), dynamic button/header ("Add"/"Update").
  - Filtering: `filteredNames` by `searchTerm` on name.
  - Background particles for visual appeal.

- **Key Methods**:
  - `handleChange`: Updates `adminInfo` reactively (e.g., `setAdminInfo(prev => ({ ...prev, [name]: value }))`).
  - `handleSubmit`: Prevents default, routes to add/update/delete via controller, updates local `admins`.
  - `handleImageChange`: FileReader to base64 for `profilePicture`.
  - `handleListItemClick`: Loads admin into form, sets ID/mode.
  - `handleAddNewAdmin`: Resets form to empty.

- **State**:
  - `adminInfo`: Initialized with defaults (e.g., `new Admin_Info({ name: "Admin Name", ... })`).
  - `admins`: Array from Firestore fetch.
  - `searchTerm`, `buttonText`, `headingText`, `adminID`: UI controls.

### Admin_Info Model

ES6 class for admin data encapsulation.

- **Constructor**: Takes object with fields (defaults: `password: "defaultPassword123"`, timestamps to `new Date()`).
- **Properties**: `name`, `email`, `password`, `role` (default "Approval Department"), `phoneNumber`, `address`, `profilePicture` (base64), `lastLogin`, `status` ("Active"), `createdAt`, `updatedAt`.

### Admin_InfoController

Orchestrates CRUD and state updates.

- **Constructor**: Binds `adminInfo`, `setAdmins`, `adminID`; initializes `service = new AdminSetUserService(adminInfo)`.
- **Methods**:
  - `handleEmailSignUp`: Awaits service sign-up, calls `processResult`.
  - `getAllAdmins`: Fetches via service, sets `admins` state.
  - `updateUser`: Awaits service update.
  - `deleteUser`: Awaits service delete, logs success.
  - `processResult`: Logs UID on success; errors on failure (no UI propagation yet).

### AdminSetUserService

Firebase CRUD layer.

- **Constructor**: Binds `adminInfo`.
- **Methods**:
  - `signup`: `createUserWithEmailAndPassword` → `storeUserInfo` (sets Firestore doc with UID key, excludes password).
  - `storeUserInfo`: `setDoc` to `admins` collection.
  - `getAllAdmins`: `getDocs` on collection, maps to `{ id, ...data }`.
  - `updateUser`: `setDoc` with merge for partial updates.
  - `deleteUser`: `deleteDoc` by ID (Firestore only; Auth separate).

## Usage

1. Import and render `<Admin_SetUsr />` in a protected route (e.g., after admin login).
2. Ensure Firebase config in `../firebase` (exports `auth`, `db`) and `Database` utility (e.g., `{ admins: "admins" }`).
3. Add: Fill form, submit – creates Auth user + Firestore doc.
4. Update/Delete: Select from list, edit/submit or delete.
5. Test: Use defaults; search filters list.

Example: Duplicate email triggers Firebase error in console.

## Notable Factors

- **Security**: Firebase Auth handles password hashing; base64 images stored in Firestore (consider Cloud Storage for large files). No duplicate checks – add validation for email/role uniqueness. Expose delete carefully (Auth user not deleted).
- **Error Handling**: Console logs only; implement UI alerts (e.g., for `auth/email-already-in-use`). TODO: Duplicate admin/email validation.
- **Performance**: Optimistic UI updates; Firestore real-time possible via listeners (not implemented). Base64 bloats docs – optimize for prod.
- **Accessibility**: Sub-components (e.g., `NameField`) likely use semantic inputs; add ARIA for list.
- **Extensibility**: Easy to add validation (e.g., email regex) or roles enum. Image preview missing – add `<img src={adminInfo.profilePicture} />`.
- **Edge Cases**: Empty form submits defaults; no password on update (preserves existing).

## Dependencies

- React: `useState`, `useEffect`.
- Firebase: `createUserWithEmailAndPassword`, `setDoc`, `getDocs`, `deleteDoc`, `collection`, `doc`.
- Custom: `Background_Particles`, sub-components (`Heading`, `NameField`, etc.), `style` (CSS module), `Database` utility.