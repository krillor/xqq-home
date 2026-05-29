import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type UserRole = 'seeker' | 'volunteer' | null

export type User = {
  id: string
  name: string
  email: string
  role: UserRole
  avatar?: string
  languages?: string[]
  regions?: string[]
  isVerified: boolean
  bio?: string
  yearsOfExperience?: number
  successStories?: number
  contact?: {
    phone?: string
  }
}

export type PhotoUpload = {
  id: string
  file?: File
  preview: string
  recognizedText?: string
  recognizedLocation?: string
  recognizedYear?: string
}

export type Comment = {
  id: string
  postId: string
  userId: string
  userName: string
  userAvatar?: string
  content: string
  images?: string[]
  createdAt: Date
  likes: number
  isLiked: boolean
}

export type SeekingPost = {
  id: string
  title: string
  description: string
  surname: string
  originRegion: string
  targetRegion: string
  seekerType: 'china-overseas' | 'overseas-china'
  status: 'active' | 'matched' | 'success'
  photos: PhotoUpload[]
  createdAt: Date
  createdBy: string
  pushedToVolunteers: string[]
  comments: Comment[]
}

export type Notification = {
  id: string
  type: 'push' | 'message' | 'system'
  title: string
  content: string
  postId?: string
  isRead: boolean
  createdAt: Date
}

// 侨联/商会联系方式
export type OverseasChineseAssociation = {
  id: string
  name: string
  country: string
  city: string
  address: string
  phone: string
  email: string
  website?: string
  description: string
}

type AppState = {
  // Auth state
  isLoggedIn: boolean
  currentUser: User | null
  login: (email: string, code: string) => Promise<boolean>
  sendVerificationCode: (email: string) => Promise<boolean>
  register: (email: string, name: string, code: string) => Promise<boolean>
  logout: () => void
  setCurrentUser: (user: User | null) => void
  
  // User state
  userRole: UserRole
  setUserRole: (role: UserRole) => void
  
  // Post state
  posts: SeekingPost[]
  addPost: (post: Omit<SeekingPost, 'id' | 'createdAt' | 'pushedToVolunteers' | 'comments'>) => SeekingPost
  getPostsByRegion: (region: string) => SeekingPost[]
  getPostById: (id: string) => SeekingPost | undefined
  
  // Comment state
  comments: Comment[]
  addComment: (comment: Omit<Comment, 'id' | 'createdAt' | 'likes' | 'isLiked'>) => Comment
  likeComment: (commentId: string) => void
  getCommentsByPostId: (postId: string) => Comment[]
  
  // Photo upload state
  uploadedPhotos: PhotoUpload[]
  addUploadedPhoto: (photo: PhotoUpload) => void
  removeUploadedPhoto: (id: string) => void
  clearUploadedPhotos: () => void
  
  // Notification state
  notifications: Notification[]
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt' | 'isRead'>) => void
  markNotificationAsRead: (id: string) => void
  markAllAsRead: () => void
  unreadCount: number
  
  // Overseas Chinese Associations
  associations: OverseasChineseAssociation[]
}

const mockVolunteers: User[] = [
  {
    id: 'v1',
    name: '林晓华',
    email: 'lin@example.com',
    role: 'volunteer',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lin',
    languages: ['zh-CN', 'th-TH'],
    regions: ['曼谷', '清迈', '汕头'],
    isVerified: true,
    bio: '在泰国生活30年，熟悉曼谷唐人街历史，曾帮助5个家庭成功团聚',
    yearsOfExperience: 8,
    successStories: 5,
  },
  {
    id: 'v2',
    name: '陈美兰',
    email: 'chen@example.com',
    role: 'volunteer',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Chen',
    languages: ['zh-CN', 'en-US', 'fr-FR'],
    regions: ['巴黎', '伦敦', '北京'],
    isVerified: true,
    bio: '中法双语志愿者，巴黎华人社团成员，热心公益事业',
    yearsOfExperience: 5,
    successStories: 3,
  },
  {
    id: 'v3',
    name: '黄振强',
    email: 'huang@example.com',
    role: 'volunteer',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Huang',
    languages: ['zh-CN', 'th-TH', 'en-US', 'id-ID', 'ms-MY'],
    regions: ['新加坡', '吉隆坡', '雅加达', '广州'],
    isVerified: true,
    bio: '新加坡华人社团骨干，熟悉东南亚华人历史',
    yearsOfExperience: 10,
    successStories: 8,
  },
  {
    id: 'v4',
    name: '张明华',
    email: 'zhang@example.com',
    role: 'volunteer',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Zhang',
    languages: ['zh-CN', 'en-US', 'vi-VN'],
    regions: ['胡志明市', '河内', '南宁'],
    isVerified: true,
    bio: '越南华人后代，熟悉越南华人社区情况',
    yearsOfExperience: 6,
    successStories: 4,
  },
  {
    id: 'v5',
    name: '王建国',
    email: 'wang@example.com',
    role: 'volunteer',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Wang',
    languages: ['zh-CN', 'en-US'],
    regions: ['旧金山', '纽约', '上海'],
    isVerified: true,
    bio: '美国华人，在旧金山生活20年，帮助过很多华侨寻根',
    yearsOfExperience: 12,
    successStories: 10,
  },
]

