module.exports = {
  // Frontend (Next.js) - 앱 폴더로 이동해서 실행
  "apps/web/**/*.{js,jsx,ts,tsx}": (filenames) => {
    const files = filenames.map((f) => f.replace(/^apps\/web\//, ""));
    return [
      `cd apps/web && eslint --fix ${files.join(" ")}`,
      `cd apps/web && prettier --write ${files.join(" ")}`,
    ];
  },

  // Backend (Nest.js) - 앱 폴더로 이동해서 실행
  "apps/api/**/*.{js,ts}": (filenames) => {
    const files = filenames.map((f) => f.replace(/^apps\/api\//, ""));
    return [
      `cd apps/api && eslint --fix ${files.join(" ")}`,
      `cd apps/api && prettier --write ${files.join(" ")}`,
    ];
  },

  // Packages
  "packages/**/*.{js,jsx,ts,tsx}": ["eslint --fix", "prettier --write"],

  // Other files (JSON, MD 등) - pnpm-lock.yaml 제외
  "*.{json,md,yml,yaml}": (filenames) => {
    const files = filenames.filter((f) => !f.includes("pnpm-lock.yaml"));
    return files.length > 0 ? `prettier --write ${files.join(" ")}` : [];
  },
};
