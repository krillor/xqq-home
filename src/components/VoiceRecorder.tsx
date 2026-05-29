import React, { useState, useRef } from 'react';
import { Mic, StopCircle, Play, Pause, Trash2 } from 'lucide-react';

interface VoiceRecorderProps {
  onRecordingComplete?: (audioBlob: Blob, duration: number) => void;
  className?: string;
}

const VoiceRecorder: React.FC<VoiceRecorderProps> = ({
  onRecordingComplete,
  className = ''
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const newAudioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const newAudioUrl = URL.createObjectURL(newAudioBlob);
        setAudioBlob(newAudioBlob);
        setAudioUrl(newAudioUrl);
        onRecordingComplete?.(newAudioBlob, duration);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setDuration(0);
      
      timerRef.current = setInterval(() => {
        setDuration(d => d + 1);
      }, 1000);
    } catch (err) {
      console.error('Failed to start recording:', err);
      alert('无法访问麦克风，请检查浏览器权限设置');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  };

  const togglePlayback = () => {
    if (!audioRef.current || !audioUrl) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const clearRecording = () => {
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
    }
    setAudioUrl(null);
    setAudioBlob(null);
    setDuration(0);
    setIsPlaying(false);
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`p-4 border-2 border-dashed border-gray-300 rounded-xl ${className}`}>
      {!audioUrl ? (
        <div className="text-center py-4">
          <button
            type="button"
            onClick={isRecording ? stopRecording : startRecording}
            className={`inline-flex items-center justify-center w-16 h-16 rounded-full transition-all
              ${isRecording 
                ? 'bg-red-100 text-red-600 animate-pulse' 
                : 'bg-amber-100 text-amber-600 hover:bg-amber-200'}`}
          >
            {isRecording ? <StopCircle className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
          </button>
          <p className="mt-3 text-sm text-gray-600">
            {isRecording ? `正在录音... ${formatDuration(duration)}` : '点击录音录制语音'}
          </p>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={togglePlayback}
            className="w-12 h-12 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center hover:bg-amber-200"
          >
            {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
          </button>
          <div className="flex-1">
            <div className="text-sm font-medium text-gray-700">
              录音已完成 - {formatDuration(duration)}
            </div>
            <audio 
              ref={audioRef} 
              src={audioUrl} 
              onEnded={() => setIsPlaying(false)}
              className="hidden"
            />
          </div>
          <button
            type="button"
            onClick={clearRecording}
            className="p-2 text-gray-400 hover:text-red-500"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default VoiceRecorder;
