# Gemini引き継ぎドキュメント

## プロジェクト概要
**「Summer Existence Proof」（夏の存在証明）** - 環境音を自分で選択・調整することで、個人の夏の印象を再構築できるインタラクティブWebアプリケーション

## 技術スタック
- **フレームワーク:** Solid.js (TypeScript)
- **スタイリング:** Tailwind CSS
- **オーディオ:** Tone.js
- **ビルド:** Vite + pnpm
- **デプロイ:** GitHub Pages予定

## 現在の実装状況

### 完成済み機能
1. ✅ **基本プロジェクト構造**: Solid.js + TypeScript + Tailwind
2. ✅ **Tone.js統合**: オーディオ管理とプレイヤー機能
3. ✅ **10種類の夏の音源管理**: 自然音・人工音・生活音
4. ✅ **基本UI**: 
   - 音量スライダー（個別音源制御）
   - 再生/停止ボタン
   - マスター音量コントロール
5. ✅ **モーダル機能**: 
   - 使い方説明モーダル（「使い方」「はじめから」ボタンで表示）
   - リスタート確認モーダル
6. ✅ **レスポンシブデザイン**: PC・タブレット・スマホ対応

### 最近の変更点
- **ボタンスタイル調整**: 「使い方」「はじめから」ボタンを明朝体フォントに変更、背景・枠線なしに設定

### 音源構成（10種類）
```typescript
const SUMMER_SOUNDS = [
  // Nature Summer (4音源)
  { id: 'cicadas', name: 'セミの声', category: 'nature' },
  { id: 'waves', name: '波の音', category: 'nature' },
  { id: 'thunder', name: '遠雷', category: 'nature' },
  { id: 'rain', name: '夏雨', category: 'nature' },
  
  // Human Summer (3音源)  
  { id: 'festival', name: '祭りの音', category: 'human' },
  { id: 'fireworks', name: '花火の音', category: 'human' },
  { id: 'windChimes', name: '風鈴', category: 'human' },
  
  // Life Summer (3音源)
  { id: 'airconditioner', name: 'エアコン', category: 'life' },
  { id: 'pool', name: 'プールの音', category: 'life' },
  { id: 'traffic', name: '夏の街音', category: 'life' },
];
```

## ファイル構成
```
summer-soundscape/
├── src/
│   ├── App.tsx                 # メインアプリケーション
│   ├── components/
│   │   ├── SoundController.tsx # 音声制御UI
│   │   ├── VolumeSlider.tsx   # 音量スライダー
│   │   └── PlayButton.tsx     # 再生/停止ボタン
│   ├── stores/
│   │   └── soundscape.ts      # グローバル状態管理
│   ├── audio/
│   │   └── AudioManager.ts    # Tone.js統合・音声管理
│   ├── types/
│   │   └── index.ts          # TypeScript型定義
│   ├── config/
│   │   └── sounds.ts         # 音源設定
│   └── assets/
│       └── sounds/           # 音声ファイル（MP3）
├── CLAUDE.md                 # 詳細プロジェクト仕様
├── GEMINI.md                # この引き継ぎ文書
└── 設定ファイル群
```

## 重要な実装詳細

### 状態管理
```typescript
// Solid.jsのcreateStoreを使用
interface SoundscapeState {
  sounds: Record<SoundId, SoundState>;
  masterVolume: Volume;
  isPlaying: boolean;
  isInitialized: boolean;
}
```

### 主要コンポーネント
1. **App.tsx**: メインロジック、モーダル制御
2. **SoundController.tsx**: 音源別UI制御
3. **AudioManager.ts**: Tone.js統合、音声処理

### UI要素
- **ロゴ**: 左上に配置
- **制御ボタン**: 右上に「使い方」「はじめから」配置（明朝体フォント）
- **音量スライダー**: 横型レンジスライダー
- **カテゴリ分類**: nature/human/life の3カテゴリ

## 今後の開発タスク

### 優先度高
1. **音声ファイル統合**: 実際のMP3ファイル追加と動作確認
2. **パフォーマンス最適化**: 10音源同時再生の安定化
3. **エラーハンドリング強化**: 音声読み込み失敗時の処理

### 優先度中
1. **視覚効果**: 音量レベルの視覚的表示改善
2. **アクセシビリティ**: キーボード操作、スクリーンリーダー対応
3. **プリセット機能**: よく使う音量設定の保存

### 優先度低
1. **アナリティクス**: ユーザー行動ログ（HCI研究用）
2. **エフェクト**: リバーブ、フィルターなど音響効果
3. **GitHub Pages自動デプロイ**: GitHub Actions設定

## 開発環境コマンド
```bash
# 開発サーバー起動
pnpm dev

# ビルド
pnpm build

# 型チェック
pnpm typecheck

# フォーマット
pnpm format
```

## 重要な制約・注意事項
1. **TypeScript Strict Mode**: 厳格な型安全性を維持
2. **音声ファイル**: 外部提供予定（著作権配慮）
3. **ブラウザ対応**: Web Audio API対応必須
4. **パフォーマンス**: 10音源同時再生を前提とした設計

## 参考資料
- 詳細仕様: `CLAUDE.md`
- [Solid.js Documentation](https://www.solidjs.com/)
- [Tone.js Documentation](https://tonejs.github.io/)
- [Tailwind CSS](https://tailwindcss.com/)

---
**作成日**: 2025年8月30日  
**作成者**: Claude Code → Gemini引き継ぎ  
**プロジェクト目標**: HCI研究 + アート作品としての完成度