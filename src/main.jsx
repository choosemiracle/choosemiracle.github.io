
import React, { useState, useEffect } from 'react';
import { 
  Leaf, 
  Wind, 
  BookOpen, 
  Compass as CompassIcon, 
  ShieldCheck, 
  PenLine, 
  Info, 
  ArrowLeft, 
  ChevronRight, 
  Heart,
  MessageCircle,
  HelpCircle,
  RefreshCw,
  Bookmark,
  CheckCircle2,
  Sparkles,
  Mountain,
  Trees,
  Flame,
  Waves,
  Eye,
  Shield,
  VolumeX,
  UserCheck,
  Trash2,
  Star,
  Download,
  Lock,
  ChevronDown,
  ChevronUp,
  Map,
  CheckSquare,
  AlertCircle,
  Trophy,
  UserX,
  HeartHandshake,
  ShieldAlert,
  Users,
  Quote
} from 'lucide-react';

// --- 数据配置 ---

const TOUCHSTONES_DATA = [
  { id: 1, cn: "给予欢迎，也接受欢迎。", en: "Extend and receive welcome.", intro: "在这里，我们以好客之心彼此相待。", reflect: "我是否允许自己也成为被欢迎的人？", detailCn: "表达和接受欢迎。人们在受欢迎的环境中学习效果最好。在这个圈子里，我们通过给予和接受善意来支持彼此的学习。", detailEn: "Extend and receive welcome. People learn best in hospitable spaces." },
  { id: 2, cn: "尽可能全然在场。", en: "Be present as fully as possible.", intro: "带着你的完整状态来到这里，包括疑虑、疲惫、喜悦与不确定。", reflect: "此刻，我是否允许完整的自己出现？", detailCn: "以最大可能的整全的状态于当下。在此处，带着你的疑惑、恐惧和弱点，同时带着你的信念、快乐和成功，在此处，带着你的倾听去表达。", detailEn: "Be present as fully as possible. Be here with your doubts, fears, and failings." },
  { id: 3, cn: "所有分享，源于邀请，而非要求。", en: "What is offered in the circle is by invitation, not demand.", intro: "你的灵魂知道自己的节奏。", reflect: "我是否能尊重自己不说话的权利？", detailCn: "邀请，而不是要求。这不是一个“必须分享，否则后悔”的活动！在这次活动期间，做任何你灵魂所呼唤的事情，并且知道你在我们的支持下。", detailEn: "What is offered in the circle is by invitation, not demand." },
  { id: 4, cn: "说出自己的真实，也尊重他人的真实。", en: "Speak your truth in ways that respect other people's truth.", intro: "真实不是用来压倒别人，而是放在圆心中被温柔见证。", reflect: "我能否说‘我’的经验，而不是解释‘你’的问题？", detailCn: "表达自己的时候，需要尊重别人表达的事实。我们对事实的看法可能会有所不同，但是在一个信任圆圈里说出一个人的观点并不意味着解释别人表达的东西。", detailEn: "Speak your truth in ways that respect other people's truth." },
  { id: 5, cn: "不修复，不拯救，不建议，也不纠正。", en: "No fixing, saving, advising, or correcting.", intro: "真正的陪伴，不急着把别人带离他的处境。", reflect: "我在听别人说话时，最容易急着做什么？", detailCn: "不修复，不拯救，不建议，也不纠正对方。对于我们这些从事“帮助人”的人来说，这是最难的准则之一。但如果我们希望创造一个欢迎灵魂的空间，这是最重要的规则。", detailEn: "No fixing, no saving, no advising, or correcting." },
  { id: 6, cn: "学习用诚实、开放的问题回应。", en: "Learn to respond with honest, open questions.", intro: "好问题不是引导别人到我的答案，而是帮助他听见自己的答案。", reflect: "我能提出一个没有隐藏建议的问题吗？", detailCn: "用诚实、开放的问题来回应别人，而不是建议或纠正。通过这样的问题，我们可以帮助“倾听彼此，进入更深的交流。”", detailEn: "Learn to respond to others with honest, open questions." },
  { id: 7, cn: "当关系变得困难，转向好奇。", en: "When the going gets rough, turn to wonder.", intro: "困惑时，不急着判断，先问：这里发生了什么？", reflect: "我最近一次把判断转为好奇，是在什么时候？", detailCn: "当进行不顺利时，转念为好奇。如果你感到评判或防御，问问自己，“我想知道，是什么让她这么认为的?” 或者 “他现在是什么感觉?”", detailEn: "When the going gets rough, turn to wonder." },
  { id: 8, cn: "聆听你内在的老师。", en: "Attend to your own inner teacher.", intro: "最深的指引，不总在外面，也在你里面。", reflect: "我内在的老师，最近在提醒我什么？", detailCn: "关注你内心的老师。我们当然会向别人学习。但当我们在一个信任圆圈里探索诗歌、故事、问题和静默时，我们就有了一个从内心学习的特殊机会。", detailEn: "Attend to your own inner teacher." },
  { id: 9, cn: "信任沉默，并向沉默学习。", en: "Trust and learn from the silence.", intro: "沉默不是空白，而是真实慢慢浮现的地方。", reflect: "我能否不急着填满沉默？", detailCn: "相信并从静默中学习。静默是我们这个嘈杂世界的礼物，也是了解自身的一种方式。把静默当作小组的一员。", detailEn: "Trust and learn from the silence." },
  { id: 10, cn: "承诺并守护保密。", en: "Commit to and maintain confidentiality.", intro: "安全感来自彼此对边界的共同守护。", reflect: "我是否值得别人把真实托付给我？", detailCn: "严格保密。信任来自于知道团队成员尊重信任，认真对待隐私和谨慎的道德规范。", detailEn: "Observe deep confidentiality." },
  { id: 11, cn: "相信你会带着自己真正需要的东西离开。", en: "Leave the circle with what you need.", intro: "你未必得到答案，但可能带走更深的清明。", reflect: "如果今天只带走一样东西，我希望是什么？", detailCn: "相信种子会成长。从一开始就知道，你可能会在这个圈子结束的时候，拿到了你需要的东西。", detailEn: "Know that it is possible to leave with what you needed." }
];

