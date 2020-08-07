import React from "react";
import cn from "classnames";

const MenuToggle = ({ isDrawerOpen, onToggleClick }) => (
  <div
    className={cn("toggle", { "toggle--drawer-open": isDrawerOpen })}
    onClick={onToggleClick}
  >
    <div className="toggle__bar toggle__bar--first"></div>
    <div className="toggle__bar toggle__bar--second"></div>
    <div className="toggle__bar toggle__bar--third"></div>
  </div>
);

export default MenuToggle;
