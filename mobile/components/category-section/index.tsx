import { View } from "react-native";

import { CategoryIcons } from "@/constants/icons";
import CategoryCard from "@/components/category-card";

interface Category {
  title: string;
  count: number;
  icon: keyof typeof CategoryIcons;
  bgClassName: string;
}

interface CategorySectionProps {
  isLoading: boolean;
  data?: {
    health: number;
    work: number;
    mentalHealth: number;
    others: number;
  };
}

const SKELETON_CATEGORIES: Category[] = [
  {
    title: "Health",
    count: 0,
    icon: "Health",
    bgClassName: "bg-health-light",
  },
  {
    title: "Work",
    count: 0,
    icon: "Work",
    bgClassName: "bg-work-light",
  },
  {
    title: "Mental Health",
    count: 0,
    icon: "MentalHealth",
    bgClassName: "bg-mentalHealth-light",
  },
  {
    title: "Others",
    count: 0,
    icon: "Others",
    bgClassName: "bg-others-light",
  },
];

const CategorySection = ({ isLoading, data }: CategorySectionProps) => {
  const categories: Category[] = isLoading
    ? SKELETON_CATEGORIES
    : [
        {
          title: "Health",
          count: data?.health ?? 0,
          icon: "Health",
          bgClassName: "bg-health-light",
        },
        {
          title: "Work",
          count: data?.work ?? 0,
          icon: "Work",
          bgClassName: "bg-work-light",
        },
        {
          title: "Mental Health",
          count: data?.mentalHealth ?? 0,
          icon: "MentalHealth",
          bgClassName: "bg-mentalHealth-light",
        },
        {
          title: "Others",
          count: data?.others ?? 0,
          icon: "Others",
          bgClassName: "bg-others-light",
        },
    ];
  
  console.log()

  return (
    <View className="flex-1 w-full mt-10 flex-row flex-wrap gap-4">
      {categories.map((category) => (
        <CategoryCard
          key={category.title}
          title={category.title}
          count={category.count}
          icon={CategoryIcons[category.icon]()}
          bgClassName={`${category.bgClassName} ${
            isLoading ? "animate-pulse" : ""
          }`}
        />
      ))}
    </View>
  );
};

export default CategorySection;
