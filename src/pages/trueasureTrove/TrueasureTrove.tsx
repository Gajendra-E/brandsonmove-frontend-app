import "./TrueasureTrove.scss";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GROUPS, USECASESANDSTORIES } from "../../constants/constants";

export default function TrueasureTrove() {
  const [groups] = useState<any>(GROUPS);
  const [usecaseAndStories] = useState<any>(USECASESANDSTORIES);

  return (
    <div>
      <div className="trueasure-page-container">
        <h1 className="trueasure-title text-uppercase text-center py-4">
          Walk through use cases and stories from our partner brands…
        </h1>
        <p className="trueasure-content pb-3">
          No matter what competition may throw in the market, together with our
          partner brands we open new pathways to bond with customers stronger
          than ever and increase their basket size. The mark of our work keeps
          our partner brands staying ahead of the curve in times of rapid
          paradigm changes. Walk in or ride a trip to know how.
        </p>

        <div className="row py-4 m-0 mb-4">
          <div className="col-3 left d-flex justify-content-center align-items-center">
            <h1>
              STORIED RESULTS
              <br />
              FROM CATEGORIES
            </h1>
          </div>
          <div className="col-9 right">
            <div className="categories t-grid-container">
              {usecaseAndStories.map((usecase: any, index: any) => (
                <div
                  key={usecase?.id || index}
                  className="d-flex flex-column align-items-center text-center p-3"
                >
                  <img src={usecase?.icon} alt="" />
                  <Link to="">
                    <span>{usecase?.word1}</span> <br />
                    {usecase?.word1 && <span>{usecase?.word2}</span>}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="trueasure-container-2">
        <h1 className="text-center pb-3">
          Walk into a group to share a challenge or to contribute your views on
          way forward…
        </h1>
        <div className="other-links t-grid-container-2">
          {groups.map((group: any, index: any) => (
            <div
              key={group?.id || index}
              className="w-18 d-flex align-items-center justify-content-center position-relative growth-items"
            >
              <img src={group?.imageurl2} alt="" />

              <div className="w-100 text-center position-absolute trueasure-link">
                <Link
                  to=""
                  className="d-flex align-items-center justify-content-center flex-column"
                >
                  <img
                    className="usecase-image"
                    src={group?.imageurl3}
                    alt=""
                  />
                  <span style={{ color: `${group?.color}` }}>
                    {group?.word1}
                  </span>{" "}
                  <br />
                  {group?.word1 && (
                    <span style={{ color: `${group?.color}` }}>
                      {group?.word2}
                    </span>
                  )}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
