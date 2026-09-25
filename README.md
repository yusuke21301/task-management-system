# 簡易工程進捗管理システム

Next.js + TypeScript + ASP.NET Core Web API + PostgreSQL を使用して作成した、学習用のタスク管理Webアプリケーションです。

C# / WinForms を中心に開発してきた状態から、Webアプリケーションの基本構成やフロントエンド・バックエンド間のHTTP通信を学ぶことを目的として作成しました。

## デモ
フロントエンドはVercel、APIはRender、DBはNeonへデプロイしており、下記URLから実際に操作できます。

公開URL：
https://task-management-system-sigma-seven.vercel.app/

## 概要

システム全体は次の構成です。

```text
ブラウザ
   ↓
Next.js + TypeScript
   ↓ HTTP / JSON
ASP.NET Core Web API
   ↓
EF Core
   ↓
PostgreSQL
```

フロントエンドとバックエンドを分離し、Next.js から ASP.NET Core Web API を呼び出してタスクデータを操作します。

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

### バックエンド

- ASP.NET Core Web API
- C#
- .NET 10
- Entity Framework Core
- Swagger / OpenAPI

### データベース

- PostgreSQL

### 開発・バージョン管理

- Visual Studio / Visual Studio Code
- Git
- GitHub
- SourceTree
- npm

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
