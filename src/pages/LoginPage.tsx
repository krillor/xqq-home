import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppStore } from '../store/appStore'
import { Mail, Lock, Send } from 'lucide-react'
import SliderCaptcha from '../components/SliderCaptcha'

const LoginPage: React.FC = () => {
  const navigate = useNavigate()
  const { sendVerificationCode, login } = useAppStore()

  const [step, setStep] = useState<'email' | 'code'>('email')
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [captchaVerified, setCaptchaVerified] = useState(false)
  const [captchaReset, setCaptchaReset] = useState(false)

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !captchaVerified) return

    setLoading(true)
    setError('')
    try {
      await sendVerificationCode(email)
      setSuccess('验证码已发送！请使用 123456 登录（演示用）')
      setStep('code')
    } catch (err) {
      setError('发送验证码失败，请重试')
      // 发送失败则重置滑块
      setCaptchaVerified(false)
      setCaptchaReset(r => !r)
    } finally {
      setLoading(false)
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !code) return

    setLoading(true)
    setError('')
    try {
      const success = await login(email, code)
      if (success) {
        navigate('/')
      } else {
        setError('验证码错误，请重试')
      }
    } catch (err) {
      setError('登录失败，请重试')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-amber-600 to-orange-600 px-8 py-10">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white mb-2">寻亲桥</h1>
            <p className="text-amber-100">登录您的账户</p>
          </div>
        </div>

        <div className="px-8 py-8">
          {step === 'email' ? (
            <form onSubmit={handleSendCode} className="space-y-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  邮箱地址
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="请输入您的邮箱"
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
                    required
                  />
                </div>
              </div>

              <SliderCaptcha
                onVerified={() => setCaptchaVerified(true)}
                reset={captchaReset}
              />

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}

              {success && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
                  {success}
                </div>
              )}

              <button
                type="submit"
                disabled={loading || !captchaVerified}
                className="w-full bg-gradient-to-r from-amber-600 to-orange-600 text-white py-3 rounded-lg font-medium hover:from-amber-700 hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
              >
                {loading ? (
                  <span>发送中...</span>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    发送验证码
                  </>
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="bg-gray-50 border border-gray-200 px-4 py-3 rounded-lg">
                <p className="text-sm text-gray-600">邮箱地址</p>
                <p className="text-gray-800 font-medium">{email}</p>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  验证码
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="请输入6位验证码"
                    maxLength={6}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
                    required
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  演示验证码：123456
                </p>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep('email')}
                  className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                >
                  返回
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-gradient-to-r from-amber-600 to-orange-600 text-white py-3 rounded-lg font-medium hover:from-amber-700 hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {loading ? '登录中...' : '登录'}
                </button>
              </div>
            </form>
          )}

          <div className="mt-8 text-center text-gray-600 text-sm">
            浏览不需要登录，发帖和回帖需要登录
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage