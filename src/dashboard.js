//import { Route, Router, Routes } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
//import Navbar from "./InsuranceUI/navbar";
import AddPolicy from "./EmployeeUI/addPolicy";
import EMPHome from "./EmployeeUI/employeeHome";
import EmpLoginPage from "./EmployeeUI/employeeLogin";
import InsuranceDashboard from "./EmployeeUI/medicalHome";
import ModifyEmployee from "./EmployeeUI/modifyEmployee";
import PersonalPlan from "./EmployeeUI/personalPlan";
import RenewPolicy from "./EmployeeUI/renewPolicy";
import HospitalTable from "./EmployeeUI/searchHospitals";
import AddHospital from "./InsuranceUI/addHopital";
import AddPolicyType from "./InsuranceUI/addPolicy";
import ILoginPage from "./InsuranceUI/employeeLogin";
import InsuranceHome from "./InsuranceUI/insuranceHome";
import ModifyPolicy from "./InsuranceUI/modifyPolicy";
import ModifyHospital from "./InsuranceUI/modifyHospital";
import ClientFormsApproveCancel from "./InsuranceUI/examineRequest";
import MyTable from "./InsuranceUI/exmp";
import CheckStatus from "./EmployeeUI/checkStatus";
import HrHome from "./HRUi/hrHome";
import SetPolicy from "./HRUi/setpolicy";
import EmpList from "./HRUi/employeeList";
import HealthInsuranceCard from "./EmployeeUI/ecard";
import EmployeeForm from "./EmployeeUI/policyRegistration";
import ChatRoom from "./components/ChatRoom";
import HREmpHome from "./HRUi/employeeHome";
import EChat from "./EmployeeUI/echat";
import HRChat from "./HRUi/hrchat";
import IChat from "./InsuranceUI/ichat";

export default function AppDashboard() {
        return (
        <div>
            <Router>
                 {/* <Navbar /> */}
                  <Routes>
                     
                     <Route path='/eHome' element={<EMPHome/>} />
                     <Route path='/' element={<EmpLoginPage/>} />
                     <Route path='/add' element={<AddPolicy/>} />
                     <Route path='/medicalBenefits' element={<InsuranceDashboard/>} />
                     <Route path='/editDetail' element={<ModifyEmployee/>} />
                     <Route path='/personalPlan' element={<PersonalPlan/>} />
                     <Route path='/renewPolicy' element={<RenewPolicy/>} />
                     <Route path='/hospitalList' element={<HospitalTable/>} />
                     <Route path='/checkStatus' element={<CheckStatus/>} />
                     <Route path='/ecard' element={<HealthInsuranceCard/>} />
                     <Route path='/policyRegistration' element={<EmployeeForm/>} />
                     <Route path='/echat' element={<EChat/>} />


                     <Route path='/addHospital' element={<AddHospital/>} />
                     <Route path='/addPolicyType' element={<AddPolicyType/>} />
                     <Route path='/modifyHospital' element={<ModifyHospital/>} />
                     <Route path='/modifyPolicyType' element={<ModifyPolicy/>} />
                     <Route path='/iLogin' element={<ILoginPage/>} />
                     <Route path='/iHome' element={<InsuranceHome/>} />
                     <Route path='/examinelist' element={<ClientFormsApproveCancel/>} />
                     <Route path='/ichat' element={<IChat/>} />
                     
                     {/* <Route path='/temp' element={<MyTable/>} /> */}
                     
                     <Route path='/hhome' element={<HrHome/>} />
                     <Route path='/emplist' element={<EmpList/>} />
                     <Route path='/setPolicy' element={<SetPolicy/>} />
                     <Route path='/hredashboard' element={<HREmpHome/>} />
                     <Route path='/hrchat' element={<HRChat/>} />

                     </Routes>
                     </Router>
                     </div>
        )
}