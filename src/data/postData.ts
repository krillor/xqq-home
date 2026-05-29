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
  },
  {
    id: '3',
    title: '寻找马来西亚亲人',
    surname: '黄',
    originRegion: '广州',
    targetRegion: '吉隆坡',
    description: '我爷爷黄德明在1952年去了马来西亚。爷爷是木匠，据说后来在吉隆坡开了一家家具店。',
    familyStory: '爷爷离开时父亲还很小，这些年来家人一直想找到爷爷的下落。',
    estimatedYear: '1952年',
    status: 'active',
    seekerName: '黄先生',
    date: '2024-02-10',
    images: [],
  },
  {
    id: '4',
    title: '寻找潮汕奶奶',
    surname: '李',
    originRegion: '曼谷',
    targetRegion: '揭阳',
    description: '我奶奶是从潮汕到泰国的，想找回老家的亲人。奶奶名叫李秀英，祖籍广东揭阳。',
    familyStory: '奶奶已经80多岁了，她一直想找到老家的亲戚们，完成她的心愿。',
    estimatedYear: '1960年代',
    status: 'active',
    seekerName: '陈先生',
    date: '2024-01-25',
    images: [
      'https://picsum.photos/400/300?random=4',
    ],
  },
  {
    id: '5',
    title: '越南寻亲',
    surname: '王',
    originRegion: '湛江',
    targetRegion: '胡志明市',
    description: '寻找在越南的亲人。我的外公王志强在1955年从湛江去了越南西贡，至今没有消息。',
    familyStory: '外婆一直盼望着能找到外公的下落，这是她一生的心愿。',
    estimatedYear: '1955年',
    status: 'active',
    seekerName: '王女士',
    date: '2024-03-05',
    images: [],
  },
  {
    id: '6',
    title: '印尼寻根',
    surname: '张',
    originRegion: '雅加达',
    targetRegion: '泉州',
    description: '从印尼回到泉州寻找家族根源。我的曾祖父张明辉在1920年代从福建泉州下南洋，后来定居雅加达。',
    familyStory: '我们想找到祖父在泉州的祖籍地，祭拜祖先。',
    estimatedYear: '1920年代',
    status: 'active',
    seekerName: '张先生',
    date: '2024-03-12',
    images: [
      'https://picsum.photos/400/300?random=5',
      'https://picsum.photos/400/300?random=6',
    ],
  },
];

export const getPostById = (id: string): PostData | undefined => {
  return allPosts.find(post => post.id === id);
};
