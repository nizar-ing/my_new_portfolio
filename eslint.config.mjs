import nextConfig from "eslint-config-next";
import nextTsConfig from "eslint-config-next/typescript";
import nextCwvConfig from "eslint-config-next/core-web-vitals";

/** @type {import('eslint').Linter.Config[]} */
const eslintConfig = [
  ...nextConfig,
  ...nextTsConfig,
  ...nextCwvConfig,
];

export default eslintConfig;
