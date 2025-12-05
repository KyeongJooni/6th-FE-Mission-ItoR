import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createComment, deleteComment } from './commentApi';

// 댓글 작성
export const useCreateCommentMutation = (postId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (content: string) => createComment(postId, content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blog', postId], refetchType: 'all' });
      queryClient.invalidateQueries({ queryKey: ['blogs'], refetchType: 'all' });
    },
  });
};

// 댓글 삭제
export const useDeleteCommentMutation = (postId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (commentId: number) => deleteComment(commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blog', postId], refetchType: 'all' });
      queryClient.invalidateQueries({ queryKey: ['blogs'], refetchType: 'all' });
    },
  });
};
