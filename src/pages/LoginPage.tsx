import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAppStore } from '../store/appStore'
import { Mail, Lock, Send } from 'lucide-react'
import SliderCaptcha from '../components/SliderCaptcha'

const LoginPage: React.FC = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()
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
      setSuccess(t('auth.codeSent'))
      setStep('code')
    } catch (err) {
      setError(t('auth.errorSendCode'))
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
        setError(t('auth.errorCodeWrong'))
      }
    } catch (err) {
      setError(t('auth.errorLoginFail'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-amber-600 to-orange-600 px-8 py-10">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white mb-2">{t('brand')}</h1>
            <p className="text-amber-100">{t('auth.loginTitle')}</p>
          </div>
        </div>

        <div className="px-8 py-8">
          {step === 'email' ? (
            <form onSubmit={handleSendCode} className="space-y-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  {t('auth.email')}
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t('auth.emailPlaceholder')}
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
                  <span>{t('auth.sending')}</span>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    {t('auth.sendCode')}
                  </>
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="bg-gray-50 border border-gray-200 px-4 py-3 rounded-lg">
                <p className="text-sm text-gray-600">{t('auth.email')}</p>
                <p className="text-gray-800 font-medium">{email}</p>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  {t('auth.verificationCode')}
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder={t('auth.codePlaceholder')}
                    maxLength={6}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
                    required
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {t('auth.demoCode')}
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
                  {t('auth.back')}
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-gradient-to-r from-amber-600 to-orange-600 text-white py-3 rounded-lg font-medium hover:from-amber-700 hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {loading ? t('auth.loggingIn') : t('auth.login')}
                </button>
              </div>
            </form>
          )}

          <div className="mt-8 text-center text-gray-600 text-sm">
            {t('auth.browseHint')}
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage