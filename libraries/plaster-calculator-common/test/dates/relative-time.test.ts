import assert from "node:assert/strict";
import test from "node:test";

import { formatRelativeTime } from "../../src/index.ts";

const NOW = new Date("2026-08-17T12:00:00.000Z");

test("formatRelativeTime reports 'now' when date equals now", () => {
    assert.equal(formatRelativeTime(new Date(NOW), NOW), "now");
});

test("formatRelativeTime formats seconds in the past", () => {
    assert.equal(
        formatRelativeTime(new Date(NOW.getTime() - 30_000), NOW),
        "30 seconds ago",
    );
});

test("formatRelativeTime formats seconds in the future", () => {
    assert.equal(
        formatRelativeTime(new Date(NOW.getTime() + 30_000), NOW),
        "in 30 seconds",
    );
});

test("formatRelativeTime stays in seconds just under the 60-second boundary", () => {
    assert.equal(
        formatRelativeTime(new Date(NOW.getTime() - 59_000), NOW),
        "59 seconds ago",
    );
});

test("formatRelativeTime rolls over to minutes at the 60-second boundary", () => {
    assert.equal(
        formatRelativeTime(new Date(NOW.getTime() - 60_000), NOW),
        "1 minute ago",
    );
});

test("formatRelativeTime formats minutes", () => {
    assert.equal(
        formatRelativeTime(new Date(NOW.getTime() - 5 * 60_000), NOW),
        "5 minutes ago",
    );
});

test("formatRelativeTime formats hours", () => {
    assert.equal(
        formatRelativeTime(new Date(NOW.getTime() - 2 * 60 * 60_000), NOW),
        "2 hours ago",
    );
});

test("formatRelativeTime formats days", () => {
    assert.equal(
        formatRelativeTime(new Date(NOW.getTime() - 3 * 24 * 60 * 60_000), NOW),
        "3 days ago",
    );
});

test("formatRelativeTime formats weeks", () => {
    assert.equal(
        formatRelativeTime(
            new Date(NOW.getTime() - 2 * 7 * 24 * 60 * 60_000),
            NOW,
        ),
        "2 weeks ago",
    );
});

test("formatRelativeTime formats months", () => {
    assert.equal(
        formatRelativeTime(new Date("2026-06-17T12:00:00.000Z"), NOW),
        "2 months ago",
    );
});

test("formatRelativeTime formats years in the past", () => {
    assert.equal(
        formatRelativeTime(new Date("2024-08-17T12:00:00.000Z"), NOW),
        "2 years ago",
    );
});

test("formatRelativeTime formats years in the future", () => {
    assert.equal(
        formatRelativeTime(new Date("2028-08-17T12:00:00.000Z"), NOW),
        "in 2 years",
    );
});

test("formatRelativeTime defaults `now` to the current time when omitted", () => {
    const justNow = new Date();
    assert.equal(formatRelativeTime(justNow), "now");
});
