import assert from "node:assert/strict";
import test from "node:test";

import type { GetQuoteReadinessData } from "@generated/data-connector-web";
import {
    COMPANY_CONTACT_DETAILS_CHECK_ID,
    MANUAL_ANSWER_SOURCE,
} from "@libraries/plaster-calculator-common";

import { evaluate, isReady } from "../../src/quotes/quote-readiness.utils.ts";

type QueryProject = NonNullable<GetQuoteReadinessData["project"]>;
type QueryCompany = NonNullable<QueryProject["company"]>;

/**
 * A `GetQuoteReadiness` response whose every `BLOCK` check is met — one
 * scaled, measured page with an explicit wall type and ceiling height, one
 * priced-and-unitized enabled template config, and one manually-answered
 * question — so `isReady()` isolates whatever `COMPANY_CONTACT_DETAILS`
 * (the sole `WARN` check) does to the result, per its "a warning doesn't
 * block generation" contract.
 */
function readyDataFixture(company?: QueryCompany): GetQuoteReadinessData {
    const overlayJson = JSON.stringify({
        areas: [
            {
                id: "area-1",
                label: "Room",
                points: [
                    [0, 0],
                    [100, 0],
                    [100, 100],
                    [0, 100],
                ],
                wallBoardType: "10mm Plasterboard",
                ceilingPlasterType: "Standard",
                source: "detected",
                deleted: false,
            },
        ],
    });

    return {
        project: {
            id: "project-1",
            teamId: "team-1",
            name: "Test project",
            salesStatus: "QUOTING",
            pageCount: 1,
            company,
        },
        floorplanPages: [
            {
                id: "page-1",
                pageNumber: 1,
                scaleMmPerPx: 5,
                ceilingHeightMm: 2400,
                overlayJson,
            },
        ],
        projectQuestionnaireQuestions: [
            {
                id: "question-1",
                label: "Is the ceiling raked?",
                answer: "No",
                answerSource: MANUAL_ANSWER_SOURCE,
            },
        ],
        quoteItemTemplateConfigs: [
            {
                itemTemplateId: "template-1",
                enabled: true,
                unitPriceCents: 1000,
                itemTemplate: {
                    id: "template-1",
                    name: "Skim coat",
                    unit: "m²",
                    hasKeywords: false,
                    keywords: [],
                    sortOrder: 0,
                    quantitySourceId: null,
                },
            },
        ],
    };
}

function uncontactableCompany(): QueryCompany {
    return {
        id: "company-1",
        companyName: "Acme Plastering",
        phoneNumber: null,
        businessNumber: null,
        primaryContactId: null,
    };
}

function contactableCompany(): QueryCompany {
    return {
        id: "company-2",
        companyName: "Contactable Plastering",
        phoneNumber: null,
        businessNumber: null,
        primaryContactId: "contact-1",
        primaryContact: {
            id: "contact-1",
            name: "Jamie Contact",
            email: "jamie@example.test",
            phoneNumber: null,
        },
    };
}

test("evaluate() reports COMPANY_CONTACT_DETAILS unmet for a company with no phone and no contactable primary contact, but isReady() stays true", () => {
    const data = readyDataFixture(uncontactableCompany());

    const results = evaluate(data, data.quoteItemTemplateConfigs);

    const companyResult = results.find(
        (result) => result.checkId === COMPANY_CONTACT_DETAILS_CHECK_ID,
    );
    assert.ok(companyResult, "expected a COMPANY_CONTACT_DETAILS result");
    assert.equal(companyResult.isMet, false);
    assert.equal(isReady(results), true);
});

test("evaluate() reports COMPANY_CONTACT_DETAILS met for a company with a contactable primary contact", () => {
    const data = readyDataFixture(contactableCompany());

    const results = evaluate(data, data.quoteItemTemplateConfigs);

    const companyResult = results.find(
        (result) => result.checkId === COMPANY_CONTACT_DETAILS_CHECK_ID,
    );
    assert.ok(companyResult, "expected a COMPANY_CONTACT_DETAILS result");
    assert.equal(companyResult.isMet, true);
});
