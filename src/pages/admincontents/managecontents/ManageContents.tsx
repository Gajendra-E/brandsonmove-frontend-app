import "../css/admin.scss";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "react-toastify/dist/ReactToastify.css";
import ContentList from "./component/ContentList";
import { showToast } from "../../../utils/utils";
import api from "../../../api";
import LoadingSpinner from "../../../components/common/loadingspinner/LoadingSpinner";
import axios from "axios";
import {BACKEND_APP_URL} from "../../../config/config"


export default function ManageContents() {
  const [loading, setLoading] = useState<boolean>(false);
  const [showForm, setShowForm] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState,
    reset,
  } = useForm({});
  const { errors } = formState;

  const onSubmit = async (data: any) => {
    let formData = new FormData();
    const file = data.file[0];
    formData.append("heading1", data.heading1);
    formData.append("heading2", data.heading2);
    formData.append("heading3", data.heading3);
    formData.append("paragraph_content", data.paragraph_content);
    formData.append("file", file);

    try {
      setLoading(true);
      const result = await axios({
        method: "post",
        url: `/content`,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (result?.data?.status === "success") {
        setLoading(false);
        showToast("Successfully added.", true);
        reset();
      } else {
        setLoading(false);
        showToast("Error.", false);
      }
    } catch (error: any) {
      setLoading(false);
      console.log("Error while saving", error);
    }
    setShowForm(!showForm);
  };

  return (
    <div>
      <div className="switch-content-block">
        {showForm ? (
          <i
            className="bi bi-card-list list-icon"
            onClick={() => setShowForm(!showForm)}
          ></i>
        ) : (
          <i
            className="bi bi-plus-square add-icon"
            onClick={() => setShowForm(!showForm)}
          ></i>
        )}
      </div>
      {showForm ? (
        <div className="dynamic-content-form">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-field">
              <div className="label">Heading 1</div>
              <input
                className="form-input input"
                type="text"
                {...register("heading1", {
                  required: true,
                })}
              />
              {errors?.heading1 && (
                <p className="error-message">This is required.</p>
              )}
            </div>
            <div className="form-field">
              <div className="label">Heading 2</div>
              <input
                className="form-input input"
                type="text"
                {...register("heading2", {
                  required: true,
                })}
              />
              {errors?.heading2 && (
                <p className="error-message">This is required.</p>
              )}
            </div>
            <div className="form-field">
              <div className="label">Heading 3</div>
              <input
                className="form-input input"
                type="text"
                {...register("heading3", {
                  required: true,
                })}
              />
              {errors?.heading3 && (
                <p className="error-message">This is required.</p>
              )}
            </div>
            <div className="form-field">
              <div className="label">Paragraph content</div>
              <input
                className="form-input input"
                type="text"
                {...register("paragraph_content", {
                  required: true,
                })}
              />
              {errors?.paragraph_content && (
                <p className="error-message">This is required.</p>
              )}
            </div>

            <div className="form-field">
              <div className="label">Document</div>
              <input
                className="form-input input"
                type="file"
                {...register("file", {
                  required: true,
                })}
              />
              {errors?.file && (
                <p className="error-message">This is required.</p>
              )}
            </div>

            <div className="text-center mt-3 mb-2">
              {loading ? (
                <LoadingSpinner />
              ) : (
                <button className="button-submit" type="submit">
                  Submit
                </button>
              )}
            </div>
          </form>
        </div>
      ) : (
        <div>
          <ContentList />
        </div>
      )}
    </div>
  );
}
