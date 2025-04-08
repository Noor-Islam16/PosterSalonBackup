import React from "react";

interface PosterSalonProps {
  bottom_html: string;
}

const PosterSalon: React.FC<PosterSalonProps> = ({ bottom_html }) => {
  return (
    <div className="bg-black text-white p-6 md:p-12 font-poppins">
      <style>{`
        .bottom-html-content h1 {
          color: #F8C900;
          font-weight: bold;
          font-size: 1.85rem;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
        }
        .bottom-html-content h2,
        .bottom-html-content h3 {
          color: #F8C900;
          font-weight: bold;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
        }

        .bottom-html-content p {
          color: #ffffff;
          font-size: 1rem;
          line-height: 1.75rem;
          margin-bottom: 1rem;
        }

        .bottom-html-content strong {
          font-weight: 700;
        }

        .bottom-html-content ol {
          list-style-type: decimal;
          padding-left: 1.5rem;
          margin-bottom: 1rem;
        }

        .bottom-html-content li {
          margin-bottom: 0.5rem;
        }
      `}</style>

      <div
        className="bottom-html-content max-w-full mx-auto"
        dangerouslySetInnerHTML={{ __html: bottom_html }}
      />
    </div>
  );
};

export default PosterSalon;
