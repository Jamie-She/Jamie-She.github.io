import citySunglasses from '../assets/practice/city-sunglasses-v26.jpg'
import bendShift from '../assets/practice/bend-shift.jpg'
import fakeAd from '../assets/practice/fake-ad.jpg'
import lingguangMaomao from '../assets/practice/lingguang-maomao.jpg'
import lingguangShimian from '../assets/practice/lingguang-shimian.jpg'
import lingguangYejian from '../assets/practice/lingguang-yejian.jpg'
import neonMarket from '../assets/practice/neon-market.jpg'
import voidDominion from '../assets/practice/void-dominion.jpg'
import lingguangYejianVideo from '../assets/video/lingguang-yejian.mp4'
import neonMarketVideo from '../assets/video/neon-market.mp4'
import voidDominionVideo from '../assets/video/void-dominion.mp4'
import voidDominionWebm from '../assets/video/void-dominion.webm'
import fakeAdVideo from '../assets/video/fake-ad.mp4'
import lingguangShimianVideo from '../assets/video/lingguang-shimian.mp4'
import lingguangMaomaoVideo from '../assets/video/lingguang-maomao.mp4'
import citySunglassesVideo from '../assets/video/city-sunglasses-v26.mp4'
import bendShiftVideo from '../assets/video/bend-shift.mp4'
import type { MediaAudioProfile } from '../lib/mediaAudio'

export type FrameworkItem = {
  level: string
  title: string
  english: string
  description: string
  evidence: string
}

export type HeroMedia = {
  src: string
  alt: string
  project: string
  label: string
  video: string
  videoWebm?: string
  orientation: 'landscape' | 'portrait'
  audioProfile?: MediaAudioProfile
}

export type PracticeMedia = {
  title: string
  label: string
  alt: string
  shape: 'portrait' | 'wide'
  position?: 'top' | 'center'
  src?: string
  video?: string
  videoWebm?: string
  href?: string
  detail?: string
  cta?: string
  status?: string
  audioProfile?: MediaAudioProfile
}

export type PracticeStage = {
  phase: string
  period: string
  title: string
  english: string
  claim: string
  practice: string
  aiRole: string
  output: string
  proof: string
  media: PracticeMedia[]
  current?: boolean
}

export type WorkflowStep = {
  title: string
  description: string
  term?: string
}

export type Capability = {
  name: string
  description: string
  emphasis: 'strong' | 'medium' | 'quiet'
  term?: string
}

export type Note = {
  date: string
  category: string
  title: string
  summary: string
  takeaway: string
  href?: string
}

export const profile = {
  brand: 'AI NATIVE',
  role: 'AI Product · Content · Operation',
  heroTitle: '我是Jamie，和AI一起做内容与互动体验',
  heroTitleLines: ['我是Jamie', '和AI一起做内容与互动体验'],
  heroDescription: '围绕内容生产、互动体验与创作者生态，持续验证AI能够改变哪些环节',
  statement: '讨论想法，也关注如何推进到真实结果',
  statementLines: ['讨论想法，也关注如何', '推进到真实结果'],
  about: 'AI策略 · 内容生态 · 长程任务交付',
  email: 'yourname@example.com',
  links: [
    { label: 'GitHub', href: 'https://github.com/yourname' },
    { label: '即刻 / 小红书', href: '#' },
  ],
  contact: {
    email: 'yourname@example.com',
    githubLabel: 'github.com/yourname',
    githubUrl: 'https://github.com/yourname',
    wechatQr: '',
    xiaohongshuQr: '',
  },
}

export const heroMedia: HeroMedia[] = [
  {
    src: voidDominion,
    video: voidDominionVideo,
    videoWebm: voidDominionWebm,
    alt: 'VOID DOMINION游戏实机演示',
    project: 'VOID DOMINION',
    label: 'GAME · LIVE',
    orientation: 'landscape',
    audioProfile: 'void',
  },
  {
    src: bendShift,
    video: bendShiftVideo,
    alt: 'BEND SHIFT赛车游戏实机演示',
    project: '不许控车 BENDSHIFT',
    label: 'RACING GAME / COUNTERINTUITIVE',
    orientation: 'landscape',
    audioProfile: 'bendshift',
  },
  {
    src: lingguangYejian,
    video: lingguangYejianVideo,
    alt: '夜间事务所灵光作品录屏',
    project: '夜间事务所',
    label: 'LINGGUANG · INTERACTIVE',
    orientation: 'portrait',
  },
  {
    src: neonMarket,
    video: neonMarketVideo,
    alt: '霓虹黑市互动空间实机演示',
    project: '霓虹黑市',
    label: 'AI INTERACTIVE SPACE',
    orientation: 'portrait',
  },
]

