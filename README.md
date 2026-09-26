# 簡易工程進捗管理システム

Next.js + TypeScript + ASP.NET Core Web API + PostgreSQL を使用して作成した、学習用のタスク管理Webアプリケーションです。

C# / WinForms を中心に開発してきた状態から、Webアプリケーションの基本構成やフロントエンド・バックエンド間のHTTP通信を学ぶことを目的として作成しました。

## デモ
フロントエンドはVercel、APIはRender、DBはNeonへデプロイしており、下記URLから実際に操作できます。

初回のAPI起動で、数十秒～約1分待つ場合があります。

公開URL：
https://task-management-system-sigma-seven.vercel.app/

## 概要

システム全体は次の構成です。

```text
ブラウザ
   ↓
Next.js + TypeScript / Vercel
   ↓ HTTP / JSON
ASP.NET Core Web API / Render
   ↓
EF Core
   ↓
PostgreSQL / Neon
```

フロントエンドとバックエンドを分離し、Next.js から ASP.NET Core Web API を呼び出してタスクデータを操作します。

## 技術記事

今回開発したシステムの技術記事を書きURLに投稿しています。

Qiita：
https://qiita.com/yusuke21301/items/8df13e3267eefefd469f

## 主な機能

- タスク一覧表示
- タスク新規登録
- タスク編集
- タスク削除
- 削除前の確認ダイアログ
- 担当者マスタからのプルダウン選択
- タスク名検索
- 担当者による絞り込み
- ステータスによる絞り込み
- 入力チェック・フォーム内エラー表示
- 登録・更新中のボタン無効化
- CSSによる一覧・フォームUI調整

## 使用技術

### フロントエンド

- Next.js 16
- React
- TypeScript
- CSS
- App Router
- Server Components
- Client Components
- Server Actions
- `useActionState`
- Vercel

### バックエンド

- ASP.NET Core Web API
- C#
- .NET 10
- Entity Framework Core
- Swagger / OpenAPI
- Render

### データベース

- PostgreSQL
- Neon

### 開発・バージョン管理

- Visual Studio / Visual Studio Code
- Git
- GitHub
- SourceTree
- npm

## 技術選定の方針

本プロジェクトでは、これまでの C# 開発経験を活かしつつ、Webアプリケーション開発のフロントエンド・バックエンド・DB・デプロイまで一連の構成を学ぶことを目的として技術を選定しました。

### Next.js

Reactをベースにしながら、ルーティング、サーバー側処理、データ取得、ビルドなど、Webアプリケーションに必要な機能を一つのフレームワークで扱える点から採用しました。

今回は単に画面を作るだけでなく、フロントエンドとバックエンドを分離したWebアプリ全体の構成を学ぶことを目的としていたため、React単体ではなくNext.jsを使用しました。

### TypeScript

JavaScriptに静的型付けを追加できるため、APIとのデータ構造の不一致や型の誤りを開発時に検出しやすい点から採用しました。

これまで主にC#を使用してきたため、型を明示して開発するTypeScriptは既存経験との親和性も高いと考えました。

APIレスポンスについても、以下のように型を定義して扱っています。

```ts
type Task = {
  id: number;
  taskName: string;
  operatorId: number;
  operatorName: string;
  status: number;
  plannedDate: string | null;
};
```

### App Router

Next.jsのルーティングにはApp Routerを使用しました。

ディレクトリ構成とURLを対応させることができ、画面構成を把握しやすい点をメリットと考えました。

例:

```text
src/app/page.tsx
→ /

src/app/tasks/new/page.tsx
→ /tasks/new

src/app/tasks/[id]/edit/page.tsx
→ /tasks/{id}/edit
```

また、App RouterではServer Componentを標準として利用できるため、サーバー側でのデータ取得も含めたNext.jsの現在の開発方式を学ぶ目的もあります。

### Server Component / Client Component

データ取得を行う画面はServer Componentを基本とし、ユーザー操作やブラウザAPIが必要な部分のみClient Componentとして実装しました。

例:

```text
タスク一覧・担当者一覧取得
→ Server Component

削除確認ダイアログ
→ Client Component
```

必要な箇所のみClient Componentにすることで、ブラウザ側へ持たせる処理を必要最小限にしています。

また、APIへのデータ取得をNext.jsサーバー側から行うことで、以下の構成にしています。

```text
Browser
↓
Next.js
↓
ASP.NET Core Web API
```

### Server Actions

タスクの登録・更新・削除にはServer Actionsを使用しました。

フォームからサーバー側の処理を直接呼び出すことができ、クライアント側でAPI呼び出し処理を多く記述せずに、フォーム処理をまとめられる点をメリットと考えました。

