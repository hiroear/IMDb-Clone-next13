// TOPページ (pages/ 以下のファイルをまとめるファイル) → このファイルを export することで、pages/ 以下のファイルが全て export される
import Results from "./components/Results";
import type { TmdbMovie } from "../tmdb.types";

const API_KEY = process.env.API_KEY;

export default async function Home({ searchParams }: { searchParams: { genre?: string }}) {  // クライアントコンポーネントでは useSearchParams(Hooks) でクエリパラメーター(?以降) を取得するが、サーバーコンポーネントでは searchParams で取得する
  /* URL のクエリパラメーター(?以降)を取得。 URL末尾に "?genre=○○○○" が届いたら "○○○○"部分を genre に格納。
    searchParams.genre が undefined なら、"fetchTrending" を格納 (|| は、左辺が false なら右辺を返す) → つまり、genre にはデフォルトで"fetchTrending"が入り、Navbarの 「Top Rated」 をクリックした時のみ "?genre=fetchTopRated" が届き "fetchTopRated" が genre に入る */
  const genre = searchParams.genre || "fetchTrending";
  console.log(genre);

  /* ↓ TMDB API(https://api.themoviedb.org/3/) を使って映画情報を取得
  クエリパラメーターが "fetchTopRated" なら、"movie/top_rated" を、それ以外なら、"trending/all/week" (= "fetchTrending") の APIを取得 */
  const res = await fetch(
    `https://api.themoviedb.org/3/${genre === "fetchTopRated" ? "movie/top_rated" : "trending/all/week"}?api_key=${API_KEY}&language=ja&page=1`,
    { next: { revalidate: 10000 }}
  ); // 10000秒ごとに再生成

  if(!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json(); // json()メソッドを使って、res を JSONに変換 → JavaScript の値やオブジェクトに変換
  const results: TmdbMovie[] = data.results; // 映画情報が配列で格納される
  // console.log(results);


  return (
    <div>
      <Results results={results} /> {/* 配列の results を Resultsコンポーネントで map で表示 */}
    </div>
  )
}