export const navigation = [
  { label: '实践', href: '#works' },
  { label: '方法', href: '#framework' },
  { label: '思考', href: '#thinking' },
]

export const framework: FrameworkItem[] = [
  {
    level: '01',
    title: '参照',
    english: 'REFERENCE',
    description: '先把抽象要求变成可比较的样例，让讨论有一个共同对象',
    evidence: '用具体结果校准预期',
  },
  {
    level: '02',
    title: '方法',
    english: 'METHOD',
    description: '从一次有效实践中拆出关键步骤，再判断哪些部分可以迁移',
    evidence: '保留原理，不复制表面流程',
  },
  {
    level: '03',
    title: '标准',
    english: 'CRITERIA',
    description: '明确质量边界，也保留对不同内容形态的判断空间',
    evidence: '标准不是定式，是选择依据',
  },
]

export const practiceStages: PracticeStage[] = [
  {
    phase: '01',
    period: '2026.02—04',
    title: '单点创作',
    english: 'PROMPT-LED EXPLORATION',
    claim: '从一件完整作品开始',
    practice: 'AI互动空间：从选题、玩法到原型与发布',
    aiRole: 'Prompt编排 · Human-in-the-loop',
    output: '《霓虹黑市》 · 《假广告成真局》',
    proof: '互动空间优秀作品',
    media: [
      {
        title: '霓虹黑市',
        label: 'AI INTERACTIVE SPACE',
        alt: '霓虹黑市互动空间实机画面',
        shape: 'portrait',
        src: neonMarket,
        video: neonMarketVideo,
      },
      {
        title: '假广告成真局',
        label: 'AI INTERACTIVE SPACE',
        alt: '假广告成真局互动空间实机画面',
        shape: 'portrait',
        src: fakeAd,
        video: fakeAdVideo,
        audioProfile: 'fakead',
      },
    ],
  },
  {
    phase: '02',
    period: '2026.04—06',
    title: '工作流复用',
    english: 'SKILL & CONTEXT',
    claim: '把单次实践沉淀为可复用的工作方式',
    practice: '灵光创作；把会话和项目材料变成TODO、周报和策略文档',
    aiRole: 'Skill抽象 · Context Engineering',
    output: '优质作品 ×7 · AI互动内容发布Skill',
    proof: '阿里灵光优质创作者 · 千元现金奖励',
    media: [
      {
        title: '夜间事务所',
        label: 'LINGGUANG · INTERACTIVE',
        alt: '夜间事务所灵光作品封面',
        shape: 'portrait',
        src: lingguangYejian,
        video: lingguangYejianVideo,
      },
      {
        title: '失眠电台',
        label: 'LINGGUANG · INTERACTIVE',
        alt: '失眠电台灵光作品封面',
        shape: 'portrait',
        src: lingguangShimian,
        video: lingguangShimianVideo,
        audioProfile: 'insomnia',
      },
      {
        title: '星夜猫猫急件',
        label: 'LINGGUANG · INTERACTIVE',
        alt: '猫猫邮局灵光作品封面',
        shape: 'portrait',
        src: lingguangMaomao,
        video: lingguangMaomaoVideo,
      },
    ],
  },
  {
    phase: '03',
    period: '2026.06—NOW',
    title: '长程任务交付',
    english: 'AGENTIC DELIVERY',
    claim: '从单点协作走向长线程任务交付',
    practice: '复杂游戏与AI商业短片，从概念推进至可发布结果',
    aiRole: 'Agentic Workflow · Tool Use · Eval-driven',
    output: 'VOID DOMINION · 不许控车BENDSHIFT · 商业短片',
    proof: '两款游戏已可玩 · 一支AI商业短片完成',
    current: true,
    media: [
      {
        title: 'VOID DOMINION',
        label: 'COMPLEX GAME · LIVE',
        alt: 'VOID DOMINION太空射击游戏画面',
        shape: 'wide',
        src: voidDominion,
        video: voidDominionVideo,
        videoWebm: voidDominionWebm,
        detail: '3D太空射击 · 多人联机 · 三端可玩',
        cta: '点击即玩',
        audioProfile: 'void',
        href:
          'https://sharky.gg/g/f13f48e1-b398-4955-83e0-8e9d77a1a9d3?mode=app&instance_id=28e2cfd2-9531-4872-9d92-2dc31f804721',
      },
      {
        title: '不许控车 BENDSHIFT',
        label: 'RACING GAME / COUNTERINTUITIVE',
        alt: 'BEND SHIFT赛车游戏实机画面',
        shape: 'wide',
        src: bendShift,
        video: bendShiftVideo,
        detail: '不控制车，实时掰动赛道改变路线',
        cta: '点击即玩',
        audioProfile: 'bendshift',
        href: 'https://bytedance.aiforce.cloud/app/app_17bb2eu23aj/',
      },
      {
        title: '城市需要一副墨镜',
        label: 'AI COMMERCIAL FILM · 13S',
        alt: '城市需要一副墨镜AI商业概念片',
        shape: 'portrait',
        position: 'center',
        src: citySunglasses,
        video: citySunglassesVideo,
        audioProfile: 'embedded',
        detail: '从创意概念推进到完整成片',
      },
    ],
  },
]

