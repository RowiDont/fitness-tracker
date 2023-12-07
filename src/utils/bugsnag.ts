import React from "react";
import Bugsnag from "@bugsnag/js";
import BugsnagPluginReact from "@bugsnag/plugin-react";
import BugsnagPerformance from "@bugsnag/browser-performance";

Bugsnag.start({
    apiKey: "37070c637fbdedc61e17a53f79183899",
    plugins: [new BugsnagPluginReact()],
});
BugsnagPerformance.start({ apiKey: "37070c637fbdedc61e17a53f79183899" });

export const ErrorBoundary =
    Bugsnag.getPlugin("react")!.createErrorBoundary(React);
