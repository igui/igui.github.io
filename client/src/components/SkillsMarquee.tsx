import { motion } from "framer-motion";
import { profile, type MarqueeSkill } from "@shared/content";

const skills = profile.marqueeSkills;

const groupSize = Math.ceil(skills.length / 3);
const groups: MarqueeSkill[][] = [
  skills.slice(0, groupSize),
  skills.slice(groupSize, groupSize * 2),
  skills.slice(groupSize * 2),
];

function SkillItem({ skill }: { skill: MarqueeSkill }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 px-6 py-4 mx-4 whitespace-nowrap min-w-[120px] opacity-70 hover:opacity-100 transition-all hover:scale-110 cursor-default">
      <img src={skill.icon} alt={skill.name} className="w-10 h-10 object-contain" />
      <span className="text-sm font-medium text-slate-700">{skill.name}</span>
    </div>
  );
}

// Each SkillItem is min-w-[120px] + mx-4 (16px each side) ≈ 152px effective.
// Tuning constant: seconds per item to traverse one full tile. Higher = slower.
const SECONDS_PER_ITEM = 2.85;

function MarqueeRow({ items, reverse = false }: { items: MarqueeSkill[]; reverse?: boolean }) {
  // Duration scales with item count so px/sec stays constant across rows of
  // different lengths (groupSize rounding leaves the last row shorter).
  const duration = items.length * SECONDS_PER_ITEM;

  return (
    <div className="flex overflow-hidden my-4">
      <motion.div
        className="flex flex-nowrap"
        initial={{ x: reverse ? "-50%" : "0%" }}
        animate={{ x: reverse ? "0%" : "-50%" }}
        transition={{ repeat: Infinity, ease: "linear", duration }}
      >
        {[...items, ...items, ...items].map((skill, i) => (
          <SkillItem key={`${skill.name}-${i}`} skill={skill} />
        ))}
      </motion.div>
    </div>
  );
}

export default function SkillsMarquee() {
  return (
    <div className="w-full overflow-hidden py-8">
      {groups.map((group, i) => (
        <MarqueeRow key={i} items={group} reverse={i % 2 !== 0} />
      ))}
    </div>
  );
}
