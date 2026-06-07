import React, { useRef, useState, useCallback, useEffect } from 'react'
import { ChevronsRight, CheckCircle2, ShieldCheck } from 'lucide-react'

interface SliderCaptchaProps {
  onVerified: () => void
  reset?: boolean
}

const THRESHOLD = 0.88 // 滑到 88% 即视为成功

const SliderCaptcha: React.FC<SliderCaptchaProps> = ({ onVerified, reset }) => {
  const trackRef = useRef<HTMLDivElement>(null)
  const [dragging, setDragging] = useState(false)
  const [offset, setOffset] = useState(0)
  const [verified, setVerified] = useState(false)
  const startXRef = useRef(0)

  // 外部触发重置
  useEffect(() => {
    if (reset) {
      setOffset(0)
      setVerified(false)
    }
  }, [reset])

  const getTrackWidth = () => (trackRef.current?.clientWidth ?? 300) - 48 // 48 = thumb width

  const handleStart = useCallback((clientX: number) => {
    if (verified) return
    setDragging(true)
    startXRef.current = clientX
  }, [verified])

  const handleMove = useCallback((clientX: number) => {
    if (!dragging || verified) return
    const delta = clientX - startXRef.current
    const max = getTrackWidth()
    const next = Math.max(0, Math.min(delta, max))
    setOffset(next)
    if (next / max >= THRESHOLD) {
      setVerified(true)
      setDragging(false)
      setOffset(max)
      onVerified()
    }
  }, [dragging, verified, onVerified])

  const handleEnd = useCallback(() => {
    if (!verified) {
      setOffset(0)
    }
    setDragging(false)
  }, [verified])

  // Mouse events
  useEffect(() => {
    if (!dragging) return
    const onMove = (e: MouseEvent) => handleMove(e.clientX)
    const onUp = () => handleEnd()
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
  }, [dragging, handleMove, handleEnd])

  // Touch events
  useEffect(() => {
    if (!dragging) return
    const onMove = (e: TouchEvent) => handleMove(e.touches[0].clientX)
    const onEnd = () => handleEnd()
    window.addEventListener('touchmove', onMove)
    window.addEventListener('touchend', onEnd)
    return () => {
      window.removeEventListener('touchmove', onMove)
      window.removeEventListener('touchend', onEnd)
    }
  }, [dragging, handleMove, handleEnd])

  const progress = getTrackWidth() > 0 ? offset / getTrackWidth() : 0

  return (
    <div className="w-full">
      <div
        ref={trackRef}
        className={`relative h-12 rounded-xl overflow-hidden select-none border transition-colors ${
          verified
            ? 'border-green-400 bg-green-50'
            : 'border-gray-200 bg-gray-100'
        }`}
      >
        {/* 进度填充 */}
        <div
          className={`absolute left-0 top-0 h-full rounded-xl transition-colors duration-150 ${
            verified ? 'bg-green-400' : 'bg-amber-200'
          }`}
          style={{ width: `${offset + 48}px` }}
        />

        {/* 提示文字 */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {verified ? (
            <span className="flex items-center gap-1.5 text-sm font-medium text-green-700">
              <CheckCircle2 className="w-4 h-4" /> 验证通过
            </span>
          ) : (
            <span className="text-sm text-gray-400 font-medium">
              {dragging ? '继续向右滑动…' : '拖动滑块完成验证'}
            </span>
          )}
        </div>

        {/* 滑块 */}
        <div
          className={`absolute top-0 h-full w-12 flex items-center justify-center cursor-grab rounded-xl shadow-md transition-colors ${
            verified
              ? 'bg-green-500 cursor-default'
              : dragging
              ? 'bg-amber-500 cursor-grabbing'
              : 'bg-amber-500 hover:bg-amber-600'
          }`}
          style={{ left: `${offset}px` }}
          onMouseDown={(e) => { e.preventDefault(); handleStart(e.clientX) }}
          onTouchStart={(e) => { e.preventDefault(); handleStart(e.touches[0].clientX) }}
        >
          {verified ? (
            <ShieldCheck className="w-5 h-5 text-white" />
          ) : (
            <ChevronsRight className={`w-5 h-5 text-white transition-opacity ${progress > 0.1 ? 'opacity-50' : 'opacity-100'}`} />
          )}
        </div>
      </div>

      {!verified && (
        <p className="text-xs text-gray-400 mt-1.5 text-center">
          向右拖动滑块以证明您是真人
        </p>
      )}
    </div>
  )
}

export default SliderCaptcha
