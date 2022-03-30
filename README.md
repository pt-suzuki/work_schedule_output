# work_schedule_output

## 概要

google apps script でスプレッドシートに入力した出勤予定をJson形式で出力する。

webpack+claspでビルドし、google apps scriptにデプロイする。

## サンプルのスプレッドシート

```url

https://docs.google.com/spreadsheets/d/1VmUbHj7x2T7D-zEQLMIcBhTYfuOJ5aIzNSojfqxAIJA

```

## 機能

### doGet

スプレッドシートに入力した今日の出勤予定をJson形式で出力する

ウェブアプリとしてデプロイして使用する

### hideSchedule

今日より前のカラムをスプレッドシートから非表示にする

トリガーにセットして使用する

### insertDateColumn

今日から2ヶ月後までの日付のカラムをテンプレートからコピーして自動生成する。

土日祝日を色分けする。

祝日はGoogleCalenderより取得する。

トリガーにセットして使用する

## 前提

``` shell

#node_modulesをインストール
npm run install

#claspをグローバルでインストールしておく
npm install -g clasp

# .clasp.sample.jsonをコピー
cp .clasp.sample.json　.clasp.json

# コピーした.clasp.jsonを編集
vim .clasp.json

```

``` json

#.clasp.json

#プロジェクトからscriptIdをコピーして入力する

{"scriptId":"ここに入力","rootDir":"./dist"}

```

## ビルド

``` shell

#ビルド
npm run build

```

## テスト

``` shell

# eslint
npm run lint

# eslint fix
npm run lint:fix

# jest
npm run lint:fix


```

## デプロイ

``` shell

# テスト、ビルド、デプロイを一括実行
npm run deploy

```

## GithubAction

### .clasprc.jsonからコピーして入力する

- CLASPRC_ACCESS_TOKEN
- CLASPRC_CLIENT_ID
- CLASPRC_CLIENT_SECRET
- CLASPRC_EXPIRY_DATE
- CLASPRC_ID_TOKEN
- CLASPRC_REFRESH_TOKEN

### スプレッドシートのscriptIdをコピーして入力する

- CLASP_SCRIPT_ID
