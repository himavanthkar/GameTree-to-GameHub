import { Link } from 'react-router-dom'
import { ArrowUp, MessageCircle, Clock } from 'lucide-react'

const PostCard = ({ post }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60))
    
    if (diffInHours < 1) {
      return 'Just now'
    } else if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`
    } else {
      const diffInDays = Math.floor(diffInHours / 24)
      if (diffInDays < 7) {
        return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`
      } else {
        return date.toLocaleDateString()
      }
    }
  }

  return (
    <div className="post-card">
      <div className="post-card-header">
        <div className="post-meta">
          <Clock className="meta-icon" />
          <span className="post-date">{formatDate(post.created_at)}</span>
        </div>
      </div>

      <Link to={`/post/${post.id}`} className="post-link">
        <h2 className="post-title">{post.title}</h2>
      </Link>

      {post.image_url && (
        <div className="post-image-container">
          <img 
            src={post.image_url} 
            alt={post.title}
            className="post-image"
            onError={(e) => {
              e.target.style.display = 'none'
            }}
          />
        </div>
      )}

      <div className="post-stats">
        <div className="stat-item">
          <ArrowUp className="stat-icon upvote-icon" />
          <span className="stat-count">{post.upvotes}</span>
          <span className="stat-label">upvotes</span>
        </div>
        <div className="stat-item">
          <MessageCircle className="stat-icon comment-icon" />
          <span className="stat-count">{post.comments?.length || 0}</span>
          <span className="stat-label">comments</span>
        </div>
      </div>
    </div>
  )
}

export default PostCard