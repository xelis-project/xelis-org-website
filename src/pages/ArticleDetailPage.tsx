import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ReactMarkdown from 'react-markdown';
import { ArrowLeft, Clock, User, Calendar, ThumbsUp, Share2 } from 'lucide-react';
import AnimatedButton from '@/components/AnimatedButton';
import { SAMPLE_ARTICLES1 } from '@/data/blogArticles'; // Import your articles from BlogPage

interface ArticleDetailPageProps {
  // Add any props if needed
}

const ArticleDetailPage: React.FC<ArticleDetailPageProps> = () => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState(SAMPLE_ARTICLES1[0]); // Default to first article or null
  
  useEffect(() => {
    // In a real app, you'd fetch this from an API
    // For now, we'll use our sample data
    const foundArticle = SAMPLE_ARTICLES1.find(a => a.slug === slug);
    if (foundArticle) {
      setArticle(foundArticle);
      // Set page title
      document.title = `${foundArticle.title} | Xelis Blog`;
    }
  }, [slug]);
  
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    } catch (e) {
      return dateString;
    }
  };
  
  if (!article) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
            <p className="mb-6">The article you're looking for doesn't exist or has been removed.</p>
            <Link to="/blog">
              <AnimatedButton>Back to Blog</AnimatedButton>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col dark:bg-black">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <article className="container mx-auto px-4">
          {/* Back Button */}
          <div className="mb-8">
            <Link to="/blog">
              <AnimatedButton variant="secondary" className="flex items-center">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Articles
              </AnimatedButton>
            </Link>
          </div>
          
          {/* Article Header */}
          <header className="max-w-3xl mx-auto mb-12">
            <div className="flex flex-wrap gap-2 mb-6">
              {article.categories.map((category, i) => (
                <Link 
                  key={i} 
                  to={`/blog?category=${category}`}
                  className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full hover:bg-gray-200"
                >
                  {category}
                </Link>
              ))}
            </div>
            
            <h1 className="text-3xl md:text-5xl font-bold mb-6 dark:text-white">{article.title}</h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">{article.description}</p>
            
            <div className="flex flex-wrap items-center justify-between text-gray-500 border-b border-gray-200 pb-6">
              <div className="flex items-center mb-4 md:mb-0">
                {article.author.avatar && (
                  <img 
                    src={article.author.avatar} 
                    alt={article.author.name} 
                    className="w-10 h-10 rounded-full mr-4"
                  />
                )}
                <div>
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    <span className="font-medium">{article.author.name}</span>
                  </div>
                  <div className="flex items-center mt-1">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{formatDate(article.publishedDate)}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="flex items-center mr-6">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>{article.readingTime}</span>
                </div>
                <div className="flex items-center">
                  <ThumbsUp className="h-4 w-4 mr-2" />
                  <span>{article.likes} likes</span>
                </div>
              </div>
            </div>
          </header>
          
          {/* Featured Image */}
          <div className="max-w-4xl mx-auto mb-12">
            <img 
              src={article.thumbnailUrl} 
              alt={article.title}
              className="w-full h-auto rounded-xl shadow-lg"
            />
          </div>
          
          {/* Article Content - Using React Markdown */}
          <div className="max-w-3xl mx-auto">
            <div className="prose prose-lg dark:prose-invert prose-headings:font-bold prose-a:text-blue-600 max-w-none mb-12">
              <ReactMarkdown>
                {article.content}
              </ReactMarkdown>
            </div>
            
            {/* Social Sharing */}
            <div className="border-t border-gray-200 pt-8 mt-12">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <button className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full mr-2">
                    <ThumbsUp className="h-5 w-5 text-gray-600" />
                  </button>
                  <span className="text-gray-600">{article.likes} likes</span>
                </div>
                
                <div className="flex items-center">
                  <span className="mr-4 text-gray-600">Share this article:</span>
                  <div className="flex space-x-3">
                    <button className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full">
                      <Share2 className="h-5 w-5 text-gray-600" />
                    </button>
                    {/* Add more social share buttons as needed */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>
      </main>
      
      <Footer />
    </div>
  );
};

export default ArticleDetailPage;