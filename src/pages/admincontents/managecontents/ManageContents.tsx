import "../css/admin.css";
import React, { useState } from "react";
// import { useMutation } from "@apollo/client";
// import { INSERT_ONE } from "../../../graphql";
import { useForm } from "react-hook-form";
import "react-toastify/dist/ReactToastify.css";
import LoadingSpinner from "../../../components/common/loadingspinner/LoadingSpinner";
import ContentList from "./component/ContentList";
import { showToast } from "../../../utils/utils";

export default function ManageContents() {

    const [showForm, setShowForm] = useState<boolean>(false);
    const { register, handleSubmit, watch, formState, control, setError, setValue, reset} = useForm({});
    const { errors } = formState;
    // const [addContent, { loading: addingContents }] = useMutation(INSERT_ONE("contents"));

    const onSubmit = async (data: any) => {
        // addContent({
        //     variables: {
        //         object: data
        //     },
        // }).then((resut) => {
        //     reset();
        //     showToast("Successfully saved.", true);
        // }).catch((error: any) => {
        //     console.log(error);
        //     showToast(error?.message || "Error.", false);
        // });
    }

    return (
        <div>
            <div className="switch-content-block">
                {showForm ? (
                    <i
                        className="bi bi-card-list list-icon"
                        onClick={() => setShowForm(!showForm)}
                    >
                    </i>
                ) : (
                    <i
                        className="bi bi-plus-square add-icon"
                        onClick={() => setShowForm(!showForm)}
                    >
                    </i>
                ) }
            </div>
            {showForm ? (
                <div className="dynamic-content-form">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-field">
                            <div className="label">Heading 1</div>
                            <input
                                className="form-input input"
                                type="text"
                                {
                                    ...register("heading1", 
                                    { 
                                        required: true,
                                    })
                                }
                            />
                            {errors?.heading1 && <p className="error-message">This is required.</p>}
                        </div>
                        <div className="form-field">
                            <div className="label">Heading 2</div>
                            <input
                                className="form-input input"
                                type="text"
                                {
                                    ...register("heading2", 
                                    { 
                                        required: true,
                                    })
                                }
                            />
                            {errors?.heading2 && <p className="error-message">This is required.</p>}
                        </div>
                        <div className="form-field">
                            <div className="label">Heading 3</div>
                            <input
                                className="form-input input"
                                type="text"
                                {
                                    ...register("heading3", 
                                    { 
                                        required: true,
                                    })
                                }
                            />
                            {errors?.heading3 && <p className="error-message">This is required.</p>}
                        </div>
                        <div className="form-field">
                            <div className="label">Paragraph content</div>
                            <input
                                className="form-input input"
                                type="text"
                                {
                                    ...register("paragraph", 
                                    { 
                                        required: true,
                                    })
                                }
                            />
                            {errors?.paragraph && <p className="error-message">This is required.</p>}
                        </div>

                        <div className="form-field">
                            <div className="label">Document Link</div>
                            <input
                                className="form-input input"
                                type="text"
                                {
                                    ...register("document_link", 
                                    { 
                                        required: true,
                                    })
                                }
                            />
                            {errors?.document_link && <p className="error-message">This is required.</p>}
                        </div>
                
                        <div className="text-center mt-4 mb-2">
                            {/* {addingContents ? (
                                <LoadingSpinner />
                            ) : ( */}
                                <button className="button-submit" type="submit">
                                    Submit
                                </button>
                            {/* )} */}
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
