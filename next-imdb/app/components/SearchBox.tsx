// ルートレイアウトに配置した検索ボックス / 検索ボタン
'use client'
import { FC, useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'

// type Props = {}

const SearchBox:FC = () => {
  const [search, setSearch] = useState<string>("");
  const router = useRouter();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!search) return;                // search が空なら何もしない
    router.push(`/search/${search}`);   // search が空でなければ、"/search/○○○○" に遷移
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex max-w-6xl mx-auto justify-between items-center px-5">
        <input type="text" placeholder="Search keywords..."
          className="w-full h-14 rounded-sm placeholder-gary-500 outline-none bg-transparent flex-1"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit"
          className="text-amber-600 disabled:text-gray-400"
          disabled={!search}           // search が空なら disabled
        >Search
        </button>
      </form>
    </div>
  )
}

export default SearchBox