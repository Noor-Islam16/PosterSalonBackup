import React from "react";
import { Helmet } from "react-helmet";

interface MetaTagsProps {
  title?: string;
  description?: string;
}

const MetaTags: React.FC<MetaTagsProps> = ({ title, description }) => {
  return (
    <Helmet>
      {title && <title>{title}</title>}
      {description && <meta name="description" content={description} />}
      {title && <meta property="og:title" content={title} />}
      {description && <meta property="og:description" content={description} />}
    </Helmet>
  );
};

export default MetaTags;
