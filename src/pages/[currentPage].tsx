import Home, { getStaticProps } from "./index";

export default Home;
export { getStaticProps };

export const getStaticPaths = async () => {
  return {
    fallback: false,
    paths: [
      {
        params: {
          currentPage: "2",
        },
      },
    ],
  };
};
