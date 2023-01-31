import React, {
  ChangeEvent,
  MouseEventHandler,
  useEffect,
  useState,
} from "react";
import { AiOutlineEdit, AiFillDelete } from "react-icons/ai";
import styles from "./styles.module.scss";
import Image from "next/image";
import Inputs from "./MenuItem";
import Modal from "components/Modal";
import MenuItem from "../MenuItem";
import MenuUpdater from "../MenuUpdater";
import { BiMinusCircle } from "react-icons/bi";
import {
  DeleteMenuItemSubCategoryMutationFn,
  UpdateMenuItemsMutationFn,
} from "@/server/generated/graphql";
import Tooltip from "components/MuiTooltip";

interface MenuEditor {
  data: { images: string[]; name: string; price: number };
  submit: UpdateMenuItemsMutationFn;
  restaurant: string;
  category: string;
  id: string;
  isSaved?: boolean;
  subCat?: string[] | string;
  deleteSubCatToMenuItem: MouseEventHandler<SVGElement>;
}
export default function MenuEditor({
  data,
  submit,
  restaurant,
  category,
  isSaved,
  subCat,
  deleteSubCatToMenuItem,
  id,
}: MenuEditor) {
  const [isOpen, setIsOpen] = useState(false);
  const [tooTipVisible, setToolTipVisible] = useState(false);
  return (
    <div className={styles.menuEditor_container}>
      <div className={styles.parent}>
        {data.images?.length &&
          data.images?.map((res, i) => {
            return (
              <div key={i} className={styles.image_container}>
                <Image
                  alt={res}
                  src={res}
                  className={styles.image}
                  width={"100px"}
                  height={"100px"}
                />
              </div>
            );
          })}
        <MenuUpdater name={data.name} price={data.price} />

        <AiOutlineEdit
          className={styles.edit_button}
          onClick={() => setIsOpen(!isOpen)}
        />
      </div>

      <Modal
        isModalOpen={isOpen}
        setIsModalOpen={setIsOpen}
        label="Edit menu item">
        <div style={{ color: "wheat", float: "right", position: "relative" }}>
          <Tooltip text="Exclude item">
            <BiMinusCircle
              size={34}
              style={{ cursor: "pointer" }}
              className={styles.exclude_icon}
              onClick={deleteSubCatToMenuItem}
            />
          </Tooltip>
        </div>

        <Inputs
          category={category}
          restaurant={restaurant}
          data={data}
          submit={submit}
          subCat={subCat}
        />
      </Modal>
    </div>
  );
}
