# フルスタックを目指したTodoアプリケーション

## 技術構成
- バックエンド
  - Nest.js
  - prisma
  - swagger
- フロントエンド
  - Next.js
  - orval
- インフラ
  - Cloud Run
  - Docker

### 環境構築
それぞれのディレクトリのREADME.mdを見てください


### Deploy方法
- `cd infra`
- `terraform init` // 初回のみ
  - `terraform refresh` // 依存関係を更新したときなど
- `terraform plan` // Deployの内容の確認
- `terraform apply`



### 残っていて、やりたいこと
- 認証周りの追加
- GCRのtagとイメージのpushを自動化(TerraformかMakefileで作るか)
- Secret Mangerを使って、環境変数をセキュアにする



### 気になっているところ
- Docker上にSupabaseがあるので、個人でSupabaseのDBを触るなんてことはないはずかを確かめる