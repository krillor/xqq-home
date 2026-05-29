import React, { useRef } from 'react'
import { Download } from 'lucide-react'

interface ShareImageGeneratorProps {
  postData: {
    title: string
    description: string
    surname?: string
    originRegion?: string
    targetRegion?: string
    photos?: string[]
  }
}

const ShareImageGenerator: React.FC<ShareImageGeneratorProps> = ({ postData }) => {
  const containerRef = useRef<HTMLDivElement>(null)

  const handleGenerateImage = () => {
    alert('生成长图片功能（演示）\n在实际应用中，需要使用html2canvas或类似库生成图片')
  }

  return (
    <div className="mt-8">
      <div
        ref={containerRef}
        className="bg-gradient-to-br from-amber-50 to-orange-50 p-8 rounded-2xl border-2 border-dashed border-orange-200"
      >
        <div className="bg-white p-8 rounded-xl shadow-md max-w-md mx-auto">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-white font-bold text-xl">寻</span>
            </div>
            <h1 className="text-2xl font-bold text-[#5D4037]">寻亲桥</h1>
            <p className="text-gray-500 text-sm mt-1">跨越山海，连接血脉亲情</p>
          </div>
          
          <div className="border-t border-gray-200 pt-6 mt-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">{postData.title}</h2>
            
            {postData.surname && (
              <div className="mb-3">
                <span className="text-gray-500 text-sm">姓氏：</span>
                <span className="text-gray-800 font-medium">{postData.surname}</span>
              </div>
            )}
            
            {postData.originRegion && (
              <div className="mb-3">
                <span className="text-gray-500 text-sm">祖籍/出发地：</span>
                <span className="text-gray-800 font-medium">{postData.originRegion}</span>
              </div>
            )}
            
            {postData.targetRegion && (
              <div className="mb-3">
                <span className="text-gray-500 text-sm">目的地：</span>
                <span className="text-gray-800 font-medium">{postData.targetRegion}</span>
              </div>
            )}
            
            {postData.description && (
              <div className="mt-4 p-4 bg-amber-50 rounded-lg">
                <p className="text-gray-700 text-sm leading-relaxed">{postData.description}</p>
              </div>
            )}
            
            {postData.photos && postData.photos.length > 0 && (
              <div className="mt-4 grid grid-cols-3 gap-2">
                {postData.photos.slice(0, 3).map((photo, index) => (
                  <img key={index} src={photo} alt={`照片${index + 1}`} className="w-full h-20 object-cover rounded-lg" />
                ))}
              </div>
            )}
          </div>
        </div>
        
        <div className="text-center mt-6 pt-4 border-t border-gray-200">
          <p className="text-gray-400 text-xs">如有相关线索，请联系寻亲桥平台</p>
          <p className="text-gray-400 text-xs mt-1">www.xunqinbridge.com</p>
        </div>
      </div>
      
      <button
        onClick={handleGenerateImage}
        className="mt-6 w-full py-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-xl font-medium hover:from-amber-700 hover:to-orange-700 transition-colors flex items-center justify-center gap-2"
      >
        <Download className="w-5 h-5" />
        一键生成长图片
      </button>
    </div>
  )
}

export default ShareImageGenerator
