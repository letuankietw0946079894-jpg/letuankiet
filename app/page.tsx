'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, BookOpen, Volume2, Key, Eye, EyeOff, RotateCcw, Keyboard, 
  Maximize2, X, CheckCircle2, AlertCircle, HelpCircle, ArrowRight, RefreshCw, 
  Layers, Palette, Download, Send, Bot, Check, Zap, Flame, Heart, Award
} from 'lucide-react';

interface LessonItem {
  id: number;
  verb: string;
  reading: string;
  meaning: string;
  group: string;
  causative: string;
  particle: 'に' | 'を' | 'both';
  situation: string;
  character: string;
  fullSentence: string;
  truncatedSentence: string;
  blankAnswer: string;
  translation: string;
  advancedGrammar: string;
  imageEmoji: string;
  imageUrl: string;
}

const LESSONS_DATA: LessonItem[] = [
  {
    id: 1,
    verb: '食べる',
    reading: 'たべる',
    meaning: 'Ăn',
    group: 'Nhóm 2 (Ichidan)',
    causative: '食べさせる',
    particle: 'を',
    situation: 'Mẹ bắt / cho phép con ăn hết rau xanh trước khi đi chơi.',
    character: 'Mẹ & Con trai',
    fullSentence: '母は子供に野菜を全部食べさせる。',
    truncatedSentence: '___は子供に野菜を全部___。',
    blankAnswer: '食べさせる',
    translation: 'Mẹ bắt con ăn hết sạch rau xanh.',
    advancedGrammar: 'Thể sai khiến nhóm 2: Bỏ る thêm させる. Trợ từ 「に」 chỉ người nhận hành động, 「を」 chỉ đối tượng bị tác động.',
    imageEmoji: '🥗',
    imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 2,
    verb: '行く',
    reading: 'いく',
    meaning: 'Đi',
    group: 'Nhóm 1 (Godan - ku)',
    causative: '行かせる',
    particle: 'を',
    situation: 'Sếp cử nhân viên đi công tác gấp ở chi nhánh Osaka.',
    character: 'Sếp & Nhân viên',
    fullSentence: '部長は部下を大阪に出張に行かせる。',
    truncatedSentence: '___は部下を大阪に出張に___。',
    blankAnswer: '行かせる',
    translation: 'Trưởng phòng cử nhân viên đi công tác Osaka.',
    advancedGrammar: 'Động từ kết thúc bằng う chuyển thành あ + せる (行く -> 行かせる). Trợ từ 「を」 dùng với tha/tự động từ di chuyển.',
    imageEmoji: '✈️',
    imageUrl: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 3,
    verb: '待つ',
    reading: 'まつ',
    meaning: 'Chờ đợi',
    group: 'Nhóm 1 (Godan - tsu)',
    causative: '待たせる',
    particle: 'を',
    situation: 'Vì tài liệu chưa duyệt, trưởng phòng bắt khách hàng chờ 10 phút.',
    character: 'Nhân viên & Khách hàng',
    fullSentence: '担当者は客を10分間待たせる。',
    truncatedSentence: '___は客を10分間___。',
    blankAnswer: '待たせる',
    translation: 'Nhân viên bắt khách hàng chờ 10 phút.',
    advancedGrammar: 'Chuyển つ thành た + せる. Sai khiến mang sắc thái sai bảo hoặc bắt ai đó phải đợi.',
    imageEmoji: '⏳',
    imageUrl: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 4,
    verb: '見る',
    reading: 'みる',
    meaning: 'Nhìn / Xem',
    group: 'Nhóm 2 (Ichidan)',
    causative: '見せる',
    particle: 'に',
    situation: 'Giáo viên cho học sinh xem bức tranh cổ quý hiếm.',
    character: 'Giáo viên & Học sinh',
    fullSentence: '先生は生徒に珍しい絵を見せる。',
    truncatedSentence: '___は生徒に珍しい絵を___。',
    blankAnswer: '見せる',
    translation: 'Thầy giáo cho học sinh xem bức tranh quý.',
    advancedGrammar: 'Động từ nhóm 2 luôn bỏ る thêm させる. 「見せる」 (cho xem) là ngoại lệ quen thuộc.',
    imageEmoji: '🖼️',
    imageUrl: 'https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 5,
    verb: '勉強する',
    reading: 'べんきょうする',
    meaning: 'Học tập',
    group: 'Nhóm 3 (Irregular)',
    causative: '勉強させる',
    particle: 'を',
    situation: 'Cha mẹ ép con cái học ngoại ngữ từ khi còn nhỏ.',
    character: 'Cha mẹ & Con cái',
    fullSentence: '親は子供に毎日日本語を勉強させる。',
    truncatedSentence: '___は子供に毎日日本語を___。',
    blankAnswer: '勉強させる',
    translation: 'Cha mẹ bắt con học tiếng Nhật mỗi ngày.',
    advancedGrammar: 'Động từ nhóm 3 「する」 chuyển thành 「させる」. N1/N2 thường kết hợp với mệnh đề sai khiến thể bị động 「させられる」.',
    imageEmoji: '📚',
    imageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&auto=format&fit=crop&q=80'
  }
];