また、登録・更新後には、

```ts
revalidatePath("/");
redirect("/");
```

を利用して、

```text
データ更新
↓
一覧の再取得
↓
一覧画面へ遷移
```

という処理を実装しています。

ASP.NET Core Web APIはデータアクセスやバックエンド処理を担当し、Server ActionはNext.js側のフォーム処理や画面更新を担当する構成としています。

### ASP.NET Core Web API

これまでのC#開発経験を活かしながら、Web API開発を学ぶことを目的として採用しました。

フロントエンドとバックエンドをHTTP / JSONで分離することで、WebアプリケーションにおけるAPI通信の基本構成を学習しています。

```text
Next.js
↓ HTTP / JSON
ASP.NET Core Web API
↓
PostgreSQL
```

### PostgreSQL

RDBを使用したWebアプリケーション開発を経験することと、実務でも触れる機会のあるPostgreSQLの理解を深めることを目的として採用しました。

ASP.NET CoreからはEntity Framework Coreを使用してアクセスしています。

### Entity Framework Core

C#のEntityとPostgreSQLのテーブルをマッピングし、C#コードからDB操作を行うために使用しています。

また、公開環境のDB構築ではEF Core Migrationも使用し、DBスキーマの作成・変更をコードとして管理できることを学習しました。

### Vercel / Render / Neon

ローカルPC上だけで動作するアプリではなく、URLを共有するだけで第三者が実際に操作できる状態にすることを目的として、クラウド環境へデプロイしました。

構成は以下の通りです。

```text
Browser
   ↓
Vercel
Next.js / TypeScript
   ↓
Render
ASP.NET Core Web API
   ↓
Neon
PostgreSQL
```

- **Vercel**
  - Next.jsとの親和性が高く、GitHub連携によるデプロイが容易なため採用
- **Render**
  - ASP.NET CoreアプリをDockerコンテナとして公開できるため採用
- **Neon**
  - PostgreSQLをクラウド上で利用でき、学習・デモ用途として扱いやすいため採用

GitHubの`main`ブランチへのPushを起点として、Vercel / Renderへ変更を反映できる構成にしています。

### 技術選定で意識したこと

本プロジェクトでは、単に新しい技術を使用することではなく、各技術の役割を分離することを意識しました。

```text
Next.js
→ UI・画面遷移・フォーム処理

ASP.NET Core Web API
→ API・バックエンド処理

Entity Framework Core
→ DBアクセス

PostgreSQL
→ データ永続化

Vercel / Render / Neon
→ 公開環境
```

また、既存のC#経験をASP.NET Coreで活かしながら、新たにNext.js / TypeScriptを学ぶことで、バックエンドからフロントエンドまでWebアプリケーション開発の範囲を広げることを狙いました。

## ディレクトリ構成

```text
task-management-system
├─ backend
│  └─ TaskManagement.Api
│     └─ TaskManagement.Api
│        ├─ Controllers
│        ├─ Data
│        ├─ DTOs
│        ├─ Models
│        └─ Program.cs
│
├─ frontend
│  ├─ src
│  │  ├─ app
│  │  │  ├─ actions
│  │  │  ├─ tasks
│  │  │  │  ├─ new
│  │  │  │  └─ [id]
│  │  │  │     └─ edit
│  │  │  ├─ globals.css
│  │  │  ├─ layout.tsx
│  │  │  └─ page.tsx
│  │  ├─ components
│  │  ├─ lib
│  │  └─ types
│  ├─ package.json
│  └─ tsconfig.json
│
└─ README.md
```

## フロントエンドの主な構成

### `src/app/page.tsx`

タスク一覧画面です。

- タスク一覧取得
- 検索・絞り込み
- 編集画面へのリンク
- 削除ボタン

を担当します。

### `src/app/tasks/new/page.tsx`

タスク新規登録画面です。

担当者一覧をAPIから取得し、登録フォームへ渡します。

### `src/app/tasks/[id]/edit/page.tsx`

タスク編集画面です。

URLに含まれるタスクIDを使用して対象タスクを取得し、現在値をフォームへ表示します。

例:

```text
/tasks/5/edit
```

### `src/app/actions/task-actions.ts`

Server Action を定義しています。

主に次の処理を担当します。

- タスク登録
- タスク更新
- タスク削除
- 入力チェック
- APIへのPOST / PUT / DELETE
- 登録・更新後の再表示

### `src/lib/task-api.ts`

ASP.NET Core API からタスクデータを取得する処理をまとめています。

### `src/lib/operator-api.ts`

担当者一覧を取得する処理をまとめています。

### `src/components`

画面で再利用するコンポーネントを配置しています。

例:

