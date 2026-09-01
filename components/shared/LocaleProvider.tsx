'use client'

import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const ur: Record<string, string> = {
  'Overview': 'جائزہ', 'Applications': 'درخواستیں', 'QAD scrutiny': 'کیو اے ڈی جانچ', 'Expert panel': 'ماہر پینل', 'Visits': 'دورے', 'Decisions': 'فیصلے', 'Compliance': 'تعمیل', 'AI policy desk': 'اے آئی پالیسی ڈیسک', 'Administration': 'انتظامیہ',
  'Case management': 'کیس مینجمنٹ', 'New application': 'نئی درخواست', 'HEC ODL APPLICATION SYSTEM': 'ایچ ای سی او ڈی ایل درخواست نظام', 'Notifications': 'اطلاعات', 'Mark all read': 'سب کو پڑھا ہوا نشان زد کریں', 'You’re all caught up.': 'آپ کی تمام اطلاعات دیکھی جا چکی ہیں۔',
  'HEI workspace': 'ایچ ای آئی ورک اسپیس', 'Track every ODL NOC application and action due from your institution.': 'اپنے ادارے کی ہر او ڈی ایل این او سی درخواست اور مطلوبہ کارروائی دیکھیں۔',
  'QAD scrutiny desk': 'کیو اے ڈی جانچ ڈیسک', 'Manage incoming cases, completeness decisions, deficiency notices and panel formation.': 'موصولہ کیسز، تکمیل کے فیصلے، کمی کے نوٹس اور پینل کی تشکیل کا انتظام کریں۔',
  'Onsite visits & revisits': 'موقع پر دورے اور دوبارہ دورے', 'Schedule assessments, complete electronic checklists and upload authorized visit evidence.': 'جائزے شیڈول کریں، الیکٹرانک چیک لسٹ مکمل کریں اور مجاز دورے کے شواہد اپ لوڈ کریں۔',
  'Decision register': 'فیصلہ رجسٹر', 'Prepare authority decisions, NOC letters, conditions and approved program scope.': 'اختیاری فیصلے، این او سی خطوط، شرائط اور منظور شدہ پروگرام کی حدود تیار کریں۔',
  'NOC compliance & confirmation': 'این او سی تعمیل اور تصدیق', 'Track active NOCs, conditions, reminders and the three-year confirmation milestone.': 'فعال این او سیز، شرائط، یاددہانیوں اور تین سالہ تصدیقی مرحلے کو ٹریک کریں۔',
  'Expert Panel': 'ماہر پینل', 'Review assigned dossier areas, record findings and consolidate First and Final Reports.': 'تفویض شدہ ڈوزیئر شعبوں کا جائزہ لیں، نتائج درج کریں اور پہلی و حتمی رپورٹس مرتب کریں۔',
}

type LocaleValue = { language: 'en' | 'ur'; isRtl: boolean; setLanguage: (language: 'en' | 'ur') => void; t: (value: string) => string }
const LocaleContext = createContext<LocaleValue | null>(null)

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<'en' | 'ur'>('en')
  useEffect(() => { setLanguageState(localStorage.getItem('hec-language') === 'ur' ? 'ur' : 'en') }, [])
  function setLanguage(next: 'en' | 'ur') { localStorage.setItem('hec-language', next); document.documentElement.lang = next; document.documentElement.dir = next === 'ur' ? 'rtl' : 'ltr'; setLanguageState(next) }
  useEffect(() => { document.documentElement.lang = language; document.documentElement.dir = language === 'ur' ? 'rtl' : 'ltr' }, [language])
  const value = useMemo(() => ({ language, isRtl: language === 'ur', setLanguage, t: (value: string) => language === 'ur' ? ur[value] || value : value }), [language])
  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}
export function useLocale() { const value = useContext(LocaleContext); if (!value) throw new Error('LocaleProvider is required'); return value }
