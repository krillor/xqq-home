import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Mail, Lock, User, Send, CheckCircle } from 'lucide-react'
import { useAppStore } from '../store/appStore'
import SliderCaptcha from '../components/SliderCaptcha'

const RegisterPage: React.FC = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { sendVerificationCode, register } = useAppStore()

  const [step, setStep] = useState<'info' | 'code' | 'success'>('info')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [captchaVerified, setCaptchaVerified] = useState(false)
  const [captchaReset, setCaptchaReset] = useState(false)

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.email || !formData.name || !formData.password) {
      setError(t('auth.errorRequired'))
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError(t('auth.errorPasswordMismatch'))
      return
    }

    if (formData.password.length < 6) {
      setError(t('auth.errorPasswordShort'))
      return
    }

    if (!captchaVerified) {
      setError(t('auth.errorCaptcha'))
      return
    }

    setLoading(true)
    setError('')
    try {
      await sendVerificationCode(formData.email)
      setStep('code')
    } catch (err) {
      setError(t('auth.errorSendCode'))
      setCaptchaVerified(false)
      setCaptchaReset(r => !r)
    } finally {
      setLoading(false)
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!code) return

    setLoading(true)
    setError('')
    try {
      const success = await register(formData.email, formData.name, code)
      if (success) {
        setStep('success')
        setTimeout(() => {
          navigate('/login')
        }, 2000)
      } else {
        setError(t('auth.errorCodeWrong'))
      }
    } catch (err) {
      setError(t('auth.errorRegisterFail'))
    } finally {
      setLoading(false)
    }
  }

  if (step === 'success') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 px-8 py-10">
            <div className="text-center">
              <CheckCircle className="w-20 h-20 text-white mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-white mb-2">{t('auth.registerSuccess')}</h1>
              <p className="text-green-100">{t('auth.registerSuccessDesc')}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-amber-600 to-orange-600 px-8 py-10">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white mb-2">{t('auth.registerTitle')}</h1>
            <p className="text-amber-100">{t('auth.registerSubtitle')}</p>
          </div>
        </div>

        <div className="px-8 py-8">
          {step === 'info' ? (
            <form onSubmit={handleSendCode} className="space-y-5">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  {t('auth.name')} <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={t('auth.namePlaceholder')}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  {t('auth.email')} <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder={t('auth.emailPlaceholder')}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  {t('auth.password')} <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder={t('auth.passwordPlaceholder')}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
                    required
                    minLength={6}
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  {t('auth.confirmPassword')} <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    placeholder={t('auth.confirmPasswordPlaceholder')}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
                    required
                    minLength={6}
                  />
                </div>
              </div>

              <SliderCaptcha
                onVerified={() => setCaptchaVerified(true)}
                reset={captchaReset}
              />

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading || !captchaVerified}
                className="w-full bg-gradient-to-r from-amber-600 to-orange-600 text-white py-3 rounded-lg font-medium hover:from-amber-700 hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
              >
                {loading ? (
                  <span>{t('auth.sendingCode')}</span>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    {t('auth.sendCode')}
                  </>
                )}
              </button>

              <div className="text-center text-sm text-gray-600">
                {t('auth.haveAccount')}
                <Link to="/login" className="text-amber-600 hover:text-amber-700 font-medium ml-1">
                  {t('auth.loginNow')}
                </Link>
              </div>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="space-y-5">
              <div className="bg-gray-50 border border-gray-200 px-4 py-3 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">{t('auth.email')}</p>
                <p className="text-gray-800 font-medium">{formData.email}</p>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  {t('auth.verificationCode')} <span className="text-red-500">*</span>
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
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep('info')}
                  className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                >
                  {t('auth.back')}
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-gradient-to-r from-amber-600 to-orange-600 text-white py-3 rounded-lg font-medium hover:from-amber-700 hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {loading ? t('auth.registering') : t('auth.register')}
                </button>
              </div>
            </form>
          )}

          <div className="mt-6 text-center text-xs text-gray-500">
            {t('auth.agreeText')}
            <Link to="/privacy" className="text-amber-600 hover:text-amber-700"> {t('auth.privacy')} </Link>
            {t('auth.and')}
            <Link to="/terms" className="text-amber-600 hover:text-amber-700"> {t('auth.terms')} </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage
