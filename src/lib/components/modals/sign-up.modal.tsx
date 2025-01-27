import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AccountStep } from "./sign-up/account-step";
import { TopicsStep } from "./sign-up/topics-step";
import { PersonalInfoStep } from "./sign-up/personal-step";
import { SummaryStep } from "./sign-up/summary-step";
import { StepButtonGroup } from "./sign-up/step-button-group";
import { signUpSchema, type SignUpFormData } from "./sign-up/types";

const modalId = "sign-up-modal";

export function SignUpModal() {
  const [step, setStep] = useState(1);

  const methods = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    mode: "onChange",
    defaultValues: {
      username: "",
      email: "",
      fullName: "",
      gender: "other",
      birthDate: "",
      topics: [],
    },
  });

  const { handleSubmit, trigger, formState } = methods;

  const { errors } = formState;

  function handleClose() {
    const url = new URL(location.href);
    url.searchParams.delete("modal");
    window.history.pushState({}, "", url);
    const modal = document.getElementById(modalId) as HTMLDialogElement;
    modal.close();
  }

  async function handleNext() {
    const fields = {
      1: ["username", "email", "fullName"],
      2: ["gender", "birthDate"],
      3: ["topics"],
    }[step] as Array<keyof SignUpFormData>;

    const isValid = await trigger(fields);
    if (isValid) setStep((prev) => prev + 1);
  }

  function getFieldsUpToStep(currentStep: number) {
    const stepFields = {
      1: ["username", "email", "fullName"],
      2: ["gender", "birthDate"],
      3: ["topics"],
      4: [], // Summary step doesn't have new fields
    } as const;

    return Object.entries(stepFields)
      .filter(([step]) => Number(step) <= currentStep)
      .flatMap(([_, fields]) => fields) as Array<keyof SignUpFormData>;
  }

  function isStepValid(errors: object, currentStep: number) {
    const { watch } = methods;
    const relevantFields = getFieldsUpToStep(currentStep);
    const currentValues = watch();

    // Check if any field is empty
    const hasEmptyFields = relevantFields.some(
      (field) =>
        !currentValues[field] ||
        (Array.isArray(currentValues[field]) &&
          currentValues[field].length === 0)
    );

    // Check if any field has validation errors
    const hasErrors = Object.keys(errors).some((field) =>
      relevantFields.includes(field as keyof SignUpFormData)
    );

    return !hasEmptyFields && !hasErrors;
  }

  function handleBack() {
    setStep((prev) => prev - 1);
  }

  function onSubmit(data: SignUpFormData) {
    console.log("Form submitted:", data);
    handleClose();
  }

  return (
    <dialog id={modalId} className="modal">
      <div className="modal-box max-w-4xl relative">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-lg">Create Account</h3>
          <div className="text-sm">Step {step} of 4</div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-64 lg:border-r lg:pr-6 flex justify-center">
            <ul className="steps lg:steps-vertical lg:min-h-[400px]">
              <li
                className={`step ${step >= 1 ? "step-primary animate-pulse z-10" : ""}`}
              >
                Account Details
              </li>
              <li
                className={`step ${step >= 2 ? "step-primary animate-pulse z-10" : ""}`}
              >
                Personal Info
              </li>
              <li
                className={`step ${step >= 3 ? "step-primary animate-pulse z-10" : ""}`}
              >
                Topics
              </li>
              <li
                className={`step ${step >= 4 ? "step-primary animate-pulse z-10" : ""}`}
              >
                Summary
              </li>
            </ul>
          </div>

          <div className="flex-1">
            <FormProvider {...methods}>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4 relative pb-16"
              >
                <div
                  className={`transition-all duration-300 ${
                    step === 1
                      ? "translate-x-0 opacity-100"
                      : "translate-x-full opacity-0 absolute"
                  }`}
                >
                  <AccountStep />
                </div>

                <div
                  className={`transition-all duration-300 ${
                    step === 2
                      ? "translate-x-0 opacity-100"
                      : "translate-x-full opacity-0 absolute"
                  }`}
                >
                  <PersonalInfoStep />
                </div>

                <div
                  className={`transition-all duration-300 ${
                    step === 3
                      ? "translate-x-0 opacity-100"
                      : "translate-x-full opacity-0 absolute"
                  }`}
                >
                  <TopicsStep />
                </div>

                <div
                  className={`transition-all duration-300 ${
                    step === 4
                      ? "translate-x-0 opacity-100"
                      : "translate-x-full opacity-0 absolute"
                  }`}
                >
                  <SummaryStep />
                </div>

                {isStepValid(errors, step) ? "true" : "false"}

                <StepButtonGroup
                  step={step}
                  onBack={handleBack}
                  onNext={handleNext}
                  onClose={handleClose}
                  isValid={isStepValid(errors, step)}
                />
              </form>
            </FormProvider>
          </div>
        </div>
      </div>
    </dialog>
  );
}

export { modalId };