// 东南亚侨联/商会联系方式
const overseasChineseAssociations: OverseasChineseAssociation[] = [
  // 泰国
  {
    id: 'th-1',
    name: '泰国中华总商会',
    country: '泰国',
    city: '曼谷',
    address: '123 Yaowarat Road, Bangkok 10100',
    phone: '+66 2 234 5678',
    email: 'contact@thaichinesechamber.org',
    website: 'https://www.thaichinesechamber.org',
    description: '泰国历史最悠久的华人商会，致力于促进中泰贸易和文化交流',
  },
  {
    id: 'th-2',
    name: '泰国潮安同乡会',
    country: '泰国',
    city: '曼谷',
    address: '456 Charoen Krung Road, Bangkok',
    phone: '+66 2 987 6543',
    email: 'info@chaoan-th.org',
    description: '泰国潮安籍华人的同乡会，帮助潮安籍华人寻根问祖',
  },
  // 新加坡
  {
    id: 'sg-1',
    name: '新加坡中华总商会',
    country: '新加坡',
    city: '新加坡',
    address: '79 New Bridge Road, Singapore 059420',
    phone: '+65 6337 8381',
    email: 'enquiry@singcham.org.sg',
    website: 'https://www.singcham.org.sg',
    description: '新加坡最大的华商组织，成立于1906年',
  },
  {
    id: 'sg-2',
    name: '新加坡南洋胡氏总会',
    country: '新加坡',
    city: '新加坡',
    address: '123 Geylang Road, Singapore',
    phone: '+65 6743 2189',
    email: 'info@nanyanghoo.org.sg',
    description: '新加坡胡氏宗亲的宗亲会',
  },
  // 马来西亚
  {
    id: 'my-1',
    name: '马来西亚中华大会堂总会',
    country: '马来西亚',
    city: '吉隆坡',
    address: 'Jalan Maharajalela, 50150 Kuala Lumpur',
    phone: '+60 3 2273 8222',
    email: 'info@dongzong.my',
    website: 'https://www.dongzong.my',
    description: '马来西亚华社最高领导机构',
  },
  {
    id: 'my-2',
    name: '马来西亚潮州公会联合会',
    country: '马来西亚',
    city: '吉隆坡',
    address: '3rd Floor, Wisma Teo Chew, Jalan Sultan, 50000 Kuala Lumpur',
    phone: '+60 3 2078 2222',
    email: 'info@teochew.org.my',
    description: '马来西亚潮州籍华人的联合公会',
  },
  // 印度尼西亚
  {
    id: 'id-1',
    name: '印度尼西亚中华总商会',
    country: '印度尼西亚',
    city: '雅加达',
    address: 'Jalan Hayam Wuruk No.127, Jakarta Pusat',
    phone: '+62 21 626 7890',
    email: 'contact@indocham.org',
    description: '印度尼西亚华人商会，服务在印华人社区',
  },
  // 越南
  {
    id: 'vn-1',
    name: '胡志明市华人联合会',
    country: '越南',
    city: '胡志明市',
    address: 'District 5, Ho Chi Minh City',
    phone: '+84 28 3856 1234',
    email: 'info@hcmchinese.org',
    description: '胡志明市华人的联合组织',
  },
  // 菲律宾
  {
    id: 'ph-1',
    name: '菲律宾中华总商会',
    country: '菲律宾',
    city: '马尼拉',
    address: '228 Ongpin Street, Binondo, Manila',
    phone: '+63 2 824 5678',
    email: 'info@filchinesechamber.org',
    description: '菲律宾历史悠久的华商组织',
  },
]

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Auth state
      isLoggedIn: false,
      currentUser: null,
      login: async (email: string, code: string) => {
        // 模拟验证码登录
        await new Promise(resolve => setTimeout(resolve, 1000))
        if (code === '123456') { // 演示用的验证码
          const newUser: User = {
            id: Date.now().toString(),
            name: email.split('@')[0],
            email: email,
            role: null,
            isVerified: true,
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
          }
          set({ isLoggedIn: true, currentUser: newUser })
          return true
        }
        return false
      },
      sendVerificationCode: async (email: string) => {
        // 模拟发送验证码
        await new Promise(resolve => setTimeout(resolve, 1000))
        console.log('验证码已发送到', email, '验证码是: 123456') // 演示用
        return true
      },
      register: async (email: string, name: string, code: string) => {
        // 模拟注册
        await new Promise(resolve => setTimeout(resolve, 1000))
        if (code === '123456') { // 演示用的验证码
          const newUser: User = {
            id: Date.now().toString(),
            name: name,
            email: email,
            role: null,
            isVerified: true,
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
          }
          set({ isLoggedIn: true, currentUser: newUser })
          return true
        }
        return false
      },
      logout: () => {
        set({ isLoggedIn: false, currentUser: null, userRole: null })
      },
      setCurrentUser: (user) => set({ currentUser: user }),
      
      // User state
      userRole: null,
      setUserRole: (role) => set({ userRole: role }),
      
      // Post state - 所有真实数据都是0
      posts: [],
      addPost: (postData) => {
        const newPost: SeekingPost = {
          ...postData,
          id: Date.now().toString(),
          createdAt: new Date(),
          pushedToVolunteers: [],
          comments: [],
        }
        
        set((state) => ({
          posts: [newPost, ...state.posts],
        }))
        
        const state = get()
        const matchingVolunteers = mockVolunteers.filter(v => 
          v.regions?.some(r => 
            r.includes(newPost.targetRegion) || newPost.targetRegion.includes(r)
          )
        )
        
        matchingVolunteers.forEach(volunteer => {
          state.addNotification({
            type: 'push',
            title: `新的寻亲信息 - ${newPost.surname}`,
            content: `来自${newPost.originRegion}的${newPost.surname}家族正在寻找${newPost.targetRegion}的亲人，请查看详情`,
            postId: newPost.id,
          })
        })
        
        return newPost
      },
      getPostsByRegion: (region) => {
        const state = get()
        return state.posts.filter(post => 
          post.targetRegion.includes(region) || region.includes(post.targetRegion)
        )
      },
      getPostById: (id) => {
        const state = get()
        return state.posts.find(post => post.id === id)
      },
      
      // Comment state - 所有真实数据都是0
      comments: [],
      addComment: (commentData) => {
        const newComment: Comment = {
          ...commentData,
          id: Date.now().toString(),
          createdAt: new Date(),
          likes: 0,
          isLiked: false,
        }
        set((state) => ({
          comments: [newComment, ...state.comments],
        }))
        return newComment
      },
      likeComment: (commentId) => {
        set((state) => ({
          comments: state.comments.map(c => 
            c.id === commentId 
              ? { ...c, likes: c.isLiked ? c.likes - 1 : c.likes + 1, isLiked: !c.isLiked }
              : c
          ),
        }))
      },
      getCommentsByPostId: (postId) => {
        const state = get()
        return state.comments.filter(c => c.postId === postId).sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
      },
      
      // Photo upload state
      uploadedPhotos: [],
      addUploadedPhoto: (photo) => set((state) => ({
        uploadedPhotos: [...state.uploadedPhotos, photo],
      })),
      removeUploadedPhoto: (id) => set((state) => ({
        uploadedPhotos: state.uploadedPhotos.filter(p => p.id !== id),
      })),
      clearUploadedPhotos: () => set({ uploadedPhotos: [] }),
      
      // Notification state
      notifications: [],
      addNotification: (notificationData) => {
        const newNotification: Notification = {
          ...notificationData,
          id: Date.now().toString(),
          createdAt: new Date(),
          isRead: false,
        }
        set((state) => ({
          notifications: [newNotification, ...state.notifications],
        }))
      },
      markNotificationAsRead: (id) => set((state) => ({
        notifications: state.notifications.map(n => 
          n.id === id ? { ...n, isRead: true } : n
        ),
      })),
      markAllAsRead: () => set((state) => ({
        notifications: state.notifications.map(n => ({ ...n, isRead: true })),
      })),
      get unreadCount() {
        const state = get()
        return state.notifications.filter(n => !n.isRead).length
      },
      
      // Overseas Chinese Associations
      associations: overseasChineseAssociations,
    }),
    {
      name: 'muzhiye-storage',
    }
  )
)

export { mockVolunteers }
