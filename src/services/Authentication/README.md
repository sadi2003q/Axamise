# Authentication Service

This directory contains the complete authentication module for the application, leveraging Firebase for user management. It is designed with a clean architecture, using a Factory Design Pattern to provide a decoupled and scalable way to handle different authentication strategies.

- [Overview](#overview)
- [Folder Structure](#folder-structure)
- [Factory Design Pattern](#factory-design-pattern)
- [Usage](#usage)

## Overview

The primary goal of this module is to centralize all authentication-related operations, such as user login, signup, and admin-specific user management. By using abstract base classes and a factory, we ensure that the core business logic is separated from the client-side implementation, making it easy to manage and extend.

## Folder Structure

The directory is organized to separate different concerns, with base classes providing a common structure and concrete classes implementing specific functionalities.

```
/Authentication
│
├── _base/
│   ├── _base.login.service.ts    # Abstract base class for all login services.
│   └── _base_signup.service.ts   # Abstract base class for all signup/user creation services.
│
├── _Authentication.service.ts    # The main factory for creating authentication service instances.
├── _login.service.ts             # Concrete implementation for student login.
├── _signup.service.ts            # Concrete implementation for student signup.
├── _admin.login.service.ts       # Concrete implementation for admin login.
└── _admin.setUser.service.ts     # Concrete implementation for creating and managing admin users.
```

## Factory Design Pattern

We utilize the Factory Design Pattern to decouple the client (Controllers/ViewModels) from the concrete service implementations. The `AuthenticationService` acts as the single point of entry for creating any authentication-related service.

The `create` method in `AuthenticationService` takes a `user` object and a `serviceType` and returns the appropriate service instance. This approach centralizes the instantiation logic, making the system more modular and easier to maintain.

### Core Components of the Pattern:

1.  **Abstract Base Classes (`__base/`)**: These define a common interface (`login()`, `signup()`, etc.) that all concrete services must implement. This enforces a consistent API across different authentication types.

    ```typescript
    // src/services/Authentication/_base/_base.login.service.ts
    export abstract class _Base_Login {
        // ...
        abstract login() : Promise<Firebase_Response>
    }
    ```

2.  **Concrete Services**: Each service (`LoginService`, `Admin_LoginService`, etc.) extends a base class and provides the specific implementation for its authentication method.

    ```typescript
    // src/services/Authentication/_login.service.ts
    export default class LoginService extends _Base_Login {
        // ...
        async login() : Promise<Firebase_Response> {
            // Implementation for student login
        }
    }
    ```

3.  **The Factory (`AuthenticationService`)**: The static `create` method is the heart of the factory. It contains the logic to select and instantiate the correct service based on the `serviceType` provided by the client.

    ```typescript
    // src/services/Authentication/_Authentication.service.ts
    export class AuthenticationService {
        static create(user, serviceType) {
            switch (serviceType) {
                case SERVICE.login:
                    return new LoginService(user);
                case SERVICE.signup:
                    return new SignUpService(user);
                // ... other cases
                default:
                    throw new Error(`Unknown service: ${serviceType}`);
            }
        }
    }
    ```

## Usage

To use the authentication module, a controller or component imports the `AuthenticationService` factory, requests a specific service type, and then calls its methods. This hides the complexity of which concrete class is actually performing the work.

### Example: Controller

```javascript
// Example from a login controller
import { AuthenticationService } from '../services/Authentication/_Authentication.service';
import { SERVICE } from '../Utilities';

// 1. Create a user model
const userModel = new User(email, password);

// 2. Use the factory to get the appropriate service
const loginService = AuthenticationService.create(userModel, SERVICE.login);

// 3. Call the method on the returned service instance
const response = await loginService.login();

if (response.success) {
    // Handle successful login
}
```
