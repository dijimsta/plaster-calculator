import "../src/styles.css";

import {
    companiesTranslations,
    projectsTranslations,
    questionnairesTranslations,
    quotesTranslations,
    suppliersTranslations,
} from "@libraries/plaster-calculator-ui";
import { NotificationsProvider } from "@libraries/uikit-web";
import type { Preview } from "@storybook/react-vite";
import { I18nProvider } from "@ui/internationalization";
import { INITIAL_VIEWPORTS } from "storybook/viewport";

const preview: Preview = {
    decorators: [
        (Story) => (
            <I18nProvider
                translations={[
                    companiesTranslations,
                    projectsTranslations,
                    questionnairesTranslations,
                    quotesTranslations,
                    suppliersTranslations,
                ]}
            >
                <NotificationsProvider>
                    <Story />
                </NotificationsProvider>
            </I18nProvider>
        ),
    ],
    parameters: {
        options: {
            storySort: {
                method: "alphabetical",
            },
        },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
        viewport: {
            options: INITIAL_VIEWPORTS,
        },
    },
};

export default preview;
