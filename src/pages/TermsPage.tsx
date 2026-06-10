import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, FileText, AlertCircle, CheckCircle, Users } from 'lucide-react'

const TermsPage: React.FC = () => {
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
              <FileText className="w-16 h-16 text-white mx-auto mb-4" />
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">使用条款</h1>
              <p className="text-amber-100">最后更新：2024年1月</p>
            </div>
          </div>

          <div className="p-8 md:p-12 space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-[#5D4037] mb-4 flex items-center gap-2">
                <CheckCircle className="w-6 h-6" />
                服务说明
              </h2>
              <div className="text-gray-600 leading-relaxed space-y-3">
                <p>
                  寻亲桥是一个帮助华侨华人寻根问祖的公益平台。我们提供以下服务：
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>寻亲信息发布和浏览</li>
                  <li>智能线索解析（照片OCR识别、地名匹配等）</li>
                  <li>志愿者匹配和联络</li>
                  <li>侨联和商会信息查询</li>
                  <li>寻根知识库和帮助指南</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#5D4037] mb-4 flex items-center gap-2">
                <Users className="w-6 h-6" />
                用户责任
              </h2>
              <div className="text-gray-600 leading-relaxed space-y-3">
                <p>作为平台用户，您同意：</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>提供真实、准确的寻亲信息</li>
                  <li>不发布虚假、误导性或欺骗性内容</li>
                  <li>尊重他人隐私，不泄露他人个人信息</li>
                  <li>不使用平台从事任何违法活动</li>
                  <li>保护您的账户安全，不将账号借给他人使用</li>
                  <li>对您的行为负全部责任</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#5D4037] mb-4 flex items-center gap-2">
                <AlertCircle className="w-6 h-6" />
                禁止行为
              </h2>
              <div className="text-gray-600 leading-relaxed space-y-3">
                <p>明确禁止以下行为：</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>发布虚假寻亲信息或冒充他人</li>
                  <li>利用平台进行商业广告推销</li>
                  <li>侵犯他人知识产权、隐私权等合法权益</li>
                  <li>传播违法、有害、歧视性内容</li>
                  <li>骚扰、威胁或恐吓其他用户</li>
                  <li>尝试入侵、破坏平台系统</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#5D4037] mb-4">
                内容所有权
              </h2>
              <div className="text-gray-600 leading-relaxed space-y-3">
                <p>
                  您在平台上发布的内容（如文字、图片、语音等）版权归您所有。
                  但您授予我们以下权利：
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>使用、复制、修改您发布的内容用于平台运营</li>
                  <li>在平台上展示您的寻亲信息</li>
                  <li>与相关志愿者和侨务部门共享必要信息</li>
                </ul>
                <p className="mt-4">
                  请确保您有权发布相关内容，不侵犯他人权益。
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#5D4037] mb-4">
                免责声明
              </h2>
              <div className="text-gray-600 leading-relaxed space-y-3">
                <p>
                  寻亲桥作为一个信息交流平台，对以下情况不承担责任：
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>用户发布信息的真实性、准确性</li>
                  <li>寻亲结果的最终成功与否</li>
                  <li>用户之间的线下交易或交往</li>
                  <li>因不可抗力导致的服务中断</li>
                  <li>用户因违反本条款导致的损失</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#5D4037] mb-4">
                服务终止
              </h2>
              <div className="text-gray-600 leading-relaxed space-y-3">
                <p>
                  在以下情况下，我们可能终止或暂停您的账户：
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>您违反本使用条款</li>
                  <li>您从事违法活动</li>
                  <li>您长时间未使用账户</li>
                  <li>平台需要终止服务</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#5D4037] mb-4">
                联系我们
              </h2>
              <div className="text-gray-600 leading-relaxed">
                <p>
                  如果您对本使用条款有任何疑问，请通过以下方式联系我们：
                </p>
                <div className="mt-4 p-4 bg-amber-50 rounded-lg">
                  <p><strong>邮箱</strong>：contact@xqq.com</p>
                  <p><strong>电话</strong>：400-888-8888</p>
                </div>
              </div>
            </section>

            <div className="pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-500 text-center">
                使用寻亲桥服务即表示您已阅读、理解并同意上述所有条款。
                我们保留随时修改本条款的权利，修改后的条款将在此页面公布。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TermsPage
