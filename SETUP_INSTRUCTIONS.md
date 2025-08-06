# GameHub - Setup Instructions

## Quick Start

### Prerequisites
- Node.js 16+ installed
- npm or yarn package manager

### Installation & Running

1. **Clone or navigate to the project directory:**
   ```bash
   cd gamehub
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   - Navigate to `http://localhost:5173`
   - The app should load with sample gaming posts

## Features to Test

### 1. Home Feed
- View gaming posts about Spider-Man, GTA, and Tomb Raider
- Sort posts by "Newest" or "Most Popular"
- Search for specific posts using the search bar

### 2. Create Posts
- Click "Create Post" in the header
- Fill out the form with title, content, and optional image URL
- Submit to create a new post

### 3. Post Interactions
- Click on any post title to view details
- Upvote posts using the upvote button
- Add comments to posts
- Edit or delete posts using the action buttons

### 4. Search & Sort
- Use the search bar to find posts by title
- Toggle between "Newest" and "Most Popular" sorting
- View search results with highlighted terms

### 5. Responsive Design
- Resize your browser window to see mobile layout
- Test on different screen sizes

## Project Structure

```
gamehub/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/         # Route-level pages
│   ├── mockData.js    # Sample data and API simulation
│   ├── App.jsx        # Main application
│   └── App.css        # Styling and theme
├── public/            # Static assets
└── README.md          # Detailed documentation
```

## Supabase Integration (Optional)

To connect to a real database:

1. **Create a Supabase project**
2. **Update `src/supabaseClient.js`** with your project URL and anon key
3. **Create the database tables:**
   ```sql
   -- Posts table
   create table posts (
     id serial primary key,
     title text not null,
     content text,
     image_url text,
     upvotes integer default 0,
     created_at timestamp default now()
   );

   -- Comments table
   create table comments (
     id serial primary key,
     post_id integer references posts(id),
     content text not null,
     created_at timestamp default now()
   );
   ```
4. **Replace mock API calls** with actual Supabase queries

## Troubleshooting

### Common Issues

**Port already in use:**
- Try `npm run dev -- --port 3000` to use a different port

**Dependencies not installing:**
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again

**Images not loading:**
- Check that image URLs are valid and accessible
- The app handles broken images gracefully by hiding them

**Build issues:**
- Run `npm run build` to check for any build errors
- Fix any TypeScript or linting issues

### Performance

The app is optimized for development. For production:
- Run `npm run build` to create optimized build
- Serve the `dist` folder with a static server
- Consider implementing code splitting for larger applications

## Development Notes

- **Hot Module Replacement (HMR)** is enabled - changes update instantly
- **Mock data** is used for demonstration - no external dependencies required
- **Responsive design** tested on desktop, tablet, and mobile viewports
- **Error handling** implemented for network issues and broken images
- **Loading states** provide feedback during data operations

## Support

If you encounter any issues:
1. Check the browser console for error messages
2. Verify all dependencies are installed correctly
3. Ensure you're using Node.js 16 or higher
4. Try clearing browser cache and restarting the dev server

For questions about the code or implementation, refer to the comprehensive README.md file.