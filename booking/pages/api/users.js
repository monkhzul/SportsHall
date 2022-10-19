import { mycokedb } from "../../common/mycoke";

export default async function users(req, res) {
    const data = await mycokedb.$queryRaw`SELECT * FROM users`;
    res.status(200).json(data)
}