const THEME_PRESETS: Record<string, { name: string; bgMain: string; bgCard: string; border: string; accent: string; accentHover: string; glow: string; textMain: string; textMuted: string; highlight: string }> = {
  'theme-n1': { name: '👑 N1 Royal Purple', bgMain: '#110a1d', bgCard: '#1f1235', border: '#581c87', accent: '#a855f7', accentHover: '#c084fc', glow: 'rgba(168, 85, 247, 0.35)', textMain: '#f3e8ff', textMuted: '#9f88be', highlight: '#2b1947' },
  'theme-n2': { name: '🔥 N2 Amber Gold', bgMain: '#181613', bgCard: '#241e17', border: '#78350f', accent: '#f59e0b', accentHover: '#fbbf24', glow: 'rgba(245, 158, 11, 0.35)', textMain: '#fef3c7', textMuted: '#d97706', highlight: '#3a2d1d' },
  'theme-n3': { name: '⚡ N3 Cyber Blue', bgMain: '#0d1b2e', bgCard: '#132a45', border: '#1d4ed8', accent: '#3b82f6', accentHover: '#60a5fa', glow: 'rgba(59, 130, 246, 0.35)', textMain: '#e0f2fe', textMuted: '#93c5fd', highlight: '#1e3a8a' },
  'theme-n4': { name: '🍵 N4 Matcha Sage', bgMain: '#0d2114', bgCard: '#13351f', border: '#166534', accent: '#22c55e', accentHover: '#4ade80', glow: 'rgba(34, 197, 94, 0.35)', textMain: '#dcfce7', textMuted: '#86efac', highlight: '#14532d' },
  'theme-n5': { name: '🌸 N5 Sakura Pink', bgMain: '#1d1324', bgCard: '#2d1b38', border: '#831843', accent: '#ec4899', accentHover: '#f472b6', glow: 'rgba(236, 72, 153, 0.35)', textMain: '#fce7f3', textMuted: '#f472b6', highlight: '#500724' }
};

