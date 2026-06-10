import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowLeft, Shield, Lock, Eye, FileText } from 'lucide-react'

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
  phone: string
  footer: string
}

const zhContent: PageContent = {
  backHome: '返回首页',
  title: '隐私政策',
  updated: '最后更新：2024年1月',
  sections: [
    {
      title: '信息收集',
      icon: <Lock className="w-6 h-6" />,
      intro: '寻亲桥（以下称"我们"或"平台"）承诺尊重并保护您的个人隐私。在您使用我们的服务时，我们可能会收集以下类型的信息：',
      items: [
        '账户信息：包括您的姓名、邮箱地址等注册信息',
        '寻亲信息：您发布的寻亲内容，包括家族故事、照片、地理位置等',
        '使用数据：包括您的浏览记录、搜索历史等匿名统计数据',
        '上传资料：包括老照片、侨批、墓碑照片等您主动上传的内容',
      ],
    },
    {
      title: '信息使用',
      icon: <Eye className="w-6 h-6" />,
      intro: '我们收集您的信息主要用于以下目的：',
      items: [
        '提供和维护平台的正常运营服务',
        '帮助您发布和管理寻亲信息',
        '连接您与相关地区的志愿者和侨务部门',
        '改进平台功能和服务质量',
        '发送重要的服务通知和更新',
      ],
    },
    {
      title: '信息保护',
      icon: <FileText className="w-6 h-6" />,
      intro: '我们采取多种安全措施来保护您的个人信息，包括但不限于：',
      items: [
        '数据加密传输（HTTPS/SSL）',
        '严格的访问权限控制',
        '定期安全审计和更新',
        '用户敏感信息的脱敏处理',
      ],
    },
    {
      title: '信息共享',
      intro: '我们承诺不会出售您的个人信息。在以下情况下，我们可能会共享您的信息：',
      items: [
        '经您明确同意后，与相关志愿者或侨务部门共享',
        '根据法律法规要求，向相关政府部门披露',
        '为保护平台和用户的合法权益',
      ],
    },
    {
      title: '您的权利',
      intro: '您对自己的个人信息享有以下权利：',
      items: [
        '访问和查看您的个人信息',
        '更正不准确的个人信息',
        '删除您的个人信息和账户',
        '撤回您的同意授权',
        '导出您的个人数据',
      ],
    },
  ],
  contactTitle: '联系我们',
  contactIntro: '如果您对本隐私政策有任何疑问，或需要行使您的权利，请通过以下方式联系我们：',
  email: '邮箱',
  phone: '电话',
  footer: '我们可能会不时更新本隐私政策。更新后的政策将在此页面公布。如您继续使用我们的服务，即表示您同意更新后的政策。',
}

const enContent: PageContent = {
  backHome: 'Back to home',
  title: 'Privacy Policy',
  updated: 'Last updated: January 2024',
  sections: [
    {
      title: 'Information We Collect',
      icon: <Lock className="w-6 h-6" />,
      intro: 'RootBridge ("we" or "the platform") is committed to respecting and protecting your privacy. When you use our services, we may collect the following types of information:',
      items: [
        'Account information: your name, email address, and other registration details',
        'Reunion posts: content you publish, including family stories, photos, and locations',
        'Usage data: anonymous statistics such as browsing and search history',
        'Uploaded materials: old photos, qiaopi letters, tombstone photos, and other content you upload',
      ],
    },
    {
      title: 'How We Use Information',
      icon: <Eye className="w-6 h-6" />,
      intro: 'We collect your information mainly for the following purposes:',
      items: [
        'Providing and maintaining the platform',
        'Helping you publish and manage reunion posts',
        'Connecting you with volunteers and overseas Chinese affairs offices in relevant regions',
        'Improving platform features and service quality',
        'Sending important service notices and updates',
      ],
    },
    {
      title: 'How We Protect Information',
      icon: <FileText className="w-6 h-6" />,
      intro: 'We take multiple security measures to protect your personal information, including but not limited to:',
      items: [
        'Encrypted data transmission (HTTPS/SSL)',
        'Strict access control',
        'Regular security audits and updates',
        'Masking of sensitive user information',
      ],
    },
    {
      title: 'Information Sharing',
      intro: 'We promise never to sell your personal information. We may share your information only in the following cases:',
      items: [
        'With relevant volunteers or overseas Chinese affairs offices, with your explicit consent',
        'With government authorities as required by laws and regulations',
        'To protect the legitimate rights of the platform and its users',
      ],
    },
    {
      title: 'Your Rights',
      intro: 'You have the following rights regarding your personal information:',
      items: [
        'Access and review your personal information',
        'Correct inaccurate personal information',
        'Delete your personal information and account',
        'Withdraw your consent',
        'Export your personal data',
      ],
    },
  ],
  contactTitle: 'Contact Us',
  contactIntro: 'If you have any questions about this privacy policy or wish to exercise your rights, please contact us via:',
  email: 'Email',
  phone: 'Phone',
  footer: 'We may update this privacy policy from time to time. Updates will be published on this page. Continued use of our services indicates your acceptance of the updated policy.',
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

export default PrivacyPage
