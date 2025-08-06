import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { mockAPI } from '../mockData'
import { ArrowUp, MessageCircle, Edit, Trash2, Clock, Send } from 'lucide-react'

const PostDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [comment, setComment] = useState('')
  const [submittingComment, setSubmittingComment] = useState(false)

  useEffect(() => {
    loadPost()
  }, [id])

  const loadPost = async () => {
    setLoading(true)
    try {
      const result = await mockAPI.getPost(id)
      if (result.error) {
        console.error('Error loading post:', result.error)
      } else {
        setPost(result.data)
      }
    } catch (error) {
      console.error('Error loading post:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleUpvote = async () => {
    try {
      const result = await mockAPI.upvotePost(id)
      if (result.error) {
        console.error('Error upvoting post:', result.error)
      } else {
        setPost(result.data)
      }
    } catch (error) {
      console.error('Error upvoting post:', error)
    }
  }

  const handleAddComment = async (e) => {
    e.preventDefault()
    if (!comment.trim()) return

    setSubmittingComment(true)
    try {
      const result = await mockAPI.addComment(id, comment)
      if (result.error) {
        console.error('Error adding comment:', result.error)
      } else {
        setComment('')
        await loadPost() // Reload post to get updated comments
      }
    } catch (error) {
      console.error('Error adding comment:', error)
    } finally {
      setSubmittingComment(false)
    }
  }

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        const result = await mockAPI.deletePost(id)
        if (result.error) {
          console.error('Error deleting post:', result.error)
        } else {
          navigate('/')
        }
      } catch (error) {
        console.error('Error deleting post:', error)
      }
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleString()
  }

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading post...</p>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="error-container">
        <h2>Post not found</h2>
        <p>The post you're looking for doesn't exist.</p>
        <Link to="/" className="back-link">← Back to Home</Link>
      </div>
    )
  }

  return (
    <div className="post-detail-page">
      <div className="post-detail">
        <div className="post-header">
          <div className="post-meta">
            <Clock className="meta-icon" />
            <span className="post-date">{formatDate(post.created_at)}</span>
          </div>
          <div className="post-actions">
            <Link to={`/edit/${post.id}`} className="action-button edit-button">
              <Edit className="action-icon" />
              Edit
            </Link>
            <button onClick={handleDelete} className="action-button delete-button">
              <Trash2 className="action-icon" />
              Delete
            </button>
          </div>
        </div>

        <h1 className="post-title">{post.title}</h1>

        {post.content && (
          <div className="post-content">
            <p>{post.content}</p>
          </div>
        )}

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
          <button onClick={handleUpvote} className="upvote-button">
            <ArrowUp className="upvote-icon" />
            <span className="upvote-count">{post.upvotes}</span>
            <span className="upvote-label">Upvote</span>
          </button>
        </div>
      </div>

      <div className="comments-section">
        <h2 className="comments-title">
          <MessageCircle className="comments-icon" />
          Comments ({post.comments?.length || 0})
        </h2>

        <form onSubmit={handleAddComment} className="comment-form">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Leave a comment..."
            className="comment-input"
            rows="3"
          />
          <button 
            type="submit" 
            className="comment-submit"
            disabled={submittingComment || !comment.trim()}
          >
            <Send className="submit-icon" />
            {submittingComment ? 'Posting...' : 'Post Comment'}
          </button>
        </form>

        <div className="comments-list">
          {post.comments && post.comments.length > 0 ? (
            post.comments.map(comment => (
              <div key={comment.id} className="comment">
                <div className="comment-meta">
                  <Clock className="comment-meta-icon" />
                  <span className="comment-date">{formatDate(comment.created_at)}</span>
                </div>
                <p className="comment-content">{comment.content}</p>
              </div>
            ))
          ) : (
            <p className="no-comments">No comments yet. Be the first to comment!</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default PostDetail