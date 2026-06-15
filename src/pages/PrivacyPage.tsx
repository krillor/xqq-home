import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowLeft, Shield, Lock, Globe, Cookie, UserCheck } from 'lucide-react'

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
  title: '隐私政策',
  updated: '最后更新：2026年6月',
  sections: [
    {
      title: '我们不收集你的任何信息',
      icon: <Lock className="w-6 h-6" />,
      intro: '寻亲桥是一个纯前端的工具站——没有服务器数据库，也没有账号系统。我们不收集、不上传、不存储你的任何个人信息。',
      items: [
        '你在「线索解码」里输入的姓氏、地名等，仅在你的浏览器中即时处理，用完即弃，不会发送到任何服务器',
        '你在「寻根档案」里填写的内容，只保存在你自己设备的浏览器本地存储中，可由你导出为文件——它们从不离开你的设备',
        '我们没有后台，无法看到、也不会保存你的任何输入',
      ],
    },
    {
      title: '本站使用的第三方',
      icon: <Globe className="w-6 h-6" />,
      intro: '为了让网站能被访问，我们用到以下第三方服务：',
      items: [
        '站点托管于 GitHub Pages（静态网页托管），其访问日志由 GitHub 依其隐私政策处理',
        '「旧地名 / 方言姓氏」的对照数据是内置的静态资料，查询时不联网',
        '若你使用浏览器自带翻译，或点击跳转到外部地图、网站，则受这些服务各自的隐私政策约束',
      ],
    },
    {
      title: 'Cookie 与统计',
      icon: <Cookie className="w-6 h-6" />,
      intro: '本站不使用任何用于追踪你的 Cookie，也没有接入广告或用户行为分析。',
    },
    {
      title: '你拥有完全的控制权',
      icon: <UserCheck className="w-6 h-6" />,
      intro: '因为数据只存在你本地，你对它有完全的掌控：',
      items: [
        '导出：随时把寻根档案导出为文件，自行保管',
        '删除：清除浏览器数据，或删除你导出的文件，即可彻底清除',
      ],
    },
  ],
  contactTitle: '联系我们',
  contactIntro: '如果你对本隐私政策有任何疑问，欢迎通过以下方式联系：',
  email: '邮箱',
  footer: '本站是一个公益性的个人项目。我们可能会不时更新本隐私政策，更新后的版本会在此页面公布。',
}

const enContent: PageContent = {
  backHome: 'Back to home',
  title: 'Privacy Policy',
  updated: 'Last updated: June 2026',
  sections: [
    {
      title: 'We Collect Nothing About You',
      icon: <Lock className="w-6 h-6" />,
      intro: 'RootBridge is a front-end-only tool — there is no server database and no account system. We do not collect, upload, or store any of your personal information.',
      items: [
        'Anything you type into the Clue Decoder (surnames, place names, etc.) is processed instantly in your browser and discarded — nothing is sent to any server',
        'Whatever you fill into "My Roots Archive" is stored only in your own device\'s browser storage and can be exported as a file — it never leaves your device',
        'We have no backend; we cannot see and do not keep any of your input',
      ],
    },
    {
      title: 'Third Parties We Rely On',
      icon: <Globe className="w-6 h-6" />,
      intro: 'To make the site accessible, we use the following third-party services:',
      items: [
        'The site is hosted on GitHub Pages (static hosting); its access logs are handled under GitHub\'s own privacy policy',
        'The old-place-name and dialect-surname lookup data is built-in static data — queries do not go online',
        'If you use your browser\'s built-in translation, or click through to external maps or sites, those are governed by their own privacy policies',
      ],
    },
    {
      title: 'Cookies & Analytics',
      icon: <Cookie className="w-6 h-6" />,
      intro: 'This site uses no tracking cookies, and has no advertising or behavioral analytics.',
    },
    {
      title: 'You Are Fully in Control',
      icon: <UserCheck className="w-6 h-6" />,
      intro: 'Because the data lives only on your device, you have complete control over it:',
      items: [
        'Export: download your roots archive as a file anytime and keep it yourself',
        'Delete: clear your browser data, or delete the file you exported, to remove it entirely',
      ],
    },
  ],
  contactTitle: 'Contact Us',
  contactIntro: 'If you have any questions about this privacy policy, feel free to reach out:',
  email: 'Email',
  footer: 'This is a non-profit personal project. We may update this privacy policy from time to time; the updated version will be published on this page.',
}

const PrivacyPage: React.FC = () => {
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
              <Shield className="w-16 h-16 text-white mx-auto mb-4" />
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

export default PrivacyPage
