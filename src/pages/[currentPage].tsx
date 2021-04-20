import { openDB } from "../openDB";
import Home, { getStaticProps } from "./index";

export default Home;
export { getStaticProps };

export const getStaticPaths = async () => {
  const db = await openDB();
  const { total }: any = await db.get(
    "select count(*) as total from microphone"
  );
  const numberOfPages = Math.ceil(total / 5.0)
  //console.log(numberOfPages)
  const paths = Array(numberOfPages - 1).fill(' ').map((x, index) => {
    return {
      params: {
        currentPage: (index + 1).toString(),
      },
    };
  });
  //console.log(paths);
  return {
    fallback: false,
    paths,
  };
};
