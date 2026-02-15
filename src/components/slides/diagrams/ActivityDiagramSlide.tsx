import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FadeIn } from '../../TextReveal';
import {
  Play, Shield, Mic, Brain, Wrench, Clock, AlertTriangle, Power,
  Eye, Settings, Keyboard, MonitorSmartphone, Camera, Server,
  MessageSquare, Volume2, CheckCircle, XCircle, Bell, Database,
  Wifi, WifiOff, Lock, Music, Mail, FileText, Image,
} from 'lucide-react';
import DiagramModal from '../../DiagramModal';

/* ─── Types ─── */
interface Node {
  id: string;
  label: string;
  type: 'start' | 'end' | 'action' | 'decision' | 'fork';
  icon?: React.ElementType;
  color: string;
  x: number;  // percent
  y: number;  // percent
}

interface Edge {
  from: string;
  to: string;
  label?: string;
  dashed?: boolean;
}

interface Step {
  title: string;
  description: string;
  nodes: Node[];
  edges: Edge[];
}

/* ─── Colors ─── */
const CL = {
  user: '#60a5fa',     // blue – user / UI
  voice: '#f472b6',    // pink – voice / speech
  policy: '#4ade80',   // green – policy / validation
  llm: '#c084fc',      // purple – LLM / AI
  tools: '#94a3b8',    // gray – OS / tools
  sched: '#fb923c',    // orange – scheduling / proactive
  emotion: '#38bdf8',  // cyan – context / emotion
  privacy: '#f87171',  // red – privacy / error
  data: '#a78bfa',     // violet – storage / logs
  ready: '#9d8cff',    // default purple
};

