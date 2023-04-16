import { Header } from "../../components/Header/header-index";
import { DefaultLayoutContainer } from "./default-layout-styles";
import {Outlet} from 'react-router-dom'


export function DefaultLayout() {
    return (
        <DefaultLayoutContainer>
            <Header />
            <Outlet />
            
        </DefaultLayoutContainer>
    )
}