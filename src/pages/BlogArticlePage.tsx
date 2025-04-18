import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  User, 
  Tag, 
  Share2, 
  Twitter, 
  Facebook, 
  Linkedin, 
  Copy, 
  ThumbsUp
} from 'lucide-react';
import AnimatedButton from '@/components/AnimatedButton';
import ReactMarkdown from 'react-markdown';

interface BlogArticle {
  id: string;
  title: string;
  description: string;
  content: string;
  publishedDate: string;
  slug: string;
  thumbnailUrl: string;
  categories: string[];
  author: {
    name: string;
    avatar?: string;
  };
  readingTime: string;
  likes: number;
}

import SAMPLE_ARTICLES1 from '@/data/blogArticles';

const BlogArticlePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [article, setArticle] = useState<BlogArticle | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [relatedArticles, setRelatedArticles] = useState<BlogArticle[]>([]);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchArticle = async () => {
      setIsLoading(true);
      try {
        const foundArticle = SAMPLE_ARTICLES1.find(article => article.slug === slug);
        if (foundArticle) {
          setArticle(foundArticle);
          setLikes(foundArticle.likes);
          const related = SAMPLE_ARTICLES1
            .filter(a => 
              a.id !== foundArticle.id && 
              a.categories.some(cat => foundArticle.categories.includes(cat))
            )
            .slice(0, 3);
          setRelatedArticles(related);
        } else {
          console.error("Article not found");
        }
      } catch (error) {
        console.error("Error fetching article:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (slug) {
      fetchArticle();
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

  const handleLike = () => {
    if (!liked) {
      setLikes(prev => prev + 1);
      setLiked(true);
    } else {
      setLikes(prev => prev - 1);
      setLiked(false);
    }
  };

  const copyToClipboard = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col dark:bg-black">
        <Navbar />
        <main className="flex-grow pt-24 container mx-auto px-4">
          <div className="text-center py-12">
            <div className="inline-block w-8 h-8 border-4 border-gray-200 border-t-xelis-blue rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-600">Loading article...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col dark:bg-black">
        <Navbar />
        <main className="flex-grow pt-24 container mx-auto px-4">
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold mb-4">Article Not Found</h2>
            <p className="text-gray-600 mb-6">The article you're looking for doesn't exist or has been removed.</p>
            <AnimatedButton onClick={() => navigate('/blog')}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </AnimatedButton>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col dark:bg-black">
      <Navbar />
      
      <main className="flex-grow pt-24">
        <header className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto">
            <button 
              onClick={() => navigate('/blog')}
              className="flex items-center text-gray-500 hover:text-xelis-blue mb-6 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </button>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {article.categories.map((category, i) => (
                <span 
                  key={i} 
                  className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full"
                >
                  {category}
                </span>
              ))}
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-6 dark:text-white">{article.title}</h1>
            
            <p className="text-xl text-gray-600 mb-6">{article.description}</p>
            
            <div className="flex items-center mb-8">
              <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                <img 
                  src={article.author.avatar || '/uploads/cyber.jpg'} 
                  alt={article.author.name}
                  className="w-full h-full object-cover" 
                />
              </div>
              <div>
                <div className="font-medium">{article.author.name}</div>
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span className="mr-3">{formatDate(article.publishedDate)}</span>
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{article.readingTime}</span>
                </div>
              </div>
            </div>
          </div>
        </header>
        
        <div className="container mx-auto px-4 mb-8">
          <div className="max-w-4xl mx-auto rounded-xl overflow-hidden">
            <img 
              src={article.thumbnailUrl} 
              alt={article.title}
              className="w-full h-auto"
            />
          </div>
        </div>
        
        <article className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto">
            <div className="prose prose-lg dark:prose-invert mb-12">
              <ReactMarkdown>{article.content}</ReactMarkdown>
            </div>
            
            <div className="glass-card p-6 mb-12">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <button 
                    onClick={handleLike}
                    className={`flex items-center gap-2 py-2 px-4 rounded-lg transition-colors ${
                      liked ? 'bg-blue-50 text-xelis-blue' : 'hover:bg-gray-100'
                    }`}
                  >
                    <ThumbsUp className="h-5 w-5" />
                    <span>{likes}</span>
                  </button>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500 mr-2">Share:</span>
                  <a 
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(article.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                  >
                    <Twitter className="h-4 w-4" />
                  </a>
                  <a 
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                  >
                    <Facebook className="h-4 w-4" />
                  </a>
                  <a 
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                  <button 
                    onClick={copyToClipboard}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors relative"
                  >
                    <Copy className="h-4 w-4" />
                    {copied && (
                      <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded">
                        Copied!
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </article>
        
        {relatedArticles.length > 0 && (
          <section className="container mx-auto px-4 py-8 mb-12">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-semibold mb-8 dark:text-white">Related Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedArticles.map((relatedArticle) => (
                  <div 
                    key={relatedArticle.id}
                    className="glass-card p-4 flex flex-col h-full transition-transform duration-300 hover:scale-[1.02]"
                  >
                    <div 
                      className="mb-3 rounded-lg overflow-hidden cursor-pointer"
                      onClick={() => navigate(`/blog/${relatedArticle.slug}`)}
                    >
                      <img 
                        src={relatedArticle.thumbnailUrl} 
                        alt={relatedArticle.title} 
                        className="w-full h-40 object-cover"
                      />
                    </div>
                    
                    <h3 
                      className="text-lg font-medium mb-2 cursor-pointer hover:text-xelis-blue"
                      onClick={() => navigate(`/blog/${relatedArticle.slug}`)}
                    >
                      {relatedArticle.title}
                    </h3>
                    
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {relatedArticle.description}
                    </p>
                    
                    <div className="mt-auto">
                      <AnimatedButton 
                        variant="primary"
                        className="px-4 py-2"
                        onClick={() => navigate(`/blog/${relatedArticle.slug}`)}
                      >
                        <span className="text-xs">Read Article</span>
                      </AnimatedButton>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default BlogArticlePage;
