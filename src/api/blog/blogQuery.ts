import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createBlog, updateBlog, deleteBlog, fetchBlogDetail, fetchBlogs } from './blogApi';
import type * as BlogTypes from './blogTypes';
import type { ApiResponse } from '../apiTypes';

// 블로그 게시물 생성
export const useCreateBlogMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['blogs'],
        refetchType: 'all',
      });
    },
  });
};

// 블로그 게시물 수정
export const useUpdateBlogMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ blogId, blogData }: { blogId: string; blogData: BlogTypes.UpdateBlogRequest }) =>
      updateBlog(blogId, blogData),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['blogs'],
        refetchType: 'all',
      });
      queryClient.invalidateQueries({
        queryKey: ['blog', variables.blogId],
        refetchType: 'all',
      });
    },
  });
};

// 블로그 게시물 삭제
export const useDeleteBlogMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteBlog,
    onMutate: async blogId => {
      // 모든 blogs 쿼리 취소
      await queryClient.cancelQueries({ queryKey: ['blogs'] });
      const previousQueries = queryClient.getQueriesData({ queryKey: ['blogs'] });
      queryClient.setQueriesData<ApiResponse<BlogTypes.BlogListResponse>>({ queryKey: ['blogs'] }, old => {
        if (!old || !old.data) {
          return old;
        }

        return {
          ...old,
          data: {
            ...old.data,
            posts: old.data.posts.filter(post => post.postId !== blogId),
          },
        };
      });

      queryClient.setQueriesData<{
        pages: Array<ApiResponse<BlogTypes.BlogListResponse>>;
        pageParams: number[];
      }>({ queryKey: ['blogs', 'infinite'] }, old => {
        if (!old || !old.pages) {
          return old;
        }

        return {
          ...old,
          pages: old.pages.map(page => {
            if (!page.data) {
              return page;
            }
            return {
              ...page,
              data: {
                ...page.data,
                posts: page.data.posts.filter(post => post.postId !== blogId),
              },
            };
          }),
        };
      });

      return { previousQueries };
    },
    onError: (_, __, context) => {
      if (context?.previousQueries) {
        context.previousQueries.forEach(([queryKey, data]) => {
          queryClient.setQueryData(queryKey, data);
        });
      }
    },
    onSettled: (_, __, blogId) => {
      queryClient.invalidateQueries({ queryKey: ['blogs'], refetchType: 'all' });
      queryClient.removeQueries({ queryKey: ['blog', blogId] });
    },
  });
};

// 블로그 게시물 상세 조회
export const useBlogDetailQuery = (blogId: string | undefined, isLoggedIn: boolean, enabled = true) => {
  return useQuery({
    queryKey: ['blog', blogId, isLoggedIn],
    queryFn: () => fetchBlogDetail(blogId!, isLoggedIn),
    enabled: Boolean(blogId) && enabled,
  });
};

// 블로그 게시물 목록 조회
export const useBlogsQuery = (page = 1, size = 10, isLoggedIn: boolean, enabled = true) => {
  return useQuery({
    queryKey: ['blogs', page, size, isLoggedIn],
    queryFn: () => fetchBlogs(page, size, isLoggedIn),
    enabled,
  });
};
