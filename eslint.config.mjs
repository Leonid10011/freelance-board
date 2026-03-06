import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettierConfig from "eslint-config-prettier"; // Prettier-Plugin importieren

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  prettierConfig, // Prettier am Ende einfügen, um Regeln zu überschreiben
  
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  
  // Falls du eigene Regeln hinzufügen willst, hier ein neues Objekt:
  {
    rules: {
      // Deine Custom Rules hier
    }
  }
]);

export default eslintConfig;
