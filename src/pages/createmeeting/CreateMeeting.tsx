import "./CreateMeeting.scss";
import React, { useState, useEffect, useRef } from "react";
import Datepicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-toastify/dist/ReactToastify.css";
import { Controller, useForm } from "react-hook-form";
import LoadingSpinner from "../../components/common/loadingspinner/LoadingSpinner";
import {
  convetToTimeStamp,
  getFormatedDate,
  getOneMonthFromToday,
  getToday,
  isObjIsEmpty,
  showToast,
} from "../../utils/utils";
import { sendEmail } from "../../services/EmailService";
import { MAX_IPAD_WIDTH } from "../../constants/constants";
import api from "../../api";

const CreateMeeting: React.FC<any> = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [contentLoading, setContentLoading] = useState<boolean>(false);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [ipadMaxWidth] = useState<number>(MAX_IPAD_WIDTH);
  const { register, handleSubmit, formState, control, reset } = useForm({});
  const { errors } = formState;
  const [scheduledTimings, setScheduledTimings] = useState<any>([]);
  const formElement = useRef<any>();
  const [formHeight, setFromHeight] = useState<number>(0);
  const [queryVariables, setQueryVariables] = useState<any>({
    today: convetToTimeStamp(new Date(getToday()), "today"),
    endDate: convetToTimeStamp(new Date(getOneMonthFromToday()), "month"),
  });
  const [selectedDate, setSelectedDate] = useState<any>(null);
  const [bookedTimeslots, setBookedTimeslots] = useState<any>([]);

  const [content, setContent] = useState<any>(null);
  const [meetingLinks, setMeetingLinks] = useState<any>([]);

  useEffect(() => {
    const getContentInfo = async () => {
      try {
        const result = await api.get("/content");
        setContentLoading(true);
        if (result.data.status === "success") {
          setContentLoading(false);
          let content = result?.data?.payload.reverse();
          setContent(content[0]);
        }
      } catch (error: any) {
        console.log("Content error", error);
      }
    };

    const getMeetingLinks = async () => {
      try {
        const result = await api.get("/meeting-link");
        if (result.data.status === "success") {
          setMeetingLinks(result?.data?.payload);
        }
      } catch (error: any) {
        console.log("Meeting links error", error);
      }
    };

    getContentInfo();
    getMeetingLinks();

    return () => {};
  }, []);

  const onSubmit = async (data: any) => {
    setLoading(true);
    let preferedDateAndTimeslots = [];
    if (data?.preferreddatetime1) {
      preferedDateAndTimeslots.push({
        date: new Date(data?.preferreddatetime1).toLocaleDateString(),
        time: new Date(data?.preferreddatetime1).toLocaleTimeString(),
      });
    }
    if (data?.preferreddatetime2) {
      preferedDateAndTimeslots.push({
        date: new Date(data?.preferreddatetime2).toLocaleDateString(),
        time: new Date(data?.preferreddatetime2).toLocaleTimeString(),
      });
    }
    if (data?.preferreddatetime3) {
      preferedDateAndTimeslots.push({
        date: new Date(data?.preferreddatetime3).toLocaleDateString(),
        time: new Date(data?.preferreddatetime3).toLocaleTimeString(),
      });
    }
    let payload = {
      name: data?.name,
      email: data?.email,
      company: data?.company,
      interested_areas: [data?.interestedarea1, data?.interestedarea2],
      type: data?.meetingtype,
      preferedDateAndTimeslots: preferedDateAndTimeslots,
    };

    try {
      const result = await api.post("/meeting-requested-user", payload);
      if (result.data.status === "success") {
        sendAdminNotificationEmail({
          isadminnotificationemail: true,
          name: data?.name || payload?.name,
          preferedDateAndTimeslots:
            preferedDateAndTimeslots || payload?.preferedDateAndTimeslots,
        });
      }
    } catch (error: any) {
      setLoading(false);
      console.log("Error while creating meeting", error);
    }
  };

  const sendAdminNotificationEmail = async (meetinginfo: any) => {
    try {
      const result: any = await sendEmail(meetinginfo);
      if (result?.data?.status === "success") {
        reset();
        setLoading(false);
        showToast("Notified to Brandsonmove.", true);
      } else {
        setLoading(false);
        showToast("Issue while creating meeting.", false);
      }
    } catch (error: any) {
      setLoading(false);
      showToast("Issue while creating meeting.", false);
      console.log("Error while sending notification");
    }
  };

  const [screenSize, setScreenSize] = useState<any>({
    dynamicWidth: window.innerWidth,
    dynamicHeight: window.innerHeight,
  });

  const setDimension = () => {
    setScreenSize({
      dynamicWidth: window.innerWidth,
      dynamicHeight: window.innerHeight,
    });
    const formheight = formElement?.current?.clientHeight;
    setFromHeight(formheight);
  };

  useEffect(() => {
    setSelectedDate(getToday());
    if (showForm && formHeight == 0) {
      setDimension();
    }
    if (!showForm) {
      setFromHeight(0);
    }
    window.addEventListener("resize", setDimension);
    if (selectedDate) {
      scheduledTimings.filter((scheduledTime: any) => {
        if (scheduledTime?.timeslot1) {
          if (
            scheduledTime?.timeslot1?.includes(
              getFormatedDate(new Date(getToday()))
            )
          ) {
            bookedTimeslots.push(new Date(scheduledTime?.timeslot1));
          }
        }
        if (scheduledTime?.timeslot2) {
          if (
            scheduledTime?.timeslot2?.includes(
              getFormatedDate(new Date(getToday()))
            )
          ) {
            bookedTimeslots.push(new Date(scheduledTime?.timeslot2));
          }
        }
        if (scheduledTime?.timeslot3) {
          if (
            scheduledTime?.timeslot3?.includes(
              getFormatedDate(new Date(getToday()))
            )
          ) {
            bookedTimeslots.push(new Date(scheduledTime?.timeslot3));
          }
        }
      });
    }

    return () => {
      window.removeEventListener("resize", setDimension);
    };
  }, [screenSize, formHeight, showForm]);

  const createMeetingForm = () => {
    return (
      <div ref={formElement} className="form-container">
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <div className="form-field">
            <div className="label">Email Id (No personal ID, please)</div>
            <input
              className="form-input input"
              type="email"
              {...register("email", {
                required: true,
                // pattern: /^([\w-.]+@(?!gmail\.com)(?!yahoo\.com)(?!hotmail\.com)(?!mail\.ru)(?!yandex\.ru)(?!mail\.com)([\w-]+.)+[\w-]{2,4})?$/
              })}
            />
            {errors.email && <p className="error-message">This is required.</p>}
          </div>

          <div className="form-field">
            <div className="label">Name</div>
            <input
              className="form-input input"
              type="text"
              {...register("name", { required: true, maxLength: 20 })}
            />
            {errors.name && <p className="error-message">This is required.</p>}
          </div>

          <div className="form-field">
            <div className="label">Company</div>
            <input
              className="form-input input"
              type="text"
              {...register("company", { required: true, maxLength: 20 })}
            />
            {errors.company && (
              <p className="error-message">This is required.</p>
            )}
          </div>

          <div>
            <div className="label">Interested Area (s)</div>
            <div className="interested-area-field-container">
              <input
                className="interested-area-field input"
                type="text"
                placeholder="1. "
                {...register("interestedarea1", {
                  required: true,
                  maxLength: 50,
                })}
              />
              <input
                className="interested-area-field input"
                type="text"
                placeholder="2. "
                {...register("interestedarea2", {
                  required: true,
                  maxLength: 50,
                })}
              />
            </div>
            {(errors.interestedarea1 || errors.interestedarea2) && (
              <p className="error-message">This is required.</p>
            )}
          </div>

          <div>
            <div className="form-field meeting-type-container">
              <div className="meeting-type-item">
                <input
                  className="meeting-type-radio-button"
                  type="radio"
                  value={"googlemeet"}
                  {...register("meetingtype", {
                    required: true,
                    maxLength: 50,
                  })}
                />
                <span className="meeting-type-label">Google Meet</span>
              </div>

              <div className="meeting-type-item disabled">
                <input
                  className="meeting-type-radio-button"
                  type="radio"
                  value={"msteams"}
                  {...register("meetingtype", {
                    required: true,
                    maxLength: 50,
                  })}
                  disabled
                />
                <span className="meeting-type-label">MS Team</span>
              </div>

              <div className="meeting-type-item disabled">
                <input
                  className="meeting-type-radio-button"
                  type="radio"
                  value={"zoom"}
                  {...register("meetingtype", {
                    required: true,
                    maxLength: 50,
                  })}
                  disabled
                />
                <span className="meeting-type-label">Zoom</span>
              </div>
            </div>
            {errors.meetingtype && (
              <p className="error-message">This is required.</p>
            )}
          </div>

          <div className="prefered-date-time-container">
            <div className="label">Preferred Date (s), Time Slot(s)</div>
            <div className="time-slots-picker-item">
              <span className="time-slot-label">Slot 1</span>
              <Controller
                render={({ field }) => {
                  return (
                    <Datepicker
                      peekNextMonth
                      showMonthDropdown
                      showYearDropdown
                      showTimeSelect
                      minDate={getToday()}
                      maxDate={getOneMonthFromToday()}
                      excludeTimes={bookedTimeslots}
                      dropdownMode="select"
                      placeholderText="Select date"
                      onChange={(date) => {
                        setQueryVariables({
                          today: new Date(),
                          selectedDate: date,
                        });
                        field.onChange(date);
                      }}
                      selected={field.value}
                      dateFormat="MMMM d, yyyy h:mm aa"
                    />
                  );
                }}
                control={control}
                name="preferreddatetime1"
                rules={{
                  required: {
                    value: true,
                    message: "This is required.",
                  },
                }}
              />
            </div>

            <div className="time-slots-picker-item">
              <span className="time-slot-label">Slot 2</span>
              <Controller
                render={({ field }) => {
                  return (
                    <Datepicker
                      peekNextMonth
                      showMonthDropdown
                      showYearDropdown
                      showTimeSelect
                      minDate={getToday()}
                      maxDate={getOneMonthFromToday()}
                      dropdownMode="select"
                      placeholderText="Select date"
                      onChange={(date) => field.onChange(date)}
                      selected={field.value}
                      dateFormat="MMMM d, yyyy h:mm aa"
                    />
                  );
                }}
                control={control}
                name="preferreddatetime2"
                rules={{
                  required: {
                    value: false,
                    message: "This is required.",
                  },
                }}
              />
            </div>

            <div className="time-slots-picker-item">
              <span className="time-slot-label">Slot 3</span>
              <Controller
                render={({ field }) => {
                  return (
                    <Datepicker
                      peekNextMonth
                      showMonthDropdown
                      showYearDropdown
                      showTimeSelect
                      minDate={getToday()}
                      maxDate={getOneMonthFromToday()}
                      dropdownMode="select"
                      placeholderText="Select date"
                      onChange={(date) => field.onChange(date)}
                      selected={field.value}
                      dateFormat="MMMM d, yyyy h:mm aa"
                    />
                  );
                }}
                control={control}
                name="preferreddatetime3"
                rules={{
                  required: {
                    value: false,
                    message: "This is required.",
                  },
                }}
              />
            </div>
            {(errors.preferreddatetime1 ||
              errors?.preferreddatetime2 ||
              errors?.preferreddatetime3) && (
              <p className="error-message">Atlease one time slot required (Slot 1 is mandatory).</p>
            )}
          </div>
          <div className="text-center mt-2 mb-2">
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
    );
  };

  return (
    <div className="Create-meeting-page-container">
      {contentLoading ? (
        <div className="text-center">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="title-paragraph-button-container">
          <div
            className={`${
              showForm && screenSize?.dynamicWidth >= ipadMaxWidth
                ? "content-desktop-design"
                : ""
            }`}
          >
            <div className="title">
              <h2 className="title-h2">{content?.heading1}</h2>
              <h3 className="title-h3">{content?.heading2}</h3>
              <h2 className="title-h2">{content?.heading3}</h2>
            </div>
            <div className="content">
              <p>{content?.paragraph_content}</p>
            </div>
            <button
              className="get-full-report"
              onClick={() => setShowForm(!showForm)}
            >
              Get the full report
            </button>
          </div>
        </div>
      )}
      {showForm && (
        <div
          className={`${
            screenSize?.dynamicWidth < ipadMaxWidth
              ? "form-mobile-design"
              : "form-desktop-design"
          }`}
        >
          {createMeetingForm()}
        </div>
      )}
      <div
        className={`paragraph-container
          ${
            isObjIsEmpty(errors) &&
            showForm &&
            screenSize?.dynamicWidth > 819 &&
            screenSize?.dynamicWidth <= 920
              ? "class1"
              : ""
          }
          ${
            !isObjIsEmpty(errors) &&
            showForm &&
            screenSize?.dynamicWidth > 819 &&
            screenSize?.dynamicWidth <= 920
              ? "class1-1"
              : ""
          }

          ${
            isObjIsEmpty(errors) &&
            showForm &&
            screenSize?.dynamicWidth >= 921 &&
            screenSize?.dynamicWidth <= 1200
              ? "class2"
              : ""
          }
          ${
            !isObjIsEmpty(errors) &&
            showForm &&
            screenSize?.dynamicWidth > 921 &&
            screenSize?.dynamicWidth <= 1200
              ? "class2-2"
              : ""
          }

          ${
            isObjIsEmpty(errors) && showForm && screenSize?.dynamicWidth >= 1021
              ? "class3"
              : ""
          }
          ${
            !isObjIsEmpty(errors) && showForm && screenSize?.dynamicWidth > 1021
              ? "class3-3"
              : ""
          }

        `}
      >
        <div
          className={`${
            showForm && screenSize?.dynamicWidth >= ipadMaxWidth
              ? "content-desktop-design"
              : ""
          }`}
        >
          <p id="get-report-text" className="get-report-text no-select">
            At brandsonmove, we script novel plans for thriving in diverse
            markets. Forging best-in-class analytics on data from digital and
            physical touchpoints, we harvest brand experience for robust
            insights in upbeat customer attitudes and key purchase drivers. Our
            stirring revelations on customer segments and buying behavior come
            complete with category dominating strategies gleaned from decades of
            real brand building. The class of our work is present in many
            challenges where we powered our partner brands lift their goals
            remarkably, opened pathways to future and made real progress in
            customer bonding.
          </p>
        </div>
      </div>
    </div>
  );
};
export default CreateMeeting;
