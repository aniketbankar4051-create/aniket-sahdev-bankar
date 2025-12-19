
import React from 'react';

// This tells TypeScript that the 'marked' library is available on the window object.
declare global {
    interface Window {
        marked: any;
    }
}
interface PlanCardProps {
  title: string;
  content: string;
}

const PlanCard: React.FC<PlanCardProps> = ({ title, content }) => {
    const getHtmlContent = () => {
        if (window.marked) {
            return { __html: window.marked.parse(content || 'No plan available. Generate one!') };
        }
        return { __html: '<p>Loading parser...</p>'};
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold mb-4 border-b-2 border-cyan-500 pb-2">{title}</h3>
            <div 
                className="prose prose-sm sm:prose-base max-w-none 
                           prose-headings:text-gray-900 prose-p:text-gray-600 prose-li:text-gray-600 
                           prose-strong:text-cyan-600"
                dangerouslySetInnerHTML={getHtmlContent()} 
            />
        </div>
    );
};

export default PlanCard;
