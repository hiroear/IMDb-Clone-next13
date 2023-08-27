// <Card/>コンポーネントの <Link/>から渡された href={`/movie/${result.id}`} で、動的に映画の個別ページを表示
import { FC } from "react"
import Image from "next/image";
import type { TmdbMovie } from "../../../tmdb.types";

type MovieProps = {
  params: {
    id: string
  }
}

// TMDB API を使ってクリックした映画の個別情報を取得する関数
const getMovie = async (movieId: string): Promise<TmdbMovie> => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.API_KEY}&language=ja`,
  );
  return await res.json(); // res を JSONに変換したオブジェクト
}

const Movie: FC<MovieProps> = async ({ params }) => {
  const movieId = params.id;
  const movie = await getMovie(movieId);
  // console.log(movie);
  return (
    <div className="w-full">
      <div className="p-4 md:pt-8 flex flex-col md:flex-row items-center content-center max-w-6xl mx-auto md:space-x-6">
        <Image
          src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path || movie.poster_path}`}
          width={500}
          height={300}
          className="rounded-lg"
          style={{
            maxWidth: "100%",
            height: "100%",
          }}
          placeholder="blur"
          blurDataURL="/spinner.svg"
          alt="Movie poster"
        ></Image>
        <div className="p-2">
          <h2 className="text-lg mb-3 font-bold">{movie.title}</h2>
          <p className="text-lg mb-3">
            <span className="font-semibold mr-1">Overview:</span>
            {movie.overview}
          </p>
          <p className="mb-3">
            <span className="font-semibold mr-1">Date Released:</span>
            {movie.release_date}
          </p>
          <p className="mb-3">
            <span className="font-semibold mr-1">Rating:</span>
            {movie.vote_count}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Movie;