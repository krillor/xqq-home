// One-off: reposition copy toward decode/archive-first (Direction A)
import { readFileSync, writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..', 'src', 'locales')

const overrides = {
  'zh-CN': {
    navigation: { decode: '线索解码' },
    home: {
      heroDecodeCta: '解码我的线索',
      heroArchiveCta: '建立家族档案',
      step1Title: '解码线索',
      step1Desc: '把方言姓氏、旧地名、侨批等碎片，解码成可检索的中文信息',
      step2Title: '建立档案',
      step2Desc: '记录祖辈信息与家族故事，系统自动推算代际、收窄祖籍范围',
      step3Title: '对接寻根',
      step3Desc: '连接宗亲会、侨联与志愿者，让每一条线索找到归处',
    },
    tools: {
      title: '寻根线索解码',
      subtitle: '把零碎的家族线索，解码成可检索的寻根信息',
    },
    personal: {
      decodeHint: '不确定线索怎么填？用线索解码工具试试',
    },
  },
  'zh-TW': {
    navigation: { decode: '線索解碼' },
    home: {
      heroDecodeCta: '解碼我的線索',
      heroArchiveCta: '建立家族檔案',
      step1Title: '解碼線索',
      step1Desc: '把方言姓氏、舊地名、僑批等碎片，解碼成可檢索的中文資訊',
      step2Title: '建立檔案',
      step2Desc: '記錄祖輩資訊與家族故事，系統自動推算代際、收窄祖籍範圍',
      step3Title: '對接尋根',
      step3Desc: '連接宗親會、僑聯與志願者，讓每一條線索找到歸處',
    },
    tools: {
      title: '尋根線索解碼',
      subtitle: '把零碎的家族線索，解碼成可檢索的尋根資訊',
    },
    personal: {
      decodeHint: '不確定線索怎麼填？用線索解碼工具試試',
    },
  },
  'en-US': {
    navigation: { decode: 'Decode Clues' },
    home: {
      heroDecodeCta: 'Decode my clues',
      heroArchiveCta: 'Build family archive',
      step1Title: 'Decode Clues',
      step1Desc: 'Turn fragments — dialect surnames, old place names, qiaopi letters — into searchable Chinese information',
      step2Title: 'Build Your Archive',
      step2Desc: 'Record ancestor details and family stories; the system estimates generations and narrows your ancestral region',
      step3Title: 'Connect & Trace',
      step3Desc: 'Reach clan associations, overseas Chinese federations, and volunteers so every clue finds its way',
    },
    tools: {
      title: 'Roots Clue Decoder',
      subtitle: 'Turn scattered family clues into searchable roots-tracing information',
    },
    personal: {
      decodeHint: 'Not sure how to fill in a clue? Try the clue decoder',
    },
  },
}

function deepMerge(target, src) {
  for (const [k, v] of Object.entries(src)) {
    if (v && typeof v === 'object' && !Array.isArray(v)) {
      if (!target[k] || typeof target[k] !== 'object') target[k] = {}
      deepMerge(target[k], v)
    } else {
      target[k] = v
    }
  }
}

for (const [locale, keys] of Object.entries(overrides)) {
  const file = join(root, locale, 'common.json')
  const json = JSON.parse(readFileSync(file, 'utf8').replace(/^﻿/, ''))
  deepMerge(json, keys)
  writeFileSync(file, JSON.stringify(json, null, 2) + '\n', 'utf8')
  console.log(`updated ${locale}`)
}
