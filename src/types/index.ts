export type UserType = 'chaoshan_seeker' | 'thai_chinese_seeker' | 'volunteer';
export type AuthStatus = 'unverified' | 'verified';
export type SeekerType = 'chaoshan_to_thai' | 'thai_to_chaoshan';
export type PostStatus = 'pending' | 'searching' | 'found' | 'closed';
export type MessageType = 'system' | 'clue_reply' | 'contact_request';

export interface User {
  id: string;
  phone: string;
  nickname: string;
  avatar?: string;
  userType: UserType;
  authStatus: AuthStatus;
  createdAt: Date;
  // 志愿者关注的地区
  interestedRegions?: string[];
}

export interface Photo {
  id: string;
  postId: string;
  url: string;
  description?: string;
  order: number;
}

export interface VoiceNote {
  id: string;
  postId: string;
  url: string;
  duration: number; // 秒
  language?: string;
  transcript?: string;
  createdAt: Date;
}

export interface SeekingPost {
  id: string;
  userId: string;
  seekerName: string;
  seekerType: SeekerType;
  surname: string;
  originCountry?: string;
  originProvince?: string;
  originCity?: string;
  targetCountry?: string;
  targetProvince?: string;
  targetCity?: string;
  originRegion: string; // 保持向后兼容
  targetRegion: string; // 保持向后兼容
  estimatedYear: number;
  familyStory: string;
  status: PostStatus;
  photos: Photo[];
  voiceNotes?: VoiceNote[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Clue {
  id: string;
  postId: string;
  providerId: string;
  content: string;
  contactInfo?: string;
  createdAt: Date;
}

export interface Message {
  id: string;
  receiverId: string;
  title: string;
  content: string;
  type: MessageType;
  isRead: boolean;
  createdAt: Date;
}

export interface Region {
  id: string;
  nameCn: string;
  nameTh: string;
  parentId?: string;
}

export interface Surname {
  id: string;
  nameCn: string;
  nameTh: string;
  pinyin: string;
}

export interface SuccessStory {
  id: string;
  title: string;
  summary: string;
  fullStory: string;
  beforePhotos: string[];
  afterPhotos: string[];
  reunionDate: Date;
  location: string;
}

export interface SearchFilters {
  surname?: string;
  originRegion?: string;
  targetRegion?: string;
  originCountry?: string;
  originProvince?: string;
  originCity?: string;
  targetCountry?: string;
  targetProvince?: string;
  targetCity?: string;
  yearRange?: [number, number];
  status?: PostStatus;
  seekerType?: SeekerType;
}

// 地区选择相关类型
export interface LocationSelection {
  countryId?: string;
  provinceId?: string;
  cityId?: string;
}