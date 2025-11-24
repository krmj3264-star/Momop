import React, { useRef, useState, useEffect } from 'react';

interface AnalysisInputProps {
  textValue: string;
  onTextChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: () => void;
  loading: boolean;
  inputType: 'text' | 'image';
  onImageSelect: (file: File) => void;
  onBase64ImageCapture: (base64: string, mimeType: string) => void;
  selectedImage: string | null;
  onBackToTextMode: () => void;
}

const blobToBase64 = (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        // Extracting only the base64 part (after "data:image/jpeg;base64,")
        const base64String = reader.result.split(',')[1];
        resolve(base64String);
      } else {
        reject(new Error("Failed to convert blob to base64."));
      }
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

const AnalysisInput: React.FC<AnalysisInputProps> = ({
  textValue,
  onTextChange,
  onSubmit,
  loading,
  inputType,
  onImageSelect,
  onBase64ImageCapture,
  selectedImage,
  onBackToTextMode,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    if (isCameraActive) {
      async function setupCamera() {
        try {
          const newStream = await navigator.mediaDevices.getUserMedia({ video: true });
          setStream(newStream);
          if (videoRef.current) {
            videoRef.current.srcObject = newStream;
            videoRef.current.play();
          }
        } catch (err) {
          console.error("Error accessing camera:", err);
          alert("تعذر الوصول إلى الكاميرا. يرجى التأكد من منح الإذن.");
          setIsCameraActive(false);
        }
      }
      setupCamera();
    } else {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
        setStream(null);
      }
    }
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [isCameraActive]);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      onImageSelect(file);
    }
  };

  const handleCapturePhoto = async () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        canvas.toBlob(async (blob) => {
          if (blob) {
            try {
              const base64Data = await blobToBase64(blob);
              onBase64ImageCapture(base64Data, 'image/jpeg'); // Assuming JPEG for camera capture
              setIsCameraActive(false);
            } catch (error) {
              console.error("Error converting captured image to base64:", error);
              alert("حدث خطأ أثناء معالجة الصورة الملتقطة.");
            }
          }
        }, 'image/jpeg', 0.9); // 0.9 quality for JPEG
      }
    }
  };

  const isSubmitEnabled = () => {
    if (loading) return false;
    if (inputType === 'text') {
      return textValue.trim() !== '';
    } else { // image input type
      return selectedImage !== null;
    }
  };

  if (isCameraActive) {
    return (
      <div className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center">
        <video ref={videoRef} className="w-full h-full object-cover" autoPlay playsInline muted></video>
        <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
        <button
          onClick={handleCapturePhoto}
          className="absolute bottom-10 w-20 h-20 rounded-full bg-white flex items-center justify-center border-4 border-gray-400 shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-500"
          aria-label="التقاط صورة"
        >
          <div className="w-16 h-16 rounded-full bg-red-500"></div>
        </button>
        <button
          onClick={() => setIsCameraActive(false)}
          className="absolute top-8 right-8 text-white text-3xl p-2 rounded-full bg-gray-700 bg-opacity-50"
          aria-label="إغلاق الكاميرا"
        >
          &times;
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 p-4 md:p-6 bg-white shadow-lg rounded-lg">
      <div className="flex justify-between items-center">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 text-center flex-grow">
          {inputType === 'text' ? 'أدخل مكونات المنتج الغذائي' : 'تحليل عبر كاميرا أو رفع صورة'}
        </h2>
        {inputType === 'image' && (
          <button
            onClick={onBackToTextMode}
            className="px-4 py-2 text-sm bg-gray-100 rounded-md text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
            aria-label="العودة إلى إدخال النص"
          >
            إدخال نص
          </button>
        )}
      </div>

      <p className="text-gray-600 text-center text-sm md:text-base">
        {inputType === 'text'
          ? 'قم بلصق قائمة المكونات من ملصق المنتج أو اكتبها هنا. (على سبيل المثال: سكر، دقيق، زيت النخيل...)'
          : 'اختر صورة من معرض الصور أو التقط صورة لمكونات المنتج.'}
      </p>

      {inputType === 'text' ? (
        <textarea
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-y min-h-[150px] text-gray-800"
          placeholder="أدخل المكونات هنا..."
          value={textValue}
          onChange={onTextChange}
          rows={6}
          disabled={loading}
          aria-label="مربع إدخال المكونات"
        ></textarea>
      ) : (
        <div className="flex flex-col items-center justify-center p-4 border border-dashed border-gray-300 rounded-md min-h-[150px]">
          {selectedImage ? (
            <div className="relative">
              <img src={`data:image/jpeg;base64,${selectedImage}`} alt="Selected ingredients" className="max-h-60 max-w-full object-contain rounded-md shadow-md" />
              <button
                onClick={() => onImageSelect(null as any)} // Pass null to clear image
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 text-xs focus:outline-none"
                aria-label="إزالة الصورة"
              >
                &times;
              </button>
            </div>
          ) : (
            <>
              <p className="text-gray-500 mb-4">لا توجد صورة محددة</p>
              <div className="flex gap-4">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  disabled={loading}
                  aria-label="اختيار صورة من الملفات"
                >
                  اختيار صورة
                </button>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                  disabled={loading}
                  aria-label="إدخال ملف الصورة"
                />
                <button
                  onClick={() => setIsCameraActive(true)}
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                  disabled={loading}
                  aria-label="التقاط صورة بالكاميرا"
                >
                  التقاط صورة
                </button>
              </div>
            </>
          )}
        </div>
      )}

      <button
        onClick={onSubmit}
        disabled={!isSubmitEnabled()}
        className={`w-full py-3 px-6 rounded-md text-white font-semibold text-lg transition-all duration-300
                    ${isSubmitEnabled() && !loading ? 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800' : 'bg-blue-300 cursor-not-allowed'}
                    disabled:opacity-70 disabled:cursor-not-allowed`}
        aria-live="polite"
        aria-atomic="true"
      >
        {loading ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin h-5 w-5 ml-3 text-white" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            تحليل...
          </span>
        ) : (
          'تحليل المكونات'
        )}
      </button>
    </div>
  );
};

export default AnalysisInput;