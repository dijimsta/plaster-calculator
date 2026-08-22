"use client";

import { SupplierRow as SupplierRowContent } from "@libraries/plaster-calculator-ui";
import { Table } from "@libraries/uikit-web";
import { default as LinkModule } from "next/link.js";

import type { Supplier } from "../../../types.js";

const Link = LinkModule.default;

type SupplierRowProps = {
    readonly supplier: Supplier;
    readonly totalItemCount: number;
};

/** Wraps `SupplierRow` (`@libraries/plaster-calculator-ui`) in the table row
 * and detail-page link the library component itself doesn't own, the same
 * way `CompanyRow` wraps its own presentational content. */
export function SupplierRow({ supplier, totalItemCount }: SupplierRowProps) {
    return (
        <Table.Row>
            <Table.Cell>
                <Link href={`/suppliers/${supplier.id}`}>
                    <SupplierRowContent
                        supplier={supplier}
                        totalItemCount={totalItemCount}
                    />
                </Link>
            </Table.Cell>
        </Table.Row>
    );
}