```text
CreateTaskForm.tsx
EditTaskForm.tsx
TaskFormFields.tsx
DeleteButton.tsx
```

## API

開発時のAPI URL:

```text
http://localhost:5199
```

Swagger:

```text
http://localhost:5199/swagger
```

主なエンドポイント:

```text
GET    /api/Tasks
GET    /api/Tasks/{id}
POST   /api/Tasks
PUT    /api/Tasks/{id}
DELETE /api/Tasks/{id}

GET    /api/Operators
```

## 環境構築

### 前提

以下がインストールされていることを前提とします。

- Node.js
- npm
- .NET SDK
- PostgreSQL
- Git

## フロントエンド

### 1. パッケージをインストール

```powershell
cd C:\task-management-system\frontend
npm.cmd install
```

PowerShell の実行ポリシーによって `npm` / `npx` が実行できない場合は、`.cmd` を付けて実行します。

例:

```powershell
npm.cmd run dev
npx.cmd create-next-app
```

### 2. 環境変数を設定

`frontend/.env.local` を作成します。

```env
API_BASE_URL=http://localhost:5199
```

`.env.local` は環境依存の設定を含むため、Git管理対象には含めません。

### 3. 開発サーバーを起動

```powershell
npm.cmd run dev
```

ブラウザで以下を開きます。

```text
http://localhost:3000
```

## バックエンド

バックエンドディレクトリへ移動します。

```powershell
cd C:\task-management-system\backend\TaskManagement.Api\TaskManagement.Api
```

APIを起動します。

```powershell
dotnet run
```

Swagger:

```text
http://localhost:5199/swagger
```

`http://localhost:5199/` 自体には画面を用意していないため、API確認にはSwaggerまたは各APIエンドポイントを使用します。

## 開発時の起動方法

フロントエンドとバックエンドは別々のWebサーバーとして動作するため、両方を起動します。

```text
PowerShell 1
ASP.NET Core Web API
http://localhost:5199

PowerShell 2
Next.js
http://localhost:3000
```

## CRUD

このアプリでは基本的なCRUDを実装しています。

| CRUD | HTTP | 内容 |
|---|---|---|
| Create | POST | タスク新規登録 |
| Read | GET | 一覧・1件取得 |
| Update | PUT | タスク編集 |
| Delete | DELETE | タスク削除 |

## 学習した内容

このプロジェクトを通して、主に以下を学習しました。

### Webアプリケーションの基本構成

WinFormsでは画面から直接DBへアクセスする構成もありますが、今回のWebアプリでは次のように役割を分離しました。

```text
画面
↓
Next.js
↓
HTTP / JSON
ASP.NET Core Web API
↓
EF Core
↓
PostgreSQL
```

### TypeScript

- 型定義
- `type`
- `string | null`
- `Promise`
- `async / await`
- `map`
- `filter`
- Optional Chaining (`?.`)

### Next.js

- App Router
- `page.tsx`
- Dynamic Routes (`[id]`)
- Server Components
- Client Components
- `"use client"`
- Server Actions
- `useActionState`
- `searchParams`
- `revalidatePath`
- `redirect`

### React

- JSX / TSX
- Props
- コンポーネント分割
- イベント処理
- `useActionState`

### HTTP

- GET
- POST
- PUT
- DELETE
- JSON
- HTTPステータスコード

### UI

- HTMLフォーム
- `input`
- `select`
- `button`
- CSS
- テーブル
- 入力エラー表示
- 削除確認

## ビルド・チェック

### ESLint

```powershell
npm.cmd run lint
```

### 本番ビルド

```powershell
npm.cmd run build
```

開発完了時に本番ビルドが成功することを確認しています。

## Git運用

開発では以下のようなブランチ構成を使用しました。

```text
main
└─ develop
   ├─ feature/api
   └─ feature/frontend
```

開発の流れ:

```text
feature/api
      ┐
      ├─> develop
      │
feature/frontend
      ┘
          ↓
        main
```

API・フロントエンドをそれぞれfeatureブランチで開発し、`develop` で統合確認したあと、`main` へマージしました。

## 今後追加できる機能

今回はWebアプリケーションの基本学習を目的としているため、ここで一区切りとしています。

今後拡張する場合は、以下のような機能を追加できます。

- ログイン・認証
- 権限管理
- ページング
- API側での検索・絞り込み
- 自動テスト
- Docker
- CI/CD
- 本番環境へのデプロイ
- ログ出力
- より詳細なエラーハンドリング

## 目的

このプロジェクトの目的は、単にタスク管理アプリを完成させることではなく、

- フロントエンド
- Web API
- DB
- HTTP通信
- Git

を含む一連のWebアプリケーション開発を、自分で実装しながら理解することです。
