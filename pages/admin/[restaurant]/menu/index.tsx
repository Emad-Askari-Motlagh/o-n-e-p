import { useMutation, useQuery } from "@apollo/client";
import React, { ChangeEvent, useEffect, useState } from "react";
import { GET_MENU_CATREGORY } from "server/graphql/querys/querys.graphql";
import PrimaryLayout from "components/Primary-layout";
import styles from "./menu.module.scss";
import CategoryEditor from "@/components/CategoryEditor";
import useUpload from "hooks/upload.hook";
import { useAuth, useProvideAuth } from "hooks/Context.hook";
import { UPDATE_CATEGORY } from "@/server/graphql/querys/mutations.graphql";
import {
  MenuByCategoryQuery,
  MenuByCategoryQueryVariables,
} from "@/server/generated/graphql";
import { IoMdAddCircle } from "react-icons/io";

export default function MenuItems() {
  const { user } = useProvideAuth();
  const [ChosenImage, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [updateCategory] = useMutation(UPDATE_CATEGORY);
  const [submited, setIsSubmited] = useState(false);
  const { data: restaurantCategorysData, refetch } = useQuery<
    MenuByCategoryQuery,
    MenuByCategoryQueryVariables
  >(GET_MENU_CATREGORY, {
    variables: {
      restaurant: user.data?.CurrentUser?.restaurant.name as string,
    },
    onCompleted: () => {
      setIsSubmited(true);
    },
  });

  const { uploadImage, image } = useUpload(
    "https://api.cloudinary.com/v1_1/dug3htihd/image/upload"
  );

  return (
    <div className={styles.container}>
      <h2>Restaurant Menu</h2>
      <div className={styles.add_button_parent}>
        <IoMdAddCircle className={styles.add_button} />
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
                name={res?.collectionType}
                image={ChosenImage ? ChosenImage : res?.image}
                submit={(e: ChangeEvent<HTMLSelectElement>) => {
                  e.preventDefault();
                  updateCategory({
                    variables: {
                      categoryId: res?._id,
                      category: category ?? res?.collectionType,
                      image: image?.url ?? res?.image,
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
