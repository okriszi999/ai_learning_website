import { useFormContext } from "react-hook-form";
import type { SignUpFormData } from "./types";

export function AccountStep() {
  const {
    register,
    formState: { errors },
  } = useFormContext<SignUpFormData>();

  return (
    <div className="space-y-4">
      <div>
        <label className="label">Username</label>
        <input
          type="text"
          className={`input input-bordered w-full ${
            errors.username ? "input-error" : ""
          }`}
          {...register("username")}
        />
        {errors.username && (
          <span className="text-error text-sm">{errors.username.message}</span>
        )}
      </div>
      <div>
        <label className="label">Email</label>
        <input
          type="email"
          className={`input input-bordered w-full ${
            errors.email ? "input-error" : ""
          }`}
          {...register("email")}
        />
        {errors.email && (
          <span className="text-error text-sm">{errors.email.message}</span>
        )}
      </div>
      <div>
        <label className="label">Full Name</label>
        <input
          type="text"
          className={`input input-bordered w-full ${
            errors.fullName ? "input-error" : ""
          }`}
          {...register("fullName")}
        />
        {errors.fullName && (
          <span className="text-error text-sm">{errors.fullName.message}</span>
        )}
      </div>
    </div>
  );
}
