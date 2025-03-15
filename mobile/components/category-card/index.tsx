import React from "react";
import { View, Text } from "react-native";

interface CategoryCardProps {
  title: string;
  count: number;
  icon: React.ReactNode;
  className?: string;
  bgClassName: string;
}

const CategoryCard = ({
  title,
  count,
  icon,
  className,
  bgClassName,
}: CategoryCardProps) => {
  return (
    <View
      className={`${bgClassName} h-[93px] w-[48%] rounded-md justify-center gap-5 p-5 ${className}`}
    >
      {icon}

      <Text className="font-isemibold text-[17px]">
        {count}{" "}
        <Text className="font-imedium text-[#171313] opacity-[60%] capitalize">
          {title}
        </Text>
      </Text>
    </View>
  );
};

export default CategoryCard;
