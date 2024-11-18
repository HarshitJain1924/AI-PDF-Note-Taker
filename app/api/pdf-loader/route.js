import { NextResponse } from "next/server";
import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

// const pdfUrl =
//   "https://jovial-eagle-350.convex.cloud/api/storage/2b6dbdea-417f-4f94-ad08-e74f98c12101";
export async function GET(req) {
    const reqUrl = req.url;
    const {searchParams} = new URL(reqUrl);
    const pdfUrl = searchParams.get('pdfUrl');
  //load the pdf file
  const response = await fetch(pdfUrl);
  const data = await response.blob();
  const loader = new WebPDFLoader(data);
  const docs = await loader.load();

  let pdfTextContent = "";
  docs.forEach((doc) => {
    pdfTextContent += doc.pageContent;
  });

  //split the text content into smaller chunks
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 100,
    chunkOverlap: 20,
  });
  const output = await splitter.createDocuments([pdfTextContent]);

  let splitterList = [];
  output.forEach((doc) => {
    splitterList.push(doc.pageContent);
  });

  return NextResponse.json({ result: splitterList });
}
