import Container from '@components/ui/container';
import Layout from '@components/layout/layout';
import { ShopFilters } from '@components/search/filters';
import { ProductGrid } from '@components/product/product-grid';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import DownloadApps from '@components/common/download-apps';
import { GetStaticProps } from 'next';
import { Element } from 'react-scroll';
import SearchTopBar from '@components/search/search-top-bar';
import Divider from '@components/ui/divider';
import Seo from '@components/seo/seo';
import { QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { fetchCategories } from '@framework/category/get-all-categories';
import { fetchProducts } from '@framework/product/get-all-products';
import { LIMITS } from '@framework/utils/limits';
import axios from 'axios';

export default function Search({ meals }) {
  return (
    <>
      <Seo
        title="Search"
        description="Fastest E-commerce template built with React, NextJS, TypeScript, React-Query and Tailwind CSS."
        path="search"
      />
      <Divider />
      <Container>
        <Element name="grid" className="flex pt-7 lg:pt-11 pb-16 lg:pb-20">
          <div className="flex-shrink-0 pe-8 xl:pe-16 hidden lg:block w-80 xl:w-96 sticky top-16 h-full">
            <ShopFilters />
          </div>
          <div className="w-full lg:-ms-2 xl:-ms-8 lg:-mt-1">
            <SearchTopBar count={meals.length} />
            <ProductGrid meals={meals} />
          </div>
        </Element>
      </Container>
      <DownloadApps />
    </>
  );
}

Search.Layout = Layout;

export const getServerSideProps: GetStaticProps = async ({ locale, query }) => {
  const queryClient = new QueryClient();
  console.log(query);

  await queryClient.prefetchQuery(
    [API_ENDPOINTS.CATEGORIES, { limit: LIMITS.CATEGORIES_LIMITS }],
    fetchCategories
  );
  await queryClient.prefetchInfiniteQuery(
    [API_ENDPOINTS.PRODUCTS, { limit: LIMITS.PRODUCTS_LIMITS }],
    fetchProducts
  );
  const res = await axios.get(`http://localhost:8000/v1/meal/getAllMeals`);
  const meals = res.data;
  const mealTranfer = meals
    .filter((meal) => {
      if (query.category !== undefined && query.category !== '') {
        console.log(query.category);
        return meal.ma_danh_muc.name === query.category;
      } else {
        return true;
      }
    })
    .sort((a, b) => {
      if (query.sort_by !== undefined && query.sort_by === 'highest-price') {
        return b.gia - a.gia;
      } else if (
        query.sort_by !== undefined &&
        query.sort_by === 'lowest-price'
      ) {
        return a.gia - b.gia;
      } else if (
        query.sort_by !== undefined &&
        query.sort_by === 'new-arrival'
      ) {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else {
        return true;
      }
    })
    .map((meal) => ({
      id: meal._id,
      name: meal.ten_mon_an,
      slug: 'fresh-green-leaf-lettuce',
      description:
        "Vegetables are parts of plants that are consumed by humans or other animals as food. the first meaning remains commonly used and is applied to plants collectively to ask all edible plant matter, including the flowers, fruits, stems, leaves, roots, and seeds. An alternate definition of the term is applied somewhat arbitrarily, often by culinary and cultural tradition. it's going to exclude foods derived from some plants that are fruits, flowers, nuts, and cereal grains, but include savoury fruits like tomatoes and courgettes, flowers like broccoli, and seeds like pulses.",
      image: {
        id: 1,
        thumbnail: `http://localhost:8000/${meal.hinh_anh_mon_an}`,
        original: `http://localhost:8000/${meal.hinh_anh_mon_an}`,
      },
      gallery: [
        {
          id: 1,
          thumbnail: `http://localhost:8000/${meal.hinh_anh_mon_an}`,
          original: `http://localhost:8000/${meal.hinh_anh_mon_an}`,
        },
      ],
      quantity: 70,
      price: meal.gia,
      sale_price: 0,
      unit: '1 phần',
      tag: [
        {
          id: 1,
          name: meal.ma_danh_muc.name,
          slug: meal.ma_danh_muc._id,
        },
      ],
    }));
  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
      ...(await serverSideTranslations(locale!, [
        'common',
        'forms',
        'menu',
        'footer',
      ])),
      meals: JSON.parse(JSON.stringify(mealTranfer)),
    },
  };
};
