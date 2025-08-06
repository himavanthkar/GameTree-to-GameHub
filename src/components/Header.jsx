import { Link, useNavigate } from 'react-router-dom'
import { Search, Home, Plus, Gamepad2 } from 'lucide-react'
import { useState } from 'react'

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery)}`)
    }
  }

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <Gamepad2 className="logo-icon" />
          <span className="logo-text">GameHub</span>
        </Link>
        
        <form className="search-form" onSubmit={handleSearch}>
          <div className="search-container">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
        </form>

        <nav className="nav-links">
          <Link to="/" className="nav-link">
            <Home className="nav-icon" />
            <span>Home</span>
          </Link>
          <Link to="/create" className="nav-link">
            <Plus className="nav-icon" />
            <span>Create Post</span>
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Header