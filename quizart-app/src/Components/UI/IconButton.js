import { Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const IconButton = ({ icon, color, size, onPress }) => {
  return (
    <Pressable onPress={onPress}>
      <Ionicons name={icon} color={color} size={size} />
    </Pressable>
  );
};

export default IconButton;
