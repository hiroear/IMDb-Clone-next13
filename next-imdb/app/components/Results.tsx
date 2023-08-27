// 配列で渡された映画情報 (results) をCardコンポーネントに渡して map で一覧表示する
import { FC } from 'react'
import type { TmdbMovie } from "../../tmdb.types";
import Card from './Card';

interface ResultsProps {
  results: TmdbMovie[];
}

const Results: FC<ResultsProps> = ({ results }) => {
  return (
    <div className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 max-w-6xl mx-auto py-4">
      {results.map((result) => (
        <Card key={result.id} result={result} />
      ))}
    </div>
  )
}

export default Results