import "../../css/admin.css";
import React, { useEffect, useState } from "react";
import { showToast } from "../../../../utils/utils";
import api from "../../../../api";

export default function ContentList() {

    const [contents, setContents] = useState<any>([]);

    useEffect(() => {
        const getContentInfo = async () => {
            const result = await api.get('/content');
            if(result.data.status==="success"){
                setContents(result?.data?.payload);
            }
        };
        getContentInfo();
    }, []);

    const performAction = (actiontype: any, content: any) => {
        if(actiontype == "delete") {
            if(contents && contents?.length <= 1) {
                showToast("Error, Add new content before deleting this", false);
            } else {
                // deleteAdmin({
                //     variables: {
                //         id: admin?.id
                //     }
                // }).then((result: any) => {
                //     showToast("Deleted successfully.", true);
                // }).catch((error: any) => {
                //     showToast("Unable to delete user.", false);
                // });
            }
        }
    }


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
                    <div className="col-2 meetings-content">
                        <b>Document</b>
                    </div>
                    <div className="col-1 meetings-content">
                        <b>options</b>
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
                            {content?.paragraph_content}
                        </div>
                        <div className="col-2 meetings-content">
                            {content?.document_link}
                        </div>
                        <div className="col-1 meetings-content">
                            <i className="bi bi-trash3 icon-delete"
                                onClick={() => performAction("delete", content)}
                            >   
                            </i>
                            </div>
                    </div>
                ))}
            </div>
        );
    }
    return null;
}