const QUESTION_LIBRARY = [
  { cat: "自我觉察", q: "你最近一次真正被听见，是在什么时候？" },
  { cat: "自我觉察", q: "此刻的你，最需要被温柔看见的是什么？" },
  { cat: "情绪", q: "哪种感觉一直敲门，而你却迟迟不敢开？" },
  { cat: "关系", q: "谁在你的生命里，最能让你感到“被真实地看见”？" },
  { cat: "生命方向", q: "你生命中正在关闭的那扇门，可能在保护什么？" },
  { cat: "分裂与整全", q: "你为了迎合环境，把自己切碎成了哪几块？" }
];

const QUESTION_PATHS = [
  { id: 'self', title: "回到自己", desc: "当你感到分散、疲惫、失去中心。", icon: <Mountain className="w-5 h-5" />, questions: ["我现在真正的状态是什么？", "我最近最常扮演的角色是什么？", "哪一部分自己被我留在了门外？", "如果我不再证明自己，会发生什么？", "我今天可以如何更诚实地生活一点？"] },
  { id: 'fear', title: "穿过恐惧", desc: "当你被担心、羞耻或不确定困住。", icon: <Flame className="w-5 h-5" />, questions: ["我最害怕被别人看见什么？", "这个恐惧想保护我什么？", "我是否把一次失败误认为自己的全部？", "如果恐惧可以说话，它会说什么？", "我可以怎样温柔地陪着这个恐惧？"] },
  { id: 'rel', title: "关系里的真实", desc: "当你在关系中沉默、讨好、防御或疏离。", icon: <Waves className="w-5 h-5" />, questions: ["在这段关系中，我没有说出的真实是什么？", "我最希望对方怎样听我？", "我是否正在用沉默惩罚，或用表达控制？", "我能否说出自己的真实，同时尊重对方的真实？", "我愿意把什么交还给对方，把什么带回自己？"] },
  { id: 'whole', title: "从分裂到整全", desc: "当外在生活与内在真实不一致。", icon: <Trees className="w-5 h-5" />, questions: ["我在哪里活成了别人期待的样子？", "我的身体最近在提醒我什么？", "哪些成功让我离自己更远？", "我真正不愿再背负的是什么？", "如果向整全迈出一步，它会是什么？"] },
  { id: 'listen', title: "学习聆听", desc: "当你想成为更好的陪伴者或引导者。", icon: <Eye className="w-5 h-5" />, questions: ["我听别人说话时，内心最常急着做什么？", "我是否急着修复、建议或解释？", "我能否允许对方保有自己的节奏？", "什么样的问题能帮助对方听见自己？", "我如何带着自己的倾听去表达？"] }
];

