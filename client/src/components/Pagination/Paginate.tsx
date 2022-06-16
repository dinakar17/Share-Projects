import { useDispatch, useSelector } from "react-redux";
import { Pagination, PaginationItem } from "@material-ui/lab";
import { Link } from "react-router-dom";
import { AppDispatch, RootState } from "../../reduxStore/store";
import { fetchPosts } from "../../reduxStore/StatesContainer/posts/postsSlice";
import { useEffect } from "react";

type PaginationProps = {
    page: String;
}
const Paginate = ({page}: PaginationProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const numberOfPages = useSelector((state: RootState) => state.posts.numberOfPages);
  useEffect(() => {
    if (page) {
      dispatch(fetchPosts(page));
    }
  }, [dispatch, page]);
  return (
   <Pagination  count={numberOfPages} page={Number(page) || 1} renderItem={(item) => (
      <PaginationItem {...item} component={Link} to={`/projects?page=${item.page}`} />
   )} />
   
  )
}

export default Paginate;