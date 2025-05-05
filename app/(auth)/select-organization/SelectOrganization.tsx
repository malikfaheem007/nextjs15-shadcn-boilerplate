"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Building, Plus } from "lucide-react";
import { createOrganization , setCurrentOrgId} from '@/app/actions/organizations';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Separator} from "@/components/ui/separator";

interface Organization {
  id: string;
  name: string;
}

interface SelectOrganizationProps {
  organizations: Organization[];
}

export default function SelectOrganization({ organizations ,
}: SelectOrganizationProps) {
  const router = useRouter();
  const [newOrgName, setNewOrgName] = useState("");

    async function handleCreateOrg() {
        const orgId = await createOrganization(newOrgName);
        await setCurrentOrgId(orgId); // ✅ save to Supabase metadata
        router.push('/dashboard');
    }

    async function handleSelectOrg(id: string) {
        await setCurrentOrgId(id); // ✅ save to Supabase metadata
        router.push('/dashboard');
    }

  return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4 dark:bg-gray-900">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">
              Select an Organization
            </CardTitle>
            <CardDescription>
              Choose an existing organization or create a new one
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {organizations.length > 0 && (
                <div className="space-y-3">
                  {organizations.map((org) => (
                      <Button
                          key={org.id}
                          variant="outline"
                          className="w-full justify-start h-auto py-3 px-4 text-base font-normal"
                          onClick={() => handleSelectOrg(org.id)}
                      >
                        <Building className="mr-2 h-4 w-4" />
                        {org.name}
                      </Button>
                  ))}
                </div>
            )}

            <Separator className="my-4" />

            <div className="space-y-3">
              <h3 className="text-sm font-medium">Or create a new one</h3>
              <div className="space-y-2">
                <Input
                    placeholder="Organization name"
                    value={newOrgName}
                    onChange={(e) => setNewOrgName(e.target.value)}
                />
                <Button onClick={handleCreateOrg} disabled={!newOrgName.trim()}>
                  <Plus className="h-4 w-4" />
                  Create
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="text-xs text-muted-foreground text-center">
            You can manage organization settings after creation
          </CardFooter>
        </Card>
      </div>
  );
  };
