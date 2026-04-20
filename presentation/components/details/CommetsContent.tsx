import { COMMENTS } from "@/constants/vars";
import { getAllCommentsByProjectIdAction } from "@/presentation/actions/get-all-comments-by-project-id.action";
import { formatDate } from "@/utils/formatDate";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { ActivityIndicator, Text, View } from "react-native";

interface Props {
  project_id: number;
  color: string;
}

export default function CommentsContent({ project_id, color }: Props) {
  const queryComments = useQuery({
    queryKey: [COMMENTS, project_id],
    queryFn: () => getAllCommentsByProjectIdAction(project_id),
    enabled: !!project_id,
  });
  return (
    <View className="mb-6">
      <Text className="text-light-text dark:text-dark-text font-bold font-sans text-xl mb-6">
        Historial de Avances
      </Text>

      <View className="border-l-[1.5px] border-light-border dark:border-dark-border ml-3 pl-6 pb-4">
        {queryComments.isPending ? (
          <View className="flex-1 justify-center items-center">
            <ActivityIndicator size="large" color={color} />
          </View>
        ) : queryComments.data?.length === 0 ? (
          <Text className="text-light-icon dark:text-dark-icon font-sans text-base">
            No hay comentarios
          </Text>
        ) : (
          queryComments.data?.map((comment, index) => (
            <View key={comment.id + index} className="mb-8 relative">
              <View className="absolute w-8 h-8 rounded-full -left-[41.5px] top-1 bg-light-background dark:bg-dark-background items-center justify-center border border-light-border dark:border-dark-border">
                <Ionicons name="checkmark-circle" size={14} color={color} />
              </View>
              <Text className="text-light-icon dark:text-dark-icon font-mono font-bold text-[11px] uppercase tracking-wider mb-2">
                {formatDate(comment.created_at)}
              </Text>
              <View className="bg-light-surface dark:bg-dark-surface p-5 rounded-3xl rounded-tl-none shadow-sm border border-transparent dark:border-dark-border">
                <Text className="text-light-text dark:text-dark-text font-sans text-[15px] leading-relaxed">
                  {comment.content}
                </Text>
              </View>
            </View>
          ))
        )}
      </View>
    </View>
  );
}
