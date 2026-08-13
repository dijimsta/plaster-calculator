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
    const publicEnvironment = process.env["NEXT_PUBLIC_ENVIRONMENT"];
    const nodeEnvironment = process.env.NODE_ENV;

    useEffect(() => {
        checkAppCheckDebugToken(nodeEnvironment, publicEnvironment);
        setAppCheck(
            initializeAppCheck(FirebaseService.app, {
                provider: new ReCaptchaV3Provider(RECAPTCHA_SITE_KEY),
                isTokenAutoRefreshEnabled: true,
            }),
        );
    }, [nodeEnvironment, publicEnvironment]);

    return appCheck;
}

function checkAppCheckDebugToken(
    nodeEnvironment: string | undefined,
    publicEnvironment: string | undefined,
) {
    if (
        nodeEnvironment === "development" ||
        publicEnvironment === "development"
    ) {
        (
            self as typeof self & {
                FIREBASE_APPCHECK_DEBUG_TOKEN?: boolean | string;
            }
        ).FIREBASE_APPCHECK_DEBUG_TOKEN = true;
    }
}
