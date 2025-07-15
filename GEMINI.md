## Gemini Instructions

- To proceed with tasks step-by-step, call `shrimp-task-manager mcp`.
- For deep thinking, set `Ultrathink-mode`.

## Project Architecture

### Overview
This project will be developed using a modern full-stack architecture leveraging Next.js for the frontend and API layer, integrated with Supabase for database and authentication, and deployed on Netlify. This combination provides a scalable, performant, and efficient development environment.

### Components

1.  **Frontend Framework: Next.js (with React.js)**
    *   **Purpose:** Building the user interface, handling client-side interactions, and providing server-side rendering (SSR) or static site generation (SSG) for optimal performance and SEO.
    *   **Key Features:**
        *   **React.js:** Component-based UI development.
        *   **File-system based routing:** Intuitive page and API route creation.
        *   **Image Optimization:** Built-in image component for optimized image delivery.
        *   **Fast Refresh:** Instant feedback on code changes.

2.  **Backend (API Layer): Next.js API Routes**
    *   **Purpose:** Handling server-side logic, such as processing guestbook submissions, interacting with the database, and managing user authentication flows.
    *   **Key Features:**
        *   **Integrated with Frontend:** API endpoints are part of the same Next.js project, simplifying development and deployment.
        *   **Serverless Functions:** API Routes are deployed as serverless functions on Netlify, scaling automatically with demand.

3.  **Database & Authentication: Supabase**
    *   **Purpose:** Providing a robust PostgreSQL database for storing application data (e.g., guestbook entries) and managing user authentication.
    *   **Key Features:**
        *   **PostgreSQL Database:** Reliable and powerful relational database.
        *   **Authentication:** Built-in user management, including email/password, OAuth, etc.
        *   **Realtime:** Realtime subscriptions for instant data updates.
        *   **Row Level Security (RLS):** Fine-grained access control to database rows.
        *   **Storage:** Object storage for files (e.g., user avatars, if needed later).

4.  **Deployment: Netlify**
    *   **Purpose:** Hosting the Next.js application, automatically deploying from Git, and serving Next.js API Routes as serverless functions.
    *   **Key Features:**
        *   **Continuous Deployment:** Automatic builds and deployments on every Git push.
        *   **Global CDN:** Fast content delivery worldwide.
        *   **Automatic HTTPS:** Secure connections out-of-the-box.
        *   **Serverless Functions:** Seamless deployment of Next.js API Routes as AWS Lambda functions (managed by Netlify).

### Data Flow

1.  **User Interaction:** User interacts with the Next.js frontend.
2.  **API Request:** Frontend makes API requests to Next.js API Routes (e.g., to submit a guestbook entry).
3.  **Backend Processing:** Next.js API Route processes the request, interacts with Supabase (e.g., inserts data into the PostgreSQL database).
4.  **Database Response:** Supabase responds to the API Route.
5.  **Frontend Update:** API Route sends a response back to the frontend, which then updates the UI.
6.  **Realtime Updates (Optional):** Supabase can push realtime updates to the frontend for features like live guestbook comments.

This architecture provides a clear separation of concerns while maintaining a streamlined development workflow, making it suitable for rapid development and future scalability.

### Project Architecture (Updated)

**Frontend Framework: Next.js (with React.js)**
*   **UI/UX Design System:** Tailwind CSS를 기반으로 디자인 토큰(색상, 폰트 크기, 간격, 테두리 등)을 `tailwind.config.ts`에 통합하여 토큰 기반의 컴포넌트 중심 UI 설계를 지향합니다.
*   **Theme Management:** React Context API를 활용하여 전역 테마 상태를 관리하고, 테마 전환 기능을 제공합니다.

### Folder and File Structure (Updated)

```
/offset-garage-react
├── public/
│   ├── images/             # Static assets like images (copied from old project)
│   └── favicon.ico         # Favicon
├── src/
│   ├── app/
│   │   ├── layout.tsx      # Root layout for the application
│   │   ├── page.tsx        # Main page (index.html equivalent)
│   │   ├── inkdrop/
│   │   │   └── page.tsx    # Guestbook page (inkdrop.html equivalent)
│   │   ├── api/            # Next.js API Routes
│   │   │   ├── guestbook/
│   │   │   │   └── route.ts # API endpoint for guestbook operations
│   │   │   └── auth/
│   │   │       └── route.ts # API endpoint for authentication (if needed)
│   │   └── globals.css     # Global styles (Tailwind CSS import and remaining global CSS)
│   ├── components/         # Reusable React components
│   │   ├── common/         # General purpose components (e.g., Header, Footer, Button, AboutOverlay, VersionIndicator)
│   │   ├── artwork/        # Components specific to artwork display (e.g., ThumbnailBox)
│   │   └── guestbook/      # Components specific to guestbook (e.g., GuestbookEntry, GuestbookInput)
│   ├── hooks/              # Custom React Hooks
│   │   ├── useDraggable.ts # Hook for drag functionality
│   │   └── useTheme.ts     # Hook for theme switching
│   ├── context/            # React Context API for global state management
│   │   └── ThemeContext.tsx # Context for theme switching
│   ├── lib/                # Utility functions and Supabase client initialization
│   │   ├── supabase.ts     # Supabase client setup
│   │   └── utils.ts        # General utility functions
│   └── types/              # TypeScript type definitions
│       └── index.d.ts      # Global type definitions
├── .env.local              # Environment variables (e.g., Supabase API keys)
├── next.config.js          # Next.js configuration
├── package.json            # Project dependencies and scripts
├── tsconfig.json           # TypeScript configuration
└── tailwind.config.ts      # Tailwind CSS configuration (includes design tokens)
```
