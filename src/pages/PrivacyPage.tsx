import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Shield, Lock, Eye, FileText } from 'lucide-react'

const PrivacyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link
          to="/"
          className="flex items-center gap-2 text-[#5D4037] hover:text-[#E67E22] mb-8 transition-colors w-fit"
        >
          <ArrowLeft className="w-5 h-5" />
          返回首页
        </Link>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-amber-600 to-orange-600 px-8 py-12">
            <div className="text-center">
              <Shield className="w-16 h-16 text-white mx-auto mb-4" />
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">隐私政策</h1>
              <p className="text-amber-100">最后更新：2024年1月</p>
            </div>
          </div>

          <div className="p-8 md:p-12 space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-[#5D4037] mb-4 flex items-center gap-2">
                <Lock className="w-6 h-6" />
                信息收集
              </h2>
              <div className="text-gray-600 leading-relaxed space-y-3">
                <p>
                  寻亲桥（以下称"我们"或"平台"）承诺尊重并保护您的个人隐私。在您使用我们的服务时，
                  我们可能会收集以下类型的信息：
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>账户信息</strong>：包括您的姓名、邮箱地址等注册信息</li>
                  <li><strong>寻亲信息</strong>：您发布的寻亲内容，包括家族故事、照片、地理位置等</li>
                  <li><strong>使用数据</strong>：包括您的浏览记录、搜索历史等匿名统计数据</li>
                  <li><strong>上传资料</strong>：包括老照片、侨批、墓碑照片等您主动上传的内容</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#5D4037] mb-4 flex items-center gap-2">
                <Eye className="w-6 h-6" />
                信息使用
              </h2>
              <div className="text-gray-600 leading-relaxed space-y-3">
                <p>我们收集您的信息主要用于以下目的：</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>提供和维护平台的正常运营服务</li>
                  <li>帮助您发布和管理寻亲信息</li>
                  <li>连接您与相关地区的志愿者和侨务部门</li>
                  <li>改进平台功能和服务质量</li>
                  <li>发送重要的服务通知和更新</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#5D4037] mb-4 flex items-center gap-2">
                <FileText className="w-6 h-6" />
                信息保护
              </h2>
              <div className="text-gray-600 leading-relaxed space-y-3">
                <p>
                  我们采取多种安全措施来保护您的个人信息，包括但不限于：
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>数据加密传输（HTTPS/SSL）</li>
                  <li>严格的访问权限控制</li>
                  <li>定期安全审计和更新</li>
                  <li>用户敏感信息的脱敏处理</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#5D4037] mb-4">
                信息共享
              </h2>
              <div className="text-gray-600 leading-relaxed space-y-3">
                <p>
                  我们承诺不会出售您的个人信息。在以下情况下，我们可能会共享您的信息：
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>经您明确同意后，与相关志愿者或侨务部门共享</li>
                  <li>根据法律法规要求，向相关政府部门披露</li>
                  <li>为保护平台和用户的合法权益</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#5D4037] mb-4">
                您的权利
              </h2>
              <div className="text-gray-600 leading-relaxed space-y-3">
                <p>您对自己的个人信息享有以下权利：</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>访问和查看您的个人信息</li>
                  <li>更正不准确的个人信息</li>
                  <li>删除您的个人信息和账户</li>
                  <li>撤回您的同意授权</li>
                  <li>导出您的个人数据</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#5D4037] mb-4">
                联系我们
              </h2>
              <div className="text-gray-600 leading-relaxed">
                <p>
                  如果您对本隐私政策有任何疑问，或需要行使您的权利，请通过以下方式联系我们：
                </p>
                <div className="mt-4 p-4 bg-amber-50 rounded-lg">
                  <p><strong>邮箱</strong>：contact@xinqinlu.com</p>
                  <p><strong>电话</strong>：400-888-8888</p>
                </div>
              </div>
            </section>

            <div className="pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-500 text-center">
                我们可能会不时更新本隐私政策。更新后的政策将在此页面公布。
                如您继续使用我们的服务，即表示您同意更新后的政策。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PrivacyPage
