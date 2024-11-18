import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const AddNotes = mutation({
  args: {
    fileId: v.string(),
    notes: v.any(),
    createdBy: v.string(),
  },
  handler: async (ctx, args) => {
    const record = await ctx.db
      .query("notes")
      .filter((q) => q.eq(q.field("fileId"), args.fileId))
      .collect();

    if (record?.length === 0) {
      await ctx.db.insert("notes", {
        fileId: args.fileId,
        notes: args.notes,
        createdBy: args.createdBy,
      });
    } else {
      await ctx.db.patch(record[0]._id, { notes: args.notes });
    }
  },
});

export const GetNotes = query({
  args: {
    fileId: v.string(),
  },
  handler: async (ctx, args) => {
    // Fixed filter condition
    const record = await ctx.db
      .query("notes")
      .filter((q) => q.eq(q.field("fileId"), args.fileId)) // Corrected condition
      .collect();

    // Return null if no notes are found
    if (record?.length > 0) {
      return record[0]?.notes;
    }
    return null; // Handle this case in your frontend logic
  },
});
