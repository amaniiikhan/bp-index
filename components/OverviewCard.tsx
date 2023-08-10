import {
  Box,
  Card,
  CardActionArea,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { LinkProps } from "next/link";
import type { Route } from "nextjs-routes";
import { ReactElement } from "react";

interface IDataOverviewCardProps {
  title: string;
  content?: string;
  chart: ReactElement;
  link: LinkProps["href"];
}

const DataOverviewCard = ({
  title,
  content,
  chart,
  link,
}: IDataOverviewCardProps) => {
  return (
    <Link href={link}>
      <CardActionArea>
        <Card>
          <Box sx={{ p: 2, display: "flex" }}>
            <Stack sx={{ width: "100%" }}>
              <Typography variant="h5">{title}</Typography>
              <Divider />
              {chart}
            </Stack>
          </Box>
        </Card>
      </CardActionArea>
    </Link>
  );
};

export default DataOverviewCard;