const FACILITATOR_STAGES = [
  { level: 1, title: "第一阶段：理解信任圈", desc: "理解精神、边界、基石原则与帕尔默思想。", learn: ["分裂的生活", "隐秘的整全", "内在导师", "第三事物"], assessment: ["我能清晰解释‘灵魂是羞怯的’", "我认同十一项基石原则"], practice: "忍住任何‘给出建议’的冲动。", icon: <BookOpen className="w-5 h-5" /> },
  { level: 2, title: "第二阶段：练习基本能力", desc: "从自己的倾听习惯开始练习。", learn: ["全然在场", "深度聆听", "静默承载", "开放提问"], assessment: ["我能意识到内心准备回应的杂音", "我能舒适地共享一段沉默"], practice: "练习听见那些微弱的声音。", icon: <Eye className="w-5 h-5" /> },
  { level: 3, title: "第三阶段：学习守护空间", desc: "设计并维护安全容器。", learn: ["开场欢迎", "朗读基石", "处理沉默", "收束结束"], assessment: ["我能稳健地朗读基石", "我能在会议结束时温柔收束"], practice: "主持一次不点评的分享。", icon: <ShieldCheck className="w-5 h-5" /> },
  { level: 4, title: "第四阶段：进入真实带领", desc: "逐步进入真实场域。", learn: ["沙龙设计", "复盘照看", "伦理边界"], assessment: ["我具备设计完整流程的能力", "我了解心理转介的基本意识"], practice: "写下一份详尽的复盘记录。", icon: <Trophy className="w-5 h-5" /> }
];

const SAFETY_POINTS = [
  { id: 1, title: "你不需要分享", desc: "所有表达都是邀请。沉默也是一种参与。", icon: <VolumeX className="w-5 h-5" /> },
  { id: 2, title: "没有人会分析你", desc: "这里不是心理诊室。我们不诊断、不定义问题。", icon: <UserX className="w-5 h-5" /> },
  { id: 3, title: "没有人会修复你", desc: "我们相信每个人内在都有自己的节奏与智慧。", icon: <HeartHandshake className="w-5 h-5" /> },
  { id: 4, title: "你的文字默认属于你", desc: "日志保存在本地，匿名分享必须由你主动选择。", icon: <Lock className="w-5 h-5" /> },
  { id: 5, title: "这里不是心理治疗", desc: "如果你正处于严重危机中，请务必寻求专业医疗援助。", icon: <ShieldAlert className="w-5 h-5" />, isWarning: true },
  { id: 6, title: "共同守护", desc: "每一位参与者都需要承诺保密、尊重、不建议、不评判。", icon: <Users className="w-5 h-5" /> }
];

const MOCK_WITNESS = ["“我也常常不知道，自己到底在怕什么。”", "“我发现，我最想被听见的，不是答案，而是陪伴。”", "“原来不说，也可以是一种诚实。”"];

// --- 动画组件 ---

const ForestBackground = () => (
  <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#0a1a0a]">
    <div className="absolute inset-0 bg-gradient-to-b from-[#1a2e1a] via-[#0a1a0a] to-[#051005]"></div>
    <div className="absolute top-[-10%] right-[-10%] w-[80vw] h-[80vw] bg-[#f3ede2] rounded-full blur-[120px] opacity-10 animate-pulse"></div>
    <div className="absolute inset-0 opacity-20">
      {[...Array(15)].map((_, i) => (
        <div key={i} className="absolute bg-[#d4af37] rounded-full blur-sm animate-pulse"
          style={{ width: Math.random() * 4 + 2 + 'px', height: Math.random() * 4 + 2 + 'px', left: Math.random() * 100 + '%', top: Math.random() * 100 + '%', animationDuration: Math.random() * 5 + 5 + 's' }}
        ></div>
      ))}
    </div>
    <svg className="absolute bottom-0 left-0 w-1/2 h-1/2 opacity-[0.05] text-[#5b805b]" viewBox="0 0 400 400">
      <path d="M0,400 Q100,200 50,0 M100,400 Q150,250 120,50" fill="none" stroke="currentColor" strokeWidth="1" />
    </svg>
  </div>
);

const FadeIn = ({ delay = 0, duration = 1500, children, className = "" }) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);
  return (
    <div className={`transition-all ease-out ${className}`} style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)', transitionDuration: `${duration}ms` }}>
      {children}
    </div>
  );
};

