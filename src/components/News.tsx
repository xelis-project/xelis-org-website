import React, { useState, useEffect } from 'react';
import AnimatedButton from './AnimatedButton';
import { ArrowRight, Clock, Calendar } from 'lucide-react';
import SAMPLE_ARTICLES1 from '@/data/blogArticles';

// Define types for blog posts (adjusted to match SAMPLE_ARTICLES1)
interface BlogPost {
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

const News = () => {
  const [featuredPost, setFeaturedPost] = useState<BlogPost | null>(null);
  const [recentPosts, setRecentPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadArticles = async () => {
      try {
        const sorted = [...SAMPLE_ARTICLES1].sort(
          (a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
        );

        setFeaturedPost(sorted[0]);
        setRecentPosts(sorted.slice(1, 4));
      } catch (error) {
        console.error('Error loading articles:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadArticles();
  }, []);

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    } catch {
      return dateString;
    }
  };

  return (
    <section id="news" className="bg-gray-50 dark:bg-[#121212] py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 mb-4 rounded-full bg-[#02FFCF] border border-white dark:border-[#02FFCF] text-sm font-medium text-black">
            Latest News
          </span>
          <h2 className="text-3xl md:text-4xl font-bold dark:text-white mb-6">XELIS Insights & Updates</h2>
          <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
            Stay updated with the latest developments, technical insights, and community news from the XELIS ecosystem.
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-xelis-blue"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Featured Post */}
            {featuredPost && (
              <div className="lg:col-span-2 glass-card overflow-hidden">
                <div className="flex flex-col h-full">
                  <div className="relative h-64 md:h-80">
                    <img 
                      src={featuredPost.thumbnailUrl} 
                      alt={featuredPost.title} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="inline-block px-3 py-1 bg-[#02FFCF] text-black text-xs font-medium rounded-full">
                        {featuredPost.categories[0]}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{formatDate(featuredPost.publishedDate)}</span>
                      <span className="mx-2">•</span>
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{featuredPost.readingTime} read</span>
                    </div>
                    
                    {/* Featured Post Title as clickable link */}
                    <h3
                      className="text-2xl font-bold mb-3 text-gray-900 dark:text-black hover:text-xelis-blue dark:hover:text-xelis-light-blue transition-colors duration-200 cursor-pointer"
                      onClick={() => window.location.href = `/blog/${featuredPost.slug}`}
                    >
                      {featuredPost.title}
                    </h3>
                    
                    <p className="text-gray-600 dark:black mb-4 flex-grow">
                      {featuredPost.description}
                    </p>
                    
                    {/* Read Full Article Button */}
                    <AnimatedButton 
                      variant="secondary"
                      className="flex items-center mt-4 self-start hover:bg-xelis-blue hover:text-white transition-colors duration-200"
                      onClick={() => window.location.href = `/blog/${featuredPost.slug}`}
                    >
                      Read Full Article
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </AnimatedButton>
                  </div>
                </div>
              </div>
            )}

            {/* Recent Posts Column */}
            <div className="flex flex-col space-y-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-semibold dark:text-white">Recent Posts</h3>
                <AnimatedButton 
                  variant="primary"
                  className="text-white flex items-center text-sm"
                  onClick={() => window.location.href = '/blog'}
                >
                  View All
                  <ArrowRight className="ml-1 h-3 w-3" />
                </AnimatedButton>
              </div>
              
              {recentPosts.map((post) => (
                <div 
                  key={post.id}
                  className="glass-card p-4 hover:shadow-md transition-shadow duration-300 cursor-pointer"
                  onClick={() => window.location.href = `/blog/${post.slug}`}
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-16 h-16 rounded overflow-hidden">
                      <img 
                        src={post.thumbnailUrl} 
                        alt={post.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <span className="text-xs font-medium text-xelis-blue dark:text-[#02FFCF]">
                        {post.categories[0]}
                      </span>
                      <h4 className="font-medium text-gray-900 dark:black line-clamp-2">
                        {post.title}
                      </h4>
                      <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-1">
                        <span>{formatDate(post.publishedDate)}</span>
                        <span className="mx-1">•</span>
                        <span>{post.readingTime}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default News;
