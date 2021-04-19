import { Microphone } from "../../../model/Microphone";
import { openDB } from "../../openDB";

export type MicrophoneDetailProps = Microphone;

export default function Home({
  id,
  brand,
  model,
  price,
  imageUrl,
}: MicrophoneDetailProps) {
  return (
    <div>
      <div>ID: {id}</div>
      <div>BRAND: {brand}</div>
      <div>MODEL: {model}</div>
      <div>PRICE: {price}</div>
      <div>URL: {imageUrl}</div>
    </div>
  );
}

export const getStaticProps = async (ctx) => {
  const id = ctx.params.id;
  const db = await openDB();
  const microphone = await db.get("select * from microphone where id = ?", id);
  return { props: microphone };
};

export const getStaticPaths = async () => {
  const db = await openDB();
  const microphones = await db.all("select id from microphone");
  const paths = microphones.map((microphone) => {
    return { params: { id: microphone.id.toString() } };
  });

  return {
    fallback: false,
    paths,
  };
};
