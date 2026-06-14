// One-off: reframe 寻亲列表 -> 寻根故事/范例 (static stories, honest toolkit)
import { readFileSync, writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..', 'src', 'locales')

const overrides = {
  'zh-CN': {
    navigation: { search: '寻根故事' },
    search: {
      pageTitle: '寻根故事',
      subtitle: '真实的寻根故事与范例 —— 看看别人如何从零碎线索一步步找到根',
      searchPlaceholder: '搜索姓氏、地区或故事…',
      allPosts: '寻根故事',
      viewDetail: '阅读故事',
      noResults: '没有找到相关故事',
      noResultsHint: '换个关键词试试',
    },
    postCard: {
      sample: '示例故事，仅供参考',
      sampleFull: '示例故事，仅供展示与参考，非真实个人信息',
    },
    detailPage: {
      backToList: '返回寻根故事',
      viewMore: '查看更多寻根故事',
      alsoPublish: '建立我的寻根档案',
    },
  },
  'zh-TW': {
    navigation: { search: '尋根故事' },
    search: {
      pageTitle: '尋根故事',
      subtitle: '真實的尋根故事與範例 —— 看看別人如何從零碎線索一步步找到根',
      searchPlaceholder: '搜尋姓氏、地區或故事…',
      allPosts: '尋根故事',
      viewDetail: '閱讀故事',
      noResults: '沒有找到相關故事',
      noResultsHint: '換個關鍵詞試試',
    },
    postCard: {
      sample: '示例故事，僅供參考',
      sampleFull: '示例故事，僅供展示與參考，非真實個人資訊',
    },
    detailPage: {
      backToList: '返回尋根故事',
      viewMore: '查看更多尋根故事',
      alsoPublish: '建立我的尋根檔案',
    },
  },
  'en-US': {
    navigation: { search: 'Roots Stories' },
    search: {
      pageTitle: 'Roots Stories',
      subtitle: 'Real roots-tracing stories and examples — see how others found their roots from scattered clues',
      searchPlaceholder: 'Search by surname, region or story…',
      allPosts: 'Roots Stories',
      viewDetail: 'Read story',
      noResults: 'No matching stories found',
      noResultsHint: 'Try a different keyword',
    },
    postCard: {
      sample: 'Sample story, for reference',
      sampleFull: 'Sample story, for display and reference only — not real personal information',
    },
    detailPage: {
      backToList: 'Back to stories',
      viewMore: 'View more stories',
      alsoPublish: 'Build my roots archive',
    },
  },
}

function deepMerge(target, src) {
  for (const [k, v] of Object.entries(src)) {
    if (v && typeof v === 'object' && !Array.isArray(v)) {
      if (!target[k] || typeof target[k] !== 'object') target[k] = {}
      deepMerge(target[k], v)
    } else target[k] = v
  }
}

for (const [locale, keys] of Object.entries(overrides)) {
  const file = join(root, locale, 'common.json')
  const json = JSON.parse(readFileSync(file, 'utf8').replace(/^﻿/, ''))
  deepMerge(json, keys)
  writeFileSync(file, JSON.stringify(json, null, 2) + '\n', 'utf8')
  console.log(`updated ${locale}`)
}
