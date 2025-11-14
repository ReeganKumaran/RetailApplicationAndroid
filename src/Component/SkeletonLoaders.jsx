import { View, Dimensions } from "react-native";
import ContentLoader, { Rect, Circle } from "react-content-loader/native";

const screenWidth = Dimensions.get("window").width;

// Skeleton for customer card in Rentals screen
export const CustomerCardSkeleton = () => (
  <View style={{ marginBottom: 16, paddingHorizontal: 16 }}>
    <ContentLoader
      speed={1}
      width={screenWidth - 32}
      height={80}
      backgroundColor="#bababaff"
      foregroundColor="#bababaff"
    >
      <Circle cx="40" cy="40" r="32" />
      <Rect x="90" y="20" rx="4" ry="4" width="150" height="20" />
      <Rect x="90" y="50" rx="4" ry="4" width="100" height="16" />
      <Rect x={screenWidth - 120} y="25" rx="4" ry="4" width="70" height="30" />
    </ContentLoader>
  </View>
);

// Skeleton for rental card
export const RentalCardSkeleton = () => (
  <View style={{ marginBottom: 16 }}>
    <ContentLoader
      speed={1}
      width={screenWidth - 32}
      height={120}
      backgroundColor="#bababaff"
      foregroundColor="#bababaff"
    >
      <Rect x="0" y="10" rx="4" ry="4" width="60%" height="20" />
      <Rect x="70%" y="10" rx="12" ry="12" width="25%" height="24" />
      <Rect x="0" y="45" rx="4" ry="4" width="80%" height="16" />
      <Rect x="0" y="70" rx="4" ry="4" width="60%" height="16" />
      <Rect x="0" y="95" rx="4" ry="4" width="40%" height="16" />
    </ContentLoader>
  </View>
);

// Skeleton for dashboard stats card
export const StatsCardSkeleton = () => (
  <ContentLoader
    speed={1}
    width={(screenWidth - 48) / 3}
    height={80}
    backgroundColor="#bababaff"
    foregroundColor="#bababaff"
  >
    <Rect x="10" y="10" rx="8" ry="8" width="40" height="40" />
    <Rect x="10" y="58" rx="4" ry="4" width="60" height="16" />
  </ContentLoader>
);

// Skeleton for chart
export const ChartSkeleton = () => (
  <View style={{ marginBottom: 16 }}>
    <ContentLoader
      speed={1}
      width={screenWidth - 32}
      height={240}
      backgroundColor="#bababaff"
      foregroundColor="#bababaff"
    >
      {/* <Rect x="0" y="10" rx="4" ry="4" width="40%" height="20" /> */}
      <Rect x="0" y="40" rx="16" ry="16" width="100%" height="200" />
    </ContentLoader>
  </View>
);

// Multiple skeleton loaders for lists
export const CustomerListSkeleton = ({ count = 5 }) => (
  <View>
    {Array.from({ length: count }).map((_, index) => (
      <CustomerCardSkeleton key={index} />
    ))}
  </View>
);

export const RentalListSkeleton = ({ count = 3 }) => (
  <View style={{ paddingHorizontal: 16 }}>
    {Array.from({ length: count }).map((_, index) => (
      <RentalCardSkeleton key={index} />
    ))}
  </View>
);
