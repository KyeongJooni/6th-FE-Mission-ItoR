import dayjs from 'dayjs';

export const formatCommentDate = (dateString: string): string => {
  const date = new Date(dateString);
  const month = date.toLocaleString('en-US', { month: 'short' });
  const day = date.getDate();
  const year = date.getFullYear();

  return `${month}. ${day}. ${year}.`;
};

export const formatPostDate = (dateString: string): string => {
  const now = dayjs();
  const postDate = dayjs(dateString);

  const diffInMinutes = now.diff(postDate, 'minute');
  const diffInHours = now.diff(postDate, 'hour');

  // 1분 미만
  if (diffInMinutes < 1) {
    return '방금 전';
  }

  // 1시간 미만
  if (diffInHours < 1) {
    return `${diffInMinutes}분 전`;
  }

  // 24시간 미만
  if (diffInHours < 24) {
    return `${diffInHours}시간 전`;
  }

  // 24시간 이후는 날짜 표시
  const date = new Date(dateString);
  const month = date.toLocaleString('en-US', { month: 'short' });
  const day = date.getDate();
  const year = date.getFullYear();

  return `${month}. ${day}. ${year}.`;
};
