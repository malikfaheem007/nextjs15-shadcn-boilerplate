"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Building, Plus } from "lucide-react";
import { createOrganization, setCurrentOrgId } from "@/actions/organizations";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import TextSeparator from "@/components/shared/TextSeparator";
import { InputWithLabel } from "@/components/shared/InputWithLabel";
import { Icons } from "@/components/shared/icons";

interface Organization {
  id: string;
  name: string;
}

interface SelectOrganizationProps {
  organizations: Organization[];
}

export default function SelectOrganization({
  organizations,
}: SelectOrganizationProps) {
  const router = useRouter();
  const [newOrgName, setNewOrgName] = useState("");

  async function handleCreateOrg() {
    const orgId = await createOrganization(newOrgName);
    await setCurrentOrgId(orgId);
    router.push("/dashboard");
  }

  async function handleSelectOrg(id: string) {
    await setCurrentOrgId(id);
    router.push("/dashboard");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4 dark:bg-gray-900">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <Icons.logo className="mx-auto my-3" />

          <CardTitle className="text-2xl font-bold">
            {organizations.length > 0
              ? "Select an Organization"
              : "Create an Organization"}
          </CardTitle>
          <CardDescription>
            {organizations.length > 0 &&
              "Choose an existing organization or create a new one"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {organizations.length > 0 && (
            <>
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
              <div className="py-2.5">
                <TextSeparator>Or</TextSeparator>
              </div>
            </>
          )}

          <div className="space-y-3">
            <InputWithLabel
              label="New Organization"
              placeholder="Organization name"
              value={newOrgName}
              onChange={(e) => setNewOrgName(e.target.value)}
            />

            <Button
              onClick={handleCreateOrg}
              disabled={!newOrgName.trim()}
              className="w-full"
            >
              <Plus className="h-4 w-4" />
              Create
            </Button>
          </div>
        </CardContent>
        <CardFooter className="text-xs text-muted-foreground text-center">
          You can manage organization settings after creation
        </CardFooter>
      </Card>
    </div>
  );
}
