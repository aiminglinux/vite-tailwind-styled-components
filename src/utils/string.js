import moment from "moment";

export const capitalFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const createPostUrl = (postTitle, postId) => {
  return encodeURIComponent(`${postTitle}-${postId}`);
};

export const createPostSlug = (postTitle) => {
  const slug = postTitle
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return `${slug}`;
};

export const getPostParams = (postUrl) => {
  const decoded = decodeURIComponent(postUrl);
  const postId = decoded.slice(decoded.length - 24, decoded.length);
  const postTitle = decoded.slice(0, decoded.indexOf(postId) - 1);
  return { postTitle, postId };
};

export const formatDate = (timestamp, momented = true) => {
  const date = new Date(timestamp).toLocaleDateString("en-us", {
    month: "short",
    day: "numeric",
    year: momented ? undefined : "numeric",
  });
  return momented
    ? `${date} (${moment(timestamp).startOf("seconds").fromNow()})`
    : date;
};

export const getReplies = (comments, commentId) => {
  return (
    comments &&
    comments
      .filter((comment) => comment && comment.parentComment === commentId)
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
  );
};

export const isLikedByMe = (likes, id) => {
  if (likes.includes(id)) return true;
  return false;
};
