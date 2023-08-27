// ルートレイアウトで組み込むナビゲーションバー (Trending / Top Rated)
import NavbarItem from "./NavbarItem"
import { FC } from "react"

const Navbar: FC = () => {
  return (
    <div className="flex justify-center dark:bg-gray-600 bg-amber-100 lg:text-lg p-4">
      <NavbarItem title="Trending" param="fetchTrending" />
      <NavbarItem title="Top Rated" param="fetchTopRated"/>
    </div>
  )
}

export default Navbar;