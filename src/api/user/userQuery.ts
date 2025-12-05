import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAccessToken } from '../apiInstance';
import { getUserInfo, updateUser, updateProfilePicture, updateNickname } from './userApi';
import type { ApiResponse } from '../apiTypes';
import type * as UserTypes from './userTypes';

export const useUserInfo = () => {
  const hasToken = Boolean(getAccessToken());

  return useQuery<ApiResponse<UserTypes.UserData>>({
    queryKey: ['userInfo'],
    queryFn: getUserInfo,
    enabled: hasToken,
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분
    retry: false, // 401 에러 시 재시도하지 않음
    refetchOnWindowFocus: false,
  });
};

// 인증 상태 확인용 헬퍼 훅
export const useAuth = () => {
  const { data, isLoading, error } = useUserInfo();

  return {
    user: data?.data ?? null,
    isLoggedIn: Boolean(data?.data),
    isLoading,
    error,
  };
};

// 유저 정보 수정
export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userInfo'] });
    },
  });
};

// 프로필 사진 수정
export const useUpdateProfilePicture = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProfilePicture,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userInfo'] });
    },
  });
};

// 닉네임 수정
export const useUpdateNickname = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateNickname,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userInfo'] });
    },
  });
};
