"use client";

import { FirebaseService } from "@libraries/plaster-calculator-web-core";
import {
    type AppCheck,
    initializeAppCheck,
    ReCaptchaV3Provider,
} from "firebase/app-check";
import { useEffect, useState } from "react";

import { RECAPTCHA_SITE_KEY } from "./firebase.constants.ts";

export function useAppCheck(): AppCheck | undefined {
    const [appCheck, setAppCheck] = useState<AppCheck>();
    const environment = process.env["NEXT_PUBLIC_ENVIRONMENT"];

    useEffect(() => {
        checkAppCheckDebugToken(environment);
        setAppCheck(
            initializeAppCheck(FirebaseService.app, {
                provider: new ReCaptchaV3Provider(RECAPTCHA_SITE_KEY),
                isTokenAutoRefreshEnabled: true,
            }),
        );
    }, []);

    return appCheck;
}

function checkAppCheckDebugToken(environment: string | undefined) {
    if (environment === "development") {
        (
            self as typeof self & {
                FIREBASE_APPCHECK_DEBUG_TOKEN?: boolean | string;
            }
        ).FIREBASE_APPCHECK_DEBUG_TOKEN = true;
    }
}
