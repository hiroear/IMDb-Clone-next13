'use client'
import { useEffect, FC } from "react"

interface ErrorProps {
  error: string;     // エラーの内容の型定義
  reset: () => void; // エラーをリセットする関数の型定義
}
const Error: FC<ErrorProps> = ({ error, reset }) => {
// 引数 → error: エラーの内容, reset: エラーをリセットする関数 (エラーが発生したら、エラーをリセットする)
  useEffect(() => {
    console.log(error);
  }, [error])
  
  return (
    <div className="text-center mt-10">
      <h1>エラーが発生しました</h1>
      <button className="hover:text-amber-600" onClick={() => reset()}>Try Again</button>
    </div>
  )
}

export default Error;