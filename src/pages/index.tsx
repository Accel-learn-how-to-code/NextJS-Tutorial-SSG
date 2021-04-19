import { NextPageContext } from "next";
import { Microphone } from "../../model/Microphone";
import { openDB } from "../openDB";
import Link from "next/link";

export interface IndexProps {
  microphones: Microphone[];
}

export default function Home({ microphones }: IndexProps) {
  return (
    <ul>
      {microphones.map((microphone) => (
        <Link href={`/microphone/${microphone.id}`}>
          <a>
            <li>{microphone.brand + " " + microphone.model}</li>
          </a>
        </Link>
      ))}
    </ul>
  );
}

export const getStaticProps = async (ctx: NextPageContext) => {
  const db = await openDB();
  const microphones = await db.all("select * from microphone");
  return { props: { microphones } };
};
