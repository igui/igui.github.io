import mixpanel from "mixpanel-browser";

// Initialize Mixpanel
mixpanel.init(import.meta.env.VITE_MIXPANEL_TOKEN, {
  autocapture: true,
  record_sessions_percent: 100,
});

export const trackEvent = (name: string, props?: Record<string, any>) => {
  mixpanel.track(name, props);
};

export default mixpanel;
