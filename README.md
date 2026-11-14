# React TypeScript Enterprise Authentication System

An educational, client-side React and TypeScript authentication prototype. The project explores authentication UI, authorization flows, local data storage, and auditing patterns. **It has not been assessed for HIPAA compliance or production security; do not use it with real credentials or protected health information (PHI).**

## Experimental authentication and administration features

- 🔒 **Encryption experiment** - Browser-side AES-CBC implementation (not a validated security boundary)
- 👤 **Role-Based Access Control** - Strict admin vs regular user permissions
- 📊 **Enterprise-Ready Admin Dashboard** - View and manage thousands of users
- 📝 **Comprehensive Audit Logging** - Complete audit trail with pagination
- 🛡️ **Password-hashing experiment** - PBKDF2 with 10,000 iterations (not a production-ready password policy)
- 🔐 **Local storage prototype** - Stores demonstration data in the browser; client-controlled data is not authoritative
- 📈 **Optimized for Scale** - Indexed data structures for fast lookups with large datasets

## Security and compliance limitations

This repository is **not HIPAA-compliant by assertion** and has no published independent compliance validation. Browser-side authorization and local storage can be modified by users. Real authentication requires trusted server-side validation, secure secret management, threat modeling, security testing, logging protections, and appropriate legal/compliance review. **Do not store real user passwords, payment information, or PHI in this prototype.**

## Project Structure

```
src/
├── components/
│   ├── AdminDashboard.tsx  - Main admin dashboard with tabs
│   ├── AdminSetup.tsx      - Tool to grant admin privileges
│   ├── AuditLog.tsx        - View system logs with pagination
│   ├── DatabaseManager.tsx - Export/import database
│   ├── Footer.tsx          - HIPAA compliance footer
│   ├── LoginForm.tsx       - Login form component
│   ├── SignupForm.tsx      - Signup form component
│   ├── UserList.tsx        - User management component
│   └── UserProfile.tsx     - User profile with admin access
├── contexts/
│   └── AuthContext.tsx     - Authentication context provider
├── hooks/
│   └── useAuth.ts          - Core authentication logic with admin features
└── utils/
    └── database.ts         - High-performance database and encryption utilities
```

## Performance Optimizations

The project explores UI/data techniques that would require benchmarking and threat-model validation before supporting thousands of real users:

1. **Indexed Data Structures**: Email → User ID mappings for O(1) lookups
2. **Memory Caching**: User session caching to minimize storage reads
3. **Efficient Pagination**: Log and user data pagination to handle large datasets
4. **Optimized DOM Rendering**: Virtualized scrolling for large data tables
5. **Smart Data Loading**: Only load what's needed when it's needed

## Demonstration authentication design (unverified for production)

1. **Local encrypted storage experiment**: Client-controlled storage and keys do not replace server-side trust
2. **Password Security**: Passwords hashed using PBKDF2 with 10,000 iterations and unique 32-byte salt per user
3. **Role-based UI demo**: Browser-side checks cannot enforce real-world authorization
4. **Local audit records**: Not tamper-resistant or a substitute for trustworthy server logs
5. **Admin Dashboard**: Secure administrative interface with pagination for large datasets

## Administrator Access

The admin dashboard allows authorized administrators to:

1. View registered users with efficient pagination for thousands of records
2. Monitor system activity through comprehensive audit logs
3. Export and import database data with strict security validation
4. Access real-time performance metrics and system health data

## Quick Setup for Your Project

### Option 1: Copy Necessary Files

1. Copy these core files to your project:

   ```
   src/utils/database.ts
   src/contexts/AuthContext.tsx
   src/hooks/useAuth.ts
   ```

2. Copy only the components you need:

   ```
   src/components/LoginForm.tsx
   src/components/SignupForm.tsx
   src/components/UserProfile.tsx
   ```

   For admin features, also include:

   ```
   src/components/AdminDashboard.tsx
   src/components/AdminSetup.tsx
   src/components/UserList.tsx
   src/components/AuditLog.tsx
   src/components/DatabaseManager.tsx
   ```

