import React, { useState } from "react";
// import { useSubscription } from "@apollo/client";
// import { GET_CONTENT } from "../../../../graphql";
import LoadingSpinner from "../../../../components/common/loadingspinner/LoadingSpinner";
import "../../css/admin.css";

export default function ContentList() {

    const [contents, setContents] = useState<any>([]);
    // const {
    //     data,
    //     error,
    //     loading,
    // } = useSubscription(GET_CONTENT, {
    //     variables: {
    //       where: {},
    //       limit: 50,
    //       order_by: {created_at: "desc" },
    //       offset: 0
    //     },
    //     onData: ({ data }) => {
    //       setContents(data?.data?.content);
    //     },
    //     onError(error: any) {
    //       console.log("Error while subscription>>>>", error);
    //     },
    // });
    

    // if (loading) {
    //     return (
    //         <div className="page-loading-spinner-style">
    //             <LoadingSpinner />
    //         </div>
    //     );
    // }

    // if (error) {
    //     return <p>Error: {error?.message || "Something went wrong."}</p>;
    // }

    if (!contents || contents?.length <= 0) {
        return <p>No Contents available.</p>;
    }
    
    if (contents && contents?.length > 0) {
        return (
            <div className="meetings-table">
                <div className="row">
                    <div className="col-2 meetings-content">
                        <b>Heading 1</b>
                    </div>
                    <div className="col-2 meetings-content">
                        <b>Heading 2</b>
                    </div>
                    <div className="col-2 meetings-content">
                        <b>Heading 3</b>
                    </div>
                    <div className="col-3 meetings-content">
                        <b>Paragraph</b>
                    </div>
                    <div className="col-3 meetings-content">
                        <b>Document</b>
                    </div>
                </div>
                {contents.map((content: any, index: any) => (
                    <div key={content?.id || index} className="row">
                        <div className="col-2 meetings-content">
                            {content?.heading1}
                        </div>
                        <div className="col-2 meetings-content">
                            {content?.heading2}
                        </div>
                        <div className="col-2 meetings-content">
                            {content?.heading3}
                        </div>
                        <div className="col-3 meetings-content">
                            {content?.paragraph}
                        </div>
                        <div className="col-3 meetings-content">
                            {content?.document_link}
                        </div>
                    </div>
                ))}
            </div>
        );
    }
    return null;
}
