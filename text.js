const comments = [
  {
    id: 1,
    postid: 1,
    parentComment: null,
    text: "Comment 1",
    author: {
      id: 1,
      name: A,
      avatar: {
        url: example.com,
      },
    },
    replies: [
      {
        id: 2,
        postId: 1,
        parentCommentId: 1,
        text: "Reply 1 to Comment 1",
        author: {
          id: 2,
          name: B,
          avatar: {
            url: example2.com,
          },
        },
        replies: [],
      },
      {
        id: 3,
        postId: 1,
        parentCommentId: 1,
        text: "Reply 2 to Comment 1",
        author: {
          id: 3,
          name: C,
          avatar: {
            url: example3.com,
          },
        },
        replies: [
          {
            id: 4,
            postId: 1,
            parentCommentId: 3,
            text: "Reply 1 to Reply 2 to Comment 1",
            author: {
              id: 4,
              name: D,
              avatar: {
                url: exampleD.com,
              },
            },
            replies: [],
          },
        ],
      },
    ],
  },
  {
    id: 5,
    postId: 1,
    parentComment: null,
    text: "Comment 2",
    author: {
      id: 5,
      name: E,
      avatar: {
        url: exampleE.com,
      },
    },
    replies: [],
  },
];