const Button = ({ children, onClick, variant = 'primary', className = "" }) => {
  const base = "px-10 py-3.5 rounded-full transition-all duration-1000 text-sm tracking-[0.2em] flex items-center justify-center border whitespace-nowrap relative z-10";
  const variants = {
    primary: "bg-[#4d6a4d] border-[#5b805b] text-white shadow-xl hover:bg-[#3d5a3d]",
    secondary: "bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20",
  };
  return <button onClick={onClick} className={`${base} ${variants[variant]} ${className}`}>{children}</button>;
};

// --- 主应用 ---

export default function App() {
  const [view, setView] = useState('landing');
  const [expStep, setExpStep] = useState(0);
  const [journal, setJournal] = useState(() => JSON.parse(localStorage.getItem('cot_garden_final') || '[]'));
  const [expandedStone, setExpandedStone] = useState(null);
  const [activeStage, setActiveStage] = useState(0);
  const [dailyQ, setDailyQ] = useState(null);
  const [selectedPath, setSelectedPath] = useState(null);
  const [pathStep, setPathStep] = useState(0);
  const [pathRes, setPathRes] = useState([]);
  const [facProgress, setFacProgress] = useState(() => JSON.parse(localStorage.getItem('cot_fac_final') || '{}'));

  useEffect(() => {
    if (view === 'daily') setDailyQ(QUESTION_LIBRARY[Math.floor(Math.random() * QUESTION_LIBRARY.length)]);
  }, [view]);

  const saveNote = (text, source, q = null) => {
    const next = [{ id: Date.now(), text, source, q, date: new Date().toLocaleDateString() }, ...journal];
    setJournal(next);
    localStorage.setItem('cot_garden_final', JSON.stringify(next));
  };

  const renderView = () => {
    switch (view) {
      case 'landing': return (
        <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center relative overflow-hidden">
          <ForestBackground />
          <FadeIn delay={1000} duration={2500}><h1 className="text-3xl md:text-5xl font-semibold mb-10 text-white tracking-[0.3em] font-serif leading-relaxed">你不需要表现，只需要在这里。</h1></FadeIn>
          <FadeIn delay={2500} duration={2000}><p className="text-md md:text-lg text-white/70 mb-16 max-w-lg leading-[2.5] font-light tracking-widest italic">一处数字化的林中空地，邀请你慢一点，<br/>听见自己，也学习如何听见他人。</p></FadeIn>
          <FadeIn delay={4000}><Button onClick={() => setView('hub')}>进入小院</Button></FadeIn>
          <div className="absolute bottom-12 w-full text-center px-4"><FadeIn delay={5500}><p className="text-[11px] text-white/40 tracking-[0.4em] border-t border-white/10 pt-8 inline-block">「 向内，不是退缩；安静，不是沉默失语。」</p></FadeIn></div>
        </div>
      );
      case 'hub': return (
        <div className="min-h-screen p-8 md:p-16 relative overflow-y-auto">
          <ForestBackground />
          <div className="relative z-10 max-w-5xl mx-auto">
            <header className="mb-20 flex justify-between items-end border-b border-white/10 pb-8">
              <h2 className="text-2xl text-white font-semibold tracking-widest font-serif">信任圈小院 2.0</h2>
              <button onClick={() => setView('landing')} className="text-xs text-white/40 hover:text-[#d4af37] font-bold">返回扉页</button>
            </header>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <HubCard icon={<Wind />} title="体验一次" desc="一段安顿之旅" onClick={() => { setView('experience'); setExpStep(0); }} />
              <HubCard icon={<HelpCircle />} title="每日一问" desc="领取一个好问题" onClick={() => setView('daily')} />
              <HubCard icon={<Trees />} title="问题小径" desc="选择一条路径探索" onClick={() => setView('paths')} />
              <HubCard icon={<CompassIcon />} title="十一条基石" desc="支撑空间的原则" onClick={() => setView('stones')} />
              <HubCard icon={<BookOpen />} title="认识信任圈" desc="理解核心精神" onClick={() => setView('learn')} />
              <HubCard icon={<ShieldCheck />} title="安全与边界" desc="守护内在边界" onClick={() => setView('safety')} />
              <HubCard icon={<PenLine />} title="小院日志" desc="你的真实片段" onClick={() => setView('journal')} />
              <HubCard icon={<MessageCircle />} title="引导者之路" desc="成为空间持守者" onClick={() => setView('facilitator')} />
              <HubCard icon={<Info />} title="关于小院" desc="愿景与起源" onClick={() => setView('about')} />
            </div>
          </div>
        </div>
      );
      case 'experience': return renderExp();
      case 'daily': return renderDaily();
      case 'stones': return renderStones();
      case 'paths': return renderPaths();
      case 'journal': return renderJournal();
      case 'learn': return renderLearn();
      case 'safety': return renderSafety();
      case 'facilitator': return renderFac();
      case 'about': return renderAbout();
      default: return null;
    }
  };

  const HubCard = ({ icon, title, desc, onClick }) => (
    <div onClick={onClick} className="p-10 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] hover:border-[#d4af37]/40 shadow-2xl transition-all cursor-pointer group">
      <div className="text-[#d4af37] mb-8 group-hover:scale-110 transition-transform">{icon}</div>
      <h3 className="text-lg text-white font-semibold mb-2 group-hover:text-[#d4af37]">{title}</h3>
      <p className="text-sm text-white/50 leading-relaxed font-light">{desc}</p>
    </div>
  );

  const renderExp = () => {
    const steps = [
      { render: () => ( <div className="text-center"><h3 className="text-2xl text-white font-serif mb-12">先不要继续。注意力回到呼吸。</h3><RefreshCw className="w-12 h-12 text-[#d4af37]/40 animate-spin mx-auto mb-16" /><Button onClick={() => setExpStep(1)} variant="secondary">我准备好了</Button></div> ) },
      { render: () => ( <div className="text-center"><h3 className="text-2xl text-white font-serif italic mb-12">「 你最近一次感到整全是什么时候？ 」</h3><Button onClick={() => setExpStep(2)} variant="secondary">继续</Button></div> ) },
      { render: () => ( <div className="w-full max-w-lg"><textarea className="w-full bg-white/5 border border-white/10 rounded-2xl p-8 text-white h-48 focus:outline-none" placeholder="写下一句话..." onBlur={(e) => saveNote(e.target.value, "微型体验")} /><div className="mt-8 flex justify-center"><Button onClick={() => setExpStep(3)}>安静放下</Button></div></div> ) },
      { render: () => ( <div className="text-center"><h3 className="text-xl text-white mb-12">谢谢你愿意诚实。愿你带上这份安静。</h3><Button onClick={() => setView('hub')} variant="secondary">回到小院</Button></div> ) }
    ];
    return ( <div className="min-h-screen relative flex items-center justify-center p-8"><ForestBackground /><div className="relative z-10 w-full max-w-xl">{steps[expStep]?.render() || setView('hub')}</div></div> );
  };

  const renderStones = () => (
    <div className="min-h-screen relative p-8 md:p-16 overflow-y-auto">
      <ForestBackground />
      <div className="relative z-10 max-w-5xl mx-auto">
        <header className="mb-20 flex items-center gap-6 text-white"><button onClick={() => setView('hub')}><ArrowLeft /></button><h2 className="text-3xl font-serif tracking-widest">十一条基石</h2></header>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-40">
          {TOUCHSTONES_DATA.map(s => (
            <div key={s.id} className={`p-10 bg-white/5 backdrop-blur-xl border rounded-[3rem] transition-all ${expandedStone === s.id ? 'md:col-span-2 border-[#d4af37]/40' : 'border-white/10 hover:border-white/20'}`}>
              <div className="flex justify-between mb-8"><span className="text-[11px] text-[#d4af37] font-bold">{s.id.toString().padStart(2,'0')}</span><button onClick={() => saveNote(s.cn, "收藏基石")}><Star className="w-4 h-4 text-white/20 hover:text-[#d4af37]" /></button></div>
              <h3 className="text-xl text-white font-serif mb-6 cursor-pointer" onClick={() => setExpandedStone(expandedStone === s.id ? null : s.id)}>「 {s.cn} 」</h3>
              <div className="border-l-2 border-[#d4af37]/20 pl-6 space-y-4"><p className="text-white/70 italic text-sm">{s.intro}</p><p className="text-[#d4af37] font-semibold text-md">“{s.reflect}”</p></div>
              {expandedStone === s.id && (<div className="mt-12 pt-10 border-t border-white/10 text-white/60 text-sm leading-loose"><p className="mb-4">{s.detailCn}</p><p className="text-xs opacity-40 font-serif italic">{s.detailEn}</p></div>)}
              <button onClick={() => setExpandedStone(expandedStone === s.id ? null : s.id)} className="mt-8 text-[10px] text-white/40 uppercase font-bold tracking-widest">{expandedStone === s.id ? "收起" : "详情"}</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderDaily = () => (
    <div className="min-h-screen relative flex items-center justify-center p-8"><ForestBackground /><div className="relative z-10 text-center max-w-2xl">
      <p className="text-[#d4af37] text-[11px] mb-12 uppercase tracking-widest font-bold">{dailyQ?.cat}</p>
      <h3 className="text-3xl text-white font-serif mb-20 italic">「 {dailyQ?.q} 」</h3>
      <div className="flex gap-4 justify-center"><Button onClick={() => setView('hub')} variant="secondary">带着问题离开</Button><Button onClick={() => setDailyQ(QUESTION_LIBRARY[Math.floor(Math.random()*QUESTION_LIBRARY.length)])}>换一题</Button></div>
    </div></div>
  );

  const renderPaths = () => (
    <div className="min-h-screen relative p-8 md:p-16 overflow-y-auto">
      <ForestBackground />
      <div className="relative z-10 max-w-5xl mx-auto">
        <header className="mb-20 flex items-center gap-6 text-white"><button onClick={() => setView('hub')}><ArrowLeft /></button><h2 className="text-3xl font-serif tracking-widest">问题小径</h2></header>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {QUESTION_PATHS.map(p => (<div key={p.id} onClick={() => { setSelectedPath(p); setPathStep(0); setView('path-flow'); }} className="p-10 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[3rem] group cursor-pointer hover:border-[#d4af37]/30 transition-all"><div className="text-[#d4af37] mb-8">{p.icon}</div><h3 className="text-xl text-white font-serif mb-4">「 {p.title} 」</h3><p className="text-sm text-white/50">{p.desc}</p></div>))}
        </div>
      </div>
    </div>
  );

  const renderPathFlow = () => {
    if (!selectedPath) return null;
    const isEnd = pathStep === selectedPath.questions.length;
    if (isEnd) return (
      <div className="min-h-screen relative flex flex-col items-center justify-center p-8"><ForestBackground /><div className="relative z-10 bg-white/5 p-12 rounded-[4rem] border border-white/10 max-w-2xl w-full text-center">
        <Heart className="w-12 h-12 text-[#d4af37] mx-auto mb-10 opacity-60" /><h2 className="text-2xl text-white font-serif mb-12">路径回声</h2>
        <div className="text-left space-y-8 mb-16">{selectedPath.questions.map((q, i) => (<div key={i} className="border-l-2 border-[#d4af37]/30 pl-6"><p className="text-white font-semibold mb-2 italic text-sm">{q}</p></div>))}</div>
        <Button onClick={() => setView('hub')}>回到起点</Button>
      </div></div>
    );
    return (
      <div className="min-h-screen relative flex items-center justify-center p-8"><ForestBackground /><div className="relative z-10 text-center w-full max-w-2xl">
        <h3 className="text-3xl text-white font-serif mb-20 italic">「 {selectedPath.questions[pathStep]} 」</h3>
        <textarea className="w-full bg-white/5 border border-white/10 rounded-2xl p-8 text-white h-40 focus:outline-none mb-12" placeholder="书写此刻..." />
        <Button onClick={() => setPathStep(pathStep + 1)}>继续前行</Button>
      </div></div>
    );
  };

  const renderJournal = () => (
    <div className="min-h-screen relative p-8 md:p-16 overflow-y-auto">
      <ForestBackground />
      <div className="relative z-10 max-w-4xl mx-auto">
        <header className="mb-24 flex justify-between items-center text-white"><div className="flex items-center gap-8"><button onClick={() => setView('hub')}><ArrowLeft /></button><h2 className="text-3xl font-serif tracking-widest">小院日志</h2></div></header>
        <div className="space-y-12">{journal.length === 0 ? <p className="text-white/20 text-center py-40">还未留下任何痕迹...</p> : journal.map(e => (<div key={e.id} className="p-10 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[3rem] group relative"><span className="text-[11px] text-[#d4af37] block mb-4 uppercase">{e.date} / {e.source}</span>{e.q && <h4 className="text-lg text-white/90 font-serif mb-6 italic border-l-4 border-[#d4af37]/40 pl-6">{e.q}</h4>}<p className="text-md text-white/60 leading-relaxed whitespace-pre-wrap">{e.text}</p></div>))}</div>
      </div>
    </div>
  );

  const renderLearn = () => (
    <div className="min-h-screen relative p-8 md:p-16 overflow-y-auto">
      <ForestBackground />
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <header className="mb-24 flex items-center gap-8 text-white text-left"><button onClick={() => setView('hub')}><ArrowLeft /></button><h2 className="text-3xl font-serif">认识信任圈</h2></header>
        <h1 className="text-3xl md:text-4xl text-white font-serif mb-12 tracking-widest">「 信任圈是什么？ 」</h1>
        <p className="text-lg text-white/70 italic border-y border-white/10 py-12 mb-32 max-w-2xl mx-auto leading-[2.5]">“信任圈，是一群人围坐在一起，学习不急着改变彼此，而是安静地听见真实。”</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-40">
           {["不修复", "不拯救", "不建议", "不纠正"].map((t, i) => (<div key={i} className="flex flex-col items-center gap-6"><div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center text-2xl text-[#d4af37] font-bold shadow-lg border border-[#d4af37]/20">{t[1]}</div><span className="text-sm text-white/60 font-semibold">{t}</span></div>))}
        </div>
        <Button onClick={() => setView('stones')} variant="secondary">阅读十一条基石</Button>
      </div>
    </div>
  );

  const renderSafety = () => (
    <div className="min-h-screen relative p-8 md:p-16 overflow-y-auto">
      <ForestBackground />
      <div className="relative z-10 max-w-5xl mx-auto">
        <header className="mb-24 flex items-center gap-8 text-white"><button onClick={() => setView('hub')}><ArrowLeft /></button><h2 className="text-3xl font-serif">安全与边界</h2></header>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">{SAFETY_POINTS.map(p => (<div key={p.id} className="p-10 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[3rem]"><div className="text-[#d4af37] mb-8">{p.icon}</div><h3 className="text-xl text-white font-serif mb-6">{p.title}</h3><p className="text-md text-white/50 leading-relaxed font-light">{p.desc}</p></div>))}</div>
      </div>
    </div>
  );

  const renderFac = () => (
    <div className="min-h-screen relative p-8 md:p-16 overflow-y-auto">
      <ForestBackground />
      <div className="relative z-10 max-w-5xl mx-auto">
        <header className="mb-24 flex items-center gap-8 text-white"><button onClick={() => setView('hub')}><ArrowLeft /></button><h2 className="text-3xl font-serif">引导者之路</h2></header>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
           {FACILITATOR_STAGES.map((s, i) => (<div key={i} onClick={() => setActiveStage(i)} className={`p-10 bg-white/5 rounded-[3rem] border transition-all cursor-pointer ${activeStage === i ? 'border-[#d4af37]' : 'border-white/10'}`}><h4 className="text-lg text-white font-serif mb-2">阶段 {s.level}</h4><p className="text-xs text-white/40">{s.title}</p></div>))}
        </div>
      </div>
    </div>
  );

  const renderAbout = () => (
    <div className="min-h-screen relative p-8 md:p-16 flex items-center justify-center">
      <ForestBackground />
      <div className="relative z-10 text-center max-w-3xl">
        <header className="mb-20 flex items-center gap-8 text-white text-left"><button onClick={() => setView('hub')}><ArrowLeft /></button><h2 className="text-3xl font-serif">关于小院</h2></header>
        <p className="text-xl text-white/70 leading-[2.5] tracking-widest font-light mb-20 italic">「信任圈小院」是一个数字化的林中空地。<br/>在这里，我们学习如何守护灵魂的节奏，让真实在静默中自然破土。</p>
        <Button onClick={() => setView('hub')} variant="secondary">回到起点</Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen selection:bg-[#d4af37]/30 text-white font-sans overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@300;400;600&display=swap');
        .font-serif { font-family: 'Noto Serif SC', serif; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #0a1a0a; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
        @keyframes fadeInScale { from { opacity: 0; transform: scale(0.98) translateY(20px); } to { opacity: 1; transform: scale(1) translateY(0); } }
        .animate-in { animation: fadeInScale 1.5s ease-out forwards; }
      `}</style>
      {renderView()}
    </div>
  );
}

