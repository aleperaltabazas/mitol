/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GAME_MODE?: 'progressive' | 'unlimited'
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
