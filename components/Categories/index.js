import React from "react";

import styles from "./Categories.module.scss";
import Link from "next/link";

const CategoryItem = ({ name, link, emoji }) => {
  return (
    <li className={styles.categoryItem}>
      <Link href={link || "/"}>
        <a>
          <span className={styles.emoji}>{emoji}</span>
          <span className={styles.categoryName}>{name}</span>
        </a>
      </Link>
    </li>
  );
};

export default function CategoriesBar() {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Categories</h2>
      <ul className={styles.categories}>
        <CategoryItem name="New In" emoji="⚡" link="/" />
        <CategoryItem name="Clothing" emoji="👚" link="/category/clothing" />
        <CategoryItem
          name="football"
          emoji="👠"
          link="/category/football?category=football"
        />
        <CategoryItem
          name="Accessories"
          emoji="😴"
          link="/category/accessories"
        />
        <CategoryItem
          name="Activewear"
          emoji="🤸"
          link="/category/activewear"
        />
        <CategoryItem
          name="Gifts & Living"
          emoji="🎁"
          link="/category/gifts_and_living"
        />
        <CategoryItem
          name="Inspiration"
          emoji="💎"
          link="/category/inspiration"
        />
      </ul>
    </div>
  );
}
