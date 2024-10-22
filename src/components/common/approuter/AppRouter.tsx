import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../../../pages/home/HomePage";
import CustomerBrandsInsights from "../../../pages/customerbrandsinsights/CustomerBrandsInsights";
import CreateMeeting from "../../../pages/createmeeting/CreateMeeting";
import AdminLogin from "../../../pages/admincontents/login/AdminLogin";
import ManageAdmin from "../../../pages/admincontents/manageadmin/ManageAdmin";
import ManageContactInfo from "../../../pages/admincontents/managecontactinfo/ManageContactInfo";
import ManageContents from "../../../pages/admincontents/managecontents/ManageContents";
import ManageMeetingLinks from "../../../pages/admincontents/managemeetinglinks/ManageMeetingLinks";
import ManageMeetings from "../../../pages/admincontents/managemeetings/ManageMeetings";
import SyndicateRoom from "../../../pages/admincontents/syndicateroom/SyndicateRoom";
import SalesConsumptionAnalytics from "../../../pages/salesconsumptionanalytics/SalesConsumptionAnalytics";
import TrueasureTrove from "../../../pages/trueasureTrove/TrueasureTrove";
import Growth from "../../../pages/trueasureTrove/growth/Growth";
import Promotion from "../../../pages/trueasureTrove/promotion/Promotion";
import CustomerExperience from "../../../pages/trueasureTrove/customerExperience/CustomerExperience";
import ReadyBrandLaunch from "../../../pages/trueasureTrove/readyBrandLaunch/ReadyBrandLaunch";
import TrendForecast from "../../../pages/trueasureTrove/trendForecast/TrendForecast";


const AppRouter = ({ resetSlider }: { resetSlider: boolean }) => {
  useEffect(() => {}, []);

  return (
    <Routes>
      <Route path="/" element={true ? <HomePage /> : <HomePage />} />

      <Route path="/createmeeting" element={<CreateMeeting />} />

      <Route path="/createmeeting" element={<CreateMeeting />} />
      <Route path="/trueasuretrove" element={<TrueasureTrove />} />
      <Route
        path="/customerbrandsinsights"
        element={<CustomerBrandsInsights resetSlider={resetSlider}/>}
      />
      <Route
        path="/salesconsumptionanalytics"
        element={<SalesConsumptionAnalytics resetSlider={resetSlider}/>}
      />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/managemeetings" element={<ManageMeetings />} />
      <Route path="/admin/managecontents" element={<ManageContents />} />
      <Route
        path="/admin/managemeetinglinks"
        element={<ManageMeetingLinks />}
      />
      <Route path="/admin/manageadmin" element={<ManageAdmin />} />
      <Route path="/admin/syndicateroom" element={<SyndicateRoom />} />
      <Route path="/admin/managecontactinfo" element={<ManageContactInfo />} />

      <Route path="/trueasuretrove/growth" element={ <Growth/> } />
      <Route path="/trueasuretrove/promotion" element={ <Promotion/> } />
      <Route path="/trueasuretrove/customer_experience" element={ <CustomerExperience/> } />
      <Route path="/trueasuretrove/ready_brand_launch" element={ <ReadyBrandLaunch/> } />
      <Route path="/trueasuretrove/trend_forecast" element={ <TrendForecast/> } />

    </Routes>
  );
};

export default AppRouter;