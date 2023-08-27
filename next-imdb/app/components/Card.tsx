// <Results/>コンポーネントから 1つの映画情報({result})を受け取り、カード型で表示
import Link from "next/link";
import type { TmdbMovie } from "../../tmdb.types"
import { FC } from "react"
import Image from "next/image" // Imageコンポーネントを使うと、画像の最適化ができる (画像の読み込みを遅らせることで、ページの読み込み速度を上げることができる)
import { FiThumbsUp } from "react-icons/fi"

interface CardProps {
  result: TmdbMovie;
}

const Card: FC<CardProps> = ({ result }) => {
  return (
    <div className="cursor-pointer sm:p-3 sm:hover:shadow-slate-400 sm:shadow-md rounded-lg sm:border sm:border-slate-400 sm:m-2 transition-shadow duration-200 group">
      {/* ↓ app/movie/[id]/page.tsx */}
      <Link href={`/movie/${result.id}`}>
        <Image
          src={`https://image.tmdb.org/t/p/original/${result.backdrop_path || result.poster_path}`}
          width={500}
          height={300}
          className="sm:rounded-t-lg group-hover:opacity-80 transition-opacity duration-200"
          style={{                 // 読み込み時に画像がずれるのを防ぐために、画像のサイズを指定
            maxWidth: "100%",      // 画像の幅を100%にして、画像の幅がコンテナーの幅を超えないようにする
            height: "auto",        // 画像の高さを自動調整 (幅が100%になったので、高さは自動で調整される)
          }}
          placeholder="blur"           // 画像の読み込みが遅い場合に、ぼかし画像を表示する
          blurDataURL="/spinner.svg"   // ぼかし画像のパス
          alt="image is not available" // 画像がない場合に表示するテキスト
        ></Image>
        <div className="p-2">
          <p className="line-clamp-2 text-md">{result.overview}</p> {/* line-clamp-2: 2行で切り捨てる */}
          <h2 className="truncate text-lg font-bold">               {/* truncate: 1行で切り捨てる */}
            {result.title || result.original_title}
          </h2>
          <p className="flex items-center">
            {result.release_date}
            <FiThumbsUp className="h-5 mr-1 ml-3"/>{result.vote_count}
          </p>
        </div>
      </Link>
    </div>
  )
}

export default Card