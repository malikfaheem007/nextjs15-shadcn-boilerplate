import { getUserOrganizations } from "@/actions/organizations";
import SelectOrganization from "@/app/(auth)/select-organization/SelectOrganization";

async function SelectOrganizationPage() {
    const organizations = await getUserOrganizations();

    return <SelectOrganization organizations={organizations} />
}

export default SelectOrganizationPage;
