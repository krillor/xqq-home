import { readFileSync, writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..', 'src', 'locales')

const overrides = {
  'zh-CN': {
    home: {
      step3Desc: '把整理好的线索带去对接宗亲会、侨联等官方组织，让寻根落到实处',
      ctaTitle: '别让寻根再等下去',
      ctaDesc: '每一条线索，都可能是回家的路。从解码手里的碎片开始，建立属于你自己的寻根档案。',
    },
  },
  'zh-TW': {
    home: {
      step3Desc: '把整理好的線索帶去對接宗親會、僑聯等官方組織，讓尋根落到實處',
      ctaTitle: '別讓尋根再等下去',
      ctaDesc: '每一條線索，都可能是回家的路。從解碼手裡的碎片開始，建立屬於你自己的尋根檔案。',
    },
  },
  'en-US': {
    home: {
      step3Desc: 'Take your organized clues to clan associations, overseas Chinese federations and other official bodies to carry the search forward',
      ctaTitle: 'Don\'t Let the Search Wait',
      ctaDesc: 'Every clue could be the way home. Start by decoding the fragments in hand and build your own roots archive.',
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
