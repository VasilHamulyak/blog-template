/* eslint-disable no-case-declarations */
import React from "react";
import { useStaticQuery, graphql } from "gatsby";

const onShareIconClick = (e, url) => {
  const width = 700;
  const height = 500;
  const left = screen.width / 2 - width / 2;
  const top = screen.height / 2 - height / 2;

  e.preventDefault();
  window.open(
    url,
    "",
    `menubar=no,toolbar=no,resizable=yes,scrollbars=yes,width=${width},
    height=${height},top=${top},left=${left}`
  );
};

const SocialNetworkShare = ({ socialLink, articleURL, articleTitle }) => {
  const {
    site: {
      siteMetadata: { siteUrl },
    },
  } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            siteUrl
          }
        }
      }
    `
  );

  const baseUrl = `${siteUrl}/${articleURL}`;
  const { name, icon, shareLink } = socialLink;

  let item = null;

  switch (name) {
    case "Facebook":
      const urlFacebook = `${shareLink}?u=${baseUrl}`;
      item = (
        <span
          onClick={e => onShareIconClick(e, urlFacebook)}
          className="share-icon"
        >
          <i className={icon} />
        </span>
      );
      break;

    case "Twitter":
      const urlTwitter = `${shareLink}?text=${articleTitle}
    &url=${baseUrl}`;
      item = (
        <span
          onClick={e => onShareIconClick(e, urlTwitter)}
          className="share-icon"
        >
          <i className={icon} />
        </span>
      );
      break;

    case "Linkedin":
      const urlLinkedIn = `${shareLink}?mini=true&url=${baseUrl}`;
      item = (
        <span
          onClick={e => onShareIconClick(e, urlLinkedIn)}
          className="share-icon"
        >
          <i className={icon} />
        </span>
      );
      break;
  }

  return item;
};

export default SocialNetworkShare;
