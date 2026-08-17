import assert from "node:assert/strict";
import test from "node:test";

import { resolveCompanyContactDetails } from "../../src/index.ts";

import { company, page, project } from "./readiness-test-fixtures.ts";

test("resolveCompanyContactDetails is met when the project has no company", () => {
    const result = resolveCompanyContactDetails({ project: project([page()]) });
    assert.equal(result.isMet, true);
    assert.equal(result.affectedItemCount, 0);
    assert.deepEqual(result.affectedItems, []);
});

test("resolveCompanyContactDetails is met when the company has a phone number", () => {
    const result = resolveCompanyContactDetails({
        project: project([page()]),
        company: company({
            phoneNumber: "555-0100",
            primaryContactEmail: null,
        }),
    });
    assert.equal(result.isMet, true);
    assert.equal(result.affectedItemCount, 0);
});

test("resolveCompanyContactDetails is met when the primary contact has an email", () => {
    const result = resolveCompanyContactDetails({
        project: project([page()]),
        company: company({
            phoneNumber: null,
            primaryContactEmail: "contact@acme.test",
        }),
    });
    assert.equal(result.isMet, true);
    assert.equal(result.affectedItemCount, 0);
});

test("resolveCompanyContactDetails is unmet when the primary contact has a name but no email", () => {
    const unreachable = company({
        phoneNumber: null,
        primaryContactName: "Jamie Lee",
        primaryContactEmail: null,
        primaryContactPhone: null,
        companyName: "No Contact Co",
    });
    const result = resolveCompanyContactDetails({
        project: project([page()]),
        company: unreachable,
    });
    assert.equal(result.isMet, false);
    assert.equal(result.affectedItemCount, 1);
    assert.deepEqual(result.affectedItems, [
        { companyId: unreachable.id, companyName: "No Contact Co" },
    ]);
});

test("resolveCompanyContactDetails is unmet when the company has neither a phone nor a reachable contact", () => {
    const unreachable = company({
        phoneNumber: null,
        primaryContactName: null,
        primaryContactEmail: null,
        primaryContactPhone: null,
        companyName: "Bare Co",
    });
    const result = resolveCompanyContactDetails({
        project: project([page()]),
        company: unreachable,
    });
    assert.equal(result.isMet, false);
    assert.equal(result.affectedItemCount, 1);
    assert.deepEqual(result.affectedItems, [
        { companyId: unreachable.id, companyName: "Bare Co" },
    ]);
});
