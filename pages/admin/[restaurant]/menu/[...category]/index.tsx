import React, { ChangeEvent, useEffect, useState } from "react";
import PrimaryLayout from "components/Primary-layout";
import MenuEditor from "components/MenuEditor";
import MenuAdder from "@/components/MenuAdder";
import {
  GET_MENU_ITEM_BY_CATREGORY,
  GET_MENU_CATREGORY,
  GET_MENU_BY_SUB_CATEGORY,
} from "server/graphql/querys/querys.graphql";
import Inputs from "@/components/MenuEditor/MenuItem";
import { useRouter } from "next/router";
import { useMutation, useQuery } from "@apollo/client";
import {
  ADD_MENU_CATEGORY,
  ADD_MENU_ITEM,
  UPDATE_CATEGORY,
  UPDATE_MENU_ITEMS,
  DELETE_CATEGORY,
} from "server/graphql/querys/mutations.graphql";
import { IoMdAddCircle } from "react-icons/io";
import styles from "./styles.module.scss";
import Search from "components/Search-form";
import {
  AddMenuCategoryMutation,
  AddMenuCategoryMutationVariables,
  AddMenuItemMutation,
  AddMenuItemMutationVariables,
  DeleteMenuCategoryMutation,
  DeleteMenuCategoryMutationVariables,
  MenuBySubCategoryQuery,
  MenuBySubCategoryQueryVariables,
  MenuItemByCategoryQuery,
  MenuItemByCategoryQueryVariables,
  UpdateCategoryMutation,
  UpdateCategoryMutationVariables,
  UpdateMenuItemsMutation,
  UpdateMenuItemsMutationVariables,
} from "@/server/generated/graphql";
import Modall from "@/components/Modal";
import ErrorCard from "@/components/ErrorCard";
import { useProvideAuth } from "hooks/Context.hook";
import CategoryEditor from "@/components/CategoryEditor";
import useUpload from "hooks/upload.hook";
import AddCategory from "@/components/AddCategory";

