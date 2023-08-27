// ヘッダーメニューの各項目を表示するコンポーネント
import Link from "next/link";
import { IconType } from "react-icons";

// Propsの型定義
interface MenuItemProps {
  title: string;
  address: string;
  Icon: IconType; // この部分はアイコンコンポーネントの型に合わせて調整する必要があります
}

export default function MenuItem({ title, address, Icon }: MenuItemProps) {
  return (
    <div>
      <Link href={address} className="mx-4 lg:mx-6 hover:text-amber-600">
        <Icon className="text-2xl sm:hidden mx-4"/>
        <p className="hidden sm:inline my-2 text-sm">{title}</p>
      </Link>
    </div>
  )
}
