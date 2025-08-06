import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import PostCard from '../components/PostCard'
import { mockAPI } from '../mockData'
import { TrendingUp, Clock, Search } from 'lucide-react'

const Home = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [sortBy, setSortBy] = useState('created_at')
  const [searchParams] = useSearchParams()
  const searchQuery = searchParams.get('search')

  useEffect(() => {
    loadPosts()
  }, [sortBy, searchQuery])

  const loadPosts = async () => {
    setLoading(true)
    try {
      let result
      if (searchQuery) {
        result = await mockAPI.searchPosts(searchQuery)
      } else {
        result = await mockAPI.getPosts(sortBy, false)
      }
      
      if (result.error) {
        console.error('Error loading posts:', result.error)
      } else {
        setPosts(result.data)
      }
    } catch (error) {
      console.error('Error loading posts:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy)
  }

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading posts...</p>
      </div>
    )
  }

  return (
    <div className="home-page">
      <div className="home-header">
        <h1 className="page-title">
          {searchQuery ? (
            <>
              <Search className="title-icon" />
              Search Results for "{searchQuery}"
            </>
          ) : (
            <>Welcome to GameHub</>
          )}
        </h1>
        <p className="page-subtitle">
          {searchQuery 
            ? `Found ${posts.length} post${posts.length !== 1 ? 's' : ''}`
            : 'Discover and discuss your favorite games'
          }
        </p>
      </div>

      {!searchQuery && (
        <div className="sort-controls">
          <span className="sort-label">Sort by:</span>
          <button
            className={`sort-button ${sortBy === 'created_at' ? 'active' : ''}`}
            onClick={() => handleSortChange('created_at')}
          >
            <Clock className="sort-icon" />
            Newest
          </button>
          <button
            className={`sort-button ${sortBy === 'upvotes' ? 'active' : ''}`}
            onClick={() => handleSortChange('upvotes')}
          >
            <TrendingUp className="sort-icon" />
            Most Popular
          </button>
        </div>
      )}

      <div className="posts-grid">
        {posts.length === 0 ? (
          <div className="empty-state">
            <p>
              {searchQuery 
                ? 'No posts found matching your search.' 
                : 'No posts yet. Be the first to share something!'
              }
            </p>
          </div>
        ) : (
          posts.map(post => (
            <PostCard key={post.id} post={post} />
          ))
        )}
      </div>
    </div>
  )
}

export default Home