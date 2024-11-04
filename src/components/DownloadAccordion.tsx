import * as React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { Card } from "@/components/ui/card";
import type { Season } from "@/data/series";

interface DownloadAccordionProps {
  seasons: Season[];
}

export function DownloadAccordion({ seasons }: DownloadAccordionProps) {
  return (
    <Card className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Sezonlar</h2>
      <Accordion type="single" collapsible className="w-full">
        {seasons.map((season) => (
          <AccordionItem key={season.number} value={`season-${season.number}`}>
            <AccordionTrigger className="text-lg font-medium px-4">
              {season.number}. Sezon
            </AccordionTrigger>
            <AccordionContent>
              <Accordion type="single" collapsible className="w-full">
                {season.episodes.map((episode) => (
                  <AccordionItem 
                    key={episode.number} 
                    value={`episode-${season.number}-${episode.number}`}
                    className="border-none"
                  >
                    <AccordionTrigger className="px-4 py-2 hover:bg-accent/50 rounded-lg">
                      <div className="flex items-center text-base font-normal">
                        <span className="w-16">{episode.number}. Bölüm</span>
                        <span className="ml-4 text-muted-foreground">{episode.title}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="px-4 py-3 my-2 bg-card/50 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-muted-foreground">
                              {episode.duration} • {episode.download.quality} • {episode.download.size}
                            </p>
                          </div>
                          <Button asChild variant="secondary" size="sm">
                            <a href={episode.download.url}>
                              <Download className="w-4 h-4 mr-2" />
                              İndir
                            </a>
                          </Button>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Card>
  );
}