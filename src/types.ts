export interface BlogArticle {
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