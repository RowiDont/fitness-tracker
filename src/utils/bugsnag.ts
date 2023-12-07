import React from "react";
import Bugsnag from "@bugsnag/js";
import BugsnagPluginReact from "@bugsnag/plugin-react";
import BugsnagPerformance from "@bugsnag/browser-performance";

Bugsnag.start({
    apiKey: import.meta.env.VITE_BUGSNAG_API_KEY,
    plugins: [new BugsnagPluginReact()],
});
BugsnagPerformance.start({ apiKey: import.meta.env.VITE_BUGSNAG_API_KEY });

export const ErrorBoundary =
    Bugsnag.getPlugin("react")!.createErrorBoundary(React);
