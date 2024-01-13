import Container from '@components/ui/container';
import Layout from '@components/layout/layout';
import OrderInformation from '@components/order/order-information';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSideProps } from 'next';

import Divider from '@components/ui/divider';
import { useEffect } from 'react';
import { useCart } from '@contexts/cart/cart.context';
import Seo from '@components/seo/seo';
import axios from 'axios';

export default function Order({ order }) {
  const { resetCart } = useCart();
  useEffect(() => {
    resetCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Seo
        title="Order"
        description="Fastest E-commerce template built with React, NextJS, TypeScript, React-Query and Tailwind CSS."
        path="complete-order"
      />
      <Divider />
      <Container>
        <OrderInformation order={order} />
      </Container>
      <Divider />
    </>
  );
}

Order.Layout = Layout;

export const getServerSideProps: GetServerSideProps = async ({
  locale,
  query,
}) => {
  const id = query.id;
  const res = await axios.get(
    `http://localhost:8000/v1/reserving/getReservingById/${id}`
  );
  const order = res.data;
  return {
    props: {
      ...(await serverSideTranslations(locale!, [
        'common',
        'forms',
        'menu',
        'footer',
      ])),
      order: JSON.parse(JSON.stringify(order)),
    },
  };
};