3. Install required dependencies:

   ```
   npm install crypto-js nanoid
   npm install @types/crypto-js --save-dev
   ```

### Option 2: NPM Package (Not published)

This repository has not been verified as a published package. Clone the source for educational review rather than relying on `npm install react-enterprise-auth`.

## Integration Instructions

1. Wrap your app with the `AuthProvider`:

   ```tsx
   import { AuthProvider } from "./contexts/AuthContext";

   ReactDOM.createRoot(document.getElementById("root")!).render(
     <React.StrictMode>
       <AuthProvider>
         <App />
       </AuthProvider>
     </React.StrictMode>
   );
   ```

2. Use the authentication context in your components:

   ```tsx
   import { useAuthContext } from "./contexts/AuthContext";

   function MyComponent() {
     const { isAuthenticated, user, isAdmin, login, logout } = useAuthContext();

     // Your component logic here
   }
   ```

3. Add auth forms to your app:

   ```tsx
   import LoginForm from "./components/LoginForm";
   import SignupForm from "./components/SignupForm";
   import UserProfile from "./components/UserProfile";

   function App() {
     const [isLogin, setIsLogin] = useState(true);
     const { isAuthenticated } = useAuthContext();

     return (
       <div>
         {!isAuthenticated && (
           <>
             {isLogin ? (
               <LoginForm onSwitch={() => setIsLogin(false)} />
             ) : (
               <SignupForm onSwitch={() => setIsLogin(true)} />
             )}
           </>
         )}

         {isAuthenticated && <UserProfile />}
       </div>
     );
   }
   ```

## Security Customization Options

### Change Encryption Key

This example contains a client-side key setting, which **cannot safely protect production secrets**. Do not treat changing a bundled key as a production security control:

```typescript
// in src/utils/database.ts
const ENCRYPTION_KEY = "your-custom-encryption-key";
```

### Set Admin Email

Define which email will have admin privileges:

```typescript
// in src/utils/database.ts
const ADMIN_EMAIL = "your-admin-email@example.com";
```

### Custom Storage Keys

Change the keys used for localStorage:

```typescript
// in src/utils/database.ts
const DB_STORAGE_KEY = "your_app_name_db";
const LOGS_STORAGE_KEY = "your_app_name_logs";
```

## Legal Notice

This is an educational prototype, not a compliance-certified or production-grade authentication system. Independent security review and regulatory assessment are required before any sensitive use. The software is provided as-is.

## Author

Created by Tyler Keesee

## License

No license file is currently committed; a license grant has not been established. Add a complete license if you intend to distribute this under MIT.

## Deployment to GitHub Pages

This project is configured to automatically deploy to GitHub Pages when you push to the main branch. The deployment is handled by a GitHub Actions workflow that:

1. Builds the React app
2. Configures it for SPA routing on GitHub Pages
3. Deploys it to the gh-pages branch

If GitHub Pages is configured successfully for this repository, the expected project URL is `https://tyler-keesee.github.io/Enterprise-Authentication-System/`. Live deployment is not verified.

### Manual Deployment

You can also deploy manually:

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Deploy to GitHub Pages
npm run deploy
```

## Development Setup

```bash
# Install dependencies
npm install

# Start development server
npm start
```

## Build for Production

```bash
# Build the project
npm run build

# Serve the production build locally
npx serve -s build
```

## Technologies Used

- React 18
- TypeScript
- React Router for routing
- Styled Components
- jsPDF for PDF generation
- LocalStorage for data persistence

## Security Features

- AES-256 encryption for local data
- Secure password hashing
- MFA support
- Session timeout
- Detailed audit logging
- Demonstration-only data handling (no HIPAA compliance claim)

## Browser Support

This application is optimized for modern browsers including:

- Chrome
- Firefox
- Safari
- Edge
