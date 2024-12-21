import Card from "@/components/Card";
import Sort from "@/components/ui/Sort";
import { getFiles } from "@/lib/actions/file.actions";
import { SearchParamProps } from "@/types";
import { Models } from "node-appwrite";
import React from "react";

const page = async ({ params }: SearchParamProps) => {
  const type = ((await params)?.type as string) || "";

  const files = await getFiles();
  // console.log("files : page.tsx | ", files.documents);

  return (
    <div className="page-container">
      <section className="w-full">
        <h1 className="h1 capitalize">{type}</h1>

        <div className="total-size-section">
          <p className="body-1">
            Total: <span className="h5">MB</span>
          </p>

          <div className="sort-container">
            <p className="body-1 hidden sm:block text-light-100">Sort by : </p>

            <Sort />
          </div>
        </div>
        {/* Render the files */}
        {files.total > 0 ? (
          <section className="file-list">
            {files.documents.map((file: Models.Document) => (
              <Card key={file.$id} file={file} />
            ))}
          </section>
        ) : (
          <p className="empty-list">No files uploaded</p>
        )}
      </section>
    </div>
  );
};

export default page;
