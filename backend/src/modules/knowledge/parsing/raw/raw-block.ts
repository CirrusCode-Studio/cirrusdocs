import { BoundingBox } from "@/core/contracts/parsed-output";

export interface RawBlock {
  id: string;
  source_engine: string;

  page_number: number;

  bbox?: BoundingBox;

  text?: string;
  table?: unknown;
  image_ref?: string;
  formula?: string;

  confidence?: number;

  warnings?: string[];
}
