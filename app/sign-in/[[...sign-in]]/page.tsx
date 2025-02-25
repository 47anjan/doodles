import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="px-4 max-w-[1036px] mx-auto flex justify-center mt-5 md:mt-8 pb-5">
      <SignIn path="/sign-in" />
    </div>
  );
}
