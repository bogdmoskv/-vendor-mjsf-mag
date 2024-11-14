import { reactive, ref } from "vue";
import { getAuth, sendEmailVerification } from "firebase/auth";
import type { UserState } from "@/types/userState";

const userState: UserState = reactive<UserState>({
    authorized: false,
    user: undefined,
    error: undefined,
});

const resendVerificationEmail = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
        try {
            await sendEmailVerification(user);
            alert("Verification email resent. Please check your inbox.");
        } catch (error) {
            console.error("Error resending verification email:", error);
            alert(error.message);
        }
    } else {
        alert("No user is currently signed in.");
    }
};

export default function (): {
    userState: UserState;
    resendVerificationEmail: () => Promise<void>;
} {
    return {
        userState,
        resendVerificationEmail,
    };
}
