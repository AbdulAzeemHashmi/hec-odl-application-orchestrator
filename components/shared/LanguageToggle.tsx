'use client'

import { useEffect, useState } from 'react'

export default function LanguageToggle() {
  const [urdu, setUrdu] = useState(false)
  useEffect(() => { const saved = localStorage.getItem('hec-language') === 'ur'; setUrdu(saved); document.documentElement.lang = saved ? 'ur' : 'en'; document.documentElement.dir = saved ? 'rtl' : 'ltr' }, [])
  function toggle() { const next = !urdu; setUrdu(next); localStorage.setItem('hec-language', next ? 'ur' : 'en'); document.documentElement.lang = next ? 'ur' : 'en'; document.documentElement.dir = next ? 'rtl' : 'ltr' }
  return <button onClick={toggle} className="rounded-lg border border-slate-200 px-2.5 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50" aria-label="Switch language">{urdu ? 'English' : 'اردو'}</button>
}
