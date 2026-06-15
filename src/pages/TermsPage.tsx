import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowLeft, FileText, AlertCircle, CheckCircle, BookOpen } from 'lucide-react'

interface SectionData {
  title: string
  icon?: React.ReactNode
  intro: string
  items?: string[]
}

interface PageContent {
  backHome: string
  title: string
  updated: string
  sections: SectionData[]
  contactTitle: string
  contactIntro: string
  email: string
  footer: string
}

const zhContent: PageContent = {
  backHome: '返回首页',
  title: '使用条款',
  updated: '最后更新：2026年6月',
  sections: [
    {
      title: '这是什么',
      icon: <CheckCircle className="w-6 h-6" />,
      intro: '寻亲桥是一个公益性的寻根工具站，完全免费、无需注册。它提供：',
      items: [
        '线索解码：把方言姓氏、旧地名等碎片，对照成可检索的中文信息',
        '寻根档案：在你本地建立家族档案并导出（数据只存你本地）',
        '寻根故事：真实的寻根经历与方法分享',
      ],
    },
    {
      title: '重要提示与免责',
      icon: <AlertCircle className="w-6 h-6" />,
      intro: '使用本站前，请理解以下几点：',
      items: [
        '解码结果（旧地名、方言姓氏对照）来自公开资料整理，仅供参考，不保证完全准确；据此联系机构或安排出行，请自行核实、风险自负',
        '寻根档案只保存在你的浏览器本地——清除浏览器数据、更换设备或浏览器都会导致丢失，本站无法找回，请及时导出备份',
        '本站不提供寻人撮合、不接触也不保存任何当事人信息，也不对任何寻亲结果作出保证',
      ],
    },
    {
      title: '内容与版权',
      icon: <BookOpen className="w-6 h-6" />,
      intro: '关于站内内容：',
      items: [
        '「寻根故事」的版权归原作者所有',
        '转载或引用请注明出处，请勿用于商业用途',
      ],
    },
  ],
  contactTitle: '联系我们',
  contactIntro: '如果你对本使用条款有任何疑问，欢迎通过以下方式联系：',
  email: '邮箱',
  footer: '继续使用本站，即表示你已阅读并理解上述条款。我们保留随时修改本条款的权利，修改后的版本会在此页面公布。',
}

const enContent: PageContent = {
  backHome: 'Back to home',
  title: 'Terms of Use',
  updated: 'Last updated: June 2026',
  sections: [
    {
      title: 'What This Is',
      icon: <CheckCircle className="w-6 h-6" />,
      intro: 'RootBridge is a non-profit roots-tracing tool — completely free, no registration. It offers:',
      items: [
        'Clue Decoder: match dialect surnames, old place names and other fragments to searchable information',
        'My Roots Archive: build a family archive locally and export it (data stays on your device only)',
        'Roots Stories: real reunion experiences and methods shared',
      ],
    },
    {
      title: 'Important Notes & Disclaimer',
      icon: <AlertCircle className="w-6 h-6" />,
      intro: 'Before using this site, please understand the following:',
      items: [
        'Decoder results (old place names, dialect surnames) are compiled from public sources for reference only, with no guarantee of accuracy; verify independently before contacting any organization or making travel plans — you do so at your own risk',
        'Your roots archive is stored only in your browser. Clearing browser data, or switching device or browser, will lose it; we cannot recover it, so export a backup promptly',
        'This site offers no people-matching service, never touches or stores any individual\'s information, and makes no guarantee about any reunion outcome',
      ],
    },
    {
      title: 'Content & Copyright',
      icon: <BookOpen className="w-6 h-6" />,
      intro: 'Regarding the content on this site:',
      items: [
        'The "Roots Stories" remain the copyright of their original authors',
        'If you republish or quote them, please credit the source and do not use them commercially',
      ],
    },
  ],
  contactTitle: 'Contact Us',
  contactIntro: 'If you have any questions about these terms, feel free to reach out:',
  email: 'Email',
  footer: 'By continuing to use this site, you acknowledge that you have read and understood these terms. We reserve the right to modify them at any time; the updated version will be published on this page.',
}

const TermsPage: React.FC = () => {
  const { i18n } = useTranslation()
  const c = i18n.language === 'en-US' ? enContent : zhContent

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link
          to="/"
          className="flex items-center gap-2 text-[#5D4037] hover:text-[#E67E22] mb-8 transition-colors w-fit"
        >
          <ArrowLeft className="w-5 h-5" />
          {c.backHome}
        </Link>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-amber-600 to-orange-600 px-8 py-12">
            <div className="text-center">
              <FileText className="w-16 h-16 text-white mx-auto mb-4" />
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{c.title}</h1>
              <p className="text-amber-100">{c.updated}</p>
            </div>
          </div>

          <div className="p-8 md:p-12 space-y-8">
            {c.sections.map(section => (
              <section key={section.title}>
                <h2 className="text-2xl font-bold text-[#5D4037] mb-4 flex items-center gap-2">
                  {section.icon}
                  {section.title}
                </h2>
                <div className="text-gray-600 leading-relaxed space-y-3">
                  <p>{section.intro}</p>
                  {section.items && (
                    <ul className="list-disc pl-6 space-y-2">
                      {section.items.map(item => <li key={item}>{item}</li>)}
                    </ul>
                  )}
                </div>
              </section>
            ))}

            <section>
              <h2 className="text-2xl font-bold text-[#5D4037] mb-4">{c.contactTitle}</h2>
              <div className="text-gray-600 leading-relaxed">
                <p>{c.contactIntro}</p>
                <div className="mt-4 p-4 bg-amber-50 rounded-lg">
                  <p><strong>{c.email}</strong>: contact@xqq.com</p>
                </div>
              </div>
            </section>

            <div className="pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-500 text-center">{c.footer}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TermsPage
