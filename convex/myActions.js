import { ConvexVectorStore } from "@langchain/community/vectorstores/convex";
import { action } from "./_generated/server.js";
import { api } from "./_generated/api.js";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { TaskType } from "@google/generative-ai";
import { v } from "convex/values";

export const ingest = action({
  args: {
    slitText: v.any(),
    fileId: v.string(),
  },
  handler: async (ctx, args) => {
    await ConvexVectorStore.fromTexts(
      args.slitText, //array
      args.fileId, //string
      new GoogleGenerativeAIEmbeddings({
        apiKey: "AIzaSyBzqAg5OIGAzRnLblMIvrtFWiBJSjc4sNk",
        model: "text-embedding-004", // 768 dimensions
        taskType: TaskType.RETRIEVAL_DOCUMENT,
        title: "Document title",
      }),
      { ctx }
    );
    return "Success";
  },
});

export const search = action({
  args: {
    query: v.string(),
    fileId: v.string(),
  },
  handler: async (ctx, args) => {
    const vectorStore = new ConvexVectorStore(
      new GoogleGenerativeAIEmbeddings({
        apiKey: "AIzaSyBzqAg5OIGAzRnLblMIvrtFWiBJSjc4sNk", // Your API key
        model: "text-embedding-004",
        taskType: TaskType.RETRIEVAL_DOCUMENT,
        title: "Document title",
      }),
      { ctx }
    );

    // Perform similarity search
    const resultOne = await vectorStore.similaritySearch(args.query, 1);
    console.log(resultOne);  // Inspect the full result to see the structure
    // Return results
    return JSON.stringify(resultOne);
  },
});

