export interface PostData {
  id: string;
  title: string;
  surname: string;
  originRegion: string;
  targetRegion: string;
  description: string;
  familyStory?: string;
  estimatedYear?: string;
  status: 'active' | 'success';
  seekerName: string;
  date: string;
  images?: string[];
  isSample?: boolean;
}

export const allPosts: PostData[] = [
  {
    id: '1',
    title: '寻找泰国爷爷',
    surname: '陈',
    originRegion: '汕头',
    targetRegion: '曼谷',
    description: '我的爷爷在1948年从汕头去了泰国，从此失去联系。爷爷名叫陈木水，当年28岁。听说他后来在曼谷唐人街一带定居。',
    familyStory: '小时候常常听奶奶讲起爷爷的故事，一张泛黄的老照片是我们唯一的念想。希望能找到更多关于爷爷的信息。',
    estimatedYear: '1948年',
    status: 'active',
    seekerName: '陈先生',
    date: '2024-01-15',
    images: [
      'https://picsum.photos/400/300?random=1',
      'https://picsum.photos/400/300?random=2',
    ],
    isSample: true,
  },
  {
    id: '2',
    title: '林氏寻亲',
    surname: '林',
    originRegion: '潮州',
    targetRegion: '新加坡',
    description: '寻找1960年代移居新加坡的亲人。我的曾祖父林文华在1962年从潮州前往新加坡谋生，之后与家人失去联系。',
    familyStory: '家中只有一张模糊的老照片，希望能够找到曾祖父的下落或者他的后代。',
    estimatedYear: '1962年',
    status: 'success',
    seekerName: '林小姐',
    date: '2023-11-20',
    images: [
      'https://picsum.photos/400/300?random=3',
    ],
    isSample: true,
  },
];

export const getPostById = (id: string): PostData | undefined => {
  return allPosts.find(post => post.id === id);
};
