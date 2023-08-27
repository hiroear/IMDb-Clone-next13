## 実行したコマンド
```
  % rails new imdb-clone --api -T
    # → blog_api: rails側のプロジェクト名
    # → --api: viewの部分が作られない APIモードの railsを作成する
    # → -T: テストフレームワークが作られない

  % cd imdb-clone

  % code .

  % bin/rails s -p 3001 で立ち上げる
```
① Gemfile の gem 'rack-cors' 部分のコメントアウトを外し、保存。→ % bundle install  
② config/initializers/cors.rb のファイルにて、以下の部分のコメントを外し、許可するポートを記述↓  
```
Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins 'localhost:3000' # nextjs側のポートを明示的に許可する

    resource '*',
      headers: :any,
      methods: [:get, :post, :put, :patch, :delete, :options, :head]
  end
end
```
③ next.js側では、普通に npm run dev で立ち上がる localhost:3000 でブラウザを立ち上げる。  
④ Nextjs のプロジェクトを Railsに追加していく↓  
```
  % npx create-next-app next-imdb
    # → railsのプロジェクト直下(blog_api) の場所で実行する。
    # → next-imdb: プロジェクト直下に作られる、nextjsのフォルダ名になる。

  % cd next-imdb

  % npm run dev
    # → localhost:3000で立ち上げる

  % npm install react-icons --save
    # → react-icons をインストール

  % npm install next-themes
    # → next-themes をインストール
```
⑤ next-themes の設定 ↓  
1. app/layout.tsx の <body>タグ以下を <Providers>で囲む (import Providers from "./Providers";)  
2. app直下に Providers.tsx ファイルを作る。(ファイル参照)
3. tailwind.config.ts に、darkMode: 'class',　を追記
4. components/DarkModeSwitch.tsx にて、useTheme を import して設定


## 気をつけること
- TMDB から API で画像を表示する <Card/>コンポーネントにて、import Image from "next/image" を上に記述した後、<Image></Image>で画像を表示するが、TMDBから image を取得する設定を next.config.js に追加する必要がある。以下、next.config.js ↓  
```
const nextConfig = {
  images: {                        //以下 3行を const nextConfig{} の中に追記
    domains: ["image.tmdb.org"],
  },
};
```