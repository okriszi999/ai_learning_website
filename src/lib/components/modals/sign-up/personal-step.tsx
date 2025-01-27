import { useFormContext } from "react-hook-form";
import type { SignUpFormData } from "./types";

export function PersonalInfoStep() {
  const {
    register,
    formState: { errors },
  } = useFormContext<SignUpFormData>();

  return (
    <div className="space-y-4">
      <div>
        <label className="label">Gender</label>
        <select
          className={`select select-bordered w-full ${errors.gender ? "select-error" : ""}`}
          {...register("gender")}
        >
          <option value="">Select gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        {errors.gender && (
          <span className="text-error text-sm">{errors.gender.message}</span>
        )}
      </div>
      <div>
        <label className="label">Birth Date</label>
        <input
          type="date"
          className={`input input-bordered w-full ${errors.birthDate ? "input-error" : ""}`}
          {...register("birthDate")}
        />
        {errors.birthDate && (
          <span className="text-error text-sm">{errors.birthDate.message}</span>
        )}
      </div>
    </div>
  );
}
