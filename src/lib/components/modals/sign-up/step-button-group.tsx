import { useFormState } from "react-hook-form";
import { Button } from "../../button";

interface StepButtonGroupProps {
  step: number;
  onBack: () => void;
  onNext: () => void;
  onClose: () => void;
  isValid: boolean;
}

export function StepButtonGroup({
  step,
  onBack,
  onNext,
  onClose,
  isValid,
}: StepButtonGroupProps) {
  return (
    <div className="modal-action lg:absolute bottom-4 right-4 mt-0">
      {step > 1 && (
        <Button
          size={"sm"}
          btnColor={"secondary"}
          variant={"outline"}
          onClick={onBack}
        >
          Back
        </Button>
      )}
      {step < 4 && (
        <Button
          variant="outline"
          btnColor="primary"
          size="sm"
          onClick={onNext}
          disabled={!isValid}
        >
          Next
        </Button>
      )}
      {step === 4 && (
        <Button
          type="submit"
          variant={"ghost"}
          btnColor={"accent"}
          size={"sm"}
          disabled={!isValid}
        >
          Submit
        </Button>
      )}
      <Button
        type="button"
        variant={"outline"}
        btnColor={"danger"}
        size={"sm"}
        onClick={onClose}
      >
        Cancel
      </Button>
    </div>
  );
}
