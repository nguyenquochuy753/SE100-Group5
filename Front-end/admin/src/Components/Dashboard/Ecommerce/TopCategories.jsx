import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Image, UL, LI, H6 } from "../../../AbstractElements";
import axios from "axios";
import { generatePublicUrl } from "../../../urlConfig";

const TopCategories = () => {
  const TopCategoriesData = [
    {
      image: "1.png",
      title: "Food & Drinks",
      subTitle: "12,200",
    },
    {
      image: "2.png",
      title: "Furniture",
      subTitle: "7,510",
    },
    {
      image: "3.png",
      title: "Grocery",
      subTitle: "15,475",
    },
    {
      image: "4.png",
      title: "Electronics",
      subTitle: "27,840",
    },
    {
      image: "5.png",
      title: "Toys & Games",
      subTitle: "8,788",
    },
    {
      image: "6.png",
      title: "Desktop",
      subTitle: "10,673",
    },
    {
      image: "7.png",
      title: "Mobile & Accessories",
      subTitle: "5,129",
    },
  ];
  const [top10Meals, setTop10Meals] = useState();
  const fetchTop10Meals = async () => {
    const data = await axios("http://localhost:8000/v1/meal/getTop10Meals");
    console.log(data.data);
    const tranformData = data.data.map((d) => ({
      image: d.hinh_anh_mon_an,
      title: d.ten_mon_an,
      subTitle: d.so_lan_dat_mon,
    }));
    setTop10Meals(tranformData);
  };
  useEffect(() => {
    fetchTop10Meals();
  }, []);
  return (
    <UL attrUL={{ className: "categories-list d-flex" }}>
      {top10Meals?.map((item, i) => (
        <LI key={i} attrLI={{ className: "d-flex" }}>
          <div className="bg-light">
            <Image
              attrImage={{
                className: "m-0",
                src: generatePublicUrl(item.image),
                alt: "vector burger",
              }}
            />
          </div>
          <div>
            <H6 attrH6={{ className: "mb-0" }}>
              <Link to={`${process.env.PUBLIC_URL}/product`}>{item.title}</Link>
            </H6>
            <span className="f-light f-12 f-w-500">({item.subTitle})</span>
          </div>
        </LI>
      ))}
    </UL>
  );
};

export default TopCategories;
