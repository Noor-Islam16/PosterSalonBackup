import { useState } from "react";
import { Button } from "../ui/button";

interface PosterDescriptionPageProps {
  tabs: { [key: string]: string }; // Tabs object received from API
}

export default function PosterDescriptionPage({ tabs }: PosterDescriptionPageProps) {
  const sectionKeys = Object.keys(tabs); // Get section names dynamically
  const [selectedSection, setSelectedSection] = useState(sectionKeys[0]);

  return (
    <div className="flex flex-col lg:flex-row bg-black text-white p-4 lg:p-8">
      {/* Left Sidebar */}
      <div className="w-full lg:w-1/4 space-y-4 lg:space-y-10 mb-6 lg:mb-0">
        {sectionKeys.map((section) => (
          <Button
            key={section}
            onClick={() => setSelectedSection(section)}
            className={`w-full text-left bg-black p-2 border border-yellow-400 rounded-none ${
              selectedSection === section
                ? "bg-yellow-400 text-black hover:bg-yellow-400 hover:text-black"
                : "hover:bg-gray-700"
            }`}
            style={{ justifyContent: "flex-start" }}
          >
            {section}
          </Button>
        ))}
      </div>

      {/* Right Content - Injecting API HTML with Custom Styling */}
      <div className="w-full lg:w-3/4 lg:pl-8 text-left">
        {tabs[selectedSection] ? (
          <div
            className="text-sm lg:text-base text-white space-y-4" // Applies base styles
            dangerouslySetInnerHTML={{
              __html: tabs[selectedSection]
                .replace(/<h6/g, `<h1 class="text-lg lg:text-xl font-bold text-yellow-400 mt-2"`) // Style h6 as h1
                .replace(/<p/g, `<p class="text-sm lg:text-base text-gray-300"`) // Style paragraphs
                .replace(/<ul/g, `<ul class="list-disc pl-5 text-sm lg:text-base"`) // Style unordered lists
                .replace(/<a /g, `<a class="text-yellow-400 hover:text-gray-400" `) // Style links
            }}
          />
        ) : (
          <p className="text-white">No content available for this section.</p>
        )}
      </div>
    </div>
  );
}
