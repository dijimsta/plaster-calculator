import { getApps, initializeApp } from "firebase-admin/app";
import { setGlobalOptions } from "firebase-functions";

// No enforceAppCheck here, unlike plaster-calculator-functions: App Check
// tokens come from attested client SDKs, and this service's only caller is
// floorplan-analyzer calling server-to-server (WORK-303). Cloud Functions'
// default IAM invoker auth (a Google-issued ID token, checked via ADC) is
// the applicable mechanism, matching the existing plaster-calculator-functions
// -> floorplan-analyzer call in analyzer.ts.
setGlobalOptions({
    maxInstances: 5,
    region: "us-west1",
});

if (getApps().length === 0) {
    initializeApp();
}
