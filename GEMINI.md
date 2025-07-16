## Gemini Instructions

- To proceed with tasks step-by-step, call `shrimp-task-manager mcp`.
- For deep thinking, set `Ultrathink-mode`.

## Project Log

**2025-07-16: Resolved Blank Screen Issue**
- **Problem:** The application rendered a blank white screen on localhost without any console errors.
- **Analysis:** The issue was traced to the `useThumbnailPlacement` custom hook. This hook, responsible for calculating the initial positions of thumbnail components, was attempting to access the `window` object during server-side rendering (SSR). Since the `window` object is only available in the client-side browser environment, this caused the position calculation to fail, preventing any thumbnails from being rendered.
- **Solution:** The `useThumbnailPlacement` hook was modified to ensure its logic only executes on the client side. This was achieved by introducing an `isClient` state that is set to `true` within a `useEffect` hook (which only runs on the client). The position calculation logic is now dependent on `isClient` being `true`, effectively deferring the `window`-dependent code until the component has mounted in the browser.

**2025-07-16: Backend Implementation & Build Issues**
- **Problem:** Implemented Supabase backend for guestbook functionality, but encountered a persistent build error (`Type 'number' is not assignable to type 'Partial<CustomThemeConfig>'`) during `npm run build`, despite `npm run dev` working correctly.
- **Analysis:** The error was traced to `tailwind.config.ts`'s `extend` object, specifically the multi-line string definition for `backgroundImage.gradient-conic`. The TypeScript compiler was misinterpreting this as a `number` type during the production build process.
- **Solution:** The `gradient-conic` definition within `tailwind.config.ts` was refactored from a multi-line string to a single-line string. This resolved the TypeScript type assignment error and allowed the project to build successfully without impacting the UI/UX.

**2025-07-16: Guestbook Delete Functionality**
- **Problem:** The guestbook delete button was not working correctly. Deleting an entry resulted in a 500 error, and the entry would reappear on the page.
- **Analysis:** The `revalidatePath` function, which is necessary to invalidate the Next.js cache and update the UI, was being called in `src/app/api/guestbook/route.ts` without being imported. This caused a server-side error.
    - **Solution:** The `revalidatePath` function was imported from `next/cache` in the API route. Additionally, the path was changed from `/api/guestbook` to `/inkdrop` to correctly revalidate the page where the guestbook is displayed. This resolved the error and ensured that deleted entries are properly removed from the UI.

**2025-07-16: Draggable Artwork Functionality & Deployment Issues**
- **Problem:** Draggable artwork thumbnails were not behaving as expected:
    1.  Initial attempts to drag resulted in minimal movement or no response.
    2.  After successful drag, thumbnails reverted to their original positions upon mouse release.
    3.  Dragging from the center or text areas of the thumbnail box was not possible, only the edges.
    4.  Deployment to Netlify failed due to TypeScript errors (`mozTransform`) and `PageNotFoundError` (`_document`).
    5.  Incorrect deployment target (`gpa-calculator-2025` instead of `offset-garage`).
- **Analysis:**
    1.  Initial drag issues were due to inefficient `left`/`top` property updates causing repaint issues.
    2.  Reverting to original position was because the `useDraggable` hook did not persist the final dragged position, and `ThumbnailBox` was re-rendering with `initialLeft`/`initialTop`.
    3.  Dragging from the center/text areas was due to browser's default drag behavior on text/images and `pointer-events` CSS properties.
    4.  TypeScript error was due to outdated `mozTransform` property in `useDraggable.ts`. `PageNotFoundError` was a Next.js build issue related to `_document` in App Router.
    5.  Deployment to wrong target was a user error in specifying the Netlify project ID and a lingering memory in the agent.
- **Solution:**
    1.  Refactored `useDraggable.ts` to use `transform: translate()` for smoother animations, leveraging `requestAnimationFrame` for optimized updates.
    2.  Implemented state management within `useDraggable.ts` to store and return the final dragged position, which is then passed back to `ThumbnailBox` to persist the new location.
    3.  Added `draggable="false"` to text elements and `pointer-events-all` to `ThumbnailBox` to ensure all areas are draggable and prevent browser's default drag behavior.
    4.  Removed `mozTransform` from `useDraggable.ts` to resolve TypeScript error. Cleared Next.js build cache (`.next` directory) and reinstalled `node_modules` to resolve `PageNotFoundError`.
    5.  Unlinked the incorrect Netlify project and relinked to the correct project ID (`8493e900-0067-47cd-b6bc-c44f0d9ed941`) before successful deployment to `https://leehansol.world`.
