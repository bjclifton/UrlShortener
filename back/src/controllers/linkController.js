import { addLink, getLinks } from "../services/linkService.js";

export async function addLinkForUser(req, res) {
    const link = req.body.link;
    const userId = req.session.userId;
    const result = await addLink(link, userId);
    if (result) {
        res.json({ success: true });
    } else {
        res.status(500).json({ error: "Could not add link to user" });
    }
}

export async function getLinksForUser(req, res) {
    const userId = req.session.userId;
    const links = await getLinks(userId);
    res.json(links);
}