/* ═══════════ 9 STEPS ═══════════ */
const STEPS: Step[] = [
  /* ── 0  Initialization ── */
  {
    title: 'System Initialization',
    description:
      'The app starts by showing "Initializing". The Orchestrator loads settings, hotkeys, and toggles from local storage. The Permission Manager checks mic/camera/screen permissions. If the AI server is not configured, the user is prompted to enter URL + token. Background services start in parallel: Proactive Monitor, Local Scheduler, and (optionally) the Emotion Engine. UI transitions to "Ready".',
    nodes: [
      { id: 'start', label: 'Start', type: 'start', color: CL.ready, x: 50, y: 2 },
      { id: 'initUI', label: 'UI: Initializing', type: 'action', icon: MonitorSmartphone, color: CL.user, x: 50, y: 10 },
      { id: 'loadSettings', label: 'Load Settings + Hotkeys', type: 'action', icon: Settings, color: CL.sched, x: 50, y: 18 },
      { id: 'checkPerms', label: 'Check Mic / Camera / Screen Perms', type: 'action', icon: Lock, color: CL.policy, x: 50, y: 26 },
      { id: 'serverConf', label: 'AI Server Configured?', type: 'decision', color: CL.llm, x: 50, y: 35 },
      { id: 'openSettings', label: 'Open Settings → Save', type: 'action', icon: Settings, color: CL.privacy, x: 20, y: 43 },
      { id: 'pingLLM', label: 'Ping LLM Server', type: 'action', icon: Wifi, color: CL.llm, x: 50, y: 43 },
      { id: 'forkStart', label: 'Start Background Services ∥', type: 'fork', color: CL.ready, x: 50, y: 52 },
      { id: 'proMon', label: 'Proactive Monitor Loop', type: 'action', icon: Eye, color: CL.sched, x: 18, y: 62 },
      { id: 'scheduler', label: 'Local Scheduler Loop', type: 'action', icon: Clock, color: CL.sched, x: 50, y: 62 },
      { id: 'emotionEng', label: 'Emotion Engine (if ON)', type: 'action', icon: Camera, color: CL.emotion, x: 82, y: 62 },
      { id: 'ready', label: 'UI: Ready (Idle)', type: 'action', icon: CheckCircle, color: CL.ready, x: 50, y: 74 },
    ],
    edges: [
      { from: 'start', to: 'initUI' },
      { from: 'initUI', to: 'loadSettings' },
      { from: 'loadSettings', to: 'checkPerms' },
      { from: 'checkPerms', to: 'serverConf' },
      { from: 'serverConf', to: 'openSettings', label: 'No' },
      { from: 'serverConf', to: 'pingLLM', label: 'Yes' },
      { from: 'openSettings', to: 'pingLLM' },
      { from: 'pingLLM', to: 'forkStart' },
      { from: 'forkStart', to: 'proMon' },
      { from: 'forkStart', to: 'scheduler' },
      { from: 'forkStart', to: 'emotionEng' },
      { from: 'proMon', to: 'ready', dashed: true },
      { from: 'scheduler', to: 'ready', dashed: true },
      { from: 'emotionEng', to: 'ready', dashed: true },
    ],
  },

  /* ── 1  Privacy & Camera Interrupts ── */
  {
    title: 'Privacy Mode & Camera Toggle',
    description:
      'At ANY time the user can press the Privacy hotkey — the highest-priority interrupt. Privacy Manager immediately disables screen/context capture, pauses the Emotion Engine, and blocks sensitive data from reaching the LLM. UI indicators update instantly. Camera can also be toggled independently: it only starts if permission is granted AND privacy is OFF.',
    nodes: [
      { id: 'idle', label: 'Ready (Idle)', type: 'action', icon: CheckCircle, color: CL.ready, x: 50, y: 3 },
      { id: 'privKey', label: 'Privacy Hotkey Pressed', type: 'action', icon: Keyboard, color: CL.privacy, x: 25, y: 14 },
      { id: 'privON', label: 'Set Privacy = ON', type: 'action', icon: Shield, color: CL.privacy, x: 25, y: 24 },
      { id: 'disCtx', label: 'Disable Screen / Context', type: 'action', icon: XCircle, color: CL.privacy, x: 10, y: 35 },
      { id: 'stopEmo', label: 'Stop Emotion Engine', type: 'action', icon: Camera, color: CL.privacy, x: 25, y: 35 },
      { id: 'blockLLM', label: 'Block Sensitive LLM Data', type: 'action', icon: Lock, color: CL.privacy, x: 40, y: 35 },
      { id: 'updateUI', label: 'Update UI Indicators', type: 'action', icon: MonitorSmartphone, color: CL.user, x: 25, y: 47 },
      { id: 'camToggle', label: 'Camera Toggle Pressed', type: 'action', icon: Camera, color: CL.emotion, x: 75, y: 14 },
      { id: 'camCheck', label: 'Permission + Privacy OFF?', type: 'decision', color: CL.policy, x: 75, y: 26 },
      { id: 'startCam', label: 'Start Emotion Engine', type: 'action', icon: Camera, color: CL.emotion, x: 62, y: 38 },
      { id: 'camWarn', label: 'Keep OFF + UI Warning', type: 'action', icon: AlertTriangle, color: CL.privacy, x: 88, y: 38 },
      { id: 'return', label: 'Return to Ready', type: 'action', icon: CheckCircle, color: CL.ready, x: 50, y: 55 },
    ],
    edges: [
      { from: 'idle', to: 'privKey' },
      { from: 'idle', to: 'camToggle' },
      { from: 'privKey', to: 'privON' },
      { from: 'privON', to: 'disCtx' },
      { from: 'privON', to: 'stopEmo' },
      { from: 'privON', to: 'blockLLM' },
      { from: 'disCtx', to: 'updateUI' },
      { from: 'stopEmo', to: 'updateUI' },
      { from: 'blockLLM', to: 'updateUI' },
      { from: 'updateUI', to: 'return' },
      { from: 'camToggle', to: 'camCheck' },
      { from: 'camCheck', to: 'startCam', label: 'Yes' },
      { from: 'camCheck', to: 'camWarn', label: 'No' },
      { from: 'startCam', to: 'return' },
      { from: 'camWarn', to: 'return' },
    ],
  },

  /* ── 2  Main Interaction ── */
  {
    title: 'Main Interaction Flow',
    description:
      'The user triggers AYO via text input, voice wake-word, or push-to-talk hotkey. If voice, Speech-to-Text converts audio to transcript; failure loops back. Policy performs pre-checks: cooldown, DND status, privacy mode, and required permissions. Context is built with active app + idle state, optional screen summary, and optional emotion signal. The full request is sent to the LLM via HTTPS + Auth.',
    nodes: [
      { id: 'trigger', label: 'User Triggers Assistant', type: 'action', icon: MessageSquare, color: CL.user, x: 50, y: 2 },
      { id: 'voiceQ', label: 'Voice Input?', type: 'decision', color: CL.voice, x: 50, y: 11 },
      { id: 'captureVoice', label: 'Capture Voice', type: 'action', icon: Mic, color: CL.voice, x: 25, y: 20 },
      { id: 'stt', label: 'Speech → Text', type: 'action', icon: Volume2, color: CL.voice, x: 25, y: 29 },
      { id: 'sttFail', label: 'Empty / Fail?', type: 'decision', color: CL.privacy, x: 10, y: 38 },
      { id: 'tryAgain', label: 'UI: "Try Again"', type: 'action', icon: AlertTriangle, color: CL.privacy, x: 10, y: 48 },
      { id: 'useText', label: 'Use Typed Text', type: 'action', icon: Keyboard, color: CL.user, x: 70, y: 20 },
      { id: 'policyPre', label: 'Policy Pre-Checks', type: 'action', icon: Shield, color: CL.policy, x: 50, y: 38 },
      { id: 'cooldown', label: 'Cooldown / DND', type: 'action', icon: Clock, color: CL.policy, x: 30, y: 47 },
      { id: 'privStatus', label: 'Privacy Status', type: 'action', icon: Lock, color: CL.policy, x: 50, y: 47 },
      { id: 'permsReq', label: 'Required Perms', type: 'action', icon: Shield, color: CL.policy, x: 70, y: 47 },
      { id: 'buildCtx', label: 'Build Context Package', type: 'action', icon: Eye, color: CL.emotion, x: 50, y: 57 },
      { id: 'activeApp', label: 'Active App + Idle', type: 'action', icon: MonitorSmartphone, color: CL.emotion, x: 28, y: 66 },
      { id: 'ctxSummary', label: 'Screen Summary (opt)', type: 'action', icon: FileText, color: CL.emotion, x: 50, y: 66 },
      { id: 'emotionSig', label: 'Emotion Signal (opt)', type: 'action', icon: Camera, color: CL.emotion, x: 72, y: 66 },
      { id: 'sendLLM', label: 'Send to LLM (HTTPS + Auth)', type: 'action', icon: Server, color: CL.llm, x: 50, y: 77 },
    ],
    edges: [
      { from: 'trigger', to: 'voiceQ' },
      { from: 'voiceQ', to: 'captureVoice', label: 'Yes' },
      { from: 'voiceQ', to: 'useText', label: 'No' },
      { from: 'captureVoice', to: 'stt' },
      { from: 'stt', to: 'sttFail' },
      { from: 'sttFail', to: 'tryAgain', label: 'Yes' },
      { from: 'sttFail', to: 'policyPre', label: 'No' },
      { from: 'useText', to: 'policyPre' },
      { from: 'policyPre', to: 'cooldown' },
      { from: 'policyPre', to: 'privStatus' },
      { from: 'policyPre', to: 'permsReq' },
      { from: 'cooldown', to: 'buildCtx', dashed: true },
      { from: 'privStatus', to: 'buildCtx', dashed: true },
      { from: 'permsReq', to: 'buildCtx', dashed: true },
      { from: 'buildCtx', to: 'activeApp' },
      { from: 'buildCtx', to: 'ctxSummary' },
      { from: 'buildCtx', to: 'emotionSig' },
      { from: 'activeApp', to: 'sendLLM', dashed: true },
      { from: 'ctxSummary', to: 'sendLLM', dashed: true },
      { from: 'emotionSig', to: 'sendLLM', dashed: true },
    ],
  },

  /* ── 3  LLM Response + Validation ── */
  {
    title: 'LLM Response & Plan Validation',
    description:
      'The LLM returns response text plus a structured plan with tool suggestions and execution arguments. The Policy Engine validates each suggestion against the allowlist, permission set, privacy constraints, and classifies the risk level. Outcomes branch into three: text-only (no tool needed or tool blocked), low-impact auto-execution, or high-impact requiring user confirmation.',
    nodes: [
      { id: 'llmResp', label: 'LLM Returns Response + Plan', type: 'action', icon: Brain, color: CL.llm, x: 50, y: 3 },
      { id: 'respText', label: 'Response Text', type: 'action', icon: MessageSquare, color: CL.llm, x: 30, y: 13 },
      { id: 'toolSugg', label: 'Tool Suggestions + Args', type: 'action', icon: Wrench, color: CL.llm, x: 70, y: 13 },
      { id: 'validate', label: 'Policy Engine Validates', type: 'action', icon: Shield, color: CL.policy, x: 50, y: 24 },
      { id: 'allowlist', label: 'Allowlist Check', type: 'action', icon: CheckCircle, color: CL.policy, x: 22, y: 33 },
      { id: 'permCheck', label: 'Permission Check', type: 'action', icon: Lock, color: CL.policy, x: 42, y: 33 },
      { id: 'privConst', label: 'Privacy Constraints', type: 'action', icon: Shield, color: CL.policy, x: 62, y: 33 },
      { id: 'riskClass', label: 'Risk Classification', type: 'action', icon: AlertTriangle, color: CL.sched, x: 82, y: 33 },
      { id: 'outcome', label: 'Outcome Type?', type: 'decision', color: CL.sched, x: 50, y: 45 },
      { id: 'textOnly', label: 'Text Only → UI + TTS', type: 'action', icon: Volume2, color: CL.user, x: 15, y: 58 },
      { id: 'lowImpact', label: 'Low-Impact → Auto Execute', type: 'action', icon: Play, color: CL.policy, x: 50, y: 58 },
      { id: 'highImpact', label: 'High-Impact → Confirm', type: 'action', icon: AlertTriangle, color: CL.privacy, x: 85, y: 58 },
      { id: 'ready', label: 'Return to Ready', type: 'action', icon: CheckCircle, color: CL.ready, x: 50, y: 72 },
    ],
    edges: [
      { from: 'llmResp', to: 'respText' },
      { from: 'llmResp', to: 'toolSugg' },
      { from: 'respText', to: 'validate', dashed: true },
      { from: 'toolSugg', to: 'validate' },
      { from: 'validate', to: 'allowlist' },
      { from: 'validate', to: 'permCheck' },
      { from: 'validate', to: 'privConst' },
      { from: 'validate', to: 'riskClass' },
      { from: 'allowlist', to: 'outcome', dashed: true },
      { from: 'permCheck', to: 'outcome', dashed: true },
      { from: 'privConst', to: 'outcome', dashed: true },
      { from: 'riskClass', to: 'outcome', dashed: true },
      { from: 'outcome', to: 'textOnly', label: 'None / Blocked' },
      { from: 'outcome', to: 'lowImpact', label: 'Low' },
      { from: 'outcome', to: 'highImpact', label: 'High' },
      { from: 'textOnly', to: 'ready' },
      { from: 'lowImpact', to: 'ready' },
      { from: 'highImpact', to: 'ready' },
    ],
  },

  /* ── 4  Tool Execution ── */
  {
    title: 'Tool Execution & Confirmation',
    description:
      'Low-impact actions (open app, focus window, send notification) execute immediately through the Tool Executor on the client OS. If an external integration is needed (Spotify, Email), the corresponding API is called. High-impact actions (send email, make purchase, account changes) require an explicit user confirmation dialog before execution. All outcomes are logged.',
    nodes: [
      { id: 'toolExec', label: 'Tool Executor', type: 'action', icon: Wrench, color: CL.tools, x: 50, y: 3 },
      { id: 'extQ', label: 'External API Needed?', type: 'decision', color: CL.sched, x: 30, y: 14 },
      { id: 'spotify', label: 'Spotify API', type: 'action', icon: Music, color: CL.emotion, x: 10, y: 26 },
      { id: 'email', label: 'Email API', type: 'action', icon: Mail, color: CL.emotion, x: 30, y: 26 },
      { id: 'osAction', label: 'OS Action (open/focus/notify)', type: 'action', icon: MonitorSmartphone, color: CL.tools, x: 60, y: 14 },
      { id: 'toolResult', label: 'Tool Returns Success / Fail', type: 'action', icon: CheckCircle, color: CL.policy, x: 40, y: 38 },
      { id: 'showResult', label: 'UI: Show Result + TTS', type: 'action', icon: Volume2, color: CL.user, x: 40, y: 50 },
      { id: 'highConfirm', label: 'High-Impact: Show Confirmation', type: 'action', icon: AlertTriangle, color: CL.privacy, x: 80, y: 30 },
      { id: 'userConfirm', label: 'User Confirms?', type: 'decision', color: CL.privacy, x: 80, y: 42 },
      { id: 'execHigh', label: 'Execute Action', type: 'action', icon: Play, color: CL.policy, x: 68, y: 54 },
      { id: 'cancelHigh', label: 'Cancel → "Cancelled"', type: 'action', icon: XCircle, color: CL.privacy, x: 92, y: 54 },
      { id: 'logSession', label: 'Log Session (if enabled)', type: 'action', icon: Database, color: CL.data, x: 50, y: 66 },
      { id: 'ready', label: 'Ready', type: 'action', icon: CheckCircle, color: CL.ready, x: 50, y: 78 },
    ],
    edges: [
      { from: 'toolExec', to: 'extQ' },
      { from: 'toolExec', to: 'osAction' },
      { from: 'extQ', to: 'spotify', label: 'Spotify' },
      { from: 'extQ', to: 'email', label: 'Email' },
      { from: 'spotify', to: 'toolResult' },
      { from: 'email', to: 'toolResult' },
      { from: 'osAction', to: 'toolResult' },
      { from: 'toolResult', to: 'showResult' },
      { from: 'showResult', to: 'logSession' },
      { from: 'toolExec', to: 'highConfirm', dashed: true },
      { from: 'highConfirm', to: 'userConfirm' },
      { from: 'userConfirm', to: 'execHigh', label: 'Yes' },
      { from: 'userConfirm', to: 'cancelHigh', label: 'No' },
      { from: 'execHigh', to: 'logSession' },
      { from: 'cancelHigh', to: 'logSession' },
      { from: 'logSession', to: 'ready' },
    ],
  },

  /* ── 5  Scheduled Actions ── */
  {
    title: 'Delayed / Scheduled Actions',
    description:
      'Users can request delayed actions (e.g. "in 1 minute, send email"). The Orchestrator gets a plan from the LLM (including delay + payload), Policy validates scheduling is allowed, then a job is created in the Local Scheduler. The scheduler waits asynchronously while the UI stays Ready. When the timer fires, the system re-checks policy and permissions (privacy might have changed). If still allowed, the tool executes; otherwise, the job is cancelled safely.',
    nodes: [
      { id: 'userReq', label: 'User Requests Delay', type: 'action', icon: Clock, color: CL.user, x: 50, y: 2 },
      { id: 'llmPlan', label: 'LLM: Plan + Delay + Payload', type: 'action', icon: Brain, color: CL.llm, x: 50, y: 12 },
      { id: 'policyOK', label: 'Policy Validates Scheduling', type: 'action', icon: Shield, color: CL.policy, x: 50, y: 22 },
      { id: 'createJob', label: 'Create Job in Scheduler', type: 'action', icon: Clock, color: CL.sched, x: 50, y: 32 },
      { id: 'wait', label: 'Wait Asynchronously', type: 'action', icon: Clock, color: CL.tools, x: 50, y: 42 },
      { id: 'timerFire', label: 'Timer Fires', type: 'action', icon: Bell, color: CL.sched, x: 50, y: 52 },
      { id: 'recheck', label: 'Re-check Policy + Perms', type: 'action', icon: Shield, color: CL.policy, x: 50, y: 62 },
      { id: 'stillOK', label: 'Still Allowed?', type: 'decision', color: CL.policy, x: 50, y: 72 },
      { id: 'execTool', label: 'Execute Tool → "Task Done"', type: 'action', icon: Play, color: CL.policy, x: 25, y: 82 },
      { id: 'blocked', label: 'Cancel → "Blocked by Policy"', type: 'action', icon: XCircle, color: CL.privacy, x: 75, y: 82 },
      { id: 'log', label: 'Log Outcome', type: 'action', icon: Database, color: CL.data, x: 50, y: 92 },
    ],
    edges: [
      { from: 'userReq', to: 'llmPlan' },
      { from: 'llmPlan', to: 'policyOK' },
      { from: 'policyOK', to: 'createJob' },
      { from: 'createJob', to: 'wait' },
      { from: 'wait', to: 'timerFire', dashed: true },
      { from: 'timerFire', to: 'recheck' },
      { from: 'recheck', to: 'stillOK' },
      { from: 'stillOK', to: 'execTool', label: 'Yes' },
      { from: 'stillOK', to: 'blocked', label: 'No' },
      { from: 'execTool', to: 'log' },
      { from: 'blocked', to: 'log' },
    ],
  },

  /* ── 6  Proactive Suggestions ── */
  {
    title: 'Proactive Suggestions',
    description:
      'The Proactive Monitor runs in the background and detects triggers (idle patterns, repeated actions). Before interrupting, it goes through Policy checks: is proactivity enabled? Cooldown/DND active? Privacy constraints? If allowed, a preset tip is shown or the LLM is called for a contextual suggestion. A toast appears in the UI with optional TTS. If the user accepts, it enters the Main Interaction Flow; otherwise monitoring continues.',
    nodes: [
      { id: 'monitor', label: 'Proactive Monitor Detects Trigger', type: 'action', icon: Eye, color: CL.sched, x: 50, y: 3 },
      { id: 'proCheck', label: 'Proactivity Enabled?', type: 'action', icon: Shield, color: CL.policy, x: 25, y: 14 },
      { id: 'coolDND', label: 'Cooldown / DND?', type: 'action', icon: Clock, color: CL.policy, x: 50, y: 14 },
      { id: 'privChk', label: 'Privacy Constraints?', type: 'action', icon: Lock, color: CL.policy, x: 75, y: 14 },
      { id: 'allowQ', label: 'Allowed to Interrupt?', type: 'decision', color: CL.policy, x: 50, y: 26 },
      { id: 'contLoop', label: 'Continue Monitoring', type: 'action', icon: Eye, color: CL.tools, x: 85, y: 26 },
      { id: 'presetOrLLM', label: 'Preset Tip OR Call LLM', type: 'decision', color: CL.llm, x: 50, y: 38 },
      { id: 'preset', label: 'Use Preset Suggestion', type: 'action', icon: Bell, color: CL.sched, x: 25, y: 48 },
      { id: 'callLLM', label: 'LLM Contextual Suggestion', type: 'action', icon: Brain, color: CL.llm, x: 75, y: 48 },
      { id: 'toast', label: 'UI: Show Toast + TTS', type: 'action', icon: Volume2, color: CL.user, x: 50, y: 60 },
      { id: 'acceptQ', label: 'User Accepts?', type: 'decision', color: CL.user, x: 50, y: 72 },
      { id: 'mainFlow', label: 'Enter Main Interaction', type: 'action', icon: MessageSquare, color: CL.ready, x: 25, y: 84 },
      { id: 'dismiss', label: 'Dismiss → Keep Monitoring', type: 'action', icon: XCircle, color: CL.tools, x: 75, y: 84 },
    ],
    edges: [
      { from: 'monitor', to: 'proCheck' },
      { from: 'monitor', to: 'coolDND' },
      { from: 'monitor', to: 'privChk' },
      { from: 'proCheck', to: 'allowQ', dashed: true },
      { from: 'coolDND', to: 'allowQ', dashed: true },
      { from: 'privChk', to: 'allowQ', dashed: true },
      { from: 'allowQ', to: 'contLoop', label: 'No' },
      { from: 'allowQ', to: 'presetOrLLM', label: 'Yes' },
      { from: 'presetOrLLM', to: 'preset', label: 'Preset' },
      { from: 'presetOrLLM', to: 'callLLM', label: 'LLM' },
      { from: 'preset', to: 'toast' },
      { from: 'callLLM', to: 'toast' },
      { from: 'toast', to: 'acceptQ' },
      { from: 'acceptQ', to: 'mainFlow', label: 'Yes' },
      { from: 'acceptQ', to: 'dismiss', label: 'No' },
    ],
  },

  /* ── 7  Failures ── */
  {
    title: 'Failure & Edge Cases',
    description:
      'LLM server offline or timeout triggers a fallback response and the UI shows "Offline". Auth failure disables LLM calls until fixed. Tool execution failure shows a safe error message. Permission revoked mid-run disables the feature and the system continues in reduced mode. If privacy is toggled mid-flow, sensitive context is discarded and the action is re-validated before executing.',
    nodes: [
      { id: 'llmOff', label: 'LLM Offline / Timeout', type: 'action', icon: WifiOff, color: CL.privacy, x: 18, y: 4 },
      { id: 'fallback', label: 'Fallback Response', type: 'action', icon: AlertTriangle, color: CL.sched, x: 18, y: 17 },
      { id: 'uiOff', label: 'UI: "Offline"', type: 'action', icon: MonitorSmartphone, color: CL.user, x: 18, y: 30 },
      { id: 'authFail', label: 'Auth Failed', type: 'action', icon: Lock, color: CL.privacy, x: 42, y: 4 },
      { id: 'disableAI', label: 'Disable AI Calls', type: 'action', icon: XCircle, color: CL.privacy, x: 42, y: 17 },
      { id: 'uiUnauth', label: 'UI: "Unauthorized"', type: 'action', icon: MonitorSmartphone, color: CL.user, x: 42, y: 30 },
      { id: 'toolFail', label: 'Tool Execution Failed', type: 'action', icon: AlertTriangle, color: CL.privacy, x: 66, y: 4 },
      { id: 'safeErr', label: 'Safe Error Message', type: 'action', icon: AlertTriangle, color: CL.sched, x: 66, y: 17 },
      { id: 'logErr', label: 'Log Error', type: 'action', icon: Database, color: CL.data, x: 66, y: 30 },
      { id: 'permRevoke', label: 'Permission Revoked', type: 'action', icon: Lock, color: CL.privacy, x: 88, y: 4 },
      { id: 'reducedMode', label: 'Reduced Mode', type: 'action', icon: Shield, color: CL.sched, x: 88, y: 17 },
      { id: 'privMidFlow', label: 'Privacy Toggled Mid-Flow', type: 'action', icon: Shield, color: CL.privacy, x: 50, y: 50 },
      { id: 'discardCtx', label: 'Discard Sensitive Context', type: 'action', icon: XCircle, color: CL.privacy, x: 30, y: 62 },
      { id: 'revalidate', label: 'Re-Validate Before Executing', type: 'action', icon: Shield, color: CL.policy, x: 70, y: 62 },
      { id: 'ready', label: 'Return to Ready', type: 'action', icon: CheckCircle, color: CL.ready, x: 50, y: 78 },
    ],
    edges: [
      { from: 'llmOff', to: 'fallback' },
      { from: 'fallback', to: 'uiOff' },
      { from: 'uiOff', to: 'ready' },
      { from: 'authFail', to: 'disableAI' },
      { from: 'disableAI', to: 'uiUnauth' },
      { from: 'uiUnauth', to: 'ready' },
      { from: 'toolFail', to: 'safeErr' },
      { from: 'safeErr', to: 'logErr' },
      { from: 'logErr', to: 'ready' },
      { from: 'permRevoke', to: 'reducedMode' },
      { from: 'reducedMode', to: 'ready' },
      { from: 'privMidFlow', to: 'discardCtx' },
      { from: 'privMidFlow', to: 'revalidate' },
      { from: 'discardCtx', to: 'ready' },
      { from: 'revalidate', to: 'ready' },
    ],
  },

  /* ── 8  Logging & Shutdown ── */
  {
    title: 'Logging & Shutdown',
    description:
      'After any interaction, scheduled job, or error — minimal session metadata is saved to Storage/Logs (only if enabled). Privacy mode and retention settings are always respected. On shutdown, the user exits the app. All monitors, scheduler, emotion engine, and voice services are stopped. Settings and logs are saved to local storage. The application ends.',
    nodes: [
      { id: 'anyEvent', label: 'Any Interaction / Job / Error', type: 'action', icon: MessageSquare, color: CL.ready, x: 30, y: 3 },
      { id: 'logEnabled', label: 'Logging Enabled?', type: 'decision', color: CL.data, x: 30, y: 14 },
      { id: 'saveLog', label: 'Save Session Metadata', type: 'action', icon: Database, color: CL.data, x: 15, y: 26 },
      { id: 'respectPriv', label: 'Respect Privacy + Retention', type: 'action', icon: Shield, color: CL.policy, x: 15, y: 38 },
      { id: 'skip', label: 'Skip Logging', type: 'action', icon: XCircle, color: CL.tools, x: 45, y: 26 },
      { id: 'ready', label: 'Continue / Ready', type: 'action', icon: CheckCircle, color: CL.ready, x: 30, y: 50 },
      { id: 'userExit', label: 'User Exits App', type: 'action', icon: Power, color: CL.user, x: 75, y: 3 },
      { id: 'stopMon', label: 'Stop Monitors', type: 'action', icon: XCircle, color: CL.sched, x: 65, y: 15 },
      { id: 'stopSched', label: 'Stop Scheduler', type: 'action', icon: Clock, color: CL.sched, x: 85, y: 15 },
      { id: 'stopEmo', label: 'Stop Emotion Engine', type: 'action', icon: Camera, color: CL.emotion, x: 65, y: 28 },
      { id: 'stopVoice', label: 'Stop Voice Services', type: 'action', icon: Mic, color: CL.voice, x: 85, y: 28 },
      { id: 'saveFinal', label: 'Save Settings + Logs', type: 'action', icon: Database, color: CL.data, x: 75, y: 42 },
      { id: 'end', label: 'End', type: 'end', color: CL.privacy, x: 75, y: 56 },
    ],
    edges: [
      { from: 'anyEvent', to: 'logEnabled' },
      { from: 'logEnabled', to: 'saveLog', label: 'Yes' },
      { from: 'logEnabled', to: 'skip', label: 'No' },
      { from: 'saveLog', to: 'respectPriv' },
      { from: 'respectPriv', to: 'ready' },
      { from: 'skip', to: 'ready' },
      { from: 'userExit', to: 'stopMon' },
      { from: 'userExit', to: 'stopSched' },
      { from: 'stopMon', to: 'stopEmo' },
      { from: 'stopSched', to: 'stopVoice' },
      { from: 'stopEmo', to: 'saveFinal' },
      { from: 'stopVoice', to: 'saveFinal' },
      { from: 'saveFinal', to: 'end' },
    ],
  },
];

