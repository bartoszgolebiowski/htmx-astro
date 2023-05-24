import type { AstroCookies } from "astro";

const STEP_COOKIE_NAME = "multistep-form";

type MultistepForm = {
    currentStep: number
    step1?: {
        name: string;
        email: string;
    },
    step2?: {
        address: string;
        city: string;
    },
    step3?: {
        cardNumber: string;
        cardExpiry: string;
    },
}

type Steps = "step1" | "step2" | "step3"

const getMultistepForm = (cookies: AstroCookies) => {
    const cookiesRaw = cookies.get(STEP_COOKIE_NAME);
    if (!cookiesRaw.value) {
        return {
            currentStep: 1
        }
    }
    const multistep = cookiesRaw.json() as MultistepForm;
    return multistep;
}

export const getCurrentStep = (cookies: AstroCookies) => {
    const multistep = getMultistepForm(cookies)
    return multistep.currentStep
}

export const getDefaultValues = <T extends Steps>(cookies: AstroCookies, step: T) => {
    const multistep = getMultistepForm(cookies)
    return multistep[step]
}

export const submitValues = <T extends Steps>(cookies: AstroCookies,
    step: T,
    values: MultistepForm[T]
) => {
    const multistep = getMultistepForm(cookies)
    if (step === "step1") {
        multistep.currentStep = 2;
    }
    if (step === "step2") {
        multistep.currentStep = 3;
    }
    multistep[step] = values;
    cookies.set(STEP_COOKIE_NAME, JSON.stringify(multistep), { httpOnly: true, sameSite: "lax", secure: true, path: "/" });
}

export const clearCookies = (cookies: AstroCookies) => {
    cookies.delete(STEP_COOKIE_NAME, { path: "/", })
}