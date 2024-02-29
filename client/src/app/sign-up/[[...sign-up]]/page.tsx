import { SignUp } from "@clerk/nextjs";

export default function Page() {
    return (
        <div className="flex mt-20 justify-center">
            <SignUp />
        </div>
    );
}