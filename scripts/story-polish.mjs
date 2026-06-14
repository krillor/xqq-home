// One-off: polish title / 6 steps / ending of the Bangkok story (all 3 locales)
import { readFileSync, writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..', 'src', 'locales')

const overrides = {
  'zh-CN': {
    stories: {
      bangkok: {
        title: '我的寻亲故事：跨越半个世纪，替外公找回泰国的家人',
        howTitle: '我是怎么找到的：可复制的六步',
        steps: [
          {
            title: '第一步 · 把长辈手里的「老物件」都留下来',
            body: '一切的起点，是外公从抽屉最里层翻出的一张半个世纪前的名片——上面有泰文手写的地址；还有一张九十年代的全家福，他能一个个指出谁是谁。老人手里的旧名片、旧信封、老照片，别嫌旧、别丢，那往往是唯一能接上的那根线头。',
          },
          {
            title: '第二步 · 把模糊线索变成「能搜索的信息」',
            body: '名片上是泰文，我不会打。我请了一位懂泰文的朋友把地址重新打成文字，再用翻译工具转成英文，得到一串能直接粘进地图的地址。一条看不懂的旧线索，先想办法把它变成机器能读、能搜的文字——今天有了 AI，这一步更快。',
          },
          {
            title: '第三步 · 用街景地图，让长辈「亲自认路」',
            body: '把地址输进谷歌街景，找到那栋房子的照片发给外公。他第一次说不太像；几个月后再看，却主动指出旁边的秋千、对面的寺庙——「面向寺庙往右拐一直走」。这种细节，只有真正住过的人才记得。比起给老人看一张静态照片，让他在街景里「走一遍老路」，唤起的记忆要可靠得多。',
          },
          {
            title: '第四步 · 别只打电话——定个日子，亲自去',
            body: '外婆那次摔伤住院，让我突然意识到，留给老人的时间不多了。再多通越洋电话，也抵不过一次亲自登门。我没敢告诉外公我要单独去（怕万一找不到让他失落），只揣着那张全家福，订了机票就出发了。',
          },
          {
            title: '第五步 · 找一个当地人，既当翻译又当向导',
            body: '落地后，我请了一位常驻当地的同事陪我——她既是司机，又是泰语翻译。铁门锁着、姑婆在午睡、邻居只会泰语，全靠她一路沟通，才把门叫开。在人生地不熟的国家上门寻亲，一个本地人能同时帮你解决安全、沟通和体面这三件事。',
          },
          {
            title: '第六步 · 找到的那一刻，立刻接通视频',
            body: '进了门、解释清楚我是谁之后，我做的第一件事就是接通国内。妈妈让舅舅赶去外公家打开视频——这是两家人三十年来第一次在屏幕里看见彼此。找到人，就别等回国再说，当场把视频接上。隔开亲人的，从来不只是距离，还有时间。',
          },
        ],
        reflectionTitle: '回头看，真正让这件事成的是什么',
        reflection: '不是运气，也不是某一个工具，而是：把长辈手里的旧线索当成宝贝；用现代工具把它变成能执行的地址；不再犹豫，亲自去一趟；找个当地人陪一程；找到的那一刻，立刻让两端在视频里重逢。这套做法，对每一个想替家里长辈了却寻亲心愿的人，都用得上。',
        endingTitle: '写给我的外公外婆',
        ending: '死亡不是终点，遗忘才是。我把这段经历整理在这里，一半是想帮到同样走在寻亲路上的人，一半是为了记住你们。愿你们在天上团圆，那里没有病痛，只有欢喜。',
      },
    },
  },

  'zh-TW': {
    stories: {
      bangkok: {
        title: '我的尋親故事：跨越半個世紀，替外公找回泰國的家人',
        howTitle: '我是怎麼找到的：可複製的六步',
        steps: [
          {
            title: '第一步 · 把長輩手裡的「老物件」都留下來',
            body: '一切的起點，是外公從抽屜最裡層翻出的一張半個世紀前的名片——上面有泰文手寫的地址；還有一張九十年代的全家福，他能一個個指出誰是誰。老人手裡的舊名片、舊信封、老照片，別嫌舊、別丟，那往往是唯一能接上的那根線頭。',
          },
          {
            title: '第二步 · 把模糊線索變成「能搜尋的資訊」',
            body: '名片上是泰文，我不會打。我請了一位懂泰文的朋友把地址重新打成文字，再用翻譯工具轉成英文，得到一串能直接貼進地圖的地址。一條看不懂的舊線索，先想辦法把它變成機器能讀、能搜的文字——今天有了 AI，這一步更快。',
          },
          {
            title: '第三步 · 用街景地圖，讓長輩「親自認路」',
            body: '把地址輸進 Google 街景，找到那棟房子的照片發給外公。他第一次說不太像；幾個月後再看，卻主動指出旁邊的鞦韆、對面的寺廟——「面向寺廟往右轉一直走」。這種細節，只有真正住過的人才記得。比起給老人看一張靜態照片，讓他在街景裡「走一遍老路」，喚起的記憶要可靠得多。',
          },
          {
            title: '第四步 · 別只打電話——定個日子，親自去',
            body: '外婆那次摔傷住院，讓我突然意識到，留給老人的時間不多了。再多通越洋電話，也抵不過一次親自登門。我沒敢告訴外公我要單獨去（怕萬一找不到讓他失落），只揣著那張全家福，訂了機票就出發了。',
          },
          {
            title: '第五步 · 找一個當地人，既當翻譯又當嚮導',
            body: '落地後，我請了一位常駐當地的同事陪我——她既是司機，又是泰語翻譯。鐵門鎖著、姑婆在午睡、鄰居只會泰語，全靠她一路溝通，才把門叫開。在人生地不熟的國家上門尋親，一個本地人能同時幫你解決安全、溝通和體面這三件事。',
          },
          {
            title: '第六步 · 找到的那一刻，立刻接通視訊',
            body: '進了門、解釋清楚我是誰之後，我做的第一件事就是接通國內。媽媽讓舅舅趕去外公家打開視訊——這是兩家人三十年來第一次在螢幕裡看見彼此。找到人，就別等回國再說，當場把視訊接上。隔開親人的，從來不只是距離，還有時間。',
          },
        ],
        reflectionTitle: '回頭看，真正讓這件事成的是什麼',
        reflection: '不是運氣，也不是某一個工具，而是：把長輩手裡的舊線索當成寶貝；用現代工具把它變成能執行的地址；不再猶豫，親自去一趟；找個當地人陪一程；找到的那一刻，立刻讓兩端在視訊裡重逢。這套做法，對每一個想替家裡長輩了卻尋親心願的人，都用得上。',
        endingTitle: '寫給我的外公外婆',
        ending: '死亡不是終點，遺忘才是。我把這段經歷整理在這裡，一半是想幫到同樣走在尋親路上的人，一半是為了記住你們。願你們在天上團圓，那裡沒有病痛，只有歡喜。',
      },
    },
  },

  'en-US': {
    stories: {
      bangkok: {
        title: 'My Reunion Story: Finding My Grandfather\'s Bangkok Family, Half a Century Later',
        howTitle: 'How I Found Them: Six Steps Anyone Can Follow',
        steps: [
          {
            title: 'Step 1 · Keep every old keepsake your elder still has',
            body: 'It all started with a half-century-old business card my grandfather dug out from the very back of a drawer — a Thai address handwritten on it — and a 1990s family photo in which he could still name every face. The old cards, envelopes, and photos in an elder\'s drawer are not junk. Don\'t throw them out: they are often the one thread that still connects.',
          },
          {
            title: 'Step 2 · Turn a vague clue into searchable information',
            body: 'The card was in Thai, which I can\'t type. I asked a friend who reads Thai to retype the address, then ran it through a translation tool to get an English version I could paste straight into a map. Whatever the old clue is, first turn it into text a machine can read and search — and with today\'s AI, this step is faster than ever.',
          },
          {
            title: 'Step 3 · Let your elder "walk the old streets" on street view',
            body: 'I dropped the address into Google Street View and sent my grandfather the photo of the house. The first time, he said it didn\'t look quite right. Months later he suddenly pointed out the swing beside it and the temple across the road — "facing the temple, turn right and keep walking." Only someone who actually lived there remembers that. Letting an elder walk the old streets in street view jogs far more reliable memories than a single still photo.',
          },
          {
            title: 'Step 4 · Don\'t just call — set a date and go in person',
            body: 'When my grandmother fell and spent a month in hospital, it hit me how little time was left. No number of overseas calls could replace showing up at the door. I didn\'t dare tell my grandfather I was going alone (in case I failed and let him down) — I just took that family photo, booked a ticket, and went.',
          },
          {
            title: 'Step 5 · Bring a local who can both translate and guide',
            body: 'After landing, I asked a colleague based there to come with me — driver and Thai interpreter in one. The iron gate was locked, my great-aunt was napping, the neighbors only spoke Thai; it was only through her that we got the door opened. Knocking on doors in an unfamiliar country, a local handles three things at once for you: safety, communication, and dignity.',
          },
          {
            title: 'Step 6 · The moment you find them, start the video call',
            body: 'Once I was inside and they understood who I was, the first thing I did was call home. My mom sent my uncle rushing to my grandfather\'s place to open a video call — the two families seeing each other on screen for the first time in thirty years. When you find someone, don\'t wait until you\'re back home — get them on video right there. What separates loved ones is never just distance; it\'s time.',
          },
        ],
        reflectionTitle: 'Looking back, what actually made it work',
        reflection: 'Not luck, and not any single tool. It was this: treat the old clues in your elder\'s drawer as treasure; use modern tools to turn them into an actionable address; stop hesitating and go in person; bring a local to walk part of the way with you; and the moment you find them, reunite both sides on video. This approach works for anyone hoping to fulfill an elder\'s reunion wish.',
        endingTitle: 'For my grandfather and grandmother',
        ending: 'Death is not the end — forgetting is. I\'ve set this story down here partly to help others walking the same road, and partly to remember you. May you be reunited above, in a place without pain, full of joy.',
      },
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
