'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {createOrganization} from "@/utils/organizations";

interface SelectOrganization {
    organizations: any[]
}

export default function SelectOrganization({organizations}: SelectOrganization) {
    const router = useRouter();
    const [name, setName] = useState('');

    async function handleCreateOrg() {
        const data = await createOrganization(name);
        localStorage.setItem('current_org_id', data);
        router.push('/dashboard');
    }

    function handleSelectOrg(id: string) {
        localStorage.setItem('current_org_id', id);
        router.push('/dashboard');
    }

    return (
        <div className="max-w-lg mx-auto mt-12">
            <h1 className="text-2xl font-semibold mb-4">Select an Organization</h1>

            {organizations.length > 0 && (
                <div className="space-y-2 mb-6">
                    {organizations.map((org) => (
                        <button
                            key={org.id}
                            onClick={() => handleSelectOrg(org.id)}
                            className="w-full border px-4 py-2 rounded hover:bg-gray-100"
                        >
                            {org.name}
                        </button>
                    ))}
                </div>
            )}

            <div>
                <h2 className="text-lg font-medium mb-2">Or create a new one</h2>
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Organization name"
                    className="border p-2 w-full mb-2 rounded"
                />
                <button
                    onClick={handleCreateOrg}
                    className="bg-black text-white px-4 py-2 rounded"
                >
                    Create Organization
                </button>
            </div>
        </div>
    );
}
