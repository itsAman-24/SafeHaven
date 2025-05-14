import { useParams, Link } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'
import BLOG_POSTS from '../../Util/Blog'

function BlogPostPage() {
  const { id } = useParams()
  const post = BLOG_POSTS.find(p => p.id === parseInt(id))

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Post not found</h1>
          <Link to="/blog" className="text-primary dark:text-primary-light hover:underline">
            Return to Blog
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link 
        to="/blog" 
        className="inline-flex items-center text-primary dark:text-primary-light hover:underline mb-6"
      >
        <FaArrowLeft className="mr-2" /> Back to Blog
      </Link>
      
      <article className="max-w-3xl mx-auto">
        <img 
          src={post.image} 
          alt={post.title}
          className="w-full h-64 object-cover rounded-lg mb-6"
        />
        
        <div className="prose dark:prose-invert max-w-none">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {post.title}
          </h1>
          
          <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-6">
            <span>{post.author}</span>
            <span>{new Date(post.date).toLocaleDateString()}</span>
          </div>
          
          <div className="text-gray-600 dark:text-gray-300 whitespace-pre-wrap">
            {post.content}
          </div>
        </div>
      </article>
    </div>
  )
}

export default BlogPostPage