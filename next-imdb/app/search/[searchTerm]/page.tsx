// <SearchBox />の handleSubmit 関数の router.push(`/search/${search}`); によって、動的にこのページに遷移 → 検索結果を表示(一覧で表示させる <Results />に渡す )
import { FC } from "react"
import type { TmdbMovie } from "../../../tmdb.types";
import Results from "@/app/components/Results";

type SearchPageProps = {
  params: {
    searchTerm: string
  }
}

const SearchPage: FC<SearchPageProps> = async ({ params }) => {
  const searchTerm = params.searchTerm;

  const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY}&language=ja&query=${searchTerm}&include_adult=false`)
  if(!res.ok) {
    throw new Error("Error fetching data");
  }
  const data = await res.json();
  const results: TmdbMovie[] = data.results;
  // console.log(results);


  return (
    <div>
      {results && results.length === 0 && ( // 検索結果はあるが、結果の数が 0 の場合は、"No results found" を表示
        <h2 className="text-center pt-6">No results found</h2>
      )}

      {results && <Results results={results} />} {/* 検索結果がある場合は、Resultsコンポーネントを表示 */}
    </div>
  )
}

export default SearchPage;