"use client";

import { ConfigProvider, ThemeConfig } from "antd";
import React from "react";

export function AntdThemeProvider({ children }: React.PropsWithChildren) {
  const themeConfig: ThemeConfig = {
    token: {
      colorPrimary: `var(--foreground)`,
      colorPrimaryBg: `var(--background)`,
    },
  };
  return <ConfigProvider theme={themeConfig}>{children}</ConfigProvider>;
}
