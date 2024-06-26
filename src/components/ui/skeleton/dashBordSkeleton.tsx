import { cn } from "@/lib/utils";

export function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className="w-full rounded-md px-4 ">
      <div className="flex animate-pulse space-x-4">
        <div className="flex-1 space-y-6 py-1">
          <div className="flex justify-end gap-4">
            <div className="h-12 w-60 rounded-md bg-slate-200" />

            <div className="h-12 w-60 rounded-md bg-slate-200" />
          </div>
          <div className="space-y-3">
            <div className="h-14 rounded bg-slate-200"></div>
            <div className="h-12 rounded bg-slate-200"></div>
            <div className="h-12 rounded bg-slate-200"></div>
            <div className="h-12 rounded bg-slate-200"></div>
            <div className="h-12 rounded bg-slate-200"></div>
            <div className="h-12 rounded bg-slate-200"></div>
            <div className="h-12 rounded bg-slate-200"></div>
            <div className="h-12 rounded bg-slate-200"></div>
            <div className="h-12 rounded bg-slate-200"></div>
            <div className="h-12 rounded bg-slate-200"></div>
            <div className="h-12 rounded bg-slate-200"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
