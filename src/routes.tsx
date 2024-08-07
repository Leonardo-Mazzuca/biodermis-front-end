
import {  Route, Routes } from "react-router-dom";
import { CATEGORIES, CONSULTORS, DEFAULT_PATH, MERCADO_PAGO_SUCCESS, FORGOT_PASS_1, FORGOT_PASS_2, HOME, INVOICING, PRODUCTS, REGISTER_CONSULTOR, REGISTER_PRODUCTS, REQUESTS, USERS, WITHDRAWAL, FORBIDDEN, MERCADO_PAGO_FAILURE, BANNERS } from "./constants/paths/paths";
import { HomeTemplate } from "./templates/Home";
import { RequestsTemplate } from "./templates/Requests";
import { ConsultorsTemplate } from "./templates/Consultors";
import { UsersTemplate } from "./templates/Users";
import { ProductsTemplate } from "./templates/Products";
import { WithdrawalRequestsTemplate } from "./templates/WithdrawalRequests";
import { InvoicingTemplate } from "./templates/Invoicing";
import { RegisterConsultorTemplate } from "./templates/Register/RegisterConsultor";
import { RegisterProductsTemplate } from "./templates/Register/RegisterProducts";
import { Login } from "./components/Auth/Login";
import { ForgotPassStep1 } from "./components/Auth/ForgotPass/Step1";
import { ForgotPassStep2 } from "./components/Auth/ForgotPass/Step2";
import { CategoriesTemplate } from "./templates/Categories";
import { MercardoPagoSuccess } from "./components/Requests/MercadoPago/Success";
import { NotFoundPage } from "./components/NotFound";
import { ForbiddenPage } from "./components/Forbidden";
import { MercardoPagoFailure } from "./components/Requests/MercadoPago/Failure";
import { BannersTemplate } from "./templates/Banners";


export const AppRoutes = () => {



    return (

  
            <Routes>

                <Route path={DEFAULT_PATH} element={<Login />} />
                <Route path={"*"} element={<NotFoundPage />} />
                
            
                <Route path={FORGOT_PASS_1} element={<ForgotPassStep1 />} />
                <Route path={FORGOT_PASS_2} element={<ForgotPassStep2 />} />

                <Route path={HOME} element={<HomeTemplate />} />
                <Route path={REQUESTS} element={<RequestsTemplate />} />

                <Route path={CONSULTORS} element={<ConsultorsTemplate />} />
                <Route path={REGISTER_CONSULTOR} element={<RegisterConsultorTemplate />} />

                <Route path={USERS} element={<UsersTemplate />} />

                <Route path={PRODUCTS} element={<ProductsTemplate />} />
                <Route path={REGISTER_PRODUCTS} element={<RegisterProductsTemplate />} />

                <Route path={CATEGORIES} element={<CategoriesTemplate />} />

                <Route path={WITHDRAWAL} element={<WithdrawalRequestsTemplate />} />
                <Route path={INVOICING} element={<InvoicingTemplate />} />

                <Route path={MERCADO_PAGO_SUCCESS} element={<MercardoPagoSuccess />} />
                <Route path={MERCADO_PAGO_FAILURE} element={<MercardoPagoFailure />} />
                <Route path={BANNERS} element={<BannersTemplate />} />
                <Route path={FORBIDDEN} element={<ForbiddenPage />} />

            </Routes>

    );


}
