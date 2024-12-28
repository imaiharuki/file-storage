"use client";

import Card from "@/components/Card";
import Sort from "@/components/ui/Sort";
import { getFiles } from "@/lib/actions/file.actions";
import { getFileTypesParams } from "@/lib/utils";
import { FileType, SearchParamProps } from "@/types";
import { Loader2 } from "lucide-react";
import { Models } from "node-appwrite";
import React, { useEffect, useState } from "react";

const Page = ({ searchParams, params }: SearchParamProps) => {
  const [type, setType] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [files, setFiles] =
    useState<Models.DocumentList<Models.Document> | null>(null);

  useEffect(() => {
    const fetchFiles = async () => {
      setIsLoading(true);
      const typeParam = ((await params)?.type as string) || "";
      setType(typeParam);

      const searchText = ((await searchParams)?.query as string) || "";
      const sort = ((await searchParams)?.sort as string) || "";

      const types = getFileTypesParams(typeParam) as FileType[];
      const fetchedFiles = await getFiles({ types, searchText, sort });
      setFiles(fetchedFiles);
      setIsLoading(false);
    };

    fetchFiles();
  }, [params]);

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
        {isLoading ? (
          <div className="flex items-center justify-center h-full pt-20 text-emerald-600">
            <Loader2 className="animate-spin" width={54} height={54} />
          </div>
        ) : files && files.total > 0 ? (
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

export default Page;
