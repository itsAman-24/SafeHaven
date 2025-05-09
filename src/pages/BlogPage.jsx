import React from 'react'
import { Link } from 'react-router-dom'
import BLOG_POSTS from '../../Util/Blog'

function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">Safety Blog</h1>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
        Stay informed with the latest safety tips, emergency preparedness guides, and community stories.
      </p>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {BLOG_POSTS.map(post => (
          <article key={post.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <img 
              src={post.image} 
              alt={post.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <div className="text-sm text-primary dark:text-primary-light font-medium mb-2">
                {post.category}
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {post.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {post.excerpt}
              </p>
              <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                <span>{post.author}</span>
                <span>{new Date(post.date).toLocaleDateString()}</span>
              </div>
              <Link 
                to={`/blog/post/${post.id}`} 
                className="mt-4 inline-block text-primary dark:text-primary-light hover:underline"
              >
                Read more →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

export default BlogPage