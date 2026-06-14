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
  /** i18n key 前缀；详情页将从 i18n 读取标题/描述/正文/字段，按当前语言渲染。 */
  i18nKey?: string;
}

export const allPosts: PostData[] = [
  {
    id: 'bangkok',
    title: '',
    surname: '',
    originRegion: '',
    targetRegion: '',
    description: '',
    estimatedYear: '',
    status: 'success',
    seekerName: '',
    date: '2024-10-01',
    isSample: false,
    i18nKey: 'stories.bangkok',
  },
];

export const getPostById = (id: string): PostData | undefined => {
  return allPosts.find(post => post.id === id);
};
