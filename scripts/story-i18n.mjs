// One-off: install the single real story (Bangkok) as i18n in all 3 locales
import { readFileSync, writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..', 'src', 'locales')

const overrides = {
  'zh-CN': {
    stories: {
      bangkok: {
        title: '跨越半个世纪的曼谷寻亲——替外公找回泰国的家人',
        surname: '',
        originRegion: '广东潮汕',
        targetRegion: '泰国曼谷',
        seekerName: '本站作者',
        estimatedYear: '20世纪初',
        description:
          '我的曾祖父母在上世纪初从潮汕下南洋到曼谷。外公生于1930年代的曼谷，少年时被送回潮汕求学，此后两边几乎只靠每年的国际长途维系。2024年，我揣着一张存了50多年的旧名片去敲门，终于让分隔30年的两家人在视频里重聚。',
        intro:
          '我的曾祖父母在上世纪初从潮汕下南洋到曼谷。外公生于1930年代的曼谷，少年时被送回潮汕求学，从此两边只靠每年逢年过节的国际长途维系。外公的妹妹的电话渐渐打不通了，但那个存了五十多年的泰国旧地址，还在他抽屉里。',
        howTitle: '我是怎么找到的（六步）',
        steps: [
          {
            title: '第 1 步：留住手里所有「老线索」',
            body:
              '外公从抽屉底下翻出的，是一张半个世纪前的名片，上面是泰文手写地址；还有一张 90 年代的全家福，他能逐个指出谁是谁。这些是后来一切的起点——老人手里的老物件，不要嫌旧、不要扔。',
          },
          {
            title: '第 2 步：让老地址变成「机器能搜的字」',
            body:
              '泰文我不会打。我找到一位会泰文的朋友，把名片上的地址重新打成文本，再用谷歌翻译做泰译英，得到一个可粘进地图的地址。（今天有 AI，这一步更省力。）',
          },
          {
            title: '第 3 步：用街景地图替老人「走一遍」',
            body:
              '把地址输入谷歌实景地图，找到对应屋子的照片发给外公确认。他第一次说不太像；几个月后再看，他主动指出旁边那个秋千、对面那座寺庙——"面向寺庙右拐一直走"——这是只有当年住过的人才记得的细节。**让老人通过街景在线上"走一次老路"**，比单纯看照片有效得多。',
          },
          {
            title: '第 4 步：定好时间，亲自上门',
            body:
              '外婆突然摔伤住院让我意识到，留给老人的时间不多了。再多的越洋电话都不如一次亲自登门。我没告诉外公自己要单独去（怕他失落），就揣着那张全家福飞去了曼谷。',
          },
          {
            title: '第 5 步：找一个本地「翻译+陪同」',
            body:
              '我落地后请了一位常驻同事陪同——既是司机，又是泰语翻译。屋子铁门锁着、姑婆午睡、邻居只会泰语，全靠她沟通才把门叫开。**陌生国家上门，本地人陪同 = 安全 + 沟通 + 体面**，三件事一起解决。',
          },
          {
            title: '第 6 步：让两端立刻「视频接上」',
            body:
              '进门、解释清楚我是谁之后，第一件事就是接通国内。我妈让舅舅去外公家给我打视频——这是两家三十年来第一次在屏幕里相见。**找到人的那一刻就把视频接上，别等回去再说**——老人之间隔的不只是距离，还有时间。',
          },
        ],
        reflectionTitle: '回头看，真正起作用的是什么',
        reflection:
          '不是运气，也不是某个工具。是：把老人手里的「老线索」当宝；用现代工具（翻译 / 街景）把它变成可执行的地址；不犹豫，亲自去；找个本地人陪一程；找到的那一刻就把视频打通。这套方法，对每一个想替家中长辈完成寻亲心愿的人都适用。',
        endingTitle: '写给我的外公外婆',
        ending:
          '死亡不是终点，遗忘才是。写此文仅以怀念我的外公外婆。你们在天上团圆了，希望那个世界没有病痛，充满快乐。',
      },
    },
  },

  'zh-TW': {
    stories: {
      bangkok: {
        title: '跨越半個世紀的曼谷尋親——替外公找回泰國的家人',
        surname: '',
        originRegion: '廣東潮汕',
        targetRegion: '泰國曼谷',
        seekerName: '本站作者',
        estimatedYear: '20世紀初',
        description:
          '我的曾祖父母在上世紀初從潮汕下南洋到曼谷。外公生於1930年代的曼谷，少年時被送回潮汕求學，此後兩邊幾乎只靠每年的國際長途維繫。2024年，我揣著一張存了50多年的舊名片去敲門，終於讓分隔30年的兩家人在視訊裡重聚。',
        intro:
          '我的曾祖父母在上世紀初從潮汕下南洋到曼谷。外公生於1930年代的曼谷，少年時被送回潮汕求學，從此兩邊只靠每年逢年過節的國際長途維繫。外公的妹妹的電話漸漸打不通了，但那個存了五十多年的泰國舊地址，還在他抽屜裡。',
        howTitle: '我是怎麼找到的（六步）',
        steps: [
          {
            title: '第 1 步：留住手裡所有「老線索」',
            body:
              '外公從抽屜底下翻出的，是一張半個世紀前的名片，上面是泰文手寫地址；還有一張 90 年代的全家福，他能逐個指出誰是誰。這些是後來一切的起點——老人手裡的老物件，不要嫌舊、不要丟。',
          },
          {
            title: '第 2 步：讓老地址變成「機器能搜的字」',
            body:
              '泰文我不會打。我找到一位會泰文的朋友，把名片上的地址重新打成文字，再用 Google 翻譯做泰譯英，得到一個可貼進地圖的地址。（今天有 AI，這一步更省力。）',
          },
          {
            title: '第 3 步：用街景地圖替老人「走一遍」',
            body:
              '把地址輸入 Google 實景地圖，找到對應屋子的照片發給外公確認。他第一次說不太像；幾個月後再看，他主動指出旁邊那個鞦韆、對面那座寺廟——「面向寺廟右轉一直走」——這是只有當年住過的人才記得的細節。**讓老人透過街景在線上「走一次老路」**，比單純看照片有效得多。',
          },
          {
            title: '第 4 步：定好時間，親自上門',
            body:
              '外婆突然摔傷住院讓我意識到，留給老人的時間不多了。再多的越洋電話都不如一次親自登門。我沒告訴外公自己要單獨去（怕他失落），就揣著那張全家福飛去了曼谷。',
          },
          {
            title: '第 5 步：找一個本地「翻譯+陪同」',
            body:
              '我落地後請了一位常駐同事陪同——既是司機，又是泰語翻譯。屋子鐵門鎖著、姑婆午睡、鄰居只會泰語，全靠她溝通才把門叫開。**陌生國家上門，本地人陪同 = 安全 + 溝通 + 體面**，三件事一起解決。',
          },
          {
            title: '第 6 步：讓兩端立刻「視訊接上」',
            body:
              '進門、解釋清楚我是誰之後，第一件事就是接通國內。我媽讓舅舅去外公家給我打視訊——這是兩家三十年來第一次在螢幕裡相見。**找到人的那一刻就把視訊接上，別等回去再說**——老人之間隔的不只是距離，還有時間。',
          },
        ],
        reflectionTitle: '回頭看，真正起作用的是什麼',
        reflection:
          '不是運氣，也不是某個工具。是：把老人手裡的「老線索」當寶；用現代工具（翻譯 / 街景）把它變成可執行的地址；不猶豫，親自去；找個本地人陪一程；找到的那一刻就把視訊打通。這套方法，對每一個想替家中長輩完成尋親心願的人都適用。',
        endingTitle: '寫給我的外公外婆',
        ending:
          '死亡不是終點，遺忘才是。寫此文僅以懷念我的外公外婆。你們在天上團圓了，希望那個世界沒有病痛，充滿快樂。',
      },
    },
  },

  'en-US': {
    stories: {
      bangkok: {
        title: 'A Half-Century Bangkok Reunion — Finding My Grandfather\'s Family in Thailand',
        surname: '',
        originRegion: 'Chaoshan, Guangdong',
        targetRegion: 'Bangkok, Thailand',
        seekerName: 'Site author',
        estimatedYear: 'Early 20th century',
        description:
          'My great-grandparents left Chaoshan for Bangkok in the early 1900s. My grandfather was born in Bangkok in the 1930s, sent back to Chaoshan as a teenager for schooling, and the two sides of the family stayed in touch only through yearly long-distance calls. In 2024 I flew to Bangkok with a 50-year-old business card and knocked on a door — and brought two families separated for 30 years back together over video.',
        intro:
          'My great-grandparents left Chaoshan for Bangkok in the early 1900s. My grandfather was born in Bangkok in the 1930s, sent back to Chaoshan as a teenager for schooling, and after that the two sides of the family stayed in touch only through long-distance calls each holiday. The calls to his sister stopped getting through — but the 50-year-old Bangkok address was still in his drawer.',
        howTitle: 'How I Actually Found Them (Six Steps)',
        steps: [
          {
            title: 'Step 1: Save every old clue your elder still has',
            body:
              'What my grandfather pulled from the back of a drawer: a half-century-old business card with a Thai handwritten address, and a 1990s family photo where he could still point out every face. These were the starting point of everything that followed. Old things in an elder\'s drawer are not junk — do not throw them out.',
          },
          {
            title: 'Step 2: Turn the old address into something a machine can search',
            body:
              'I do not type Thai. I asked a friend who does to retype the address from the card, then ran it through Google Translate (Thai → English) to get something I could paste into a map. (With today\'s AI this step is even easier.)',
          },
          {
            title: 'Step 3: Use street view to let the elder "walk the old streets" online',
            body:
              'I dropped the address into Google Street View and sent the house photo to my grandfather. The first time he said it didn\'t quite look right. Months later he suddenly recognized the swing nearby and the temple opposite — "facing the temple, turn right and keep going." That kind of detail only someone who lived there remembers. **Letting an elder walk the old streets through street view** is far more effective than just showing them a still photo.',
          },
          {
            title: 'Step 4: Set a date and go in person',
            body:
              'My grandmother\'s fall and month-long hospital stay made me realize how little time was left. No amount of phone calls would substitute for showing up in person. I didn\'t tell my grandfather I was going alone (I didn\'t want him disappointed if I failed); I just packed that family photo and flew to Bangkok.',
          },
          {
            title: 'Step 5: Bring a local "translator + companion"',
            body:
              'I asked a colleague based in Bangkok to come with me — driver, Thai translator, and steady presence in one. The iron gate was locked, my great-aunt was napping, the neighbors only spoke Thai; without her none of it would have worked. **In a foreign country, a local companion gets you safety, communication, and dignity all at once.**',
          },
          {
            title: 'Step 6: Get the two sides on video the moment you arrive',
            body:
              'Once I was inside and they understood who I was, the very next thing I did was call home. My mom sent my uncle over to my grandfather\'s, and the two families saw each other on screen for the first time in 30 years. **Start the video call the moment you find them — don\'t wait until you\'re home.** What separates elders is not just distance; it\'s time.',
          },
        ],
        reflectionTitle: 'Looking back, what really worked',
        reflection:
          'Not luck, and not any single tool. It was: treat the old clues in your elder\'s drawer as treasure; use modern tools (translation, street view) to turn them into an actionable address; don\'t hesitate — go in person; bring a local companion; the moment you find them, get everyone on video. This recipe works for anyone trying to finish a reunion search on behalf of an elder in the family.',
        endingTitle: 'For my grandfather and grandmother',
        ending:
          'Death is not the end. Forgetting is. I wrote this to remember my grandfather and grandmother. May you be reunited above, in a world without pain, full of joy.',
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
