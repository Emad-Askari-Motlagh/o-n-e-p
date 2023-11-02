import { useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { GET_MENU_CATREGORY } from "server/graphql/querys/querys.graphql";
import PrimaryLayout from "@/components/PrimaryLayout";
import styles from "./menu.module.scss";

import useUpload from "hooks/Uploader.hook";
import useAuth from "hooks/Auth.hook";
import {
  ADD_MENU_CATEGORY,
  UPDATE_CATEGORY,
} from "@/server/graphql/querys/mutations.graphql";
import {
  AddMenuCategoryMutation,
  AddMenuCategoryMutationVariables,
  MenuByCategoryQuery,
  MenuByCategoryQueryVariables,
} from "@/server/generated/graphql";
import { IoMdAddCircle } from "react-icons/io";
import Modall from "@/components/Modal";
import AddCategory from "@/components/AddCategory";
import AnimatedHeader from "@/components/AnimatedHeader";
import { MdOutlineRestaurantMenu } from "react-icons/md";
import dynamic from "next/dynamic";
import SimpleLoading from "@/components/SimpleLoading";
const CategoryEditor = dynamic(() => import("@/components/CategoryEditor"), {
  loading: () => <SimpleLoading />,
});
export default function MenuItems() {
  const { user } = useAuth();
  const [ChosenImage, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [updateCategory] = useMutation(UPDATE_CATEGORY);
  const [submited, setIsSubmited] = useState(false);

  const [addCategory, { data: addCategoryData }] = useMutation<
    AddMenuCategoryMutation,
    AddMenuCategoryMutationVariables
  >(ADD_MENU_CATEGORY, {
    refetchQueries: [
      { query: GET_MENU_CATREGORY }, // DocumentNode object parsed with gql

      "MenuByCategory", // Query name
    ],
    onCompleted: () => {
      setShowModal(false);

      setTimeout(() => {
        setIsSubmited(true);
      }, 1000);
    },
  });

  const { data: restaurantCategorysData, refetch } = useQuery<
    MenuByCategoryQuery,
    MenuByCategoryQueryVariables
  >(GET_MENU_CATREGORY, {
    variables: {
      restaurant: user.data?.CurrentUser?.restaurant.name as string,
    },
  });

  const { uploadImage, image } = useUpload(
    "https://api.cloudinary.com/v1_1/dug3htihd/image/upload"
  );

  return (
    <div className={styles.container}>
      <AnimatedHeader Logo={<MdOutlineRestaurantMenu />}>
        Restaurant`s Menu
      </AnimatedHeader>
      <div className={styles.add_button_parent}>
        <IoMdAddCircle
          className={styles.add_button}
          onClick={() => setShowModal(true)}
        />
        <Modall
          isModalOpen={showModal}
          setIsModalOpen={setShowModal}
          label="Add new category">
          <AddCategory
            restaurant={user.data?.CurrentUser?.restaurant.name as string}
            submit={addCategory}
            isAdded={addCategoryData ? true : false}
          />
        </Modall>
      </div>

      <div className={styles.parent}>
        {Array.isArray(restaurantCategorysData?.MenuByCategory) &&
          restaurantCategorysData?.MenuByCategory.map((res, i) => (
            <div key={res?._id} className={styles.category_parent}>
              <CategoryEditor
                onChangeImage={uploadImage}
                onChange={(e) =>
                  setCategory(
                    (e.target as typeof e.target & { value: any }).value
                  )
                }
                submited={submited}
                name={res?.collectionType as string}
                image={(ChosenImage ? ChosenImage : res?.image) as string}
                submit={(e) => {
                  e.preventDefault();
                  updateCategory({
                    variables: {
                      categoryId: res?._id,
                      category: category ?? res?.collectionType,
                      image: image ?? res?.image,
                    },
                    refetchQueries: [
                      { query: GET_MENU_CATREGORY },
                      "MenuByCategory",
                    ],
                  });
                }}
              />
            </div>
          ))}
      </div>
    </div>
  );
}
MenuItems.Layout = PrimaryLayout;
