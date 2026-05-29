import { create } from 'zustand';
import { User, SeekingPost, Message, SearchFilters } from '@/types';
import { mockUser, mockPosts, mockMessages } from '@/data/mockData';

interface AppState {
  user: User | null;
  posts: SeekingPost[];
  currentPost: SeekingPost | null;
  filters: SearchFilters;
  messages: Message[];
  
  setUser: (user: User | null) => void;
  setPosts: (posts: SeekingPost[]) => void;
  setCurrentPost: (post: SeekingPost | null) => void;
  setFilters: (filters: SearchFilters) => void;
  addPost: (post: SeekingPost) => void;
  addMessage: (message: Message) => void;
  markMessageRead: (messageId: string) => void;
  getFilteredPosts: () => SeekingPost[];
  getPostById: (id: string) => SeekingPost | undefined;
  getUnreadCount: () => number;
}

export const useStore = create<AppState>((set, get) => ({
  user: mockUser,
  posts: mockPosts,
  currentPost: null,
  filters: {},
  messages: mockMessages,
  
  setUser: (user) => set({ user }),
  setPosts: (posts) => set({ posts }),
  setCurrentPost: (post) => set({ currentPost: post }),
  setFilters: (filters) => set({ filters }),
  
  addPost: (post) => set((state) => ({ posts: [post, ...state.posts] })),
  addMessage: (message) => set((state) => ({ messages: [message, ...state.messages] })),
  markMessageRead: (messageId) => set((state) => ({
    messages: state.messages.map((m) => 
      m.id === messageId ? { ...m, isRead: true } : m
    ),
  })),
  
  getFilteredPosts: () => {
    const { posts, filters } = get();
    return posts.filter((post) => {
      if (filters.surname && post.surname !== filters.surname) return false;
      if (filters.originRegion && post.originRegion !== filters.originRegion) return false;
      if (filters.targetRegion && post.targetRegion !== filters.targetRegion) return false;
      if (filters.seekerType && post.seekerType !== filters.seekerType) return false;
      if (filters.status && post.status !== filters.status) return false;
      if (filters.yearRange) {
        const [min, max] = filters.yearRange;
        if (post.estimatedYear < min || post.estimatedYear > max) return false;
      }
      return true;
    });
  },
  
  getPostById: (id) => get().posts.find((p) => p.id === id),
  
  getUnreadCount: () => get().messages.filter((m) => !m.isRead).length,
}));