import React, {
  ClassAttributes,
  HTMLAttributes,
  useRef,
  useState,
} from "react";
import styles from "./styles.module.scss";

interface TooltipType {
  text: string;
  children: JSX.Element;
}
const Tooltip = ({ text, children }: TooltipType) => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const componentRef = useRef<HTMLAttributes<HTMLDivElement>>();

  return (
    <>
      {React.cloneElement(children, {
        onMouseOver: (event: MouseEvent) => {
          setIsVisible(true);
          setPosition({ x: event.clientX, y: event.clientY });
        },
        onMouseOut: () => setIsVisible(false),
      })}
      <div ref={componentRef} className={styles.tooltip}>
        {text}
      </div>
    </>
  );
};

export default Tooltip;
