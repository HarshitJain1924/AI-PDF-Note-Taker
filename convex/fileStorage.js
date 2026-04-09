import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});

export const AddFileEntryToDb = mutation({
  args: {
    fileId: v.string(),
    storageId: v.string(), // Fixed key name
    fileName: v.string(),
    fileURL: v.string(),
    createdBy: v.string(),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.insert("pdfFiles", {
      fileId: args.fileId,
      storageId: args.storageId, // Corrected property name
      fileName: args.fileName,
      fileURL: args.fileURL,
      createdBy: args.createdBy,
    });
    return "Inserted New File";
  },
});

export const GetFileUrl = mutation({
  args: {
    storageId: v.string(),
  },
  handler: async (ctx, args) => {
    const url = await ctx.storage.getUrl(args.storageId);
    return url;
  },
});

export const GetFileRecord = query({
  args: {
    fileId: v.string(),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db
      .query("pdfFiles")
      .filter((q) => q.eq(q.field("fileId"), args.fileId))
      .collect();
    return result[0];
  },
});

export const GetUserFiles = query({
  args: {
    userEmail:v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    if (!args?.userEmail) {
      return ;
    }
    const result = await ctx.db
      .query("pdfFiles")
      .filter((q) => q.eq(q.field("createdBy"), args.userEmail))
      .collect();
    return result;
  },
});

export const RenameFile = mutation({
  args: {
    fileId: v.string(),
    newFileName: v.string(),
    userEmail: v.string(),
  },
  handler: async (ctx, args) => {
    const record = await ctx.db
      .query("pdfFiles")
      .filter((q) => q.eq(q.field("fileId"), args.fileId))
      .filter((q) => q.eq(q.field("createdBy"), args.userEmail))
      .collect();

    if (!record?.length) {
      throw new Error("File not found or unauthorized");
    }

    await ctx.db.patch(record[0]._id, { fileName: args.newFileName });
    return "File name updated";
  },
});

export const DeleteFile = mutation({
  args: {
    fileId: v.string(),
    userEmail: v.string(),
  },
  handler: async (ctx, args) => {
    const files = await ctx.db
      .query("pdfFiles")
      .filter((q) => q.eq(q.field("fileId"), args.fileId))
      .filter((q) => q.eq(q.field("createdBy"), args.userEmail))
      .collect();

    if (!files?.length) {
      throw new Error("File not found or unauthorized");
    }

    const file = files[0];

    if (file.storageId) {
      await ctx.storage.delete(file.storageId);
    }
    await ctx.db.delete(file._id);

    const notes = await ctx.db
      .query("notes")
      .filter((q) => q.eq(q.field("fileId"), args.fileId))
      .collect();
    for (const note of notes) {
      await ctx.db.delete(note._id);
    }

    const documents = await ctx.db.query("documents").collect();
    for (const doc of documents) {
      const metadata = doc?.metadata;
      const docFileId = metadata?.fileId || metadata;
      if (docFileId === args.fileId) {
        await ctx.db.delete(doc._id);
      }
    }

    return "File deleted";
  },
});
