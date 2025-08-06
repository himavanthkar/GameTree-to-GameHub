// Mock data for development and demo purposes
// This simulates the Supabase database structure

export const mockPosts = [
  {
    id: 1,
    title: "Spider-Man: Miles Morales - Best Open World Game?",
    content: "Just finished playing through Miles Morales and I'm blown away by the web-swinging mechanics and the story. The way they handled the transition from Peter to Miles was perfect. What did you all think?",
    image_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=500&h=300&fit=crop",
    upvotes: 23,
    created_at: "2024-01-15T10:30:00Z",
    comments: [
      {
        id: 1,
        post_id: 1,
        content: "Totally agree! The combat system felt so fluid.",
        created_at: "2024-01-15T11:00:00Z"
      },
      {
        id: 2,
        post_id: 1,
        content: "I loved the soundtrack too, really enhanced the experience.",
        created_at: "2024-01-15T12:30:00Z"
      }
    ]
  },
  {
    id: 2,
    title: "GTA V Online: Best Heist Strategies",
    content: "After 500+ hours in GTA Online, here are my top tips for completing heists efficiently with your crew.",
    image_url: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500&h=300&fit=crop",
    upvotes: 45,
    created_at: "2024-01-14T14:20:00Z",
    comments: [
      {
        id: 3,
        post_id: 2,
        content: "Great tips! The Casino Heist is my favorite.",
        created_at: "2024-01-14T15:00:00Z"
      }
    ]
  },
  {
    id: 3,
    title: "Tomb Raider Reboot Series: Character Development Analysis",
    content: "The transformation of Lara Croft from the 2013 reboot to Shadow of the Tomb Raider shows incredible character growth. Let's discuss the evolution of her character.",
    image_url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=300&fit=crop",
    upvotes: 18,
    created_at: "2024-01-13T16:45:00Z",
    comments: [
      {
        id: 4,
        post_id: 3,
        content: "The 2013 reboot was a masterpiece in storytelling.",
        created_at: "2024-01-13T17:00:00Z"
      },
      {
        id: 5,
        post_id: 3,
        content: "I prefer the classic Lara, but the reboot has its merits.",
        created_at: "2024-01-13T18:30:00Z"
      }
    ]
  },
  {
    id: 4,
    title: "Gaming Setup Showcase",
    content: "Finally upgraded my gaming rig! RTX 4080, 32GB RAM, and a 4K monitor. Ready for all the latest games!",
    image_url: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=500&h=300&fit=crop",
    upvotes: 12,
    created_at: "2024-01-12T20:15:00Z",
    comments: []
  },
  {
    id: 5,
    title: "Which Spider-Man Game Has the Best Web-Swinging?",
    content: "Comparing web-swinging mechanics across all Spider-Man games. From Spider-Man 2 (2004) to the latest releases.",
    image_url: "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=500&h=300&fit=crop",
    upvotes: 31,
    created_at: "2024-01-11T09:00:00Z",
    comments: [
      {
        id: 6,
        post_id: 5,
        content: "Spider-Man 2 (2004) still has the most realistic physics!",
        created_at: "2024-01-11T10:30:00Z"
      }
    ]
  }
];

// Mock API functions to simulate Supabase operations
export const mockAPI = {
  // Get all posts with optional sorting
  async getPosts(orderBy = 'created_at', ascending = false) {
    let sortedPosts = [...mockPosts];
    
    sortedPosts.sort((a, b) => {
      if (orderBy === 'created_at') {
        const dateA = new Date(a.created_at);
        const dateB = new Date(b.created_at);
        return ascending ? dateA - dateB : dateB - dateA;
      } else if (orderBy === 'upvotes') {
        return ascending ? a.upvotes - b.upvotes : b.upvotes - a.upvotes;
      }
      return 0;
    });

    return { data: sortedPosts, error: null };
  },

  // Get a single post by ID
  async getPost(id) {
    const post = mockPosts.find(p => p.id === parseInt(id));
    return { data: post || null, error: post ? null : 'Post not found' };
  },

  // Create a new post
  async createPost(postData) {
    const newPost = {
      id: Math.max(...mockPosts.map(p => p.id)) + 1,
      ...postData,
      upvotes: 0,
      created_at: new Date().toISOString(),
      comments: []
    };
    mockPosts.unshift(newPost);
    return { data: newPost, error: null };
  },

  // Update a post
  async updatePost(id, updates) {
    const postIndex = mockPosts.findIndex(p => p.id === parseInt(id));
    if (postIndex === -1) {
      return { data: null, error: 'Post not found' };
    }
    
    mockPosts[postIndex] = { ...mockPosts[postIndex], ...updates };
    return { data: mockPosts[postIndex], error: null };
  },

  // Delete a post
  async deletePost(id) {
    const postIndex = mockPosts.findIndex(p => p.id === parseInt(id));
    if (postIndex === -1) {
      return { data: null, error: 'Post not found' };
    }
    
    const deletedPost = mockPosts.splice(postIndex, 1)[0];
    return { data: deletedPost, error: null };
  },

  // Add upvote to a post
  async upvotePost(id) {
    const post = mockPosts.find(p => p.id === parseInt(id));
    if (!post) {
      return { data: null, error: 'Post not found' };
    }
    
    post.upvotes += 1;
    return { data: post, error: null };
  },

  // Add a comment to a post
  async addComment(postId, content) {
    const post = mockPosts.find(p => p.id === parseInt(postId));
    if (!post) {
      return { data: null, error: 'Post not found' };
    }

    const newComment = {
      id: Date.now(), // Simple ID generation for demo
      post_id: parseInt(postId),
      content,
      created_at: new Date().toISOString()
    };

    post.comments.push(newComment);
    return { data: newComment, error: null };
  },

  // Search posts by title
  async searchPosts(query) {
    const filteredPosts = mockPosts.filter(post =>
      post.title.toLowerCase().includes(query.toLowerCase())
    );
    return { data: filteredPosts, error: null };
  }
};