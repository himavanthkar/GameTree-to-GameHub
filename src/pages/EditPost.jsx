import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import PostForm from '../components/PostForm'
import { mockAPI } from '../mockData'
import { Edit } from 'lucide-react'

const EditPost = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)

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

  const handleSubmit = async (formData) => {
    try {
      const result = await mockAPI.updatePost(id, formData)
      
      if (result.error) {
        throw new Error(result.error)
      }

      // Redirect to the updated post
      navigate(`/post/${id}`)
    } catch (error) {
      console.error('Error updating post:', error)
      throw error
    }
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
        <p>The post you're trying to edit doesn't exist.</p>
        <button onClick={() => navigate('/')} className="back-button">
          ← Back to Home
        </button>
      </div>
    )
  }

  return (
    <div className="edit-post-page">
      <div className="page-header">
        <h1 className="page-title">
          <Edit className="title-icon" />
          Edit Post
        </h1>
        <p className="page-subtitle">
          Update your post content and settings
        </p>
      </div>

      <div className="form-container">
        <PostForm 
          onSubmit={handleSubmit} 
          initialData={post}
          isEditing={true}
        />
      </div>
    </div>
  )
}

export default EditPost