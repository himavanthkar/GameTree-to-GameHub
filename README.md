# Web Development Final Project - *GameHub*

Submitted by: **Abhil**

This web app: **GameHub is a comprehensive gaming forum where users can create posts, discuss their favorite games, share experiences, and engage with the gaming community. The app focuses on popular games like Spider-Man, GTA, and Tomb Raider, providing a platform for gamers to connect and share their passion.**

Time spent: **15** hours spent in total

## Required Features

The following **required** functionality is completed:

- [x] **Web app includes a create form that allows the user to create posts**
  - Form requires users to add a post title
  - Forms should have the *option* for users to add: 
    - additional textual content
    - an image added as an external image URL
- [x] **Web app includes a home feed displaying previously created posts**
  - Web app must include home feed displaying previously created posts
  - By default, each post on the posts feed should show only the post's:
    - creation time
    - title 
    - upvotes count
  - Clicking on a post should direct the user to a new page for the selected post
- [x] **Users can view posts in different ways**
  - Users can sort posts by either:
    -  creation time
    -  upvotes count
  - Users can search for posts by title
- [x] **Users can interact with each post in different ways**
  - The app includes a separate post page for each created post when clicked, where any additional information is shown, including:
    - content
    - image
    - comments
  - Users can leave comments underneath a post on the post page
  - Each post includes an upvote button on the post page. 
    - Each click increases the post's upvotes count by one
    - Users can upvote any post any number of times

- [x] **A post that a user previously created can be edited or deleted from its post pages**
  - After a user creates a new post, they can go back and edit the post
  - A previously created post can be deleted from its post page

## Additional Features

The following **additional** features are implemented:

* [x] Modern dark gaming-themed UI with smooth animations and hover effects
* [x] Responsive design that works on desktop, tablet, and mobile devices
* [x] Real-time search functionality with instant results
* [x] Image preview in post creation form
* [x] Beautiful loading states and error handling
* [x] Accessibility features with proper ARIA labels and keyboard navigation
* [x] Professional typography using Inter font family

## Technical Implementation

### Frontend Architecture

**Technology Stack:**
- **React 18** - Modern functional components with hooks
- **Vite** - Fast build tool and development server
- **React Router DOM** - Client-side routing and navigation
- **Lucide React** - Beautiful, consistent icon library
- **CSS3** - Custom CSS with CSS Variables for theming

### Why This Tech Stack?

**React + Vite vs Other Options:**
- **React**: Chosen for its component-based architecture, extensive ecosystem, and excellent developer experience. React's virtual DOM provides efficient updates and its hooks system allows for clean, reusable logic.
- **Vite vs Create React App**: Vite offers significantly faster development server startup and hot module replacement (HMR), making the development experience much smoother.
- **React Router vs Next.js**: For this project, client-side routing was sufficient, and React Router provides more flexibility without the overhead of server-side rendering.

**CSS vs Styled Components/Tailwind:**
- **Custom CSS**: Provides complete control over styling, better performance (no runtime overhead), and easier debugging. CSS Variables enable consistent theming across the application.
- **Lucide React vs Font Awesome**: Lucide provides a more consistent design system with better tree-shaking support.

### Component Architecture

```
src/
├── components/          # Reusable UI components
│   ├── Header.jsx      # Navigation and search
│   ├── PostCard.jsx    # Post preview component
│   └── PostForm.jsx    # Form for creating/editing posts
├── pages/              # Route-level components
│   ├── Home.jsx        # Home feed with posts
│   ├── CreatePost.jsx  # Post creation page
│   ├── PostDetail.jsx  # Individual post view
│   └── EditPost.jsx    # Post editing page
├── mockData.js         # Mock API and sample data
├── supabaseClient.js   # Database configuration
├── App.jsx            # Main application component
├── App.css            # Global styles and theme
└── index.css          # Font imports and resets
```

### Data Layer

**Mock API Implementation:**
- Simulates real database operations (CRUD)
- Includes realistic data with gaming-focused content
- Provides error handling and loading states
- Ready for easy migration to Supabase or other backend services

**Database Schema (Supabase Ready):**
```sql
-- Posts table
posts {
  id: integer (primary key)
  title: text (required)
  content: text (optional)
  image_url: text (optional)
  upvotes: integer (default: 0)
  created_at: timestamp
}

-- Comments table
comments {
  id: integer (primary key)
  post_id: integer (foreign key)
  content: text (required)
  created_at: timestamp
}
```

## Demo Walkthrough

### 1. Home Feed Experience
**What happens when you visit the app:**
- The header displays the GameHub logo with a gamepad icon
- A search bar is prominently featured for finding posts
- Navigation links for Home and Create Post are clearly visible
- The main feed shows a grid of gaming-related posts
- Each post card displays: creation time, title, upvote count, and comment count
- Sorting options allow switching between "Newest" and "Most Popular"

**Interactive Elements:**
- Hover effects on post cards create a subtle lift animation
- Clicking any post title navigates to the detailed post view
- Sort buttons have active states with color changes
- Search functionality provides real-time results

### 2. Creating a New Post
**Navigation to Create:**
- Click "Create Post" in the header navigation
- The form page loads with a clean, focused interface

**Form Interaction:**
- Title field is required with validation
- Content textarea expands as you type
- Image URL field shows live preview when valid URL is entered
- Form validation prevents submission without required fields
- Success feedback redirects to the newly created post

### 3. Post Detail Page
**Content Display:**
- Full post content with proper typography
- Large, responsive image display if included
- Creation timestamp with user-friendly formatting
- Edit and Delete buttons for post management

**Upvoting System:**
- Prominent upvote button with current count
- Click animation provides immediate feedback
- Count updates instantly without page refresh

**Comments Section:**
- Dedicated section below the main post
- Comment form with textarea and submit button
- Existing comments display in chronological order
- Real-time comment count updates

### 4. Search and Sorting
**Search Experience:**
- Type in the header search bar and press Enter
- Results page shows filtered posts with search term highlighted
- "No results" state for empty searches
- Clear indication of search terms and result count

**Sorting Options:**
- Toggle between "Newest" (creation time) and "Most Popular" (upvotes)
- Active sort button highlighted with primary color
- Smooth transitions when switching sort methods

## Video Walkthrough

Here's a walkthrough of implemented user stories:

<img src='http://i.imgur.com/link/to/your/gif/file.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />

GIF created with Kap for macOS

## Testing Guide

### Manual Testing Scenarios

**Post Creation Testing:**
1. Navigate to Create Post page
2. Try submitting empty form (should show validation)
3. Enter only title and submit (should succeed)
4. Enter title, content, and valid image URL (should show preview)
5. Submit complete form (should redirect to new post)

**Search Testing:**
1. Enter "Spider-Man" in search (should find relevant posts)
2. Search for "nonexistent" (should show no results)
3. Clear search and return to home (should show all posts)

**Upvoting Testing:**
1. Click upvote button multiple times
2. Verify count increases with each click
3. Check that changes persist when navigating away and back

**Comments Testing:**
1. Add a comment to any post
2. Verify comment appears immediately
3. Check comment count updates on home feed

**Responsive Testing:**
1. Resize browser window to mobile size
2. Verify layout adapts properly
3. Test touch interactions on mobile devices

## Notes

This project demonstrates modern React development practices with a focus on user experience and maintainable code architecture. The gaming theme provides an engaging context for exploring web development concepts while building a fully functional forum application.

The mock API implementation makes it easy to demonstrate all features without requiring external dependencies, while the modular architecture ensures easy migration to a real backend service like Supabase.

## License

    Copyright [2024] [Abhil]

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.