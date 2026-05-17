#!/usr/bin/env node
import { initializeApp } from "firebase-admin/app";
import { render } from "ink";

import { AppModule } from "./app.module.js";

initializeApp();

const { waitUntilExit } = render(<AppModule />);

await waitUntilExit();
