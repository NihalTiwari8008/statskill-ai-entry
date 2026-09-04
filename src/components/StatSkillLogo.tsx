import logoAsset from "@/assets/statskill-logo.png.asset.json";
import { cn } from "@/lib/utils";

export function StatSkillLogo({ className }: { className?: string }) {
  return (
    <img
      src={logoAsset.url}
      alt="StatSkill AI logo"
      className={cn("h-8 w-8 object-contain", className)}
    />
  );
}

export function StatSkillWordmark({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <StatSkillLogo />
      <span className="text-lg font-bold tracking-tight text-foreground">StatSkill</span>
      <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
        AI
      </span>
    </div>
  );
}
