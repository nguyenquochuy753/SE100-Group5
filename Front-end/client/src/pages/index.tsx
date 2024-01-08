import Layout from '@components/layout/layout-two';
import Container from '@components/ui/container';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import DownloadApps from '@components/common/download-apps';
import BundleGrid from '@components/bundle/bundle-grid';
import CollectionGrid from '@components/common/collection-grid';
import HeroBannerCard from '@components/hero/hero-banner-card';
import BestSellerGroceryProductFeed from '@components/product/feeds/best-seller-grocery-product-feed';
import PopularProductFeed from '@components/product/feeds/popular-product-feed';
import CategoryGridBlock from '@components/common/category-grid-block';
import { homeSixHeroBanner as heroBanner } from '@framework/static/banner';
import { homeSixBanner as banner } from '@framework/static/banner';
import BannerCard from '@components/cards/banner-card';
import { bundleDataTwo as bundle } from '@framework/static/bundle';
import { GetStaticProps } from 'next';
import Seo from '@components/seo/seo';
import { QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { fetchCategories } from '@framework/category/get-all-categories';
import { fetchBestSellerGroceryProducts } from '@framework/product/get-all-best-seller-grocery-products';
import { fetchPopularProducts } from '@framework/product/get-all-popular-products';
import { LIMITS } from '@framework/utils/limits';
import axios from 'axios';

export default function Home({ meals }) {
  console.log('MEAL', meals);
  meals = meals.slice(0, 14);

  return (
    <>
      <Seo
        title="Grocery & Food Store React Template"
        description="Fastest E-commerce template built with React, NextJS, TypeScript, React-Query and Tailwind CSS."
        path="/"
      />
      <HeroBannerCard
        banner={heroBanner}
        className="hero-banner-six min-h-[400px] md:min-h-[460px] lg:min-h-[500px] xl:min-h-[650px] py-20 py:pt-24 mb-5 2xl:bg-center"
      />
      <Container>
        <BundleGrid
          className="mb-12 lg:mb-14 xl:mb-16 2xl:mb-20"
          data={bundle}
        />
        <CategoryGridBlock />
        <BestSellerGroceryProductFeed meals={meals} />
        <BannerCard
          banner={banner}
          className="mb-12 lg:mb-14 xl:pb-3"
          effectActive={false}
        />
        <PopularProductFeed meals={meals} />
      </Container>
      <CollectionGrid
        headingPosition="center"
        className="xl:pt-2 2xl:pt-4 3xl:pt-6 pb-1 lg:pb-0 mb-12 lg:mb-14 xl:mb-16 2xl:mb-20"
      />
      <DownloadApps />
    </>
  );
}

Home.Layout = Layout;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(
    [API_ENDPOINTS.CATEGORIES, { limit: LIMITS.CATEGORIES_LIMITS }],
    fetchCategories
  );
  await queryClient.prefetchQuery(
    [
      API_ENDPOINTS.BEST_SELLER_GROCERY_PRODUCTS,
      { limit: LIMITS.BEST_SELLER_GROCERY_PRODUCTS_LIMITS },
    ],
    fetchBestSellerGroceryProducts
  );
  await queryClient.prefetchQuery(
    [API_ENDPOINTS.POPULAR_PRODUCTS, { limit: LIMITS.POPULAR_PRODUCTS_LIMITS }],
    fetchPopularProducts
  );

  const res = await axios.get(`http://localhost:8000/v1/meal/getAllMeals`);
  const meals = res.data;
  const mealTranfer = meals.map((meal) => ({
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
    revalidate: 60,
  };
};