export default function Category() {
  const { query, push, reload } = useRouter();
  const [documentSaved, setDocumentSaved] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemSaved, setIsItemSaved] = useState(false);
  const { user } = useProvideAuth();
  const [ChosenImage, setImage] = useState("");
  const [category, setCategory] = useState("");

  const currentCat = query?.category?.[query?.category?.length - 1];
  const [updateCategory] = useMutation<
    UpdateCategoryMutation,
    UpdateCategoryMutationVariables
  >(UPDATE_CATEGORY, {
    refetchQueries: [
      { query: GET_MENU_BY_SUB_CATEGORY }, // DocumentNode object parsed with gql

      "MenuBySubCategory", // Query name
    ],
    onCompleted: () => {
      setIsItemSaved(true);
      setTimeout(() => {
        setIsModalOpen(false);
        setIsItemSaved(false);
        reload();
      }, 1500);
    },
  });

  const { data, error, loading } = useQuery<
    MenuBySubCategoryQuery,
    MenuBySubCategoryQueryVariables
  >(GET_MENU_BY_SUB_CATEGORY, {
    variables: {
      restaurant: query.restaurant as string,
      subCategory: currentCat,
    },
  });

  const [addMenuItem, { error: errorOnSavingItem }] = useMutation<
    AddMenuItemMutation,
    AddMenuItemMutationVariables
  >(ADD_MENU_ITEM, {
    refetchQueries: [
      { query: GET_MENU_ITEM_BY_CATREGORY }, // DocumentNode object parsed with gql

      "MenuItem", // Query name
    ],
    onCompleted: (err) => {
      setIsItemSaved(true);
    },
  });
  const [addCategory, { data: addCategoryData }] = useMutation<
    AddMenuCategoryMutation,
    AddMenuCategoryMutationVariables
  >(ADD_MENU_CATEGORY, {
    refetchQueries: [
      { query: GET_MENU_BY_SUB_CATEGORY }, // DocumentNode object parsed with gql

      "MenuBySubCategory", // Query name
    ],
    onCompleted: () => {
      setIsItemSaved(true);
      setTimeout(() => {
        setIsModalOpen(false);
        setIsItemSaved(false);
        reload();
      }, 1500);
    },
  });
  const [save] = useMutation<
    UpdateMenuItemsMutation,
    UpdateMenuItemsMutationVariables
  >(UPDATE_MENU_ITEMS, {
    refetchQueries: [
      { query: GET_MENU_ITEM_BY_CATREGORY }, // DocumentNode object parsed with gql
      "MenuItemByCategory", // Query name
    ],

    onCompleted: () => {
      setDocumentSaved(true);
      setTimeout(() => {
        setIsModalOpen(false);
      }, 2000);
    },
  });
  const [deleteCategory] = useMutation<
    DeleteMenuCategoryMutation,
    DeleteMenuCategoryMutationVariables
  >(DELETE_CATEGORY, {
    refetchQueries: [
      { query: GET_MENU_BY_SUB_CATEGORY }, // DocumentNode object parsed with gql
      "MenuBySubCategory", // Query name
    ],

    onCompleted: () => {
      setDocumentSaved(true);
      setTimeout(() => {
        setIsModalOpen(false);
      }, 2000);
    },
  });
  const {
    data: menuItesmData,
    loading: menuItemsLoading,
    error: menuItemsError,
  } = useQuery<MenuItemByCategoryQuery, MenuItemByCategoryQueryVariables>(
    GET_MENU_ITEM_BY_CATREGORY,
    {
      variables: {
        category: currentCat as string,
        restaurant: query.restaurant as string,
      },
    }
  );
  const { uploadImage, image } = useUpload(
    "https://api.cloudinary.com/v1_1/dug3htihd/image/upload"
  );
  return (
    <div className={styles.container}>
      <div className={styles.add_button_parent}>
        <IoMdAddCircle
          className={styles.add_button}
          onClick={() => setIsModalOpen(true)}
        />
        <Modall
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          label="Create new item">
          {!data?.MenuBySubCategory?.length ? (
            <MenuAdder
              submit={addMenuItem}
              restaurant={query.restaurant as string}
              category={query.category as string}></MenuAdder>
          ) : (
            <AddCategory
              restaurant={query?.restaurant}
              submit={addCategory}
              onChangeImage={uploadImage}
              fetchedImage={image}
              isAdded={addCategoryData ? true : false}
              parent={currentCat}
            />
          )}

          {errorOnSavingItem && (
            <ErrorCard>There was an error during creation</ErrorCard>
          )}
        </Modall>
      </div>
      <Search label={"Hitta bord"} onChange={() => null} />

      <div className={styles.items_parent}>
        {data?.MenuBySubCategory?.length
          ? data?.MenuBySubCategory.map((res, i) => (
              <div key={i}>
                <div key={res?._id} className={styles.category_parent}>
                  <CategoryEditor
                    onChangeImage={uploadImage}
                    onChange={(e) =>
                      setCategory(
                        (e.target as typeof e.target & { value: any }).value
                      )
                    }
                    id={res?._id}
                    submited={itemSaved}
                    name={res?.collectionType}
                    image={ChosenImage ? ChosenImage : res?.image}
                    deleteCategory={deleteCategory}
                    submit={() =>
                      updateCategory({
                        variables: {
                          image: res?.image,
                          category,
                          categoryId: res?._id,
                        },
                      })
                    }
                    restaurant={query.restaurant}
                  />
                </div>
              </div>
            ))
          : menuItesmData?.MenuItemByCategory?.map((res) => {
              return (
                <MenuEditor
                  key={res._id}
                  restaurant={query.restaurant}
                  category={currentCat}
                  submit={save}
                  data={res}
                  isSaved={documentSaved}></MenuEditor>
              );
            })}
      </div>
    </div>
  );
}
Category.Layout = PrimaryLayout;