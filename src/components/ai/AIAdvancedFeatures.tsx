import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  MicrophoneIcon,
  StopIcon,
  CameraIcon,
  CodeBracketIcon,
  PlayIcon,
  PauseIcon,
  EyeIcon,
  CpuChipIcon,
  SparklesIcon,
  RocketLaunchIcon,
  BeakerIcon,
  ChartBarIcon,
  CommandLineIcon,
  WindowIcon,
  GlobeAltIcon,
  LanguageIcon,
  VideoCameraIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
  HandRaisedIcon,
  UsersIcon,
  ShareIcon,
  LinkIcon,
  DocumentArrowUpIcon,
  FolderIcon,
  BookmarkIcon,
  HeartIcon,
  ChatBubbleLeftRightIcon,
  PresentationChartLineIcon
} from '@heroicons/react/24/outline';

interface AIAdvancedFeaturesProps {
  onVoiceInput: (text: string) => void;
  onImageAnalysis: (imageUrl: string) => void;
  onCodeExecution: (code: string, language: string) => void;
  onCollaboration: (sessionId: string) => void;
  onLanguageChange: (language: string) => void;
  onModelChange: (model: string) => void;
}

const AIAdvancedFeatures: React.FC<AIAdvancedFeaturesProps> = ({
  onVoiceInput,
  onImageAnalysis,
  onCodeExecution,
  onCollaboration,
  onLanguageChange,
  onModelChange
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeMode, setActiveMode] = useState<'voice' | 'vision' | 'code' | 'collaborative'>('voice');
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [selectedModel, setSelectedModel] = useState('gpt-4');
  const [isRealTime, setIsRealTime] = useState(false);
  const [isMultiModal, setIsMultiModal] = useState(true);
  const [isContextAware, setIsContextAware] = useState(true);
  const [isAdaptive, setIsAdaptive] = useState(true);
  const [isEmotional, setIsEmotional] = useState(true);
  const [isCreative, setIsCreative] = useState(true);
  const [isAnalytical, setIsAnalytical] = useState(true);
  const [isCollaborative, setIsCollaborative] = useState(true);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Spanish', flag: '🇪🇸' },
    { code: 'fr', name: 'French', flag: '🇫🇷' },
    { code: 'de', name: 'German', flag: '🇩🇪' },
    { code: 'it', name: 'Italian', flag: '🇮🇹' },
    { code: 'pt', name: 'Portuguese', flag: '🇵🇹' },
    { code: 'ru', name: 'Russian', flag: '🇷🇺' },
    { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
    { code: 'ko', name: 'Korean', flag: '🇰🇷' },
    { code: 'zh', name: 'Chinese', flag: '🇨🇳' },
    { code: 'ar', name: 'Arabic', flag: '🇸🇦' },
    { code: 'hi', name: 'Hindi', flag: '🇮🇳' },
  ];

  const aiModels = [
    { id: 'gpt-4', name: 'GPT-4 Turbo', description: 'Most advanced reasoning and creativity', icon: CpuChipIcon, color: 'text-blue-500' },
    { id: 'claude-3', name: 'Claude 3 Opus', description: 'Best for analysis and coding', icon: BeakerIcon, color: 'text-purple-500' },
    { id: 'gemini-pro', name: 'Gemini Pro', description: 'Excellent for multimodal tasks', icon: SparklesIcon, color: 'text-green-500' },
    { id: 'custom', name: 'Custom Model', description: 'Your specialized AI model', icon: CpuChipIcon, color: 'text-orange-500' },
  ];

  const handleVoiceInput = () => {
    if (!isRecording) {
      setIsRecording(true);
      setIsListening(true);
      
      // Simulate voice processing
      setTimeout(() => {
        setIsRecording(false);
        setIsListening(false);
        onVoiceInput('Can you explain the concept of machine learning in simple terms?');
      }, 3000);
    } else {
      setIsRecording(false);
      setIsListening(false);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files[0]) {
      const imageUrl = URL.createObjectURL(files[0]);
      onImageAnalysis(imageUrl);
    }
  };

  const handleCodeExecution = () => {
    const sampleCode = `def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

# Test the function
result = fibonacci(10)
print(f"Fibonacci of 10: {result}")`;

    onCodeExecution(sampleCode, 'python');
  };

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
    onLanguageChange(language);
  };

  const handleModelChange = (model: string) => {
    setSelectedModel(model);
    onModelChange(model);
  };

  const handleCollaboration = () => {
    const sessionId = Math.random().toString(36).substr(2, 9);
    onCollaboration(sessionId);
  };

  return (
    <div className="space-y-6">
      {/* AI Model Selection */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          AI Model Configuration
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {aiModels.map((model) => (
            <div
              key={model.id}
              onClick={() => handleModelChange(model.id)}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                selectedModel === model.id
                  ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                  : 'border-gray-200 dark:border-gray-700 hover:border-primary-300'
              }`}
            >
              <div className="flex items-center space-x-3">
                <model.icon className={`w-6 h-6 ${model.color}`} />
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">{model.name}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{model.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Advanced Features */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Advanced AI Features
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="flex items-center space-x-2">
              <EyeIcon className="w-5 h-5 text-blue-500" />
              <span className="text-sm font-medium">Multi-modal AI</span>
            </div>
            <button
              onClick={() => setIsMultiModal(!isMultiModal)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                isMultiModal ? 'bg-primary-600' : 'bg-gray-200'
              }`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                isMultiModal ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="flex items-center space-x-2">
                              <CpuChipIcon className="w-5 h-5 text-purple-500" />
              <span className="text-sm font-medium">Context Aware</span>
            </div>
            <button
              onClick={() => setIsContextAware(!isContextAware)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                isContextAware ? 'bg-primary-600' : 'bg-gray-200'
              }`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                isContextAware ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="flex items-center space-x-2">
              <RocketLaunchIcon className="w-5 h-5 text-green-500" />
              <span className="text-sm font-medium">Adaptive Learning</span>
            </div>
            <button
              onClick={() => setIsAdaptive(!isAdaptive)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                isAdaptive ? 'bg-primary-600' : 'bg-gray-200'
              }`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                isAdaptive ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="flex items-center space-x-2">
              <HeartIcon className="w-5 h-5 text-red-500" />
              <span className="text-sm font-medium">Emotional AI</span>
            </div>
            <button
              onClick={() => setIsEmotional(!isEmotional)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                isEmotional ? 'bg-primary-600' : 'bg-gray-200'
              }`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                isEmotional ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="flex items-center space-x-2">
              <SparklesIcon className="w-5 h-5 text-yellow-500" />
              <span className="text-sm font-medium">Creative Mode</span>
            </div>
            <button
              onClick={() => setIsCreative(!isCreative)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                isCreative ? 'bg-primary-600' : 'bg-gray-200'
              }`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                isCreative ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="flex items-center space-x-2">
              <ChartBarIcon className="w-5 h-5 text-indigo-500" />
              <span className="text-sm font-medium">Analytical</span>
            </div>
            <button
              onClick={() => setIsAnalytical(!isAnalytical)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                isAnalytical ? 'bg-primary-600' : 'bg-gray-200'
              }`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                isAnalytical ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>
        </div>
      </div>

      {/* Input Modes */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Input Modes
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button
            onClick={() => setActiveMode('voice')}
            className={`p-4 rounded-lg border-2 transition-all ${
              activeMode === 'voice'
                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                : 'border-gray-200 dark:border-gray-700 hover:border-primary-300'
            }`}
          >
            <div className="text-center">
              <MicrophoneIcon className="w-8 h-8 mx-auto mb-2 text-primary-600" />
              <span className="text-sm font-medium">Voice Input</span>
            </div>
          </button>

          <button
            onClick={() => setActiveMode('vision')}
            className={`p-4 rounded-lg border-2 transition-all ${
              activeMode === 'vision'
                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                : 'border-gray-200 dark:border-gray-700 hover:border-primary-300'
            }`}
          >
            <div className="text-center">
              <CameraIcon className="w-8 h-8 mx-auto mb-2 text-primary-600" />
              <span className="text-sm font-medium">Visual Analysis</span>
            </div>
          </button>

          <button
            onClick={() => setActiveMode('code')}
            className={`p-4 rounded-lg border-2 transition-all ${
              activeMode === 'code'
                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                : 'border-gray-200 dark:border-gray-700 hover:border-primary-300'
            }`}
          >
            <div className="text-center">
              <CodeBracketIcon className="w-8 h-8 mx-auto mb-2 text-primary-600" />
              <span className="text-sm font-medium">Code Execution</span>
            </div>
          </button>

          <button
            onClick={() => setActiveMode('collaborative')}
            className={`p-4 rounded-lg border-2 transition-all ${
              activeMode === 'collaborative'
                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                : 'border-gray-200 dark:border-gray-700 hover:border-primary-300'
            }`}
          >
            <div className="text-center">
              <UsersIcon className="w-8 h-8 mx-auto mb-2 text-primary-600" />
              <span className="text-sm font-medium">Collaborative</span>
            </div>
          </button>
        </div>
      </div>

      {/* Language Selection */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Language Support
        </h3>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => handleLanguageChange(language.code)}
              className={`p-3 rounded-lg border-2 transition-all ${
                selectedLanguage === language.code
                  ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                  : 'border-gray-200 dark:border-gray-700 hover:border-primary-300'
              }`}
            >
              <div className="text-center">
                <div className="text-2xl mb-1">{language.flag}</div>
                <span className="text-xs font-medium">{language.name}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Quick Actions
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button
            onClick={handleVoiceInput}
            disabled={isRecording}
            className="btn btn-primary flex items-center space-x-2"
          >
            {isRecording ? (
              <StopIcon className="w-4 h-4" />
            ) : (
              <MicrophoneIcon className="w-4 h-4" />
            )}
            <span>{isRecording ? 'Stop' : 'Voice'}</span>
          </button>

          <button
            onClick={() => fileInputRef.current?.click()}
            className="btn btn-outline flex items-center space-x-2"
          >
            <CameraIcon className="w-4 h-4" />
            <span>Upload Image</span>
          </button>

          <button
            onClick={handleCodeExecution}
            className="btn btn-outline flex items-center space-x-2"
          >
            <PlayIcon className="w-4 h-4" />
            <span>Run Code</span>
          </button>

          <button
            onClick={handleCollaboration}
            className="btn btn-outline flex items-center space-x-2"
          >
            <ShareIcon className="w-4 h-4" />
            <span>Collaborate</span>
          </button>
        </div>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,video/*"
        onChange={handleImageUpload}
        className="hidden"
      />
    </div>
  );
};

export default AIAdvancedFeatures; 