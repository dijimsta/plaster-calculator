import { getApps, initializeApp } from "firebase-admin/app";
import { setGlobalOptions } from "firebase-functions";

setGlobalOptions({
    maxInstances: 5,
    region: "us-west1",
    enforceAppCheck: true,
});

if (getApps().length === 0) {
    initializeApp();
}