/* ═══════════ COMPONENT ═══════════ */
const ActivityDiagramSlide = ({ animate, currentStep }: { animate: boolean; currentStep: number }) => {
  const [showOriginal, setShowOriginal] = useState(false);
  const step = STEPS[currentStep] || STEPS[0];
  const nodeMap = new Map(step.nodes.map((n) => [n.id, n]));

  return (
    <div className="flex h-full w-full max-w-7xl mx-auto px-6 py-5 gap-5">
      {/* ── LEFT: diagram ── */}
      <div className="relative flex-[1.5] flex flex-col min-w-0">
        {/* View Original button */}
        <button
          onClick={() => setShowOriginal(true)}
          className="absolute top-1 right-3 z-[5] flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-medium tracking-wide transition-all"
          style={{
            background: 'rgba(157,140,255,0.08)',
            border: '1px solid rgba(157,140,255,0.15)',
            color: 'rgba(157,140,255,0.5)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(157,140,255,0.15)';
            e.currentTarget.style.color = 'rgba(157,140,255,0.8)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(157,140,255,0.08)';
            e.currentTarget.style.color = 'rgba(157,140,255,0.5)';
          }}
        >
          <Image size={12} />
          VIEW ORIGINAL
        </button>
        <FadeIn delay={0.1} animate={animate}>
          <p className="text-xs tracking-[0.4em] uppercase mb-3" style={{ color: 'rgba(157,140,255,0.6)' }}>
            Activity Diagram &middot; Step {currentStep + 1} / {STEPS.length}
          </p>
        </FadeIn>

        <div className="relative flex-1 min-h-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              {/* SVG edges */}
              <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
                <defs>
                  <marker id="act-arr" markerWidth="6" markerHeight="5" refX="5" refY="2.5" orient="auto">
                    <path d="M0,0.5 L5,2.5 L0,4.5" fill="none" stroke="rgba(157,140,255,0.5)" strokeWidth="0.8" />
                  </marker>
                </defs>
                {step.edges.map((edge, ei) => {
                  const fn = nodeMap.get(edge.from);
                  const tn = nodeMap.get(edge.to);
                  if (!fn || !tn) return null;

                  const x1 = fn.x;
                  const y1 = fn.y + 3;
                  const x2 = tn.x;
                  const y2 = tn.y;
                  const mx = (x1 + x2) / 2;
                  const my = (y1 + y2) / 2;

                  return (
                    <g key={ei}>
                      <motion.line
                        x1={`${x1}%`} y1={`${y1}%`}
                        x2={`${x2}%`} y2={`${y2}%`}
                        stroke={edge.dashed ? 'rgba(157,140,255,0.12)' : 'rgba(157,140,255,0.2)'}
                        strokeWidth={edge.dashed ? 0.8 : 1}
                        strokeDasharray={edge.dashed ? '4,3' : undefined}
                        markerEnd="url(#act-arr)"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 0.35, delay: 0.3 + ei * 0.04 }}
                      />
                      {edge.label && (
                        <motion.text
                          x={`${mx}%`} y={`${my + 0.5}%`}
                          textAnchor="middle"
                          fill="rgba(255,255,255,0.35)"
                          fontSize="7"
                          fontFamily="monospace"
                          fontStyle="italic"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.5 + ei * 0.04 }}
                        >
                          {edge.label}
                        </motion.text>
                      )}
                    </g>
                  );
                })}
              </svg>

              {/* Nodes */}
              {step.nodes.map((node, ni) => {
                const Icon = node.icon || Play;
                const isStart = node.type === 'start';
                const isEnd = node.type === 'end';
                const isDecision = node.type === 'decision';
                const isFork = node.type === 'fork';

                return (
                  <motion.div
                    key={node.id}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.35, delay: 0.15 + ni * 0.04, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute flex items-center justify-center"
                    style={{ left: `${node.x}%`, top: `${node.y}%`, transform: 'translate(-50%, 0)', zIndex: 1 }}
                  >
                    {isStart || isEnd ? (
                      <div
                        className="flex items-center justify-center gap-1.5 px-3 py-1 rounded-full"
                        style={{
                          background: isStart ? `${node.color}15` : `${node.color}18`,
                          border: `1.5px solid ${node.color}40`,
                        }}
                      >
                        <div className="w-2 h-2 rounded-full" style={{ background: node.color }} />
                        <span className="text-[9px] font-bold" style={{ color: node.color }}>{node.label}</span>
                      </div>
                    ) : isDecision ? (
                      <div
                        className="flex items-center gap-1.5 px-2.5 py-1"
                        style={{
                          background: `${node.color}12`,
                          border: `1.5px solid ${node.color}35`,
                          borderRadius: '2px',
                          transform: 'rotate(0deg)',
                          clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
                          padding: '10px 16px',
                        }}
                      >
                        <span className="text-[8px] font-semibold text-center whitespace-nowrap" style={{ color: `${node.color}dd` }}>
                          {node.label}
                        </span>
                      </div>
                    ) : isFork ? (
                      <div
                        className="flex items-center gap-1.5 px-3 py-1"
                        style={{
                          background: `${node.color}10`,
                          border: `1.5px dashed ${node.color}30`,
                          borderRadius: '6px',
                        }}
                      >
                        <Icon size={10} style={{ color: node.color }} strokeWidth={1.5} />
                        <span className="text-[8px] font-medium whitespace-nowrap" style={{ color: `${node.color}cc` }}>
                          {node.label}
                        </span>
                      </div>
                    ) : (
                      <div
                        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg"
                        style={{
                          background: `${node.color}10`,
                          border: `1px solid ${node.color}25`,
                          boxShadow: `0 0 8px ${node.color}08`,
                        }}
                      >
                        <Icon size={11} style={{ color: node.color }} strokeWidth={1.5} />
                        <span className="text-[8px] font-medium whitespace-nowrap" style={{ color: `${node.color}cc` }}>
                          {node.label}
                        </span>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ── RIGHT: description ── */}
      <div className="w-[280px] shrink-0 flex flex-col justify-center gap-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
            className="space-y-3"
          >
            <h3 className="text-xl font-bold text-white/90 leading-tight">{step.title}</h3>
            <div className="w-10 h-[1px]" style={{ background: 'rgba(157,140,255,0.3)' }} />
            <p className="text-[12px] leading-relaxed" style={{ color: 'rgba(197,197,210,0.55)' }}>
              {step.description}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Step indicators */}
        <div className="flex gap-1.5 mt-3">
          {STEPS.map((_, i) => (
            <div
              key={i}
              className="h-1 rounded-full transition-all duration-300"
              style={{
                width: i === currentStep ? 20 : 6,
                background: i === currentStep ? '#9d8cff' : i < currentStep ? 'rgba(157,140,255,0.3)' : 'rgba(157,140,255,0.1)',
                boxShadow: i === currentStep ? '0 0 8px rgba(157,140,255,0.4)' : 'none',
              }}
            />
          ))}
        </div>

        <p className="text-[9px] tracking-widest uppercase" style={{ color: 'rgba(107,104,128,0.4)' }}>
          Press Space to advance
        </p>
      </div>
      <DiagramModal
        isOpen={showOriginal}
        onClose={() => setShowOriginal(false)}
        imageSrc="/umlDiagrams/activity diagram.png"
        title="Original Activity Diagram"
      />
    </div>
  );
};

export { STEPS as ACTIVITY_STEPS };
export default ActivityDiagramSlide;
