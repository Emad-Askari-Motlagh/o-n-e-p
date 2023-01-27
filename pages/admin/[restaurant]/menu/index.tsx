import { useMutation, useQuery } from "@apollo/client";
import React, { ChangeEvent, useEffect, useState } from "react";
import {
  GET_MENU_CATREGORY,
  GET_MENU_ITEM_BY_CATREGORY,
} from "server/graphql/querys/querys.graphql";
import PrimaryLayout from "components/Primary-layout";
import styles from "./menu.module.scss";
import CategoryEditor from "@/components/CategoryEditor";
import useUpload from "hooks/upload.hook";
import { useAuth, useProvideAuth } from "hooks/Context.hook";
import {
  ADD_MENU_CATEGORY,
  ADD_MENU_ITEM,
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

export default function MenuItems() {
  const { user } = useProvideAuth();
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
      <h2>Restaurant Menu</h2>
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