export const workflow: WorkflowStep[] = [
  { title: '目标', description: '明确任务最终需要改变什么' },
  { title: '上下文', description: '提供当前阶段真正相关的信息', term: 'CONTEXT ENGINEERING' },
  { title: '路径', description: '拆分关键节点与主要不确定性' },
  { title: '调用', description: '为不同问题选择合适的工具', term: 'TOOL ROUTING' },
  { title: '产出', description: '尽早形成可观察的中间结果' },
  { title: '评估', description: '按照质量标准识别结果偏差', term: 'EVALS' },
  { title: '校正', description: '根据反馈调整优先级与方案' },
  { title: '沉淀', description: '保留有效判断与可复用方法' },
]

export const capabilities: Capability[] = [
  {
    name: 'AI策略判断',
    description: '判断什么适合由AI承担，什么需要保留人工决策',
    emphasis: 'strong',
  },
  {
    name: '上下文编排',
    description: '根据任务阶段组织信息，避免无效输入干扰判断',
    emphasis: 'medium',
    term: 'CONTEXT ENGINEERING',
  },
  {
    name: 'Skill Design',
    description: '把反复验证的方法沉淀为可调用的工作能力',
    emphasis: 'strong',
  },
  {
    name: '长程任务编排',
    description: '拆分复杂任务，并在关键节点保留人工校验',
    emphasis: 'medium',
    term: 'AGENTIC WORKFLOW',
  },
  {
    name: '质量标准',
    description: '为不同内容形态定义可执行的质量判断',
    emphasis: 'medium',
    term: 'EVALS',
  },
  {
    name: '内容生态',
    description: '分析生产、分发、消费与反馈如何共同影响内容供给',
    emphasis: 'quiet',
  },
  {
    name: '创作者运营',
    description: '设计招募、共创、激励与成长机制，改善创作者体验',
    emphasis: 'medium',
  },
  {
    name: '智能选题',
    description: '结合真实场景、用户反馈与模型能力判断优先级',
    emphasis: 'quiet',
  },
  {
    name: 'AI Coding',
    description: '将想法推进为原型、测试版本与可用产品',
    emphasis: 'quiet',
  },
  {
    name: '长线程交付',
    description: '在持续上下文中推进复杂任务，直到形成可验收结果',
    emphasis: 'medium',
  },
]

export const notes: Note[] = [
  {
    date: 'NOW',
    category: 'AI · 资产',
    title: '为什么越来越不值得收藏Prompt',
    summary: '曾经也会收藏Prompt，但模型变化之后，具体措辞很快失去价值',
    takeaway: '更值得保存的，是提问时采用的视角、输入结构，以及判断质量的依据',
  },
  {
    date: 'NOW',
    category: 'Agent · 创作',
    title: '创作Agent最先该守住什么',
    summary: '当生成不再稀缺，创作重新回到意图、取舍与持续性',
    takeaway: '如果无法保持创作意图，Agent只会让内容更完整，却未必更有方向',
  },
  {
    date: 'NOW',
    category: 'Evals · 策略',
    title: '选题可以交给AI多少',
    summary: 'AI可以迅速扩展候选，但“值得做”并不等于概率最高或数据最好',
    takeaway: '数据负责缩小范围，人的偏好、时机与野心仍然决定最终选择',
  },
]
