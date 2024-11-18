import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const createUser = mutation({
  args: {
    email: v.string(),
    userName: v.string(),
    imageUrl: v.string(),
  },
  handler: async (ctx, args) => {
    // Check if user already exists
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), args.email))
      .collect();

    if (user.length === 0) {
      // Use `insert` directly on `ctx.db`
      await ctx.db.insert("users", {
        email: args.email,
        userName: args.userName,
        imageUrl: args.imageUrl,
      });

      return "Inserted New User";
    }

    return "User Already Exists";
  },
});
