import React from "react";
import { useGlobalContext } from "contexts/global-context";
import { LANGUAGE } from "configs";
import "../featureSup.scss";

export default function Language(props) {
  const { setLanguage } = useGlobalContext();

  const _handleChooseLanguage = lang => {
    setLanguage(lang);
  };

  return (
    <div className="topbar__lang">
      <div className="topbar__lang-en" onClick={() => _handleChooseLanguage(LANGUAGE.ENGLISH)}>
        <img
          src="https://icons.iconarchive.com/icons/icons-land/vista-flags/256/United-States-Flag-1-icon.png"
          alt="en"
        />
      </div>
      <span className="topbar__lang-line"></span>
      <div className="topbar__lang-vn" onClick={() => _handleChooseLanguage(LANGUAGE.VIETNAMESE)}>
        <img src="https://icons.iconarchive.com/icons/wikipedia/flags/512/VN-Vietnam-Flag-icon.png" alt="vn" />
      </div>
    </div>
  );
}