- **Current Status:** Draggable artwork functionality is now fully operational and deployed.
- **Future Tasks (v0.2-beta):**
    -   All UI/UX components and feature testing.
    -   Code maintenance and demo page (`/admin`) construction (not for production deployment).

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
    *   **Purpose:** Providing a robust PostgreSQL database for storing application data (e.g., guestbook entries, artwork data) and managing user authentication.
    *   **Key Features:**
        *   **PostgreSQL Database:** Reliable and powerful relational database.
        *   **Authentication:** Built-in user management, including email/password, OAuth, etc.
        *   **Realtime:** Realtime subscriptions for instant data updates.
        *   **Row Level Security (RLS):** Fine-grained access control to database rows.
        *   **Storage:** Object storage for files (e.g., user avatars, artwork images).

4.  **Deployment: Netlify**
    *   **Purpose:** Hosting the Next.js application, automatically deploying from Git, and serving Next.js API Routes as serverless functions.
    *   **Key Features:**
        *   **Continuous Deployment:** Automatic builds and deployments on every Git push.
        *   **Global CDN:** Fast content delivery worldwide.
        *   **Automatic HTTPS:** Secure connections out-of-the-box.
        *   **Serverless Functions:** Seamless deployment of Next.js API Routes as AWS Lambda functions (managed by Netlify).

### Data Flow

1.  **User Interaction:** User interacts with the Next.js frontend.
2.  **API Request:** Frontend makes API requests to Next.js API Routes (e.g., to submit a guestbook entry or upload artwork).
3.  **Backend Processing:** Next.js API Route processes the request, interacts with Supabase (e.g., inserts data into the PostgreSQL database, uploads files to Storage).
4.  **Database Response:** Supabase responds to the API Route.
5.  **Frontend Update:** API Route sends a response back to the frontend, which then updates the UI.

### Project Architecture (Updated)

**Frontend Framework: Next.js (with React.js)**
*   **UI/UX Design System:** Tailwind CSS를 기반으로 디자인 토큰(색상, 폰트 크기, 간격, 테두리 등)을 `tailwind.config.ts`에 통합하여 토큰 기반의 컴포넌트 중심 UI 설계를 지향합니다.
*   **Theme Management:** React Context API를 활용하여 전역 테마 상태를 관리하고, 테마 전환 기능을 제공합니다.

### Folder and File Structure (Updated)

```
/offset-garage-react
├── public/
│   ├── artworks/           # Artwork specific assets
│   ├── images/             # Static assets like images
│   └── favicon.ico         # Favicon
├── src/
│   ├── app/
│   │   ├── globals.css     # Global styles
│   │   ├── layout.tsx      # Root layout for the application
│   │   ├── page.tsx        # Main page (index.html equivalent)
│   │   ├── inkdrop/        # Guestbook page (inkdrop.html equivalent)
│   │   │   └── page.tsx
│   │   ├── admin/            # Admin/Demo page for managing content
│   │   │   └── page.tsx
│   │   ├── api/            # Next.js API Routes
│   │   │   ├── guestbook/
│   │   │   │   └── route.ts # API endpoint for guestbook operations
│   │   │   └── artwork/
│   │   │       └── route.ts # API endpoint for artwork operations
│   ├── components/         # Reusable React components
│   │   ├── common/         # General purpose components (e.g., Header, Footer, AboutOverlay)
│   │   ├── artwork/        # Components specific to artwork display (e.g., ThumbnailBox)
│   │   ├── guestbook/      # Components specific to guestbook (e.g., GuestbookEntry, GuestbookInput)
│   │   └── admin/          # Components for the admin page (e.g., ArtworkUploader)
│   ├── hooks/              # Custom React Hooks
│   │   ├── useDraggable.ts # Hook for drag functionality
│   │   └── useThumbnailPlacement.ts # Hook for initial thumbnail placement
│   ├── context/            # React Context API for global state management
│   │   └── ThemeContext.tsx # Context for theme switching
│   ├── lib/                # Utility functions
│   │   ├── artworkData.ts  # Artwork data utilities
│   │   ├── utils.ts        # General utility functions
│   │   └── supabaseClient.ts # Supabase client initialization
├── .env.local              # Environment variables (e.g., Supabase API keys)
├── next.config.js          # Next.js configuration
├── package.json            # Project dependencies and scripts
├── tsconfig.json           # TypeScript configuration
└── tailwind.config.ts      # Tailwind CSS configuration (includes design tokens)
```
