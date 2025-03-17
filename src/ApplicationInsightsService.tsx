import {ApplicationInsights, ITelemetryItem} from '@microsoft/applicationinsights-web';
import {ReactPlugin} from '@microsoft/applicationinsights-react-js';

const reactPlugin = new ReactPlugin();
const appInsights = new ApplicationInsights({
  config: {
    connectionString: "InstrumentationKey=e91a9a36-3430-468f-9731-f804f73f7158;IngestionEndpoint=https://eastus-8.in.applicationinsights.azure.com/;LiveEndpoint=https://eastus.livediagnostics.monitor.azure.com/;ApplicationId=fe803c73-6f18-4cb7-9088-29c4da90926c",
    extensions: [reactPlugin],
    enableAutoRouteTracking: true,
    disableAjaxTracking: false,
    autoTrackPageVisitTime: true,
    enableCorsCorrelation: true,
    enableRequestHeaderTracking: true,
    enableResponseHeaderTracking: true,
  }
});
appInsights.loadAppInsights();

appInsights.addTelemetryInitializer((env:ITelemetryItem) => {
    env.tags = env.tags || [];
    env.tags["ai.cloud.role"] = "testTag";
});

export { reactPlugin, appInsights };