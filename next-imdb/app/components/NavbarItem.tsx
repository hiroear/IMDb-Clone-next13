// <Navbar />内の Trending / Top Rated を、このファイルで定義
'use client' // React Hooks を使う場合は、'use client'
import Link from "next/link"
import { FC } from "react"
import { useSearchParams } from "next/navigation" // useSearchParams: URL のクエリパラメーターを取得する React Hooks

// Propsの型定義
interface NavbarItemProps {
  title: string;
  param: string;
}

const NavbarItem: FC<NavbarItemProps> = ({ title, param }) => {
  const searchParams = useSearchParams() // const [searchParams, setSearchParams] = useSearchParams() という形で、URL のクエリパラメーターを取得するが、今回は setSearchParams は使わないので、省略
  const genre = searchParams.get("genre") // get()メソッドを使って、指定の URLのクエリパラメーターを取得 (useSearchParamsの戻り値は、URLSearchParams オブジェクト)

  return (
    <div>
      <Link
        // クエリパラメーターがある場合は、そのクエリパラメーターと同じパラメーターのリンクをアンダーラインで表示。ない場合は、アンダーラインなし
        className={`m-4 hover:text-amber-600 font-semibold p-2
        ${genre && genre === param && "underline underline-offset-8 decoration-4 decoration-amber-500 rounded-lg"}
        `}
        href={`/?genre=${param}`}
      >
        {title}
      </Link>
    </div>
  )
}

export default NavbarItem;