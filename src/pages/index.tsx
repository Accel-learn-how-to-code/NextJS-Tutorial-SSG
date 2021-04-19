import { Microphone } from "../../model/Microphone";
import { openDB } from "../openDB";
import Link from "next/link";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import React from "react";
import Grid from "@material-ui/core/Grid";

export interface IndexProps {
  microphones: Microphone[];
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 0,
      paddingTop: "56.25%", // 16:9
    },
  })
);

export default function Home({ microphones }: IndexProps) {
  const classes = useStyles();

  return (
    <Grid container spacing={3}>
      {microphones.map((microphone) => (
        <Grid container item xs={2} spacing={3}>
          <Link href={`/microphone/${microphone.id}`}>
            <a>
              <Card className={classes.root}>
                <CardHeader title={microphone.brand + " " + microphone.model} />
                <CardMedia
                  className={classes.media}
                  image={microphone.imageUrl}
                  title="Paella dish"
                />
                <CardContent>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    This impressive paella is a perfect party dish and a fun
                    meal to cook together with your guests. Add 1 cup of frozen
                    peas along with the mussels, if you like.
                  </Typography>
                </CardContent>
              </Card>
            </a>
          </Link>
        </Grid>
      ))}
    </Grid>
  );
}

export const getStaticProps = async (ctx) => {
  const curentPage = (ctx.params.currentPage as string) || 0;
  const minItems = Number(curentPage) * 5;
  const maxItems = (Number(curentPage) + 1) * 5;

  const db = await openDB();
  const microphones = await db.all(
    "select * from microphone where id > ? and id <= ?",
    minItems,
    maxItems
  );
  return { props: { microphones } };
};
