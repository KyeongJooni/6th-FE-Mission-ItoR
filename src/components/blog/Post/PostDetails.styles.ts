import { cn } from '@/utils/cn';

const baseTextStyle = 'text-xs leading-[160%]';

export const postDetailsStyles = {
  container: 'flex flex-1 min-w-[33.75rem] w-full px-4 py-3 flex-col items-start gap-10 self-stretch',
  profileContainer: 'flex items-start gap-1.5',
  userInfo: 'flex items-start',
  profileImage: 'w-5 h-5 rounded-full self-stretch bg-center bg-cover bg-no-repeat',
  profileAndNickname: 'flex items-start gap-1.5',
  middleDot: 'w-3 h-5 flex items-center justify-center',

  // 텍스트 스타일
  nickname: cn(baseTextStyle, 'font-regular text-gray-20'),
  metaText: cn(baseTextStyle, 'font-light text-gray-56'),
} as const;
