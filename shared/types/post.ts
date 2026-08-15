export interface Post {
  id: number;
  groupId: number;
  userId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface CommentUser {
  id: string;
  pseudonyme: string | null;
  prenom: string | null;
  nom: string | null;
  avatar: string | null;
}

export interface Comment {
  id: number;
  postId: number;
  userId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface CommentWithUser extends Comment {
  user: CommentUser;
}

export interface CreateCommentRequest {
  content: string;
}