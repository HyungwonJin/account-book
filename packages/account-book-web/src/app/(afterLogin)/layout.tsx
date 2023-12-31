import { getMyAccount } from "@/app/lib/getMyAccount";
import { redirect } from "next/navigation";
import RQProvider from "@/app/provider/RQProvider";
import { UserProvider } from "@/app/contexts/UserContext";

export default async function AfterLoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const me = await getMyAccount();
  if (me.statusCode) {
    return redirect("/login");
  }

  return (
    <div className="px-5 pb-[20px] h-full">
      <RQProvider>
        <UserProvider user={me}>{children}</UserProvider>
      </RQProvider>
    </div>
  );
}
