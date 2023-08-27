// ダークモード / ライトモードの切り替えボタン
'use client'
import { MdLightMode } from 'react-icons/md'
import { BsFillMoonFill } from 'react-icons/bs'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export default function DarkModeSwitch() {
  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  /* マウントされる前に スイッチが押されてしまうと theme システムのモードと競合してしまいエラーになってしまう。
    mounted ステートを使って、確実にマウントされた後に 🌞 / 🌙 を表示させスイッチを押させないようにしてエラーを回避する。 */
  useEffect(() => setMounted(true), []);

  // theme が 'system' の場合は systemTheme を使う。 'system' 以外の場合は theme を使う
  const currentTheme = theme === 'system' ? systemTheme : theme;

  return (
    <div>
      {/* mounted が true の時のみ モードを切り替える */}
      {mounted && (
        (currentTheme === 'dark' ? (
          <MdLightMode onClick={() => setTheme('light')} className="text-xl cursor-pointer hover:text-amber-500" />
        ) : (
          <BsFillMoonFill onClick={() => setTheme('dark')} className="text-xl cursor-pointer hover:text-amber-500" />
        ))
      )}
    </div>
  )
}
