import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download } from "lucide-react";

interface DownloadOption {
  quality: string;
  size: string;
  url: string;
}

interface DownloadCardProps {
  downloads: DownloadOption[];
}

export function DownloadCard({ downloads }: DownloadCardProps) {
  return (
    <Card className="p-6">
      <h3 className="text-xl font-semibold mb-4">İndirme Seçenekleri</h3>
      <div className="space-y-4">
        {downloads.map((download, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 bg-card/50 rounded-lg"
          >
            <div>
              <h4 className="font-medium">{download.quality}</h4>
              <p className="text-sm text-muted-foreground">{download.size}</p>
            </div>
            <Button asChild variant="secondary">
              <a href={download.url}>
                <Download className="w-4 h-4 mr-2" />
                İndir
              </a>
            </Button>
          </div>
        ))}
      </div>
    </Card>
  );
}