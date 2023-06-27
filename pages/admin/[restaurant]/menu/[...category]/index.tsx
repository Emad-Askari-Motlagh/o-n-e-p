import React, { useCallback, useEffect, useRef, useState } from "react";
import PrimaryLayout from "@/components/PrimaryLayout";
import MenuEditor from "components/MenuEditor";
import { useRouter } from "next/router";
import { IoMdAddCircle } from "react-icons/io";
import styles from "./styles.module.scss";
import Modall from "@/components/Modal";
import CategoryEditor from "@/components/CategoryEditor";
import useUpload from "hooks/upload.hook";
import useMenu from "hooks/Menu.hook";
import MenuItemComponent from "@/components/SearchResult";
import { SelectChangeEvent } from "@mui/material";
import dynamic from "next/dynamic";
import Info from "@/components/Info";
const Selection = dynamic(() => import("@/components/Selection"));
const AddCategory = dynamic(() => import("@/components/AddCategory"));
const MenuAdder = dynamic(() => import("@/components/MenuAdder"));
const ErrorCard = dynamic(() => import("@/components/ErrorCard"));

export default function Category() {
  const { query, push, reload } = useRouter();
  const [ChosenImage, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [actionType, setActionType] = useState("Options...");
  const [importedItems, setImportedItems] = useState([]);
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
    deleteSubCatToMenuItem,
  } = useMenu();

  const options = useRef([
    { name: "Options..." },
    { name: "create item" },
    { name: "create category" },
    { name: "import item" },
  ]);
  const onSelectionChange = useCallback((e: SelectChangeEvent) => {
    setActionType(e.target.value);
  }, []);

  useEffect(() => {
    if (allItems?.FetchAllMenuItems?.length && actionType === "import item") {
      setImportedItems([...allItems?.FetchAllMenuItems]);
    }
  }, [actionType, allItems?.FetchAllMenuItems]);

  const MenuItems = importedItems.map((item) => {
    return (
      <MenuItemComponent
        key={item?._id}
        name={item?.name as string}
        id={item?._id as string}
        imgSrc={item?.images?.[0] as string}
        onClick={() =>
          AddSubCatToMenuItem({
            variables: {
              restaurant: query?.restaurant as string,
              id: item?._id,
              cat: currentCat,
            },
          })
        }
        restaurant={query.restaurant as string}
        category={query.category?.[0] as string}
      />
    );
  });

  const CategoryEditorComponent = menuBySubCategoryData?.MenuBySubCategory.map(
    (res, i) => (
      <div key={res?._id}>
        <div className={styles.category_parent}>
          <CategoryEditor
            onChangeImage={uploadImage}
            subCats={res?.subCategory}
            onChange={(e) =>
              setCategory((e.target as typeof e.target & { value: any }).value)
            }
            id={res?._id}
            submited={itemSaved}
            name={res?.collectionType}
            image={ChosenImage ? ChosenImage : res?.image}
            deleteCategory={() => {
              deleteCategory({
                variables: {
                  categoryId: res?._id,
                  restaurant: query?.restaurant as string,
                },
              });
            }}
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
            restaurant={query.restaurant as string}
          />
        </div>
      </div>
    )
  );

  const MenuEditorComponent = menuItesmData?.MenuItemByCategory?.length
    ? menuItesmData?.MenuItemByCategory?.map((res) => {
        if (res.__typename === "MenuItem")
          return (
            <MenuEditor
              subCat={res.subCat}
              key={res?._id}
              restaurant={query.restaurant as string}
              category={currentCat}
              submit={saveMenuItem}
              data={res}
              deleteSubCatToMenuItem={() =>
                deleteSubCatToMenuItem({
                  variables: {
                    cat: currentCat,
                    id: res._id,
                    restaurant: query?.restaurant as string,
                  },
                })
              }
              isSaved={documentSaved}
              id={res?._id}></MenuEditor>
          );
      })
    : !menuItemsLoading && <ErrorCard>The category is empty for now</ErrorCard>;
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
          label="Edit menu options">
          <Info>
            You can create item, import menu item or create category in this
            section
          </Info>
          <Selection
            value={actionType}
            onChange={onSelectionChange}
            options={options.current}
            label="Choose one of the options"
          />
          {actionType === "create category" && (
            <AddCategory
              restaurant={query?.restaurant as string}
              submit={addCategory}
              isAdded={addCategoryData ? true : false}
              parent={currentCat}
            />
          )}
          {actionType === "create item" &&
          !menuBySubCategoryData?.MenuBySubCategory?.length ? (
            <MenuAdder
              submit={addMenuItem}
              restaurant={query.restaurant as string}
              category={query.category?.[0] as string}
              subCat={query?.category}></MenuAdder>
          ) : (
            actionType === "create item" && (
              <ErrorCard>
                Creation of an item is allowed in lowest level of category
              </ErrorCard>
            )
          )}
          {importedItems?.length && actionType === "import item" && (
            <div>{MenuItems}</div>
          )}
          {errorOnSavingItem && (
            <ErrorCard>There was an error during creation</ErrorCard>
          )}
        </Modall>
      </div>

      <div className={styles.items_parent}>
        {menuBySubCategoryData?.MenuBySubCategory?.length
          ? CategoryEditorComponent
          : MenuEditorComponent}
      </div>
    </div>
  );
}
Category.Layout = PrimaryLayout;
