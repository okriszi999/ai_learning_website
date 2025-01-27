import { useFormContext } from "react-hook-form";
import type { SignUpFormData } from "./types";

export function SummaryStep() {
  const { watch } = useFormContext<SignUpFormData>();
  const formData = watch();

  return (
    <div className="space-y-4">
      <h4 className="font-semibold">Summary</h4>
      <div className="grid grid-cols-2 gap-4">
        <p>
          <strong>Username:</strong> {formData.username}
        </p>
        <p>
          <strong>Email:</strong> {formData.email}
        </p>
        <p>
          <strong>Full Name:</strong> {formData.fullName}
        </p>
        <p>
          <strong>Gender:</strong> {formData.gender}
        </p>
        <p>
          <strong>Birth Date:</strong> {formData.birthDate}
        </p>
        <div className="col-span-2">
          <strong>Selected Topics:</strong>
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.topics?.map((topic) => (
              <span key={topic} className="badge badge-primary">
                {topic}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
