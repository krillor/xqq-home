// One-off: copy for honest-slimming (stateless toolkit)
import { readFileSync, writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..', 'src', 'locales')

const overrides = {
  'zh-CN': {
    navigation: { profile: '寻根档案' },
    personal: {
      title: '寻根档案',
      archiveIntro: '建立你自己的寻根档案。数据只保存在你的本地浏览器，可随时导出，平台不持有任何信息。',
      archiveSavedLocal: '已保存到你的本地浏览器，可随时导出。平台不持有你的任何数据。',
      exportArchive: '导出档案（JSON）',
    },
  },
  'zh-TW': {
    navigation: { profile: '尋根檔案' },
    personal: {
      title: '尋根檔案',
      archiveIntro: '建立你自己的尋根檔案。資料只保存在你的本地瀏覽器，可隨時匯出，平台不持有任何資訊。',
      archiveSavedLocal: '已保存到你的本地瀏覽器，可隨時匯出。平台不持有你的任何資料。',
      exportArchive: '匯出檔案（JSON）',
    },
  },
  'en-US': {
    navigation: { profile: 'My Archive' },
    personal: {
      title: 'My Roots Archive',
      archiveIntro: 'Build your own roots-tracing archive. Data is stored only in your local browser and can be exported anytime — the platform holds nothing.',
      archiveSavedLocal: 'Saved to your local browser and exportable anytime. The platform holds none of your data.',
      exportArchive: 'Export archive (JSON)',
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
