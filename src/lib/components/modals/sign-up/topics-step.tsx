import { useFormContext } from "react-hook-form";
import { TOPICS } from "./constants";
import type { SignUpFormData } from "./types";

export function TopicsStep() {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<SignUpFormData>();

  const topics = watch("topics") || [];

  const handleTopicToggle = (topic: string) => {
    const newTopics = topics.includes(topic)
      ? topics.filter((t) => t !== topic)
      : [...topics, topic];
    setValue("topics", newTopics, { shouldValidate: true });
  };

  return (
    <div>
      <label className="label">
        Select at least 3 topics you're interested in
      </label>
      <div className="grid grid-cols-3 gap-4">
        {TOPICS.map((topic) => (
          <label key={topic} className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="checkbox"
              checked={topics.includes(topic)}
              onChange={() => handleTopicToggle(topic)}
            />
            <span>{topic}</span>
          </label>
        ))}
      </div>
      {errors.topics && (
        <span className="text-error text-sm block mt-2">
          {errors.topics.message}
        </span>
      )}
    </div>
  );
}