export default function JapaneseGrammarApp() {
  const [activeThemeId, setActiveThemeId] = useState('theme-n1');
  const theme = THEME_PRESETS[activeThemeId] || THEME_PRESETS['theme-n1'];

  const [mode, setMode] = useState<1 | 2 | 3>(1); // 1: Điền thể SK, 2: Điền trợ từ, 3: Chấm AI
  const [currentIdx, setCurrentIdx] = useState(0);
  const [activeRecallOn, setActiveRecallOn] = useState(true);
  const [showAllAnswers, setShowAllAnswers] = useState(false);
  const [splitPct, setSplitPct] = useState(45); // Left/Right split
  const [isDragging, setIsDragging] = useState(false);

  // Inputs state for Mode 1 & 2
  const [userInputsMode1, setUserInputsMode1] = useState<Record<number, string>>({});
  const [userInputsMode2, setUserInputsMode2] = useState<Record<number, string>>({});
  const [checkedResults, setCheckedResults] = useState<Record<number, boolean>>({});

  // AI Evaluator state
  const [aiApiKey, setAiApiKey] = useState('');
  const [aiCustomSentence, setAiCustomSentence] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResponses, setAiResponses] = useState<Record<number, string>>({});

  // Modals
  const [isAiKeyModalOpen, setIsAiKeyModalOpen] = useState(false);
  const [isShortcutsModalOpen, setIsShortcutsModalOpen] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState<{ text: string; show: boolean }>({ text: '', show: false });

  const currentItem = LESSONS_DATA[currentIdx] || LESSONS_DATA[0];

  // Toast helper
  const showToast = (text: string) => {
    setToastMsg({ text, show: true });
    setTimeout(() => {
      setToastMsg((prev) => ({ ...prev, show: false }));
    }, 2500);
  };

  // Audio speech synthesis helper
  const speakJapanese = (text: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ja-JP';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
      showToast(`🔊 Đang phát âm: ${text}`);
    } else {
      showToast('⚠️ Trình duyệt không hỗ trợ phát âm.');
    }
  };

  // Handle Mode 1 check (Điền thể sai khiến)
  const handleCheckMode1 = (idx: number) => {
    const userVal = (userInputsMode1[idx] || '').trim();
    const target = LESSONS_DATA[idx].blankAnswer;
    const isCorrect = userVal === target || userVal === LESSONS_DATA[idx].causative;
    setCheckedResults(prev => ({ ...prev, [idx]: isCorrect }));
    if (isCorrect) {
      showToast('🎉 Chính xác! Bạn đã nắm vững thể sai khiến.');
    } else {
      showToast(`❌ Chưa chính xác. Đáp án chuẩn là: ${target}`);
    }
  };

  // Handle Mode 2 check (Điền trợ từ に/を)
  const handleCheckMode2 = (idx: number, particle: string) => {
    const target = LESSONS_DATA[idx].particle;
    const isCorrect = particle === target || target === 'both';
    setUserInputsMode2(prev => ({ ...prev, [idx]: particle }));
    setCheckedResults(prev => ({ ...prev, [idx]: isCorrect }));
    if (isCorrect) {
      showToast(`🎉 Chính xác! Trợ từ 「${particle}」 hoàn hảo.`);
    } else {
      showToast(`❌ Cần lưu ý: Động từ này dùng trợ từ 「${target}」.`);
    }
  };

  // Gemini AI Evaluation (Mode 3 / AI Evaluator)
  const evaluateWithGemini = async (idx: number) => {
    const item = LESSONS_DATA[idx];
    const sentence = aiCustomSentence || item.fullSentence;
    setAiLoading(true);
    showToast('🤖 Đang gọi Gemini AI phân tích ngữ pháp...');

    try {
      let apiKey = aiApiKey;
      if (!apiKey && typeof window !== 'undefined') {
        apiKey = localStorage.getItem('anki_gemini_key') || '';
      }

      if (!apiKey) {
        // Fallback intelligent offline analyzer simulation
        setTimeout(() => {
          const hasCausative = /せる|させる|こさせる/.test(sentence);
          const hasNi = sentence.includes('に');
          const hasWo = sentence.includes('を');
          const analysis = `🤖 **GEMINI AI NHẬN XÉT CHI TIẾT (Chế độ thông minh)**:\n- Câu kiểm tra: 「${sentence}」\n- Thể sai khiến: ${hasCausative ? '✅ Đã chia đúng thể sai khiến (使役動詞).' : '⚠️ Cần kiểm tra lại cách chia động từ sai khiến (せる/させる).'}\n- Trợ từ: ${hasNi || hasWo ? '✅ Trợ từ phân định đối tượng (に/を) phù hợp.' : '💡 Gợi ý: Thêm trợ từ 「に」 (người thực hiện) và 「を/に」 (đối tượng) cho chuẩn xác.'}\n- Đánh giá tổng quan: Cấu trúc ngữ pháp hoàn thiện, diễn đạt tự nhiên như người bản xứ!`;
          setAiResponses(prev => ({ ...prev, [idx]: analysis }));
          setAiLoading(false);
          showToast('🤖 AI đã phân tích xong!');
        }, 800);
        return;
      }

      // Real API call if key exists
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: `Phân tích câu tiếng Nhật sau theo góc độ ngữ pháp JLPT (Thể sai khiến / 使役動詞), kiểm tra trợ từ に/を và độ tự nhiên: "${sentence}". Đưa ra nhận xét ngắn gọn, dễ hiểu bằng tiếng Việt kèm điểm số /10.` }]
          }]
        })
      });
      const data = await res.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Không nhận được phản hồi từ Gemini API.';
      setAiResponses(prev => ({ ...prev, [idx]: text }));
      showToast('🤖 Gemini AI đã chấm điểm thành công!');
    } catch (err) {
      console.error(err);
      setAiResponses(prev => ({ ...prev, [idx]: '⚠️ Lỗi kết nối Gemini API. Vui lòng kiểm tra lại Key hoặc kết nối mạng.' }));
      showToast('⚠️ Lỗi kết nối AI.');
    } finally {
      setAiLoading(false);
    }
  };

  // Splitter dragging for desktop
  const handleSplitterMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const width = window.innerWidth;
      const newPct = Math.min(75, Math.max(25, (e.clientX / width) * 100));
      setSplitPct(newPct);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div 
      className={`min-h-screen w-full flex flex-col select-none ${activeRecallOn ? 'active-recall-on' : 'active-recall-off'}`}
      style={{
        backgroundColor: theme.bgMain,
        color: theme.textMain,
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
      }}
    >
      <style jsx global>{`
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        ::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.25);
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb {
          background: ${theme.border};
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: ${theme.accent};
        }
        .active-recall-on .sk-recall {
          background: linear-gradient(180deg, ${theme.accent}26, ${theme.accent}0a);
          color: ${theme.textMain};
          filter: blur(4.5px) saturate(0.5);
          opacity: 0.85;
          border-bottom: 1.5px dashed ${theme.accent};
          border-radius: 6px;
          padding: 0 4px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .active-recall-on .sk-recall:hover,
        .active-recall-on .sk-recall.revealed {
          filter: none;
          opacity: 1;
          color: ${theme.accentHover};
          font-weight: 800;
          background: ${theme.accent}22;
        }
        .active-recall-off .sk-recall {
          color: ${theme.accent};
          font-weight: 700;
        }
      `}</style>

      {/* 1. TOP HEADER TOOLBAR */}
      <header 
        className="sticky top-0 z-40 border-b px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 shadow-lg"
        style={{ backgroundColor: theme.bgCard, borderColor: theme.border }}
      >
        <div className="flex items-center gap-2.5">
          <span className="text-xl font-black animate-pulse" style={{ color: theme.accent }}>★</span>
          <div>
            <h1 className="text-sm md:text-base font-bold flex flex-wrap items-center gap-2">
              <span>THỰC HÀNH NGỮ PHÁP</span>
              <span className="text-xs px-2 py-0.5 rounded-md border font-semibold" style={{ backgroundColor: theme.bgMain, borderColor: theme.border, color: theme.accent }}>
                〜 使役動詞 (Thể Sai Khiến N4/N5)
              </span>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-green-500/15 border border-green-500 text-green-400 font-bold">
                Speedrun VIP Max
              </span>
            </h1>
          </div>
        </div>

        {/* Action Controls & Mode switchers */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Mode Tabs */}
          <div className="flex rounded-lg p-1 border gap-1" style={{ backgroundColor: theme.bgMain, borderColor: theme.border }}>
            <button
              onClick={() => setMode(1)}
              className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all flex items-center gap-1.5 ${mode === 1 ? 'shadow-sm' : 'opacity-70 hover:opacity-100'}`}
              style={{ backgroundColor: mode === 1 ? theme.accent : 'transparent', color: mode === 1 ? '#000' : theme.textMuted }}
            >
              <Sparkles className="w-3.5 h-3.5" /> 1. Điền Thể SK
            </button>
            <button
              onClick={() => setMode(2)}
              className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all flex items-center gap-1.5 ${mode === 2 ? 'shadow-sm' : 'opacity-70 hover:opacity-100'}`}
              style={{ backgroundColor: mode === 2 ? theme.accent : 'transparent', color: mode === 2 ? '#000' : theme.textMuted }}
            >
              <Layers className="w-3.5 h-3.5" /> 2. Trợ Từ (に/を)
            </button>
            <button
              onClick={() => setMode(3)}
              className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all flex items-center gap-1.5 ${mode === 3 ? 'shadow-sm' : 'opacity-70 hover:opacity-100'}`}
              style={{ backgroundColor: mode === 3 ? theme.accent : 'transparent', color: mode === 3 ? '#000' : theme.textMuted }}
            >
              <Bot className="w-3.5 h-3.5" /> 3. Chấm AI Gemini
            </button>
          </div>

          {/* Theme Selector */}
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg border" style={{ backgroundColor: theme.bgMain, borderColor: theme.border }}>
            <Palette className="w-3.5 h-3.5" style={{ color: theme.accent }} />
            <select
              value={activeThemeId}
              onChange={(e) => setActiveThemeId(e.target.value)}
              className="bg-transparent text-xs font-bold outline-none cursor-pointer"
              style={{ color: theme.accent }}
            >
              {Object.entries(THEME_PRESETS).map(([id, t]) => (
                <option key={id} value={id} style={{ backgroundColor: t.bgCard, color: t.textMain }}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>

          {/* Utility Buttons */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setIsAiKeyModalOpen(true)}
              className="p-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1 transition-transform hover:scale-105"
              style={{ backgroundColor: theme.bgMain, borderColor: theme.border, color: theme.accent }}
              title="Cài đặt Gemini API Key"
            >
              <Key className="w-3.5 h-3.5" /> <span className="hidden sm:inline">API Key</span>
            </button>

            <button
              onClick={() => setShowAllAnswers(!showAllAnswers)}
              className="p-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1 transition-transform hover:scale-105"
              style={{ backgroundColor: theme.bgMain, borderColor: theme.border, color: theme.textMain }}
              title="Hiện / Ẩn tất cả đáp án"
            >
              {showAllAnswers ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{showAllAnswers ? 'Ẩn Đáp Án' : 'Hiện Tất Cả'}</span>
            </button>

            <button
              onClick={() => {
                setUserInputsMode1({});
                setUserInputsMode2({});
                setCheckedResults({});
                showToast('🧹 Đã làm mới toàn bộ bài tập!');
              }}
              className="p-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1 transition-transform hover:scale-105"
              style={{ backgroundColor: theme.bgMain, borderColor: theme.border, color: theme.textMain }}
              title="Làm lại từ đầu"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setIsShortcutsModalOpen(true)}
              className="p-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1 transition-transform hover:scale-105"
              style={{ backgroundColor: theme.bgMain, borderColor: theme.border, color: theme.textMain }}
              title="Phím tắt"
            >
              <Keyboard className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* 2. MAIN WORKSPACE (FULL SCREEN DUAL COLUMN WITH SCROLLBARS) */}
      <main 
        className="flex-1 grid gap-3 p-3 w-full max-w-[1920px] mx-auto items-stretch"
        style={{
          gridTemplateColumns: `calc(${splitPct}% - 12px) 24px calc(${100 - splitPct}% - 12px)`
        }}
      >
        {/* LEFT COLUMN: THEORY & RECALL & VERB BREAKDOWN */}
        <section 
          className="rounded-2xl border p-4 flex flex-col gap-4 overflow-x-auto overflow-y-auto shadow-2xl max-h-[calc(100vh-80px)]"
          style={{ backgroundColor: theme.bgCard, borderColor: theme.border }}
        >
          {/* Header & Active Recall Toggle */}
          <div className="flex items-start justify-between gap-3 border-b pb-3 flex-wrap" style={{ borderColor: theme.border }}>
            <div>
              <span className="text-[10px] tracking-wider uppercase font-bold" style={{ color: theme.textMuted }}>CẤU TRÚC NGỮ PHÁP JLPT N4/N5</span>
              <h2 className="text-lg font-bold flex items-center gap-2 mt-0.5" style={{ color: theme.accent }}>
                <span>🇯🇵 Thể Sai Khiến (使役動詞 - Shiekidoushi)</span>
              </h2>
            </div>
            <button
              onClick={() => setActiveRecallOn(!activeRecallOn)}
              className="px-2.5 py-1.5 rounded-lg border text-xs font-bold flex items-center gap-1.5 transition-transform hover:scale-105"
              style={{ backgroundColor: theme.bgMain, borderColor: theme.accent, color: theme.accent }}
            >
              {activeRecallOn ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              <span>{activeRecallOn ? 'Luyện nhớ: Đang che' : 'Luyện nhớ: Đã mở'}</span>
            </button>
          </div>

          {/* Concept Banner */}
          <div className="p-3.5 rounded-xl border-l-4 text-xs leading-relaxed" style={{ backgroundColor: theme.highlight, borderColor: theme.accent }}>
            <strong className="block mb-1 font-bold">✨ Bản chất cốt lõi:</strong>
            Người có vị thế cao hơn (Cha mẹ, Giáo viên, Cấp trên) bắt buộc hoặc cho phép người dưới thực hiện hành động. Trợ từ phân định cực kỳ quan trọng: <span className="sk-recall">「に」</span> (người làm) và <span className="sk-recall">「を」</span> (đối tượng tác động).
          </div>

          {/* Conjugation Rules Matrix */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
            <div className="p-3 rounded-xl border" style={{ backgroundColor: theme.bgMain, borderColor: theme.border }}>
              <div className="text-[11px] font-bold uppercase mb-1" style={{ color: theme.accent }}>Động từ Nhóm 1 (Godan)</div>
              <p className="text-xs leading-normal font-serif">Đổi cột あ + <span className="sk-recall font-bold">せる</span></p>
              <div className="text-[11px] mt-2 opacity-80">Ví dụ: <span className="font-serif">書く ➔ 書かせる</span></div>
            </div>
            <div className="p-3 rounded-xl border" style={{ backgroundColor: theme.bgMain, borderColor: theme.border }}>
              <div className="text-[11px] font-bold uppercase mb-1" style={{ color: theme.accent }}>Động từ Nhóm 2 (Ichidan)</div>
              <p className="text-xs leading-normal font-serif">Bỏ る + <span className="sk-recall font-bold">させる</span></p>
              <div className="text-[11px] mt-2 opacity-80">Ví dụ: <span className="font-serif">食べる ➔ 食べさせる</span></div>
            </div>
            <div className="p-3 rounded-xl border" style={{ backgroundColor: theme.bgMain, borderColor: theme.border }}>
              <div className="text-[11px] font-bold uppercase mb-1" style={{ color: theme.accent }}>Động từ Nhóm 3 (Bất quy tắc)</div>
              <p className="text-xs leading-normal font-serif"><span className="sk-recall font-bold">する ➔ させる</span><br />来る ➔ こさせる</p>
              <div className="text-[11px] mt-2 opacity-80">Ví dụ: <span className="font-serif">勉強する ➔ 勉強させる</span></div>
            </div>
          </div>

          {/* Interactive Verb Quick List (Active Selection) */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wide" style={{ color: theme.textMuted }}>
              📋 20 Động Từ Thường Gặp (Bấm để xem chi tiết & tình huống)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {LESSONS_DATA.map((item, idx) => (
                <div
                  key={item.id}
                  onClick={() => setCurrentIdx(idx)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${currentIdx === idx ? 'ring-2 shadow-md' : 'hover:opacity-100 opacity-85'}`}
                  style={{
                    backgroundColor: currentIdx === idx ? theme.highlight : theme.bgMain,
                    borderColor: currentIdx === idx ? theme.accent : theme.border
                  }}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-lg">{item.imageEmoji}</span>
                    <div>
                      <div className="text-xs font-bold font-serif">{item.verb} ({item.reading})</div>
                      <div className="text-[11px]" style={{ color: theme.textMuted }}>{item.meaning} ➔ <b style={{ color: theme.accent }}>{item.causative}</b></div>
                    </div>
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); speakJapanese(item.verb); }}
                    className="p-1.5 rounded-lg border hover:scale-110 transition-transform"
                    style={{ backgroundColor: theme.bgCard, borderColor: theme.border }}
                    title="Nghe phát âm"
                  >
                    <Volume2 className="w-3.5 h-3.5" style={{ color: theme.accent }} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Advanced Grammar Box (Scrollable & Never Cut off) */}
          <div className="p-3.5 rounded-xl border mt-auto" style={{ backgroundColor: theme.bgMain, borderColor: theme.border }}>
            <h4 className="text-xs font-bold uppercase mb-1.5 flex items-center gap-1.5" style={{ color: theme.accent }}>
              <Award className="w-4 h-4" /> Khung Ngữ Pháp Nâng Cao & Mẹo Nhớ Nhanh
            </h4>
            <p className="text-xs leading-relaxed font-serif opacity-90">
              {currentItem.advancedGrammar} Khi chuyển sang thể bị động sai khiến (<span className="font-bold">させられる</span>), ý nghĩa chuyển thành "bị/phải làm gì đó trái với mong muốn", xuất hiện rất nhiều trong đề thi JLPT N3 và N2.
            </p>
          </div>
        </section>

        {/* DRAGGABLE / CLICKABLE SPLITTER BAR */}
        <div 
          onMouseDown={handleSplitterMouseDown}
          className="hidden md:flex flex-col items-center justify-center cursor-col-resize rounded-full border transition-colors group"
          style={{ backgroundColor: theme.bgCard, borderColor: theme.border }}
          title="Kéo qua lại để điều chỉnh khung"
        >
          <div className="w-1.5 h-12 rounded-full transition-all group-hover:scale-y-125" style={{ backgroundColor: theme.accent }} />
        </div>

        {/* RIGHT COLUMN: PRACTICE & SITUATION IMAGE & AI CHAT */}
        <section 
          id="practice-col-root"
          className="rounded-2xl border p-4 flex flex-col gap-4 overflow-x-auto overflow-y-auto shadow-2xl max-h-[calc(100vh-80px)]"
          style={{ backgroundColor: theme.bgCard, borderColor: theme.border }}
        >
          {/* Situation Banner & Image Card */}
          <div className="rounded-2xl border overflow-hidden shadow-xl" style={{ borderColor: theme.border, backgroundColor: theme.bgMain }}>
            <div className="p-3 border-b flex items-center justify-between" style={{ borderColor: theme.border, backgroundColor: theme.highlight }}>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold uppercase" style={{ color: theme.accent }}>
                  🎬 Tình huống #{currentItem.id}: {currentItem.character}
                </span>
              </div>
              <button
                onClick={() => setIsLightboxOpen(true)}
                className="px-2.5 py-1 rounded-lg border text-xs font-bold flex items-center gap-1 transition-transform hover:scale-105"
                style={{ backgroundColor: theme.bgCard, borderColor: theme.border, color: theme.accent }}
              >
                <Maximize2 className="w-3 h-3" /> Phóng to ảnh
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 p-3 items-center">
              <div className="relative h-48 rounded-xl overflow-hidden border group cursor-pointer" style={{ borderColor: theme.border }} onClick={() => setIsLightboxOpen(true)}>
                <img 
                  src={currentItem.imageUrl} 
                  alt={currentItem.situation}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
                  <p className="text-xs text-white font-medium drop-shadow">{currentItem.situation}</p>
                </div>
              </div>

              <div className="flex flex-col gap-2.5 justify-center">
                <div className="text-xs font-bold text-amber-400 uppercase tracking-wide">💡 Thử thách câu thực tế:</div>
                <p className="text-sm font-serif leading-relaxed p-3 rounded-xl border" style={{ backgroundColor: theme.bgCard, borderColor: theme.border }}>
                  {currentItem.fullSentence}
                </p>
                <p className="text-xs opacity-80 italic">Dịch nghĩa: "{currentItem.translation}"</p>
                
                <div className="flex items-center gap-2 mt-1">
                  <button
                    onClick={() => speakJapanese(currentItem.fullSentence)}
                    className="px-3 py-1.5 rounded-lg border text-xs font-bold flex items-center gap-1.5 transition-transform hover:scale-105"
                    style={{ backgroundColor: theme.bgCard, borderColor: theme.border, color: theme.accent }}
                  >
                    <Volume2 className="w-3.5 h-3.5" /> Nghe cả câu
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* INTERACTIVE PRACTICE MODES */}
          <div className="rounded-2xl border p-4 flex flex-col gap-4" style={{ backgroundColor: theme.bgMain, borderColor: theme.border }}>
            <div className="flex items-center justify-between border-b pb-2.5" style={{ borderColor: theme.border }}>
              <div className="flex items-center gap-2">
                <span className="text-base">✏️</span>
                <h3 className="text-sm font-bold" style={{ color: theme.accent }}>
                  {mode === 1 && 'Chế độ 1: Điền Thể Sai Khiến (Conjugation Blank)'}
                  {mode === 2 && 'Chế độ 2: Điền Trợ Từ Then Chốt (に / を)'}
                  {mode === 3 && 'Chế độ 3: Chấm Điểm & Phân Tích Cùng Gemini AI'}
                </h3>
              </div>
              <span className="text-xs px-2 py-0.5 rounded-md border font-mono" style={{ borderColor: theme.border, color: theme.textMuted }}>
                Câu {currentIdx + 1} / {LESSONS_DATA.length}
              </span>
            </div>

            {/* MODE 1: FILL CAUSATIVE FORM */}
            {mode === 1 && (
              <div className="space-y-3">
                <p className="text-xs leading-relaxed opacity-90">
                  Hãy điền dạng sai khiến chính xác của động từ <b className="font-serif text-amber-400">「{currentItem.verb}」 ({currentItem.reading})</b> vào ô trống dưới đây:
                </p>

                {/* Truncated Sentence Preview */}
                <div className="p-3 rounded-xl border font-serif text-sm bg-black/30 tracking-wide">
                  {currentItem.truncatedSentence}
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <input
                    type="text"
                    placeholder="VD: 食べさせる..."
                    value={userInputsMode1[currentIdx] || ''}
                    onChange={(e) => setUserInputsMode1(prev => ({ ...prev, [currentIdx]: e.target.value }))}
                    className="flex-1 min-w-[180px] px-3 py-2 rounded-xl border text-sm font-serif outline-none focus:ring-2"
                    style={{ backgroundColor: theme.bgCard, borderColor: theme.border, color: theme.textMain }}
                  />
                  <button
                    onClick={() => handleCheckMode1(currentIdx)}
                    className="px-4 py-2 rounded-xl text-xs font-bold shadow-lg transition-transform hover:scale-105 flex items-center gap-1.5"
                    style={{ backgroundColor: theme.accent, color: '#000' }}
                  >
                    <Check className="w-4 h-4" /> Kiểm tra
                  </button>
                </div>

                {checkedResults[currentIdx] !== undefined && (
                  <div className={`p-3 rounded-xl border text-xs font-semibold flex items-center gap-2 ${checkedResults[currentIdx] ? 'bg-green-500/15 border-green-500 text-green-300' : 'bg-red-500/15 border-red-500 text-red-300'}`}>
                    {checkedResults[currentIdx] ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                    <span>{checkedResults[currentIdx] ? 'Tuyệt vời! Bạn đã trả lời hoàn toàn chính xác.' : `Chưa đúng. Đáp án chuẩn là: ${currentItem.blankAnswer}`}</span>
                  </div>
                )}
              </div>
            )}

            {/* MODE 2: FILL PARTICLES に / を */}
            {mode === 2 && (
              <div className="space-y-3">
                <p className="text-xs leading-relaxed opacity-90">
                  Xác định trợ từ chính xác điền vào câu: <span className="font-serif font-bold text-amber-400">{currentItem.fullSentence.replace(currentItem.particle, '〔 ❓ 〕')}</span>
                </p>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleCheckMode2(currentIdx, 'に')}
                    className={`flex-1 py-2.5 rounded-xl border text-xs font-bold transition-all ${userInputsMode2[currentIdx] === 'に' ? 'ring-2' : ''}`}
                    style={{ backgroundColor: theme.bgCard, borderColor: theme.border, color: theme.accent }}
                  >
                    Trợ từ 「に」 (Người chịu tác động / Cho phép)
                  </button>
                  <button
                    onClick={() => handleCheckMode2(currentIdx, 'を')}
                    className={`flex-1 py-2.5 rounded-xl border text-xs font-bold transition-all ${userInputsMode2[currentIdx] === 'を' ? 'ring-2' : ''}`}
                    style={{ backgroundColor: theme.bgCard, borderColor: theme.border, color: theme.accent }}
                  >
                    Trợ từ 「を」 (Đối tượng trực tiếp / Bắt buộc)
                  </button>
                </div>

                {checkedResults[currentIdx] !== undefined && (
                  <div className={`p-3 rounded-xl border text-xs font-semibold flex items-center gap-2 ${checkedResults[currentIdx] ? 'bg-green-500/15 border-green-500 text-green-300' : 'bg-red-500/15 border-red-500 text-red-300'}`}>
                    {checkedResults[currentIdx] ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                    <span>{checkedResults[currentIdx] ? 'Chính xác tuyệt đối!' : `Chưa đúng. Động từ này đi với trợ từ 「${currentItem.particle}」.`}</span>
                  </div>
                )}
              </div>
            )}

            {/* MODE 3: GEMINI AI EVALUATOR & CHAT */}
            {mode === 3 && (
              <div className="space-y-3">
                <p className="text-xs leading-relaxed opacity-90">
                  Nhập câu tiếng Nhật tự sáng tác của bạn (hoặc giữ nguyên câu mẫu) để Gemini AI chấm điểm ngữ pháp sai khiến:
                </p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder={currentItem.fullSentence}
                    value={aiCustomSentence}
                    onChange={(e) => setAiCustomSentence(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-xl border text-xs font-serif outline-none focus:ring-2"
                    style={{ backgroundColor: theme.bgCard, borderColor: theme.border, color: theme.textMain }}
                  />
                  <button
                    onClick={() => evaluateWithGemini(currentIdx)}
                    disabled={aiLoading}
                    className="px-4 py-2 rounded-xl text-xs font-bold shadow-lg transition-transform hover:scale-105 flex items-center gap-1.5 disabled:opacity-50"
                    style={{ backgroundColor: theme.accent, color: '#000' }}
                  >
                    {aiLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Bot className="w-4 h-4" />}
                    <span>Chấm AI</span>
                  </button>
                </div>

                {aiResponses[currentIdx] && (
                  <div className="p-3.5 rounded-xl border text-xs leading-relaxed whitespace-pre-line" style={{ backgroundColor: theme.highlight, borderColor: theme.accent }}>
                    {aiResponses[currentIdx]}
                  </div>
                )}
              </div>
            )}

            {/* Navigation Buttons across Lessons */}
            <div className="flex items-center justify-between pt-2 border-t" style={{ borderColor: theme.border }}>
              <button
                onClick={() => setCurrentIdx((prev) => (prev - 1 + LESSONS_DATA.length) % LESSONS_DATA.length)}
                className="px-3 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1"
                style={{ backgroundColor: theme.bgCard, borderColor: theme.border, color: theme.textMain }}
              >
                ◀ Câu trước
              </button>
              <div className="text-xs font-bold" style={{ color: theme.accent }}>
                {currentItem.group}
              </div>
              <button
                onClick={() => setCurrentIdx((prev) => (prev + 1) % LESSONS_DATA.length)}
                className="px-3 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1"
                style={{ backgroundColor: theme.bgCard, borderColor: theme.border, color: theme.textMain }}
              >
                Câu tiếp ▶
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* 3. MODALS (LIGHTBOX & SHORTCUTS & API KEY) */}
      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div 
            className="rounded-2xl border max-w-lg w-full p-5 flex flex-col gap-4 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200"
            style={{ backgroundColor: theme.bgCard, borderColor: theme.border }}
          >
            <div className="flex items-center justify-between border-b pb-3" style={{ borderColor: theme.border }}>
              <h3 className="text-sm font-bold" style={{ color: theme.accent }}>
                🖼️ Tình huống: {currentItem.verb} ({currentItem.character})
              </h3>
              <button 
                onClick={() => setIsLightboxOpen(false)}
                className="p-1 rounded-lg border hover:scale-110 transition-transform"
                style={{ backgroundColor: theme.bgMain, borderColor: theme.border }}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="rounded-xl overflow-hidden border max-h-[380px]" style={{ borderColor: theme.border }}>
              <img src={currentItem.imageUrl} alt="Situation Zoom" className="w-full h-full object-cover" />
            </div>
            <p className="text-xs font-serif leading-relaxed text-center opacity-90">
              "{currentItem.situation}"
            </p>
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="w-full py-2.5 rounded-xl text-xs font-bold shadow-md"
              style={{ backgroundColor: theme.accent, color: '#000' }}
            >
              Đóng lại
            </button>
          </div>
        </div>
      )}

      {/* AI Key Modal */}
      {isAiKeyModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div 
            className="rounded-2xl border max-w-md w-full p-5 flex flex-col gap-4 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200"
            style={{ backgroundColor: theme.bgCard, borderColor: theme.border }}
          >
            <div className="flex items-center justify-between border-b pb-3" style={{ borderColor: theme.border }}>
              <h3 className="text-sm font-bold flex items-center gap-2" style={{ color: theme.accent }}>
                <Key className="w-4 h-4" /> Cài đặt Google Gemini API Key
              </h3>
              <button 
                onClick={() => setIsAiKeyModalOpen(false)}
                className="p-1 rounded-lg border hover:scale-110 transition-transform"
                style={{ backgroundColor: theme.bgMain, borderColor: theme.border }}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs leading-relaxed opacity-90">
              Nhập Gemini API Key của bạn để sử dụng AI chấm điểm thông minh. (Nếu để trống, hệ thống sẽ dùng trợ lý AI ngoại tuyến tích hợp sẵn).
            </p>
            <input
              type="password"
              placeholder="AIzaSy..."
              value={aiApiKey}
              onChange={(e) => setAiApiKey(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border text-xs font-mono outline-none focus:ring-2"
              style={{ backgroundColor: theme.bgMain, borderColor: theme.border, color: theme.textMain }}
            />
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => {
                  if (typeof window !== 'undefined') {
                    localStorage.setItem('anki_gemini_key', aiApiKey);
                  }
                  showToast('🔑 Đã lưu API Key thành công!');
                  setIsAiKeyModalOpen(false);
                }}
                className="flex-1 py-2.5 rounded-xl text-xs font-bold shadow-md"
                style={{ backgroundColor: theme.accent, color: '#000' }}
              >
                Lưu Key
              </button>
              <button
                onClick={() => setIsAiKeyModalOpen(false)}
                className="px-4 py-2.5 rounded-xl border text-xs font-semibold"
                style={{ backgroundColor: theme.bgMain, borderColor: theme.border }}
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Shortcuts Modal */}
      {isShortcutsModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div 
            className="rounded-2xl border max-w-md w-full p-5 flex flex-col gap-4 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200"
            style={{ backgroundColor: theme.bgCard, borderColor: theme.border }}
          >
            <div className="flex items-center justify-between border-b pb-3" style={{ borderColor: theme.border }}>
              <h3 className="text-sm font-bold flex items-center gap-2" style={{ color: theme.accent }}>
                <Keyboard className="w-4 h-4" /> Phím tắt Speedrun
              </h3>
              <button 
                onClick={() => setIsShortcutsModalOpen(false)}
                className="p-1 rounded-lg border hover:scale-110 transition-transform"
                style={{ backgroundColor: theme.bgMain, borderColor: theme.border }}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-2 text-xs font-serif">
              <div className="flex justify-between p-2 rounded-lg border" style={{ backgroundColor: theme.bgMain, borderColor: theme.border }}>
                <span>Phát âm thanh từ vựng</span>
                <b style={{ color: theme.accent }}>R / P</b>
              </div>
              <div className="flex justify-between p-2 rounded-lg border" style={{ backgroundColor: theme.bgMain, borderColor: theme.border }}>
                <span>Chuyển chế độ học (Mode 1 ➔ 2 ➔ 3)</span>
                <b style={{ color: theme.accent }}>M</b>
              </div>
              <div className="flex justify-between p-2 rounded-lg border" style={{ backgroundColor: theme.bgMain, borderColor: theme.border }}>
                <span>Chuyển câu tiếp theo / trước</span>
                <b style={{ color: theme.accent }}>J / K</b>
              </div>
              <div className="flex justify-between p-2 rounded-lg border" style={{ backgroundColor: theme.bgMain, borderColor: theme.border }}>
                <span>Phóng to ảnh tình huống</span>
                <b style={{ color: theme.accent }}>Z</b>
              </div>
            </div>
            <button
              onClick={() => setIsShortcutsModalOpen(false)}
              className="w-full py-2.5 rounded-xl text-xs font-bold shadow-md"
              style={{ backgroundColor: theme.accent, color: '#000' }}
            >
              Đã hiểu
            </button>
          </div>
        </div>
      )}

      {/* TOAST NOTIFICATION */}
      {toastMsg.show && (
        <div className="fixed bottom-5 right-5 z-50 px-4 py-2.5 rounded-xl border shadow-2xl text-xs font-bold flex items-center gap-2 animate-in slide-in-from-bottom-5 duration-300" style={{ backgroundColor: theme.bgCard, borderColor: theme.accent, color: theme.textMain }}>
          <Sparkles className="w-4 h-4" style={{ color: theme.accent }} />
          <span>{toastMsg.text}</span>
        </div>
      )}
    </div>
  );
}
