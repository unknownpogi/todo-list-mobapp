import { Modal, Pressable, Text, View } from "react-native";

type Props = {
  visible: boolean;
  onClose: () => void;
  onDelete: () => void;
};

export default function CustomModal({ visible, onClose, onDelete }: Props) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center bg-black/40">
        <View className="w-80 bg-white rounded-3xl p-6">
          <Text className="text-xl font-bold text-center mb-2">
            Delete Item
          </Text>

          <Text className="text-gray-500 text-center mb-5">
            Are you sure you want to delete this item?
          </Text>

          <View className="flex-row justify-between gap-3">
            {/* Cancel */}
            <Pressable
              className="flex-1 bg-gray-200 py-3 rounded-xl items-center"
              onPress={onClose}
            >
              <Text className="text-gray-700 font-semibold">Cancel</Text>
            </Pressable>

            {/* Delete */}
            <Pressable
              className="flex-1 bg-red-500 py-3 rounded-xl items-center"
              onPress={onDelete}
            >
              <Text className="text-white font-semibold">Delete</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}
