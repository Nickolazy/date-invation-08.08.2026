/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUBMISSION_ENDPOINT: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
