import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { BookOpen, Clock, ArrowRight, User, Tag, ThumbsUp, Search, Filter } from 'lucide-react';
import AnimatedButton from '@/components/AnimatedButton';
import { useNavigate, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import SAMPLE_ARTICLES1 from '@/data/blogArticles'; // Import from external data file

// Types for blog articles
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

const BlogPage = () => {
  const navigate = useNavigate();
  const [articles, setArticles] = useState<BlogArticle[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<BlogArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    const loadArticles = async () => {
      try {
        const data = SAMPLE_ARTICLES1;

        const sortedArticles = [...data].sort(
          (a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
        );

        setArticles(sortedArticles);
        setFilteredArticles(sortedArticles);

        setIsLoading(false);
      } catch (error) {
        console.error("Error loading articles:", error);
        setIsLoading(false);
      }
    };

    loadArticles();
  }, []);

  const allCategories = articles.reduce((cats, article) => {
    article.categories.forEach(cat => {
      if (!cats.includes(cat)) cats.push(cat);
    });
    return cats;
  }, [] as string[]);

  // Update the filtering logic to handle category changes properly
  useEffect(() => {
    // Always start with all articles
    let filtered = [...articles];

    // Apply search filter if any
    if (searchTerm) {
      filtered = filtered.filter(article => 
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        article.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply category filter if one is selected
    if (selectedCategory) {
      filtered = filtered.filter(article => 
        article.categories.includes(selectedCategory)
      );
    }

    // Update filtered articles
    setFilteredArticles(filtered);
  }, [searchTerm, selectedCategory, articles]);

  // Handle category selection change
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    } catch (e) {
      return dateString;
    }
  };

  return (
    <div className="min-h-screen flex flex-col dark:bg-black">
      <Navbar />

      <main className="flex-grow pt-24">
        <section className="container mx-auto px-4 py-2 md:py-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-bold dark:text-white mb-6">Xelis News & Blog</h1>
            <p className="text-lg text-gray-600 dark:text-white mb-8">
              Discover news, insights, tutorials, updates, and deep dives into the Xelis ecosystem.
            </p>
          </div>
        </section>

        <section className="container mx-auto px-4 py-2 bg-gray-50 dark:bg-[#000] rounded-3xl mb-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-white/10 dark:bg-[#1a1a1a] dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-xelis-blue"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {allCategories.length > 0 && (
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <select
                    className="pl-10 pr-8 py-2 border border-gray-200 dark:border-white/10 dark:bg-[#1a1a1a] dark:text-white rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-xelis-blue"
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                  >
                    <option value="">All Categories</option>
                    {allCategories.map((category) => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg className="w-4 h-4 fill-current text-gray-400" viewBox="0 0 20 20">
                      <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                    </svg>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-8 mb-12">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="inline-block w-8 h-8 border-4 border-gray-200 border-t-xelis-blue rounded-full animate-spin"></div>
              <p className="mt-4 text-gray-600 dark:text-white">Loading articles...</p>
            </div>
          ) : filteredArticles.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-4 text-gray-600 dark:text-white">No articles found. Try adjusting your search or filter.</p>
              <AnimatedButton
                variant="secondary"
                className="mt-4"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('');
                }}
              >
                Clear Filters
              </AnimatedButton>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {filteredArticles.map((article) => (
                <div 
                  key={article.id}
                  className="glass-card p-6 flex flex-col h-full transition-transform duration-300 hover:scale-[1.02]"
                >
                  <div
                    onClick={() => navigate(`/blog/${article.slug}`)}

                    className="mb-4 rounded-lg overflow-hidden relative cursor-pointer"
                    style={{ height: '12rem' }}
                  >
                    <img 
                      src={article.thumbnailUrl} 
                      alt={article.title} 
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>

                  <div className="flex flex-wrap gap-2 mb-3">
                    {article.categories.slice(0, 3).map((category, i) => (
                      <span 
                        key={i} 
                        className="bg-gray-100 dark:bg-[#1a1a1a] dark:text-white text-gray-700 dark:text-white text-xs px-2 py-1 rounded-full cursor-pointer hover:bg-gray-200 dark:hover:bg-[#2a2a2a]"
                        onClick={() => setSelectedCategory(category)}
                      >
                        {category}
                      </span>
                    ))}
                  </div>

                  <h3
                    onClick={() => navigate(`/blog/${article.slug}`)}

                    className="text-xl font-semibold mb-2 cursor-pointer hover:text-xelis-blue"
                  >
                    {article.title}
                  </h3>
                  <p className="text-gray-600 dark:text-white mb-4 flex-grow">{article.description}</p>

                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-300 mb-4">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      <span>{article.author.name}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{article.readingTime}</span>
                    </div>
                  </div>

                  <div className="text-sm text-gray-500 dark:text-gray-300 mb-4">
                    {formatDate(article.publishedDate)}
                  </div>

                  <AnimatedButton
                    variant="secondary"
                    className="w-full justify-center"
                    onClick={() => navigate(`/blog/${article.slug}`)}

                  >
                    Read Article
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </AnimatedButton>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPage;
