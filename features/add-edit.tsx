import { useAddTask, useTask, useUpdateTask } from "@/hooks/tasks";
import { FormFields } from "@/types";
import { useLocalSearchParams, usePathname, useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function CreateEditTodo() {
  const { id } = useLocalSearchParams();
  const taskId = Array.isArray(id) ? id[0] : id;
  const pathName = usePathname();
  const route = useRouter();
  const {
    data,
    isLoading: isTaskLoading,
    isFetching,
    isError: isTaskError,
    isSuccess,
  } = useTask(taskId);
  const { data: updatedTask, isError, mutate: updateTask } = useUpdateTask();
  const [title, setTitle] = useState(data?.data.title || "");
  const [notes, setNotes] = useState(data?.data.notes || "");
  const {
    mutate: addTask,
    status,
    isError: isAddError,
    isSuccess: isAddSuccess,
  } = useAddTask();
  const [formErrors, setFormErrors] = useState({
    title: "",
    note: "",
  });

  if (id) {
    if (isTaskLoading) {
      return (
        <View className="flex-1 justify-center items-center bg-white">
          <ActivityIndicator
            size="large"
            color="#3b82f6" // Tailwind blue-500
          />
        </View>
      );
    }

    if (isTaskError || !data) {
      return (
        <div className="flex justify-center items-center h-64">
          <p>Error loading task</p>
        </div>
      );
    }
  }

  const validateForm = () => {
    const errors = {
      title: "",
      note: "",
    };
    let isValid = true;

    if (!title.trim()) {
      errors.title = "Please fill out this field";
      isValid = false;
    }

    if (!notes.trim()) {
      errors.note = "Please fill out this field";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleInputChange = (field: FormFields, value: string) => {
    if (field === "title") setTitle(value);
    if (field === "note") setNotes(value);

    if (formErrors[field]) {
      setFormErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }
    if (id) {
      updateTask(
        {
          id: taskId,
          title,
          notes,
        },
        {
          onSuccess: () => {
            console.log("Task Updated");
            setTitle("");
            setNotes("");
            route.back();
          },
          onError: (err) => console.error("Update failed", err),
        },
      );
    } else {
      addTask(
        {
          title,
          notes,
        },
        {
          onSuccess: () => {
            console.log("Task Upload");
            setTitle("");
            setNotes("");
            route.back();
          },
          onError: (err) => console.error("Update failed", err),
        },
      );
    }

    // try {
    // } catch (error) {
    //   console.log("Error in saving", error);
    // } finally {
    //   setTitle("");
    //   setNotes("");
    //   route.back();
    // }
    // setAllNotes((prevNotes) => {
    //   if (id) {
    //     return prevNotes.map((note) =>
    //       note.id === numericId ? { ...note, title, notes } : note,
    //     );
    //   }
    //   return [
    //     ...prevNotes,
    //     {
    //       id: prevNotes.length + 1,
    //       title: title,
    //       notes: notes,
    //     },
    //   ];
    // });
  };

  return (
    <View
      className={
        pathName.endsWith("/edit") ? "flex-1 p-3 pb-safe" : "flex-1 pt-safe p-3"
      }
    >
      <View className={pathName.endsWith("/edit") ? "" : "mt-5"}>
        <Text className="font-bold text-xl mb-1">Title</Text>
        <TextInput
          placeholder="Task Title"
          value={title}
          onChangeText={(text) => handleInputChange("title", text)}
          className={`rounded-lg p-1.5 px-2.5 text-lg ${
            formErrors.title ? "border border-red-500" : "bg-gray-200"
          }`}
          // className="rounded-lg p-1.5 px-2.5 text-lg ${formErrors.title ? bg-red-200 : bg-gray-200}"
        />
        {formErrors.title && (
          <Text className="text-red-500 mt-1 text-sm">
            {formErrors.title} {/* You can set the error message dynamically */}
          </Text>
        )}
      </View>

      <View className="flex-1 mb-1 mt-5">
        <Text className="font-bold text-xl mb-1">Notes</Text>
        <TextInput
          placeholder="Enter task"
          value={notes}
          multiline
          numberOfLines={4}
          onChangeText={(text) => handleInputChange("note", text)}
          textAlignVertical="top"
          className={`rounded-lg p-1.5 px-2.5 flex-1 text-lg ${
            formErrors.note ? "border border-red-500" : "bg-gray-200"
          }`}

          // className="bg-gray-200 rounded-lg p-1.5 px-2.5 flex-1 text-lg"
        />
        {formErrors.note && (
          <Text className="text-red-500 mt-1 text-sm">
            {formErrors.note} {/* Dynamic error text */}
          </Text>
        )}
      </View>

      <View className={`p-4 rounded-xl mb-3 elevation-lg bg-blue-400`}>
        <TouchableOpacity
          className="justify-center items-center"
          onPress={() => handleSave()}
        >
          <Text className="text-white font-medium text-lg">Save Task</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
