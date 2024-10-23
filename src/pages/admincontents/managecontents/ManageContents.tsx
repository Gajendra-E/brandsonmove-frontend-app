import "../css/admin.scss";
import React, { useState } from "react";
import { useForm, FieldErrors } from "react-hook-form";
import "react-toastify/dist/ReactToastify.css";
import ContentList from "./component/ContentList";
import { showToast } from "../../../utils/utils";
import axios from "axios";
import { BACKEND_APP_URL } from "../../../config/config";
import LoadingSpinner from "../../../components/common/loadingspinner/LoadingSpinner";

// Character limits for the input fields
const CHAR_LIMITS = {
  heading1: 72,
  heading2: 180,
  heading3: 72,
  paragraph_content: 1800,
};

interface ContentForm {
  heading1: string;
  heading2: string;
  heading3: string;
  paragraph_content: string;
  file: FileList;
}

export default function ManageContents() {
  const [loading, setLoading] = useState<boolean>(false);
  const [showForm, setShowForm] = useState<boolean>(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<ContentForm>();

  const onSubmit = async (data: ContentForm) => {
    const formData = new FormData();
    const file = data.file[0];
    
    formData.append("heading1", data.heading1);
    formData.append("heading2", data.heading2);
    formData.append("heading3", data.heading3);
    formData.append("paragraph_content", data.paragraph_content);
    formData.append("file", file);

    try {
      setLoading(true);
      const result = await axios.post(`${BACKEND_APP_URL}/content`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (result?.data?.status === "success") {
        showToast("Successfully added.", true);
        reset();
      } else {
        showToast("Error.", false);
      }
    } catch (error) {
      console.error("Error while saving", error);
      showToast("Error while saving.", false);
    } finally {
      setLoading(false);
      setShowForm(false);
    }
  };

  const renderField = (field: keyof ContentForm, label: string) => {
    const charLimit = CHAR_LIMITS[field as keyof typeof CHAR_LIMITS];
    const value = watch(field) || "";
    const charCount = value.length;

    return (
      <div className="form-field">
        <div className="label">{label}</div>
        <input
          className="form-input input"
          type="text"
          {...register(field, {
            required: `${label} is required.`,
            maxLength: {
              value: charLimit,
              message: `${label} must be at most ${charLimit} characters.`,
            },
          })}
        />
        <div className="char-info">
          <span className={errors[field] ? "error" : ""}>
            {charCount}/{charLimit}
          </span>
          {errors[field]?.message && (
            <p className="error-message">
              {String(errors[field]?.message)}
            </p>
          )}
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="switch-content-block">
        <i
          className={`bi ${showForm ? "bi-card-list list-icon" : "bi-plus-square add-icon"}`}
          onClick={() => setShowForm(!showForm)}
        ></i>
      </div>

      {showForm ? (
        <div className="dynamic-content-form">
          <form onSubmit={handleSubmit(onSubmit)}>
            {renderField("heading1", "Heading 1")}
            {renderField("heading2", "Heading 2")}
            {renderField("heading3", "Heading 3")}
            {renderField("paragraph_content", "Paragraph Content")}

            <div className="form-field">
              <div className="label">Document</div>
              <input
                className="form-input input"
                type="file"
                {...register("file", {
                  required: "Document is required.",
                })}
              />
              {errors.file?.message && (
                <p className="error-message">{String(errors.file.message)}</p>
              )}
            </div>

            <div className="text-center mt-3 mb-2">
              {loading ? <LoadingSpinner /> : <button className="button-submit" type="submit">Submit</button>}
            </div>
          </form>
        </div>
      ) : (
        <ContentList />
      )}
    </div>
  );
}
