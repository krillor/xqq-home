import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowLeft, FileText, AlertCircle, CheckCircle, Users } from 'lucide-react'

interface SectionData {
  title: string
  icon?: React.ReactNode
  intro: string
  items?: string[]
  outro?: string
}

interface PageContent {
  backHome: string
  title: string
  updated: string
  sections: SectionData[]
  contactTitle: string
  contactIntro: string
  email: string
  phone: string
  footer: string
}

const zhContent: PageContent = {
  backHome: '返回首页',
  title: '使用条款',
  updated: '最后更新：2024年1月',
  sections: [
    {
      title: '服务说明',
      icon: <CheckCircle className="w-6 h-6" />,
      intro: '寻亲桥是一个帮助华侨华人寻根问祖的公益平台。我们提供以下服务：',
      items: [
        '寻亲信息发布和浏览',
        '志愿者匹配和联络',
        '寻根知识和帮助指南',
      ],
    },
    {
      title: '用户责任',
      icon: <Users className="w-6 h-6" />,
      intro: '作为平台用户，您同意：',
      items: [
        '提供真实、准确的寻亲信息',
        '不发布虚假、误导性或欺骗性内容',
        '尊重他人隐私，不泄露他人个人信息',
        '不使用平台从事任何违法活动',
        '保护您的账户安全，不将账号借给他人使用',
        '对您的行为负全部责任',
      ],
    },
    {
      title: '禁止行为',
      icon: <AlertCircle className="w-6 h-6" />,
      intro: '明确禁止以下行为：',
      items: [
        '发布虚假寻亲信息或冒充他人',
        '利用平台进行商业广告推销',
        '侵犯他人知识产权、隐私权等合法权益',
        '传播违法、有害、歧视性内容',
        '骚扰、威胁或恐吓其他用户',
        '尝试入侵、破坏平台系统',
      ],
    },
    {
      title: '内容所有权',
      intro: '您在平台上发布的内容（如文字、图片、语音等）版权归您所有。但您授予我们以下权利：',
      items: [
        '使用、复制、修改您发布的内容用于平台运营',
        '在平台上展示您的寻亲信息',
        '与相关志愿者和侨务部门共享必要信息',
      ],
      outro: '请确保您有权发布相关内容，不侵犯他人权益。',
    },
    {
      title: '免责声明',
      intro: '寻亲桥作为一个信息交流平台，对以下情况不承担责任：',
      items: [
        '用户发布信息的真实性、准确性',
        '寻亲结果的最终成功与否',
        '用户之间的线下交易或交往',
        '因不可抗力导致的服务中断',
        '用户因违反本条款导致的损失',
      ],
    },
    {
      title: '服务终止',
      intro: '在以下情况下，我们可能终止或暂停您的账户：',
      items: [
        '您违反本使用条款',
        '您从事违法活动',
        '您长时间未使用账户',
        '平台需要终止服务',
      ],
    },
  ],
  contactTitle: '联系我们',
  contactIntro: '如果您对本使用条款有任何疑问，请通过以下方式联系我们：',
  email: '邮箱',
  phone: '电话',
  footer: '使用寻亲桥服务即表示您已阅读、理解并同意上述所有条款。我们保留随时修改本条款的权利，修改后的条款将在此页面公布。',
}

const enContent: PageContent = {
  backHome: 'Back to home',
  title: 'Terms of Use',
  updated: 'Last updated: January 2024',
  sections: [
    {
      title: 'Our Services',
      icon: <CheckCircle className="w-6 h-6" />,
      intro: 'RootBridge is a non-profit platform helping overseas Chinese trace their roots and find relatives. We provide:',
      items: [
        'Publishing and browsing reunion posts',
        'Volunteer matching and contact',
        'Roots-tracing knowledge and help guides',
      ],
    },
    {
      title: 'User Responsibilities',
      icon: <Users className="w-6 h-6" />,
      intro: 'As a user of the platform, you agree to:',
      items: [
        'Provide truthful and accurate reunion information',
        'Not publish false, misleading, or deceptive content',
        "Respect others' privacy and not disclose their personal information",
        'Not use the platform for any illegal activities',
        'Keep your account secure and not lend it to others',
        'Take full responsibility for your actions',
      ],
    },
    {
      title: 'Prohibited Conduct',
      icon: <AlertCircle className="w-6 h-6" />,
      intro: 'The following conduct is strictly prohibited:',
      items: [
        'Publishing false reunion posts or impersonating others',
        'Using the platform for commercial advertising',
        "Infringing others' intellectual property, privacy, or other rights",
        'Spreading illegal, harmful, or discriminatory content',
        'Harassing, threatening, or intimidating other users',
        'Attempting to hack or damage the platform',
      ],
    },
    {
      title: 'Content Ownership',
      intro: 'You retain copyright of the content you publish (text, photos, audio, etc.). However, you grant us the following rights:',
      items: [
        'To use, copy, and modify your content for platform operations',
        'To display your reunion posts on the platform',
        'To share necessary information with relevant volunteers and overseas Chinese affairs offices',
      ],
      outro: "Please ensure you have the right to publish the content and do not infringe others' rights.",
    },
    {
      title: 'Disclaimer',
      intro: 'As an information exchange platform, RootBridge is not responsible for:',
      items: [
        'The truthfulness or accuracy of user-published information',
        'Whether a reunion search ultimately succeeds',
        'Offline transactions or interactions between users',
        'Service interruptions caused by force majeure',
        'Losses caused by your violation of these terms',
      ],
    },
    {
      title: 'Termination',
      intro: 'We may terminate or suspend your account if:',
      items: [
        'You violate these terms of use',
        'You engage in illegal activities',
        'Your account is inactive for an extended period',
        'The platform needs to discontinue the service',
      ],
    },
  ],
  contactTitle: 'Contact Us',
  contactIntro: 'If you have any questions about these terms of use, please contact us via:',
  email: 'Email',
  phone: 'Phone',
  footer: 'By using RootBridge you acknowledge that you have read, understood, and agreed to all of the above terms. We reserve the right to modify these terms at any time; updates will be published on this page.',
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
                  {section.outro && <p className="mt-4">{section.outro}</p>}
                </div>
              </section>
            ))}

            <section>
              <h2 className="text-2xl font-bold text-[#5D4037] mb-4">{c.contactTitle}</h2>
              <div className="text-gray-600 leading-relaxed">
                <p>{c.contactIntro}</p>
                <div className="mt-4 p-4 bg-amber-50 rounded-lg">
                  <p><strong>{c.email}</strong>: contact@xqq.com</p>
                  <p><strong>{c.phone}</strong>: 400-888-8888</p>
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
