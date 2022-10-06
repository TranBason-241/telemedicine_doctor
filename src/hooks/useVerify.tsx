import { useState } from "react";

import { auth } from "src/configurations/firebase";

import {
    AuthProvider,
    FacebookAuthProvider,
    GoogleAuthProvider,
    signInWithPopup,
} from "@firebase/auth";

export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();

const useVerify = (changeName: (name: string) => void) => {
    const [email, setEmail] = useState<string>("");
    const [displayName, setDisplayName] = useState<string>("");
    const verify = async (provider: AuthProvider) => {
        try {
            let response = await signInWithPopup(auth, provider);
            if (response) {
                setEmail(response.user.email || "");
                setDisplayName(response.user.displayName || "");
                changeName(response.user.displayName || "");
            }
        } catch (exception) {
            // eslint-disable-next-line no-console
            console.log(exception);
        }
    };

    return { verify, email, displayName };
};

export default useVerify;
