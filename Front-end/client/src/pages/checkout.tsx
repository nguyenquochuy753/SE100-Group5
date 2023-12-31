import Layout from '@components/layout/layout';
import CheckoutCard from '@components/checkout/checkout-card';
import Container from '@components/ui/container';
import CheckoutDetails from '@components/checkout/checkout-details';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import Divider from '@components/ui/divider';
import Seo from '@components/seo/seo';
import {useState} from "react";
import {useCart} from "@contexts/cart/cart.context";

export default function CheckoutPage() {
    const [ngay, setNgay] = useState();
    const [gio, setGio] = useState();
    const [tenKhachHang, setTenKhachHang] = useState("");
    const [sdt, setSdt] = useState("");
    return (
        <>
            <Seo
                title="Checkout"
                description="Fastest E-commerce template built with React, NextJS, TypeScript, React-Query and Tailwind CSS."
                path="checkout"
            />
            <Container className="py-10 2xl:py-12 border-t border-skin-base checkout">
                <div className="flex xl:max-w-screen-xl mx-auto flex-col">
                    <div className="flex flex-col lg:grid lg:grid-cols-12 grid-cols-1 flex-wrap gap-8">
                        <div className="w-full col-start-1 col-end-9">
                            <CheckoutDetails setNgay={setNgay} setGio={setGio} setTenKhachHang={setTenKhachHang} setSdt={setSdt}/>
                        </div>
                        <div className="w-full mt-7 lg:mt-0 col-start-9 col-end-13">
                            <CheckoutCard ngay={ngay} gio={gio} tenKhachHang={tenKhachHang} sdt={sdt}/>
                        </div>
                    </div>
                </div>
            </Container>
            <Divider/>
        </>
    );
}

CheckoutPage.Layout = Layout;

export const getStaticProps = async ({locale}: any) => {
    return {
        props: {
            ...(await serverSideTranslations(locale, [
                'common',
                'forms',
                'menu',
                'footer',
            ])),
        },
    };
};
