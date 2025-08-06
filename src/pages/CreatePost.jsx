import { useNavigate } from 'react-router-dom'
import PostForm from '../components/PostForm'
import { mockAPI } from '../mockData'
import { Plus } from 'lucide-react'

const CreatePost = () => {
  const navigate = useNavigate()

  const handleSubmit = async (formData) => {
    try {
      const result = await mockAPI.createPost(formData)
      
      if (result.error) {
        throw new Error(result.error)
      }

      // Redirect to the newly created post
      navigate(`/post/${result.data.id}`)
    } catch (error) {
      console.error('Error creating post:', error)
      throw error
    }
  }

  return (
    <div className="create-post-page">
      <div className="page-header">
        <h1 className="page-title">
          <Plus className="title-icon" />
          Create New Post
        </h1>
        <p className="page-subtitle">
          Share your gaming experiences, tips, or discussions with the community
        </p>
      </div>

      <div className="form-container">
        <PostForm onSubmit={handleSubmit} />
      </div>
    </div>
  )
}

export default CreatePost