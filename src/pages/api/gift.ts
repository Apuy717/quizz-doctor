// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { promises as fs } from "fs";
import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";

type Data = {
  msg: any;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const jsonDirectory = path.join(process.cwd(), "public");
  const fileContents = await fs.readFile(jsonDirectory + "/spin-gift.json", "utf8");
  res.status(200).json({ msg: fileContents });
}
