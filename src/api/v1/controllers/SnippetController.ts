import { Request, Response } from "express";
import SnippetSchema from "../schema/SnippetSchema";

export class SnippetController {
  static async save(req: Request, res: Response) {
    try {
      const { snippetId, filesAndFolders } = req.body;

      if (!snippetId && !filesAndFolders) {
        res.status(400).send({
          success: false,
          message: "Provide atleast filesAndFolders array",
        });
        return;
      }

      if (!snippetId) {
        const data = await SnippetSchema.create({ filesAndFolders });

        res.status(200).send({
          success: true,
          snippetId: data._id,
        });
        return;
      }

      const exist = await SnippetSchema.findById({ _id: snippetId });

      if (exist) {
        await SnippetSchema.updateOne(
          { _id: snippetId },
          { filesAndFolders },
          { upsert: true }
        );

        res.status(200).send({
          success: true,
          snippetId,
        });
        return;
      } else {
        const data = await SnippetSchema.create({ filesAndFolders });
        res.status(200).send({
          success: true,
          snippetId: data._id,
        });
        return;
      }
    } catch (error: any) {
      res.status(500).send({
        success: false,
        message: error.message,
      });
      return;
    }
  }

  static async get(req: Request, res: Response) {
    try {
      const { snippetId } = req.body;

      if (!snippetId) {
        res.status(400).send({
          success: false,
          message: "Provide snippet Id",
        });
        return;
      }

      const exist = await SnippetSchema.findById({ _id: snippetId });

      if (exist) {
        const data = await SnippetSchema.findById({ _id: snippetId });

        res.status(200).send({
          success: true,
          data,
        });
      } else {
        res.status(400).send({
          success: false,
          message: "Snippet doesn't exist with this Id",
        });
        return;
      }
    } catch (error: any) {
      res.status(400).send({
        success: false,
        message: error.message,
      });
      return;
    }
  }
}
