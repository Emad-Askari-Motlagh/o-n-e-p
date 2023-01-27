import React, { ChangeEvent, useEffect, useState } from "react";
import PrimaryLayout from "components/Primary-layout";
import MenuEditor from "components/MenuEditor";
import MenuAdder from "@/components/MenuAdder";
import { useRouter } from "next/router";
import { IoMdAddCircle } from "react-icons/io";
import styles from "./styles.module.scss";
import Modall from "@/components/Modal";
import ErrorCard from "@/components/ErrorCard";
import { useProvideAuth } from "hooks/Context.hook";
import CategoryEditor from "@/components/CategoryEditor";
import useUpload from "hooks/upload.hook";
import AddCategory from "@/components/AddCategory";
import useMenu from "hooks/Menu.hook";
import Selection from "@/components/Selection";
import Search from "components/Search-form/Input";
import SearchResult from "@/components/SearchResult";

export default function Category() {
  const { query, push, reload } = useRouter();
  const { user } = useProvideAuth();
  const [ChosenImage, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [actionType, setActionType] = useState("category");

  const { uploadImage, image } = useUpload(
    "https://api.cloudinary.com/v1_1/dug3htihd/image/upload"
  );
  const currentCat = query?.category?.[query?.category?.length - 1];
  const {
    menuItesmData,
    menuItemsLoading,
    menuItemsError,
    deleteCategory,
    saveMenuItem,
    addCategory,
    addMenuItem,
    addSubCategory,
    updateCategory,
    isModalOpen,
    itemSaved,
    documentSaved,
    menuBySubCategoryData,
    menuBySubCategoryError,
    menuBySubCategoryLoading,
    addCategoryData,
    setIsModalOpen,
    errorOnSavingItem,
    allItems,
    AddSubCatToMenuItem,
  } = useMenu();

  return (
    <div className={styles.container}>
      <div className={styles.add_button_parent}>
        <div>
          <IoMdAddCircle
            className={styles.add_button}
            onClick={() => setIsModalOpen(true)}
          />
        </div>

        <Modall
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          label="Create new category">
          <Selection
            value={actionType}
            onChange={(e) => setActionType(e.target.value)}
            options={[
              { value: "category" },
              { value: "item" },
              { value: "import item" },
            ]}
            label="Choose one of the options"
          />

          {actionType === "category" && (
            <AddCategory
              restaurant={query?.restaurant}
              submit={addCategory}
              isAdded={addCategoryData ? true : false}
              parent={currentCat}
            />
          )}

          {actionType === "item" &&
            !menuBySubCategoryData?.MenuBySubCategory?.length && (
              <MenuAdder
                submit={addMenuItem}
                restaurant={query.restaurant as string}
                category={query.category?.[0] as string}
                subCat={query?.category}
                image={image}
                uploadImage={uploadImage}></MenuAdder>
            )}
          {actionType === "import item" && (
            <div>
              <Search
                placeholder="Item to import"
                label="Add an item to this category"
                onChange={() => null}
              />
              {allItems?.FetchAllMenuItems.length &&
                allItems.FetchAllMenuItems.map((item) => {
                  return (
                    <SearchResult
                      key={item?._id}
                      name={item?.name as string}
                      id={item?._id as string}
                      imgSrc={item?.images?.[0] as string}
                      onClick={() =>
                        AddSubCatToMenuItem({
                          variables: {
                            restaurant: query?.restaurant,
                            id: item?._id,
                            cat: currentCat,
                          },
                        })
                      }
                      restaurant={query.restaurant as string}
                      category={query.category?.[0] as string}
                    />
                  );
                })}
            </div>
          )}
          {errorOnSavingItem && (
            <ErrorCard>There was an error during creation</ErrorCard>
          )}
        </Modall>
      </div>

      <div className={styles.items_parent}>
        {menuBySubCategoryData?.MenuBySubCategory?.length
          ? menuBySubCategoryData?.MenuBySubCategory.map((res, i) => (
              <div key={res?._id}>
                <div className={styles.category_parent}>
                  <CategoryEditor
                    onChangeImage={uploadImage}
                    subCats={res?.subCategory}
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
                    addSubCategory={addSubCategory}
                    restaurant={query.restaurant}
                  />
                </div>
              </div>
            ))
          : menuItesmData?.MenuItemByCategory?.map((res) => {
              return (
                <MenuEditor
                  subCat={res?.subCat}
                  key={res._id}
                  restaurant={query.restaurant}
                  category={query.category}
                  submit={saveMenuItem}
                  data={res}
                  isSaved={documentSaved}></MenuEditor>
              );
            })}
      </div>
    </div>
  );
}
Category.Layout = PrimaryLayout;
