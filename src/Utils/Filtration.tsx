import { Blog } from "../../types";

    export default function filtration(blogsArray: Blog[], options: {
        searchTerm?: string;
        isAutomation?: boolean;
        isImpactful?: boolean;
        isFuture?: boolean;
    }) {
        const { searchTerm, isAutomation, isImpactful, isFuture } = options;

    return blogsArray.filter(blog => {
        const matchesSearch = !searchTerm || blog.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesAutomation = !isAutomation || blog.tags == "automation";
        const matchesImpactful = !isImpactful || blog.tags == "impactful";
        const matchesFuture = !isFuture || blog.tags == "future";

        return matchesSearch && matchesAutomation && matchesImpactful && matchesFuture;
  });

}

