export interface Post {
  postedby: string;
  designation: string;
  time: string;
  likes: number;
  content: string;
  comments: Comment[];
}
