import { FC } from "react"

const loading: FC = () => {
  return (
    <div className="flex justify-center">
      {/* loading.io からダウンロードしたスピナーを表示させる */}
      <img className="" src="spinner.svg" alt="loading..." />
    </div>
  )
}

export default loading;