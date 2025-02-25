import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { UserProfile } from "@clerk/nextjs";
const AccountPage = () => {
  return (
    <div>
      <section className="grid items-center gap-8 pb-8 pt-6 md:py-8 overflow-hidden">
        <PageHeader>
          <PageHeaderHeading size="sm">Account</PageHeaderHeading>
          <PageHeaderDescription size="sm">
            Manage your account settings
          </PageHeaderDescription>
        </PageHeader>
        <ScrollArea className="w-full pb-3.5">
          <UserProfile />

          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </section>
    </div>
  );
};
export default AccountPage;
