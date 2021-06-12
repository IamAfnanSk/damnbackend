import { Request, Response } from "express";
import SnippetSchema from "../schema/SnippetSchema";

export class SnippetController {
  static async save(req: Request, res: Response) {
    try {
      const { snippetId, files } = req.body;

      if (!snippetId && !files) {
        res.status(400).send({
          success: false,
          message: "Provide atleast files array",
        });
        return;
      }

      if (!snippetId) {
        const data = await SnippetSchema.create({ files });

        res.status(200).send({
          success: true,
          snippetId: data._id,
        });
        return;
      }

      const exist = await SnippetSchema.findById({ _id: snippetId });

      if (exist) {
        SnippetSchema.updateOne(
          { _id: snippetId },
          { files },
          { upsert: true },
          (error) => {
            if (!error) {
              res.status(200).send({
                success: true,
                snippetId,
              });

              return;
            } else {
              res.status(500).send({
                success: false,
                message: "Something went wrong",
              });

              return;
            }
          }
        );
      } else {
        const data = await SnippetSchema.create({ files });
        res.status(200).send({
          success: true,
          snippetId: data._id,
        });
        return;
      }
    } catch (error) {
      res.status(400).send({
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
        SnippetSchema.findById({ _id: snippetId }, (error: any, data: any) => {
          res.status(200).send({
            success: true,
            data,
          });
          return;
        });
      } else {
        res.status(400).send({
          success: false,
          message: "Snippet doesn't exist with this Id",
        });
        return;
      }
    } catch (error) {
      res.status(400).send({
        success: false,
        message: error.message,
      });
      return;
    }
  }
}
