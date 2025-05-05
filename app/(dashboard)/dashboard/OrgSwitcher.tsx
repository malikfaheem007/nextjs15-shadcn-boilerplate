'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function OrganizationSwitcher({ organizations, currentOrgId }: {
    organizations: { id: string; name: string }[],
    currentOrgId: string
}) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    async function handleSwitch(orgId: string) {
        setLoading(true);
        await fetch('/api/set-current-org', {
            method: 'POST',
            body: JSON.stringify({ orgId }),
        });
        router.refresh(); // reload the page/server components
    }

    return (
        <select
            className="border px-3 py-2 rounded"
            value={currentOrgId}
            onChange={(e) => handleSwitch(e.target.value)}
            disabled={loading}
        >
            {organizations.map(org => (
                <option key={org.id} value={org.id}>
                    {org.name}
                </option>
            ))}
        </select>
    );
}
