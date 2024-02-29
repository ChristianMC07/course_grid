import { NextApiRequest, NextApiResponse } from "next";
import { createAccount } from "@/tools/DataManager";

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
    // response.send("request received!");
    if (request.method == "POST") {
        await createAccount(request, response);
    }
}