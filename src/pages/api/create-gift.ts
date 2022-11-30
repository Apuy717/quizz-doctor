// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { promises as fs } from "fs";
import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";

type Data = {
  msg: any;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const data = req.query.data;
  if (data) {
    const jsonDirectory = path.join(process.cwd(), "public");
    const gotdata = await fs.readFile(jsonDirectory + "/spin-gift.json", "utf8");
    const oldData: any[] = JSON.parse(gotdata);
    oldData.push(data);
    const fileContents = await fs.writeFile(jsonDirectory + "/spin-gift.json", JSON.stringify(oldData), "utf8");
    res.status(200).json({ msg: fileContents });
  } else {
    res.status(200).json({ msg: "error save gift" });
  }
}
