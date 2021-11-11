import React from 'react';
import useStyles from './UserHelps.style';
import { useTranslation } from "react-i18next";

function UserHelps() {
  const classes = useStyles();
  const { t: translate } = useTranslation();
  return (
    <div className={classes.root}>
      <h2 className={classes.heading}>{translate('soft_manual')}</h2>
      <div className={classes.helpWrapper}>
        <h3 className={classes.helpTitle}>{translate('basic_syntax')}</h3>
        <table className={classes.helpTable}>
          <thead>
            <tr>
              <th>Element</th>
              <th>Markdown syntax</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{translate('heading_md')}</td>
              <td>
                <p># H1</p>
                <p>## H2</p>
                <p>### H3</p>
              </td>
            </tr>
            <tr>
              <td>{translate('bold_md')}</td>
              <td>
                <p>**bold text**</p>
              </td>
            </tr>
            <tr>
              <td>{translate('italic_md')}</td>
              <td>
                <p>**italicized text**</p>
              </td>
            </tr>
            <tr>
              <td>{translate('list_md')}</td>
              <td>
                <p>1. First item</p>
                <p>2. Second item</p>
                <p>3. Third item</p>
              </td>
            </tr>
            <tr>
              <td>{translate('link_md')}</td>
              <td>
                <p>[title](https://www.example.com)</p>
              </td>
            </tr>
            <tr>
              <td>{translate('rule_md')}</td>
              <td>
                <p>---</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserHelps;
