import { useState } from 'react'
import { Image, Type, FileText } from 'lucide-react'

const PostForm = ({ onSubmit, initialData = {}, isEditing = false }) => {
  const [formData, setFormData] = useState({
    title: initialData.title || '',
    content: initialData.content || '',
    image_url: initialData.image_url || ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.title.trim()) {
      alert('Please enter a title for your post')
      return
    }

    setIsSubmitting(true)
    try {
      await onSubmit(formData)
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('Failed to submit post. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="post-form">
      <div className="form-group">
        <label htmlFor="title" className="form-label">
          <Type className="label-icon" />
          Title *
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter your post title..."
          className="form-input"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="content" className="form-label">
          <FileText className="label-icon" />
          Content (Optional)
        </label>
        <textarea
          id="content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          placeholder="Share your thoughts about gaming..."
          className="form-textarea"
          rows="6"
        />
      </div>

      <div className="form-group">
        <label htmlFor="image_url" className="form-label">
          <Image className="label-icon" />
          Image URL (Optional)
        </label>
        <input
          type="url"
          id="image_url"
          name="image_url"
          value={formData.image_url}
          onChange={handleChange}
          placeholder="https://example.com/image.jpg"
          className="form-input"
        />
        {formData.image_url && (
          <div className="image-preview">
            <img 
              src={formData.image_url} 
              alt="Preview" 
              className="preview-image"
              onError={(e) => {
                e.target.style.display = 'none'
              }}
            />
          </div>
        )}
      </div>

      <button 
        type="submit" 
        className="submit-button"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Submitting...' : (isEditing ? 'Update Post' : 'Create Post')}
      </button>
    </form>
  )
}

export default PostForm