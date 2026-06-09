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
    title: '寻找移居泰国的爷爷',
    surname: '陈',
    originRegion: '广东汕头',
    targetRegion: '泰国曼谷',
    description: '我的爷爷陈木水在1948年从汕头出发前往泰国谋生，此后与家人失去联系。当年他28岁，据说后来在曼谷唐人街一带定居经商。现寻找其在泰国的后裔或知情人士。',
    familyStory: '奶奶生前常讲起爷爷的故事，家中只留有一张泛黄的老照片。这是我们与爷爷之间唯一的联结，希望有生之年能找到答案。',
    estimatedYear: '1948年',
    status: 'active',
    seekerName: '陈先生（汕头）',
    date: '2024-01-15',
    images: [
      'https://picsum.photos/seed/qiaopi-letter-1/400/300',
      'https://picsum.photos/seed/oldphoto-chen/400/300',
      'https://picsum.photos/seed/chaoshan-port/400/300',
    ],
    isSample: true,
  },
  {
    id: '2',
    title: '寻找潮州祖籍地亲人',
    surname: '林',
    originRegion: '泰国曼谷',
    targetRegion: '广东潮州',
    description: '我是泰国华侨第三代，曾祖父林文华于1930年代从广东潮州赴泰，后定居曼谷经营杂货。现希望寻访潮州祖籍地，与国内宗亲取得联系，认祖归宗。',
    familyStory: '曾祖父离乡时留下了祖籍地"潮州府饶平县"的记载。我们一家人在泰国繁衍至今，始终保留着说潮汕话的习惯，心中一直牵挂着远方的故土。',
    estimatedYear: '1930年代',
    status: 'success',
    seekerName: '林女士（曼谷）',
    date: '2023-11-20',
    images: [
      'https://picsum.photos/seed/qiaopi-lin-doc/400/300',
      'https://picsum.photos/seed/bangkok-chinatown/400/300',
      'https://picsum.photos/seed/chaozhou-ancestral/400/300',
    ],
    isSample: true,
  },
];

export const getPostById = (id: string): PostData | undefined => {
  return allPosts.find(post => post.id === id);
};
